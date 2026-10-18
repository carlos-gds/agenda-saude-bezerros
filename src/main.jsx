import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ApplicationErrorBoundary } from "./components/common";
import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("O elemento raiz da aplicação não foi encontrado.");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <ApplicationErrorBoundary>
      <App />
    </ApplicationErrorBoundary>
  </React.StrictMode>,
);
