export type UserLoginByPinDto = {
    /**
     * @type string
    */
    userName: string;
    /**
     * @type string
    */
    pin: string;
    /**
     * @type string | undefined
    */
    version?: string;
};