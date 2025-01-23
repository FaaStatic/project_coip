import client from "@untr/apps-coip/configs/coipInstanceKubb.config";
import { useQuery, queryOptions, useInfiniteQuery, infiniteQueryOptions } from "@tanstack/react-query";
import type { UnitPopulationGetTemplateUnitPopulationQueryResponse, UnitPopulationGetTemplateUnitPopulationQueryParams, UnitPopulationGetTemplateUnitPopulation400, UnitPopulationGetTemplateUnitPopulation401, UnitPopulationGetTemplateUnitPopulation403, UnitPopulationGetTemplateUnitPopulation500 } from "../../types/UnitPopulationGetTemplateUnitPopulation";
import type { QueryObserverOptions, UseQueryResult, QueryKey, WithRequired, InfiniteQueryObserverOptions, UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";

 type UnitPopulationGetTemplateUnitPopulationClient = typeof client<UnitPopulationGetTemplateUnitPopulationQueryResponse, UnitPopulationGetTemplateUnitPopulation400 | UnitPopulationGetTemplateUnitPopulation401 | UnitPopulationGetTemplateUnitPopulation403 | UnitPopulationGetTemplateUnitPopulation500, never>;
type UnitPopulationGetTemplateUnitPopulation = {
    data: UnitPopulationGetTemplateUnitPopulationQueryResponse;
    error: UnitPopulationGetTemplateUnitPopulation400 | UnitPopulationGetTemplateUnitPopulation401 | UnitPopulationGetTemplateUnitPopulation403 | UnitPopulationGetTemplateUnitPopulation500;
    request: never;
    pathParams: never;
    queryParams: UnitPopulationGetTemplateUnitPopulationQueryParams;
    headerParams: never;
    response: UnitPopulationGetTemplateUnitPopulationQueryResponse;
    client: {
        parameters: Partial<Parameters<UnitPopulationGetTemplateUnitPopulationClient>[0]>;
        return: Awaited<ReturnType<UnitPopulationGetTemplateUnitPopulationClient>>;
    };
};
export const unitPopulationGetTemplateUnitPopulationQueryKey = (params?: UnitPopulationGetTemplateUnitPopulation["queryParams"]) => [{ url: "/api/v1/unit-population/template" }, ...(params ? [params] : [])] as const;
export type UnitPopulationGetTemplateUnitPopulationQueryKey = ReturnType<typeof unitPopulationGetTemplateUnitPopulationQueryKey>;
export function unitPopulationGetTemplateUnitPopulationQueryOptions<TData = UnitPopulationGetTemplateUnitPopulation["response"], TQueryData = UnitPopulationGetTemplateUnitPopulation["response"]>(params?: UnitPopulationGetTemplateUnitPopulation["queryParams"], options: UnitPopulationGetTemplateUnitPopulation["client"]["parameters"] = {}): WithRequired<QueryObserverOptions<UnitPopulationGetTemplateUnitPopulation["response"], UnitPopulationGetTemplateUnitPopulation["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = unitPopulationGetTemplateUnitPopulationQueryKey(params);
    return {
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<UnitPopulationGetTemplateUnitPopulation["data"], UnitPopulationGetTemplateUnitPopulation["error"]>({
                method: "get",
                url: `/api/v1/unit-population/template`,
                params,
                ...options
            });
            return res.data;
        },
    };
}
/**
 * @summary Returns a template unit population file in Excel format.
 * @link /api/v1/unit-population/template
 */
export function useUnitPopulationGetTemplateUnitPopulationHook<TData = UnitPopulationGetTemplateUnitPopulation["response"], TQueryData = UnitPopulationGetTemplateUnitPopulation["response"], TQueryKey extends QueryKey = UnitPopulationGetTemplateUnitPopulationQueryKey>(params?: UnitPopulationGetTemplateUnitPopulation["queryParams"], options: {
    query?: Partial<QueryObserverOptions<UnitPopulationGetTemplateUnitPopulation["response"], UnitPopulationGetTemplateUnitPopulation["error"], TData, TQueryData, TQueryKey>>;
    client?: UnitPopulationGetTemplateUnitPopulation["client"]["parameters"];
} = {}): UseQueryResult<TData, UnitPopulationGetTemplateUnitPopulation["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? unitPopulationGetTemplateUnitPopulationQueryKey(params);
    const query = useQuery({
        ...unitPopulationGetTemplateUnitPopulationQueryOptions(params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, UnitPopulationGetTemplateUnitPopulation["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const unitPopulationGetTemplateUnitPopulationInfiniteQueryKey = (params?: UnitPopulationGetTemplateUnitPopulation["queryParams"]) => [{ url: "/api/v1/unit-population/template" }, ...(params ? [params] : [])] as const;
export type UnitPopulationGetTemplateUnitPopulationInfiniteQueryKey = ReturnType<typeof unitPopulationGetTemplateUnitPopulationInfiniteQueryKey>;
export function unitPopulationGetTemplateUnitPopulationInfiniteQueryOptions(params?: UnitPopulationGetTemplateUnitPopulation["queryParams"], options: UnitPopulationGetTemplateUnitPopulation["client"]["parameters"] = {}) {
    const queryKey = unitPopulationGetTemplateUnitPopulationInfiniteQueryKey(params);
    return infiniteQueryOptions({
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<UnitPopulationGetTemplateUnitPopulation["data"], UnitPopulationGetTemplateUnitPopulation["error"]>({
                method: "get",
                url: `/api/v1/unit-population/template`,
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
 * @summary Returns a template unit population file in Excel format.
 * @link /api/v1/unit-population/template
 */
export function useUnitPopulationGetTemplateUnitPopulationHookInfinite<TData = InfiniteData<UnitPopulationGetTemplateUnitPopulation["response"]>, TQueryData = UnitPopulationGetTemplateUnitPopulation["response"], TQueryKey extends QueryKey = UnitPopulationGetTemplateUnitPopulationInfiniteQueryKey>(params?: UnitPopulationGetTemplateUnitPopulation["queryParams"], options: {
    query?: Partial<InfiniteQueryObserverOptions<UnitPopulationGetTemplateUnitPopulation["response"], UnitPopulationGetTemplateUnitPopulation["error"], TData, TQueryData, TQueryKey>>;
    client?: UnitPopulationGetTemplateUnitPopulation["client"]["parameters"];
} = {}): UseInfiniteQueryResult<TData, UnitPopulationGetTemplateUnitPopulation["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? unitPopulationGetTemplateUnitPopulationInfiniteQueryKey(params);
    const query = useInfiniteQuery({
        ...unitPopulationGetTemplateUnitPopulationInfiniteQueryOptions(params, clientOptions) as unknown as InfiniteQueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<InfiniteQueryObserverOptions, "queryKey">
    }) as UseInfiniteQueryResult<TData, UnitPopulationGetTemplateUnitPopulation["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}