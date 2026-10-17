export interface IDiplomaPayload {
  status: boolean
  code: number
  payload: Payload
}

export interface Payload {
  data: Daum[]
  metadata: Metadata
}

export interface Daum {
  id: string
  title: string
  description: string
  image: string
  immutable: boolean
  createdAt: string
  updatedAt: string
  questionsCount: number
}

export interface Metadata {
  page: number
  limit: number
  total: number
  totalPages: number
}