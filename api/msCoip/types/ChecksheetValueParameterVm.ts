import type { ChecksheetValueAssessmentAreaVm } from "./ChecksheetValueAssessmentAreaVm";

 /**
 * @description ChecksheetValueParameterVm
*/
export type ChecksheetValueParameterVm = {
    /**
     * @description Gets or sets id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets assessmentAreas
     * @type array
    */
    assessmentAreas?: ChecksheetValueAssessmentAreaVm[] | null;
};