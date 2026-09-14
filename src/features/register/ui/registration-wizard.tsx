/** @format */

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Stepper } from "@/shared/ui";
import {
  EMPTY_ACCOUNT_DATA,
  EMPTY_PERSONAL_DATA,
  type AccountData,
  type PersonalData,
} from "../model/registration";
import { AccountStep } from "./account-step";
import { PersonalStep } from "./personal-step";
import { RegistrationSuccess } from "./registration-success";
import { VerifyStep } from "./verify-step";

// Faqat kalitlar modul darajasida — matn til o'zgarganda yangilanishi uchun render paytida olinadi.
const STEP_LABEL_KEYS = [
  "register.steps.personal",
  "register.steps.account",
  "register.steps.verify",
] as const;

/**
 * 3 bosqichli ro'yxatdan o'tish. Har bir bosqich o'z so'rovini yuboradi va
 * faqat server tasdiqlagandan keyin keyingisiga o'tadi:
 * shaxsni tasdiqlash → foydalanuvchi yaratish va SMS → SMS kodini tasdiqlash.
 */
export function RegistrationWizard() {
  const { t } = useTranslation();
  const [stepIndex, setStepIndex] = useState(0);
  // Bosqichlar ma'lumoti shu yerda saqlanadi — ortga qaytilganda forma qayta to'ldiriladi
  const [personalData, setPersonalData] =
    useState<PersonalData>(EMPTY_PERSONAL_DATA);
  const [accountData, setAccountData] =
    useState<AccountData>(EMPTY_ACCOUNT_DATA);

  const goToStep = (nextIndex: number) => {
    setStepIndex(nextIndex);
    // Mobil'da tugma forma pastida — yangi bosqich tepadan boshlanib ko'rinsin
    window.scrollTo({ top: 0 });
  };

  const isComplete = stepIndex === STEP_LABEL_KEYS.length;

  return (
    <>
      <Stepper
        label={t("register.stepperLabel")}
        steps={STEP_LABEL_KEYS.map((key) => t(key))}
        currentStep={stepIndex}
      />

      <div className="mt-10 sm:mt-12">
        {stepIndex === 0 && (
          <PersonalStep
            defaultValues={personalData}
            onSubmit={(values) => {
              setPersonalData(values);
              goToStep(1);
            }}
          />
        )}
        {stepIndex === 1 && (
          <AccountStep
            defaultValues={accountData}
            personalData={personalData}
            onBack={(values) => {
              setAccountData(values);
              goToStep(0);
            }}
            onSubmit={(values) => {
              setAccountData(values);
              goToStep(2);
            }}
          />
        )}
        {stepIndex === 2 && (
          <VerifyStep
            phone={accountData.phone}
            onBack={() => goToStep(1)}
            onSubmit={() => goToStep(3)}
          />
        )}
        {isComplete && <RegistrationSuccess />}
      </div>
    </>
  );
}
