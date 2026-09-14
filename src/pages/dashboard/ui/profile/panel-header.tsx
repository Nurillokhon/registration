import type { ReactNode } from 'react'

type PanelHeaderProps = {
  title: string
  subtitle: string
  /** Sarlavhaning o'ng tomonidagi element (masalan, "Himoyalangan reestr" belgisi). */
  aside?: ReactNode
}

/** Profil tab panellarining umumiy sarlavhasi — pastida ajratuvchi chiziq bilan. */
export function PanelHeader({ title, subtitle, aside }: PanelHeaderProps) {
  return (
    <header className="border-line flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h2 className="text-heading text-[20px] font-bold tracking-tight sm:text-[22px]">{title}</h2>
        <p className="text-body mt-1.5 text-[14px]">{subtitle}</p>
      </div>
      {aside}
    </header>
  )
}
