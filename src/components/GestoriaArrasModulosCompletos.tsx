import GestoriaTramiteOnlineSection from '@/components/GestoriaTramiteOnlineSection'
import ContratoArrasServiciosDetalle from '@/components/ContratoArrasServiciosDetalle'
import ComoTrabajamosContrato from '@/components/ComoTrabajamosContrato'
import AgenciaGestoriaPanelDemo from '@/app/agencias/gestoria/AgenciaGestoriaPanelDemo'
import type { ArrasContratoModuloVariant } from '@/lib/arras-contrato-servicio-registry'
import type { GestoriaAlquilerModulosPartes } from '@/components/GestoriaAlquilerModulosCompletos'
import type { TramiteOnlineSectionTipo } from '@/lib/gestoria-tramite-online-section-content'

type Props = {
  variant: ArrasContratoModuloVariant
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

function tramiteTipoFromVariant(variant: ArrasContratoModuloVariant): TramiteOnlineSectionTipo {
  return variant === 'confirmatorias' ? 'arras-confirmatorias' : 'arras-penitenciales'
}

export function GestoriaArrasTramiteOnlineSection({
  ciudadNombre,
  panelAnchorId = 'panel-gestoria-arras',
  variant = 'penitenciales',
}: {
  ciudadNombre: string
  panelAnchorId?: string
  variant?: ArrasContratoModuloVariant
}) {
  return (
    <GestoriaTramiteOnlineSection
      ciudad={ciudadNombre}
      panelAnchorId={panelAnchorId}
      tipo={tramiteTipoFromVariant(variant)}
    />
  )
}

export default function GestoriaArrasModulosCompletos({
  variant,
  ciudadNombre,
  solicitarHref,
  ciudadSlug = '',
  panelAnchorId = 'panel-gestoria-arras',
  partes,
}: Props) {
  const p = { ...DEFAULT_PARTES, ...partes }
  const tramiteTipo = tramiteTipoFromVariant(variant)

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
        <ContratoArrasServiciosDetalle
          variant={variant}
          ciudadNombre={ciudadNombre}
          solicitarHref={solicitarHref}
        />
      ) : null}

      {p.comoTrabajamos ? (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <ComoTrabajamosContrato ciudad={ciudadNombre} ciudadSlug={ciudadSlug} servicio="arras" />
        </div>
      ) : null}

      {p.panelDemo ? (
        <div id={panelAnchorId}>
          <AgenciaGestoriaPanelDemo
            audience="particular"
            ciudadNombre={ciudadNombre}
            servicioDemo="arras"
            defaultSection="inicio"
          />
        </div>
      ) : null}
    </>
  )
}
