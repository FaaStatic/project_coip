import type { AssessmentAreaSummaryVm } from "./AssessmentAreaSummaryVm";

 /**
 * @description ParameterSummaryVm
*/
export type ParameterSummaryVm = {
    /**
     * @description Gets or sets Id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets parameter
     * @type string
    */
    parameter?: string | null;
    /**
     * @description Gets or sets assessmentAreas
     * @type array
    */
    assessmentAreas?: AssessmentAreaSummaryVm[] | null;
};