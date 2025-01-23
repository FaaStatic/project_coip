import type { ServicesListDto } from "./ServicesListDto";

 export type ApplicationDto = {
    /**
     * @type string, guid
    */
    applicationId?: string | null;
    /**
     * @type string | undefined
    */
    parentApplicationCode?: string;
    /**
     * @type string
    */
    applicationCode: string;
    /**
     * @type string | undefined
    */
    publicIp?: string;
    /**
     * @type string, guid
    */
    applicationCategoryId?: string | null;
    /**
     * @type string | undefined
    */
    categoryCode?: string;
    /**
     * @type string
    */
    clientId: string;
    /**
     * @type integer, int32
    */
    accessTokenLifetime?: number | null;
    /**
     * @type integer, int32
    */
    refreshTokenLifeTime?: number | null;
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
     * @type string
    */
    clientSecret: string;
    /**
     * @type string | undefined
    */
    applicationContactPerson?: string;
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
     * @type array | undefined
    */
    services?: ServicesListDto[];
    /**
     * @type string | undefined
    */
    pathWebsite?: string;
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
    pathApplicationAndroid?: string;
    /**
     * @type string | undefined
    */
    pathApplicationIOS?: string;
    /**
     * @type string
    */
    verificationType: string;
};