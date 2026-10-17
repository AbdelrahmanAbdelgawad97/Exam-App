
// export interface iSpecificLogResponse {
//   data: iSpecificLog;
//   status: number;
//   statusText: string;
//   headers: unknown;
//   config: unknown;
//   request: XMLHttpRequest;
// }

// export interface iSpecificLog {
//   status: boolean;
//   code: number;
//   payload: Payload;
// }

// export interface Payload {
//   auditLog: AuditLog;
// }

// export interface AuditLog {
//   id: string;
//   createdAt: string;
//   actorUserId: string;
//   actorUsername: string;
//   actorEmail: string;
//   actorRole: string;
//   category: string;
//   action: string;
//   entityType: string;
//   entityId: string;
//   metadata: Metadata;
//   ipAddress: string;
//   userAgent: string;
//   httpMethod: string;
//   path: string;
// }

// export interface Metadata {
//   additionalProp1: AdditionalProp1;
// }

// export interface AdditionalProp1 {}

export interface iSpecificLog {
  status: boolean;
  code: number;
  payload: Payload;
}

export interface Payload {
  auditLog: AuditLog;
}

export interface AuditLog {
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
  metadata: Metadata;
  ipAddress: string;
  userAgent: string;
  httpMethod: string;
  path: string;
}

export interface Metadata {
  additionalProp1: AdditionalProp1;
}

export interface AdditionalProp1 {}