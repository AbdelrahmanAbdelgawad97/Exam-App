export interface Answer {
  questionId: string;
  answerId: string;
}

export interface ExamSubmissionRequest {
  examId: string | undefined;
  answers: Answer[];
  startedAt: Date;
}

export interface ExamSubmissionResponse {
  code: number;
  status: boolean;
  payload: {
    submission: ISubmission;
    analytics: IAnalytics[];
  };
}