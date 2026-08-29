import { permanentRedirect } from 'next/navigation'
import { notFound } from 'next/navigation'
import {
  AGENCIAS_GESTORIA_CIUDAD_SLUGS,
  gestoriaAgenciasCiudadPath,
  isAgenciaGestoriaCiudadSlug,
} from '@/lib/agencias-gestoria-ciudades'

type Props = {
  params: Promise<{ ciudad: string }>
}

export function generateStaticParams() {
  return AGENCIAS_GESTORIA_CIUDAD_SLUGS.map((ciudad) => ({ ciudad }))
}

/** Redirige /agencias/gestoria/{ciudad} → /gestoria/{ciudad}/agencias (301 vía seo-redirects + fallback) */
export default async function AgenciasGestoriaCiudadRedirect({ params }: Props) {
  const { ciudad: slug } = await params
  if (!isAgenciaGestoriaCiudadSlug(slug)) notFound()
  permanentRedirect(gestoriaAgenciasCiudadPath(slug))
}
