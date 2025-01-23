export const serviceListSorting = {
    "Default": 0,
    "ServiceNameAscending": 1,
    "ServiceNameDescending": 2,
    "HostNameAscending": 3,
    "HostNameDescending": 4,
    "StatusAscending": 5,
    "StatusDescending": 6
} as const;
export type ServiceListSorting = (typeof serviceListSorting)[keyof typeof serviceListSorting];