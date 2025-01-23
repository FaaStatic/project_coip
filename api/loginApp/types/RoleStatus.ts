export const roleStatus = {
    "Default": 0,
    "Active": 1,
    "InActive": 2
} as const;
export type RoleStatus = (typeof roleStatus)[keyof typeof roleStatus];