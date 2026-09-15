import type { ReactNode } from 'react'

/** Formaning sarlavhali kartochka bo'limi. */
export function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-surface shadow-card border-line rounded-3xl border p-5 sm:p-8">
      <h2 className="text-heading border-line border-b pb-5 text-[18px] font-bold tracking-tight sm:text-[20px]">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}
