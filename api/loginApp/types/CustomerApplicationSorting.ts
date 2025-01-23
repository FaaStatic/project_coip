export const customerApplicationSorting = {
    "Default": 0,
    "CustomerNameAscending": 1,
    "CustomerNameDescending": 2,
    "CustomerEntryLimitAscending": 3,
    "CustomerEntryLimitDescending": 4,
    "CustomerEntryAscending": 5,
    "CustomerEntryDescending": 6,
    "AdminNumberAscending": 7,
    "AdminNumberDescending": 8,
    "StatusAscending": 9,
    "StatusDescending": 10
} as const;
export type CustomerApplicationSorting = (typeof customerApplicationSorting)[keyof typeof customerApplicationSorting];