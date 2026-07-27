'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function GestoriaPortalPublicar() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Publicar tu inmueble</h2>
        <p className="text-sm text-gray-500 mt-1">
          Opcional — si quieres alquilar o vender, publica sin comisiones en el portal Inmonest.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200 bg-white shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative min-h-[200px] md:min-h-full">
            <Image src="/interior2.jpg" alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d1a0f]/80 to-transparent md:hidden" />
          </div>
          <div className="p-6 sm:p-8 flex flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#c9962a]">Portal inmobiliario</p>
            <h3 className="text-xl font-bold text-gray-900 mt-2">2 anuncios gratis · Sin comisiones</h3>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Tu cuenta de gestoría también te permite publicar pisos entre particulares. Es independiente de tu
              expediente de contratos, pero todo con la misma cuenta.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              {['Publicación en minutos', 'Visibilidad en buscador Inmonest', 'Contacto directo sin agencias'].map(
                (item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-emerald-500">✓</span>
                    {item}
                  </li>
                ),
              )}
            </ul>
            <Link
              href="/publicar-anuncio"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#c9962a] hover:bg-[#b8841e] text-white text-sm font-bold px-6 py-3.5 min-h-[48px] touch-manipulation transition-colors"
            >
              Publicar anuncio gratis →
            </Link>
            <Link
              href="/mi-cuenta/anuncios"
              className="mt-2 text-center text-xs text-gray-400 hover:text-[#c9962a] py-2"
            >
              Ver mis anuncios publicados
            </Link>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm text-amber-900">
        <strong>Nota:</strong> Esta sección es opcional. Tu panel de gestoría y expediente de contratos funciona
        con total independencia del portal de pisos.
      </div>
    </div>
  )
}
