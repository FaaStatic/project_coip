import type { Unit } from "./Unit";

 export type UnitPopulationUploadUnitPopulationQueryParams = {
    /**
     * @type string
    */
    customerCode?: string | null;
};
/**
 * @description Successfull to update unit population
*/
export type UnitPopulationUploadUnitPopulation200 = Unit;
/**
 * @description BadRequest
*/
export type UnitPopulationUploadUnitPopulation400 = Unit;
/**
 * @description Unauthorized
*/
export type UnitPopulationUploadUnitPopulation401 = Unit;
/**
 * @description Forbidden
*/
export type UnitPopulationUploadUnitPopulation403 = Unit;
/**
 * @description InternalServerError
*/
export type UnitPopulationUploadUnitPopulation500 = Unit;
export type UnitPopulationUploadUnitPopulationMutationRequest = {
    /**
     * @type string, binary
    */
    file?: Blob | null;
};
/**
 * @description Successfull to update unit population
*/
export type UnitPopulationUploadUnitPopulationMutationResponse = Unit;
export type UnitPopulationUploadUnitPopulationMutation = {
    Response: UnitPopulationUploadUnitPopulationMutationResponse;
    Request: UnitPopulationUploadUnitPopulationMutationRequest;
    QueryParams: UnitPopulationUploadUnitPopulationQueryParams;
    Errors: UnitPopulationUploadUnitPopulation400 | UnitPopulationUploadUnitPopulation401 | UnitPopulationUploadUnitPopulation403 | UnitPopulationUploadUnitPopulation500;
};