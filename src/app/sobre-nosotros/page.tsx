import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Sobre Nosotros — Inmonest | Portal Inmobiliario y Gestoría Digital',
  description: 'Inmonest es el portal inmobiliario que conecta particulares sin comisiones y ofrece gestoría legal especializada. Conoce nuestra misión, valores y equipo.',
  alternates: {
    canonical: `${BASE_URL}/sobre-nosotros`,
  },
  openGraph: {
    title: 'Sobre Nosotros — Inmonest',
    description: 'El portal inmobiliario que conecta particulares sin comisiones y ofrece gestoría legal especializada en derecho inmobiliario.',
    url: `${BASE_URL}/sobre-nosotros`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/imagenes/familia6.jpg`, width: 1200, height: 630, alt: 'Equipo Inmonest' }],
  },
}

export default function SobreNosotrosPage() {
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Inmonest',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: 'Portal inmobiliario que conecta particulares sin comisiones y ofrece gestoría legal especializada en derecho inmobiliario.',
    foundingDate: '2024',
    areaServed: {
      '@type': 'Country',
      name: 'España',
    },
    sameAs: [
      'https://www.instagram.com/inmonest',
      'https://www.facebook.com/inmonest',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <Navbar />
      <WhatsAppButton />

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Quiénes somos
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                El portal inmobiliario <span className="text-[#c9962a]">hecho para ti</span>
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Inmonest nace de una visión clara: <strong>democratizar el acceso a la vivienda</strong> eliminando 
                barreras innecesarias y poniendo la tecnología al servicio de las personas.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Somos más que un portal inmobiliario. Somos tu aliado en cada paso del proceso: 
                desde encontrar el piso perfecto hasta firmar el contrato con total seguridad jurídica.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9962a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Fundada en 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9962a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100% digital</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9962a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Equipo legal propio</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/imagenes/familia6.jpg"
                alt="Equipo Inmonest"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestra misión
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hacer que alquilar o comprar vivienda sea <strong>transparente, justo y accesible para todos</strong>
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-orange-50 p-8 rounded-lg border-l-4 border-[#c9962a]">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h3>
              <p className="text-gray-700 leading-relaxed">
                Empoderar a particulares para que <strong>tomen el control de sus decisiones inmobiliarias</strong> 
                sin intermediarios que inflen los precios. Queremos que cualquier persona pueda publicar, buscar 
                y cerrar operaciones inmobiliarias con las mismas herramientas que usan las grandes agencias.
              </p>
            </div>
            <div className="bg-orange-50 p-8 rounded-lg border-l-4 border-[#c9962a]">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Visión</h3>
              <p className="text-gray-700 leading-relaxed">
                Convertirnos en el <strong>portal inmobiliario de referencia en España</strong> para operaciones 
                entre particulares, combinando la mejor tecnología (IA, verificación automática, alertas) con 
                un equipo legal que te protege en cada paso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Nuestros valores
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '💎',
                title: 'Transparencia total',
                desc: 'Cero letra pequeña. Precios claros, condiciones justas, sin comisiones ocultas. Lo que ves es lo que pagas.',
              },
              {
                icon: '🤝',
                title: 'Confianza y seguridad',
                desc: 'Verificamos particulares con IA, ofrecemos contratos legales redactados por abogados y protegemos tus datos con encriptación.',
              },
              {
                icon: '⚡',
                title: 'Tecnología al servicio de las personas',
                desc: 'Usamos IA para facilitar búsquedas, detectar fraudes y generar descripciones, pero siempre con supervisión humana.',
              },
              {
                icon: '🎓',
                title: 'Educación y empoderamiento',
                desc: 'Publicamos guías, artículos y recursos gratuitos para que entiendas tus derechos y obligaciones.',
              },
              {
                icon: '💰',
                title: 'Precios justos',
                desc: 'Publicar anuncios es gratis. Los servicios legales son accesibles (desde 7€) porque creemos que la justicia no debe ser un lujo.',
              },
              {
                icon: '🌱',
                title: 'Mejora continua',
                desc: 'Escuchamos a nuestra comunidad y actualizamos la plataforma constantemente para resolver problemas reales.',
              },
            ].map((valor, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
                <div className="text-4xl mb-4">{valor.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{valor.title}</h3>
                <p className="text-gray-600 leading-relaxed">{valor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lo que nos hace diferentes */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            ¿Qué nos hace diferentes?
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            No somos solo un tablón de anuncios. Somos un ecosistema completo para operaciones inmobiliarias.
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <Image
                src="/imagenes/gestoria1.jpg"
                alt="Gestoría legal Inmonest"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                1. Gestoría legal integrada
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Somos el <strong>único portal que incluye gestoría jurídica especializada</strong> en derecho inmobiliario. 
                Desde contratos de arras hasta revisión de cláusulas abusivas, nuestros abogados te protegen.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Contratos LAU desde 7€</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Revisión de contratos de arras desde 45€</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Notas simples registrales en 24h</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Detección de fraudes desde 29€</span>
                </li>
              </ul>
              <Link
                href="/gestoria"
                className="inline-block mt-6 bg-[#c9962a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b8872a] transition"
              >
                Ver servicios de gestoría →
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                2. Tecnología de verificación con IA
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Usamos inteligencia artificial para <strong>identificar anuncios sospechosos, detectar duplicados 
                y verificar que los usuarios sean particulares reales</strong>, no agencias disfrazadas.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Análisis automático de descripciones</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Detección de imágenes robadas o editadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Alertas personalizadas por zona y precio</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src="/imagenes/interior3.jpg"
                alt="Tecnología Inmonest"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-16 px-4 bg-orange-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            El equipo detrás de Inmonest
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Somos un equipo multidisciplinar de <strong>desarrolladores, abogados, diseñadores y expertos inmobiliarios</strong> 
            que trabajan para hacer tu vida más fácil.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-5xl mb-4">👨‍💻</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Equipo Técnico</h3>
              <p className="text-gray-600">
                Desarrolladores full-stack especializados en Next.js, IA y arquitecturas escalables.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-5xl mb-4">⚖️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Equipo Legal</h3>
              <p className="text-gray-600">
                Abogados especializados en derecho inmobiliario, civil y contratación.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Equipo de Producto</h3>
              <p className="text-gray-600">
                Diseñadores UX/UI y analistas de datos que optimizan la experiencia del usuario.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cifras */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Inmonest en números
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10,000+', label: 'Anuncios publicados' },
              { number: '5,000+', label: 'Usuarios registrados' },
              { number: '500+', label: 'Contratos redactados' },
              { number: '24h', label: 'Tiempo promedio de respuesta' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold text-[#c9962a] mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 bg-[#c9962a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para encontrar tu hogar ideal?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a miles de personas que ya confían en Inmonest para sus operaciones inmobiliarias
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pisos"
              className="bg-white text-[#c9962a] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Buscar pisos
            </Link>
            <Link
              href="/publicar-anuncio"
              className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition shadow-lg"
            >
              Publicar gratis
            </Link>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            ¿Tienes alguna pregunta?
          </h2>
          <p className="text-gray-600 mb-8">
            Estamos aquí para ayudarte. Contáctanos por cualquiera de estos canales:
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:info@inmonest.com"
              className="flex items-center gap-2 text-[#c9962a] hover:text-[#b8872a] font-semibold"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              info@inmonest.com
            </a>
            <a
              href="https://wa.me/34624177966"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#c9962a] hover:text-[#b8872a] font-semibold"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp: +34 624 17 79 66
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
