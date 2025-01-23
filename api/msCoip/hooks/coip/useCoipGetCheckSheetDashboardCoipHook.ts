import client from "@untr/apps-coip/configs/coipInstanceKubb.config";
import { useQuery, queryOptions, useInfiniteQuery, infiniteQueryOptions } from "@tanstack/react-query";
import type { CoipGetCheckSheetDashboardCoipQueryResponse, CoipGetCheckSheetDashboardCoipQueryParams, CoipGetCheckSheetDashboardCoip400, CoipGetCheckSheetDashboardCoip401, CoipGetCheckSheetDashboardCoip403, CoipGetCheckSheetDashboardCoip500 } from "../../types/CoipGetCheckSheetDashboardCoip";
import type { QueryObserverOptions, UseQueryResult, QueryKey, WithRequired, InfiniteQueryObserverOptions, UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";

 type CoipGetCheckSheetDashboardCoipClient = typeof client<CoipGetCheckSheetDashboardCoipQueryResponse, CoipGetCheckSheetDashboardCoip400 | CoipGetCheckSheetDashboardCoip401 | CoipGetCheckSheetDashboardCoip403 | CoipGetCheckSheetDashboardCoip500, never>;
type CoipGetCheckSheetDashboardCoip = {
    data: CoipGetCheckSheetDashboardCoipQueryResponse;
    error: CoipGetCheckSheetDashboardCoip400 | CoipGetCheckSheetDashboardCoip401 | CoipGetCheckSheetDashboardCoip403 | CoipGetCheckSheetDashboardCoip500;
    request: never;
    pathParams: never;
    queryParams: CoipGetCheckSheetDashboardCoipQueryParams;
    headerParams: never;
    response: CoipGetCheckSheetDashboardCoipQueryResponse;
    client: {
        parameters: Partial<Parameters<CoipGetCheckSheetDashboardCoipClient>[0]>;
        return: Awaited<ReturnType<CoipGetCheckSheetDashboardCoipClient>>;
    };
};
export const coipGetCheckSheetDashboardCoipQueryKey = (params?: CoipGetCheckSheetDashboardCoip["queryParams"]) => [{ url: "/api/v1/coip/dashboard/coip-performance" }, ...(params ? [params] : [])] as const;
export type CoipGetCheckSheetDashboardCoipQueryKey = ReturnType<typeof coipGetCheckSheetDashboardCoipQueryKey>;
export function coipGetCheckSheetDashboardCoipQueryOptions<TData = CoipGetCheckSheetDashboardCoip["response"], TQueryData = CoipGetCheckSheetDashboardCoip["response"]>(params?: CoipGetCheckSheetDashboardCoip["queryParams"], options: CoipGetCheckSheetDashboardCoip["client"]["parameters"] = {}): WithRequired<QueryObserverOptions<CoipGetCheckSheetDashboardCoip["response"], CoipGetCheckSheetDashboardCoip["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = coipGetCheckSheetDashboardCoipQueryKey(params);
    return {
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<CoipGetCheckSheetDashboardCoip["data"], CoipGetCheckSheetDashboardCoip["error"]>({
                method: "get",
                url: `/api/v1/coip/dashboard/coip-performance`,
                params,
                ...options
            });
            return res.data;
        },
    };
}
/**
 * @summary Get Check Sheet Dashboard Coip Performance
 * @link /api/v1/coip/dashboard/coip-performance
 */
export function useCoipGetCheckSheetDashboardCoipHook<TData = CoipGetCheckSheetDashboardCoip["response"], TQueryData = CoipGetCheckSheetDashboardCoip["response"], TQueryKey extends QueryKey = CoipGetCheckSheetDashboardCoipQueryKey>(params?: CoipGetCheckSheetDashboardCoip["queryParams"], options: {
    query?: Partial<QueryObserverOptions<CoipGetCheckSheetDashboardCoip["response"], CoipGetCheckSheetDashboardCoip["error"], TData, TQueryData, TQueryKey>>;
    client?: CoipGetCheckSheetDashboardCoip["client"]["parameters"];
} = {}): UseQueryResult<TData, CoipGetCheckSheetDashboardCoip["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coipGetCheckSheetDashboardCoipQueryKey(params);
    const query = useQuery({
        ...coipGetCheckSheetDashboardCoipQueryOptions(params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, CoipGetCheckSheetDashboardCoip["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const coipGetCheckSheetDashboardCoipInfiniteQueryKey = (params?: CoipGetCheckSheetDashboardCoip["queryParams"]) => [{ url: "/api/v1/coip/dashboard/coip-performance" }, ...(params ? [params] : [])] as const;
export type CoipGetCheckSheetDashboardCoipInfiniteQueryKey = ReturnType<typeof coipGetCheckSheetDashboardCoipInfiniteQueryKey>;
export function coipGetCheckSheetDashboardCoipInfiniteQueryOptions(params?: CoipGetCheckSheetDashboardCoip["queryParams"], options: CoipGetCheckSheetDashboardCoip["client"]["parameters"] = {}) {
    const queryKey = coipGetCheckSheetDashboardCoipInfiniteQueryKey(params);
    return infiniteQueryOptions({
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<CoipGetCheckSheetDashboardCoip["data"], CoipGetCheckSheetDashboardCoip["error"]>({
                method: "get",
                url: `/api/v1/coip/dashboard/coip-performance`,
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
 * @summary Get Check Sheet Dashboard Coip Performance
 * @link /api/v1/coip/dashboard/coip-performance
 */
export function useCoipGetCheckSheetDashboardCoipHookInfinite<TData = InfiniteData<CoipGetCheckSheetDashboardCoip["response"]>, TQueryData = CoipGetCheckSheetDashboardCoip["response"], TQueryKey extends QueryKey = CoipGetCheckSheetDashboardCoipInfiniteQueryKey>(params?: CoipGetCheckSheetDashboardCoip["queryParams"], options: {
    query?: Partial<InfiniteQueryObserverOptions<CoipGetCheckSheetDashboardCoip["response"], CoipGetCheckSheetDashboardCoip["error"], TData, TQueryData, TQueryKey>>;
    client?: CoipGetCheckSheetDashboardCoip["client"]["parameters"];
} = {}): UseInfiniteQueryResult<TData, CoipGetCheckSheetDashboardCoip["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coipGetCheckSheetDashboardCoipInfiniteQueryKey(params);
    const query = useInfiniteQuery({
        ...coipGetCheckSheetDashboardCoipInfiniteQueryOptions(params, clientOptions) as unknown as InfiniteQueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<InfiniteQueryObserverOptions, "queryKey">
    }) as UseInfiniteQueryResult<TData, CoipGetCheckSheetDashboardCoip["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}