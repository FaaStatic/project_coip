import client from "@untr/apps-coip/configs/coipInstanceKubb.config";
import { useQuery, queryOptions, useInfiniteQuery, infiniteQueryOptions } from "@tanstack/react-query";
import type { CoipGetSyncQueryResponse, CoipGetSyncQueryParams, CoipGetSync400, CoipGetSync401, CoipGetSync403, CoipGetSync500 } from "../../types/CoipGetSync";
import type { QueryObserverOptions, UseQueryResult, QueryKey, WithRequired, InfiniteQueryObserverOptions, UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";

 type CoipGetSyncClient = typeof client<CoipGetSyncQueryResponse, CoipGetSync400 | CoipGetSync401 | CoipGetSync403 | CoipGetSync500, never>;
type CoipGetSync = {
    data: CoipGetSyncQueryResponse;
    error: CoipGetSync400 | CoipGetSync401 | CoipGetSync403 | CoipGetSync500;
    request: never;
    pathParams: never;
    queryParams: CoipGetSyncQueryParams;
    headerParams: never;
    response: CoipGetSyncQueryResponse;
    client: {
        parameters: Partial<Parameters<CoipGetSyncClient>[0]>;
        return: Awaited<ReturnType<CoipGetSyncClient>>;
    };
};
export const coipGetSyncQueryKey = (params?: CoipGetSync["queryParams"]) => [{ url: "/api/v1/coip/syncs" }, ...(params ? [params] : [])] as const;
export type CoipGetSyncQueryKey = ReturnType<typeof coipGetSyncQueryKey>;
export function coipGetSyncQueryOptions<TData = CoipGetSync["response"], TQueryData = CoipGetSync["response"]>(params?: CoipGetSync["queryParams"], options: CoipGetSync["client"]["parameters"] = {}): WithRequired<QueryObserverOptions<CoipGetSync["response"], CoipGetSync["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = coipGetSyncQueryKey(params);
    return {
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<CoipGetSync["data"], CoipGetSync["error"]>({
                method: "get",
                url: `/api/v1/coip/syncs`,
                params,
                ...options
            });
            return res.data;
        },
    };
}
/**
 * @summary Download File Sync for Mobile Device
 * @link /api/v1/coip/syncs
 */
export function useCoipGetSyncHook<TData = CoipGetSync["response"], TQueryData = CoipGetSync["response"], TQueryKey extends QueryKey = CoipGetSyncQueryKey>(params?: CoipGetSync["queryParams"], options: {
    query?: Partial<QueryObserverOptions<CoipGetSync["response"], CoipGetSync["error"], TData, TQueryData, TQueryKey>>;
    client?: CoipGetSync["client"]["parameters"];
} = {}): UseQueryResult<TData, CoipGetSync["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coipGetSyncQueryKey(params);
    const query = useQuery({
        ...coipGetSyncQueryOptions(params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, CoipGetSync["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const coipGetSyncInfiniteQueryKey = (params?: CoipGetSync["queryParams"]) => [{ url: "/api/v1/coip/syncs" }, ...(params ? [params] : [])] as const;
export type CoipGetSyncInfiniteQueryKey = ReturnType<typeof coipGetSyncInfiniteQueryKey>;
export function coipGetSyncInfiniteQueryOptions(params?: CoipGetSync["queryParams"], options: CoipGetSync["client"]["parameters"] = {}) {
    const queryKey = coipGetSyncInfiniteQueryKey(params);
    return infiniteQueryOptions({
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<CoipGetSync["data"], CoipGetSync["error"]>({
                method: "get",
                url: `/api/v1/coip/syncs`,
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
 * @link /api/v1/coip/syncs
 */
export function useCoipGetSyncHookInfinite<TData = InfiniteData<CoipGetSync["response"]>, TQueryData = CoipGetSync["response"], TQueryKey extends QueryKey = CoipGetSyncInfiniteQueryKey>(params?: CoipGetSync["queryParams"], options: {
    query?: Partial<InfiniteQueryObserverOptions<CoipGetSync["response"], CoipGetSync["error"], TData, TQueryData, TQueryKey>>;
    client?: CoipGetSync["client"]["parameters"];
} = {}): UseInfiniteQueryResult<TData, CoipGetSync["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coipGetSyncInfiniteQueryKey(params);
    const query = useInfiniteQuery({
        ...coipGetSyncInfiniteQueryOptions(params, clientOptions) as unknown as InfiniteQueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<InfiniteQueryObserverOptions, "queryKey">
    }) as UseInfiniteQueryResult<TData, CoipGetSync["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}