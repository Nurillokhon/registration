import { MailCheck } from 'lucide-react'
import { useId, useState, type FormEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { FormHeader, InfoNote } from '@/shared/ui'
import { createEmptyCode } from '../model/registration'
import { validateCode, type ErrorKey } from '../model/validation'
import { CodeInput } from './code-input'
import { BackButton, SubmitButton } from './step-actions'

type VerifyStepProps = {
  /** Kod yuborilgan email yoki telefon raqami */
  target: string
  onSubmit: () => void
  onBack: () => void
}

export function VerifyStep({ target, onSubmit, onBack }: VerifyStepProps) {
  const { t } = useTranslation()
  const errorId = useId()
  const [code, setCode] = useState(createEmptyCode)
  const [error, setError] = useState<ErrorKey>()
  const [isCodeResent, setIsCodeResent] = useState(false)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const nextError = validateCode(code)
    setError(nextError)
    if (!nextError) onSubmit()
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <FormHeader
        title={t('register.verify.title')}
        subtitle={t('register.verify.subtitle', { target })}
      />

      <div className="mt-10">
        <CodeInput
          label={t('register.verify.codeLabel')}
          value={code}
          isInvalid={Boolean(error)}
          describedBy={error ? errorId : undefined}
          onChange={(nextCode) => {
            setCode(nextCode)
            setError(undefined)
          }}
        />
        {error && (
          <p id={errorId} className="text-danger mt-3 text-center text-[12px] font-medium">
            {t(error)}
          </p>
        )}

        <p className="text-body mt-5 text-center text-[14px]" aria-live="polite">
          {isCodeResent ? (
            t('register.verify.resent')
          ) : (
            <>
              {t('register.verify.noCode')}{' '}
              <button
                type="button"
                onClick={() => setIsCodeResent(true)}
                className="text-primary font-semibold hover:underline"
              >
                {t('register.verify.resend')}
              </button>
            </>
          )}
        </p>
      </div>

      <div className="mt-10">
        <SubmitButton>{t('register.verify.submit')}</SubmitButton>
        <BackButton onClick={onBack} />
      </div>

      <InfoNote icon={MailCheck} className="mt-10 sm:mt-12">
        {t('register.verify.securityNote')}
      </InfoNote>
    </form>
  )
}
