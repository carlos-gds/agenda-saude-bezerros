import React from "react";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  Clock3,
  MapPin,
  Search,
} from "lucide-react";
import { PageHeading, StatusPill } from "../components/common";
import { historicalAppointments } from "../data/mockData";

/**
 * Lista os agendamentos do cidadão.
 * @param {{appointments: object[], onNavigate: (page: string) => void, onNotify: (message: string) => void}} props Dados da lista.
 * @returns {JSX.Element} Página de atendimentos.
 */
export function AppointmentsPage({ appointments, onNavigate, onNotify }) {
  const allAppointments = [...appointments, ...historicalAppointments];

  return (
    <>
      <PageHeading
        eyebrow="MINHA SAÚDE"
        title="Meus atendimentos"
        sub="Acompanhe seus agendamentos em um só lugar."
        action={
          <button
            type="button"
            className="btn primary"
            onClick={() => onNavigate("agendamento")}
          >
            <CalendarDays size={15} /> Novo agendamento
          </button>
        }
      />
      <div className="filters">
        <div>
          <Search size={16} />
          <input
            aria-label="Buscar atendimento"
            placeholder="Buscar atendimento"
          />
        </div>
        <button type="button">
          Todos os status <ChevronDown size={15} />
        </button>
      </div>
      <div className="list">
        {allAppointments.map((appointment) => (
          <AppointmentCard
            appointment={appointment}
            onNotify={onNotify}
            key={appointment.id}
          />
        ))}
      </div>
      <div className="info">
        <Bell size={17} />
        <span>
          <b>Lembretes:</b> avisaremos você antes de cada atendimento. Na versão
          real, também seria possível enviar WhatsApp e SMS.
        </span>
      </div>
    </>
  );
}

function AppointmentCard({ appointment, onNotify }) {
  return (
    <div className="large-row">
      <div className="large-date">
        <b>{appointment.date.split(" ")[0]}</b>
        <small>{appointment.date.split(" ")[1]}</small>
      </div>
      <div className="large-info">
        <div>
          <StatusPill tone={appointment.tone}>{appointment.status}</StatusPill>
          <small>Código {appointment.id}</small>
        </div>
        <h3>{appointment.specialty}</h3>
        <span>
          <MapPin size={14} />
          {appointment.unit}
        </span>
        <span>
          <Clock3 size={14} />
          {appointment.time} • {appointment.professional}
        </span>
      </div>
      <button
        type="button"
        className="btn ghost"
        onClick={() =>
          onNotify("Opção de remarcação disponível na versão completa.")
        }
      >
        Remarcar
      </button>
    </div>
  );
}
