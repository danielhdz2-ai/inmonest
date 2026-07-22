'use client'

import { gtmPush } from '@/components/GTMProvider'

type Props = {
  href: string
  children: React.ReactNode
  className?: string
  event: 'click_phone' | 'click_whatsapp'
  city?: string
  target?: string
  rel?: string
}

export default function TrackedContactLink({
  href,
  children,
  className,
  event,
  city,
  target,
  rel,
}: Props) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={() => {
        gtmPush({ event, city: city ?? null, link_url: href })
      }}
    >
      {children}
    </a>
  )
}
