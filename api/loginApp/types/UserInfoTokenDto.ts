import type { ApplicationMenuDto } from "./ApplicationMenuDto";
import type { UserTokenResponseDto } from "./UserTokenResponseDto";
import type { UserCredentialDto } from "./UserCredentialDto";

 export type UserInfoTokenDto = {
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
     * @type string | undefined
    */
    position?: string;
    /**
     * @type array | undefined
    */
    roleLevels?: number[];
    /**
     * @type integer | undefined, int32
    */
    roleLevel?: number;
    /**
     * @type array | undefined
    */
    menus?: ApplicationMenuDto[];
    /**
     * @type string | undefined
    */
    regionLevel?: string;
    /**
     * @type integer, int32
    */
    reminder?: number | null;
    /**
     * @type string | undefined
    */
    description?: string;
    /**
     * @type object | undefined
    */
    tokenResponse?: UserTokenResponseDto;
    /**
     * @type array | undefined
    */
    userCredential?: UserCredentialDto[];
    /**
     * @type string | undefined
    */
    imageName?: string;
    /**
     * @type string | undefined
    */
    imagePath?: string;
    /**
     * @type string | undefined
    */
    userType?: string;
    /**
     * @type string | undefined
    */
    provider?: string;
    /**
     * @type string | undefined
    */
    branchSupportArea?: string;
};