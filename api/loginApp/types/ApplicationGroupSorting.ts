export const applicationGroupSorting = {
    "Default": 0,
    "SequenceAscending": 1,
    "SequenceDescending": 2,
    "ApplicationCodeAscending": 3,
    "ApplicationCodeDescending": 4,
    "CategoryAscending": 5,
    "CategoryDescending": 6,
    "StatusAscending": 7,
    "StatusDescending": 8
} as const;
export type ApplicationGroupSorting = (typeof applicationGroupSorting)[keyof typeof applicationGroupSorting];