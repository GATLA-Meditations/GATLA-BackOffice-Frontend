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
    questionnaires: Questionnaire[];
}

export interface TreatmentInput {
    name: string;
    description: string;
    modules: ModuleInput[];
    questionnaires: string[];
}

export interface Module {
    type: string;
    id: string;
    name: string;
    description: string;
    activities: Activity[];
    progress: number | null;
}

export interface ModuleInput {
    name: string;
    description: string;
    activities: ActivityInput[];
}

export interface Activity {
    id: string;
    name: string;
    completed: boolean;
}

export interface ActivityInput {
    name: string;
    contents: ContentInput[];
}

export interface ContentInput {
    type: string;
    content: string;
}

export interface Questionnaire {
    id: string;
    name: string;
}

export interface QuestionnaireInfo {
    id: string;
    name: string;
    questions: Question[];
}

export interface QuestionInput {
    id?: string;
    type: QuestionType;
    name: string;
    metadata: string;
    metadataValues: number[];
    measuredVariable: string;
    isInverted?: boolean;
}

export interface Question {
    id: string;
    type: QuestionType;
    name: string;
    metadata: string;
    metadataValues: number[];
    questionnaireId: string;
    measuredVariable: string;
    isInverted?: boolean;
}

export enum QuestionType {
    NUMERIC = "NUMERIC",
    NOT_A_QUESTION = "NOT_A_QUESTION",
    SINGLE_CHOICE = "SINGLE_CHOICE",
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
}

export interface User {
    id: string;
    patient_code: string;
    password: string;
    meditationType: string;
    treatments: Treatment[];
}

export interface UpdateUserInput {
    patient_code: string;
    password: string;
    meditationType: string;
    treatmentId: string;
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

export interface ActivityContent {
    id?: string;
    type: string;
    content:string;
    order: number;
}

export interface Activity {
    id:string;
    name:string;
    contents: ActivityContent[]
}

export interface ShopItemInput {
    type:string,
    price:number,
    content_url: string
}

export interface ShopItem extends ShopItemInput {
    owns: boolean;
    itemId: string;
}