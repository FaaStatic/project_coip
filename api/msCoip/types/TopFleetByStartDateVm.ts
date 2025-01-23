import type { ChecksheetValueAssessmentAreaPerDayVm } from "./ChecksheetValueAssessmentAreaPerDayVm";

 /**
 * @description TopFleetByStartDateVm
*/
export type TopFleetByStartDateVm = {
    /**
     * @description Gets or sets Id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets StartDate
     * @type string
    */
    startDate?: string | null;
    /**
     * @description Gets or sets AveragePerDay
     * @type array
    */
    averageAssessmentAreas?: ChecksheetValueAssessmentAreaPerDayVm[] | null;
    /**
     * @description Gets or sets AverageWci
     * @type number | undefined, double
    */
    averageWci?: number;
};