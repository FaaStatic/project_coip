export const groupListSorting = {
    "Default": 0,
    "GroupCodeAscending": 1,
    "GroupCodeDescending": 2,
    "StatusAscending": 3,
    "StatusDescending": 4
} as const;
export type GroupListSorting = (typeof groupListSorting)[keyof typeof groupListSorting];