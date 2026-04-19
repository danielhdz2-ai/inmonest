import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'

export const metadata: Metadata = {
  title: 'Pago cancelado — Inmonest',
  robots: { index: false, follow: false },
}

const WA_PHONE = '34641008847'

export default async function GestoriaErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ service_key?: string; service_name?: string; price?: string }>
}) {
  const params      = await searchParams
  const serviceName = params.service_name ? decodeURIComponent(params.service_name) : null
  const serviceKey  = params.service_key  ? decodeURIComponent(params.service_key)  : null
  const price       = params.price        ? Number(params.price)                     : null

  const waText = encodeURIComponent(
    serviceName
      ? `Hola, tuve un problema al pagar el servicio "${serviceName}" (${price} €) en Inmonest. ¿Podéis ayudarme?`
      : 'Hola, tuve un problema al pagar en Inmonest. ¿Podéis ayudarme?'
  )
  const waUrl = `https://wa.me/${WA_PHONE}?text=${waText}`

  const retryUrl = serviceKey ? `/gestoria#${serviceKey}` : '/gestoria'

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f8f5f0] pt-20 pb-16 flex items-center justify-center px-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

          {/* ── Columna izquierda: confianza ─────────────────────────── */}
          <div className="hidden md:flex flex-col justify-between w-[42%] bg-gradient-to-br from-[#1a2f1c] to-[#0d1a0f] p-8 text-white flex-shrink-0">
            <div>
              <div className="mb-8">
                <span className="text-2xl font-extrabold tracking-tight">
                  <span className="text-white">Inmo</span><span className="text-[#f4c94a]">nest</span>
                </span>
              </div>

              {/* Escudo de seguridad */}
              <div className="flex flex-col items-center text-center mb-8 mt-4">
                <div className="w-20 h-20 rounded-full bg-[#f4c94a]/10 border-2 border-[#f4c94a]/40 flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-[#f4c94a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <p className="text-base font-bold text-[#f4c94a] mb-2">Tu dinero está seguro</p>
                <p className="text-sm text-white/70 leading-relaxed">
                  No se ha realizado ningún cargo. El pago se canceló antes de completarse.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: '🔒', text: 'Cifrado SSL de 256 bits en todos los pagos' },
                  { icon: '💳', text: 'Procesado por Stripe — líder en pagos seguros' },
                  { icon: '✅', text: 'Sin cargos si no se completa el pago' },
                  { icon: '📞', text: 'Soporte inmediato por WhatsApp' },
                ].map(item => (
                  <div key={item.text} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <p className="text-xs text-white/75 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-xs text-white/50 text-center">
                Gestoría inmobiliaria profesional<br />+500 contratos tramitados
              </p>
            </div>
          </div>

          {/* ── Columna derecha: detalle del error ───────────────────── */}
          <div className="flex-1 p-8 flex flex-col">
            {/* Icono de alerta */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Pago no completado</h1>
                <p className="text-sm text-gray-500 mt-0.5">No se ha realizado ningún cargo en tu tarjeta</p>
              </div>
            </div>

            {/* Explicación */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 text-sm text-orange-800">
              <p className="font-semibold mb-1">¿Qué ha pasado?</p>
              <p className="text-orange-700 leading-relaxed">
                El proceso de pago fue cancelado o interrumpido. Esto puede ocurrir si cerraste la ventana,
                el tiempo de sesión expiró o tu banco rechazó la transacción.
              </p>
            </div>

            {/* Resumen del servicio (si tenemos datos) */}
            {serviceName && price != null && (
              <div className="border border-gray-200 rounded-xl p-4 mb-6">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">Servicio que querías contratar</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-800">{serviceName}</p>
                  <span className="text-[#c9962a] font-bold text-lg">{price} €</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Pago único · Sin suscripción · Entrega en 24–48h</p>
              </div>
            )}

            {/* Botones de acción */}
            <div className="space-y-3 mt-auto">
              <Link
                href={retryUrl}
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#c9962a] hover:bg-[#a87a20] text-white font-bold rounded-xl text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reintentar el pago
              </Link>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#1da851] text-white font-bold rounded-xl text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Contactar por WhatsApp
              </a>

              <Link
                href="/gestoria"
                className="flex items-center justify-center w-full py-2.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
              >
                ← Volver a la gestoría
              </Link>
            </div>

            {/* Nota mobile de seguridad */}
            <p className="md:hidden mt-6 text-center text-xs text-gray-400">
              🔒 Pago procesado por Stripe · Cifrado SSL · Sin cargos si no se completa
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
