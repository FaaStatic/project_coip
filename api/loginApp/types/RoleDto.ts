export type RoleDto = {
    /**
     * @type string, guid
    */
    roleId?: string | null;
    /**
     * @type string | undefined
    */
    roleCode?: string;
    /**
     * @type string | undefined
    */
    roleType?: string;
    /**
     * @type integer | undefined, int32
    */
    roleLevel?: number;
    /**
     * @type string, guid
    */
    applicationId?: string | null;
    /**
     * @type boolean | undefined
    */
    status?: boolean;
    /**
     * @type boolean | undefined
    */
    publicInformation?: boolean;
    /**
     * @type string, date-time
    */
    updatedDate?: string | null;
    /**
     * @type array | undefined
    */
    groupIds?: string[];
    /**
     * @type array | undefined
    */
    attributeIds?: string[];
};