/**
 * @description DataJobObserverVm
*/
export type DataJobObserverVm = {
    /**
     * @description Gets or sets Id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets observerName
     * @type string
    */
    observerName?: string | null;
    /**
     * @description Gets or sets approvalName
     * @type string
    */
    approvalName?: string | null;
    /**
     * @description Gets or sets assignmentId
     * @type string
    */
    assignmentId?: string | null;
    /**
     * @description Gets or sets startDate
     * @type string | undefined, date-time
    */
    startDate?: string;
    /**
     * @description Gets or sets coipId
     * @type string
    */
    coipId?: string | null;
};