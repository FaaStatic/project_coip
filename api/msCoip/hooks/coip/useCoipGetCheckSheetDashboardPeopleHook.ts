import client from "@untr/apps-coip/configs/coipInstanceKubb.config";
import { useQuery, queryOptions, useInfiniteQuery, infiniteQueryOptions } from "@tanstack/react-query";
import type { CoipGetCheckSheetDashboardPeopleQueryResponse, CoipGetCheckSheetDashboardPeopleQueryParams, CoipGetCheckSheetDashboardPeople400, CoipGetCheckSheetDashboardPeople401, CoipGetCheckSheetDashboardPeople403, CoipGetCheckSheetDashboardPeople500 } from "../../types/CoipGetCheckSheetDashboardPeople";
import type { QueryObserverOptions, UseQueryResult, QueryKey, WithRequired, InfiniteQueryObserverOptions, UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";

 type CoipGetCheckSheetDashboardPeopleClient = typeof client<CoipGetCheckSheetDashboardPeopleQueryResponse, CoipGetCheckSheetDashboardPeople400 | CoipGetCheckSheetDashboardPeople401 | CoipGetCheckSheetDashboardPeople403 | CoipGetCheckSheetDashboardPeople500, never>;
type CoipGetCheckSheetDashboardPeople = {
    data: CoipGetCheckSheetDashboardPeopleQueryResponse;
    error: CoipGetCheckSheetDashboardPeople400 | CoipGetCheckSheetDashboardPeople401 | CoipGetCheckSheetDashboardPeople403 | CoipGetCheckSheetDashboardPeople500;
    request: never;
    pathParams: never;
    queryParams: CoipGetCheckSheetDashboardPeopleQueryParams;
    headerParams: never;
    response: CoipGetCheckSheetDashboardPeopleQueryResponse;
    client: {
        parameters: Partial<Parameters<CoipGetCheckSheetDashboardPeopleClient>[0]>;
        return: Awaited<ReturnType<CoipGetCheckSheetDashboardPeopleClient>>;
    };
};
export const coipGetCheckSheetDashboardPeopleQueryKey = (params?: CoipGetCheckSheetDashboardPeople["queryParams"]) => [{ url: "/api/v1/coip/dashboard/people-performance" }, ...(params ? [params] : [])] as const;
export type CoipGetCheckSheetDashboardPeopleQueryKey = ReturnType<typeof coipGetCheckSheetDashboardPeopleQueryKey>;
export function coipGetCheckSheetDashboardPeopleQueryOptions<TData = CoipGetCheckSheetDashboardPeople["response"], TQueryData = CoipGetCheckSheetDashboardPeople["response"]>(params?: CoipGetCheckSheetDashboardPeople["queryParams"], options: CoipGetCheckSheetDashboardPeople["client"]["parameters"] = {}): WithRequired<QueryObserverOptions<CoipGetCheckSheetDashboardPeople["response"], CoipGetCheckSheetDashboardPeople["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = coipGetCheckSheetDashboardPeopleQueryKey(params);
    return {
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<CoipGetCheckSheetDashboardPeople["data"], CoipGetCheckSheetDashboardPeople["error"]>({
                method: "get",
                url: `/api/v1/coip/dashboard/people-performance`,
                params,
                ...options
            });
            return res.data;
        },
    };
}
/**
 * @summary Get Check Sheet Dashboard People Performance
 * @link /api/v1/coip/dashboard/people-performance
 */
export function useCoipGetCheckSheetDashboardPeopleHook<TData = CoipGetCheckSheetDashboardPeople["response"], TQueryData = CoipGetCheckSheetDashboardPeople["response"], TQueryKey extends QueryKey = CoipGetCheckSheetDashboardPeopleQueryKey>(params?: CoipGetCheckSheetDashboardPeople["queryParams"], options: {
    query?: Partial<QueryObserverOptions<CoipGetCheckSheetDashboardPeople["response"], CoipGetCheckSheetDashboardPeople["error"], TData, TQueryData, TQueryKey>>;
    client?: CoipGetCheckSheetDashboardPeople["client"]["parameters"];
} = {}): UseQueryResult<TData, CoipGetCheckSheetDashboardPeople["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coipGetCheckSheetDashboardPeopleQueryKey(params);
    const query = useQuery({
        ...coipGetCheckSheetDashboardPeopleQueryOptions(params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, CoipGetCheckSheetDashboardPeople["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const coipGetCheckSheetDashboardPeopleInfiniteQueryKey = (params?: CoipGetCheckSheetDashboardPeople["queryParams"]) => [{ url: "/api/v1/coip/dashboard/people-performance" }, ...(params ? [params] : [])] as const;
export type CoipGetCheckSheetDashboardPeopleInfiniteQueryKey = ReturnType<typeof coipGetCheckSheetDashboardPeopleInfiniteQueryKey>;
export function coipGetCheckSheetDashboardPeopleInfiniteQueryOptions(params?: CoipGetCheckSheetDashboardPeople["queryParams"], options: CoipGetCheckSheetDashboardPeople["client"]["parameters"] = {}) {
    const queryKey = coipGetCheckSheetDashboardPeopleInfiniteQueryKey(params);
    return infiniteQueryOptions({
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<CoipGetCheckSheetDashboardPeople["data"], CoipGetCheckSheetDashboardPeople["error"]>({
                method: "get",
                url: `/api/v1/coip/dashboard/people-performance`,
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
 * @summary Get Check Sheet Dashboard People Performance
 * @link /api/v1/coip/dashboard/people-performance
 */
export function useCoipGetCheckSheetDashboardPeopleHookInfinite<TData = InfiniteData<CoipGetCheckSheetDashboardPeople["response"]>, TQueryData = CoipGetCheckSheetDashboardPeople["response"], TQueryKey extends QueryKey = CoipGetCheckSheetDashboardPeopleInfiniteQueryKey>(params?: CoipGetCheckSheetDashboardPeople["queryParams"], options: {
    query?: Partial<InfiniteQueryObserverOptions<CoipGetCheckSheetDashboardPeople["response"], CoipGetCheckSheetDashboardPeople["error"], TData, TQueryData, TQueryKey>>;
    client?: CoipGetCheckSheetDashboardPeople["client"]["parameters"];
} = {}): UseInfiniteQueryResult<TData, CoipGetCheckSheetDashboardPeople["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coipGetCheckSheetDashboardPeopleInfiniteQueryKey(params);
    const query = useInfiniteQuery({
        ...coipGetCheckSheetDashboardPeopleInfiniteQueryOptions(params, clientOptions) as unknown as InfiniteQueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<InfiniteQueryObserverOptions, "queryKey">
    }) as UseInfiniteQueryResult<TData, CoipGetCheckSheetDashboardPeople["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}