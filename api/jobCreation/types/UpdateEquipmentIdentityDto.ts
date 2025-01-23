import type { UpdateEquipmentDto } from "./UpdateEquipmentDto";

 /**
 * @description UpdateEquipmentIdentityDto
*/
export type UpdateEquipmentIdentityDto = {
    /**
     * @description Gets or sets id
     * @type string, guid
    */
    id: string;
    /**
     * @description Gets or sets jobId
     * @type string, guid
    */
    jobId: string | null;
    /**
     * @description Gets or sets equipmentId
     * @type string, guid
    */
    equipmentId: string | null;
    /**
     * @description Gets or sets a value indicating whether IsExcavator
     * @type boolean
    */
    isExcavator?: boolean | null;
    /**
     * @description Gets or sets customerOperator
     * @type string
    */
    operatorName: string | null;
    /**
     * @description Gets or sets equipment
    */
    equipment?: UpdateEquipmentDto | null;
};