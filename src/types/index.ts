export interface User {
    patientId: string;
    password: string;
}

export interface Treatment {
    id: string;
    name: string;
    description: string;
    modules: Module[];
}

export interface Module {
    type: string;
    id: string;
    name: string;
    description: string;
    activities: Activity[];
    progress: number | null;
}

export interface Activity {
    id: string;
    name: string;
    completed: boolean;
}

export interface Questionaire {
    id: string;
    name: string;
    questions: Question[];
}

export interface Question {
    id: string;
    type: string;
    name: string;
    metadata: string;
    questionnaireId: string;
}

export interface User {
    id: string;
    patientCode: string;
    password: string;
    meditationType: string;
}

export interface UpdateUserInput {
    patientCode: string;
    password: string;
    meditationType: string;
}