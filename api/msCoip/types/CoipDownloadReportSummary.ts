import type { DocumentRootJsonOfObject } from "./DocumentRootJsonOfObject";
import type { Unit } from "./Unit";

 export type CoipDownloadReportSummaryQueryParams = {
    /**
     * @description Gets or sets StartDate to compare with DownTimeStartDate
     * @type string, date-time
    */
    StartDate?: string | null;
    /**
     * @description Gets or sets EndDate to compare with DownTimeStartDate
     * @type string, date-time
    */
    EndDate?: string | null;
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
 * @description Successfull to get summary report
*/
export type CoipDownloadReportSummary200 = DocumentRootJsonOfObject;
/**
 * @description BadRequest
*/
export type CoipDownloadReportSummary400 = Unit;
/**
 * @description Unauthorized
*/
export type CoipDownloadReportSummary401 = Unit;
/**
 * @description Forbidden
*/
export type CoipDownloadReportSummary403 = Unit;
/**
 * @description InternalServerError
*/
export type CoipDownloadReportSummary500 = Unit;
/**
 * @description Successfull to get summary report
*/
export type CoipDownloadReportSummaryQueryResponse = DocumentRootJsonOfObject;
export type CoipDownloadReportSummaryQuery = {
    Response: CoipDownloadReportSummaryQueryResponse;
    QueryParams: CoipDownloadReportSummaryQueryParams;
    Errors: CoipDownloadReportSummary400 | CoipDownloadReportSummary401 | CoipDownloadReportSummary403 | CoipDownloadReportSummary500;
};