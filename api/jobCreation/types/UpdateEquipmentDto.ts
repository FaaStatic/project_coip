/**
 * @description EquipmentDto
*/
export type UpdateEquipmentDto = {
    /**
     * @description Gets or sets id
     * @type string, guid
    */
    id: string;
    /**
     * @description Gets or sets unitModel
     * @type string
    */
    unitModel: string | null;
    /**
     * @description Gets or sets unitCode
     * @type string
    */
    unitCode: string | null;
    /**
     * @description Gets or sets serialNumber
     * @type string
    */
    serialNumber: string | null;
    /**
     * @description Gets or sets Smr
     * @type number, float
    */
    smr: number | null;
    /**
     * @description Gets or sets a value indicating whether IsProductUT
     * @type boolean
    */
    isProductUT?: boolean | null;
};