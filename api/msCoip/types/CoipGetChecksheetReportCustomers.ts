import type { DocumentRootJsonOfChecksheetReportCustomerVm } from "./DocumentRootJsonOfChecksheetReportCustomerVm";
import type { Unit } from "./Unit";

 export type CoipGetChecksheetReportCustomersPathParams = {
    /**
     * @type string
    */
    jobid: string;
};
/**
 * @description Successfully get Checksheet Value based on JobId
*/
export type CoipGetChecksheetReportCustomers200 = DocumentRootJsonOfChecksheetReportCustomerVm;
/**
 * @description BadRequest
*/
export type CoipGetChecksheetReportCustomers400 = Unit;
/**
 * @description Unauthorized
*/
export type CoipGetChecksheetReportCustomers401 = Unit;
/**
 * @description Forbidden
*/
export type CoipGetChecksheetReportCustomers403 = Unit;
/**
 * @description InternalServerError
*/
export type CoipGetChecksheetReportCustomers500 = Unit;
/**
 * @description Successfully get Checksheet Value based on JobId
*/
export type CoipGetChecksheetReportCustomersQueryResponse = DocumentRootJsonOfChecksheetReportCustomerVm;
export type CoipGetChecksheetReportCustomersQuery = {
    Response: CoipGetChecksheetReportCustomersQueryResponse;
    PathParams: CoipGetChecksheetReportCustomersPathParams;
    Errors: CoipGetChecksheetReportCustomers400 | CoipGetChecksheetReportCustomers401 | CoipGetChecksheetReportCustomers403 | CoipGetChecksheetReportCustomers500;
};