export type ApplicationDashboardDto = {
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
    applicationPreview?: string;
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
     * @type string | undefined
    */
    applicationContactPerson?: string;
    /**
     * @type boolean | undefined
    */
    visibility?: boolean;
};