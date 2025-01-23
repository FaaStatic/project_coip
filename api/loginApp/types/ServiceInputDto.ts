export type ServiceInputDto = {
    /**
     * @type string, guid
    */
    serviceId?: string | null;
    /**
     * @type string
    */
    serviceCode: string;
    /**
     * @type string
    */
    hostName: string;
    /**
     * @type string
    */
    apiScope: string;
    /**
     * @type boolean | undefined
    */
    status?: boolean;
    /**
     * @type boolean | undefined
    */
    isParse?: boolean;
    /**
     * @type string | undefined
    */
    masterKey?: string;
};