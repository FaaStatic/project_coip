import type { DocumentRootJsonOfJobListVm } from "./DocumentRootJsonOfJobListVm";
import type { Unit } from "./Unit";

 export type JobCreationGetJobListQueryParams = {
    /**
     * @description Gets or sets get or Set the Request StartDate
     * @type string | undefined, date-time
    */
    StartDate?: string;
    /**
     * @description Gets or sets get or Set the Request EndDate
     * @type string | undefined, date-time
    */
    EndDate?: string;
    /**
     * @description Gets or sets get or Set the Other Unit
     * @type string
    */
    OtherUnit?: string | null;
    /**
     * @description Gets or sets get or Set the Score
     * @type integer, int32
    */
    Score?: number | null;
    /**
     * @description Gets or sets the sorting parameter (e.g., \"otherunit\" or \"-otherunit\", \"score\" or \"-score\")
     * @type string
    */
    SortUnitAndScore?: string | null;
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
 * @description Successfull get data of Jobs List
*/
export type JobCreationGetJobList200 = DocumentRootJsonOfJobListVm;
/**
 * @description BadRequest
*/
export type JobCreationGetJobList400 = Unit;
/**
 * @description Unauthorized
*/
export type JobCreationGetJobList401 = Unit;
/**
 * @description Forbidden
*/
export type JobCreationGetJobList403 = Unit;
/**
 * @description InternalServerError
*/
export type JobCreationGetJobList500 = Unit;
/**
 * @description Successfull get data of Jobs List
*/
export type JobCreationGetJobListQueryResponse = DocumentRootJsonOfJobListVm;
export type JobCreationGetJobListQuery = {
    Response: JobCreationGetJobListQueryResponse;
    QueryParams: JobCreationGetJobListQueryParams;
    Errors: JobCreationGetJobList400 | JobCreationGetJobList401 | JobCreationGetJobList403 | JobCreationGetJobList500;
};