import Image from 'next/image'

const SELLOS = [
  { src: '/sellos-confianza/Sello-Confianza-Online.png', alt: 'Sello Confianza Online', w: 220, h: 88 },
  { src: '/sellos-confianza/pyme_innovadora_meic-SP_web.png', alt: 'Pyme Innovadora MEIC', w: 200, h: 88 },
  { src: '/sellos-confianza/efqm500.png', alt: 'EFQM Recognised', w: 110, h: 88 },
  { src: '/sellos-confianza/RGPD.jpg', alt: 'Cumplimiento RGPD', w: 110, h: 88 },
  { src: '/sellos-confianza/api.jpg', alt: 'Agente de la Propiedad Inmobiliaria (API)', w: 110, h: 88 },
  {
    src: '/sellos-confianza/banner-consejo.jpg',
    alt: 'Consejo General de Colegios de Gestores Administrativos de España',
    w: 240,
    h: 88,
  },
  {
    src: '/sellos-confianza/Logo-ICAB-2023-scaled.jpg',
    alt: 'Ilustre Colegio de la Abogacía de Barcelona (ICAB)',
    w: 160,
    h: 88,
  },
]

export default function SellosConfianza() {
  return (
    <section className="bg-white px-6 sm:px-10 lg:px-16 py-10 border-t border-gray-100">
      <p className="text-center text-xs font-bold uppercase tracking-[0.14em] text-gray-500 mb-7">
        Sellos de confianza
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14">
        {SELLOS.map((sello) => (
          <div
            key={sello.src}
            className="relative flex h-20 sm:h-24 w-auto items-center justify-center opacity-95 hover:opacity-100 transition-opacity"
          >
            <Image
              src={sello.src}
              alt={sello.alt}
              width={sello.w}
              height={sello.h}
              className="h-16 sm:h-20 md:h-24 w-auto max-w-[200px] sm:max-w-[240px] object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
