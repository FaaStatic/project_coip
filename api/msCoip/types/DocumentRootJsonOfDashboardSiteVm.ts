import type { DashboardSiteVm } from "./DashboardSiteVm";
import type { Status } from "./Status";

 /**
 * @description DocumentRootJson
*/
export type DocumentRootJsonOfDashboardSiteVm = {
    meta?: any;
    /**
     * @description Gets or sets data
    */
    data?: DashboardSiteVm | null;
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