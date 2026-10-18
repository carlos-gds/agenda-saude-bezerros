import React, { useCallback, useState } from "react";
import { AppLayout } from "./components/AppLayout";
import { Toast } from "./components/common";
import { initialAppointments } from "./data/mockData";
import { AppointmentsPage } from "./pages/AppointmentsPage";
import { BookingPage } from "./pages/BookingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ExamsPage } from "./pages/ExamsPage";
import { HomePage } from "./pages/HomePage";

/**
 * Controla o estado da demonstração e seleciona a página atual.
 * @returns {JSX.Element} Aplicação completa.
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState("inicio");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [toastMessage, setToastMessage] = useState("");
  const [examQuery, setExamQuery] = useState("");

  const navigateTo = useCallback((page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
