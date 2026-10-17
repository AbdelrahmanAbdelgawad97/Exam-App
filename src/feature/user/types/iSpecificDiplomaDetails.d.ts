// export interface DiplomaDetails {
//   status: boolean;
//   code: number;
//   payload: DiplomaPayload;
// }

// export interface DiplomaPayload {
//   diploma: Diploma;
// }

// export interface Diploma {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   immutable: boolean;
//   createdAt: string;
//   updatedAt: string;
//   exams: Exam[];
// }

export interface DiplomaDetails {
  status: boolean;
  code: number;
  payload: {
    diploma: Diploma;
  };
}

export interface Diploma {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  exams: Exam[];
}

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