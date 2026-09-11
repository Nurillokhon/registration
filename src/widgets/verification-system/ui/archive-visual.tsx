import { useTranslation } from 'react-i18next'

/**
 * Bo'limdagi ikki vizual. Stok surat o'rniga abstrakt SVG kompozitsiya —
 * raqamli arxiv va tasdiqlash jarayonini ifodalaydi.
 */
export function ArchiveVisual({ variant }: { variant: 'grid' | 'scan' }) {
  const { t } = useTranslation()
  const id = `av-${variant}`

  return (
    <svg
      viewBox="0 0 260 320"
      className="block h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={
        variant === 'grid'
          ? t('verificationSystem.archiveVisual.gridAriaLabel')
          : t('verificationSystem.archiveVisual.scanAriaLabel')
      }
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0E2B36" />
          <stop offset="55%" stopColor="#0C3F4C" />
          <stop offset="100%" stopColor="#062028" />
        </linearGradient>
        <linearGradient id={`${id}-glow`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5CE1E6" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#2196F3" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      <rect width="260" height="320" fill={`url(#${id}-bg)`} />

      {variant === 'grid' ? (
        <g>
          {[0, 1, 2].map((col) =>
            [0, 1, 2, 3].map((row) => (
              <g key={`${col}-${row}`} opacity={0.25 + ((col + row) % 3) * 0.28}>
                <rect
                  x={24 + col * 74}
                  y={30 + row * 72}
                  width="60"
                  height="56"
                  rx="6"
                  fill={`url(#${id}-glow)`}
                />
                <rect x={34 + col * 74} y={44 + row * 72} width="34" height="3" rx="1.5" fill="#DFF6FA" fillOpacity="0.7" />
                <rect x={34 + col * 74} y={53 + row * 72} width="24" height="3" rx="1.5" fill="#DFF6FA" fillOpacity="0.45" />
                <rect x={34 + col * 74} y={62 + row * 72} width="40" height="3" rx="1.5" fill="#DFF6FA" fillOpacity="0.3" />
              </g>
            )),
          )}
        </g>
      ) : (
        <g>
          <g opacity="0.18" stroke="#5CE1E6" strokeWidth="1">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <line key={i} x1="0" y1={20 + i * 42} x2="260" y2={20 + i * 42} />
            ))}
          </g>
          <rect x="56" y="72" width="148" height="176" rx="10" fill={`url(#${id}-glow)`} opacity="0.5" />
          <rect x="66" y="82" width="128" height="156" rx="7" fill="#04212A" fillOpacity="0.85" />
          {[104, 118, 132, 146].map((y, i) => (
            <rect
              key={y}
              x="82"
              y={y}
              width={i === 3 ? 60 : 96}
              height="4"
              rx="2"
              fill="#8FE7EE"
              fillOpacity={0.75 - i * 0.13}
            />
          ))}
          <circle cx="130" cy="192" r="24" fill="#5CE1E6" fillOpacity="0.16" />
          <circle cx="130" cy="192" r="24" fill="none" stroke="#5CE1E6" strokeWidth="1.5" />
          <path
            d="M120 192.5l7 7 13-14"
            fill="none"
            stroke="#7FF0F5"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="40" y="152" width="180" height="3" rx="1.5" fill="#7FF0F5" fillOpacity="0.9" />
        </g>
      )}
    </svg>
  )
}
