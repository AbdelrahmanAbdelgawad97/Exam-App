export interface Exam {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  questionsCount: number;
  immutable: boolean;
  diplomaId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExamResponse {
  status: boolean;
  code: number;
  payload: {
    data: Exam[];
  };
}