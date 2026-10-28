import Navbar from '@/components/Navbar'
import InmonestNormativaBannerCarousel from '@/components/InmonestNormativaBannerCarousel'

type SiteHeaderProps = {
  isLoggedIn?: boolean
}

/** Navbar + carrusel normativo (sticky en conjunto). */
export default function SiteHeader({ isLoggedIn }: SiteHeaderProps) {
  return (
    <div className="sticky top-0 z-50">
      <Navbar isLoggedIn={isLoggedIn} stickyShell={false} />
      <InmonestNormativaBannerCarousel />
    </div>
  )
}
