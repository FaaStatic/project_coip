import client from "@untr/apps-coip/configs/createJobsInstanceKubb.config";
import { useQuery, queryOptions, useInfiniteQuery, infiniteQueryOptions } from "@tanstack/react-query";
import type { JobCreationGetJobListQueryResponse, JobCreationGetJobListQueryParams, JobCreationGetJobList400, JobCreationGetJobList401, JobCreationGetJobList403, JobCreationGetJobList500 } from "../../types/JobCreationGetJobList";
import type { QueryObserverOptions, UseQueryResult, QueryKey, WithRequired, InfiniteQueryObserverOptions, UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";

 type JobCreationGetJobListClient = typeof client<JobCreationGetJobListQueryResponse, JobCreationGetJobList400 | JobCreationGetJobList401 | JobCreationGetJobList403 | JobCreationGetJobList500, never>;
type JobCreationGetJobList = {
    data: JobCreationGetJobListQueryResponse;
    error: JobCreationGetJobList400 | JobCreationGetJobList401 | JobCreationGetJobList403 | JobCreationGetJobList500;
    request: never;
    pathParams: never;
    queryParams: JobCreationGetJobListQueryParams;
    headerParams: never;
    response: JobCreationGetJobListQueryResponse;
    client: {
        parameters: Partial<Parameters<JobCreationGetJobListClient>[0]>;
        return: Awaited<ReturnType<JobCreationGetJobListClient>>;
    };
};
export const jobCreationGetJobListQueryKey = (params?: JobCreationGetJobList["queryParams"]) => [{ url: "/api/v1/jobs/list" }, ...(params ? [params] : [])] as const;
export type JobCreationGetJobListQueryKey = ReturnType<typeof jobCreationGetJobListQueryKey>;
export function jobCreationGetJobListQueryOptions<TData = JobCreationGetJobList["response"], TQueryData = JobCreationGetJobList["response"]>(params?: JobCreationGetJobList["queryParams"], options: JobCreationGetJobList["client"]["parameters"] = {}): WithRequired<QueryObserverOptions<JobCreationGetJobList["response"], JobCreationGetJobList["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = jobCreationGetJobListQueryKey(params);
    return {
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<JobCreationGetJobList["data"], JobCreationGetJobList["error"]>({
                method: "get",
                url: `/api/v1/jobs/list`,
                params,
                ...options
            });
            return res.data;
        },
    };
}
/**
 * @summary Get Job List
 * @link /api/v1/jobs/list
 */
export function useJobCreationGetJobListHook<TData = JobCreationGetJobList["response"], TQueryData = JobCreationGetJobList["response"], TQueryKey extends QueryKey = JobCreationGetJobListQueryKey>(params?: JobCreationGetJobList["queryParams"], options: {
    query?: Partial<QueryObserverOptions<JobCreationGetJobList["response"], JobCreationGetJobList["error"], TData, TQueryData, TQueryKey>>;
    client?: JobCreationGetJobList["client"]["parameters"];
} = {}): UseQueryResult<TData, JobCreationGetJobList["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? jobCreationGetJobListQueryKey(params);
    const query = useQuery({
        ...jobCreationGetJobListQueryOptions(params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, JobCreationGetJobList["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const jobCreationGetJobListInfiniteQueryKey = (params?: JobCreationGetJobList["queryParams"]) => [{ url: "/api/v1/jobs/list" }, ...(params ? [params] : [])] as const;
export type JobCreationGetJobListInfiniteQueryKey = ReturnType<typeof jobCreationGetJobListInfiniteQueryKey>;
export function jobCreationGetJobListInfiniteQueryOptions(params?: JobCreationGetJobList["queryParams"], options: JobCreationGetJobList["client"]["parameters"] = {}) {
    const queryKey = jobCreationGetJobListInfiniteQueryKey(params);
    return infiniteQueryOptions({
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<JobCreationGetJobList["data"], JobCreationGetJobList["error"]>({
                method: "get",
                url: `/api/v1/jobs/list`,
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
 * @summary Get Job List
 * @link /api/v1/jobs/list
 */
export function useJobCreationGetJobListHookInfinite<TData = InfiniteData<JobCreationGetJobList["response"]>, TQueryData = JobCreationGetJobList["response"], TQueryKey extends QueryKey = JobCreationGetJobListInfiniteQueryKey>(params?: JobCreationGetJobList["queryParams"], options: {
    query?: Partial<InfiniteQueryObserverOptions<JobCreationGetJobList["response"], JobCreationGetJobList["error"], TData, TQueryData, TQueryKey>>;
    client?: JobCreationGetJobList["client"]["parameters"];
} = {}): UseInfiniteQueryResult<TData, JobCreationGetJobList["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? jobCreationGetJobListInfiniteQueryKey(params);
    const query = useInfiniteQuery({
        ...jobCreationGetJobListInfiniteQueryOptions(params, clientOptions) as unknown as InfiniteQueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<InfiniteQueryObserverOptions, "queryKey">
    }) as UseInfiniteQueryResult<TData, JobCreationGetJobList["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}