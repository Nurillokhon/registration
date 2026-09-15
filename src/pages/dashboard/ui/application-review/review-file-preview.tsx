/** @format */

import {
  Download,
  ExternalLink,
  FileX,
  RefreshCw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCertificateFile } from "@/entities/certificate";
import { Button } from "@/shared/ui";

const MIN_ZOOM = 50;
const MAX_ZOOM = 200;
const ZOOM_STEP = 25;

const ICON_BUTTON_CLASS_NAME =
  "text-body hover:bg-surface-muted hover:text-heading flex size-9 items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-40";

const VIEWER_CLASS_NAME = "bg-surface-muted block h-[70vh] min-h-96 w-full";

function getPathname(url: string) {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

function getFileName(url: string) {
  return decodeURIComponent(getPathname(url).split("/").pop() || "certificate");
}

type FileKind = "pdf" | "image" | "other";

// Tur server javobidagi Content-Type'dan olinadi; u umumiy bo'lsa (octet-stream) — kengaytmadan
function getFileKind(file: Blob | undefined, url: string): FileKind {
  const type = file?.type ?? "";
  if (type === "application/pdf") return "pdf";
  if (type.startsWith("image/")) return "image";

  const pathname = getPathname(url).toLowerCase();
  if (pathname.endsWith(".pdf")) return "pdf";
  if (/\.(png|jpe?g|webp|gif)$/.test(pathname)) return "image";
  return "other";
}

/**
 * Blob uchun `blob:` manzil; blob almashganda yoki komponent yopilganda xotira bo'shatiladi.
 * StrictMode dev'da effektni uzib, darhol qayta ulaydi — shuning uchun bekor qilish keyingi
 * tick'ga qoldiriladi va xuddi shu manzil bilan qayta ulanganda to'xtatiladi.
 */
function useObjectUrl(blob: Blob | undefined) {
  const objectUrl = useMemo(
    () => (blob ? URL.createObjectURL(blob) : null),
    [blob],
  );
  const pendingRevokeRef = useRef<{ url: string; timer: number } | null>(null);

  useEffect(() => {
    if (!objectUrl) return;

    const pending = pendingRevokeRef.current;
    if (pending?.url === objectUrl) {
      window.clearTimeout(pending.timer);
      pendingRevokeRef.current = null;
    }

    return () => {
      pendingRevokeRef.current = {
        url: objectUrl,
        timer: window.setTimeout(() => URL.revokeObjectURL(objectUrl), 0),
      };
    };
  }, [objectUrl]);

  return objectUrl;
}

/**
 * Sertifikat fayli: PDF brauzerning o'z ko'ruvchisida (sahifalar va masshtab u yerda),
 * rasm esa masshtab tugmalari bilan ko'rsatiladi.
 * Fayl server manzili bilan emas, blob orqali ko'rsatiladi — backend `X-Frame-Options: DENY`
 * qo'ygani uchun manzil to'g'ridan-to'g'ri <iframe>'ga berilsa brauzer uni bloklaydi.
 * Boshqa arizaga o'tilganda masshtab tozalanishi uchun chaqiruvchi `key` beradi.
 */
export function ReviewFilePreview({ fileUrl }: { fileUrl: string | null }) {
  const { t } = useTranslation();
  const [zoom, setZoom] = useState(100);
  const { file, isLoading, isError, refetch } = useCertificateFile(fileUrl);
  const objectUrl = useObjectUrl(file);

  const renderViewer = (url: string, kind: FileKind) => {
    if (kind === "pdf") {
      return (
        <iframe
          title={t("dashboard.review.file.title")}
          src={url}
          className={VIEWER_CLASS_NAME}
        />
      );
    }

    if (kind === "image") {
      return (
        <div className="bg-surface-muted h-[70vh] min-h-96 overflow-auto p-3">
          <img
            src={url}
            alt={t("dashboard.review.file.title")}
            style={{ width: `${zoom}%` }}
            className="mx-auto block max-w-none"
          />
        </div>
      );
    }

    return (
      <p className="text-body px-4 py-12 text-center text-[14px]">
        {t("dashboard.review.file.unsupported")}
      </p>
    );
  };

  const renderBody = () => {
    if (!fileUrl) {
      return (
        <div className="text-body mt-5 flex flex-col items-center rounded-xl py-12 text-center">
          <FileX
            className="text-neutral size-10"
            strokeWidth={1.6}
            aria-hidden="true"
          />
          <p className="mt-3 text-[14px]">{t("dashboard.review.file.empty")}</p>
        </div>
      );
    }

    if (isLoading || (file && !objectUrl)) {
      return (
        <div
          aria-hidden="true"
          className="bg-surface-muted mt-5 h-[70vh] min-h-96 animate-pulse rounded-xl"
        />
      );
    }

    if (isError || !objectUrl) {
      return (
        <div
          role="alert"
          className="border-line mt-5 flex flex-col items-center rounded-xl border px-6 py-12 text-center"
        >
          <FileX
            className="text-danger size-10"
            strokeWidth={1.6}
            aria-hidden="true"
          />
          <p className="text-heading mt-3 text-[14px] font-semibold">
            {t("dashboard.review.file.loadError")}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Button
              type="button"
              variant="soft"
              size="sm"
              onClick={() => refetch()}
            >
              <RefreshCw
                className="size-4 shrink-0"
                strokeWidth={2.4}
                aria-hidden="true"
              />
              {t("dashboard.review.file.retry")}
            </Button>
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:bg-primary-soft inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
            >
              <ExternalLink
                className="size-4 shrink-0"
                strokeWidth={2.4}
                aria-hidden="true"
              />
              {t("dashboard.review.file.openNewTab")}
            </a>
          </div>
        </div>
      );
    }

    const kind = getFileKind(file, fileUrl);

    return (
      <div className="border-line mt-5 overflow-hidden rounded-xl border">
        <div className="border-line flex items-center justify-between gap-2 border-b px-2 py-1.5">
          {kind === "image" ? (
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label={t("dashboard.review.file.zoomOut")}
                disabled={zoom <= MIN_ZOOM}
                onClick={() =>
                  setZoom((value) => Math.max(MIN_ZOOM, value - ZOOM_STEP))
                }
                className={ICON_BUTTON_CLASS_NAME}
              >
                <ZoomOut
                  className="size-4.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
              <span
                className="text-heading w-12 text-center text-[13px] tabular-nums"
                aria-live="polite"
              >
                {zoom}%
              </span>
              <button
                type="button"
                aria-label={t("dashboard.review.file.zoomIn")}
                disabled={zoom >= MAX_ZOOM}
                onClick={() =>
                  setZoom((value) => Math.min(MAX_ZOOM, value + ZOOM_STEP))
                }
                className={ICON_BUTTON_CLASS_NAME}
              >
                <ZoomIn
                  className="size-4.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
            </div>
          ) : (
            <span className="text-body truncate px-2 text-[13px]">
              {getFileName(fileUrl)}
            </span>
          )}
          <a
            href={objectUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={t("dashboard.review.file.openNewTab")}
            className={ICON_BUTTON_CLASS_NAME}
          >
            <ExternalLink
              className="size-4.5"
              strokeWidth={2}
              aria-hidden="true"
            />
          </a>
        </div>

        {renderViewer(objectUrl, kind)}
      </div>
    );
  };

  return (
    <section className="bg-surface shadow-card border-line rounded-2xl border p-5 sm:p-6">
      <div className="border-line flex flex-wrap items-center justify-between gap-3 border-b pb-4">
        <h2 className="text-heading text-[18px] font-bold tracking-tight">
          {t("dashboard.review.file.title")}
        </h2>
        {fileUrl && objectUrl && (
          // blob: manzil ilovaning o'z manbasi — download atributi ishlaydi va fayl nomi saqlanadi
          <a
            href={objectUrl}
            download={getFileName(fileUrl)}
            className="border-primary/40 text-primary hover:bg-primary-soft inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors"
          >
            <Download
              className="size-4 shrink-0"
              strokeWidth={2.4}
              aria-hidden="true"
            />
            {t("dashboard.review.file.download")}
          </a>
        )}
      </div>

      {renderBody()}
    </section>
  );
}
