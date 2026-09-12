/** Forma ortidagi dekorativ fon: yumshoq yorug'lik dog'lari va o'ngdagi qiya "hujjat" kartasi. */
export function AuthBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="bg-surface-muted absolute -top-32 -left-32 size-[520px] rounded-full opacity-70 blur-3xl" />

      {/* Qiya karta faqat keng ekranda — tor ekranda forma bilan ustma-ust tushadi */}
      <div className="from-line to-surface-shell absolute top-[20%] -right-44 hidden h-[540px] w-[340px] rotate-12 overflow-hidden rounded-[72px] bg-linear-to-br xl:block">
        {/* Nozik to'r naqshi — arxiv hujjati teksturasi */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_7px,var(--color-surface)_7px_8px),repeating-linear-gradient(90deg,transparent_0_7px,var(--color-surface)_7px_8px)] opacity-40" />
      </div>

      <div className="bg-surface-muted absolute -right-16 -bottom-16 size-[380px] rounded-[64px] opacity-80 blur-2xl" />
    </div>
  )
}
