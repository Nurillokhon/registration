import { useTranslation } from 'react-i18next'

/** Sidebar tepasidagi brend bloki — SiteHeader'dagi "SERTIFIKAT" bilan bir xil qoida: tarjima qilinmaydi. */
export function SidebarBrand() {
  const { t } = useTranslation()

  return (
    <div className="px-1">
      <div className="flex items-center gap-2">
        <span className="text-heading text-lg font-extrabold tracking-tight">SERTIFIKAT</span>
        <span className="bg-primary-soft text-primary rounded-md px-1.5 py-0.5 text-[10px] font-extrabold tracking-wide">
          {t('dashboard.brand.badge')}
        </span>
      </div>
      <p className="text-neutral mt-1 text-[12px]">{t('dashboard.brand.subtitle')}</p>
    </div>
  )
}
