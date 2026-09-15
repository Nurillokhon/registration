/** @format */

import {
  ArrowRight,
  CircleCheck,
  CircleX,
  ClipboardList,
  Hourglass,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { useExpertStatistics, type ExpertStatistics } from "@/entities/expert";
import { useCurrentUser } from "@/entities/user";
import { ROUTES } from "@/shared/config";
import { cn } from "@/shared/lib/cn";
import { buttonVariants } from "@/shared/ui";
import { DashboardPageHeader } from "../dashboard-page-header";
import { TagList } from "../experts/experts-table";
import { LoadErrorState } from "../load-error-state";

type StatKey =
  | "total_reviewed"
  | "approved_certificates"
  | "rejected_certificates"
  | "problem_certificates";

const STATS = [
  {
    key: "total_reviewed",
    labelKey: "dashboard.expertDashboard.stats.reviewed",
    icon: ClipboardList,
    toneClassName: "bg-secondary/10 text-secondary",
    showShare: false,
  },
  {
    key: "approved_certificates",
    labelKey: "dashboard.expertDashboard.stats.approved",
    icon: CircleCheck,
    toneClassName: "bg-primary-soft text-primary",
    showShare: true,
  },
  {
    key: "rejected_certificates",
    labelKey: "dashboard.expertDashboard.stats.rejected",
    icon: CircleX,
    toneClassName: "bg-danger/10 text-danger",
    showShare: true,
  },
  {
    key: "problem_certificates",
    labelKey: "dashboard.expertDashboard.stats.problem",
    icon: TriangleAlert,
    toneClassName: "bg-gold/15 text-gold",
    showShare: true,
  },
] as const satisfies readonly {
  key: StatKey;
  labelKey: string;
  icon: LucideIcon;
  toneClassName: string;
  showShare: boolean;
}[];

// Qiymatlar son bo'lib keladi, lekin bo'sh/null kelsa ham UI 0 ko'rsatadi
function toCount(value: unknown) {
  return Number(value) || 0;
}

// Pending arizalarni ochish — ro'yxat sahifasi ?status= orqali "Kutilayotgan" tabini tanlaydi
const PENDING_APPLICATIONS_PATH = `${ROUTES.applications}?status=new`;

function ExpertDashboardSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse space-y-6">
      <div className="bg-surface-muted h-36 rounded-3xl" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="bg-surface-muted h-28 rounded-2xl" />
        ))}
      </div>
      <div className="bg-surface-muted h-40 rounded-3xl" />
    </div>
  );
}

function PendingCard({ pending }: { pending: number }) {
  const { t } = useTranslation();
  const hasPending = pending > 0;

  return (
    <section className="bg-surface shadow-card border-line flex flex-col gap-5 rounded-3xl border p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div className="flex min-w-0 items-center gap-4">
        <span className="bg-secondary/10 text-secondary flex size-14 shrink-0 items-center justify-center rounded-2xl">
          <Hourglass className="size-7" strokeWidth={2} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h2 className="text-body text-[14px] font-semibold">
            {t("dashboard.expertDashboard.pending.title")}
          </h2>
          <p className="text-heading text-[34px] leading-tight font-extrabold tabular-nums">
            {pending}
          </p>
          <p className="text-body text-[13.5px]">
            {hasPending
              ? t("dashboard.expertDashboard.pending.text")
              : t("dashboard.expertDashboard.pending.empty")}
          </p>
        </div>
      </div>

      <Link
        to={hasPending ? PENDING_APPLICATIONS_PATH : ROUTES.applications}
        className={buttonVariants({ className: "shrink-0" })}
      >
        {hasPending
          ? t("dashboard.expertDashboard.pending.start")
          : t("dashboard.expertDashboard.pending.viewAll")}
        <ArrowRight
          className="size-4 shrink-0"
          strokeWidth={2.4}
          aria-hidden="true"
        />
      </Link>
    </section>
  );
}

function StatCards({ stats }: { stats: ExpertStatistics }) {
  const { t } = useTranslation();
  const reviewed = toCount(stats.total_reviewed);

  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {STATS.map(({ key, labelKey, icon: Icon, toneClassName, showShare }) => {
        const value = toCount(stats[key]);

        return (
          <li
            key={key}
            className="bg-surface shadow-card border-line flex items-center gap-4 rounded-2xl border p-5"
          >
            <span
              className={cn(
                "flex size-12 shrink-0 items-center justify-center rounded-xl",
                toneClassName,
              )}
            >
              <Icon className="size-5.5" strokeWidth={2} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-body text-[13.5px]">{t(labelKey)}</p>
              <p className="text-heading mt-0.5 text-[26px] leading-tight font-extrabold tabular-nums">
                {value}
              </p>
              {showShare && reviewed > 0 && (
                <p className="text-neutral text-[12.5px] tabular-nums">
                  {t("dashboard.expertDashboard.stats.share", {
                    percent: Math.round((value / reviewed) * 100),
                  })}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function DirectionsCard({ stats }: { stats: ExpertStatistics }) {
  const { t } = useTranslation();

  return (
    <section className="bg-surface shadow-card border-line rounded-3xl border p-6 sm:p-8">
      <h2 className="text-heading text-[18px] font-bold tracking-tight">
        {t("dashboard.expertDashboard.directions.title")}
      </h2>
      <p className="text-body mt-1 text-[14px]">
        {t("dashboard.expertDashboard.directions.subtitle")}
      </p>
      <dl className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <dt className="text-body text-[13px] font-semibold">
            {t("dashboard.expertDashboard.directions.languages")}
          </dt>
          <dd className="mt-2">
            <TagList items={stats.language ?? []} />
          </dd>
        </div>
        <div>
          <dt className="text-body text-[13px] font-semibold">
            {t("dashboard.expertDashboard.directions.types")}
          </dt>
          <dd className="mt-2">
            <TagList items={stats.type ?? []} />
          </dd>
        </div>
      </dl>
    </section>
  );
}

/** Ekspert bosh sahifasi: GET /main/expert-statistics/ — ekspertga faqat o'z ko'rsatkichlari keladi. */
export function ExpertDashboard() {
  const { t } = useTranslation();
  const { user } = useCurrentUser();
  const { experts, isLoading, isError, refetch } = useExpertStatistics();
  const stats = experts[0];

  const renderContent = () => {
    if (isLoading) return <ExpertDashboardSkeleton />;

    if (isError && !stats) {
      return (
        <LoadErrorState
          title={t("dashboard.expertDashboard.loadError.title")}
          text={t("dashboard.expertDashboard.loadError.text")}
          retry={{
            label: t("dashboard.expertDashboard.loadError.retry"),
            onRetry: () => refetch(),
          }}
        />
      );
    }

    if (!stats) {
      return (
        <LoadErrorState
          title={t("dashboard.expertDashboard.empty.title")}
          text={t("dashboard.expertDashboard.empty.text")}
        />
      );
    }

    return (
      <div className="space-y-6">
        <PendingCard pending={toCount(stats.pending_reviews)} />
        <StatCards stats={stats} />
        <DirectionsCard stats={stats} />
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl">
      <DashboardPageHeader
        title={t("dashboard.pages.index.title")}
        subtitle={
          user?.full_name
            ? t("dashboard.expertDashboard.greeting", { name: user.full_name })
            : t("dashboard.expertDashboard.subtitle")
        }
      />
      <div className="mt-8">{renderContent()}</div>
    </div>
  );
}
