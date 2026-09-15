import { isCertificatePaid, type CertificateDetail } from '@/entities/certificate'
import type { DictionaryItem } from '@/entities/dictionary'

/** Ekspert qo'ya oladigan statuslar (`new` tahrirdan keyin backend o'zi qo'yadi). */
export type ReviewStatusCode = 'approved' | 'rejected' | 'problem'

const REVIEW_STATUS_CODES = ['approved', 'rejected', 'problem'] as const satisfies readonly ReviewStatusCode[]

function normalize(value: string | null | undefined) {
  return (value ?? '').trim().toLowerCase()
}

/** /dictionary/status/ dagi yozuv id'si — swagger bo'yicha nomi kodning o'zi (new, problem, approved, rejected). */
export function findStatusId(statuses: readonly DictionaryItem[], code: ReviewStatusCode) {
  return statuses.find((item) => normalize(item.name) === code)?.id ?? null
}

export function getStatusCode(certificate: Pick<CertificateDetail, 'status'>) {
  return normalize(certificate.status)
}

/** `approved` uchun tizim xabarni o'zi qo'yadi, qolganlarida sabab majburiy. */
export function requiresSmsMessage(code: ReviewStatusCode) {
  return code !== 'approved'
}

/**
 * Bosqichlar: 0 — to'lov kutilmoqda, 2 — to'langan va status qo'yilishini kutmoqda,
 * 3 — status qo'yilgan (hammasi tugagan).
 */
export function getReviewStep(certificate: Pick<CertificateDetail, 'status' | 'is_paid'>) {
  if (!isCertificatePaid(certificate)) return 0

  const status = getStatusCode(certificate)
  return REVIEW_STATUS_CODES.some((code) => code === status) ? 3 : 2
}
