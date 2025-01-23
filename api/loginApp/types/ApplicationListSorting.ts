export const applicationListSorting = {
    "Default": 0,
    "ApplicationNameAscending": 1,
    "ApplicationNameDescending": 2,
    "HostNameAscending": 3,
    "HostNameDescending": 4,
    "StatusAscending": 5,
    "StatusDescending": 6
} as const;
export type ApplicationListSorting = (typeof applicationListSorting)[keyof typeof applicationListSorting];