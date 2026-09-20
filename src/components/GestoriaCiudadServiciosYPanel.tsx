import ContratosServiciosProfundos from '@/app/contratos-inmobiliarios/ContratosServiciosProfundos'
import AgenciaGestoriaPanelDemo from '@/app/agencias/gestoria/AgenciaGestoriaPanelDemo'
import { getContratosCiudadEnriquecimiento } from '@/lib/contratos-inmobiliarios-ciudad-enriquecimiento'
import {
  getContratosInmobiliariosCiudad,
  isContratosInmobiliariosCiudad,
} from '@/lib/contratos-inmobiliarios-ciudades'

const CIUDADES_VENTA_LANDING = new Set([
  'madrid',
  'barcelona',
  'valencia',
  'sevilla',
  'malaga',
  'granada',
  'salamanca',
  'valladolid',
])

type Props = {
  ciudadNombre: string
  ciudadSlug: string
  sectionIntro?: string
}

export default function GestoriaCiudadServiciosYPanel({
  ciudadNombre,
  ciudadSlug,
  sectionIntro,
}: Props) {
  const contratosConfig = isContratosInmobiliariosCiudad(ciudadSlug)
    ? getContratosInmobiliariosCiudad(ciudadSlug)
    : undefined
  const enriquecido = isContratosInmobiliariosCiudad(ciudadSlug)
    ? getContratosCiudadEnriquecimiento(ciudadSlug)
    : undefined

  const ventaHref = CIUDADES_VENTA_LANDING.has(ciudadSlug)
    ? `/gestoria/venta-completa-reserva-escritura/${ciudadSlug}`
    : '/gestoria/venta-completa-reserva-escritura'

  return (
    <>
      <ContratosServiciosProfundos
        ciudadNombre={ciudadNombre}
        ciudadSlug={ciudadSlug}
        sectionIntro={
          sectionIntro ??
          contratosConfig?.serviciosIntro ??
          `Arras, alquiler LAU, compra y venta entre particulares en ${ciudadNombre}: precio cerrado, panel de seguimiento y gestor asignado.`
        }
        serviciosLocales={enriquecido?.serviciosRapidos}
        links={{
          arrasInfo: contratosConfig?.enlaceArras ?? `/${ciudadSlug}/contrato-arras`,
          alquilerInfo: contratosConfig?.enlaceAlquiler ?? `/${ciudadSlug}/contrato-alquiler`,
          compraInfo: `/gestoria/asesoria-compra-piso/${ciudadSlug}`,
          ventaInfo: ventaHref,
        }}
      />
      <AgenciaGestoriaPanelDemo audience="particular" ciudadNombre={ciudadNombre} />
    </>
  )
}
