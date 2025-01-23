import type { CustomerDto } from "./CustomerDto";
import type { Meta } from "./Meta";

 export type DataTableOfListOfCustomerDto = {
    /**
     * @type array | undefined
    */
    data?: CustomerDto[];
    /**
     * @type object | undefined
    */
    meta?: Meta;
};