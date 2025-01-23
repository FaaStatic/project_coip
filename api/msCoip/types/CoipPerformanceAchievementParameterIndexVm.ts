import type { CoipAchievementParameterIndexVm } from "./CoipAchievementParameterIndexVm";
import type { ChecksheetValueAveragePerDayVm } from "./ChecksheetValueAveragePerDayVm";

 /**
 * @description CoipPerformanceAchievementParameterIndexVm
*/
export type CoipPerformanceAchievementParameterIndexVm = {
    /**
     * @description Gets or sets id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets CoipAchievementParameterIndexVm
     * @type array
    */
    coipAchievementParameterIndex?: CoipAchievementParameterIndexVm[] | null;
    /**
     * @description Gets or sets averagePerDay
     * @type array
    */
    averagePerDay?: ChecksheetValueAveragePerDayVm[] | null;
};