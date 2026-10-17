
export interface LogsTypes {
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
  username: string
  email: string
  phone: string
  firstName: string
  lastName: string
  profilePhoto: string
  emailVerified: boolean
  phoneVerified: boolean
  role: string
  createdAt: string
  updatedAt: string
}

export interface Metadata {
  page: number
  limit: number
  total: number
  totalPages: number
}
