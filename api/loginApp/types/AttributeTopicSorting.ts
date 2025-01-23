export const attributeTopicSorting = {
    "Default": 0,
    "TopicAscending": 1,
    "TopicDescending": 2,
    "AttributeNameAscending": 3,
    "AttributeNameDescending": 4,
    "DescriptionAscending": 5,
    "DescriptionDescending": 6,
    "AttributeTypeAscending": 7,
    "AttributeTypeDescending": 8
} as const;
export type AttributeTopicSorting = (typeof attributeTopicSorting)[keyof typeof attributeTopicSorting];