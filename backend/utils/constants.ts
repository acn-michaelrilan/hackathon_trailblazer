export const SESSION_STATUS = {
  LOCKED: "locked",
  ACTIVE: "active",
  COMPLETED: "completed",
} as const;

export type SessionStatus =
  (typeof SESSION_STATUS)[keyof typeof SESSION_STATUS];
