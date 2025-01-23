import type { ChecksheetReportVm } from "./ChecksheetReportVm";
import type { Status } from "./Status";

 /**
 * @description DocumentRootJson
*/
export type DocumentRootJsonOfChecksheetReportVm = {
    meta?: any;
    /**
     * @description Gets or sets data
    */
    data?: ChecksheetReportVm | null;
    /**
     * @description Gets or sets included
     * @type array
    */
    included?: any[] | null;
    /**
     * @description Gets or sets responseTime in ms
     * @type integer | undefined, int64
    */
    responseTime?: number;
    /**
     * @description Gets or sets status
    */
    status?: Status | null;
};