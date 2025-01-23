import type { DocumentRootJsonOfDashboardSiteVm } from "./DocumentRootJsonOfDashboardSiteVm";
import type { Unit } from "./Unit";

 export type CoipGetCheckSheetDashboardSiteQueryParams = {
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
     * @description Gets or sets get or Set the Request Site
     * @type string
    */
    Site?: string | null;
    /**
     * @description Gets or sets get or Set the Request CustomerCode
     * @type string
    */
    CustomerCode?: string | null;
    /**
     * @description Gets or sets the sorting parameter (e.g., \"fleet\" or \"averagescore\" or \"averagewci\")
     * @type string
    */
    SortingTopFleet?: string | null;
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
export type CoipGetCheckSheetDashboardSite200 = DocumentRootJsonOfDashboardSiteVm;
/**
 * @description BadRequest
*/
export type CoipGetCheckSheetDashboardSite400 = Unit;
/**
 * @description Unauthorized
*/
export type CoipGetCheckSheetDashboardSite401 = Unit;
/**
 * @description Forbidden
*/
export type CoipGetCheckSheetDashboardSite403 = Unit;
/**
 * @description InternalServerError
*/
export type CoipGetCheckSheetDashboardSite500 = Unit;
/**
 * @description Successfull get data of Check Sheet Value
*/
export type CoipGetCheckSheetDashboardSiteQueryResponse = DocumentRootJsonOfDashboardSiteVm;
export type CoipGetCheckSheetDashboardSiteQuery = {
    Response: CoipGetCheckSheetDashboardSiteQueryResponse;
    QueryParams: CoipGetCheckSheetDashboardSiteQueryParams;
    Errors: CoipGetCheckSheetDashboardSite400 | CoipGetCheckSheetDashboardSite401 | CoipGetCheckSheetDashboardSite403 | CoipGetCheckSheetDashboardSite500;
};