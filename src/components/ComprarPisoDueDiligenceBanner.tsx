import Link from 'next/link'
import { GestoriaImageBanner } from '@/components/ui/GestoriaImageBanner'
import {
  getAsesoriaCompraHref,
  getDueDiligenceHref,
  normalizeCiudadSlug,
} from '@/lib/gestoria-compra-cross-sell'
import { precioLabel } from '@/lib/gestoria-precios-ui'

type ComprarPisoDueDiligenceBannerProps = {
  city: string | null | undefined
}

export default function ComprarPisoDueDiligenceBanner({ city }: ComprarPisoDueDiligenceBannerProps) {
  const slug = normalizeCiudadSlug(city)
  const href = getDueDiligenceHref(slug)
  const ciudadLabel = city?.trim() || 'tu ciudad'
  const precioDue = precioLabel('pack-due-diligence-precompra')
  const precioAsesoria = precioLabel('compra-completa-reserva-escritura')

  return (
    <GestoriaImageBanner
      imageSrc="/gestoria5.jpg"
      imageAlt="Due diligence pre-compra — revisión documental del inmueble"
      imagePosition="right"
      size="sm"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">Comprar con seguridad</p>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">¿Vas a comprar este piso?</h3>
      <p className="text-white/80 text-sm sm:text-base mb-5 leading-relaxed">
        Revisamos toda la documentación antes de escriturar: nota simple, cargas, deudas de comunidad y
        certificados obligatorios en {ciudadLabel}.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={href}
          className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-gold-500 text-white font-semibold hover:bg-gold-600 transition-colors text-sm"
        >
          Revisar documentación — {precioDue} →
        </Link>
        <Link
          href={getAsesoriaCompraHref(slug)}
          className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition-colors text-sm"
        >
          Asesoría completa hasta escritura ({precioAsesoria})
        </Link>
      </div>
    </GestoriaImageBanner>
  )
}
