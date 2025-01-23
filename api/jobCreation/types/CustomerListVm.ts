/**
 * @description CustomerListVm
*/
export type CustomerListVm = {
    /**
     * @description Gets or sets Id
     * @type string | undefined, guid
    */
    id?: string;
    /**
     * @description Gets or sets Name
     * @type string
    */
    name?: string | null;
    /**
     * @description Gets or sets Code
     * @type string
    */
    code?: string | null;
};