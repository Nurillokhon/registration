import type { CertificateStatusFilter } from '@/entities/certificate'

export type CertificateStatusTab = 'all' | CertificateStatusFilter

export const CERTIFICATE_STATUS_TABS = [
  { value: 'all', labelKey: 'dashboard.reviewCertificates.tabs.all' },
  { value: 'new', labelKey: 'dashboard.reviewCertificates.tabs.pending' },
  { value: 'approved', labelKey: 'dashboard.reviewCertificates.tabs.approved' },
  { value: 'problem', labelKey: 'dashboard.reviewCertificates.tabs.problem' },
  { value: 'rejected', labelKey: 'dashboard.reviewCertificates.tabs.rejected' },
] as const satisfies readonly { value: CertificateStatusTab; labelKey: string }[]

/** URL'dagi ?status= qiymati — noma'lum bo'lsa "Hammasi". */
export function parseCertificateStatusTab(value: string | null): CertificateStatusTab {
  return CERTIFICATE_STATUS_TABS.find((tab) => tab.value === value)?.value ?? 'all'
}
