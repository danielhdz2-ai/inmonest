import StickyMobileContratoCta from '@/components/StickyMobileContratoCta'
import { MobileDockSpacer } from '@/components/ui/MobileDockSpacer'
import { GestoriaCtaBanner } from '@/components/ui/GestoriaImageBanner'
import { GESTORIA_CTA_BANNERS } from '@/lib/gestoria-images'
import {
  getContratoAlquilerPrecio,
  getContratoAlquilerSolicitarHref,
} from '@/lib/gestoria-catalogo'

type Props = {
  ciudad: string
  ciudadSlug: string
  ctaTitulo?: string
  ctaTexto?: string
}

export default function GestoriaHubConversionFooter({
  ciudad,
  ciudadSlug,
  ctaTitulo,
  ctaTexto,
}: Props) {
  const precioLau = getContratoAlquilerPrecio(ciudadSlug)
  const solicitarLauHref = getContratoAlquilerSolicitarHref(ciudadSlug)

  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <GestoriaCtaBanner
            eyebrow={`Gestoría · ${ciudad}`}
            title={ctaTitulo ?? `Gestoría inmobiliaria en ${ciudad}: empieza por lo que necesitas`}
            description={
              ctaTexto ??
              `Contrato de alquiler desde ${precioLau}€ o arras desde 145€. ¿Dudas? Habla con Daniel más arriba en la página.`
            }
            primaryHref={solicitarLauHref}
            primaryLabel={`Contrato alquiler desde ${precioLau}€`}
            imageSrc={GESTORIA_CTA_BANNERS.hubCiudad.src}
            imageAlt={GESTORIA_CTA_BANNERS.hubCiudad.alt}
            imagePosition="right"
          />
        </div>
      </section>

      <MobileDockSpacer />
      <StickyMobileContratoCta ciudad={ciudad} ciudadSlug={ciudadSlug} servicio="gestoria" />
    </>
  )
}
