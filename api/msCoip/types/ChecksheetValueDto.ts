/**
 * @description CheckSheetValueDto
*/
export type ChecksheetValueDto = {
    /**
     * @description Gets or sets id
     * @type string, guid
    */
    id: string;
    /**
     * @description Gets or sets jobId
     * @type string, guid
    */
    jobId: string;
    /**
     * @description Gets or sets sector
     * @type string
    */
    sector: string;
    /**
     * @description Gets or sets parameter
     * @type string
    */
    parameter: string;
    /**
     * @description Gets or sets assessmentArea
     * @type string
    */
    assessmentArea: string;
    /**
     * @description Gets or sets unitApplication
     * @type string
    */
    unitApplication: string;
    /**
     * @description Gets or sets klausul
     * @type string
    */
    klausul: string;
    /**
     * @description Gets or sets description
     * @type string
    */
    description?: string | null;
    /**
     * @description Gets or sets operationStandard
     * @type array
    */
    operationStandard: string[];
    /**
     * @description Gets or sets guidance
     * @type array
    */
    guidance: string[];
    /**
     * @description Gets or sets score
     * @type array
    */
    score: number[];
    /**
     * @description Gets or sets weight
     * @type number | undefined, float
    */
    weight?: number;
    /**
     * @description Gets or sets comment
     * @type string
    */
    comment: string;
    /**
     * @description Gets or sets Recommendation
     * @type string
    */
    recommendation: string;
    /**
     * @description Gets or sets attachment
     * @type string
    */
    attachment: string;
    /**
     * @description Gets or sets sequence
     * @type integer | undefined, int32
    */
    sequence?: number;
};