import type { ChecksheetValueDto } from "./ChecksheetValueDto";

 /**
 * @description Command to create or update Checksheet Values
*/
export type CreateCoipFormCommand = {
    /**
     * @description Gets or sets status
     * @type string
    */
    status: string;
    /**
     * @description Gets or sets get or Set List of Checksheet Values
     * @type array
    */
    checksheetValues: ChecksheetValueDto[];
};