import React from "react";
import { ArrowRight, Check, HeartPulse, X } from "lucide-react";

/**
 * Representa a marca visual da aplicação.
 * @returns {JSX.Element} Marca com símbolo e nome do produto.
 */
export function Logo() {
  return (
    <div className="brand">
      <span className="logo">
        <HeartPulse size={20} />
      </span>
      <span>
        <b>Agenda Saúde</b>
        <small>Bezerros</small>
      </span>
    </div>
  );
}

/**
 * Mostra o status de um registro usando a cor correspondente.
 * @param {{children: React.ReactNode, tone: string}} props Dados do status.
 * @returns {JSX.Element} Badge de status.
 */
export function StatusPill({ children, tone }) {
  return <span className={`pill ${tone}`}>{children}</span>;
}

/**
 * Renderiza o título padrão das páginas.
 * @param {{eyebrow: string, title: string, sub: string, action?: React.ReactNode}} props Conteúdo do cabeçalho.
 * @returns {JSX.Element} Cabeçalho de página.
 */
export function PageHeading({ eyebrow, title, sub, action }) {
  return (
    <div className="heading">
      <div>
        <label>{eyebrow}</label>
        <h1>{title}</h1>
        <p>{sub}</p>
      </div>
      {action}
    </div>
  );
}

/**
 * Exibe uma mensagem curta no canto da tela.
 * @param {{message: string, onClose: () => void}} props Estado da mensagem.
 * @returns {JSX.Element} Toast de feedback.
 */
export function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="toast" role="status" aria-live="polite">
      <span>
        <Check size={14} />
      </span>
      {message}
      <button type="button" onClick={onClose} aria-label="Fechar mensagem">
        <X size={14} />
      </button>
    </div>
  );
}

/**
 * Mostra uma linha compacta de atendimento.
 * @param {{item: object}} props Atendimento que será exibido.
 * @returns {JSX.Element} Linha de atendimento.
 */
export function AppointmentRow({ item }) {
  return (
    <div className="row">
      <div className="date">
        <b>{item.date.split(" ")[0]}</b>
        <small>{item.date.split(" ")[1]}</small>
      </div>
      <div>
        <b>{item.specialty}</b>
        <span>
          {item.unit} • {item.time}
        </span>
        <small>{item.professional}</small>
      </div>
      <StatusPill tone={item.tone}>{item.status}</StatusPill>
    </div>
  );
}

/**
 * Botão de ação simples com ícone de seta.
 * @param {{children: React.ReactNode, onClick: () => void, className?: string}} props Dados do botão.
 * @returns {JSX.Element} Botão estilizado.
 */
export function ActionButton({ children, onClick, className = "btn primary" }) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {children} <ArrowRight size={15} />
    </button>
  );
}

/**
 * Captura erros de renderização para evitar uma tela totalmente vazia.
 */
export class ApplicationErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Erro inesperado na interface:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-page">
          <h1>Não foi possível carregar a interface</h1>
          <p>Atualize a página e tente novamente.</p>
          <button
            type="button"
            className="btn primary"
            onClick={() => window.location.reload()}
          >
            Recarregar página
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
