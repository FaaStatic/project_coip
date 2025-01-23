import type { UserInfoTokenDto } from "./UserInfoTokenDto";
import type { UserLoginDto } from "./UserLoginDto";

 export type AccountLoginHeaderParams = {
    /**
     * @description Client ID
     * @type string | undefined
    */
    "client-id"?: string;
    /**
     * @description Client Secret
     * @type string | undefined
    */
    "client-secret"?: string;
};
/**
 * @description Request successful.
*/
export type AccountLogin200 = UserInfoTokenDto;
/**
 * @description Model of user login object.
*/
export type AccountLoginMutationRequest = UserLoginDto;
/**
 * @description Request successful.
*/
export type AccountLoginMutationResponse = UserInfoTokenDto;
export type AccountLoginMutation = {
    Response: AccountLoginMutationResponse;
    Request: AccountLoginMutationRequest;
    HeaderParams: AccountLoginHeaderParams;
};