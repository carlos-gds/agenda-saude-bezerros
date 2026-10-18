import React, { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  MapPin,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { ActionButton, PageHeading } from "../components/common";
import {
  availableDates,
  availableTimes,
  healthUnits,
  professionals,
  specialties,
} from "../data/mockData";

const emptyBooking = {
  specialty: "",
  unit: "",
  professional: "",
  date: "",
  time: "",
};

/**
 * Fluxo de criação de um novo atendimento.
 * @param {{onNavigate: (page: string) => void, onNotify: (message: string) => void, onCreateAppointment: (appointment: object) => void}} props Eventos da página.
 * @returns {JSX.Element} Formulário de agendamento.
 */
export function BookingPage({ onNavigate, onNotify, onCreateAppointment }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [booking, setBooking] = useState(emptyBooking);
  const [errorMessage, setErrorMessage] = useState("");

  const updateBooking = (field, value) => {
    setBooking((previousBooking) => ({ ...previousBooking, [field]: value }));
    setErrorMessage("");
  };

  const canContinue =
    currentStep === 1
      ? Boolean(booking.specialty && booking.unit)
      : currentStep === 2
        ? Boolean(booking.professional && booking.date && booking.time)
        : true;

  const handleContinue = () => {
    if (!canContinue) {
      setErrorMessage("Selecione todas as opções obrigatórias para continuar.");
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, 3));
  };

  const handleConfirmation = () => {
    try {
      if (!canContinue) {
        throw new Error(
          "Não foi possível confirmar: existem campos obrigatórios vazios.",
        );
      }

      onCreateAppointment({
        id: `AT-${Math.floor(2000 + Math.random() * 800)}`,
        specialty: booking.specialty,
        unit: booking.unit,
        professional: booking.professional,
        date: booking.date,
        time: booking.time,
        status: "Agendado",
        tone: "blue",
      });
      onNotify("Atendimento agendado com sucesso!");
      onNavigate("atendimentos");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível concluir o agendamento.",
      );
    }
  };

  return (
    <>
      <PageHeading
        eyebrow="NOVO AGENDAMENTO"
        title="Agendar atendimento"
        sub="Escolha como podemos ajudar você hoje."
      />
      <div className="booking">
        <section className="card form">
          <div className="steps">
            <span className="done">1 Atendimento</span>
            <i />
            <span className={currentStep > 1 ? "done" : ""}>2 Horário</span>
            <i />
            <span className={currentStep > 2 ? "done" : ""}>3 Confirmar</span>
          </div>

          {currentStep === 1 && (
            <ServiceStep booking={booking} onChange={updateBooking} />
          )}
          {currentStep === 2 && (
            <ScheduleStep booking={booking} onChange={updateBooking} />
          )}
          {currentStep === 3 && <ConfirmationStep booking={booking} />}

          {errorMessage && (
            <p className="form-error" role="alert">
              {errorMessage}
            </p>
          )}

          <footer>
            {currentStep > 1 ? (
              <button
                type="button"
                className="btn ghost"
                onClick={() => setCurrentStep((step) => step - 1)}
              >
                Voltar
              </button>
            ) : (
              <span />
            )}
            {currentStep < 3 ? (
              <ActionButton onClick={handleContinue} className="btn primary">
                Continuar
              </ActionButton>
            ) : (
              <ActionButton
                onClick={handleConfirmation}
                className="btn primary"
              >
                Confirmar agendamento
              </ActionButton>
            )}
          </footer>
        </section>

        <aside className="card side-note">
          <ShieldCheck size={20} />
          <h3>Atendimento seguro</h3>
          <p>
            Seus dados são protegidos e usados apenas para organizar o seu
            atendimento.
          </p>
          <hr />
          <b>Como funciona?</b>
          <small>1. Escolha o atendimento</small>
          <small>2. Encontre um horário</small>
          <small>3. Confirme o agendamento</small>
        </aside>
      </div>
    </>
  );
}

function ServiceStep({ booking, onChange }) {
  return (
    <>
      <h2>Que atendimento você precisa?</h2>
      <p>Selecione uma especialidade e a unidade mais conveniente.</p>
      <label>Especialidade</label>
      <div className="options">
        {specialties.map((specialty) => (
          <button
            type="button"
            className={booking.specialty === specialty ? "selected" : ""}
            onClick={() => onChange("specialty", specialty)}
            key={specialty}
          >
            <Stethoscope size={16} />
            {specialty}
            {booking.specialty === specialty && <Check size={14} />}
          </button>
        ))}
      </div>
      <label>Unidade de saúde</label>
      <SelectField
        icon={<MapPin size={16} />}
        value={booking.unit}
        placeholder="Selecione uma unidade"
        options={healthUnits}
        onChange={(value) => onChange("unit", value)}
      />
    </>
  );
}

function ScheduleStep({ booking, onChange }) {
  return (
    <>
      <h2>Escolha o melhor horário</h2>
      <p>Encontre um profissional e horário disponível.</p>
      <label>Profissional</label>
      <SelectField
        icon={<UserRound size={16} />}
        value={booking.professional}
        placeholder="Selecione um profissional"
        options={professionals}
        onChange={(value) => onChange("professional", value)}
      />
      <label>Data</label>
      <div className="dates">
        {availableDates.map((date) => (
          <button
            type="button"
            className={booking.date === date ? "selected" : ""}
            onClick={() => onChange("date", date)}
            key={date}
          >
            <b>{date.split(" ")[0]}</b>
            <small>{date.split(" ")[1]}</small>
          </button>
        ))}
      </div>
      <label>Horários disponíveis</label>
      <div className="times">
        {availableTimes.map((time) => (
          <button
            type="button"
            className={booking.time === time ? "selected" : ""}
            onClick={() => onChange("time", time)}
            key={time}
          >
            {time}
          </button>
        ))}
      </div>
    </>
  );
}

function SelectField({ icon, value, placeholder, options, onChange }) {
  return (
    <div className="select">
      {icon}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown size={16} />
    </div>
  );
}

function ConfirmationStep({ booking }) {
  return (
    <div className="confirm">
      <span>
        <Check />
      </span>
      <h2>Confira seu agendamento</h2>
      <p>Revise as informações antes de confirmar.</p>
      <div className="summary">
        <div>
          <small>Atendimento</small>
          <b>{booking.specialty}</b>
        </div>
        <div>
          <small>Local</small>
          <b>{booking.unit}</b>
        </div>
        <div>
          <small>Profissional</small>
          <b>{booking.professional}</b>
        </div>
        <div>
          <small>Data e horário</small>
          <b>
            {booking.date} • {booking.time}
          </b>
        </div>
      </div>
    </div>
  );
}
