import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import { api } from './axios'

export type RequestParams = Record<string, string | number | boolean | null | undefined>

type GetRequestArgs<TData, TError> = {
  url: string
  params?: RequestParams
  /** staleTime, enabled, select va hokazo — global sozlamalar ustidan. */
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
}

/**
 * GET — komponent ochilishi bilan yuklanadigan ma'lumot uchun.
 * staleTime/retry/refetchOnWindowFocus bu yerda belgilanmaydi: ular
 * app/providers/query-client.ts da bir marta qo'yilgan, kerak bo'lsa
 * `options` orqali bitta joyda o'zgartiriladi.
 */
export function useGetRequest<TData = unknown, TError = AxiosError>({
  url,
  params,
  options,
}: GetRequestArgs<TData, TError>) {
  return useQuery<TData, TError>({
    // params obyektini React Query o'zi barqaror tarzda hash qiladi.
    // [url] prefiksi bo'yicha invalidateQueries ham ishlayveradi.
    queryKey: [url, params],
    queryFn: async () => {
      const { data } = await api.get<TData>(url, { params })
      return data
    },
    ...options,
  })
}

type LazyGetRequestArgs<TData, TError> = {
  url: string
  params?: RequestParams
  options?: Omit<UseMutationOptions<TData, TError, RequestParams | void>, 'mutationFn'>
}

/**
 * GET — faqat chaqirilganda (tugma bosilganda, qidiruvda) ishga tushadi.
 * Avvalgi `isClick` bayrog'i o'rniga alohida hook: hook'ni `if` ichida
 * chaqirib bo'lmaydi — shart o'zgarganda React hook tartibini yo'qotib,
 * "Rendered more hooks than during the previous render" xatosi chiqadi.
 */
export function useLazyGetRequest<TData = unknown, TError = AxiosError>({
  url,
  params,
  options,
}: LazyGetRequestArgs<TData, TError>) {
  return useMutation<TData, TError, RequestParams | void>({
    // Chaqiruv paytidagi parametrlar (mutate({ page: 2 })) hook'dagilar ustidan yoziladi
    mutationFn: async (callParams) => {
      const { data } = await api.get<TData>(url, { params: { ...params, ...callParams } })
      return data
    },
    ...options,
  })
}

export type MutateVariables<TBody = unknown> = {
  url: string
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  data?: TBody
  /** Masalan, fayl yuklashda onUploadProgress berish uchun. */
  config?: AxiosRequestConfig
}

/**
 * POST/PUT/PATCH/DELETE — URL chaqiruv paytida beriladi.
 * `options` qabul qiladi: muvaffaqiyatdan keyin keshni yangilash uchun
 * onSuccess ichida queryClient.invalidateQueries(...) yozish SHART —
 * hook qaysi ma'lumot o'zgarganini o'zi bilmaydi.
 */
export function useMutateRequest<TResponse = unknown, TBody = unknown, TError = AxiosError>(
  options?: Omit<UseMutationOptions<TResponse, TError, MutateVariables<TBody>>, 'mutationFn'>,
) {
  return useMutation<TResponse, TError, MutateVariables<TBody>>({
    mutationFn: async ({ url, method, data, config }) => {
      const response = await api.request<TResponse>({ url, method, data, ...config })
      return response.data
    },
    ...options,
  })
}
