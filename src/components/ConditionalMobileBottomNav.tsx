'use client'

import { usePathname } from 'next/navigation'
import MobileBottomNav from './MobileBottomNav'

const HIDDEN_PREFIXES = ['/admin', '/mi-cuenta']

export default function ConditionalMobileBottomNav() {
  const pathname = usePathname() || ''
  const hidden = HIDDEN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
  if (hidden) return null
  return <MobileBottomNav />
}
