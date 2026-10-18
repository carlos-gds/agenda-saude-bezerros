# Arquitetura do projeto

## Organização

O projeto usa React com componentes funcionais e separa responsabilidades por domínio:

- `src/main.jsx`: ponto de entrada, `StrictMode` e `ApplicationErrorBoundary`.
- `src/App.jsx`: coordena navegação e estado compartilhado da demonstração.
- `src/components/`: componentes reutilizáveis, layout, feedback e tratamento de erros.
- `src/pages/`: uma página por fluxo do produto.
- `src/data/mockData.js`: dados fictícios centralizados, sem acesso direto nos componentes de layout.
- `src/styles.css`: tokens visuais, componentes e breakpoints responsivos.

## Decisões de projeto

A aplicação é um SPA pequeno e local. Por isso, não foi criado um backend artificial. O estado do agendamento é mantido em memória e os dados são explicitamente fictícios.

O componente `ApplicationErrorBoundary` evita que um erro de renderização deixe a tela em branco. O fluxo de agendamento valida os campos obrigatórios antes de avançar e usa `try/catch` na confirmação para apresentar uma mensagem amigável ao usuário.

Os componentes recebem eventos e dados por propriedades, em vez de alterar o estado de outros componentes diretamente. Isso deixa as páginas mais coesas e facilita uma futura substituição dos dados simulados por uma API.

## Padrões usados

- **Container/Presentational:** `App` coordena estado; páginas e componentes exibem a interface.
- **Composição:** `AppLayout`, `PageHeading`, `StatusPill` e `ActionButton` são reutilizados.
- **Single Source of Truth:** listas de unidades, profissionais, exames e atendimentos ficam em `mockData.js`.
- **Guard Clause:** validações retornam cedo quando os dados obrigatórios não estão preenchidos.
- **Error Boundary:** falhas de renderização são isoladas com uma tela de recuperação.

## Qualidade

O projeto usa Prettier para manter JavaScript, JSX, CSS e arquivos de configuração formatados. Rode `npm run format:check` antes de enviar alterações ao GitHub e `npm run build` para verificar a compilação de produção.
