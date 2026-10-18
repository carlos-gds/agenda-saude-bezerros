import React, { useCallback, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { Toast } from "./components/common";
import { initialAppointments } from "./data/mockData";
import { AppointmentsPage } from "./pages/AppointmentsPage";
import { BookingPage } from "./pages/BookingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ExamsPage } from "./pages/ExamsPage";
import { HomePage } from "./pages/HomePage";

const pagePaths = {
  inicio: "/",
  agendamento: "/agendamento",
  atendimentos: "/atendimentos",
  exames: "/exames",
  painel: "/painel",
};

const pathPages = Object.entries(pagePaths).reduce(
  (pages, [page, path]) => ({ ...pages, [path]: page }),
  {},
);

/**
 * Declara as rotas da aplicação e encaminha caminhos desconhecidos para o início.
 * @returns {JSX.Element} Árvore de rotas do projeto.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />} />
      <Route path="/agendamento" element={<AppShell />} />
      <Route path="/atendimentos" element={<AppShell />} />
      <Route path="/exames" element={<AppShell />} />
      <Route path="/painel" element={<AppShell />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

/**
 * Controla o estado compartilhado e exibe a página correspondente à rota atual.
 * @returns {JSX.Element} Layout completo da aplicação.
 */
function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [toastMessage, setToastMessage] = useState("");
  const [examQuery, setExamQuery] = useState("");

  const currentPage = pathPages[location.pathname] ?? "inicio";

  const navigateTo = useCallback(
    (page) => {
      navigate(pagePaths[page] ?? pagePaths.inicio);
      setIsSidebarOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [navigate],
  );

  const showNotification = useCallback((message) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 3000);
  }, []);

  const createAppointment = useCallback((appointment) => {
    setAppointments((previousAppointments) => [
      appointment,
      ...previousAppointments,
    ]);
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "agendamento":
        return (
          <BookingPage
            onNavigate={navigateTo}
            onNotify={showNotification}
            onCreateAppointment={createAppointment}
          />
        );
      case "atendimentos":
        return (
          <AppointmentsPage
            appointments={appointments}
            onNavigate={navigateTo}
            onNotify={showNotification}
          />
        );
      case "exames":
        return (
          <ExamsPage
            query={examQuery}
            onQueryChange={setExamQuery}
            onNotify={showNotification}
          />
        );
      case "painel":
        return <DashboardPage />;
      case "inicio":
      default:
        return (
          <HomePage
            onNavigate={navigateTo}
            onNotify={showNotification}
            appointments={appointments}
          />
        );
    }
  };

  return (
    <>
      <AppLayout
        currentPage={currentPage}
        appointmentCount={appointments.length}
        isSidebarOpen={isSidebarOpen}
        onNavigate={navigateTo}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onCloseSidebar={() => setIsSidebarOpen(false)}
        onNotify={showNotification}
      >
        {renderCurrentPage()}
      </AppLayout>
      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </>
  );
}
