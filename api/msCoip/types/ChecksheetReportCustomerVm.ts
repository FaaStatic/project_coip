import type { CoipReportCustomerVm } from "./CoipReportCustomerVm";
import type { DataUnitReportVm } from "./DataUnitReportVm";

 /**
 * @description ChecksheetReportCustomerVm
*/
export type ChecksheetReportCustomerVm = {
    /**
     * @description Gets or sets id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets jobId
     * @type string | undefined, guid
    */
    jobId?: string;
    /**
     * @description Gets or sets jobNumber
     * @type string
    */
    jobNumber?: string | null;
    /**
     * @description Gets or sets coipReports
    */
    coipReports?: CoipReportCustomerVm | null;
    /**
     * @description Gets or sets dataUnitReport
    */
    dataUnitReport?: DataUnitReportVm | null;
};