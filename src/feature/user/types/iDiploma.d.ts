
export interface IDiploma {
    diploma: Diploma
    
}

export interface Diploma {
    id: string
    title: string
    description: string
    image: string
    immutable: boolean
    createdAt: string
    updatedAt: string
    exams: Exam[]
}

export interface IExam {
    payload: IDiploma
    
}

export interface Exam {
    id: string;
    title: string;
    description: string;
    image: string;
    duration: number;
    questionsCount: number;
    createdAt: string;
}

