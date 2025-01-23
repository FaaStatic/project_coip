import type { UserApplicationDto } from "./UserApplicationDto";

 export type UserDto = {
    /**
     * @type string, guid
    */
    userId?: string | null;
    /**
     * @type string
    */
    userName: string;
    /**
     * @type string
    */
    email: string;
    /**
     * @type string
    */
    firstName: string;
    /**
     * @type string | undefined
    */
    lastName?: string;
    /**
     * @type string | undefined
    */
    customerCode?: string;
    /**
     * @type string | undefined
    */
    customerInfo?: string;
    /**
     * @type string | undefined
    */
    contactNumber?: string;
    /**
     * @type boolean | undefined
    */
    hasAdminCustomer?: boolean;
    /**
     * @type string | undefined
    */
    roleLevels?: string;
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
     * @type string | undefined
    */
    userType?: string;
    /**
     * @type string | undefined
    */
    provider?: string;
    /**
     * @type array | undefined
    */
    roleIds?: string[];
    /**
     * @type array | undefined
    */
    roleNames?: string[];
    /**
     * @type object | undefined
    */
    userApplication?: UserApplicationDto;
};