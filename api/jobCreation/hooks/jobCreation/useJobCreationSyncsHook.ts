import client from "@untr/apps-coip/configs/createJobsInstanceKubb.config";
import { useQuery, queryOptions, useInfiniteQuery, infiniteQueryOptions } from "@tanstack/react-query";
import type { JobCreationSyncsQueryResponse, JobCreationSyncsQueryParams, JobCreationSyncs400, JobCreationSyncs401, JobCreationSyncs403, JobCreationSyncs500 } from "../../types/JobCreationSyncs";
import type { QueryObserverOptions, UseQueryResult, QueryKey, WithRequired, InfiniteQueryObserverOptions, UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";

 type JobCreationSyncsClient = typeof client<JobCreationSyncsQueryResponse, JobCreationSyncs400 | JobCreationSyncs401 | JobCreationSyncs403 | JobCreationSyncs500, never>;
type JobCreationSyncs = {
    data: JobCreationSyncsQueryResponse;
    error: JobCreationSyncs400 | JobCreationSyncs401 | JobCreationSyncs403 | JobCreationSyncs500;
    request: never;
    pathParams: never;
    queryParams: JobCreationSyncsQueryParams;
    headerParams: never;
    response: JobCreationSyncsQueryResponse;
    client: {
        parameters: Partial<Parameters<JobCreationSyncsClient>[0]>;
        return: Awaited<ReturnType<JobCreationSyncsClient>>;
    };
};
export const jobCreationSyncsQueryKey = (params?: JobCreationSyncs["queryParams"]) => [{ url: "/api/v1/jobs/syncs" }, ...(params ? [params] : [])] as const;
export type JobCreationSyncsQueryKey = ReturnType<typeof jobCreationSyncsQueryKey>;
export function jobCreationSyncsQueryOptions<TData = JobCreationSyncs["response"], TQueryData = JobCreationSyncs["response"]>(params?: JobCreationSyncs["queryParams"], options: JobCreationSyncs["client"]["parameters"] = {}): WithRequired<QueryObserverOptions<JobCreationSyncs["response"], JobCreationSyncs["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = jobCreationSyncsQueryKey(params);
    return {
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<JobCreationSyncs["data"], JobCreationSyncs["error"]>({
                method: "get",
                url: `/api/v1/jobs/syncs`,
                params,
                ...options
            });
            return res.data;
        },
    };
}
/**
 * @summary Download File Sync for Mobile Device
 * @link /api/v1/jobs/syncs
 */
export function useJobCreationSyncsHook<TData = JobCreationSyncs["response"], TQueryData = JobCreationSyncs["response"], TQueryKey extends QueryKey = JobCreationSyncsQueryKey>(params?: JobCreationSyncs["queryParams"], options: {
    query?: Partial<QueryObserverOptions<JobCreationSyncs["response"], JobCreationSyncs["error"], TData, TQueryData, TQueryKey>>;
    client?: JobCreationSyncs["client"]["parameters"];
} = {}): UseQueryResult<TData, JobCreationSyncs["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? jobCreationSyncsQueryKey(params);
    const query = useQuery({
        ...jobCreationSyncsQueryOptions(params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, JobCreationSyncs["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const jobCreationSyncsInfiniteQueryKey = (params?: JobCreationSyncs["queryParams"]) => [{ url: "/api/v1/jobs/syncs" }, ...(params ? [params] : [])] as const;
export type JobCreationSyncsInfiniteQueryKey = ReturnType<typeof jobCreationSyncsInfiniteQueryKey>;
export function jobCreationSyncsInfiniteQueryOptions(params?: JobCreationSyncs["queryParams"], options: JobCreationSyncs["client"]["parameters"] = {}) {
    const queryKey = jobCreationSyncsInfiniteQueryKey(params);
    return infiniteQueryOptions({
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<JobCreationSyncs["data"], JobCreationSyncs["error"]>({
                method: "get",
                url: `/api/v1/jobs/syncs`,
                ...options,
                params: {
                    ...params,
                    ["pageNumber"]: pageParam,
                    ...(options.params || {}),
                }
            });
            return res.data;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => !lastPage?.meta.hasNextPage ? undefined : lastPageParam + 1,
        getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => firstPageParam <= 1 ? undefined : firstPageParam - 1
    });
}
/**
 * @summary Download File Sync for Mobile Device
 * @link /api/v1/jobs/syncs
 */
export function useJobCreationSyncsHookInfinite<TData = InfiniteData<JobCreationSyncs["response"]>, TQueryData = JobCreationSyncs["response"], TQueryKey extends QueryKey = JobCreationSyncsInfiniteQueryKey>(params?: JobCreationSyncs["queryParams"], options: {
    query?: Partial<InfiniteQueryObserverOptions<JobCreationSyncs["response"], JobCreationSyncs["error"], TData, TQueryData, TQueryKey>>;
    client?: JobCreationSyncs["client"]["parameters"];
} = {}): UseInfiniteQueryResult<TData, JobCreationSyncs["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? jobCreationSyncsInfiniteQueryKey(params);
    const query = useInfiniteQuery({
        ...jobCreationSyncsInfiniteQueryOptions(params, clientOptions) as unknown as InfiniteQueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<InfiniteQueryObserverOptions, "queryKey">
    }) as UseInfiniteQueryResult<TData, JobCreationSyncs["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}