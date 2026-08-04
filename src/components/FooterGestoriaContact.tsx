'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GESTORIA_PHONE_DISPLAY, GESTORIA_PHONE_WA, shouldShowGestoriaPhone } from '@/lib/gestoria-contact'

export default function FooterGestoriaContact() {
  const pathname = usePathname()

  if (!shouldShowGestoriaPhone(pathname)) {
    return (
      <Link href="/gestoria" className="hover:text-gold-300 transition-colors">
        Gestoría online
      </Link>
    )
  }

  return (
    <a
      href={`https://wa.me/${GESTORIA_PHONE_WA}?text=Hola%20Inmonest,%20necesito%20información`}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-[#25d366] transition-colors"
    >
      WhatsApp: {GESTORIA_PHONE_DISPLAY}
    </a>
  )
}
