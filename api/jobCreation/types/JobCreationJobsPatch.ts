import type { Unit } from "./Unit";
import type { UpdateJobCommand } from "./UpdateJobCommand";

 /**
 * @description Successfully to Update job
*/
export type JobCreationJobsPatch200 = Unit;
/**
 * @description BadRequest
*/
export type JobCreationJobsPatch400 = Unit;
/**
 * @description Unauthorized
*/
export type JobCreationJobsPatch401 = Unit;
/**
 * @description Forbidden
*/
export type JobCreationJobsPatch403 = Unit;
/**
 * @description InternalServerError
*/
export type JobCreationJobsPatch500 = Unit;
/**
 * @description Encapsulate request body containing:\n    JobDto:\n        Job Input Form Values
*/
export type JobCreationJobsPatchMutationRequest = UpdateJobCommand;
/**
 * @description Successfully to Update job
*/
export type JobCreationJobsPatchMutationResponse = Unit;
export type JobCreationJobsPatchMutation = {
    Response: JobCreationJobsPatchMutationResponse;
    Request: JobCreationJobsPatchMutationRequest;
    Errors: JobCreationJobsPatch400 | JobCreationJobsPatch401 | JobCreationJobsPatch403 | JobCreationJobsPatch500;
};