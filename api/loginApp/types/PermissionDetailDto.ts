export type PermissionDetailDto = {
    /**
     * @type string
    */
    permissionCode: string;
    /**
     * @type string
    */
    requestType: string;
    /**
     * @type string | undefined
    */
    path?: string;
    /**
     * @type string | undefined
    */
    description?: string;
    /**
     * @type string | undefined
    */
    authorization?: string;
    /**
     * @type string | undefined
    */
    apiScope?: string;
};