import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'
import Navbar from '@/components/NavbarServer'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Escríbenos y te respondemos en menos de 24 horas.',
}

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="relative mb-10 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/inmonestexterior.png"
            alt="Contacta con Inmonest — gestoría inmobiliaria"
            width={800}
            height={320}
            className="w-full h-48 md:h-56 object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Cabecera */}
        <div className="text-center mb-10">
          <span className="inline-block bg-gold-500/10 text-gold-500 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Contacto
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            ¿En qué podemos ayudarte?
          </h1>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            Escríbenos y un <strong>asesor experto en derecho inmobiliario</strong> te responderá en menos de 24 horas.
          </p>
        </div>

        {/* Tarjeta con formulario */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
          <ContactForm />
        </div>

        {/* Info alternativa */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="text-2xl mb-2">✉️</div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Email</p>
            <a href="mailto:info@inmonest.com" className="text-sm text-gold-500 font-medium hover:underline">
              info@inmonest.com
            </a>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="text-2xl mb-2">⏱️</div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Tiempo de respuesta</p>
            <p className="text-sm text-gray-700 font-medium">Menos de 24 h</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 sm:col-span-2">
            <div className="text-2xl mb-2">⚖️</div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Gestoría inmobiliaria</p>
            <Link href="/gestoria" className="text-sm text-gold-500 font-medium hover:underline">
              Ver servicios de gestoría y contratos
            </Link>
          </div>
        </div>

      </div>
    </main>
    </>
  )
}
