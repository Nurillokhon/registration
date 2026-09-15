import { useQueryClient } from '@tanstack/react-query'
import { getCertificateEndpoint, invalidateCertificateQueries } from '@/entities/certificate'
import { useGetRequest, useMutateRequest, type Paginated } from '@/shared/api'
import type { FormSchema } from '../model/form-schema'

const ENDPOINTS = {
  formSchemas: '/ui/form-schemas/',
  create: '/main/certificate-create/',
} as const

// Sxemalar admin tomonidan kamdan-kam o'zgaradi
const FORM_SCHEMAS_STALE_TIME = 30 * 60 * 1000

const EMPTY_SCHEMAS: FormSchema[] = []

export function useFormSchemas() {
  const { data, isLoading } = useGetRequest<Paginated<FormSchema>>({
    url: ENDPOINTS.formSchemas,
    params: { page_size: 1000 },
    options: { staleTime: FORM_SCHEMAS_STALE_TIME },
  })

  return { schemas: data?.results ?? EMPTY_SCHEMAS, isLoading }
}

/** POST /main/certificate-create/ javobi (swagger: CertificateResponse) — to'lov uchun invoice yaratiladi. */
export type CertificateCreateResponse = {
  status: number
  message: string
  invoice: number
  /** Decimal satr, masalan "150000.00" */
  amount: string
  pay_url: string
}

export function useCreateCertificate() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutateRequest<CertificateCreateResponse, FormData>({
    onSuccess: () => invalidateCertificateQueries(queryClient),
  })

  const createCertificate = (data: FormData) =>
    mutateAsync({ url: ENDPOINTS.create, method: 'POST', data })

  return { createCertificate, isPending }
}

/** Backend tahrirlashga faqat NEW yoki PROBLEM holatda ruxsat beradi. */
export function useUpdateCertificate(id: number) {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutateRequest<unknown, FormData>({
    onSuccess: () => invalidateCertificateQueries(queryClient),
  })

  const updateCertificate = (data: FormData) =>
    mutateAsync({ url: getCertificateEndpoint(id), method: 'PATCH', data })

  return { updateCertificate, isPending }
}
