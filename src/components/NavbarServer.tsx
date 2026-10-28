import SiteHeader from '@/components/SiteHeader'

/** Auth se resuelve en cliente para no bloquear el render de cada página. */
export default function Navbar() {
  return <SiteHeader />
}
