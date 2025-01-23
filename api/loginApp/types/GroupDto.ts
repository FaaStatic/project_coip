export type GroupDto = {
    /**
     * @type string, guid
    */
    groupId?: string | null;
    /**
     * @type string, guid
    */
    applicationId?: string | null;
    /**
     * @type string | undefined
    */
    groupCode?: string;
    /**
     * @type boolean | undefined
    */
    status?: boolean;
    /**
     * @type array
    */
    permissionIds: string[];
};