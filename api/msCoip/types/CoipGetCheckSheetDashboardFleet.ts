import type { DocumentRootJsonOfDashboardFleetVm } from "./DocumentRootJsonOfDashboardFleetVm";
import type { Unit } from "./Unit";

 export type CoipGetCheckSheetDashboardFleetQueryParams = {
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
     * @description Gets or sets a value indicating whether the request is for the last seven data
     * @type boolean | undefined
    */
    IsLastSevenData?: boolean;
    /**
     * @description Gets or sets get or Set the Request FleetID
     * @type string
    */
    FleetID?: string | null;
    /**
     * @description Gets or sets get or Set the Request ObserverName
     * @type string
    */
    ObserverName?: string | null;
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
     * @description Gets or sets the sorting parameter (e.g., \"downtimestartdate\" or \"averagescore\" or \"averagewci\")
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
export type CoipGetCheckSheetDashboardFleet200 = DocumentRootJsonOfDashboardFleetVm;
/**
 * @description BadRequest
*/
export type CoipGetCheckSheetDashboardFleet400 = Unit;
/**
 * @description Unauthorized
*/
export type CoipGetCheckSheetDashboardFleet401 = Unit;
/**
 * @description Forbidden
*/
export type CoipGetCheckSheetDashboardFleet403 = Unit;
/**
 * @description InternalServerError
*/
export type CoipGetCheckSheetDashboardFleet500 = Unit;
/**
 * @description Successfull get data of Check Sheet Value
*/
export type CoipGetCheckSheetDashboardFleetQueryResponse = DocumentRootJsonOfDashboardFleetVm;
export type CoipGetCheckSheetDashboardFleetQuery = {
    Response: CoipGetCheckSheetDashboardFleetQueryResponse;
    QueryParams: CoipGetCheckSheetDashboardFleetQueryParams;
    Errors: CoipGetCheckSheetDashboardFleet400 | CoipGetCheckSheetDashboardFleet401 | CoipGetCheckSheetDashboardFleet403 | CoipGetCheckSheetDashboardFleet500;
};