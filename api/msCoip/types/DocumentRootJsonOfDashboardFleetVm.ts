import type { DashboardFleetVm } from "./DashboardFleetVm";
import type { Status } from "./Status";

 /**
 * @description DocumentRootJson
*/
export type DocumentRootJsonOfDashboardFleetVm = {
    meta?: any;
    /**
     * @description Gets or sets data
    */
    data?: DashboardFleetVm | null;
    /**
     * @description Gets or sets included
     * @type array
    */
    included?: any[] | null;
    /**
     * @description Gets or sets responseTime in ms
     * @type integer | undefined, int64
    */
    responseTime?: number;
    /**
     * @description Gets or sets status
    */
    status?: Status | null;
};