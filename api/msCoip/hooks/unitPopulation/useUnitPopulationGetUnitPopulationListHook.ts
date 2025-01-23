import client from "@untr/apps-coip/configs/coipInstanceKubb.config";
import { useQuery, queryOptions, useInfiniteQuery, infiniteQueryOptions } from "@tanstack/react-query";
import type { UnitPopulationGetUnitPopulationListQueryResponse, UnitPopulationGetUnitPopulationListQueryParams, UnitPopulationGetUnitPopulationList400, UnitPopulationGetUnitPopulationList401, UnitPopulationGetUnitPopulationList403, UnitPopulationGetUnitPopulationList500 } from "../../types/UnitPopulationGetUnitPopulationList";
import type { QueryObserverOptions, UseQueryResult, QueryKey, WithRequired, InfiniteQueryObserverOptions, UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";

 type UnitPopulationGetUnitPopulationListClient = typeof client<UnitPopulationGetUnitPopulationListQueryResponse, UnitPopulationGetUnitPopulationList400 | UnitPopulationGetUnitPopulationList401 | UnitPopulationGetUnitPopulationList403 | UnitPopulationGetUnitPopulationList500, never>;
type UnitPopulationGetUnitPopulationList = {
    data: UnitPopulationGetUnitPopulationListQueryResponse;
    error: UnitPopulationGetUnitPopulationList400 | UnitPopulationGetUnitPopulationList401 | UnitPopulationGetUnitPopulationList403 | UnitPopulationGetUnitPopulationList500;
    request: never;
    pathParams: never;
    queryParams: UnitPopulationGetUnitPopulationListQueryParams;
    headerParams: never;
    response: UnitPopulationGetUnitPopulationListQueryResponse;
    client: {
        parameters: Partial<Parameters<UnitPopulationGetUnitPopulationListClient>[0]>;
        return: Awaited<ReturnType<UnitPopulationGetUnitPopulationListClient>>;
    };
};
export const unitPopulationGetUnitPopulationListQueryKey = (params?: UnitPopulationGetUnitPopulationList["queryParams"]) => [{ url: "/api/v1/unit-population/list" }, ...(params ? [params] : [])] as const;
export type UnitPopulationGetUnitPopulationListQueryKey = ReturnType<typeof unitPopulationGetUnitPopulationListQueryKey>;
export function unitPopulationGetUnitPopulationListQueryOptions<TData = UnitPopulationGetUnitPopulationList["response"], TQueryData = UnitPopulationGetUnitPopulationList["response"]>(params?: UnitPopulationGetUnitPopulationList["queryParams"], options: UnitPopulationGetUnitPopulationList["client"]["parameters"] = {}): WithRequired<QueryObserverOptions<UnitPopulationGetUnitPopulationList["response"], UnitPopulationGetUnitPopulationList["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = unitPopulationGetUnitPopulationListQueryKey(params);
    return {
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<UnitPopulationGetUnitPopulationList["data"], UnitPopulationGetUnitPopulationList["error"]>({
                method: "get",
                url: `/api/v1/unit-population/list`,
                params,
                ...options
            });
            return res.data;
        },
    };
}
/**
 * @summary Get Unit Population List
 * @link /api/v1/unit-population/list
 */
export function useUnitPopulationGetUnitPopulationListHook<TData = UnitPopulationGetUnitPopulationList["response"], TQueryData = UnitPopulationGetUnitPopulationList["response"], TQueryKey extends QueryKey = UnitPopulationGetUnitPopulationListQueryKey>(params?: UnitPopulationGetUnitPopulationList["queryParams"], options: {
    query?: Partial<QueryObserverOptions<UnitPopulationGetUnitPopulationList["response"], UnitPopulationGetUnitPopulationList["error"], TData, TQueryData, TQueryKey>>;
    client?: UnitPopulationGetUnitPopulationList["client"]["parameters"];
} = {}): UseQueryResult<TData, UnitPopulationGetUnitPopulationList["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? unitPopulationGetUnitPopulationListQueryKey(params);
    const query = useQuery({
        ...unitPopulationGetUnitPopulationListQueryOptions(params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, UnitPopulationGetUnitPopulationList["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const unitPopulationGetUnitPopulationListInfiniteQueryKey = (params?: UnitPopulationGetUnitPopulationList["queryParams"]) => [{ url: "/api/v1/unit-population/list" }, ...(params ? [params] : [])] as const;
export type UnitPopulationGetUnitPopulationListInfiniteQueryKey = ReturnType<typeof unitPopulationGetUnitPopulationListInfiniteQueryKey>;
export function unitPopulationGetUnitPopulationListInfiniteQueryOptions(params?: UnitPopulationGetUnitPopulationList["queryParams"], options: UnitPopulationGetUnitPopulationList["client"]["parameters"] = {}) {
    const queryKey = unitPopulationGetUnitPopulationListInfiniteQueryKey(params);
    return infiniteQueryOptions({
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<UnitPopulationGetUnitPopulationList["data"], UnitPopulationGetUnitPopulationList["error"]>({
                method: "get",
                url: `/api/v1/unit-population/list`,
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
 * @summary Get Unit Population List
 * @link /api/v1/unit-population/list
 */
export function useUnitPopulationGetUnitPopulationListHookInfinite<TData = InfiniteData<UnitPopulationGetUnitPopulationList["response"]>, TQueryData = UnitPopulationGetUnitPopulationList["response"], TQueryKey extends QueryKey = UnitPopulationGetUnitPopulationListInfiniteQueryKey>(params?: UnitPopulationGetUnitPopulationList["queryParams"], options: {
    query?: Partial<InfiniteQueryObserverOptions<UnitPopulationGetUnitPopulationList["response"], UnitPopulationGetUnitPopulationList["error"], TData, TQueryData, TQueryKey>>;
    client?: UnitPopulationGetUnitPopulationList["client"]["parameters"];
} = {}): UseInfiniteQueryResult<TData, UnitPopulationGetUnitPopulationList["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? unitPopulationGetUnitPopulationListInfiniteQueryKey(params);
    const query = useInfiniteQuery({
        ...unitPopulationGetUnitPopulationListInfiniteQueryOptions(params, clientOptions) as unknown as InfiniteQueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<InfiniteQueryObserverOptions, "queryKey">
    }) as UseInfiniteQueryResult<TData, UnitPopulationGetUnitPopulationList["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}