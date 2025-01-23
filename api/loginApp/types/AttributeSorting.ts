export const attributeSorting = {
    "Default": 0,
    "AttributeNameAscending": 1,
    "AttributeNameDescending": 2,
    "AttributeValueAscending": 3,
    "AttributeValueDescending": 4,
    "AttributeTypeAscending": 5,
    "AttributeTypeDescending": 6,
    "AttributeDescriptionAscending": 7,
    "AttributeDescriptionDescending": 8
} as const;
export type AttributeSorting = (typeof attributeSorting)[keyof typeof attributeSorting];