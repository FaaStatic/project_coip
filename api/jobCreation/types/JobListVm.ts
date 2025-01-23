/**
 * @description Represents a list of jobs.
*/
export type JobListVm = {
    /**
     * @description Gets or sets id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets assignmentId
     * @type string
    */
    assignmentId?: string | null;
    /**
     * @description Gets or sets unitModel
     * @type string
    */
    unitModel?: string | null;
    /**
     * @description Gets or sets unitCode
     * @type string
    */
    unitCode?: string | null;
    /**
     * @description Gets or sets mainJob
     * @type string
    */
    mainJob?: string | null;
    /**
     * @description Gets or sets otherUnit
     * @type array
    */
    otherUnit?: string[] | null;
    /**
     * @description Gets or sets plant
     * @type string
    */
    plant?: string | null;
    /**
     * @description Gets or sets customer
     * @type string
    */
    customer?: string | null;
    /**
     * @description Gets or sets startDate
     * @type string
    */
    startDate?: string | null;
    /**
     * @description Gets or sets status
     * @type string
    */
    status?: string | null;
    /**
     * @description Gets or sets Score
     * @type integer | undefined, int32
    */
    score?: number;
};