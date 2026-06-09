import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import PageHeroImage from '@/components/PageHeroImage'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Contrato de Arras Online | Desde 49€ | Gestoría Inmobiliaria | Inmonest',
  description: 'Redacción profesional de contratos de arras y señal. Servicio online en toda España. Arras penitenciales, confirmatorias y señal. Desde 49€ + IVA.',
  keywords: 'contrato de arras, contrato de señal, arras penitenciales, arras confirmatorias, contrato reserva vivienda, gestoría inmobiliaria',
  openGraph: {
    title: 'Contrato de Arras Online | Desde 49€ | Inmonest',
    description: 'Redacción profesional de contratos de arras y señal. Servicio online en toda España desde 49€.',
    type: 'website',
  },
}

const CIUDADES_PRINCIPALES = [
  { slug: 'madrid', nombre: 'Madrid', emoji: '🏛️', demanda: 'Alta' },
  { slug: 'barcelona', nombre: 'Barcelona', emoji: '🏖️', demanda: 'Alta' },
  { slug: 'valencia', nombre: 'Valencia', emoji: '🌊', demanda: 'Media-Alta' },
  { slug: 'sevilla', nombre: 'Sevilla', emoji: '☀️', demanda: 'Media' },
  { slug: 'malaga', nombre: 'Málaga', emoji: '🌴', demanda: 'Alta' },
  { slug: 'bilbao', nombre: 'Bilbao', emoji: '🏔️', demanda: 'Media' },
  { slug: 'zaragoza', nombre: 'Zaragoza', emoji: '🏰', demanda: 'Media' },
  { slug: 'alicante', nombre: 'Alicante', emoji: '⛱️', demanda: 'Alta' },
]

const TIPOS_ARRAS = [
  {
    tipo: 'Arras Penitenciales',
    descripcion: 'La opción más común. Permite desistir del contrato perdiendo la señal (comprador) o devolviendo el doble (vendedor).',
    precio: '49€',
    icono: '⚖️',
  },
  {
    tipo: 'Arras Confirmatorias',
    descripcion: 'Se exige el cumplimiento del contrato. No se puede desistir sin causa justificada.',
    precio: '49€',
    icono: '✅',
  },
  {
    tipo: 'Arras Penales',
    descripcion: 'Similar a las penitenciales pero permite reclamar indemnización adicional por daños y perjuicios.',
    precio: '59€',
    icono: '📋',
  },
]

