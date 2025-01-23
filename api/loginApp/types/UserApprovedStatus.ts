export const userApprovedStatus = {
    "Default": 0,
    "Approved": 1,
    "NotApproved": 2
} as const;
export type UserApprovedStatus = (typeof userApprovedStatus)[keyof typeof userApprovedStatus];