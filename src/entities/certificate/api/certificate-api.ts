import { keepPreviousData, type QueryClient } from '@tanstack/react-query'
import { useGetRequest, type Paginated } from '@/shared/api'
import type {
  CertificateDetail,
  CertificateHistoryItem,
  CertificateListItem,
  CertificatesParams,
} from '../model/types'

// So'rov kaliti [url, params] — ro'yxat, detal va tarix so'rovlari shu umumiy prefiksga ega
const CERTIFICATE_URL_PREFIX = '/main/certificate'
const CERTIFICATES_ENDPOINT = '/main/certificates/'

export function getCertificateEndpoint(id: number) {
  return `/main/certificate/${id}/`
}

function getCertificateHistoryEndpoint(id: number) {
  return `/main/certificate-history/${id}/`
}

const EMPTY_CERTIFICATES: CertificateListItem[] = []

export function useCertificates(params: CertificatesParams) {
  const { data, isLoading, isFetching, isError, refetch } = useGetRequest<
    Paginated<CertificateListItem>
  >({
    url: CERTIFICATES_ENDPOINT,
    params,
    // Sahifa yoki qidiruv o'zgarganda jadval bo'shab qolmasin — yangi javob kelguncha eskisi turadi
    options: { placeholderData: keepPreviousData },
  })

  return {
    certificates: data?.results ?? EMPTY_CERTIFICATES,
    count: data?.count ?? 0,
    isLoading,
    isFetching,
    isError,
    refetch,
  }
}

/** `id` null bo'lsa (URL'dagi id yaroqsiz) so'rov yuborilmaydi. */
export function useCertificate(id: number | null) {
  const { data, isLoading, error, refetch } = useGetRequest<CertificateDetail>({
    url: getCertificateEndpoint(id ?? 0),
    options: { enabled: id !== null },
  })

  return { certificate: data, isLoading, error, refetch }
}

// Swagger javobni bitta obyekt deb ko'rsatadi, amalda esa ro'yxat bo'lishi kutiladi —
// massiv, sahifalangan javob va yagona obyekt ham bir xil ro'yxatga keltiriladi.
type CertificateHistoryResponse =
  | CertificateHistoryItem[]
  | Paginated<CertificateHistoryItem>
  | CertificateHistoryItem

function toHistoryList(data: CertificateHistoryResponse | undefined): CertificateHistoryItem[] {
  if (!data) return []
  if (Array.isArray(data)) return data
  if ('results' in data) return data.results
  return [data]
}

export function useCertificateHistory(id: number) {
  const { data, isLoading, isError } = useGetRequest<CertificateHistoryResponse>({
    url: getCertificateHistoryEndpoint(id),
  })

  return { history: toHistoryList(data), isLoading, isError }
}

/** Sertifikat yaratilgan/o'zgargandan keyin ro'yxat, detal va tarix qayta so'raladi. */
export function invalidateCertificateQueries(queryClient: QueryClient) {
  return queryClient.invalidateQueries({
    predicate: ({ queryKey }) =>
      typeof queryKey[0] === 'string' && queryKey[0].startsWith(CERTIFICATE_URL_PREFIX),
  })
}
