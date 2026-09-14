/** @format */

import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { ROUTES } from "@/shared/config";

/** Breadcrumb, sarlavha, tasdiqlanganlik holati va ma'lumotlarni qayta yuklash tugmasi. */
export function ProfilePageHeader() {
  const { t } = useTranslation();

  return (
    <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <nav aria-label={t("dashboard.profile.breadcrumb.label")}>
          <ol className="flex flex-wrap items-center gap-2 text-[13.5px]">
            <li>
              <Link
                to={ROUTES.dashboard}
                className="text-neutral hover:text-heading transition-colors"
              >
                {t("dashboard.profile.breadcrumb.home")}
              </Link>
            </li>
            <li aria-hidden="true" className="text-neutral/60">
              /
            </li>
            <li aria-current="page" className="text-primary font-semibold">
              {t("dashboard.profile.breadcrumb.current")}
            </li>
          </ol>
        </nav>
        <h1 className="text-heading mt-2 text-[26px] leading-tight font-extrabold tracking-tight sm:text-[32px]">
          {t("dashboard.profile.title")}
        </h1>
        <p className="text-body mt-1.5 text-[14px] sm:text-[15px]">
          {t("dashboard.profile.subtitle")}
        </p>
      </div>

      {/* {hasProfile && (
        <div className="flex flex-wrap items-center gap-3">
          <span className="bg-primary-soft text-primary ring-primary/25 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-semibold ring-1">
            <span className="bg-primary size-2 rounded-full" aria-hidden="true" />
            {t('dashboard.profile.status')}
          </span>
          <Button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="disabled:cursor-not-allowed disabled:opacity-70"
          >
            <RefreshCw
              className={cn('size-4 shrink-0', isRefreshing && 'animate-spin')}
              strokeWidth={2.4}
              aria-hidden="true"
            />
            {t('dashboard.profile.refresh')}
          </Button>
        </div>
      )} */}
    </header>
  );
}
