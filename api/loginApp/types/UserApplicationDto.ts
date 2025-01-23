export type UserApplicationDto = {
    /**
     * @type string, guid
    */
    userApplicationId?: string | null;
    /**
     * @type string | undefined, guid
    */
    applicationId?: string;
    /**
     * @type string, guid
    */
    userId?: string | null;
    /**
     * @type string | undefined
    */
    verificationCode?: string;
    /**
     * @type boolean | undefined
    */
    status?: boolean;
    /**
     * @type boolean
    */
    isTwoFactorEnabled?: boolean | null;
    /**
     * @type string | undefined
    */
    approvedBy?: string;
    /**
     * @type string, date-time
    */
    createdDate?: string | null;
    /**
     * @type string, date-time
    */
    updatedDate?: string | null;
};