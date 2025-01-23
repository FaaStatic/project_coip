import type { CreateAdditionalJobDto } from "./CreateAdditionalJobDto";

 /**
 * @description CreateJobDto
*/
export type CreateJobDto = {
    /**
     * @description Gets or sets id
     * @type string
    */
    id?: string | null;
    /**
     * @description Gets or sets number
     * @type string
    */
    number?: string | null;
    /**
     * @description Gets or sets status
     * @type string
    */
    status?: string | null;
    /**
     * @description Gets or sets PlantArea
     * @type string
    */
    plantArea?: string | null;
    /**
     * @description Gets or sets planExecutionDate
     * @type string
    */
    planExecutionDate?: string | null;
    /**
     * @description Gets or sets mainJob
     * @type string
    */
    mainJob?: string | null;
    /**
     * @description Gets or sets createdByName
     * @type string
    */
    createdByName?: string | null;
    /**
     * @description Gets or sets additionalJobs
     * @type array
    */
    additionalJobs?: CreateAdditionalJobDto[] | null;
};