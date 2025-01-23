import type { DataRelatedUnitReportVm } from "./DataRelatedUnitReportVm";

 /**
 * @description DataUnitReportVm
*/
export type DataUnitReportVm = {
    /**
     * @description Gets or sets id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets unitModel
     * @type string
    */
    unitModel?: string | null;
    /**
     * @description Gets or sets unitCode
     * @type string
    */
    unitCode?: string | null;
    /**
     * @description Gets or sets dataRelatedUnitReport
     * @type array
    */
    dataRelatedUnitReport?: DataRelatedUnitReportVm[] | null;
};