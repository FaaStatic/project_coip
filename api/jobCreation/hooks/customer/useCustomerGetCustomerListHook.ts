import client from "@untr/apps-coip/configs/createJobsInstanceKubb.config";
import { useQuery, queryOptions, useInfiniteQuery, infiniteQueryOptions } from "@tanstack/react-query";
import type { CustomerGetCustomerListQueryResponse, CustomerGetCustomerListQueryParams, CustomerGetCustomerList400, CustomerGetCustomerList401, CustomerGetCustomerList403, CustomerGetCustomerList500 } from "../../types/CustomerGetCustomerList";
import type { QueryObserverOptions, UseQueryResult, QueryKey, WithRequired, InfiniteQueryObserverOptions, UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";

 type CustomerGetCustomerListClient = typeof client<CustomerGetCustomerListQueryResponse, CustomerGetCustomerList400 | CustomerGetCustomerList401 | CustomerGetCustomerList403 | CustomerGetCustomerList500, never>;
type CustomerGetCustomerList = {
    data: CustomerGetCustomerListQueryResponse;
    error: CustomerGetCustomerList400 | CustomerGetCustomerList401 | CustomerGetCustomerList403 | CustomerGetCustomerList500;
    request: never;
    pathParams: never;
    queryParams: CustomerGetCustomerListQueryParams;
    headerParams: never;
    response: CustomerGetCustomerListQueryResponse;
    client: {
        parameters: Partial<Parameters<CustomerGetCustomerListClient>[0]>;
        return: Awaited<ReturnType<CustomerGetCustomerListClient>>;
    };
};
export const customerGetCustomerListQueryKey = (params?: CustomerGetCustomerList["queryParams"]) => [{ url: "/api/v1/customers/list" }, ...(params ? [params] : [])] as const;
export type CustomerGetCustomerListQueryKey = ReturnType<typeof customerGetCustomerListQueryKey>;
export function customerGetCustomerListQueryOptions<TData = CustomerGetCustomerList["response"], TQueryData = CustomerGetCustomerList["response"]>(params?: CustomerGetCustomerList["queryParams"], options: CustomerGetCustomerList["client"]["parameters"] = {}): WithRequired<QueryObserverOptions<CustomerGetCustomerList["response"], CustomerGetCustomerList["error"], TData, TQueryData>, "queryKey"> {
    const queryKey = customerGetCustomerListQueryKey(params);
    return {
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<CustomerGetCustomerList["data"], CustomerGetCustomerList["error"]>({
                method: "get",
                url: `/api/v1/customers/list`,
                params,
                ...options
            });
            return res.data;
        },
    };
}
/**
 * @summary Get Customer List
 * @link /api/v1/customers/list
 */
export function useCustomerGetCustomerListHook<TData = CustomerGetCustomerList["response"], TQueryData = CustomerGetCustomerList["response"], TQueryKey extends QueryKey = CustomerGetCustomerListQueryKey>(params?: CustomerGetCustomerList["queryParams"], options: {
    query?: Partial<QueryObserverOptions<CustomerGetCustomerList["response"], CustomerGetCustomerList["error"], TData, TQueryData, TQueryKey>>;
    client?: CustomerGetCustomerList["client"]["parameters"];
} = {}): UseQueryResult<TData, CustomerGetCustomerList["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? customerGetCustomerListQueryKey(params);
    const query = useQuery({
        ...customerGetCustomerListQueryOptions(params, clientOptions) as unknown as QueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<QueryObserverOptions, "queryKey">
    }) as UseQueryResult<TData, CustomerGetCustomerList["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}
export const customerGetCustomerListInfiniteQueryKey = (params?: CustomerGetCustomerList["queryParams"]) => [{ url: "/api/v1/customers/list" }, ...(params ? [params] : [])] as const;
export type CustomerGetCustomerListInfiniteQueryKey = ReturnType<typeof customerGetCustomerListInfiniteQueryKey>;
export function customerGetCustomerListInfiniteQueryOptions(params?: CustomerGetCustomerList["queryParams"], options: CustomerGetCustomerList["client"]["parameters"] = {}) {
    const queryKey = customerGetCustomerListInfiniteQueryKey(params);
    return infiniteQueryOptions({
        queryKey,
        queryFn: async ({ pageParam }) => {
            const res = await client<CustomerGetCustomerList["data"], CustomerGetCustomerList["error"]>({
                method: "get",
                url: `/api/v1/customers/list`,
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
 * @summary Get Customer List
 * @link /api/v1/customers/list
 */
export function useCustomerGetCustomerListHookInfinite<TData = InfiniteData<CustomerGetCustomerList["response"]>, TQueryData = CustomerGetCustomerList["response"], TQueryKey extends QueryKey = CustomerGetCustomerListInfiniteQueryKey>(params?: CustomerGetCustomerList["queryParams"], options: {
    query?: Partial<InfiniteQueryObserverOptions<CustomerGetCustomerList["response"], CustomerGetCustomerList["error"], TData, TQueryData, TQueryKey>>;
    client?: CustomerGetCustomerList["client"]["parameters"];
} = {}): UseInfiniteQueryResult<TData, CustomerGetCustomerList["error"]> & {
    queryKey: TQueryKey;
} {
    const { query: queryOptions, client: clientOptions = {} } = options ?? {};
    const queryKey = queryOptions?.queryKey ?? customerGetCustomerListInfiniteQueryKey(params);
    const query = useInfiniteQuery({
        ...customerGetCustomerListInfiniteQueryOptions(params, clientOptions) as unknown as InfiniteQueryObserverOptions,
        queryKey,
        ...queryOptions as unknown as Omit<InfiniteQueryObserverOptions, "queryKey">
    }) as UseInfiniteQueryResult<TData, CustomerGetCustomerList["error"]> & {
        queryKey: TQueryKey;
    };
    query.queryKey = queryKey as TQueryKey;
    return query;
}