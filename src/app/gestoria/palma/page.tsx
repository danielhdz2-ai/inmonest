import { permanentRedirect } from 'next/navigation'

/** Hub canónico: /gestoria/mallorca (evita duplicado Palma/Mallorca en SEO). */
export default function GestoriaPalmaRedirect() {
  permanentRedirect('/gestoria/mallorca')
}
