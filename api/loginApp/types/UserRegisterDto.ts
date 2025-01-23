import type { UserApplicationDto } from "./UserApplicationDto";

 export type UserRegisterDto = {
    /**
     * @type string
    */
    userName: string;
    /**
     * @type string
    */
    firstName: string;
    /**
     * @type string
    */
    lastName: string;
    /**
     * @type string, email
    */
    email: string;
    /**
     * @type string | undefined
    */
    customerCode?: string;
    /**
     * @type string | undefined
    */
    contactNumber?: string;
    /**
     * @type string | undefined
    */
    verificationCode?: string;
    /**
     * @type string | undefined
    */
    captchaResponse?: string;
    /**
     * @type string | undefined
    */
    provider?: string;
    /**
     * @type integer, int32
    */
    gender?: number | null;
    /**
     * @type string | undefined
    */
    titleContact?: string;
    /**
     * @type string | undefined
    */
    branchSupportArea?: string;
    /**
     * @type string | undefined
    */
    phoneNumber?: string;
    /**
     * @type string | undefined
    */
    identityNumber?: string;
    /**
     * @type string | undefined
    */
    taxNumber?: string;
    /**
     * @type object | undefined
    */
    userApplication?: UserApplicationDto;
};