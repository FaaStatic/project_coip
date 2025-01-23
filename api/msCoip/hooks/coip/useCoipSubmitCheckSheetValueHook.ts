import client from "@untr/apps-coip/configs/coipInstanceKubb.config";
import { useMutation } from "@tanstack/react-query";
import type { CoipSubmitCheckSheetValueMutationRequest, CoipSubmitCheckSheetValueMutationResponse, CoipSubmitCheckSheetValue400, CoipSubmitCheckSheetValue401, CoipSubmitCheckSheetValue403, CoipSubmitCheckSheetValue500 } from "../../types/CoipSubmitCheckSheetValue";
import type { UseMutationOptions } from "@tanstack/react-query";

 type CoipSubmitCheckSheetValueClient = typeof client<CoipSubmitCheckSheetValueMutationResponse, CoipSubmitCheckSheetValue400 | CoipSubmitCheckSheetValue401 | CoipSubmitCheckSheetValue403 | CoipSubmitCheckSheetValue500, CoipSubmitCheckSheetValueMutationRequest>;
type CoipSubmitCheckSheetValue = {
    data: CoipSubmitCheckSheetValueMutationResponse;
    error: CoipSubmitCheckSheetValue400 | CoipSubmitCheckSheetValue401 | CoipSubmitCheckSheetValue403 | CoipSubmitCheckSheetValue500;
    request: CoipSubmitCheckSheetValueMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: CoipSubmitCheckSheetValueMutationResponse;
    client: {
        parameters: Partial<Parameters<CoipSubmitCheckSheetValueClient>[0]>;
        return: Awaited<ReturnType<CoipSubmitCheckSheetValueClient>>;
    };
};
/**
 * @summary Submit COIP Form
 * @link /api/v1/coip/checksheet-values
 */
export function useCoipSubmitCheckSheetValueHook(options: {
    mutation?: UseMutationOptions<CoipSubmitCheckSheetValue["response"], CoipSubmitCheckSheetValue["error"], CoipSubmitCheckSheetValue["request"]>;
    client?: CoipSubmitCheckSheetValue["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async (data) => {
            const res = await client<CoipSubmitCheckSheetValue["data"], CoipSubmitCheckSheetValue["error"], CoipSubmitCheckSheetValue["request"]>({
                method: "post",
                url: `/api/v1/coip/checksheet-values`,
                data,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}