import type { UserTokenResponseDto } from "./UserTokenResponseDto";

 export type UserNewLoginDto = {
    /**
     * @type string | undefined, guid
    */
    userId?: string;
    /**
     * @type string | undefined
    */
    userName?: string;
    /**
     * @type string | undefined
    */
    contactNumber?: string;
    /**
     * @type string | undefined
    */
    firstName?: string;
    /**
     * @type string | undefined
    */
    lastName?: string;
    /**
     * @type string | undefined
    */
    email?: string;
    /**
     * @type string | undefined
    */
    customerCode?: string;
    /**
     * @type object | undefined
    */
    tokenResponse?: UserTokenResponseDto;
    /**
     * @type string | undefined
    */
    userType?: string;
};