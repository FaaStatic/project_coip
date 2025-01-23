import type { TopFleetByStartDateVm } from "./TopFleetByStartDateVm";
import type { FleetAchievementConfigVm } from "./FleetAchievementConfigVm";
import type { ChecksheetValueParameterVm } from "./ChecksheetValueParameterVm";
import type { FleetPerformanceAchievementParameterIndexPicaVm } from "./FleetPerformanceAchievementParameterIndexPicaVm";

 /**
 * @description DashboardVm
*/
export type DashboardFleetVm = {
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
     * @description Gets or sets TopFleetByStartDate
     * @type array
    */
    topFleetByStartDate?: TopFleetByStartDateVm[] | null;
    /**
     * @description Gets or sets FleetAchievementConfigVm
     * @type array
    */
    fleetAchievementConfig?: FleetAchievementConfigVm[] | null;
    /**
     * @description Gets or sets ChecksheetValueParameters
    */
    checksheetValueParameters?: ChecksheetValueParameterVm | null;
    /**
     * @description Gets or sets FleetPerformanceAchievementParameterIndexPica
     * @type array
    */
    fleetPerformanceAchievementParameterIndexPica?: FleetPerformanceAchievementParameterIndexPicaVm[] | null;
};