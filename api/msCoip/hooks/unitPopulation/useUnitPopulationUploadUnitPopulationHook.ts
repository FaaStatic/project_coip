import client from "@untr/apps-coip/configs/coipInstanceKubb.config";
import { useMutation } from "@tanstack/react-query";
import type { UnitPopulationUploadUnitPopulationMutationResponse, UnitPopulationUploadUnitPopulationQueryParams, UnitPopulationUploadUnitPopulation400, UnitPopulationUploadUnitPopulation401, UnitPopulationUploadUnitPopulation403, UnitPopulationUploadUnitPopulation500 } from "../../types/UnitPopulationUploadUnitPopulation";
import type { UseMutationOptions } from "@tanstack/react-query";

 type UnitPopulationUploadUnitPopulationClient = typeof client<UnitPopulationUploadUnitPopulationMutationResponse, UnitPopulationUploadUnitPopulation400 | UnitPopulationUploadUnitPopulation401 | UnitPopulationUploadUnitPopulation403 | UnitPopulationUploadUnitPopulation500, FormData>;
type UnitPopulationUploadUnitPopulation = {
    data: UnitPopulationUploadUnitPopulationMutationResponse;
    error: UnitPopulationUploadUnitPopulation400 | UnitPopulationUploadUnitPopulation401 | UnitPopulationUploadUnitPopulation403 | UnitPopulationUploadUnitPopulation500;
    request: FormData;
    pathParams: never;
    queryParams: UnitPopulationUploadUnitPopulationQueryParams;
    headerParams: never;
    response: UnitPopulationUploadUnitPopulationMutationResponse;
    client: {
        parameters: Partial<Parameters<UnitPopulationUploadUnitPopulationClient>[0]>;
        return: Awaited<ReturnType<UnitPopulationUploadUnitPopulationClient>>;
    };
};
/**
 * @summary Upload Unit Population
 * @link /api/v1/unit-population/upload
 */
export function useUnitPopulationUploadUnitPopulationHook(params?: UnitPopulationUploadUnitPopulation["queryParams"], options: {
    mutation?: UseMutationOptions<UnitPopulationUploadUnitPopulation["response"], UnitPopulationUploadUnitPopulation["error"], UnitPopulationUploadUnitPopulation["request"]>;
    client?: UnitPopulationUploadUnitPopulation["client"]["parameters"];
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
            const res = await client<UnitPopulationUploadUnitPopulation["data"], UnitPopulationUploadUnitPopulation["error"], UnitPopulationUploadUnitPopulation["request"]>({
                method: "post",
                url: `/api/v1/unit-population/upload`,
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