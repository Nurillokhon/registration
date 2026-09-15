import type { DictionaryItem } from '@/entities/dictionary'

export type FormSchemaStatus = 'active' | 'inactive' | 'draft'

/** GET /ui/form-schemas/ elementi (swagger: FormSchema). `schema` tuzilmasi swagger'da berilmagan. */
export type FormSchema = {
  id: string
  code: string
  title: string
  description: string | null
  schema: unknown
  version?: number
  status?: FormSchemaStatus
}

export type ExtraFieldKind = 'text' | 'number' | 'date' | 'select'

export type ExtraField = {
  name: string
  label: string
  kind: ExtraFieldKind
  required: boolean
  options: { value: string; label: string }[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function asText(value: unknown) {
  return typeof value === 'string' || typeof value === 'number' ? String(value) : ''
}

// Variantlar turli ko'rinishda kelishi mumkin: ["A", "B"] (+ enumNames), [{value, label}],
// [{const, title}] (JSON Schema oneOf) yoki [{id, name}] (lug'at uslubi).
function toOptions(raw: unknown, names: unknown): ExtraField['options'] {
  if (!Array.isArray(raw)) return []
  const labels = Array.isArray(names) ? names : []

  return raw.flatMap((item, index) => {
    if (isRecord(item)) {
      const value = asText(item.value ?? item.const ?? item.id)
      if (!value) return []
      return [{ value, label: asText(item.label ?? item.title ?? item.name) || value }]
    }

    const value = asText(item)
    return value ? [{ value, label: asText(labels[index]) || value }] : []
  })
}

const TEXT_TYPES = ['string', 'text', 'textarea', 'email', 'tel']

function toKind(type: unknown, format: unknown, hasOptions: boolean): ExtraFieldKind | null {
  if (hasOptions) return 'select'
  if (type === 'date' || format === 'date') return 'date'
  if (type === 'number' || type === 'integer') return 'number'
  if (type === undefined || (typeof type === 'string' && TEXT_TYPES.includes(type))) return 'text'
  // boolean, array, object kabi murakkab turlar hozircha chizilmaydi
  return null
}

function toField(name: string, spec: Record<string, unknown>, required: boolean): ExtraField | null {
  const options = toOptions(spec.enum ?? spec.oneOf ?? spec.options ?? spec.choices, spec.enumNames)
  const kind = toKind(spec.type, spec.format, options.length > 0)
  if (!name || !kind) return null

  return { name, label: asText(spec.title ?? spec.label) || name, kind, required, options }
}

// 1-format: JSON Schema — { properties: { nomi: { type, title, enum } }, required: [...] }
function fromJsonSchema(properties: Record<string, unknown>, required: unknown) {
  const requiredNames = Array.isArray(required) ? required : []

  return Object.entries(properties).flatMap(([name, spec]) => {
    const field = isRecord(spec) ? toField(name, spec, requiredNames.includes(name)) : null
    return field ? [field] : []
  })
}

// 2-format: maydonlar ro'yxati — [{ name, label, type, required, options }]
function fromFieldList(list: unknown[]) {
  return list.flatMap((spec) => {
    if (!isRecord(spec)) return []
    const field = toField(asText(spec.name ?? spec.key ?? spec.id), spec, spec.required === true)
    return field ? [field] : []
  })
}

/**
 * Form-sxemadan qo'shimcha maydonlar ro'yxatini chiqaradi. Sxema formati
 * swagger'da hujjatlashtirilmagan, shuning uchun ikki keng tarqalgan ko'rinish
 * qo'llanadi; tanilmagan tuzilma yoki maydon turi shunchaki e'tiborsiz qoladi.
 */
export function parseFormSchemaFields(schema: unknown): ExtraField[] {
  if (Array.isArray(schema)) return fromFieldList(schema)
  if (!isRecord(schema)) return []
  if (isRecord(schema.properties)) return fromJsonSchema(schema.properties, schema.required)
  if (Array.isArray(schema.fields)) return fromFieldList(schema.fields)
  return []
}

function normalizeCode(value: string) {
  return value.trim().toLowerCase().replace(/[\s_-]+/g, '')
}

/**
 * Tanlangan sertifikat turiga mos sxema. Tur va sxema o'rtasidagi bog'lanish
 * backend'da aniq berilmagan — sxemaning `code`i tur id'si yoki nomi bilan
 * solishtiriladi ("IELTS" ↔ "ielts"). Nofaol va qoralama sxemalar olinmaydi.
 */
export function findSchemaForType(
  schemas: readonly FormSchema[],
  type: DictionaryItem | undefined,
) {
  if (!type) return undefined

  const candidates = [String(type.id), type.name ?? ''].filter(Boolean).map(normalizeCode)

  return schemas.find(
    (schema) =>
      (schema.status ?? 'active') === 'active' && candidates.includes(normalizeCode(schema.code)),
  )
}
