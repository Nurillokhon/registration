import { useQueryClient } from '@tanstack/react-query'
import {
  getCertificateEndpoint,
  invalidateCertificateQueries,
  type CertificateDetail,
} from '@/entities/certificate'
import type { DictionaryItem } from '@/entities/dictionary'
import { useGetRequest, useLazyGetRequest, useMutateRequest, type Paginated } from '@/shared/api'

const ENDPOINTS = {
  status: '/dictionary/status/',
  smsMessage: '/dictionary/sms-message/',
  updateStatus: '/main/update-status/',
  expertStatistics: '/main/expert-statistics/',
} as const

// Lug'atlar kamdan-kam o'zgaradi — arizalar orasida o'tganda qayta so'ralmasin
const DICTIONARY_STALE_TIME = 30 * 60 * 1000
const FULL_PAGE_PARAMS = { page_size: 1000 }

/** swagger: SMSMessage — rad etish/muammo sababi, nomzodga SMS bo'lib boradi */
export type SmsMessage = {
  id: number
  name: string
  code?: string
}

// Swagger sxemasida massiv, tavsifida esa "Sahifalanadi" — ikkala ko'rinish ham qabul qilinadi
type ListResponse<T> = T[] | Paginated<T>

function toList<T>(data: ListResponse<T> | undefined): T[] {
  if (!data) return []
  return Array.isArray(data) ? data : (data.results ?? [])
}

export function useReviewStatuses() {
  const { data, isLoading } = useGetRequest<ListResponse<DictionaryItem>>({
    url: ENDPOINTS.status,
    params: FULL_PAGE_PARAMS,
    options: { staleTime: DICTIONARY_STALE_TIME },
  })

  return { statuses: toList(data), isLoading }
}

export function useSmsMessages() {
  const { data, isLoading } = useGetRequest<ListResponse<SmsMessage>>({
    url: ENDPOINTS.smsMessage,
    params: FULL_PAGE_PARAMS,
    options: { staleTime: DICTIONARY_STALE_TIME },
  })

  return { smsMessages: toList(data), isLoading }
}

/** swagger: CertificateStatusUpdate — `expert` yuborilmaydi, backend tokendan aniqlaydi */
export type UpdateStatusBody = {
  certificate: number
  status: number
  sms_message?: number
}

export function useUpdateCertificateStatus() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutateRequest<unknown, UpdateStatusBody>({
    // Ariza, ro'yxatlar, tarix va ekspert ko'rsatkichlari yangi statusni aks ettirsin
    onSuccess: () =>
      Promise.all([
        invalidateCertificateQueries(queryClient),
        queryClient.invalidateQueries({ queryKey: [ENDPOINTS.expertStatistics] }),
      ]),
  })

  const updateStatus = (body: UpdateStatusBody) =>
    mutateAsync({ url: ENDPOINTS.updateStatus, method: 'POST', data: body })

  return { updateStatus, isPending }
}

export type QueueDirection = 'next' | 'previous'

/**
 * Ekspert navbati: GET /main/certificate/<id>/?next (yoki ?previous) keyingi/oldingi
 * arizani qaytaradi — faqat `new` holatdagi, ekspert tili va turidagi to'langanlar orasidan.
 */
export function useCertificateQueue(certificateId: number) {
  const { mutateAsync, isPending } = useLazyGetRequest<CertificateDetail>({
    url: getCertificateEndpoint(certificateId),
  })

  // Parametr qiymati kerak emas — backend faqat uning borligini tekshiradi
  const fetchNeighbor = (direction: QueueDirection) => mutateAsync({ [direction]: '' })

  return { fetchNeighbor, isPending }
}
