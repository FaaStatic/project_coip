export type RoleLevelAuthorityDto = {
    /**
     * @type string | undefined, guid
    */
    roleLevelAuthorityId?: string;
    /**
     * @type integer | undefined, int32
    */
    roleLevel?: number;
    /**
     * @type string | undefined
    */
    roleLevelType?: string;
    /**
     * @type string | undefined
    */
    managedRoleLevels?: string;
    /**
     * @type boolean | undefined
    */
    isPrivate?: boolean;
    /**
     * @type string | undefined
    */
    createdBy?: string;
    /**
     * @type string | undefined, date-time
    */
    createdDate?: string;
};