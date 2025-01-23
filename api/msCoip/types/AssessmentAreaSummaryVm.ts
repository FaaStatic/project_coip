import type { ChecksheetDetailVm } from "./ChecksheetDetailVm";

 /**
 * @description AssessmentAreaSummaryVm
*/
export type AssessmentAreaSummaryVm = {
    /**
     * @description Gets or sets Id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets assessmentArea
     * @type string
    */
    assessmentArea?: string | null;
    /**
     * @description Gets or sets checksheetValues
     * @type array
    */
    checksheetValues?: ChecksheetDetailVm[] | null;
};