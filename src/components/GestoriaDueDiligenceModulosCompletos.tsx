import GestoriaTramiteOnlineSection from '@/components/GestoriaTramiteOnlineSection'
import ContratoDueDiligenceServiciosDetalle from '@/components/ContratoDueDiligenceServiciosDetalle'
import ComoTrabajamosContrato from '@/components/ComoTrabajamosContrato'
import AgenciaGestoriaPanelDemo from '@/app/agencias/gestoria/AgenciaGestoriaPanelDemo'
import type { GestoriaAlquilerModulosPartes } from '@/components/GestoriaAlquilerModulosCompletos'

type Props = {
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

export function GestoriaDueDiligenceTramiteOnlineSection({
  ciudadNombre,
  panelAnchorId = 'panel-gestoria-due-diligence',
}: {
  ciudadNombre: string
  panelAnchorId?: string
}) {
  return (
    <GestoriaTramiteOnlineSection
      ciudad={ciudadNombre}
      panelAnchorId={panelAnchorId}
      tipo="due-diligence"
    />
  )
}

export default function GestoriaDueDiligenceModulosCompletos({
  ciudadNombre,
  solicitarHref,
  ciudadSlug = '',
  panelAnchorId = 'panel-gestoria-due-diligence',
  partes,
}: Props) {
  const p = { ...DEFAULT_PARTES, ...partes }

  return (
    <>
      {p.tramiteOnline ? (
        <GestoriaDueDiligenceTramiteOnlineSection
          ciudadNombre={ciudadNombre}
          panelAnchorId={panelAnchorId}
        />
      ) : null}

      {p.pasosIlustrados ? (
        <ContratoDueDiligenceServiciosDetalle
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
