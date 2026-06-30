import Link from 'next/link'
import {
  getAsesoriaCompraHref,
  getDueDiligenceHref,
  normalizeCiudadSlug,
} from '@/lib/gestoria-compra-cross-sell'

type ComprarPisoDueDiligenceBannerProps = {
  city: string | null | undefined
}

export default function ComprarPisoDueDiligenceBanner({ city }: ComprarPisoDueDiligenceBannerProps) {
  const slug = normalizeCiudadSlug(city)
  const href = getDueDiligenceHref(slug)
  const ciudadLabel = city?.trim() || 'tu ciudad'

  return (
    <div className="bg-gradient-to-r from-slate-900 to-[#1a2f1c] rounded-2xl p-6 sm:p-8 text-white shadow-lg border border-[#c9962a]/20">
      <div className="flex items-start gap-4">
        <span className="text-4xl" aria-hidden>
          🔍
        </span>
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-bold mb-2">¿Vas a comprar este piso?</h3>
          <p className="text-white/80 text-sm sm:text-base mb-4">
            Revisamos toda la documentación antes de escriturar: nota simple, cargas, deudas de
            comunidad y certificados obligatorios en {ciudadLabel}.{' '}
            <strong className="text-[#f4c94a]">Desde 350€.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={href}
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#c9962a] text-white font-semibold hover:bg-[#a87a20] transition-colors text-sm shadow-lg"
            >
              Revisar documentación — 350€ →
            </Link>
            <Link
              href={getAsesoriaCompraHref(slug)}
              className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition-colors text-sm"
            >
              Asesoría completa hasta escritura (687€)
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
