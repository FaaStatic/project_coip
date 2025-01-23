import type { Unit } from "./Unit";

 export type UnitPopulationGetTemplateUnitPopulationQueryParams = {
    /**
     * @type string
    */
    customerCode?: string | null;
};
/**
 * @description Successfully Get Template Unit Population
*/
export type UnitPopulationGetTemplateUnitPopulation200 = any;
/**
 * @description BadRequest
*/
export type UnitPopulationGetTemplateUnitPopulation400 = Unit;
/**
 * @description Unauthorized
*/
export type UnitPopulationGetTemplateUnitPopulation401 = Unit;
/**
 * @description Forbidden
*/
export type UnitPopulationGetTemplateUnitPopulation403 = Unit;
/**
 * @description InternalServerError
*/
export type UnitPopulationGetTemplateUnitPopulation500 = Unit;
/**
 * @description Successfully Get Template Unit Population
*/
export type UnitPopulationGetTemplateUnitPopulationQueryResponse = any;
export type UnitPopulationGetTemplateUnitPopulationQuery = {
    Response: UnitPopulationGetTemplateUnitPopulationQueryResponse;
    QueryParams: UnitPopulationGetTemplateUnitPopulationQueryParams;
    Errors: UnitPopulationGetTemplateUnitPopulation400 | UnitPopulationGetTemplateUnitPopulation401 | UnitPopulationGetTemplateUnitPopulation403 | UnitPopulationGetTemplateUnitPopulation500;
};