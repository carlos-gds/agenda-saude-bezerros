import React from "react";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  ClipboardList,
  FileText,
  HeartPulse,
  Zap,
} from "lucide-react";
import { AppointmentRow } from "../components/common";

/**
 * Página inicial do portal do cidadão.
 * @param {{onNavigate: (page: string) => void, onNotify: (message: string) => void, appointments: object[]}} props Dados da página.
 * @returns {JSX.Element} Conteúdo inicial.
 */
export function HomePage({ onNavigate, onNotify, appointments }) {
  const quickActions = [
    {
      title: "Agendar consulta",
      description: "Escolha a unidade, especialidade e horário.",
      icon: CalendarDays,
      tone: "teal",
      page: "agendamento",
    },
    {
      title: "Ver resultado de exame",
      description: "Consulte o andamento usando seu código.",
      icon: FileText,
      tone: "blue",
      page: "exames",
    },
    {
      title: "Meus atendimentos",
      description: "Confira seus próximos compromissos.",
      icon: ClipboardList,
      tone: "lilac",
      page: "atendimentos",
    },
  ];

  return (
    <>
      <section className="hero">
        <div>
          <label>CUIDADO MAIS PERTO DE VOCÊ</label>
          <h1>Sua saúde, no seu tempo.</h1>
          <p>
            Agende consultas, acompanhe seus exames e receba lembretes sem
            precisar enfrentar filas.
          </p>
          <button
            type="button"
            className="btn white"
            onClick={() => onNavigate("agendamento")}
          >
            Agendar atendimento <ArrowRight size={16} />
          </button>
          <button
            type="button"
            className="link light"
            onClick={() => onNavigate("exames")}
          >
            Acompanhar exame
          </button>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div>
            <HeartPulse size={55} />
          </div>
          <aside>
            <CalendarDays size={16} />
            <b>
              Próxima consulta
              <small>24 out • 09:30</small>
            </b>
          </aside>
        </div>
      </section>

      <div className="notice">
        <Zap size={16} />
        <span>
          <b>Protótipo acadêmico:</b> esta demonstração usa dados fictícios para
          apresentar a solução do desafio de Saúde de Bezerros.
        </span>
        <button
          type="button"
          onClick={() => onNotify("Nenhum dado real foi enviado.")}
        >
          Entendi
        </button>
      </div>

      <section>
        <div className="section-head">
          <div>
            <label>ACESSO RÁPIDO</label>
            <h2>O que você precisa hoje?</h2>
          </div>
        </div>
        <div className="quick">
          {quickActions.map(
            ({ title, description, icon: Icon, tone, page }) => (
              <button type="button" onClick={() => onNavigate(page)} key={page}>
                <span className={`q ${tone}`}>
                  <Icon />
                </span>
                <b>{title}</b>
                <small>{description}</small>
                <ArrowRight />
              </button>
            ),
          )}
        </div>
      </section>

      <div className="twocol">
        <section className="card">
          <div className="section-head">
            <div>
              <label>AGENDA</label>
              <h2>Próximos atendimentos</h2>
            </div>
            <button
              type="button"
              className="link"
              onClick={() => onNavigate("atendimentos")}
            >
              Ver todos <ArrowRight size={14} />
            </button>
          </div>
          {appointments.slice(0, 2).map((appointment) => (
            <AppointmentRow item={appointment} key={appointment.id} />
          ))}
        </section>

        <section className="card reminder">
          <Bell size={20} />
          <label>LEMBRETE</label>
          <h2>Não esqueça do seu atendimento</h2>
          <p>
            Ative os lembretes para receber avisos sobre consultas e preparos de
            exames.
          </p>
          <button
            type="button"
            className="btn soft"
            onClick={() => onNotify("Lembretes ativados nesta demonstração.")}
          >
            Ativar lembretes
          </button>
        </section>
      </div>
    </>
  );
}
