import { mobileDockSpacerClass, mobileNavSpacerClass } from '@/lib/mobile-app-layout'
import { cn } from '@/lib/cn'

type Props = {
  /** Página con barra fija Llamar/WhatsApp encima del nav */
  stickyDock?: boolean
  className?: string
}

export function MobileDockSpacer({ stickyDock = true, className }: Props) {
  return (
    <div
      aria-hidden
      className={cn(stickyDock ? mobileDockSpacerClass : mobileNavSpacerClass, className)}
    />
  )
}
