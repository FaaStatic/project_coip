import type { UpdateEquipmentIdentityDto } from "./UpdateEquipmentIdentityDto";

 /**
 * @description UpdateJobDto
*/
export type UpdateJobDto = {
    /**
     * @description Gets or sets id
     * @type string
    */
    id?: string | null;
    /**
     * @description Gets or sets Latitude
     * @type string
    */
    latitude?: string | null;
    /**
     * @description Gets or sets Longitude
     * @type string
    */
    longitude?: string | null;
    /**
     * @description Gets or sets DownTimeStartDate
     * @type string
    */
    downTimeStartDate?: string | null;
    /**
     * @description Gets or sets DownTimeEndDate
     * @type string
    */
    downTimeEndDate?: string | null;
    /**
     * @description Gets or sets AverageSpeed
     * @type number | undefined, float
    */
    averageSpeed?: number;
    /**
     * @description Gets or sets LocationDetail
     * @type string
    */
    locationDetail?: string | null;
    /**
     * @description Gets or sets EquipmentIdentities
     * @type array
    */
    equipmentIdentities?: UpdateEquipmentIdentityDto[] | null;
};