import type { ApplicationCategory } from "./ApplicationCategory";

 export type Application = {
    /**
     * @type string | undefined, guid
    */
    applicationId?: string;
    /**
     * @type string, guid
    */
    applicationCategoryId?: string | null;
    /**
     * @type object | undefined
    */
    applicationCategory?: ApplicationCategory;
    /**
     * @type string | undefined
    */
    applicationDescription?: string;
    /**
     * @type string | undefined
    */
    appIcon?: string;
    /**
     * @type string | undefined
    */
    applicationPreview?: string;
    /**
     * @type boolean
    */
    isAllowPublicRegist?: boolean | null;
    /**
     * @type boolean
    */
    isNewTab?: boolean | null;
    /**
     * @type integer | undefined, int32
    */
    accessTokenLifetime?: number;
    /**
     * @type integer | undefined, int32
    */
    refreshTokenLifetime?: number;
    /**
     * @type string
    */
    applicationCode: string;
    /**
     * @type string | undefined
    */
    publicIp?: string;
    /**
     * @type string
    */
    clientId: string;
    /**
     * @type string
    */
    clientSecret: string;
    /**
     * @type string | undefined
    */
    applicationUrl?: string;
    /**
     * @type string | undefined
    */
    grantType?: string;
    /**
     * @type boolean | undefined
    */
    status?: boolean;
    /**
     * @type string | undefined
    */
    applicationContactPerson?: string;
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
    pathWebsite?: string;
    /**
     * @type string | undefined
    */
    pathDirectionIOS?: string;
    /**
     * @type string | undefined
    */
    pathDirectionAndroid?: string;
    /**
     * @type boolean | undefined
    */
    usingParse?: boolean;
    /**
     * @type string | undefined
    */
    createdBy?: string;
    /**
     * @type string | undefined, date-time
    */
    createdDate?: string;
    /**
     * @type string | undefined
    */
    updatedBy?: string;
    /**
     * @type string, date-time
    */
    updatedDate?: string | null;
    /**
     * @type string | undefined
    */
    verificationType?: string;
};