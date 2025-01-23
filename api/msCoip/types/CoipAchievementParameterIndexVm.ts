import type { ChecksheetValueDateVm } from "./ChecksheetValueDateVm";

 /**
 * @description CoipAchievementParameterIndexVm
*/
export type CoipAchievementParameterIndexVm = {
    /**
     * @description Gets or sets id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets assessmentArea
     * @type string
    */
    assessmentArea?: string | null;
    /**
     * @description Gets or sets scoreByDates
     * @type array
    */
    scoreByDates?: ChecksheetValueDateVm[] | null;
};