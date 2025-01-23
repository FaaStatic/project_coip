import type { DocumentRootJsonOfCoipPerformanceAchievementParameterIndexVm } from "./DocumentRootJsonOfCoipPerformanceAchievementParameterIndexVm";
import type { Unit } from "./Unit";

 export type CoipGetCheckSheetDashboardCoipQueryParams = {
    /**
     * @description Gets or sets get or Set the Request StartDate
     * @type string
    */
    StartDate?: string | null;
    /**
     * @description Gets or sets get or Set the Request EndDate
     * @type string
    */
    EndDate?: string | null;
    /**
     * @description Gets or sets get or Set the Request CustomerCode
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
 * @description Successfull get data of Check Sheet Value
*/
export type CoipGetCheckSheetDashboardCoip200 = DocumentRootJsonOfCoipPerformanceAchievementParameterIndexVm;
/**
 * @description BadRequest
*/
export type CoipGetCheckSheetDashboardCoip400 = Unit;
/**
 * @description Unauthorized
*/
export type CoipGetCheckSheetDashboardCoip401 = Unit;
/**
 * @description Forbidden
*/
export type CoipGetCheckSheetDashboardCoip403 = Unit;
/**
 * @description InternalServerError
*/
export type CoipGetCheckSheetDashboardCoip500 = Unit;
/**
 * @description Successfull get data of Check Sheet Value
*/
export type CoipGetCheckSheetDashboardCoipQueryResponse = DocumentRootJsonOfCoipPerformanceAchievementParameterIndexVm;
export type CoipGetCheckSheetDashboardCoipQuery = {
    Response: CoipGetCheckSheetDashboardCoipQueryResponse;
    QueryParams: CoipGetCheckSheetDashboardCoipQueryParams;
    Errors: CoipGetCheckSheetDashboardCoip400 | CoipGetCheckSheetDashboardCoip401 | CoipGetCheckSheetDashboardCoip403 | CoipGetCheckSheetDashboardCoip500;
};