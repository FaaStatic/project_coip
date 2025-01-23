/**
 * @description ChecksheetValueAssessmentAreaPerDayVm
*/
export type ChecksheetValueAssessmentAreaPerDayVm = {
    /**
     * @description Gets or sets id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets AssessmentArea
     * @type string
    */
    assessmentArea?: string | null;
    /**
     * @description Gets or sets averageScore
     * @type number | undefined, double
    */
    averageScore?: number;
};