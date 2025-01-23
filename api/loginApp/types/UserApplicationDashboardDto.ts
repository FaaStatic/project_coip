export type UserApplicationDashboardDto = {
    /**
     * @type string | undefined, guid
    */
    userApplicationGroupId?: string;
    /**
     * @type string | undefined, guid
    */
    applicationId?: string;
    /**
     * @type string | undefined
    */
    applicationCode?: string;
    /**
     * @type string | undefined
    */
    appIcon?: string;
    /**
     * @type string | undefined
    */
    applicationDescription?: string;
    /**
     * @type string | undefined
    */
    pathApplicationAndroid?: string;
    /**
     * @type string | undefined
    */
    pathApplicationIOS?: string;
    /**
     * @type string | undefined
    */
    pathDirectionAndroid?: string;
    /**
     * @type string | undefined
    */
    pathDirectionIOS?: string;
    /**
     * @type string | undefined
    */
    pathWebsite?: string;
    /**
     * @type integer | undefined, int32
    */
    sequence?: number;
    /**
     * @type boolean | undefined
    */
    status?: boolean;
    /**
     * @type string | undefined, date-time
    */
    createdDate?: string;
    /**
     * @type string | undefined
    */
    createdBy?: string;
};