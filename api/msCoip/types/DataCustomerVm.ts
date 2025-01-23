import type { SpesificLocationVm } from "./SpesificLocationVm";

 /**
 * @description DataCustomerVm
*/
export type DataCustomerVm = {
    /**
     * @description Gets or sets Id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets customerName
     * @type string
    */
    customerName?: string | null;
    /**
     * @description Gets or sets sector
     * @type string
    */
    sector?: string | null;
    /**
     * @description Gets or sets location
     * @type string
    */
    location?: string | null;
    /**
     * @description Gets or sets locationDetail
     * @type string
    */
    locationDetail?: string | null;
    /**
     * @description Gets or sets location
    */
    spesificLocation?: SpesificLocationVm | null;
    /**
     * @description Gets or sets ApprovalName
     * @type string
    */
    approvalName?: string | null;
};