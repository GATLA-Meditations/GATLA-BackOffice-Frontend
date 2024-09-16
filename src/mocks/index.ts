import {Module, Treatment} from "../types";

export const module1Mock = {
  type: "QUESTIONNAIRES",
  id: "treatmentId",
  name: "Questionnaires",
  description: "Escala de satisfacción con la vida",
  activities: [
    {
      id: "questionnaireId",
      name: "Escala de satisfacción con la vida",
      completed: false,
      contents: []
    },
  ],
  progress: null,
};

export const userMock = {
  id: "userId",
  patient_code: "GTL-705",
  password: "fake_user",
  meditationType: "Cristiana",
};

export const emptyUserMock = {
    patient_code: "",
    password: "",
    treatments: { id: "", delayed: false }
};

export const emptyAdminMock = {
    email: "",
    password: "",
};

export const activityMock = {
    title: 'Meditando',
    description: 'Esta es una nueva actividad',
    videoUrl: 'www.example.com'
}

export const module2Mock: Module = {
  type: "MEDITATION",
  id: "treatmentId",
  name: "Semana 1",
  description: "Meditación semana 1",
  activities: [
    {
      id: "week1Activity1",
      name: "Actividad 1",
      completed: false,
      contents: []
    },
    {
      id: "week1Activity2",
      name: "Actividad 2",
      completed: false,
      contents: []
    },
    {
      id: "week1Activity3",
      name: "Actividad 3",
      completed: false,
      contents: []
    },
  ],
  progress: null,
};

export const treatmentMock: Treatment = {
    id: "treatmentId",
    name: "Tratamiento de depresión",
    description: "Tratamiento para la depresión",
    modules: [module1Mock, module2Mock],
};

export const questionnaireMock = {
    id: "questionnaireId",
    name: "Escala de satisfacción con la vida",
    questions: [
        {
            id: "questionId1",
            type: "NUMERIC",
            name: "En muchos aspectos, mi vida se acerca a mi ideal",
            metadata: '{ "min": 1, "max": 7 }',
            questionnaireId: "questionnaireId",
        },
        {
            id: "questionId2",
            type: "NUMERIC",
            name: "Mis condiciones de vida son excelentes",
            metadata: '{ "min": 1, "max": 7 }',
            questionnaireId: "questionnaireId",
        },
        {
            id: "questionId3",
            type: "NUMERIC",
            name: "Estoy satisfecho/a con mi vida",
            metadata: '{ "min": 1, "max": 7 }',
            questionnaireId: "questionnaireId",
        },
        {
            id: "questionId4",
            type: "NUMERIC",
            name: "Hasta ahora, he conseguido las cosas importantes que quiero en la vida",
            metadata: '{ "min": 1, "max": 7 }',
            questionnaireId: "questionnaireId",
        },
        {
            id: "questionId5",
            type: "NUMERIC",
            name: "En muchos aspectos, mi vida se acerca a mi ideal",
            metadata: '{ "min": 1, "max": 7 }',
            questionnaireId: "questionnaireId",
        },
    ],
};
