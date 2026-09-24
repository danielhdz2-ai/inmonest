import GestoriaTramiteOnlineSection from '@/components/GestoriaTramiteOnlineSection'
import ContratoAlquilerServiciosDetalle from '@/components/ContratoAlquilerServiciosDetalle'
import ComoTrabajamosContrato from '@/components/ComoTrabajamosContrato'
import AgenciaGestoriaPanelDemo from '@/app/agencias/gestoria/AgenciaGestoriaPanelDemo'
import type { AlquilerContratoModuloVariant } from '@/lib/alquiler-contrato-servicio-registry'
import type { TramiteOnlineSectionTipo } from '@/lib/gestoria-tramite-online-section-content'

function tramiteTipoFromAlquilerVariant(variant: AlquilerContratoModuloVariant): TramiteOnlineSectionTipo {
  if (variant === 'temporada') return 'temporada'
  if (variant === 'habitacion') return 'habitacion'
  return 'lau'
}

export type GestoriaAlquilerModulosPartes = {
  tramiteOnline?: boolean
  pasosIlustrados?: boolean
  comoTrabajamos?: boolean
  panelDemo?: boolean
}

type Props = {
  variant: AlquilerContratoModuloVariant
  ciudadNombre: string
  solicitarHref: string
  ciudadSlug?: string
  panelAnchorId?: string
  partes?: GestoriaAlquilerModulosPartes
}

const DEFAULT_PARTES: GestoriaAlquilerModulosPartes = {
  tramiteOnline: true,
  pasosIlustrados: true,
  comoTrabajamos: true,
  panelDemo: true,
}

export function GestoriaAlquilerTramiteOnlineSection({
  ciudadNombre,
  panelAnchorId = 'panel-gestoria-alquiler',
  variant = 'lau',
}: {
  ciudadNombre: string
  panelAnchorId?: string
  variant?: AlquilerContratoModuloVariant
}) {
  return (
    <GestoriaTramiteOnlineSection
      ciudad={ciudadNombre}
      panelAnchorId={panelAnchorId}
      tipo={tramiteTipoFromAlquilerVariant(variant)}
    />
  )
}

export default function GestoriaAlquilerModulosCompletos({
  variant,
  ciudadNombre,
  solicitarHref,
  ciudadSlug = '',
  panelAnchorId = 'panel-gestoria-alquiler',
  partes,
}: Props) {
  const p = { ...DEFAULT_PARTES, ...partes }
  const tramiteTipo = tramiteTipoFromAlquilerVariant(variant)

  return (
    <>
      {p.tramiteOnline ? (
        <GestoriaTramiteOnlineSection
          ciudad={ciudadNombre}
          panelAnchorId={panelAnchorId}
          tipo={tramiteTipo}
        />
      ) : null}

      {p.pasosIlustrados ? (
        <ContratoAlquilerServiciosDetalle
          variant={variant}
          ciudadNombre={ciudadNombre}
          solicitarHref={solicitarHref}
        />
      ) : null}

      {p.comoTrabajamos ? (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <ComoTrabajamosContrato ciudad={ciudadNombre} ciudadSlug={ciudadSlug} servicio="alquiler" />
        </div>
      ) : null}

      {p.panelDemo ? (
        <div id={panelAnchorId}>
          <AgenciaGestoriaPanelDemo
            audience="particular"
            ciudadNombre={ciudadNombre}
            servicioDemo="alquiler-lau"
            defaultSection="inicio"
          />
        </div>
      ) : null}
    </>
  )
}
