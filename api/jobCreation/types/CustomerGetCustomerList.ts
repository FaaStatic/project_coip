import type { DocumentRootJsonOfCustomerListVm } from "./DocumentRootJsonOfCustomerListVm";
import type { Unit } from "./Unit";

 export type CustomerGetCustomerListQueryParams = {
    /**
     * @description Gets or sets Searching Key for Global Search
     * @type string
    */
    SearchValue?: string | null;
    /**
     * @description Gets or sets filters
     * @type string
    */
    Filters?: string | null;
    /**
     * @description Gets or sets sorts
     * @type string
    */
    Sorts?: string | null;
    /**
     * @description Gets or sets number of req page
     * @type integer, int32
    */
    PageNumber?: number | null;
    /**
     * @description Gets or sets limit data each page
     * @type integer, int32
    */
    PageSize?: number | null;
};
/**
 * @description Successfull get data of Customers List
*/
export type CustomerGetCustomerList200 = DocumentRootJsonOfCustomerListVm;
/**
 * @description BadRequest
*/
export type CustomerGetCustomerList400 = Unit;
/**
 * @description Unauthorized
*/
export type CustomerGetCustomerList401 = Unit;
/**
 * @description Forbidden
*/
export type CustomerGetCustomerList403 = Unit;
/**
 * @description InternalServerError
*/
export type CustomerGetCustomerList500 = Unit;
/**
 * @description Successfull get data of Customers List
*/
export type CustomerGetCustomerListQueryResponse = DocumentRootJsonOfCustomerListVm;
export type CustomerGetCustomerListQuery = {
    Response: CustomerGetCustomerListQueryResponse;
    QueryParams: CustomerGetCustomerListQueryParams;
    Errors: CustomerGetCustomerList400 | CustomerGetCustomerList401 | CustomerGetCustomerList403 | CustomerGetCustomerList500;
};