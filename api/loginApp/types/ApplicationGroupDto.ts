export type ApplicationGroupDto = {
    /**
     * @type string | undefined, guid
    */
    applicationGroupId?: string;
    /**
     * @type string, guid
    */
    applicationId: string;
    /**
     * @type string, guid
    */
    applicationParentId: string;
    /**
     * @type string
    */
    sequence: string;
    /**
     * @type string | undefined
    */
    applicationCode?: string;
    /**
     * @type string | undefined
    */
    category?: string;
    /**
     * @type boolean
    */
    status: boolean;
};