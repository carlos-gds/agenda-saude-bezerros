# Agenda Saúde Bezerros

Interface web responsiva criada em React para apresentar uma solução digital ao desafio de Saúde Municipal de Bezerros, Pernambuco.

> Projeto acadêmico desenvolvido como protótipo de interface. Os dados exibidos são fictícios e não existe integração com sistemas reais da Prefeitura.

## Sobre o projeto

O desafio identificado no portal Desafios de Pernambuco propõe facilitar o acesso da população aos serviços de saúde municipal. Muitas pessoas ainda precisam se deslocar até uma unidade ou enfrentar filas para marcar uma consulta, acompanhar um exame ou confirmar um atendimento.

O **Agenda Saúde Bezerros** apresenta uma solução digital para centralizar essas tarefas em um único portal. A pessoa usuária consegue consultar os próximos atendimentos, iniciar um agendamento, acompanhar exames e visualizar lembretes.

O protótipo também inclui uma visão demonstrativa para a Secretaria de Saúde, com indicadores fictícios de atendimentos, absenteísmo, demanda reprimida e ocupação por especialidade.

## Funcionalidades demonstradas

- Página inicial com acesso rápido às principais ações;
- Agendamento em três etapas: atendimento, horário e confirmação;
- Seleção de especialidade, unidade, profissional, data e horário;
- Lista de atendimentos com status e códigos fictícios;
- Busca de exames pelo nome ou código da solicitação;
- Indicador visual de andamento dos exames;
- Avisos de privacidade e proteção de dados;
- Painel gestor com métricas, gráfico de volume e alertas;
- Feedback visual para confirmações e ações do usuário;
- Layout adaptado para telas menores.

## Tecnologias

- React;
- Vite;
- JavaScript (ES Modules);
- Lucide React para ícones;
- CSS responsivo;
- Prettier para padronização do código.

## Como executar localmente

É necessário ter o [Node.js na versão LTS](https://nodejs.org/) instalado.

```bash
# Baixe ou clone este repositório
git clone https://github.com/carlos-gds/agenda-saude-bezerros.git
cd agenda-saude-bezerros

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Depois, abra no navegador o endereço mostrado no terminal, normalmente:

```text
http://localhost:3000
```

## Scripts disponíveis

```bash
npm run dev          # inicia o servidor local
npm run build        # gera o build de produção
npm run format       # formata o projeto com Prettier
npm run format:check # verifica a formatação sem alterar arquivos
```

## Organização do código

```text
src/
├── components/
│   ├── AppLayout.jsx       # sidebar, cabeçalho e navegação
│   └── common.jsx          # componentes reutilizáveis e Error Boundary
├── data/
│   └── mockData.js         # dados fictícios da demonstração
├── pages/
│   ├── AppointmentsPage.jsx
│   ├── BookingPage.jsx
│   ├── DashboardPage.jsx
│   ├── ExamsPage.jsx
│   └── HomePage.jsx
├── App.jsx                 # estado compartilhado e seleção de telas
├── main.jsx                # ponto de entrada da aplicação
└── styles.css              # identidade visual e responsividade
```

A documentação das decisões de arquitetura está disponível em [`docs/architecture.md`](docs/architecture.md).

## Limitações do protótipo

Esta versão não possui autenticação, banco de dados, integração com e-SUS, envio de SMS ou WhatsApp, conexão com a Prefeitura ou armazenamento permanente. Para uma versão de produção, seria necessário criar uma API segura, autenticação forte, controle de acesso, banco de dados, auditoria e adequação completa à LGPD.

## Contexto acadêmico

O projeto foi desenvolvido para demonstrar como uma interface digital pode reduzir deslocamentos, organizar os agendamentos e oferecer uma visão mais clara dos serviços de saúde municipal.
