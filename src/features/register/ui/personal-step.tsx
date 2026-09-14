/** @format */

import { FingerprintPattern, ShieldCheck } from "lucide-react";
import { useState, type FormEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { getApiErrorMessage, getApiPayloadStatus } from "@/shared/api";
import { ROUTES } from "@/shared/config";
import { FormAlert, FormHeader, InfoNote, TextField } from "@/shared/ui";
import { useCheckPersonalization } from "../api";
import { digitsOnly, latinLettersOnly } from "../model/normalize";
import { toPassportNumber, type PersonalData } from "../model/registration";
import {
  hasErrors,
  validatePersonal,
  type FieldErrors,
} from "../model/validation";
import { SubmitButton } from "./step-actions";

// Backend "allaqachon tasdiqlangan" holatini 400 bilan qaytaradi, lekin bu xato emas:
// foydalanuvchi 2-qadamdan ortga qaytib, 1-qadamni qayta yuborsa aynan shu keladi.
const ALREADY_VERIFIED_STATUS = 1;

type PersonalStepProps = {
  defaultValues: PersonalData;
  onSubmit: (values: PersonalData) => void;
};

export function PersonalStep({ defaultValues, onSubmit }: PersonalStepProps) {
  const { t } = useTranslation();
  const { checkPersonalization, isPending } = useCheckPersonalization();
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState<FieldErrors<PersonalData>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const updateField = (field: keyof PersonalData, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Foydalanuvchi maydonni tuzata boshlashi bilan eski xato yashiriladi
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setApiError(null);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const nextErrors = validatePersonal(values);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;

    setApiError(null);
    try {
      await checkPersonalization({
        pnfl: Number(values.pinfl),
        passport: toPassportNumber(values),
      });
      onSubmit(values);
    } catch (error) {
      if (getApiPayloadStatus(error) === ALREADY_VERIFIED_STATUS) {
        onSubmit(values);
        return;
      }
      // 503 ham shu yerga tushadi — xabar backend'dan keladi ("keyinroq urinib ko'ring")
      setApiError(getApiErrorMessage(error, t("register.errors.apiFallback")));
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <FormHeader
        title={t("register.personal.title")}
        subtitle={t("register.personal.subtitle")}
      />

      <div className="mt-10 space-y-7">
        <TextField
          label={t("register.personal.pinfl.label")}
          icon={FingerprintPattern}
          hint={t("register.personal.pinfl.hint")}
          error={errors.pinfl && t(errors.pinfl)}
          placeholder="00000000000000"
          inputMode="numeric"
          autoComplete="off"
          maxLength={14}
          value={values.pinfl}
          onChange={(event) =>
            updateField("pinfl", digitsOnly(event.target.value))
          }
        />

        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2.1fr)] gap-4">
          <TextField
            label={t("register.personal.passportSeries.label")}
            error={errors.passportSeries && t(errors.passportSeries)}
            placeholder="AA"
            autoComplete="off"
            autoCapitalize="characters"
            maxLength={2}
            inputClassName="text-center"
            value={values.passportSeries}
            onChange={(event) =>
              updateField(
                "passportSeries",
                latinLettersOnly(event.target.value),
              )
            }
          />
          <TextField
            label={t("register.personal.passportNumber.label")}
            error={errors.passportNumber && t(errors.passportNumber)}
            placeholder="1234567"
            inputMode="numeric"
            autoComplete="off"
            maxLength={7}
            value={values.passportNumber}
            onChange={(event) =>
              updateField("passportNumber", digitsOnly(event.target.value))
            }
          />
        </div>
      </div>

      {apiError && <FormAlert className="mt-7">{apiError}</FormAlert>}

      <div className="mt-10">
        <SubmitButton isPending={isPending}>
          {t("register.personal.submit")}
        </SubmitButton>
        <p className="text-body mt-6 text-center text-[14px]">
          {t("register.personal.haveAccount")}{" "}
          <Link
            to={ROUTES.login}
            className="text-primary font-semibold hover:underline"
          >
            {t("register.personal.signIn")}
          </Link>
        </p>
      </div>

      <InfoNote icon={ShieldCheck} className="mt-10 sm:mt-12">
        {t("register.personal.securityNote")}
      </InfoNote>
    </form>
  );
}
