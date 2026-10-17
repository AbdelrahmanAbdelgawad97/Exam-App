export interface SpecificExamById {
  payload: Payload
}

export interface Payload {
  exam: Exam
}

export interface Exam {
  id: string
  title: string
  description: string
  image: string
  duration: number
  questionsCount: number
  diplomaId: string
  diploma: Diploma
  immutable: boolean
  createdAt: string
  updatedAt: string
}

export interface Diploma {
  id: string
  title: string
}