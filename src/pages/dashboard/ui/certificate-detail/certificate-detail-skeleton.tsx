export function CertificateDetailSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mt-8 grid animate-pulse items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] xl:gap-8"
    >
      <div className="bg-surface shadow-card border-line rounded-3xl border p-8">
        <div className="bg-surface-muted h-6 w-1/3 rounded" />
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="bg-surface-muted h-16 rounded-xl" />
          ))}
        </div>
      </div>
      <div className="bg-surface shadow-card border-line space-y-5 rounded-3xl border p-7">
        <div className="bg-surface-muted h-6 w-1/2 rounded" />
        {[0, 1, 2].map((index) => (
          <div key={index} className="bg-surface-muted h-14 rounded-xl" />
        ))}
      </div>
    </div>
  )
}
