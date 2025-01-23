import type { Unit } from "./Unit";

 export type JobCreationSyncsQueryParams = {
    /**
     * @type string
    */
    date?: string | null;
    /**
     * @type string
    */
    customerCode?: string | null;
};
/**
 * @description Successfully synchronize offline Database
*/
export type JobCreationSyncs200 = any;
/**
 * @description BadRequest
*/
export type JobCreationSyncs400 = Unit;
/**
 * @description Unauthorized
*/
export type JobCreationSyncs401 = Unit;
/**
 * @description Forbidden
*/
export type JobCreationSyncs403 = Unit;
/**
 * @description InternalServerError
*/
export type JobCreationSyncs500 = Unit;
/**
 * @description Successfully synchronize offline Database
*/
export type JobCreationSyncsQueryResponse = any;
export type JobCreationSyncsQuery = {
    Response: JobCreationSyncsQueryResponse;
    QueryParams: JobCreationSyncsQueryParams;
    Errors: JobCreationSyncs400 | JobCreationSyncs401 | JobCreationSyncs403 | JobCreationSyncs500;
};