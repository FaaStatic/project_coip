import type { Meta2 } from "./Meta2";
import type { Data } from "./Data";
import type { Status } from "./Status";

 export type ErrorResponseRegistrationRequestDto = {
    /**
     * @type object | undefined
    */
    meta?: Meta2;
    /**
     * @type object | undefined
    */
    data?: Data;
    included?: any;
    /**
     * @type integer | undefined, int32
    */
    responseTime?: number;
    /**
     * @type object | undefined
    */
    status?: Status;
};