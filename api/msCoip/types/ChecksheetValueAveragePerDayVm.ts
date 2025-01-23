/**
 * @description ChecksheetValueAveragePerDayVm
*/
export type ChecksheetValueAveragePerDayVm = {
    /**
     * @description Gets or sets id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets date
     * @type string
    */
    date?: string | null;
    /**
     * @description Gets or sets averageScore
     * @type number | undefined, double
    */
    averageScore?: number;
};