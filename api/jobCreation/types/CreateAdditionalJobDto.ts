/**
 * @description CreateAdditionalJobDto
*/
export type CreateAdditionalJobDto = {
    /**
     * @description Gets or sets id
     * @type string, guid
    */
    id: string;
    /**
     * @description Gets or sets jobId
     * @type string, guid
    */
    jobId: string | null;
    /**
     * @description Gets or sets desc
     * @type string
    */
    desc: string | null;
    /**
     * @description Gets or sets parameter
     * @type string
    */
    parameter: string | null;
};