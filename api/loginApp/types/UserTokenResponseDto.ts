export type UserTokenResponseDto = {
    /**
     * @type string | undefined
    */
    accessToken?: string;
    /**
     * @type string | undefined
    */
    identityToken?: string;
    /**
     * @type string | undefined
    */
    tokenType?: string;
    /**
     * @type string | undefined
    */
    refreshToken?: string;
    /**
     * @type string | undefined
    */
    errorDescription?: string;
    /**
     * @type integer | undefined, int32
    */
    expiresIn?: number;
};