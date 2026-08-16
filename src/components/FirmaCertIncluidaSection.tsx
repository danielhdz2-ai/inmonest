import Image from 'next/image'
import Link from 'next/link'
import { FIRMACERT_URL } from '@/lib/firmacert'
import { cn } from '@/lib/cn'

type FirmaCertIncluidaSectionProps = {
  className?: string
  compact?: boolean
}

export default function FirmaCertIncluidaSection({
  className,
  compact = false,
}: FirmaCertIncluidaSectionProps) {
  return (
    <section
      className={cn(
        compact ? 'py-0' : 'py-10 sm:py-12 px-4 sm:px-6 bg-cream-50/80',
        className,
      )}
      aria-labelledby="firmacert-incluida-heading"
    >
      <div className={cn(!compact && 'max-w-5xl mx-auto')}>
        <div className="rounded-2xl overflow-hidden bg-white border border-gold-200/70 shadow-sm grid grid-cols-1 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.4fr)]">
          <div className="relative min-h-[200px] sm:min-h-[240px] md:min-h-full">
            <Image
              src="/contratodearras.jpg"
              alt="Firma electrónica de contrato inmobiliario"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-center">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6420]">
              Incluido en todos nuestros servicios
            </p>
            <h2
              id="firmacert-incluida-heading"
              className="text-xl sm:text-2xl font-bold text-gray-900 mt-2 leading-snug"
            >
              Firma electrónica avanzada con{' '}
              <Link
                href={FIRMACERT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-600 hover:text-gold-700 underline decoration-gold-300/80 underline-offset-2"
              >
                FIRMACERT
              </Link>
            </h2>
            <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed mt-3">
              En Inmonest utilizamos{' '}
              <Link
                href={FIRMACERT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gray-800 hover:text-gold-700 underline underline-offset-2"
              >
                FIRMACERT
              </Link>
              , plataforma de firma electrónica avanzada conforme al reglamento europeo{' '}
              <strong className="font-semibold text-gray-800">eIDAS (Art. 26)</strong>. Tus
              contratos, arras y documentación se firman de forma segura, con validez legal plena y
              sin desplazamientos innecesarios.
            </p>
            <p className="text-sm text-gray-500 mt-4 leading-relaxed">
              La firma digital va incluida en el servicio — no pagas extra por agilizar tus trámites.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
