import type { SiteAchievementParameterIndexVm } from "./SiteAchievementParameterIndexVm";
import type { ChecksheetValueAveragePerDayVm } from "./ChecksheetValueAveragePerDayVm";

 /**
 * @description SitePerformanceAchievementParameterIndexVm
*/
export type SitePerformanceAchievementParameterIndexVm = {
    /**
     * @description Gets or sets id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets SiteAchievementParameterIndexVm
     * @type array
    */
    siteAchievementParameterIndex?: SiteAchievementParameterIndexVm[] | null;
    /**
     * @description Gets or sets averagePerDay
     * @type array
    */
    averagePerDay?: ChecksheetValueAveragePerDayVm[] | null;
};