import type { ServiceDto } from "./ServiceDto";

 export type PermissionDto = {
    /**
     * @type string, guid
    */
    permissionId?: string | null;
    /**
     * @type string
    */
    permissionCode: string;
    /**
     * @type string
    */
    requestType: string;
    /**
     * @type string | undefined
    */
    path?: string;
    /**
     * @type string | undefined
    */
    description?: string;
    /**
     * @type string | undefined
    */
    authorization?: string;
    /**
     * @type boolean | undefined
    */
    status?: boolean;
    /**
     * @type string, guid
    */
    serviceId: string;
    /**
     * @type object | undefined
    */
    service?: ServiceDto;
};