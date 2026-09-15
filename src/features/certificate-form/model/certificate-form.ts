import { parseExtraData, type CertificateDetail } from '@/entities/certificate'
import type { ExtraField } from './form-schema'

export type CertificateFormMode = 'create' | 'edit'

export type CertificateFormValues = {
  number: string
  /** Select qiymatlari — lug'at elementining id'si satr ko'rinishida */
  language: string
  type: string
  degree: string
  /** "YYYY-MM-DD" — <input type="date"> qiymati API formati bilan bir xil */
  issueDate: string
  examDate: string
  examPlace: string
  file: File | null
  /** Form-sxemadagi qo'shimcha maydonlar: nomi → qiymati */
  extra: Record<string, string>
}

export type CertificateFieldName = Exclude<keyof CertificateFormValues, 'extra'>

export const EMPTY_CERTIFICATE_FORM: CertificateFormValues = {
  number: '',
  language: '',
  type: '',
  degree: '',
  issueDate: '',
  examDate: '',
  examPlace: '',
  file: null,
  extra: {},
}

function idToValue(id: number | null) {
  return id === null ? '' : String(id)
}

export function toCertificateFormValues(certificate: CertificateDetail): CertificateFormValues {
  return {
    number: certificate.number ?? '',
    language: idToValue(certificate.language),
    type: idToValue(certificate.type),
    degree: idToValue(certificate.degree),
    issueDate: certificate.issue_date ?? '',
    examDate: certificate.exam_date ?? '',
    examPlace: certificate.exam_place ?? '',
    file: null,
    extra: parseExtraData(certificate.extra_data),
  }
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024
export const ACCEPTED_FILE_TYPES = '.pdf,.jpg,.jpeg,.png'

// Xato matni emas, tarjima kaliti — til almashganda ko'rsatilgan xato ham tarjima bo'ladi.
export type CertificateFormErrorKey =
  | 'dashboard.certificateForm.errors.required'
  | 'dashboard.certificateForm.errors.number'
  | 'dashboard.certificateForm.errors.fileRequired'
  | 'dashboard.certificateForm.errors.fileTooLarge'

// Asosiy maydon xatolari o'z nomi bilan, qo'shimcha maydonlarniki getExtraErrorKey() bilan saqlanadi
export type CertificateFormErrors = Partial<Record<string, CertificateFormErrorKey>>

export function getExtraErrorKey(name: string) {
  return `extra.${name}`
}

const REQUIRED_FIELDS = [
  'number',
  'language',
  'type',
  'degree',
  'issueDate',
] as const satisfies readonly CertificateFieldName[]

export function validateCertificateForm(
  values: CertificateFormValues,
  extraFields: readonly ExtraField[],
  mode: CertificateFormMode,
): CertificateFormErrors {
  const errors: CertificateFormErrors = {}

  for (const field of REQUIRED_FIELDS) {
    if (!values[field].trim()) errors[field] = 'dashboard.certificateForm.errors.required'
  }

  // Tahrirlashda fayl ixtiyoriy — yangisi tanlanmasa serverdagisi saqlanib qoladi
  if (values.file && values.file.size > MAX_FILE_SIZE) {
    errors.file = 'dashboard.certificateForm.errors.fileTooLarge'
  } else if (!values.file && mode === 'create') {
    errors.file = 'dashboard.certificateForm.errors.fileRequired'
  }

  for (const field of extraFields) {
    const value = values.extra[field.name]?.trim() ?? ''
    const key = getExtraErrorKey(field.name)

    if (!value) {
      if (field.required) errors[key] = 'dashboard.certificateForm.errors.required'
    } else if (field.kind === 'number' && !Number.isFinite(Number(value))) {
      errors[key] = 'dashboard.certificateForm.errors.number'
    }
  }

  return errors
}

export function hasErrors(errors: CertificateFormErrors) {
  return Object.values(errors).some(Boolean)
}

// Faqat joriy sxemadagi to'ldirilgan maydonlar yuboriladi — tur almashtirilganda
// oldingi turning qiymatlari extra_data'ga tushib qolmasin.
function serializeExtraData(fields: readonly ExtraField[], values: Record<string, string>) {
  const entries = fields.flatMap((field) => {
    const value = values[field.name]?.trim()
    if (!value) return []
    return [[field.name, field.kind === 'number' ? Number(value) : value] as const]
  })

  return JSON.stringify(Object.fromEntries(entries))
}

/** Fayl ham yuborilgani uchun so'rov multipart/form-data bo'ladi (Content-Type'ni axios o'zi qo'yadi). */
export function toCertificateFormData(
  values: CertificateFormValues,
  extraFields: readonly ExtraField[],
  mode: CertificateFormMode,
) {
  const data = new FormData()
  data.append('number', values.number.trim())
  data.append('language', values.language)
  data.append('type', values.type)
  data.append('degree', values.degree)
  data.append('issue_date', values.issueDate)

  // Swagger'ning CertificateUpdate sxemasida imtihon maydonlari yo'q — faqat yaratishda yuboriladi
  if (mode === 'create') {
    if (values.examDate) data.append('exam_date', values.examDate)
    if (values.examPlace.trim()) data.append('exam_place', values.examPlace.trim())
  }

  if (values.file) data.append('file', values.file)
  if (extraFields.length > 0) data.append('extra_data', serializeExtraData(extraFields, values.extra))

  return data
}
