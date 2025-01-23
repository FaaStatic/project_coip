import type { Unit } from "./Unit";
import type { CreateCoipFormCommand } from "./CreateCoipFormCommand";

 /**
 * @description Successfully submit COIP Form
*/
export type CoipSubmitCheckSheetValue200 = Unit;
/**
 * @description BadRequest
*/
export type CoipSubmitCheckSheetValue400 = Unit;
/**
 * @description Unauthorized
*/
export type CoipSubmitCheckSheetValue401 = Unit;
/**
 * @description Forbidden
*/
export type CoipSubmitCheckSheetValue403 = Unit;
/**
 * @description InternalServerError
*/
export type CoipSubmitCheckSheetValue500 = Unit;
/**
 * @description Encapsulate request body containing:\n    CheckSheetValues:\n        List of Checksheet Values\n    Force:\n        boolean value to set force submit is true or false
*/
export type CoipSubmitCheckSheetValueMutationRequest = CreateCoipFormCommand;
/**
 * @description Successfully submit COIP Form
*/
export type CoipSubmitCheckSheetValueMutationResponse = Unit;
export type CoipSubmitCheckSheetValueMutation = {
    Response: CoipSubmitCheckSheetValueMutationResponse;
    Request: CoipSubmitCheckSheetValueMutationRequest;
    Errors: CoipSubmitCheckSheetValue400 | CoipSubmitCheckSheetValue401 | CoipSubmitCheckSheetValue403 | CoipSubmitCheckSheetValue500;
};