export const auditTrailListSorting = {
    "Default": 0,
    "ActionDateAscending": 1,
    "ActionDateDescending": 2
} as const;
export type AuditTrailListSorting = (typeof auditTrailListSorting)[keyof typeof auditTrailListSorting];