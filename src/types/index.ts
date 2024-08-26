export interface StepperItem {
    id:string;
    name: string;
    route:string;
    position: number;
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
    patient_code: string;
    password: string;
    meditationType: string;
}

export interface UpdateUserInput {
    patient_code: string;
    password: string;
    meditationType: string;
}

export interface ModuleAux {
    id: string;
    name: string;
    description: string;
    activities: ActivityPreview[];
    progress: number;
}

export interface ActivityPreview {
    id: string;
    unlocked: boolean;
    name: string;
}

export interface ActivityInput {
    name:string;
    description:string;
    videoUrl:string;
}