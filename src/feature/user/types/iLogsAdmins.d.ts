
export interface LogsTypesAdmins {
  status: boolean;
  code: number;
  payload: Payload;
}

export interface Payload {
  data: Log[];
  metadata: PaginationMetadata;
}

export interface Log {
  id: string;
  createdAt: string;
  actorUserId: string;
  actorUsername: string;
  actorEmail: string;
  actorRole: string;
  category: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata: LogMetadata;
  ipAddress: string;
  userAgent: string;
  httpMethod: string;
  path: string;
}

export interface LogMetadata {
  additionalProp1: AdditionalProp1;
}

export interface AdditionalProp1 {}

export interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}