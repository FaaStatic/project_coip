import type { CustomerDto } from "./CustomerDto";

 export type CustomerApplicationDto = {
    /**
     * @type string, guid
    */
    customerApplicationId?: string | null;
    /**
     * @type string, guid
    */
    applicationId?: string | null;
    /**
     * @type string | undefined, guid
    */
    customerId?: string;
    /**
     * @type object | undefined
    */
    customer?: CustomerDto;
    /**
     * @type integer | undefined, int32
    */
    customerEntryLimit?: number;
    /**
     * @type integer | undefined, int32
    */
    customerEntry?: number;
    /**
     * @type integer | undefined, int32
    */
    adminNumber?: number;
    /**
     * @type boolean | undefined
    */
    status?: boolean;
};