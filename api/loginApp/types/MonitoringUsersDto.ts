export type MonitoringUsersDto = {
    /**
     * @type string | undefined, guid
    */
    userId?: string;
    /**
     * @type string | undefined
    */
    username?: string;
    /**
     * @type string | undefined
    */
    fullname?: string;
    /**
     * @type string | undefined
    */
    email?: string;
    /**
     * @type string | undefined
    */
    userType?: string;
    /**
     * @type string | undefined
    */
    contactNumber?: string;
    /**
     * @type string | undefined
    */
    lastLoginDate?: string;
    /**
     * @type string | undefined
    */
    registeredDate?: string;
    /**
     * @type string | undefined
    */
    lastReminderDate?: string;
    /**
     * @type string | undefined
    */
    status?: string;
    /**
     * @type string | undefined
    */
    loginStatus?: string;
    /**
     * @type string | undefined
    */
    reminderStatus?: string;
};