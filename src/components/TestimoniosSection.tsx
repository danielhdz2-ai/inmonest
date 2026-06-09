import TestimoniosCarousel from '@/components/TestimoniosCarousel'

type TestimoniosSectionProps = {
  className?: string
}

export default function TestimoniosSection({ className = 'bg-white' }: TestimoniosSectionProps) {
  return (
    <section className={`py-16 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Más de 150 familias han confiado en nosotros para vender o comprar su vivienda.
            Lee sus experiencias reales.
          </p>
        </div>
        <TestimoniosCarousel />
      </div>
    </section>
  )
}
