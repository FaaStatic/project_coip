export type CheckListedRole = {
    /**
     * @type string | undefined, guid
    */
    roleId?: string;
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
     * @type boolean | undefined
    */
    isCheckList?: boolean;
};