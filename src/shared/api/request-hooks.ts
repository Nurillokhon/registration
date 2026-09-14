/** @format */

import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { api } from "./axios";

export type RequestParams = Record<
  string,
  string | number | boolean | null | undefined
>;

type GetRequestArgs<TData, TError> = {
  url: string;
  params?: RequestParams;
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">;
};

export function useGetRequest<TData = unknown, TError = AxiosError>({
  url,
  params,
  options,
}: GetRequestArgs<TData, TError>) {
  return useQuery<TData, TError>({
    queryKey: [url, params],
    queryFn: async () => {
      const { data } = await api.get<TData>(url, { params });
      return data;
    },
    ...options,
  });
}

type LazyGetRequestArgs<TData, TError> = {
  url: string;
  params?: RequestParams;
  options?: Omit<
    UseMutationOptions<TData, TError, RequestParams | void>,
    "mutationFn"
  >;
};

export function useLazyGetRequest<TData = unknown, TError = AxiosError>({
  url,
  params,
  options,
}: LazyGetRequestArgs<TData, TError>) {
  return useMutation<TData, TError, RequestParams | void>({
    // Chaqiruv paytidagi parametrlar (mutate({ page: 2 })) hook'dagilar ustidan yoziladi
    mutationFn: async (callParams) => {
      const { data } = await api.get<TData>(url, {
        params: { ...params, ...callParams },
      });
      return data;
    },
    ...options,
  });
}

export type MutateVariables<TBody = unknown> = {
  url: string;
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  data?: TBody;
  config?: AxiosRequestConfig;
};

export function useMutateRequest<
  TResponse = unknown,
  TBody = unknown,
  TError = AxiosError,
>(
  options?: Omit<
    UseMutationOptions<TResponse, TError, MutateVariables<TBody>>,
    "mutationFn"
  >,
) {
  return useMutation<TResponse, TError, MutateVariables<TBody>>({
    mutationFn: async ({ url, method, data, config }) => {
      const response = await api.request<TResponse>({
        url,
        method,
        data,
        ...config,
      });
      return response.data;
    },
    ...options,
  });
}
