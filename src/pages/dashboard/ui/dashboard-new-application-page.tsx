/** @format */

import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ApplicationCreated,
  CreateCertificateForm,
  type CertificateCreateResponse,
} from "@/features/certificate-form";
import { ROUTES } from "@/shared/config";
import { DashboardPageHeader } from "./dashboard-page-header";

export function DashboardNewApplicationPage() {
  const { t } = useTranslation();
  const [result, setResult] = useState<CertificateCreateResponse | null>(null);

  const handleCreated = (createdResult: CertificateCreateResponse) => {
    setResult(createdResult);
    // Forma uzun — natija paneli sahifa tepasida ko'rinsin
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <DashboardPageHeader
        title={t("dashboard.pages.newApplication.title")}
        subtitle={result ? undefined : t("dashboard.certificateForm.subtitle")}
        back={{
          to: ROUTES.certificates,
          label: t("dashboard.certificates.detail.back"),
        }}
      />
      <div className="mt-8">
        {result ? (
          <ApplicationCreated result={result} />
        ) : (
          <CreateCertificateForm onCreated={handleCreated} />
        )}
      </div>
    </div>
  );
}
