import type { Metadata } from 'next'
import Navbar from '@/components/NavbarServer'
import PageHeroImage from '@/components/PageHeroImage'

export const metadata: Metadata = {
  title: 'Política de cookies y tecnologías similares',
  description: 'Cookies, almacenamiento local, service worker y tecnologías similares utilizadas en Inmonest.',
}

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-gray-700">
        <PageHeroImage
          src="/inmonestexterior.png"
          alt="Política de Cookies"
          className="mb-10"
        />
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Política de cookies y tecnologías similares</h1>
        <p className="text-sm text-gray-400 mb-10">Última actualización: abril de 2026</p>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. ¿Qué son las cookies y tecnologías similares?</h2>
          <p className="leading-relaxed">
            Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo cuando los visitas.
            Además, usamos <strong>almacenamiento local</strong>, <strong>service worker</strong> (PWA y caché offline) y,
            si lo activas, <strong>notificaciones push (VAPID)</strong>, que la LSSI-CE equipara a cookies cuando permiten
            almacenar o acceder a información en tu terminal.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Cookies que utilizamos</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">Nombre</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">Tipo</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">Finalidad</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">Duración</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">sb-*-auth-token</td>
                  <td className="px-4 py-2">Técnica</td>
                  <td className="px-4 py-2">Sesión Supabase Auth (proveedor: Supabase)</td>
                  <td className="px-4 py-2">Sesión / hasta 7 días</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">inmonest_consent_v1</td>
                  <td className="px-4 py-2">Técnica</td>
                  <td className="px-4 py-2">Guarda tu elección de cookies (Inmonest)</td>
                  <td className="px-4 py-2">12 meses</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">__cf_bm, cf_clearance</td>
                  <td className="px-4 py-2">Técnica / Seguridad</td>
                  <td className="px-4 py-2">Cloudflare Turnstile y protección anti-bot (Cloudflare)</td>
                  <td className="px-4 py-2">Minutos / hasta 24 h</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">_ga, _gid, _gat, _gcl_*</td>
                  <td className="px-4 py-2">Analítica / marketing*</td>
                  <td className="px-4 py-2">Etiquetas cargadas vía GTM (Google) — solo con consentimiento</td>
                  <td className="px-4 py-2">Hasta 24 meses / sesión</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">_gtm_*</td>
                  <td className="px-4 py-2">Analítica</td>
                  <td className="px-4 py-2">Google Tag Manager (Google)</td>
                  <td className="px-4 py-2">Sesión</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">__stripe_*, m, stripe-mid</td>
                  <td className="px-4 py-2">Técnica</td>
                  <td className="px-4 py-2">Stripe Checkout — fraude y sesión de pago (Stripe)</td>
                  <td className="px-4 py-2">Hasta 12 meses</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-xs">Cache SW / push</td>
                  <td className="px-4 py-2">Técnica (similar)</td>
                  <td className="px-4 py-2">Service worker PWA y suscripción push VAPID (Inmonest)</td>
                  <td className="px-4 py-2">Hasta revocación</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Clasificación de las cookies</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Cookies técnicas (necesarias)</h3>
              <p className="text-sm leading-relaxed">Son imprescindibles para el funcionamiento del sitio web. Permiten, entre otras cosas, que el usuario se autentique y navegue de forma segura. No requieren consentimiento previo del usuario.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Cookies analíticas</h3>
              <p className="text-sm leading-relaxed">Nos permiten conocer cómo interactúan los usuarios con el sitio (páginas visitadas, tiempo de permanencia, origen del tráfico, etc.) con el fin de mejorar el servicio. Requieren tu consentimiento.</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Cómo gestionar o desactivar las cookies</h2>
          <p className="leading-relaxed mb-3">
            Puedes cambiar tus preferencias en cualquier momento desde el enlace <strong>«Configurar cookies»</strong> del pie
            de página. También puedes controlar o eliminar cookies desde tu navegador; desactivar las técnicas puede impedir
            iniciar sesión o pagar con Stripe.
          </p>
          <p className="text-xs text-gray-500 mb-3">* Las etiquetas concretas dependen de la configuración de tu contenedor GTM.</p>
          <p className="text-sm leading-relaxed">Instrucciones para los principales navegadores:</p>
          <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:underline">Safari</a></li>
            <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:underline">Microsoft Edge</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Más información</h2>
          <p className="leading-relaxed">
            Si tienes alguna pregunta sobre nuestra Política de Cookies, escríbenos a <a href="mailto:info@inmonest.com" className="text-gold-500 hover:underline">info@inmonest.com</a>.
          </p>
        </section>
      </main>
    </>
  )
}
