import React from "react";
import {
  ArrowRight,
  Bell,
  ChevronDown,
  FileText,
  Home,
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  Menu,
  MessageCircle,
  ShieldCheck,
  X,
} from "lucide-react";
import { Logo } from "./common";
import { menuItems } from "../data/mockData";

const menuIcons = {
  inicio: Home,
  agendamento: CalendarDays,
  atendimentos: ClipboardList,
  exames: FileText,
  painel: LayoutDashboard,
};

/**
 * Estrutura visual principal da aplicação.
 * @param {object} props Estado e eventos compartilhados entre as páginas.
 * @returns {JSX.Element} Layout com sidebar e conteúdo.
 */
export function AppLayout({
  currentPage,
  appointmentCount,
  isSidebarOpen,
  onNavigate,
  onOpenSidebar,
  onCloseSidebar,
  onNotify,
  children,
}) {
  const currentMenuItem = menuItems.find((item) => item.id === currentPage);

  return (
    <div className="shell">
      <aside className={`side ${isSidebarOpen ? "open" : ""}`}>
        <div className="side-head">
          <Logo />
          <button
            type="button"
            className="close"
            onClick={onCloseSidebar}
            aria-label="Fechar menu"
          >
            <X />
          </button>
        </div>

        <div className="profile">
          <span>AS</span>
          <div>
            <b>Ana Souza</b>
            <small>Cartão SUS •••• 8932</small>
          </div>
          <ChevronDown size={15} />
        </div>

        <nav aria-label="Navegação principal">
          {menuItems.map((item) => {
            const Icon = menuIcons[item.id];
            const isActive = currentPage === item.id;

            return (
              <button
                type="button"
                className={isActive ? "active" : ""}
                onClick={() => onNavigate(item.id)}
                key={item.id}
              >
                <Icon size={18} />
                {item.label}
                {item.id === "atendimentos" && <em>{appointmentCount}</em>}
              </button>
            );
          })}
        </nav>

        <div className="help">
          <MessageCircle size={18} />
          <b>Precisa de ajuda?</b>
          <p>Fale com a equipe da Secretaria de Saúde.</p>
          <button
            type="button"
            onClick={() => onNotify("Central aberta para demonstração.")}
          >
            Abrir central <ArrowRight size={13} />
          </button>
        </div>

        <small className="secure">
          <ShieldCheck size={14} /> Seus dados estão protegidos
        </small>
      </aside>

      <main>
        <header>
          <button
            type="button"
            className="hamb"
            onClick={onOpenSidebar}
            aria-label="Abrir menu"
          >
            <Menu />
          </button>
          <span>
            Portal do cidadão <b>/</b> {currentMenuItem?.label}
          </span>
          <div>
            <button
              type="button"
              className="bell"
              onClick={() => onNotify("Você não tem novas notificações.")}
              aria-label="Ver notificações"
            >
              <Bell size={19} />
              <i />
            </button>
            <strong className="top-avatar">AS</strong>
          </div>
        </header>
        <div className="content">{children}</div>
      </main>
    </div>
  );
}
