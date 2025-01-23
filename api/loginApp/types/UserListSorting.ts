export const userListSorting = {
    "Default": 0,
    "UsernameAscending": 1,
    "UsernameDescending": 2,
    "FirstNameAscending": 3,
    "FirstNameDescending": 4,
    "LastNameAscending": 5,
    "LastNameDescending": 6,
    "EmailAscending": 7,
    "EmailDescending": 8,
    "StatusAscending": 9,
    "StatusDescending": 10,
    "CustomerCodeAscending": 11,
    "CustomerCodeDescending": 12,
    "RoleLevelAscending": 13,
    "RoleLevelDescending": 14
} as const;
export type UserListSorting = (typeof userListSorting)[keyof typeof userListSorting];