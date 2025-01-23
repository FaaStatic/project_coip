import client from "@untr/apps-coip/configs/coipInstanceKubb.config";
import { useQuery, queryOptions, useInfiniteQuery, infiniteQueryOptions } from "@tanstack/react-query";
import type { CoipDownloadReportSummaryQueryResponse, CoipDownloadReportSummaryQueryParams, CoipDownloadReportSummary400, CoipDownloadReportSummary401, CoipDownloadReportSummary403, CoipDownloadReportSummary500 } from "../../types/CoipDownloadReportSummary";
import type { QueryObserverOptions, UseQueryResult, QueryKey, WithRequired, InfiniteQueryObserverOptions, UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";

 type CoipDownloadReportSummaryClient = typeof client<CoipDownloadReportSummaryQueryResponse, CoipDownloadReportSummary400 | CoipDownloadReportSummary401 | CoipDownloadReportSummary403 | CoipDownloadReportSummary500, never>;
type CoipDownloadReportSummary = {
    data: CoipDownloadReportSummaryQueryResponse;
    error: CoipDownloadReportSummary400 | CoipDownloadReportSummary401 | CoipDownloadReportSummary403 | CoipDownloadReportSummary500;
    request: never;
    pathParams: never;
    queryParams: CoipDownloadReportSummaryQueryParams;
    headerParams: never;
    response: CoipDownloadReportSummaryQueryResponse;
    client: {
        parameters: Partial<Parameters<CoipDownloadReportSummaryClient>[0]>;
        return: Awaited<ReturnType<CoipDownloadReportSummaryClient>>;
    };
};
export const coipDownloadReportSummaryQueryKey = (params?: CoipDownloadReportSummary["queryParams"]) => [{ url: "/api/v1/coip/report/download-summary" }, ...(params ? [params] : [])] as const;
export type CoipDownloadReportSummaryQueryKey = ReturnType<typeof coipDownloadReportSummaryQueryKey>;
export function coipDownloadReportSummaryQueryOptions<TData = CoipDownloadReportSummary["response"], TQueryData = CoipDownloadReportSummary["response"]>(params?: CoipDownloadReportSummary["queryParams"], options: CoipDownloadReportSummary["client"]["parameters"] = {}): WithRequired<QueryObserverOptions<CoipDownloadReportSummary["response"], CoipDownloadReportSummary["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = coipDownloadReportSummaryQueryKey(params);
    return {
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<CoipDownloadReportSummary["data"], CoipDownloadReportSummary["error"]>({
                method: "get",
                url: `/api/v1/coip/report/download-summary`,
                params,
                ...options
            });
            return res.data;
        },
    };
}
/**
 * @summary Get job for download summary report
 * @link /api/v1/coip/report/download-summary
 */
export function useCoipDownloadReportSummaryHook<TData = CoipDownloadReportSummary["response"], TQueryData = CoipDownloadReportSummary["response"], TQueryKey extends QueryKey = CoipDownloadReportSummaryQueryKey>(params?: CoipDownloadReportSummary["queryParams"], options: {
    query?: Partial<QueryObserverOptions<CoipDownloadReportSummary["response"], CoipDownloadReportSummary["error"], TData, TQueryData, TQueryKey>>;
    client?: CoipDownloadReportSummary["client"]["parameters"];
} = {}): UseQueryResult<TData, CoipDownloadReportSummary["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coipDownloadReportSummaryQueryKey(params);
    const query = useQuery({
        ...coipDownloadReportSummaryQueryOptions(params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, CoipDownloadReportSummary["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const coipDownloadReportSummaryInfiniteQueryKey = (params?: CoipDownloadReportSummary["queryParams"]) => [{ url: "/api/v1/coip/report/download-summary" }, ...(params ? [params] : [])] as const;
export type CoipDownloadReportSummaryInfiniteQueryKey = ReturnType<typeof coipDownloadReportSummaryInfiniteQueryKey>;
export function coipDownloadReportSummaryInfiniteQueryOptions(params?: CoipDownloadReportSummary["queryParams"], options: CoipDownloadReportSummary["client"]["parameters"] = {}) {
    const queryKey = coipDownloadReportSummaryInfiniteQueryKey(params);
    return infiniteQueryOptions({
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<CoipDownloadReportSummary["data"], CoipDownloadReportSummary["error"]>({
                method: "get",
                url: `/api/v1/coip/report/download-summary`,
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
 * @summary Get job for download summary report
 * @link /api/v1/coip/report/download-summary
 */
export function useCoipDownloadReportSummaryHookInfinite<TData = InfiniteData<CoipDownloadReportSummary["response"]>, TQueryData = CoipDownloadReportSummary["response"], TQueryKey extends QueryKey = CoipDownloadReportSummaryInfiniteQueryKey>(params?: CoipDownloadReportSummary["queryParams"], options: {
    query?: Partial<InfiniteQueryObserverOptions<CoipDownloadReportSummary["response"], CoipDownloadReportSummary["error"], TData, TQueryData, TQueryKey>>;
    client?: CoipDownloadReportSummary["client"]["parameters"];
} = {}): UseInfiniteQueryResult<TData, CoipDownloadReportSummary["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? coipDownloadReportSummaryInfiniteQueryKey(params);
    const query = useInfiniteQuery({
        ...coipDownloadReportSummaryInfiniteQueryOptions(params, clientOptions) as unknown as InfiniteQueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<InfiniteQueryObserverOptions, "queryKey">
    }) as UseInfiniteQueryResult<TData, CoipDownloadReportSummary["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}