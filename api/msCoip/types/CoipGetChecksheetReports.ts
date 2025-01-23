import type { DocumentRootJsonOfChecksheetReportVm } from "./DocumentRootJsonOfChecksheetReportVm";
import type { Unit } from "./Unit";

 export type CoipGetChecksheetReportsQueryParams = {
    /**
     * @description Gets or sets job Id being search
     * @type string | undefined, guid
    */
    JobId?: string;
    /**
     * @description Gets or sets ReportType
     * @type string
    */
    ReportType?: string | null;
};
/**
 * @description Successfully get Checksheet Value based on JobId
*/
export type CoipGetChecksheetReports200 = DocumentRootJsonOfChecksheetReportVm;
/**
 * @description BadRequest
*/
export type CoipGetChecksheetReports400 = Unit;
/**
 * @description Unauthorized
*/
export type CoipGetChecksheetReports401 = Unit;
/**
 * @description Forbidden
*/
export type CoipGetChecksheetReports403 = Unit;
/**
 * @description InternalServerError
*/
export type CoipGetChecksheetReports500 = Unit;
/**
 * @description Successfully get Checksheet Value based on JobId
*/
export type CoipGetChecksheetReportsQueryResponse = DocumentRootJsonOfChecksheetReportVm;
export type CoipGetChecksheetReportsQuery = {
    Response: CoipGetChecksheetReportsQueryResponse;
    QueryParams: CoipGetChecksheetReportsQueryParams;
    Errors: CoipGetChecksheetReports400 | CoipGetChecksheetReports401 | CoipGetChecksheetReports403 | CoipGetChecksheetReports500;
};