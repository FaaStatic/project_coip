import client from "@untr/apps-coip/configs/coipInstanceKubb.config";
import { useQuery, queryOptions, useInfiniteQuery, infiniteQueryOptions } from "@tanstack/react-query";
import type { CoipGetChecksheetReportCustomersQueryResponse, CoipGetChecksheetReportCustomersPathParams, CoipGetChecksheetReportCustomers400, CoipGetChecksheetReportCustomers401, CoipGetChecksheetReportCustomers403, CoipGetChecksheetReportCustomers500 } from "../../types/CoipGetChecksheetReportCustomers";
import type { QueryObserverOptions, UseQueryResult, QueryKey, WithRequired, InfiniteQueryObserverOptions, UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";

 type CoipGetChecksheetReportCustomersClient = typeof client<CoipGetChecksheetReportCustomersQueryResponse, CoipGetChecksheetReportCustomers400 | CoipGetChecksheetReportCustomers401 | CoipGetChecksheetReportCustomers403 | CoipGetChecksheetReportCustomers500, never>;
type CoipGetChecksheetReportCustomers = {
    data: CoipGetChecksheetReportCustomersQueryResponse;
    error: CoipGetChecksheetReportCustomers400 | CoipGetChecksheetReportCustomers401 | CoipGetChecksheetReportCustomers403 | CoipGetChecksheetReportCustomers500;
    request: never;
    pathParams: CoipGetChecksheetReportCustomersPathParams;
    queryParams: never;
    headerParams: never;
    response: CoipGetChecksheetReportCustomersQueryResponse;
    client: {
        parameters: Partial<Parameters<CoipGetChecksheetReportCustomersClient>[0]>;
        return: Awaited<ReturnType<CoipGetChecksheetReportCustomersClient>>;
    };
};
export const coipGetChecksheetReportCustomersQueryKey = (jobid: CoipGetChecksheetReportCustomersPathParams["jobid"]) => [{ url: "/api/v1/coip/report/customer/:jobid", params: { jobid: jobid } }] as const;
export type CoipGetChecksheetReportCustomersQueryKey = ReturnType<typeof coipGetChecksheetReportCustomersQueryKey>;
export function coipGetChecksheetReportCustomersQueryOptions<TData = CoipGetChecksheetReportCustomers["response"], TQueryData = CoipGetChecksheetReportCustomers["response"]>(jobid: CoipGetChecksheetReportCustomersPathParams["jobid"], options: CoipGetChecksheetReportCustomers["client"]["parameters"] = {}): WithRequired<QueryObserverOptions<CoipGetChecksheetReportCustomers["response"], CoipGetChecksheetReportCustomers["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = coipGetChecksheetReportCustomersQueryKey(jobid);
    return {
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<CoipGetChecksheetReportCustomers["data"], CoipGetChecksheetReportCustomers["error"]>({
                method: "get",
                url: `/api/v1/coip/report/customer/${jobid}`,
                ...options
            });
            return res.data;
        },
    };
}
/**
 * @summary Get checksheet values for generate report customer
 * @link /api/v1/coip/report/customer/:jobid
 */
export function useCoipGetChecksheetReportCustomersHook<TData = CoipGetChecksheetReportCustomers["response"], TQueryData = CoipGetChecksheetReportCustomers["response"], TQueryKey extends QueryKey = CoipGetChecksheetReportCustomersQueryKey>(jobid: CoipGetChecksheetReportCustomersPathParams["jobid"], options: {
    query?: Partial<QueryObserverOptions<CoipGetChecksheetReportCustomers["response"], CoipGetChecksheetReportCustomers["error"], TData, TQueryData, TQueryKey>>;
    client?: CoipGetChecksheetReportCustomers["client"]["parameters"];
} = {}): UseQueryResult<TData, CoipGetChecksheetReportCustomers["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coipGetChecksheetReportCustomersQueryKey(jobid);
    const query = useQuery({
        ...coipGetChecksheetReportCustomersQueryOptions(jobid, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, CoipGetChecksheetReportCustomers["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const coipGetChecksheetReportCustomersInfiniteQueryKey = (jobid: CoipGetChecksheetReportCustomersPathParams["jobid"]) => [{ url: "/api/v1/coip/report/customer/:jobid", params: { jobid: jobid } }] as const;
export type CoipGetChecksheetReportCustomersInfiniteQueryKey = ReturnType<typeof coipGetChecksheetReportCustomersInfiniteQueryKey>;
export function coipGetChecksheetReportCustomersInfiniteQueryOptions(jobid: CoipGetChecksheetReportCustomersPathParams["jobid"], options: CoipGetChecksheetReportCustomers["client"]["parameters"] = {}) {
    const queryKey = coipGetChecksheetReportCustomersInfiniteQueryKey(jobid);
    return infiniteQueryOptions({
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<CoipGetChecksheetReportCustomers["data"], CoipGetChecksheetReportCustomers["error"]>({
                method: "get",
                url: `/api/v1/coip/report/customer/${jobid}`,
                ...options
            });
            return res.data;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, _allPages, lastPageParam) => !lastPage?.meta.hasNextPage ? undefined : lastPageParam + 1,
        getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => firstPageParam <= 1 ? undefined : firstPageParam - 1
    });
}
/**
 * @summary Get checksheet values for generate report customer
 * @link /api/v1/coip/report/customer/:jobid
 */
export function useCoipGetChecksheetReportCustomersHookInfinite<TData = InfiniteData<CoipGetChecksheetReportCustomers["response"]>, TQueryData = CoipGetChecksheetReportCustomers["response"], TQueryKey extends QueryKey = CoipGetChecksheetReportCustomersInfiniteQueryKey>(jobid: CoipGetChecksheetReportCustomersPathParams["jobid"], options: {
    query?: Partial<InfiniteQueryObserverOptions<CoipGetChecksheetReportCustomers["response"], CoipGetChecksheetReportCustomers["error"], TData, TQueryData, TQueryKey>>;
    client?: CoipGetChecksheetReportCustomers["client"]["parameters"];
} = {}): UseInfiniteQueryResult<TData, CoipGetChecksheetReportCustomers["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coipGetChecksheetReportCustomersInfiniteQueryKey(jobid);
    const query = useInfiniteQuery({
        ...coipGetChecksheetReportCustomersInfiniteQueryOptions(jobid, clientOptions) as unknown as InfiniteQueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<InfiniteQueryObserverOptions, "queryKey">
    }) as UseInfiniteQueryResult<TData, CoipGetChecksheetReportCustomers["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}