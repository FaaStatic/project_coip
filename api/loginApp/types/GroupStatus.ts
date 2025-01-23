export const groupStatus = {
    "Default": 0,
    "Active": 1,
    "InActive": 2
} as const;
export type GroupStatus = (typeof groupStatus)[keyof typeof groupStatus];