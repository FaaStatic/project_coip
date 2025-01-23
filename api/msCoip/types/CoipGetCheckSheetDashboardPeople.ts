import type { DocumentRootJsonOfListOfMostActiveObserverVm } from "./DocumentRootJsonOfListOfMostActiveObserverVm";
import type { Unit } from "./Unit";

 export type CoipGetCheckSheetDashboardPeopleQueryParams = {
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
     * @description Gets or sets the sorting parameter (e.g., \"observername\" or \"qty\" or \"averagescore\")
     * @type string
    */
    SortingPeople?: string | null;
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
export type CoipGetCheckSheetDashboardPeople200 = DocumentRootJsonOfListOfMostActiveObserverVm;
/**
 * @description BadRequest
*/
export type CoipGetCheckSheetDashboardPeople400 = Unit;
/**
 * @description Unauthorized
*/
export type CoipGetCheckSheetDashboardPeople401 = Unit;
/**
 * @description Forbidden
*/
export type CoipGetCheckSheetDashboardPeople403 = Unit;
/**
 * @description InternalServerError
*/
export type CoipGetCheckSheetDashboardPeople500 = Unit;
/**
 * @description Successfull get data of Check Sheet Value
*/
export type CoipGetCheckSheetDashboardPeopleQueryResponse = DocumentRootJsonOfListOfMostActiveObserverVm;
export type CoipGetCheckSheetDashboardPeopleQuery = {
    Response: CoipGetCheckSheetDashboardPeopleQueryResponse;
    QueryParams: CoipGetCheckSheetDashboardPeopleQueryParams;
    Errors: CoipGetCheckSheetDashboardPeople400 | CoipGetCheckSheetDashboardPeople401 | CoipGetCheckSheetDashboardPeople403 | CoipGetCheckSheetDashboardPeople500;
};