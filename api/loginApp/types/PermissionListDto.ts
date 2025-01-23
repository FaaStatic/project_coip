export type PermissionListDto = {
    /**
     * @type string | undefined, guid
    */
    serviceId?: string;
    /**
     * @type string | undefined
    */
    serviceName?: string;
    /**
     * @type string | undefined
    */
    permissionCode?: string;
    /**
     * @type string | undefined
    */
    path?: string;
    /**
     * @type string, guid
    */
    postId?: string | null;
    /**
     * @type boolean
    */
    postStatus?: boolean | null;
    /**
     * @type string | undefined
    */
    postDescription?: string;
    /**
     * @type string | undefined
    */
    postAuthorization?: string;
    /**
     * @type string, guid
    */
    putId?: string | null;
    /**
     * @type boolean
    */
    putStatus?: boolean | null;
    /**
     * @type string | undefined
    */
    putDescription?: string;
    /**
     * @type string | undefined
    */
    putAuthorization?: string;
    /**
     * @type string, guid
    */
    getId?: string | null;
    /**
     * @type boolean
    */
    getStatus?: boolean | null;
    /**
     * @type string | undefined
    */
    getDescription?: string;
    /**
     * @type string | undefined
    */
    getAuthorization?: string;
    /**
     * @type string, guid
    */
    deleteId?: string | null;
    /**
     * @type boolean
    */
    deleteStatus?: boolean | null;
    /**
     * @type string | undefined
    */
    deleteDescription?: string;
    /**
     * @type string | undefined
    */
    deleteAuthorization?: string;
    /**
     * @type string, guid
    */
    patchId?: string | null;
    /**
     * @type boolean
    */
    patchStatus?: boolean | null;
    /**
     * @type string | undefined
    */
    patchDescription?: string;
    /**
     * @type string | undefined
    */
    patchAuthorization?: string;
    /**
     * @type string | undefined, date-time
    */
    updatedDate?: string;
};