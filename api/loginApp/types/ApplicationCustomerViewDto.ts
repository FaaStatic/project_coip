import type { CustomerEntryDto } from "./CustomerEntryDto";

 export type ApplicationCustomerViewDto = {
    /**
     * @type string, guid
    */
    applicationId?: string | null;
    /**
     * @type string | undefined
    */
    applicationCode?: string;
    /**
     * @type integer | undefined, int32
    */
    roleLevel?: number;
    /**
     * @type integer | undefined, int32
    */
    customerEntryLimit?: number;
    /**
     * @type integer | undefined, int32
    */
    customerEntry?: number;
    /**
     * @type array | undefined
    */
    customerEntryList?: CustomerEntryDto[];
    /**
     * @type array | undefined
    */
    customerEntryLimitList?: CustomerEntryDto[];
};