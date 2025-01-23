import type { DataCustomerVm } from "./DataCustomerVm";
import type { DataJobObserverVm } from "./DataJobObserverVm";
import type { TableDataVm } from "./TableDataVm";
import type { ParameterCustomerSummaryVm } from "./ParameterCustomerSummaryVm";

 /**
 * @description CoipReportCustomerVm
*/
export type CoipReportCustomerVm = {
    /**
     * @description Gets or sets id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets coipNumber
     * @type string
    */
    coipNumber?: string | null;
    /**
     * @description Gets or sets unitApplication
     * @type string
    */
    unitApplication?: string | null;
    /**
     * @description Gets or sets dataCustomer
    */
    dataCustomer?: DataCustomerVm | null;
    /**
     * @description Gets or sets dataJobObserver
    */
    dataJobObserver?: DataJobObserverVm | null;
    /**
     * @description Gets or sets TableData
    */
    tableData?: TableDataVm | null;
    /**
     * @description Gets or sets DataChecksheetSummary
     * @type array
    */
    dataChecksheetSummary?: ParameterCustomerSummaryVm[] | null;
};