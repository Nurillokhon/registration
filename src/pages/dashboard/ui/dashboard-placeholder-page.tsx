type DashboardPlaceholderPageProps = {
  title: string
  note: string
}

/**
 * Hali mazmuni tayyor bo'lmagan dashboard sahifalari uchun umumiy skelet —
 * faqat sarlavha va qisqa "tez orada" eslatmasi. Bitta komponent 9 ta deyarli
 * bir xil sahifa faylini oldini oladi.
 */
export function DashboardPlaceholderPage({ title, note }: DashboardPlaceholderPageProps) {
  return (
    <div className="bg-surface shadow-card rounded-2xl p-6 sm:p-8">
      <h1 className="text-heading text-[22px] font-extrabold tracking-tight sm:text-[26px]">
        {title}
      </h1>
      <p className="text-body mt-2 text-[14px]">{note}</p>
    </div>
  )
}
