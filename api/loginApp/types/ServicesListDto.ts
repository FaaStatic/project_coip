export type ServicesListDto = {
    /**
     * @type string | undefined
    */
    apiScope?: string;
    /**
     * @type string | undefined
    */
    serviceCode?: string;
    /**
     * @type string | undefined, guid
    */
    serviceId?: string;
    /**
     * @type boolean
    */
    status?: boolean | null;
};