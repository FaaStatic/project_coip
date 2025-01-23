/**
 * @description AssessmentAreaVm
*/
export type AssessmentAreaVm = {
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
     * @description Gets or sets score
     * @type number | undefined, double
    */
    score?: number;
    /**
     * @description Gets or sets Percentage
     * @type number | undefined, double
    */
    percentage?: number;
};