import type { AssessmentAreaVm } from "./AssessmentAreaVm";
import type { TrendOperationLevel } from "./TrendOperationLevel";

 /**
 * @description DataChartVm
*/
export type DataChartVm = {
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
     * @description Gets or sets TrendOperationLevels
     * @type array
    */
    trendOperationLevels?: TrendOperationLevel[] | null;
};