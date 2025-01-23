import client from "@untr/apps-coip/configs/createJobsInstanceKubb.config";
import { useMutation } from "@tanstack/react-query";
import type { JobCreationJobsPostMutationRequest, JobCreationJobsPostMutationResponse, JobCreationJobsPost400, JobCreationJobsPost401, JobCreationJobsPost403, JobCreationJobsPost500 } from "../../types/JobCreationJobsPost";
import type { UseMutationOptions } from "@tanstack/react-query";

 type JobCreationJobsPostClient = typeof client<JobCreationJobsPostMutationResponse, JobCreationJobsPost400 | JobCreationJobsPost401 | JobCreationJobsPost403 | JobCreationJobsPost500, JobCreationJobsPostMutationRequest>;
type JobCreationJobsPost = {
    data: JobCreationJobsPostMutationResponse;
    error: JobCreationJobsPost400 | JobCreationJobsPost401 | JobCreationJobsPost403 | JobCreationJobsPost500;
    request: JobCreationJobsPostMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: JobCreationJobsPostMutationResponse;
    client: {
        parameters: Partial<Parameters<JobCreationJobsPostClient>[0]>;
        return: Awaited<ReturnType<JobCreationJobsPostClient>>;
    };
};
/**
 * @summary Create New Job
 * @link /api/v1/jobs
 */
export function useJobCreationJobsPostHook(options: {
    mutation?: UseMutationOptions<JobCreationJobsPost["response"], JobCreationJobsPost["error"], JobCreationJobsPost["request"]>;
    client?: JobCreationJobsPost["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async (data) => {
            const res = await client<JobCreationJobsPost["data"], JobCreationJobsPost["error"], JobCreationJobsPost["request"]>({
                method: "post",
                url: `/api/v1/jobs`,
                data,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}