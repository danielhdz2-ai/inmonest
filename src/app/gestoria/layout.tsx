import { MobileDockSpacer } from '@/components/ui/MobileDockSpacer'

export default function GestoriaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="gestoria-mobile-shell min-h-screen">
      {children}
    </div>
  )
}
