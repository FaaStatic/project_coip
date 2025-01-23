import client from "@untr/apps-coip/configs/coipInstanceKubb.config";
import { useQuery, queryOptions, useInfiniteQuery, infiniteQueryOptions } from "@tanstack/react-query";
import type { CoipGetCheckSheetDashboardFleetQueryResponse, CoipGetCheckSheetDashboardFleetQueryParams, CoipGetCheckSheetDashboardFleet400, CoipGetCheckSheetDashboardFleet401, CoipGetCheckSheetDashboardFleet403, CoipGetCheckSheetDashboardFleet500 } from "../../types/CoipGetCheckSheetDashboardFleet";
import type { QueryObserverOptions, UseQueryResult, QueryKey, WithRequired, InfiniteQueryObserverOptions, UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";

 type CoipGetCheckSheetDashboardFleetClient = typeof client<CoipGetCheckSheetDashboardFleetQueryResponse, CoipGetCheckSheetDashboardFleet400 | CoipGetCheckSheetDashboardFleet401 | CoipGetCheckSheetDashboardFleet403 | CoipGetCheckSheetDashboardFleet500, never>;
type CoipGetCheckSheetDashboardFleet = {
    data: CoipGetCheckSheetDashboardFleetQueryResponse;
    error: CoipGetCheckSheetDashboardFleet400 | CoipGetCheckSheetDashboardFleet401 | CoipGetCheckSheetDashboardFleet403 | CoipGetCheckSheetDashboardFleet500;
    request: never;
    pathParams: never;
    queryParams: CoipGetCheckSheetDashboardFleetQueryParams;
    headerParams: never;
    response: CoipGetCheckSheetDashboardFleetQueryResponse;
    client: {
        parameters: Partial<Parameters<CoipGetCheckSheetDashboardFleetClient>[0]>;
        return: Awaited<ReturnType<CoipGetCheckSheetDashboardFleetClient>>;
    };
};
export const coipGetCheckSheetDashboardFleetQueryKey = (params?: CoipGetCheckSheetDashboardFleet["queryParams"]) => [{ url: "/api/v1/coip/dashboard/fleet-performance" }, ...(params ? [params] : [])] as const;
export type CoipGetCheckSheetDashboardFleetQueryKey = ReturnType<typeof coipGetCheckSheetDashboardFleetQueryKey>;
export function coipGetCheckSheetDashboardFleetQueryOptions<TData = CoipGetCheckSheetDashboardFleet["response"], TQueryData = CoipGetCheckSheetDashboardFleet["response"]>(params?: CoipGetCheckSheetDashboardFleet["queryParams"], options: CoipGetCheckSheetDashboardFleet["client"]["parameters"] = {}): WithRequired<QueryObserverOptions<CoipGetCheckSheetDashboardFleet["response"], CoipGetCheckSheetDashboardFleet["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = coipGetCheckSheetDashboardFleetQueryKey(params);
    return {
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<CoipGetCheckSheetDashboardFleet["data"], CoipGetCheckSheetDashboardFleet["error"]>({
                method: "get",
                url: `/api/v1/coip/dashboard/fleet-performance`,
                params,
                ...options
            });
            return res.data;
        },
    };
}
/**
 * @summary Get Check Sheet Dashboard Fleet Performance
 * @link /api/v1/coip/dashboard/fleet-performance
 */
export function useCoipGetCheckSheetDashboardFleetHook<TData = CoipGetCheckSheetDashboardFleet["response"], TQueryData = CoipGetCheckSheetDashboardFleet["response"], TQueryKey extends QueryKey = CoipGetCheckSheetDashboardFleetQueryKey>(params?: CoipGetCheckSheetDashboardFleet["queryParams"], options: {
    query?: Partial<QueryObserverOptions<CoipGetCheckSheetDashboardFleet["response"], CoipGetCheckSheetDashboardFleet["error"], TData, TQueryData, TQueryKey>>;
    client?: CoipGetCheckSheetDashboardFleet["client"]["parameters"];
} = {}): UseQueryResult<TData, CoipGetCheckSheetDashboardFleet["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coipGetCheckSheetDashboardFleetQueryKey(params);
    const query = useQuery({
        ...coipGetCheckSheetDashboardFleetQueryOptions(params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, CoipGetCheckSheetDashboardFleet["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const coipGetCheckSheetDashboardFleetInfiniteQueryKey = (params?: CoipGetCheckSheetDashboardFleet["queryParams"]) => [{ url: "/api/v1/coip/dashboard/fleet-performance" }, ...(params ? [params] : [])] as const;
export type CoipGetCheckSheetDashboardFleetInfiniteQueryKey = ReturnType<typeof coipGetCheckSheetDashboardFleetInfiniteQueryKey>;
export function coipGetCheckSheetDashboardFleetInfiniteQueryOptions(params?: CoipGetCheckSheetDashboardFleet["queryParams"], options: CoipGetCheckSheetDashboardFleet["client"]["parameters"] = {}) {
    const queryKey = coipGetCheckSheetDashboardFleetInfiniteQueryKey(params);
    return infiniteQueryOptions({
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<CoipGetCheckSheetDashboardFleet["data"], CoipGetCheckSheetDashboardFleet["error"]>({
                method: "get",
                url: `/api/v1/coip/dashboard/fleet-performance`,
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
 * @summary Get Check Sheet Dashboard Fleet Performance
 * @link /api/v1/coip/dashboard/fleet-performance
 */
export function useCoipGetCheckSheetDashboardFleetHookInfinite<TData = InfiniteData<CoipGetCheckSheetDashboardFleet["response"]>, TQueryData = CoipGetCheckSheetDashboardFleet["response"], TQueryKey extends QueryKey = CoipGetCheckSheetDashboardFleetInfiniteQueryKey>(params?: CoipGetCheckSheetDashboardFleet["queryParams"], options: {
    query?: Partial<InfiniteQueryObserverOptions<CoipGetCheckSheetDashboardFleet["response"], CoipGetCheckSheetDashboardFleet["error"], TData, TQueryData, TQueryKey>>;
    client?: CoipGetCheckSheetDashboardFleet["client"]["parameters"];
} = {}): UseInfiniteQueryResult<TData, CoipGetCheckSheetDashboardFleet["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coipGetCheckSheetDashboardFleetInfiniteQueryKey(params);
    const query = useInfiniteQuery({
        ...coipGetCheckSheetDashboardFleetInfiniteQueryOptions(params, clientOptions) as unknown as InfiniteQueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<InfiniteQueryObserverOptions, "queryKey">
    }) as UseInfiniteQueryResult<TData, CoipGetCheckSheetDashboardFleet["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}