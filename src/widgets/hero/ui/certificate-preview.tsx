import { useTranslation } from 'react-i18next'

/**
 * Hero uchun sertifikat vizuali. Rasm fayli o'rniga SVG —
 * har qanday ekran zichligida tiniq va alohida asset talab qilmaydi.
 */
export function CertificatePreview() {
  const { t } = useTranslation()

  return (
    <svg
      viewBox="0 0 480 320"
      className="block h-auto w-full rounded-xl"
      role="img"
      aria-label={t('hero.certificatePreview.ariaLabel')}
    >
      <defs>
        <linearGradient id="panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#272D38" />
          <stop offset="100%" stopColor="#12161D" />
        </linearGradient>
        <linearGradient id="seal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F2D98A" />
          <stop offset="45%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#8C6F12" />
        </linearGradient>
        <linearGradient id="lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#39414E" />
          <stop offset="100%" stopColor="#252B35" />
        </linearGradient>
      </defs>

      <rect width="480" height="320" rx="14" fill="url(#panel)" />

      <text
        x="240"
        y="42"
        textAnchor="middle"
        fill="#C9A227"
        fillOpacity="0.5"
        fontFamily="inherit"
        fontSize="13"
        fontWeight="700"
        letterSpacing="3.4"
      >
        CERTIFICATE VERIFICATION
      </text>

      {/* Noutbuk qopqog'i va ekrani */}
      <rect x="92" y="72" width="296" height="182" rx="7" fill="url(#lid)" />
      <rect x="104" y="84" width="272" height="158" rx="3" fill="#F7F9FB" />

      {/* Sertifikat varag'idagi matn */}
      <text
        x="240"
        y="106"
        textAnchor="middle"
        fill="#2B3341"
        fontFamily="inherit"
        fontSize="9"
        fontWeight="700"
        letterSpacing="1.5"
      >
        CERTIFICATE OF VERIFICATION
      </text>
      <rect x="148" y="116" width="184" height="3.5" rx="1.75" fill="#CBD5DF" />
      <rect x="168" y="126" width="144" height="3.5" rx="1.75" fill="#D8E0E8" />

      {/* Muhr yonidagi qisqa chiziqlar */}
      <rect x="118" y="162" width="44" height="3.5" rx="1.75" fill="#DCE3EA" />
      <rect x="318" y="162" width="44" height="3.5" rx="1.75" fill="#DCE3EA" />

      {/* Imzo satrlari */}
      <rect x="130" y="218" width="66" height="3" rx="1.5" fill="#B7C2CE" />
      <rect x="284" y="218" width="66" height="3" rx="1.5" fill="#B7C2CE" />
      <text x="163" y="232" textAnchor="middle" fill="#9AA7B6" fontFamily="inherit" fontSize="7">
        Issued
      </text>
      <text x="317" y="232" textAnchor="middle" fill="#9AA7B6" fontFamily="inherit" fontSize="7">
        Signed
      </text>

      {/* Noutbuk asosi */}
      <path d="M70 254h340l18 15a5 5 0 0 1-4 8H56a5 5 0 0 1-4-8z" fill="#AFB9C5" />
      <path d="M70 254h340l6 5H64z" fill="#8E99A6" />
      <rect x="212" y="264" width="56" height="4" rx="2" fill="#8E99A6" />

      {/* Oltin muhr */}
      <path d="M229 180l-9 34 20-9 20 9-9-34z" fill="#A57F12" />
      <circle cx="240" cy="164" r="31" fill="url(#seal)" />
      <circle cx="240" cy="164" r="24" fill="none" stroke="#FBEFC4" strokeOpacity="0.8" strokeWidth="1.5" />
      <path
        d="M230 164.5l7 7 13-14"
        fill="none"
        stroke="#FFF8E2"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
