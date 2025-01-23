import type { AssessmentAreaVm } from "./AssessmentAreaVm";

 /**
 * @description TableDataVm
*/
export type TableDataVm = {
    /**
     * @description Gets or sets Id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets assessmentAreas
     * @type array
    */
    assessmentAreas?: AssessmentAreaVm[] | null;
    /**
     * @description Gets or sets averageScore
     * @type integer | undefined, int32
    */
    averageScore?: number;
    /**
     * @description Gets or sets CustomerLevel
     * @type number | undefined, double
    */
    customerLevel?: number;
};