export interface AddingAnswer {
  text: string
  answers: Answer[]
}

export interface Answer {
  text: string
  isCorrect: boolean
}
