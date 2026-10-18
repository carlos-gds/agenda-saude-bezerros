/**
 * Dados usados pela demonstração da Agenda Saúde Bezerros.
 * Nenhum registro representa uma pessoa ou atendimento real.
 */

export const specialties = [
  "Clínica geral",
  "Enfermagem",
  "Odontologia",
  "Psicologia",
  "Fisioterapia",
  "Vacinação",
];

export const healthUnits = [
  "UBS Santo Amaro",
  "UBS São Pedro",
  "UBS Encruzilhada",
  "Centro de Especialidades",
];

export const professionals = [
  "Dra. Marina Alves",
  "Dr. Paulo Lima",
  "Enf. Camila Santos",
];

export const availableDates = ["12 nov", "13 nov", "14 nov", "15 nov"];

export const availableTimes = [
  "08:00",
  "09:30",
  "11:00",
  "14:00",
  "15:30",
  "16:30",
];

export const initialAppointments = [
  {
    id: "AT-2104",
    specialty: "Consulta médica",
    unit: "UBS Santo Amaro",
    professional: "Dra. Marina Alves",
    date: "24 out",
    time: "09:30",
    status: "Confirmado",
    tone: "green",
  },
  {
    id: "AT-2156",
    specialty: "Odontologia",
    unit: "Centro de Especialidades",
    professional: "Dr. Paulo Lima",
    date: "05 nov",
    time: "14:00",
    status: "Agendado",
    tone: "blue",
  },
];

export const historicalAppointments = [
  {
    id: "AT-1988",
    specialty: "Fisioterapia",
    unit: "UBS São Pedro",
    professional: "Camila Nunes",
    date: "12 set",
    time: "10:00",
    status: "Concluído",
    tone: "green",
  },
  {
    id: "AT-1941",
    specialty: "Psicologia",
    unit: "UBS Encruzilhada",
    professional: "Rafael Costa",
    date: "02 set",
    time: "15:30",
    status: "Cancelado",
    tone: "orange",
  },
];

export const exams = [
  {
    code: "EX-78291",
    name: "Hemograma completo",
    unit: "Laboratório Municipal",
    date: "Coleta em 18 out",
    status: "Laudo disponível",
    progress: 100,
    tone: "green",
  },
  {
    code: "EX-78310",
    name: "Ultrassonografia abdominal",
    unit: "Centro de Imagem Bezerros",
    date: "Solicitado em 20 out",
    status: "Em análise",
    progress: 62,
    tone: "orange",
  },
];

export const menuItems = [
  { id: "inicio", label: "Início" },
  { id: "agendamento", label: "Agendar atendimento" },
  { id: "atendimentos", label: "Meus atendimentos" },
  { id: "exames", label: "Acompanhar exames" },
  { id: "painel", label: "Painel gestor" },
];