export default function ContratoArrasPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-20 px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-6">
                ⚖️ Servicio Profesional de Gestoría
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Contrato de Arras <span className="text-emerald-200">Online</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/95 max-w-3xl mx-auto mb-8">
                Redacción profesional de contratos de arras y señal para compraventa de viviendas. 
                <strong> Desde 49€ + IVA.</strong> Listo en 24-48 horas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <a
                  href="tel:+34641008847"
                  className="px-8 py-4 bg-white text-emerald-700 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
                >
                  📞 Llamar: 641 008 847
                </a>
                <Link
                  href="/gestoria/solicitar"
                  className="px-8 py-4 bg-emerald-800 text-white rounded-lg font-bold text-lg hover:bg-emerald-900 transition-colors shadow-xl border-2 border-white/30"
                >
                  Solicitar contrato →
                </Link>
              </div>
              <p className="text-emerald-100 text-sm">
                ✓ Sin desplazamientos · ✓ 100% online · ✓ Entrega en 24-48h
              </p>
            </div>
            <PageHeroImage
              src="/keys.jpg"
              alt="Contrato de arras online redactado por abogados"
              className="mb-0 shadow-2xl"
              priority
            />
          </div>
        </section>

        {/* Tipos de Arras */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tipos de Contratos de Arras
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Seleccionamos el tipo de arras más adecuado para tu caso
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TIPOS_ARRAS.map(item => (
                <div 
                  key={item.tipo}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="text-4xl mb-4">{item.icono}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.tipo}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.descripcion}</p>
                  <div className="text-2xl font-bold text-emerald-600">
                    {item.precio} <span className="text-sm text-gray-500">+ IVA</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Servicio por Ciudades */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Contratos de Arras en tu Ciudad
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Información específica y adaptada a la legislación de cada comunidad autónoma
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CIUDADES_PRINCIPALES.map(ciudad => (
                <Link
                  key={ciudad.slug}
                  href={`/${ciudad.slug}/contrato-arras`}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 text-center group"
                >
                  <div className="text-4xl mb-3">{ciudad.emoji}</div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                    {ciudad.nombre}
                  </h3>
                  <div className="text-xs text-gray-500 mb-2">Demanda: {ciudad.demanda}</div>
                  <div className="text-sm text-emerald-600 font-semibold group-hover:underline">
                    Ver info →
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link 
                href="/gestoria/ciudades"
                className="text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-2 group"
              >
                Ver todas las ciudades disponibles 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Qué Incluye */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ¿Qué incluye nuestro servicio?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Análisis de tu caso</h3>
                  <p className="text-gray-600 text-sm">Revisamos tu situación y te asesoramos sobre el tipo de arras más conveniente</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Redacción profesional</h3>
                  <p className="text-gray-600 text-sm">Contrato redactado por expertos en derecho inmobiliario con todas las cláusulas necesarias</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Adaptación a legislación local</h3>
                  <p className="text-gray-600 text-sm">Cumplimos con la normativa específica de tu comunidad autónoma</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Revisiones ilimitadas</h3>
                  <p className="text-gray-600 text-sm">Modificamos el contrato hasta que esté perfecto, sin coste adicional</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                  5
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Entrega en 24-48 horas</h3>
                  <p className="text-gray-600 text-sm">Recibes tu contrato listo para firmar en formato PDF editable</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                  6
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Asesoría post-firma</h3>
                  <p className="text-gray-600 text-sm">Te ayudamos con cualquier duda tras firmar el contrato</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 px-6 bg-gradient-to-r from-emerald-600 to-emerald-700">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              ¿Necesitas un contrato de arras profesional?
            </h2>
            <p className="text-xl text-white/95 mb-8">
              Hablamos sin compromiso. Te asesoramos sobre tu caso específico.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+34641008847"
                className="px-8 py-4 bg-white text-emerald-700 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
              >
                📞 Llamar: 641 008 847
              </a>
              <a
                href="https://wa.me/34641008847?text=Hola,%20necesito%20un%20contrato%20de%20arras"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#25d366] text-white rounded-lg font-bold text-lg hover:bg-[#20ba5a] transition-colors shadow-xl"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ¿Qué es un contrato de arras?
            </h2>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              El <strong>contrato de arras</strong> (también llamado <strong>contrato de señal</strong>) es un documento 
              que se firma cuando comprador y vendedor acuerdan la compraventa de una vivienda y el comprador entrega 
              una cantidad de dinero como señal o garantía de que la operación se llevará a cabo.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Este contrato es fundamental porque vincula a ambas partes y establece las condiciones de la compraventa, 
              incluyendo el precio total, la cantidad entregada como señal, el plazo para firmar ante notario, y las 
              consecuencias en caso de desistimiento.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Por qué contratar una gestoría para el contrato de arras?
            </h3>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Aunque internet está lleno de plantillas gratuitas de contratos de arras, <strong>usar una plantilla 
              genérica es arriesgado</strong> porque:
            </p>

            <ul className="space-y-2 text-gray-700 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Pueden no estar adaptadas a la legislación de tu comunidad autónoma</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Suelen estar desactualizadas respecto a cambios normativos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>No contemplan situaciones específicas de tu caso</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✗</span>
                <span>Pueden contener cláusulas nulas o abusivas</span>
              </li>
            </ul>

            <p className="text-gray-700 leading-relaxed">
              Por solo <strong>49€ + IVA</strong>, tendrás un contrato profesional redactado específicamente para 
              tu caso, con todas las garantías legales y la tranquilidad de saber que está bien hecho.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
