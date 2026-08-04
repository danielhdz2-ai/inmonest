'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

/**
 * Rutas de "plataforma" (app tipo dashboard, pantalla completa, con su propia
 * navegación) donde el footer público de la web no debe aparecer, para que
 * no haya scroll hacia un pie de página ajeno al panel.
 */
const PLATFORM_PREFIXES = ['/admin', '/mi-cuenta']

export default function ConditionalFooter() {
  const pathname = usePathname() || ''
  const isPlatform = PLATFORM_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
  if (isPlatform) return null
  return (
    <div className="max-lg:hidden">
      <Footer />
    </div>
  )
}
