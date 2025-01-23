export type UserForNotificationDto = {
    /**
     * @type string | undefined, guid
    */
    userId?: string;
    /**
     * @type string | undefined
    */
    clientId?: string;
    /**
     * @type boolean | undefined
    */
    isCustomer?: boolean;
    /**
     * @type boolean | undefined
    */
    status?: boolean;
};