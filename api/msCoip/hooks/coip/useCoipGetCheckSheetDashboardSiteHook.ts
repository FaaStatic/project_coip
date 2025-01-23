import client from "@untr/apps-coip/configs/coipInstanceKubb.config";
import { useQuery, queryOptions, useInfiniteQuery, infiniteQueryOptions } from "@tanstack/react-query";
import type { CoipGetCheckSheetDashboardSiteQueryResponse, CoipGetCheckSheetDashboardSiteQueryParams, CoipGetCheckSheetDashboardSite400, CoipGetCheckSheetDashboardSite401, CoipGetCheckSheetDashboardSite403, CoipGetCheckSheetDashboardSite500 } from "../../types/CoipGetCheckSheetDashboardSite";
import type { QueryObserverOptions, UseQueryResult, QueryKey, WithRequired, InfiniteQueryObserverOptions, UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";

 type CoipGetCheckSheetDashboardSiteClient = typeof client<CoipGetCheckSheetDashboardSiteQueryResponse, CoipGetCheckSheetDashboardSite400 | CoipGetCheckSheetDashboardSite401 | CoipGetCheckSheetDashboardSite403 | CoipGetCheckSheetDashboardSite500, never>;
type CoipGetCheckSheetDashboardSite = {
    data: CoipGetCheckSheetDashboardSiteQueryResponse;
    error: CoipGetCheckSheetDashboardSite400 | CoipGetCheckSheetDashboardSite401 | CoipGetCheckSheetDashboardSite403 | CoipGetCheckSheetDashboardSite500;
    request: never;
    pathParams: never;
    queryParams: CoipGetCheckSheetDashboardSiteQueryParams;
    headerParams: never;
    response: CoipGetCheckSheetDashboardSiteQueryResponse;
    client: {
        parameters: Partial<Parameters<CoipGetCheckSheetDashboardSiteClient>[0]>;
        return: Awaited<ReturnType<CoipGetCheckSheetDashboardSiteClient>>;
    };
};
export const coipGetCheckSheetDashboardSiteQueryKey = (params?: CoipGetCheckSheetDashboardSite["queryParams"]) => [{ url: "/api/v1/coip/dashboard/site-performance" }, ...(params ? [params] : [])] as const;
export type CoipGetCheckSheetDashboardSiteQueryKey = ReturnType<typeof coipGetCheckSheetDashboardSiteQueryKey>;
export function coipGetCheckSheetDashboardSiteQueryOptions<TData = CoipGetCheckSheetDashboardSite["response"], TQueryData = CoipGetCheckSheetDashboardSite["response"]>(params?: CoipGetCheckSheetDashboardSite["queryParams"], options: CoipGetCheckSheetDashboardSite["client"]["parameters"] = {}): WithRequired<QueryObserverOptions<CoipGetCheckSheetDashboardSite["response"], CoipGetCheckSheetDashboardSite["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = coipGetCheckSheetDashboardSiteQueryKey(params);
    return {
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<CoipGetCheckSheetDashboardSite["data"], CoipGetCheckSheetDashboardSite["error"]>({
                method: "get",
                url: `/api/v1/coip/dashboard/site-performance`,
                params,
                ...options
            });
            return res.data;
        },
    };
}
/**
 * @summary Get Check Sheet Dashboard Site Performance
 * @link /api/v1/coip/dashboard/site-performance
 */
export function useCoipGetCheckSheetDashboardSiteHook<TData = CoipGetCheckSheetDashboardSite["response"], TQueryData = CoipGetCheckSheetDashboardSite["response"], TQueryKey extends QueryKey = CoipGetCheckSheetDashboardSiteQueryKey>(params?: CoipGetCheckSheetDashboardSite["queryParams"], options: {
    query?: Partial<QueryObserverOptions<CoipGetCheckSheetDashboardSite["response"], CoipGetCheckSheetDashboardSite["error"], TData, TQueryData, TQueryKey>>;
    client?: CoipGetCheckSheetDashboardSite["client"]["parameters"];
} = {}): UseQueryResult<TData, CoipGetCheckSheetDashboardSite["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coipGetCheckSheetDashboardSiteQueryKey(params);
    const query = useQuery({
        ...coipGetCheckSheetDashboardSiteQueryOptions(params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, CoipGetCheckSheetDashboardSite["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const coipGetCheckSheetDashboardSiteInfiniteQueryKey = (params?: CoipGetCheckSheetDashboardSite["queryParams"]) => [{ url: "/api/v1/coip/dashboard/site-performance" }, ...(params ? [params] : [])] as const;
export type CoipGetCheckSheetDashboardSiteInfiniteQueryKey = ReturnType<typeof coipGetCheckSheetDashboardSiteInfiniteQueryKey>;
export function coipGetCheckSheetDashboardSiteInfiniteQueryOptions(params?: CoipGetCheckSheetDashboardSite["queryParams"], options: CoipGetCheckSheetDashboardSite["client"]["parameters"] = {}) {
    const queryKey = coipGetCheckSheetDashboardSiteInfiniteQueryKey(params);
    return infiniteQueryOptions({
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<CoipGetCheckSheetDashboardSite["data"], CoipGetCheckSheetDashboardSite["error"]>({
                method: "get",
                url: `/api/v1/coip/dashboard/site-performance`,
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
 * @summary Get Check Sheet Dashboard Site Performance
 * @link /api/v1/coip/dashboard/site-performance
 */
export function useCoipGetCheckSheetDashboardSiteHookInfinite<TData = InfiniteData<CoipGetCheckSheetDashboardSite["response"]>, TQueryData = CoipGetCheckSheetDashboardSite["response"], TQueryKey extends QueryKey = CoipGetCheckSheetDashboardSiteInfiniteQueryKey>(params?: CoipGetCheckSheetDashboardSite["queryParams"], options: {
    query?: Partial<InfiniteQueryObserverOptions<CoipGetCheckSheetDashboardSite["response"], CoipGetCheckSheetDashboardSite["error"], TData, TQueryData, TQueryKey>>;
    client?: CoipGetCheckSheetDashboardSite["client"]["parameters"];
} = {}): UseInfiniteQueryResult<TData, CoipGetCheckSheetDashboardSite["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coipGetCheckSheetDashboardSiteInfiniteQueryKey(params);
    const query = useInfiniteQuery({
        ...coipGetCheckSheetDashboardSiteInfiniteQueryOptions(params, clientOptions) as unknown as InfiniteQueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<InfiniteQueryObserverOptions, "queryKey">
    }) as UseInfiniteQueryResult<TData, CoipGetCheckSheetDashboardSite["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}