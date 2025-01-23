import client from "@untr/apps-coip/configs/coipInstanceKubb.config";
import { useMutation } from "@tanstack/react-query";
import type { CoipUploadExcelChecksheetMasterMutationResponse, CoipUploadExcelChecksheetMasterQueryParams, CoipUploadExcelChecksheetMaster400, CoipUploadExcelChecksheetMaster401, CoipUploadExcelChecksheetMaster403, CoipUploadExcelChecksheetMaster500 } from "../../types/CoipUploadExcelChecksheetMaster";
import type { UseMutationOptions } from "@tanstack/react-query";

 type CoipUploadExcelChecksheetMasterClient = typeof client<CoipUploadExcelChecksheetMasterMutationResponse, CoipUploadExcelChecksheetMaster400 | CoipUploadExcelChecksheetMaster401 | CoipUploadExcelChecksheetMaster403 | CoipUploadExcelChecksheetMaster500, FormData>;
type CoipUploadExcelChecksheetMaster = {
    data: CoipUploadExcelChecksheetMasterMutationResponse;
    error: CoipUploadExcelChecksheetMaster400 | CoipUploadExcelChecksheetMaster401 | CoipUploadExcelChecksheetMaster403 | CoipUploadExcelChecksheetMaster500;
    request: FormData;
    pathParams: never;
    queryParams: CoipUploadExcelChecksheetMasterQueryParams;
    headerParams: never;
    response: CoipUploadExcelChecksheetMasterMutationResponse;
    client: {
        parameters: Partial<Parameters<CoipUploadExcelChecksheetMasterClient>[0]>;
        return: Awaited<ReturnType<CoipUploadExcelChecksheetMasterClient>>;
    };
};
/**
 * @summary Upload ChecksheetMaster
 * @link /api/v1/coip/upload-checksheet-master
 */
export function useCoipUploadExcelChecksheetMasterHook(params?: CoipUploadExcelChecksheetMaster["queryParams"], options: {
    mutation?: UseMutationOptions<CoipUploadExcelChecksheetMaster["response"], CoipUploadExcelChecksheetMaster["error"], CoipUploadExcelChecksheetMaster["request"]>;
    client?: CoipUploadExcelChecksheetMaster["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async (data) => {
            const formData = new FormData();
            if (data) {
                Object.keys(data).forEach((key) => {
                    const value = data[key];
                    if (typeof key === "string" && (typeof value === "string" || value instanceof Blob)) {
                        formData.append(key, value);
                    }
                });
            }
            const res = await client<CoipUploadExcelChecksheetMaster["data"], CoipUploadExcelChecksheetMaster["error"], CoipUploadExcelChecksheetMaster["request"]>({
                method: "post",
                url: `/api/v1/coip/upload-checksheet-master`,
                params,
                data: formData,
                headers: { "Content-Type": "multipart/form-data", ...clientOptions.headers },
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}