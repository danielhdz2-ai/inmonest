'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const ChatWidget = dynamic(() => import('@/components/ChatWidget'), { ssr: false })

const HIDE_CHAT_PREFIXES = ['/login', '/registro', '/recuperar-contrasena', '/actualizar-contrasena', '/mi-cuenta', '/auth']

export default function LazyChatWidget() {
  const pathname = usePathname() || ''
  const hidden = HIDE_CHAT_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  )
  if (hidden) return null
  return <ChatWidget />
}
