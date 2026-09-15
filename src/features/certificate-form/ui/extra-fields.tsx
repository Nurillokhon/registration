import { useTranslation } from 'react-i18next'
import { SelectField, TextField } from '@/shared/ui'
import { getExtraErrorKey, type CertificateFormErrors } from '../model/certificate-form'
import type { ExtraField } from '../model/form-schema'

type ExtraFieldsProps = {
  fields: readonly ExtraField[]
  values: Record<string, string>
  errors: CertificateFormErrors
  onChange: (name: string, value: string) => void
}

/** Form-sxemadan olingan qo'shimcha maydonlar — turiga qarab matn, son, sana yoki tanlash. */
export function ExtraFields({ fields, values, errors, onChange }: ExtraFieldsProps) {
  const { t } = useTranslation()

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {fields.map((field) => {
        const errorKey = errors[getExtraErrorKey(field.name)]
        const error = errorKey && t(errorKey)
        const value = values[field.name] ?? ''

        if (field.kind === 'select') {
          return (
            <SelectField
              key={field.name}
              label={field.label}
              error={error}
              placeholder={t('dashboard.certificateForm.fields.select')}
              options={field.options}
              value={value}
              onChange={(event) => onChange(field.name, event.target.value)}
            />
          )
        }

        return (
          <TextField
            key={field.name}
            label={field.label}
            error={error}
            type={field.kind}
            inputMode={field.kind === 'number' ? 'decimal' : undefined}
            value={value}
            onChange={(event) => onChange(field.name, event.target.value)}
          />
        )
      })}
    </div>
  )
}
