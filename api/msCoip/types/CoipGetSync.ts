import type { Unit } from "./Unit";

 export type CoipGetSyncQueryParams = {
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
export type CoipGetSync200 = any;
/**
 * @description BadRequest
*/
export type CoipGetSync400 = Unit;
/**
 * @description Unauthorized
*/
export type CoipGetSync401 = Unit;
/**
 * @description Forbidden
*/
export type CoipGetSync403 = Unit;
/**
 * @description InternalServerError
*/
export type CoipGetSync500 = Unit;
/**
 * @description Successfully synchronize offline Database
*/
export type CoipGetSyncQueryResponse = any;
export type CoipGetSyncQuery = {
    Response: CoipGetSyncQueryResponse;
    QueryParams: CoipGetSyncQueryParams;
    Errors: CoipGetSync400 | CoipGetSync401 | CoipGetSync403 | CoipGetSync500;
};