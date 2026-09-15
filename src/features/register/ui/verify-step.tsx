/** @format */

import { MailCheck } from "lucide-react";
import { useId, useState, type FormEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { getRoleHomeRoute, isUserRole, setStoredUser } from "@/entities/user";
import { getApiErrorMessage, setTokens } from "@/shared/api";
import { toApiPhone } from "@/shared/lib/phone";
import { FormAlert, FormHeader, InfoNote } from "@/shared/ui";
import { useSmsVerify } from "../api";
import { createEmptyCode } from "../model/registration";
import { validateCode, type ErrorKey } from "../model/validation";
import { CodeInput } from "./code-input";
import { BackButton, SubmitButton } from "./step-actions";
import { useNavigate } from "react-router";

type VerifyStepProps = {
  /** Kod yuborilgan telefon raqami ("+998 90 123 45 67" ko'rinishida) */
  phone: string;
  onSubmit: () => void;
  onBack: () => void;
};

export function VerifyStep({ phone, onBack }: VerifyStepProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { verifySms, isPending } = useSmsVerify();
  const errorId = useId();
  const [code, setCode] = useState(createEmptyCode);
  const [codeError, setCodeError] = useState<ErrorKey>();
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const nextError = validateCode(code);
    setCodeError(nextError);
    if (nextError) return;

    setApiError(null);
    try {
      const { access, refresh, user } = await verifySms({
        phone: toApiPhone(phone),
        code: code.join(""),
      });
      // Login bilan bir xil: ilovada bo'limi yo'q rol kelsa kirish to'xtatiladi
      if (!isUserRole(user.role)) {
        setApiError(t("register.errors.apiFallback"));
        return;
      }
      // Kod to'g'ri bo'lsa foydalanuvchi darhol tizimga kirgan hisoblanadi
      setTokens({ access, refresh });
      // Foydalanuvchi ham saqlanadi, shunda dashboard rolni profil so'rovi
      // kelguncha kutmasdan biladi.
      setStoredUser(user);
      // Rolga ruxsat berilgan sahifaga o'tiladi (candidate'da /dashboard yo'q)
      navigate(getRoleHomeRoute(user.role), { replace: true });
      // onSubmit()
    } catch (error) {
      // Backend qolgan urinishlar sonini xabarda qaytaradi
      // ("SMS kod noto'g'ri! Qolgan urinishlar: 4"), 429 esa — urinishlar tugadi
      setApiError(getApiErrorMessage(error, t("register.errors.apiFallback")));
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <FormHeader
        title={t("register.verify.title")}
        subtitle={t("register.verify.subtitle", { target: phone })}
      />

      <div className="mt-10">
        <CodeInput
          label={t("register.verify.codeLabel")}
          value={code}
          isInvalid={Boolean(codeError) || Boolean(apiError)}
          describedBy={codeError ? errorId : undefined}
          onChange={(nextCode) => {
            setCode(nextCode);
            setCodeError(undefined);
            setApiError(null);
          }}
        />
        {codeError && (
          <p
            id={errorId}
            className="text-danger mt-3 text-center text-[12px] font-medium"
          >
            {t(codeError)}
          </p>
        )}
        {apiError && <FormAlert className="mt-4">{apiError}</FormAlert>}
      </div>

      <div className="mt-10">
        <SubmitButton isPending={isPending}>
          {t("register.verify.submit")}
        </SubmitButton>
        <BackButton onClick={onBack} />
      </div>

      <InfoNote icon={MailCheck} className="mt-10 sm:mt-12">
        {t("register.verify.securityNote")}
      </InfoNote>
    </form>
  );
}
