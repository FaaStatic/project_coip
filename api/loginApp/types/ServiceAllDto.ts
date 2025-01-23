export type ServiceAllDto = {
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
    apiScope: string;
    /**
     * @type boolean | undefined
    */
    status?: boolean;
};