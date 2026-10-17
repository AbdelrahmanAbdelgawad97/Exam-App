export interface iClearLogs {
  status: boolean
  code: number
  payload: Payload
}

export interface Payload {
  deletedCount: number
}
