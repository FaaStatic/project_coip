import type { SitePerformanceAchievementParameterIndexVm } from "./SitePerformanceAchievementParameterIndexVm";
import type { TopFleetByUnitCodeVm } from "./TopFleetByUnitCodeVm";
import type { ChecksheetValueParameterVm } from "./ChecksheetValueParameterVm";

 /**
 * @description DashboardVm
*/
export type DashboardSiteVm = {
    /**
     * @description Gets or sets id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets parameter
     * @type string
    */
    parameter?: string | null;
    /**
     * @description Gets or sets averageSpeed
     * @type number | undefined, double
    */
    averageSpeed?: number;
    /**
     * @description Gets or sets customerLevel
     * @type number | undefined, double
    */
    customerLevel?: number;
    /**
     * @description Gets or sets SitePerformanceAchievementParameterIndex
    */
    sitePerformanceAchievementParameterIndex?: SitePerformanceAchievementParameterIndexVm | null;
    /**
     * @description Gets or sets TopFleetByUnitCode
     * @type array
    */
    topFleetByUnitCode?: TopFleetByUnitCodeVm[] | null;
    /**
     * @description Gets or sets ChecksheetValueParameters
    */
    checksheetValueParameters?: ChecksheetValueParameterVm | null;
};