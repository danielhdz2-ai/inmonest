import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'

export const metadata: Metadata = {
  title: 'Acceso cliente gestoría',
  robots: { index: false, follow: false },
}

export default function AccesoClientePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-[#f4f5f7] to-[#eef0f2] pt-24 pb-16 px-4">
        <div className="max-w-lg mx-auto">
          <div className="rounded-3xl border border-gray-200 bg-white shadow-xl overflow-hidden">
            <div className="bg-gradient-to-br from-[#0a1410] to-[#152318] px-8 py-10 text-white text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/20 border border-gold-500/40 text-3xl mb-4">
                🔐
              </div>
              <h1 className="text-2xl font-bold">Portal exclusivo para clientes</h1>
              <p className="text-sm text-white/60 mt-2">
                El panel de gestoría solo está disponible para quienes han contratado un servicio de Inmonest.
              </p>
            </div>
            <div className="p-8 space-y-5">
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  Si acabas de pagar, espera unos segundos y accede con el <strong>mismo email</strong> que usaste
                  en Stripe. Tu expediente se activará automáticamente.
                </p>
                <p>
                  ¿Aún no has contratado? Desde 61 € tienes contratos redactados por expertos en 48 horas.
                </p>
              </div>
              <Link
                href="/gestoria"
                className="block w-full text-center bg-gold-500 hover:bg-[#b8841e] text-white font-bold py-3.5 rounded-xl min-h-[48px] leading-[48px] transition-colors"
              >
                Ver servicios de gestoría →
              </Link>
              <Link
                href="/login?next=/mi-cuenta/contratos"
                className="block w-full text-center border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl min-h-[48px] leading-[48px] hover:bg-gray-50"
              >
                Ya soy cliente — Iniciar sesión
              </Link>
              <p className="text-center text-xs text-gray-400 pt-2">
                <a href="tel:+34745022862" className="text-gold-500 underline">745 022 862</a>
                {' · '}
                <a href="mailto:info@inmonest.com" className="text-gold-500 underline">info@inmonest.com</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
