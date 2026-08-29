import { GestoriaCtaBanner } from '@/components/ui/GestoriaImageBanner'
import type { AgenciaGestoriaCiudadSlug } from '@/lib/agencias-gestoria-ciudades'
import { gestoriaAgenciasCiudadPath } from '@/lib/agencias-gestoria-ciudades'
import { getCiudadImage } from '@/lib/gestoria-images'

type Props = {
  ciudadSlug: AgenciaGestoriaCiudadSlug
  ciudadNombre: string
}

export default function GestoriaCiudadAgenciasBanner({ ciudadSlug, ciudadNombre }: Props) {
  const ciudadImage = getCiudadImage(ciudadSlug)

  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <GestoriaCtaBanner
          eyebrow={`Agencias B2B · ${ciudadNombre}`}
          title={
            <>
              ¿Eres agencia, API o autónomo? Contratos en{' '}
              <span className="text-gold-400">{ciudadNombre}</span> desde 110 €
            </>
          }
          description="Packs anuales o contrato suelto. Arras, alquiler LAU y compraventa con entrega en 4–5 h y FirmaCert incluida. Tarifa B2B, no precio particular."
          primaryHref={gestoriaAgenciasCiudadPath(ciudadSlug)}
          primaryLabel="Contratos para agencias →"
          secondaryHref="/agencias/gestoria"
          secondaryLabel="Ver todos los packs"
          imageSrc={ciudadImage.src}
          imageAlt={ciudadImage.alt || `Contratos para agencias inmobiliarias en ${ciudadNombre}`}
          imagePosition="right"
        />
      </div>
    </section>
  )
}
