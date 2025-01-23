import type { UserApplicationDto } from "./UserApplicationDto";

 export type UserApplicationDeviceDto = {
    /**
     * @type string, guid
    */
    userApplicationDeviceId?: string | null;
    /**
     * @type string, guid
    */
    userApplicationId?: string | null;
    /**
     * @type object | undefined
    */
    userApplication?: UserApplicationDto;
    /**
     * @type string | undefined
    */
    deviceId?: string;
    /**
     * @type string | undefined
    */
    appVersion?: string;
    /**
     * @type string | undefined
    */
    osVersion?: string;
};