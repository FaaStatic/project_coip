export type ApplicationCategory = {
    /**
     * @type string | undefined, guid
    */
    applicationCategoryId?: string;
    /**
     * @type string | undefined
    */
    categoryCode?: string;
    /**
     * @type boolean | undefined
    */
    status?: boolean;
    /**
     * @type string | undefined
    */
    categoryDescription?: string;
    /**
     * @type integer | undefined, int32
    */
    sequence?: number;
    /**
     * @type string | undefined
    */
    createdBy?: string;
    /**
     * @type string | undefined, date-time
    */
    createdDate?: string;
    /**
     * @type string | undefined
    */
    updatedBy?: string;
    /**
     * @type string | undefined, date-time
    */
    updatedDate?: string;
};