import React from "react";
import {
  Activity,
  ChevronDown,
  Clock3,
  MapPin,
  CalendarDays,
  Zap,
} from "lucide-react";
import { PageHeading, StatusPill } from "../components/common";

const metrics = [
  ["Atendimentos no mês", "1.284", "+12,6%", CalendarDays, "teal"],
  ["Taxa de absenteísmo", "8,4%", "-2,1%", Activity, "blue"],
  ["Demanda reprimida", "326", "+4,8%", Clock3, "orange"],
  ["Unidades ativas", "24", "100%", MapPin, "lilac"],
];
const demandBySpecialty = [
  ["Clínica geral", 78, "teal"],
  ["Odontologia", 62, "blue"],
  ["Fisioterapia", 49, "orange"],
  ["Psicologia", 34, "lilac"],
];
const chartValues = [72, 55, 86, 64, 43, 68, 78];

/**
 * Mostra indicadores fictícios para o perfil gestor.
 * @returns {JSX.Element} Dashboard de gestão.
 */
export function DashboardPage() {
  return (
    <>
      <PageHeading
        eyebrow="VISÃO DA SECRETARIA"
        title="Painel gestor"
        sub="Indicadores simulados para apoiar decisões da gestão municipal."
        action={
          <span className="demo">
            <Zap size={13} /> Dados demonstrativos
          </span>
        }
      />
      <div className="metrics">
        {metrics.map(([label, value, variation, Icon, tone]) => (
          <MetricCard
            label={label}
            value={value}
            variation={variation}
            Icon={Icon}
            tone={tone}
            key={label}
          />
        ))}
      </div>
      <div className="charts">
        <section className="card chart">
          <div className="section-head">
            <div>
              <label>ATENDIMENTOS</label>
              <h2>Volume por dia</h2>
            </div>
            <button type="button">
              Últimos 7 dias <ChevronDown size={13} />
            </button>
          </div>
          <div className="bars">
            {chartValues.map((value, index) => (
              <div key={index}>
                <span style={{ height: `${value}%` }} />
                <small>{["S", "T", "Q", "Q", "S", "S", "D"][index]}</small>
              </div>
            ))}
          </div>
        </section>
        <section className="card demand">
          <div className="section-head">
            <div>
              <label>DEMANDA</label>
              <h2>Por especialidade</h2>
            </div>
          </div>
          {demandBySpecialty.map(([label, value, tone]) => (
            <div className="demand-row" key={label}>
              <div>
                <span>{label}</span>
                <b>{value}%</b>
              </div>
              <div className={`track ${tone}`}>
                <i style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </section>
      </div>
      <section className="card alerts">
        <div className="section-head">
          <div>
            <label>ATENÇÃO NECESSÁRIA</label>
            <h2>Indicadores que pedem ação</h2>
          </div>
          <StatusPill tone="orange">3 alertas</StatusPill>
        </div>
        <AlertItem
          title="Centro de Especialidades"
          description="Ocupação acima de 90% nos próximos 7 dias"
        />
        <AlertItem
          title="Laboratório Municipal"
          description="18 exames aguardando liberação há mais de 48h"
        />
        <AlertItem
          title="UBS Santo Amaro"
          description="Demanda de clínica geral acima da média"
        />
      </section>
    </>
  );
}

function MetricCard({ label, value, variation, Icon, tone }) {
  return (
    <div className="metric">
      <span className={`metric-icon ${tone}`}>
        <Icon size={18} />
      </span>
      <small>{label}</small>
      <strong>{value}</strong>
      <em className={tone === "orange" ? "neg" : ""}>
        {variation} <i>vs. mês anterior</i>
      </em>
    </div>
  );
}
function AlertItem({ title, description }) {
  return (
    <p>
      <b>{title}</b>
      <small>{description}</small>
    </p>
  );
}
