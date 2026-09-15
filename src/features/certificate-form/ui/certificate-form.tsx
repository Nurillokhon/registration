/** @format */

import {
  ArrowRight,
  Award,
  CalendarDays,
  GraduationCap,
  Hash,
  Languages,
  LoaderCircle,
  MapPin,
} from "lucide-react";
import { useState, type FormEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
  toSelectOptions,
  useCertificateTypes,
  useDegrees,
  useLanguages,
} from "@/entities/dictionary";
import { getApiErrorMessage } from "@/shared/api";
import {
  Button,
  buttonVariants,
  FileField,
  FormAlert,
  SelectField,
  TextField,
} from "@/shared/ui";
import { useFormSchemas } from "../api";
import {
  ACCEPTED_FILE_TYPES,
  hasErrors,
  getExtraErrorKey,
  toCertificateFormData,
  validateCertificateForm,
  type CertificateFieldName,
  type CertificateFormErrors,
  type CertificateFormMode,
  type CertificateFormValues,
} from "../model/certificate-form";
import { findSchemaForType, parseFormSchemaFields } from "../model/form-schema";
import { ExtraFields } from "./extra-fields";
import { FormSection } from "./form-section";

type CertificateFormProps = {
  mode: CertificateFormMode;
  defaultValues: CertificateFormValues;
  /** Tahrirlashda serverdagi joriy fayl havolasi */
  currentFileUrl?: string | null;
  submitLabel: string;
  cancelTo: string;
  isPending: boolean;
  /** Xato bo'lsa reject qilishi kerak — xabar forma ostida ko'rsatiladi */
  onSubmit: (data: FormData) => Promise<void>;
};

