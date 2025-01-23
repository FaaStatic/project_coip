/**
 * @description ChecksheetDetailVm
*/
export type ChecksheetDetailVm = {
    /**
     * @description Gets or sets Id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets sector
     * @type string
    */
    sector?: string | null;
    /**
     * @description Gets or sets unitApplication
     * @type string
    */
    unitApplication?: string | null;
    /**
     * @description Gets or sets parameter
     * @type string
    */
    parameter?: string | null;
    /**
     * @description Gets or sets assessmentArea
     * @type string
    */
    assessmentArea?: string | null;
    /**
     * @description Gets or sets klausul
     * @type string
    */
    klausul?: string | null;
    /**
     * @description Gets or sets description
     * @type string
    */
    description?: string | null;
    /**
     * @description Gets or sets operationStandard
     * @type array
    */
    operationStandard?: string[] | null;
    /**
     * @description Gets or sets scores
     * @type array
    */
    scores?: number[] | null;
    /**
     * @description Gets or sets score
     * @type number | undefined, double
    */
    score?: number;
    /**
     * @description Gets or sets weight
     * @type number | undefined, float
    */
    weight?: number;
    /**
     * @description Gets or sets weight
     * @type array
    */
    finalScore?: number[] | null;
    /**
     * @description Gets or sets comment
     * @type string
    */
    comment?: string | null;
    /**
     * @description Gets or sets recommendation
     * @type string
    */
    recommendation?: string | null;
    /**
     * @description Gets or sets image
     * @type string
    */
    image?: string | null;
    /**
     * @description Gets or sets linkVideo
     * @type string
    */
    linkVideo?: string | null;
    /**
     * @description Gets or sets sequence
     * @type integer | undefined, int32
    */
    sequence?: number;
};