import type { DocumentRootJsonOfUnitPopulationVm } from "./DocumentRootJsonOfUnitPopulationVm";
import type { Unit } from "./Unit";

 export type UnitPopulationGetUnitPopulationListQueryParams = {
    /**
     * @description Gets or sets get or set the Request CustomerCode
     * @type string
    */
    CustomerCode?: string | null;
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
 * @description Successfull get List of Unit Population
*/
export type UnitPopulationGetUnitPopulationList200 = DocumentRootJsonOfUnitPopulationVm;
/**
 * @description BadRequest
*/
export type UnitPopulationGetUnitPopulationList400 = Unit;
/**
 * @description Unauthorized
*/
export type UnitPopulationGetUnitPopulationList401 = Unit;
/**
 * @description Forbidden
*/
export type UnitPopulationGetUnitPopulationList403 = Unit;
/**
 * @description InternalServerError
*/
export type UnitPopulationGetUnitPopulationList500 = Unit;
/**
 * @description Successfull get List of Unit Population
*/
export type UnitPopulationGetUnitPopulationListQueryResponse = DocumentRootJsonOfUnitPopulationVm;
export type UnitPopulationGetUnitPopulationListQuery = {
    Response: UnitPopulationGetUnitPopulationListQueryResponse;
    QueryParams: UnitPopulationGetUnitPopulationListQueryParams;
    Errors: UnitPopulationGetUnitPopulationList400 | UnitPopulationGetUnitPopulationList401 | UnitPopulationGetUnitPopulationList403 | UnitPopulationGetUnitPopulationList500;
};