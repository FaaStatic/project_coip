export const roleListSorting = {
    "Default": 0,
    "RoleCodeAscending": 1,
    "RoleCodeDescending": 2,
    "StatusAscending": 3,
    "StatusDescending": 4,
    "RoleLevelAscending": 5,
    "RoleLevelDescending": 6
} as const;
export type RoleListSorting = (typeof roleListSorting)[keyof typeof roleListSorting];