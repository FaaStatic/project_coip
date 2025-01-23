export type UserLoginDto = {
    /**
     * @type string
    */
    userName: string;
    /**
     * @type string
    */
    password: string;
    /**
     * @type string | undefined
    */
    version?: string;
};