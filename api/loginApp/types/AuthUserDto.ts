import type { PermissionDetailDto } from "./PermissionDetailDto";

 export type AuthUserDto = {
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
     * @type array | undefined
    */
    roles?: string[];
    /**
     * @type array | undefined
    */
    permissions?: PermissionDetailDto[];
};