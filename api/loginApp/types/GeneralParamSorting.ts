export const generalParamSorting = {
    "Default": 0,
    "CodeAscending": 1,
    "CodeDescending": 2
} as const;
export type GeneralParamSorting = (typeof generalParamSorting)[keyof typeof generalParamSorting];