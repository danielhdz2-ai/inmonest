import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import GestoriaLandingExtras from '@/components/GestoriaLandingExtras'
import { GestoriaImageBanner, GestoriaCtaBanner } from '@/components/ui/GestoriaImageBanner'
import type { RelacionadoServicio } from '@/lib/gestoria-relacionados'
import { cn } from '@/lib/cn'

export type GestoriaGuiaHeroAction = {
  href: string
  label: string
  variant?: 'primary' | 'secondary'
}

type GestoriaGuiaPageLayoutProps = {
  jsonLd?: object | object[]
  badge: string
  title: string
  lead: string
  imageSrc: string
  imageAlt: string
  breadcrumbLabel: string
  heroActions: GestoriaGuiaHeroAction[]
  servicio: string
  servicioNombre: string
  whatsappMessage: string
  ctaTitle: React.ReactNode
  ctaDescription: string
  ctaPrimaryHref: string
  ctaPrimaryLabel: string
  ctaImageSrc?: string
  ctaImageAlt?: string
  relacionados?: RelacionadoServicio[]
  children: React.ReactNode
}

export default function GestoriaGuiaPageLayout({
  jsonLd,
  badge,
  title,
  lead,
  imageSrc,
  imageAlt,
  breadcrumbLabel,
  heroActions,
  servicio,
  servicioNombre,
  whatsappMessage,
  ctaTitle,
  ctaDescription,
  ctaPrimaryHref,
  ctaPrimaryLabel,
  ctaImageSrc = '/gestoria1.jpg',
  ctaImageAlt = 'Gestoría inmobiliaria Inmonest',
  relacionados,
  children,
}: GestoriaGuiaPageLayoutProps) {
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <>
      <Navbar />

      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold-600 transition-colors">
              Inicio
            </Link>
            <span aria-hidden>/</span>
            <Link href="/gestoria" className="hover:text-gold-600 transition-colors">
              Gestoría
            </Link>
            <span aria-hidden>/</span>
            <span className="text-gray-900 font-medium">{breadcrumbLabel}</span>
          </nav>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-2 pb-10">
          <GestoriaImageBanner imageSrc={imageSrc} imageAlt={imageAlt} imagePosition="right" size="lg">
            <span className="inline-block bg-gold-500/20 text-gold-300 text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit border border-gold-500/30 uppercase tracking-widest">
              {badge}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 leading-snug max-w-2xl">
              {title}
            </h1>
            <p className="text-white/75 text-base sm:text-lg max-w-xl mb-5 leading-relaxed">{lead}</p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              {heroActions.map((action) => (
                <Link
                  key={action.href + action.label}
                  href={action.href}
                  className={cn(
                    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors',
                    action.variant === 'secondary'
                      ? 'border border-white/30 text-white hover:bg-white/10'
                      : 'bg-gold-500 text-white hover:bg-gold-600'
                  )}
                >
                  {action.label}
                </Link>
              ))}
              <a
                href="#gestor-daniel"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Hablar con Daniel
              </a>
            </div>
          </GestoriaImageBanner>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 pb-12 space-y-12 text-gray-700">
          {children}
        </article>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          <GestoriaLandingExtras
            servicio={servicio}
            servicioNombre={servicioNombre}
            whatsappMessage={whatsappMessage}
            skipCiudades
            skipRelacionados
            skipTestimonios
            phase="contact"
          />
        </div>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <GestoriaCtaBanner
            eyebrow="Gestoría inmobiliaria"
            title={ctaTitle}
            description={ctaDescription}
            primaryHref={ctaPrimaryHref}
            primaryLabel={ctaPrimaryLabel}
            imageSrc={ctaImageSrc}
            imageAlt={ctaImageAlt}
            imagePosition="right"
          />
        </section>

        {relacionados && relacionados.length > 0 && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
            <GestoriaLandingExtras
              servicio={servicio}
              servicioNombre={servicioNombre}
              relacionados={relacionados}
              skipDaniel
              skipLlamaGestor
              skipCiudades
              skipTestimonios
              phase="footer"
            />
          </div>
        )}
      </main>
    </>
  )
}
