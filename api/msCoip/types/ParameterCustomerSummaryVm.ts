import type { ChecksheetDetailReportCustomerVm } from "./ChecksheetDetailReportCustomerVm";

 /**
 * @description ParameterCustomerSummaryVm
*/
export type ParameterCustomerSummaryVm = {
    /**
     * @description Gets or sets Id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets PageNumber
     * @type integer | undefined, int32
    */
    pageNumber?: number;
    /**
     * @description Gets or sets checksheetValues
     * @type array
    */
    checksheetValues?: ChecksheetDetailReportCustomerVm[] | null;
};