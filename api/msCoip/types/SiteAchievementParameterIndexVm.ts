import type { ChecksheetValueDateVm } from "./ChecksheetValueDateVm";

 /**
 * @description SiteAchievementParameterIndexVm
*/
export type SiteAchievementParameterIndexVm = {
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
     * @description Gets or sets AssessmentAreas
     * @type array
    */
    dates?: ChecksheetValueDateVm[] | null;
};