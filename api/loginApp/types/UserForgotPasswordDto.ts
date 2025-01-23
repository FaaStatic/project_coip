export type UserForgotPasswordDto = {
    /**
     * @type string | undefined
    */
    email?: string;
    /**
     * @type string | undefined
    */
    token?: string;
    /**
     * @type string | undefined
    */
    password?: string;
    /**
     * @type string | undefined, guid
    */
    applicationId?: string;
};