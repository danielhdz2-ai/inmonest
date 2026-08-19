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
      size="lg"
      className="ring-1 ring-gold-500/35 shadow-2xl shadow-black/25"
    >
      <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-gold-400 mb-3">
        Comprar con seguridad
      </p>
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
        ¿Vas a comprar este piso?
      </h3>
      <p className="text-white/85 text-base sm:text-lg mb-6 leading-relaxed max-w-2xl">
        Revisamos toda la documentación antes de escriturar: nota simple, cargas, deudas de comunidad y
        certificados obligatorios en {ciudadLabel}.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Link
          href={href}
          className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-gold-500 text-white font-bold hover:bg-gold-400 transition-colors text-base shadow-lg shadow-gold-900/30"
        >
          Revisar documentación — {precioDue} →
        </Link>
        <Link
          href={getAsesoriaCompraHref(slug)}
          className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border-2 border-white/35 text-white font-semibold hover:bg-white/10 transition-colors text-base"
        >
          Asesoría completa hasta escritura ({precioAsesoria})
        </Link>
      </div>
    </GestoriaImageBanner>
  )
}
