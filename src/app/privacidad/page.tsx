import type { Metadata } from 'next'
import Navbar from '@/components/NavbarServer'
import PageHeroImage from '@/components/PageHeroImage'
import { getLegalEntity } from '@/lib/legal-entity'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Cómo Inmonest recopila, usa y protege tus datos personales de acuerdo con el RGPD y la LOPDGDD.',
}

export default function PrivacidadPage() {
  const legal = getLegalEntity()

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-gray-700">
        <PageHeroImage
          src="/promo1.png"
          alt="Política de Privacidad"
          className="mb-10"
        />
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Política de Privacidad</h1>
        <p className="text-sm text-gray-400 mb-10">Última actualización: abril de 2026</p>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Responsable del tratamiento</h2>
          <ul className="space-y-1 text-sm">
            <li><strong>Denominación:</strong> {legal.denomination}</li>
            <li><strong>NIF:</strong> {legal.nif}</li>
            <li><strong>Domicilio:</strong> {legal.address}</li>
            <li>
              <strong>Teléfono:</strong>{' '}
              <a href={`tel:${legal.phone.replace(/\s/g, '')}`} className="text-gold-500 hover:underline">{legal.phone}</a>
            </li>
            <li><strong>Correo electrónico:</strong> <a href={`mailto:${legal.email}`} className="text-gold-500 hover:underline">{legal.email}</a></li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Datos que recopilamos</h2>
          <p className="leading-relaxed mb-3">Recopilamos los siguientes datos personales en función de la acción que realices:</p>
          <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed">
            <li><strong>Registro de cuenta:</strong> nombre, correo electrónico y contraseña (almacenada de forma cifrada).</li>
            <li><strong>Publicación de anuncio:</strong> datos del inmueble, fotografías, precio y datos de contacto que el propietario decida incluir.</li>
            <li><strong>Formularios de contacto:</strong> nombre, email, teléfono y el mensaje que nos envíes.</li>
            <li><strong>Servicios de gestoría:</strong> nombre, email, teléfono y la información necesaria para la prestación del servicio contratado.</li>
            <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia (via Google Tag Manager).</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Finalidad y base jurídica del tratamiento</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">Finalidad</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-600">Base jurídica</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr><td className="px-4 py-2">Gestión de la cuenta de usuario</td><td className="px-4 py-2">Ejecución de contrato</td></tr>
                <tr><td className="px-4 py-2">Publicación y gestión de anuncios</td><td className="px-4 py-2">Ejecución de contrato</td></tr>
                <tr><td className="px-4 py-2">Atención al cliente y consultas</td><td className="px-4 py-2">Interés legítimo</td></tr>
                <tr><td className="px-4 py-2">Prestación de servicios de gestoría</td><td className="px-4 py-2">Ejecución de contrato</td></tr>
                <tr><td className="px-4 py-2">Análisis estadístico de navegación</td><td className="px-4 py-2">Consentimiento</td></tr>
                <tr><td className="px-4 py-2">Comunicaciones comerciales propias</td><td className="px-4 py-2">Consentimiento</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Destinatarios y transferencias internacionales</h2>
          <p className="leading-relaxed">
            Inmonest puede compartir tus datos con los siguientes proveedores de servicios, quienes actúan como encargados del tratamiento bajo acuerdos de confidencialidad:
          </p>
          <ul className="mt-3 list-disc list-inside space-y-1 text-sm">
            <li><strong>Supabase Inc.</strong> (base de datos, autenticación y almacenamiento) — región UE cuando está configurada en el proyecto.</li>
            <li><strong>Vercel Inc.</strong> (alojamiento y despliegue) — UE/EEA.</li>
            <li><strong>Stripe Inc.</strong> (pagos) — certificado PCI DSS; puede implicar transferencias a EE. UU. con garantías contractuales.</li>
            <li><strong>Resend Inc.</strong> (correo transaccional) — puede implicar tratamiento fuera del EEE con cláusulas tipo.</li>
            <li><strong>Cloudflare Inc.</strong> (CDN, WAF y Cloudflare Turnstile anti-bot) — puede procesar IP y señales técnicas.</li>
            <li><strong>Google LLC</strong> (Google Tag Manager / analítica, solo si aceptas cookies analíticas) — EU-US Data Privacy Framework cuando aplica.</li>
            <li><strong>Proveedores de IA</strong> (p. ej. Google Gemini, OpenAI, Anthropic u OpenRouter, según el servicio): generación de textos de anuncios y asistente de chat; actúan como encargados con instrucciones contractuales de confidencialidad.</li>
            <li><strong>Upstash Inc.</strong> (limitación de tasa / seguridad de APIs).</li>
          </ul>
          <p className="mt-3 leading-relaxed text-sm">
            Las transferencias internacionales, cuando existan, se amparan en decisiones de adecuación, cláusulas contractuales tipo de la Comisión Europea o mecanismos equivalentes exigidos por el RGPD.
          </p>
          <p className="mt-3 leading-relaxed text-sm">No vendemos ni cedemos tus datos a terceros para fines publicitarios ajenos a Inmonest.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Decisiones automatizadas e inteligencia artificial</h2>
          <p className="leading-relaxed text-sm mb-3">
            Inmonest utiliza sistemas de IA para <strong>generar borradores de descripciones de anuncios</strong> y para el{' '}
            <strong>chat de ayuda</strong> en el sitio. Estos procesos <strong>no producen efectos jurídicos</strong> ni te
            vinculan de forma similar: siempre puedes editar, rechazar o solicitar intervención humana antes de publicar o
            contratar. No realizamos perfilado con fines de marketing automatizado basado en tus datos personales.
          </p>
          <p className="leading-relaxed text-sm">
            Si subes documentos de identidad (DNI/NIE) o datos sensibles en expedientes de gestoría, se tratan únicamente
            para la finalidad del servicio contratado, con acceso restringido y medidas de seguridad reforzadas.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Plazo de conservación</h2>
          <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed">
            <li><strong>Cuenta y perfil:</strong> mientras la cuenta esté activa; tras la baja, supresión o anonimización en un plazo máximo de 30 días, salvo bloqueo legal.</li>
            <li><strong>Anuncios publicados:</strong> mientras estén activos; tras archivado o baja, según política de retención operativa y obligaciones legales.</li>
            <li><strong>Expedientes de gestoría y documentos:</strong> durante la prestación del servicio y los plazos de prescripción y obligaciones mercantiles/fiscales aplicables.</li>
            <li><strong>Formularios de contacto y leads:</strong> el tiempo necesario para atender la solicitud y un máximo de 24 meses para seguimiento comercial, salvo oposición.</li>
            <li><strong>Logs técnicos y seguridad:</strong> plazos cortos (habitualmente 30–90 días), salvo investigación de incidentes.</li>
            <li><strong>Registro de consentimientos de cookies:</strong> mínimo 3 años desde el registro, con fines de acreditación.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Tus derechos</h2>
          <p className="leading-relaxed mb-3">De acuerdo con el RGPD y la LOPDGDD, puedes ejercer los siguientes derechos:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>Acceso:</strong> obtener confirmación sobre si tratamos tus datos y acceder a ellos.</li>
            <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
            <li><strong>Supresión:</strong> solicitar la eliminación de tus datos («derecho al olvido»).</li>
            <li><strong>Oposición:</strong> oponerte al tratamiento basado en interés legítimo.</li>
            <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado y legible por máquina.</li>
            <li><strong>Limitación:</strong> solicitar la restricción del tratamiento en determinadas circunstancias.</li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed">
            Puedes ejercer tus derechos por estos canales:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
            <li>
              <strong>Usuarios registrados:</strong>{' '}
              <a href="/mi-cuenta/perfil" className="text-gold-500 hover:underline">Mi cuenta → Privacidad y datos</a>{' '}
              (descarga de datos y baja de cuenta).
            </li>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:info@inmonest.com?subject=Ejercicio%20derechos%20RGPD" className="text-gold-500 hover:underline">info@inmonest.com</a>{' '}
              indicando el derecho que ejerces y acreditando tu identidad.
            </li>
          </ul>
          <p className="mt-3 text-sm">
            Respondemos en el plazo máximo de un mes (prorrogable según RGPD). También puedes reclamar ante la{' '}
            <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-gold-500 hover:underline">Agencia Española de Protección de Datos (AEPD)</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Cambios en esta política</h2>
          <p className="leading-relaxed">
            Inmonest se reserva el derecho de modificar esta Política de Privacidad para adaptarla a cambios legislativos o funcionales. Te notificaremos cualquier cambio relevante mediante un aviso destacado en el Sitio o por correo electrónico.
          </p>
        </section>
      </main>
    </>
  )
}
