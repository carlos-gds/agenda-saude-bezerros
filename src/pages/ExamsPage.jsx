import React, { useMemo } from "react";
import {
  ArrowRight,
  CalendarDays,
  FileText,
  Search,
  ShieldCheck,
} from "lucide-react";
import { PageHeading, StatusPill } from "../components/common";
import { exams } from "../data/mockData";

/**
 * Permite filtrar solicitações de exames fictícias.
 * @param {{query: string, onQueryChange: (query: string) => void, onNotify: (message: string) => void}} props Estado do filtro.
 * @returns {JSX.Element} Página de exames.
 */
export function ExamsPage({ query, onQueryChange, onNotify }) {
  const filteredExams = useMemo(
    () =>
      exams.filter((exam) =>
        `${exam.name}${exam.code}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <>
      <PageHeading
        eyebrow="RESULTADOS"
        title="Acompanhar exames"
        sub="Consulte o andamento dos seus exames usando o código da solicitação."
      />
      <div className="exam-search">
        <Search size={17} />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Digite o código ou nome do exame"
          aria-label="Buscar exame"
        />
        <button type="button" className="btn primary">
          Buscar exame
        </button>
      </div>
      <div className="section-head">
        <h2>Solicitações recentes</h2>
        <small>{filteredExams.length} resultados</small>
      </div>
      <div className="exam-grid">
        {filteredExams.length > 0 ? (
          filteredExams.map((exam) => (
            <ExamCard exam={exam} onNotify={onNotify} key={exam.code} />
          ))
        ) : (
          <div className="card empty-state">
            <FileText size={26} />
            <h3>Nenhum exame encontrado</h3>
            <p>Confira o código ou nome digitado.</p>
          </div>
        )}
      </div>
      <div className="privacy">
        <ShieldCheck size={19} />
        <div>
          <b>Privacidade em primeiro lugar</b>
          <p>
            Resultados de exames são informações sensíveis. Na versão real, o
            acesso exigiria autenticação forte e seguiria as regras da LGPD.
          </p>
        </div>
      </div>
    </>
  );
}

function ExamCard({ exam, onNotify }) {
  return (
    <div className="card exam">
      <div className="exam-top">
        <FileText size={21} />
        <StatusPill tone={exam.tone}>{exam.status}</StatusPill>
      </div>
      <h3>{exam.name}</h3>
      <p>{exam.unit}</p>
      <div className="progress-label">
        <span>Andamento</span>
        <b>{exam.progress}%</b>
      </div>
      <div className="track">
        <i style={{ width: `${exam.progress}%` }} />
      </div>
      <div className="exam-bottom">
        <small>
          <CalendarDays size={13} /> {exam.date}
        </small>
        <b>{exam.code}</b>
      </div>
      {exam.progress === 100 && (
        <button
          type="button"
          className="btn outline full"
          onClick={() =>
            onNotify(
              "Laudo demonstrativo aberto. Nenhum dado real foi baixado.",
            )
          }
        >
          Visualizar laudo <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}
