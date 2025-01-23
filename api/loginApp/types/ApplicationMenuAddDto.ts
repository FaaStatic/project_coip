export type ApplicationMenuAddDto = {
    /**
     * @type string | undefined, guid
    */
    applicationId?: string;
    /**
     * @type string | undefined
    */
    parentMenu?: string;
    /**
     * @type string | undefined
    */
    menuCode?: string;
    /**
     * @type string | undefined
    */
    menuDescription?: string;
    /**
     * @type string | undefined
    */
    icon?: string;
    /**
     * @type string | undefined
    */
    url?: string;
    /**
     * @type integer | undefined, int32
    */
    sequence?: number;
    /**
     * @type boolean | undefined
    */
    status?: boolean;
    /**
     * @type boolean | undefined
    */
    isPrivate?: boolean;
    /**
     * @type array | undefined
    */
    roleLevels?: number[];
};