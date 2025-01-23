/**
 * @description UnitPopulationVm
*/
export type UnitPopulationVm = {
    /**
     * @description Gets or sets Id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets UnitModel
     * @type string
    */
    unitModel?: string | null;
    /**
     * @description Gets or sets UnitCode
     * @type string
    */
    unitCode?: string | null;
    /**
     * @description Gets or sets SerialNumber
     * @type string
    */
    serialNumber?: string | null;
    /**
     * @description Gets or sets Smr
     * @type number | undefined, float
    */
    smr?: number;
    /**
     * @description Gets or sets a value indicating whether the unit is a product unit
     * @type boolean | undefined
    */
    isProductUT?: boolean;
};