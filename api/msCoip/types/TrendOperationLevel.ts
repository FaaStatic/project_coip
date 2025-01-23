/**
 * @description TrendOperationLevel
*/
export type TrendOperationLevel = {
    /**
     * @description Gets or sets Id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets MonthCustomerLevel
     * @type string, date-time
    */
    monthCustomerLevel?: string | null;
    /**
     * @description Gets or sets CustomerLevel
     * @type number | undefined, double
    */
    customerLevel?: number;
};