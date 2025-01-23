import client from "@untr/apps-coip/configs/createJobsInstanceKubb.config";
import { useMutation } from "@tanstack/react-query";
import type { JobCreationJobsPatchMutationRequest, JobCreationJobsPatchMutationResponse, JobCreationJobsPatch400, JobCreationJobsPatch401, JobCreationJobsPatch403, JobCreationJobsPatch500 } from "../../types/JobCreationJobsPatch";
import type { UseMutationOptions } from "@tanstack/react-query";

 type JobCreationJobsPatchClient = typeof client<JobCreationJobsPatchMutationResponse, JobCreationJobsPatch400 | JobCreationJobsPatch401 | JobCreationJobsPatch403 | JobCreationJobsPatch500, JobCreationJobsPatchMutationRequest>;
type JobCreationJobsPatch = {
    data: JobCreationJobsPatchMutationResponse;
    error: JobCreationJobsPatch400 | JobCreationJobsPatch401 | JobCreationJobsPatch403 | JobCreationJobsPatch500;
    request: JobCreationJobsPatchMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: JobCreationJobsPatchMutationResponse;
    client: {
        parameters: Partial<Parameters<JobCreationJobsPatchClient>[0]>;
        return: Awaited<ReturnType<JobCreationJobsPatchClient>>;
    };
};
/**
 * @summary Update Job
 * @link /api/v1/jobs
 */
export function useJobCreationJobsPatchHook(options: {
    mutation?: UseMutationOptions<JobCreationJobsPatch["response"], JobCreationJobsPatch["error"], JobCreationJobsPatch["request"]>;
    client?: JobCreationJobsPatch["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async (data) => {
            const res = await client<JobCreationJobsPatch["data"], JobCreationJobsPatch["error"], JobCreationJobsPatch["request"]>({
                method: "patch",
                url: `/api/v1/jobs`,
                data,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}