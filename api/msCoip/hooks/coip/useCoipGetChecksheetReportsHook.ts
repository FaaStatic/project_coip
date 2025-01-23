import client from "@untr/apps-coip/configs/coipInstanceKubb.config";
import { useQuery, queryOptions, useInfiniteQuery, infiniteQueryOptions } from "@tanstack/react-query";
import type { CoipGetChecksheetReportsQueryResponse, CoipGetChecksheetReportsQueryParams, CoipGetChecksheetReports400, CoipGetChecksheetReports401, CoipGetChecksheetReports403, CoipGetChecksheetReports500 } from "../../types/CoipGetChecksheetReports";
import type { QueryObserverOptions, UseQueryResult, QueryKey, WithRequired, InfiniteQueryObserverOptions, UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";

 type CoipGetChecksheetReportsClient = typeof client<CoipGetChecksheetReportsQueryResponse, CoipGetChecksheetReports400 | CoipGetChecksheetReports401 | CoipGetChecksheetReports403 | CoipGetChecksheetReports500, never>;
type CoipGetChecksheetReports = {
    data: CoipGetChecksheetReportsQueryResponse;
    error: CoipGetChecksheetReports400 | CoipGetChecksheetReports401 | CoipGetChecksheetReports403 | CoipGetChecksheetReports500;
    request: never;
    pathParams: never;
    queryParams: CoipGetChecksheetReportsQueryParams;
    headerParams: never;
    response: CoipGetChecksheetReportsQueryResponse;
    client: {
        parameters: Partial<Parameters<CoipGetChecksheetReportsClient>[0]>;
        return: Awaited<ReturnType<CoipGetChecksheetReportsClient>>;
    };
};
export const coipGetChecksheetReportsQueryKey = (params?: CoipGetChecksheetReports["queryParams"]) => [{ url: "/api/v1/coip/report" }, ...(params ? [params] : [])] as const;
export type CoipGetChecksheetReportsQueryKey = ReturnType<typeof coipGetChecksheetReportsQueryKey>;
export function coipGetChecksheetReportsQueryOptions<TData = CoipGetChecksheetReports["response"], TQueryData = CoipGetChecksheetReports["response"]>(params?: CoipGetChecksheetReports["queryParams"], options: CoipGetChecksheetReports["client"]["parameters"] = {}): WithRequired<QueryObserverOptions<CoipGetChecksheetReports["response"], CoipGetChecksheetReports["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = coipGetChecksheetReportsQueryKey(params);
    return {
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<CoipGetChecksheetReports["data"], CoipGetChecksheetReports["error"]>({
                method: "get",
                url: `/api/v1/coip/report`,
                params,
                ...options
            });
            return res.data;
        },
    };
}
/**
 * @summary Get checksheet values for generate report
 * @link /api/v1/coip/report
 */
export function useCoipGetChecksheetReportsHook<TData = CoipGetChecksheetReports["response"], TQueryData = CoipGetChecksheetReports["response"], TQueryKey extends QueryKey = CoipGetChecksheetReportsQueryKey>(params?: CoipGetChecksheetReports["queryParams"], options: {
    query?: Partial<QueryObserverOptions<CoipGetChecksheetReports["response"], CoipGetChecksheetReports["error"], TData, TQueryData, TQueryKey>>;
    client?: CoipGetChecksheetReports["client"]["parameters"];
} = {}): UseQueryResult<TData, CoipGetChecksheetReports["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coipGetChecksheetReportsQueryKey(params);
    const query = useQuery({
        ...coipGetChecksheetReportsQueryOptions(params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, CoipGetChecksheetReports["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const coipGetChecksheetReportsInfiniteQueryKey = (params?: CoipGetChecksheetReports["queryParams"]) => [{ url: "/api/v1/coip/report" }, ...(params ? [params] : [])] as const;
export type CoipGetChecksheetReportsInfiniteQueryKey = ReturnType<typeof coipGetChecksheetReportsInfiniteQueryKey>;
export function coipGetChecksheetReportsInfiniteQueryOptions(params?: CoipGetChecksheetReports["queryParams"], options: CoipGetChecksheetReports["client"]["parameters"] = {}) {
    const queryKey = coipGetChecksheetReportsInfiniteQueryKey(params);
    return infiniteQueryOptions({
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<CoipGetChecksheetReports["data"], CoipGetChecksheetReports["error"]>({
                method: "get",
                url: `/api/v1/coip/report`,
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
 * @summary Get checksheet values for generate report
 * @link /api/v1/coip/report
 */
export function useCoipGetChecksheetReportsHookInfinite<TData = InfiniteData<CoipGetChecksheetReports["response"]>, TQueryData = CoipGetChecksheetReports["response"], TQueryKey extends QueryKey = CoipGetChecksheetReportsInfiniteQueryKey>(params?: CoipGetChecksheetReports["queryParams"], options: {
    query?: Partial<InfiniteQueryObserverOptions<CoipGetChecksheetReports["response"], CoipGetChecksheetReports["error"], TData, TQueryData, TQueryKey>>;
    client?: CoipGetChecksheetReports["client"]["parameters"];
} = {}): UseInfiniteQueryResult<TData, CoipGetChecksheetReports["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coipGetChecksheetReportsInfiniteQueryKey(params);
    const query = useInfiniteQuery({
        ...coipGetChecksheetReportsInfiniteQueryOptions(params, clientOptions) as unknown as InfiniteQueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<InfiniteQueryObserverOptions, "queryKey">
    }) as UseInfiniteQueryResult<TData, CoipGetChecksheetReports["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}