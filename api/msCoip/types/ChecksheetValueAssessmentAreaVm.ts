import type { ChecksheetValueClauseVm } from "./ChecksheetValueClauseVm";
import type { ChecksheetValueAveragePerDayVm } from "./ChecksheetValueAveragePerDayVm";

 /**
 * @description ChecksheetValueAssessmentAreaVm
*/
export type ChecksheetValueAssessmentAreaVm = {
    /**
     * @description Gets or sets id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets assessmentArea
     * @type string
    */
    assessmentArea?: string | null;
    /**
     * @description Gets or sets indexPointArea
     * @type number | undefined, double
    */
    indexPointArea?: number;
    /**
     * @description Gets or sets clauses
     * @type array
    */
    clauses?: ChecksheetValueClauseVm[] | null;
    /**
     * @description Gets or sets averagePerDay
     * @type array
    */
    averagePerDay?: ChecksheetValueAveragePerDayVm[] | null;
};