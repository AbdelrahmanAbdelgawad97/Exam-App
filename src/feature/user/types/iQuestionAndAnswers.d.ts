export interface QuestionAndAnswers {
  code: number;
  status: boolean;
  payload: Payload;
}

export interface Payload {
  question: Question;
}

export interface Question {
  id: string;
  text: string;
  examId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  answers: Answer[];
  exam: Exam;
}

export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Exam {
  id: string;
  title: string;
}