/** Sertifikat yaratish va tahrirlash uchun umumiy forma. So'rovni chaqiruvchi wrapper yuboradi. */
export function CertificateForm({
  mode,
  defaultValues,
  currentFileUrl,
  submitLabel,
  cancelTo,
  isPending,
  onSubmit,
}: CertificateFormProps) {
  const { t } = useTranslation();
  const { languages } = useLanguages();
  const { types } = useCertificateTypes();
  const { degrees } = useDegrees();
  const { schemas } = useFormSchemas();
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState<CertificateFormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);

  // Qo'shimcha maydonlar tanlangan turga bog'liq — tur almashishi bilan qayta hisoblanadi
  const selectedType = types.find((item) => String(item.id) === values.type);
  const extraFields = parseFormSchemaFields(
    findSchemaForType(schemas, selectedType)?.schema,
  );

  const updateField = <K extends CertificateFieldName>(
    field: K,
    value: CertificateFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Foydalanuvchi maydonni tuzata boshlashi bilan eski xato yashiriladi
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setApiError(null);
  };

  const updateExtraField = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, extra: { ...prev.extra, [name]: value } }));
    setErrors((prev) => ({ ...prev, [getExtraErrorKey(name)]: undefined }));
    setApiError(null);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const nextErrors = validateCertificateForm(values, extraFields, mode);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;

    setApiError(null);
    try {
      await onSubmit(toCertificateFormData(values, extraFields, mode));
    } catch (error) {
      setApiError(
        getApiErrorMessage(
          error,
          t("dashboard.certificateForm.errors.apiFallback"),
        ),
      );
    }
  };

  const getError = (field: CertificateFieldName) => {
    const key = errors[field];
    return key && t(key);
  };

  const selectPlaceholder = t("dashboard.certificateForm.fields.select");

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      <FormSection title={t("dashboard.certificateForm.sections.main")}>
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            className="sm:col-span-2"
            label={t("dashboard.certificateForm.fields.number")}
            icon={Hash}
            error={getError("number")}
            placeholder={t(
              "dashboard.certificateForm.fields.numberPlaceholder",
            )}
            autoComplete="off"
            maxLength={255}
            value={values.number}
            onChange={(event) => updateField("number", event.target.value)}
          />
          <SelectField
            label={t("dashboard.certificateForm.fields.type")}
            icon={Award}
            error={getError("type")}
            placeholder={selectPlaceholder}
            options={toSelectOptions(types)}
            value={values.type}
            onChange={(event) => updateField("type", event.target.value)}
          />
          <SelectField
            label={t("dashboard.certificateForm.fields.language")}
            icon={Languages}
            error={getError("language")}
            placeholder={selectPlaceholder}
            options={toSelectOptions(languages)}
            value={values.language}
            onChange={(event) => updateField("language", event.target.value)}
          />
          <SelectField
            label={t("dashboard.certificateForm.fields.degree")}
            icon={GraduationCap}
            error={getError("degree")}
            placeholder={selectPlaceholder}
            options={toSelectOptions(degrees)}
            value={values.degree}
            onChange={(event) => updateField("degree", event.target.value)}
          />
          <TextField
            type="date"
            label={t("dashboard.certificateForm.fields.issueDate")}
            icon={CalendarDays}
            error={getError("issueDate")}
            value={values.issueDate}
            onChange={(event) => updateField("issueDate", event.target.value)}
          />
          {/* Imtihon ma'lumotlari faqat yaratishda yuboriladi (CertificateUpdate sxemasida yo'q) */}
          {mode === "create" && (
            <>
              <TextField
                type="date"
                label={t("dashboard.certificateForm.fields.examDate")}
                icon={CalendarDays}
                value={values.examDate}
                onChange={(event) =>
                  updateField("examDate", event.target.value)
                }
              />
              <TextField
                label={t("dashboard.certificateForm.fields.examPlace")}
                icon={MapPin}
                placeholder={t(
                  "dashboard.certificateForm.fields.examPlacePlaceholder",
                )}
                maxLength={255}
                value={values.examPlace}
                onChange={(event) =>
                  updateField("examPlace", event.target.value)
                }
              />
            </>
          )}
        </div>
      </FormSection>

      {extraFields.length > 0 && (
        <FormSection title={t("dashboard.certificateForm.sections.extra")}>
          <ExtraFields
            fields={extraFields}
            values={values.extra}
            errors={errors}
            onChange={updateExtraField}
          />
        </FormSection>
      )}

      <FormSection title={t("dashboard.certificateForm.sections.file")}>
        <FileField
          label={t("dashboard.certificateForm.fields.file")}
          chooseLabel={t("dashboard.certificateForm.fields.fileChoose")}
          removeLabel={t("dashboard.certificateForm.fields.fileRemove")}
          hint={
            mode === "edit"
              ? t("dashboard.certificateForm.fields.fileKeepHint")
              : t("dashboard.certificateForm.fields.fileHint")
          }
          error={getError("file")}
          accept={ACCEPTED_FILE_TYPES}
          file={values.file}
          onChange={(file) => updateField("file", file)}
        />
        {currentFileUrl && !values.file && (
          <p className="text-body mt-4 px-1 text-[13.5px]">
            {t("dashboard.certificateForm.fields.fileCurrent")}:{" "}
            <a
              href={currentFileUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              {t("dashboard.certificates.detail.openFile")}
            </a>
          </p>
        )}
      </FormSection>

      {apiError && <FormAlert>{apiError}</FormAlert>}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          to={cancelTo}
          className={buttonVariants({ variant: "soft", size: "lg" })}
        >
          {t("dashboard.certificateForm.cancel")}
        </Link>
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          disabled={isPending}
          className="disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitLabel}
          {isPending ? (
            <LoaderCircle
              className="size-5 shrink-0 animate-spin"
              strokeWidth={2.4}
              aria-hidden="true"
            />
          ) : (
            <ArrowRight
              className="size-5 shrink-0"
              strokeWidth={2.4}
              aria-hidden="true"
            />
          )}
        </Button>
      </div>
    </form>
  );
}
