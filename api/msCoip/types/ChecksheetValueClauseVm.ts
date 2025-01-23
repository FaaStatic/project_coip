import type { ChecksheetValueDateVm } from "./ChecksheetValueDateVm";

 /**
 * @description ChecksheetValueClauseVm
*/
export type ChecksheetValueClauseVm = {
    /**
     * @description Gets or sets id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets clause
     * @type string
    */
    clause?: string | null;
    /**
     * @description Gets or sets description
     * @type string
    */
    description?: string | null;
    /**
     * @description Gets or sets dates
     * @type array
    */
    dates?: ChecksheetValueDateVm[] | null;
};