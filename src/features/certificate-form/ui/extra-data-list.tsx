import { parseExtraData } from '@/entities/certificate'
import { useCertificateTypes } from '@/entities/dictionary'
import { useFormSchemas } from '../api'
import { findSchemaForType, parseFormSchemaFields } from '../model/form-schema'

type ExtraDataListProps = {
  title: string
  /** JSON satr yoki ballar massivi — parseExtraData() ikkalasini ham o'qiydi */
  extraData: unknown
  typeId: number | null
}

/**
 * Sertifikatning qo'shimcha ma'lumotlari. Yorliqlar formadagi kabi turga mos
 * sxemadan olinadi; sxema topilmasa maydon nomining o'zi ko'rsatiladi.
 */
export function ExtraDataList({ title, extraData, typeId }: ExtraDataListProps) {
  const { types } = useCertificateTypes()
  const { schemas } = useFormSchemas()

  const entries = Object.entries(parseExtraData(extraData)).filter(([, value]) => value !== '')
  if (entries.length === 0) return null

  const fields = parseFormSchemaFields(
    findSchemaForType(schemas, types.find((item) => item.id === typeId))?.schema,
  )

  return (
    <section className="bg-surface shadow-card border-line rounded-3xl border p-5 sm:p-8">
      <h2 className="text-heading border-line border-b pb-5 text-[18px] font-bold tracking-tight sm:text-[20px]">
        {title}
      </h2>
      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        {entries.map(([name, value]) => {
          const field = fields.find((item) => item.name === name)
          // Tanlash maydonida qiymat o'rniga uning yorlig'i ko'rsatiladi
          const displayValue = field?.options.find((option) => option.value === value)?.label ?? value

          return (
            <div key={name} className="border-line rounded-xl border px-4 py-3">
              <dt className="text-body text-[12.5px]">{field?.label ?? name}</dt>
              <dd className="text-heading mt-1 text-[14px] font-semibold break-words">
                {displayValue}
              </dd>
            </div>
          )
        })}
      </dl>
    </section>
  )
}
