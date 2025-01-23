import type { Unit } from "./Unit";

 export type CoipUploadExcelChecksheetMasterQueryParams = {
    /**
     * @type string
    */
    customerCode?: string | null;
};
/**
 * @description Successfully to Upload Data ChecksheetMaster
*/
export type CoipUploadExcelChecksheetMaster200 = Unit;
/**
 * @description BadRequest
*/
export type CoipUploadExcelChecksheetMaster400 = Unit;
/**
 * @description Unauthorized
*/
export type CoipUploadExcelChecksheetMaster401 = Unit;
/**
 * @description Forbidden
*/
export type CoipUploadExcelChecksheetMaster403 = Unit;
/**
 * @description InternalServerError
*/
export type CoipUploadExcelChecksheetMaster500 = Unit;
export type CoipUploadExcelChecksheetMasterMutationRequest = {
    /**
     * @type string, binary
    */
    file?: Blob | null;
};
/**
 * @description Successfully to Upload Data ChecksheetMaster
*/
export type CoipUploadExcelChecksheetMasterMutationResponse = Unit;
export type CoipUploadExcelChecksheetMasterMutation = {
    Response: CoipUploadExcelChecksheetMasterMutationResponse;
    Request: CoipUploadExcelChecksheetMasterMutationRequest;
    QueryParams: CoipUploadExcelChecksheetMasterQueryParams;
    Errors: CoipUploadExcelChecksheetMaster400 | CoipUploadExcelChecksheetMaster401 | CoipUploadExcelChecksheetMaster403 | CoipUploadExcelChecksheetMaster500;
};