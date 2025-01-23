import type { CoipReportVm } from "./CoipReportVm";
import type { ParameterSummaryVm } from "./ParameterSummaryVm";
import type { DataUnitReportVm } from "./DataUnitReportVm";

 /**
 * @description ChecksheetReportVm
*/
export type ChecksheetReportVm = {
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
     * @description Gets or sets coipNumber
     * @type string
    */
    coipNumber?: string | null;
    /**
     * @description Gets or sets coipReports
    */
    coipReports?: CoipReportVm | null;
    /**
     * @description Gets or sets parameters
     * @type array
    */
    parameters?: ParameterSummaryVm[] | null;
    /**
     * @description Gets or sets dataUnitReport
    */
    dataUnitReport?: DataUnitReportVm | null;
};