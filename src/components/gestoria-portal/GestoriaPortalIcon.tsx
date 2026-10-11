'use client'

import type { GestoriaPortalIconKey } from '@/lib/gestoria-portal-types'

type Props = {
  name: GestoriaPortalIconKey
  className?: string
  size?: number
}

const stroke = 1.75

export default function GestoriaPortalIcon({ name, className = '', size = 20 }: Props) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className, 'aria-hidden': true as const }

  switch (name) {
    case 'panel':
      return (
        <svg {...p}>
          <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth={stroke} />
          <rect x="13" y="3" width="8" height="5" rx="1.5" stroke="currentColor" strokeWidth={stroke} />
          <rect x="13" y="10" width="8" height="11" rx="1.5" stroke="currentColor" strokeWidth={stroke} />
          <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth={stroke} />
        </svg>
      )
    case 'expediente':
      return (
        <svg {...p}>
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
          <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth={stroke} />
          <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
        </svg>
      )
    case 'documentos':
      return (
        <svg {...p}>
          <path d="M4 7a2 2 0 012-2h5l5 5v9a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" />
          <path d="M11 5v5h5" stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" />
        </svg>
      )
    case 'contratos':
      return (
        <svg {...p}>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" />
          <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
        </svg>
      )
    case 'inmueble':
      return (
        <svg {...p}>
          <path d="M3 10.5L12 4l9 6.5V20a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1v-9.5z" stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" />
        </svg>
      )
    case 'servicios':
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={stroke} />
          <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
        </svg>
      )
    case 'configuracion':
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={stroke} />
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
        </svg>
      )
    case 'upload':
      return (
        <svg {...p}>
          <path d="M12 16V4M12 4l-4 4M12 4l4 4" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
        </svg>
      )
    case 'workflow-pay':
      return (
        <svg {...p}>
          <rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" strokeWidth={stroke} />
          <path d="M2 10h20" stroke="currentColor" strokeWidth={stroke} />
        </svg>
      )
    case 'workflow-docs':
      return (
        <svg {...p}>
          <path d="M8 4h8l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h3z" stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" />
          <path d="M12 4v4h4" stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" />
        </svg>
      )
    case 'workflow-edit':
      return (
        <svg {...p}>
          <path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5z" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'workflow-done':
      return (
        <svg {...p}>
          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'more':
      return (
        <svg {...p}>
          <circle cx="6" cy="12" r="1.5" fill="currentColor" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <circle cx="18" cy="12" r="1.5" fill="currentColor" />
        </svg>
      )
    default:
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={stroke} />
        </svg>
      )
  }
}
