/**
 * @description MostActiveObserverVm
*/
export type MostActiveObserverVm = {
    /**
     * @description Gets or sets id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets ObserverName
     * @type string
    */
    observerName?: string | null;
    /**
     * @description Gets or sets Qty
     * @type integer, int32
    */
    qty?: number | null;
    /**
     * @description Gets or sets AverageScore
     * @type number | undefined, double
    */
    averageScore?: number;
};