import type { Unit } from "./Unit";
import type { CreateJobCommand } from "./CreateJobCommand";

 /**
 * @description Successfully to create new job
*/
export type JobCreationJobsPost200 = Unit;
/**
 * @description BadRequest
*/
export type JobCreationJobsPost400 = Unit;
/**
 * @description Unauthorized
*/
export type JobCreationJobsPost401 = Unit;
/**
 * @description Forbidden
*/
export type JobCreationJobsPost403 = Unit;
/**
 * @description InternalServerError
*/
export type JobCreationJobsPost500 = Unit;
/**
 * @description Encapsulate request body containing:\n    JobDto:\n        Job Input Form Values
*/
export type JobCreationJobsPostMutationRequest = CreateJobCommand;
/**
 * @description Successfully to create new job
*/
export type JobCreationJobsPostMutationResponse = Unit;
export type JobCreationJobsPostMutation = {
    Response: JobCreationJobsPostMutationResponse;
    Request: JobCreationJobsPostMutationRequest;
    Errors: JobCreationJobsPost400 | JobCreationJobsPost401 | JobCreationJobsPost403 | JobCreationJobsPost500;
};