export const permissionListSorting = {
    "Default": 0,
    "ServiceNameAscending": 1,
    "ServiceNameDescending": 2,
    "PermissionNameAscending": 3,
    "PermissionNameDescending": 4,
    "PostAscending": 5,
    "PostDescending": 6,
    "PutAscending": 7,
    "PutDescending": 8,
    "GetAscending": 9,
    "GetDescending": 10,
    "DeleteAscending": 11,
    "DeleteDescending": 12,
    "PatchAscending": 13,
    "PatchDescending": 14,
    "PathAscending": 15,
    "PathDescending": 16
} as const;
export type PermissionListSorting = (typeof permissionListSorting)[keyof typeof permissionListSorting];