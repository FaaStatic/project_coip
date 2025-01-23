import client from "@untr/apps-coip/configs/loginInstanceKubb.config";
import { useMutation } from "@tanstack/react-query";
import type { AccountLoginMutationRequest, AccountLoginMutationResponse, AccountLoginHeaderParams } from "../../types/AccountLogin";
import type { UseMutationOptions } from "@tanstack/react-query";

 type AccountLoginClient = typeof client<AccountLoginMutationResponse, Error, AccountLoginMutationRequest>;
type AccountLogin = {
    data: AccountLoginMutationResponse;
    error: Error;
    request: AccountLoginMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: AccountLoginHeaderParams;
    response: AccountLoginMutationResponse;
    client: {
        parameters: Partial<Parameters<AccountLoginClient>[0]>;
        return: Awaited<ReturnType<AccountLoginClient>>;
    };
};
/**
 * @summary Login
 * @link /api/login
 */
export function useAccountLoginHook(headers?: AccountLogin["headerParams"], options: {
    mutation?: UseMutationOptions<AccountLogin["response"], AccountLogin["error"], AccountLogin["request"]>;
    client?: AccountLogin["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async (data) => {
            const res = await client<AccountLogin["data"], AccountLogin["error"], AccountLogin["request"]>({
                method: "post",
                url: `/api/login`,
                data,
                headers: { ...headers, ...clientOptions.headers },
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}