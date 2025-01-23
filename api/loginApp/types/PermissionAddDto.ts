export type PermissionAddDto = {
    /**
     * @type string | undefined, guid
    */
    serviceId?: string;
    /**
     * @type string | undefined
    */
    permissionCode?: string;
    /**
     * @type string | undefined
    */
    path?: string;
    /**
     * @type boolean
    */
    postStatus?: boolean | null;
    /**
     * @type string | undefined
    */
    postDescription?: string;
    /**
     * @type boolean
    */
    putStatus?: boolean | null;
    /**
     * @type string | undefined
    */
    putDescription?: string;
    /**
     * @type boolean
    */
    getStatus?: boolean | null;
    /**
     * @type string | undefined
    */
    getDescription?: string;
    /**
     * @type boolean
    */
    deleteStatus?: boolean | null;
    /**
     * @type string | undefined
    */
    deleteDescription?: string;
    /**
     * @type boolean
    */
    patchStatus?: boolean | null;
    /**
     * @type string | undefined
    */
    patchDescription?: string;
};