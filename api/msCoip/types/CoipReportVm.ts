import type { DataCustomerVm } from "./DataCustomerVm";
import type { DataJobObserverVm } from "./DataJobObserverVm";
import type { DataChartVm } from "./DataChartVm";

 /**
 * @description CoipReportVm
*/
export type CoipReportVm = {
    /**
     * @description Gets or sets id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets unitApplication
     * @type string
    */
    unitApplication?: string | null;
    /**
     * @description Gets or sets customerLevel
     * @type number | undefined, double
    */
    customerLevel?: number;
    /**
     * @description Gets or sets dataCustomer
    */
    dataCustomer?: DataCustomerVm | null;
    /**
     * @description Gets or sets dataJobObserver
    */
    dataJobObserver?: DataJobObserverVm | null;
    /**
     * @description Gets or sets dataChart
    */
    dataChart?: DataChartVm | null;
};