export type UserLogin2faDto = {
    /**
     * @type string
    */
    userName: string;
    /**
     * @type string | undefined
    */
    secretToken?: string;
    /**
     * @type string | undefined
    */
    code?: string;
    /**
     * @type boolean
    */
    isPrimaryUserAgent?: boolean | null;
};