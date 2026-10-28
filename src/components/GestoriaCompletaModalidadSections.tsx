import GestoriaTramiteOnlineSection from '@/components/GestoriaTramiteOnlineSection'
import GestoriaDespachoBarcelonaTramiteSection from '@/components/GestoriaDespachoBarcelonaTramiteSection'
import type { CompletaServicioModo } from '@/lib/completa-reserva-escritura-pasos-content'
import type { TramiteOnlineSectionContent } from '@/lib/gestoria-tramite-online-section-content'

type Props = {
  modo: CompletaServicioModo
  /** Ciudad o barrio para el copy (p. ej. "Sant Antoni, Barcelona") */
  lugarNombre: string
  solicitarHref: string
  panelAnchorId?: string
  mapAnchorId?: string
  /** Si false, solo módulo online (landings fuera de Barcelona) */
  showDespachoBarcelona?: boolean
  tramiteOnlineOverride?: Partial<TramiteOnlineSectionContent>
}

export default function GestoriaCompletaModalidadSections({
  modo,
  lugarNombre,
  solicitarHref,
  panelAnchorId = 'panel-gestoria-demo',
  mapAnchorId = 'despacho-barcelona',
  showDespachoBarcelona = true,
  tramiteOnlineOverride,
}: Props) {
  const tipo = modo === 'venta' ? 'venta-completa' : 'compra-completa'

  return (
    <>
      <GestoriaTramiteOnlineSection
        ciudad={lugarNombre}
        panelAnchorId={panelAnchorId}
        tipo={tipo}
        contentOverride={tramiteOnlineOverride}
      />
      {showDespachoBarcelona ? (
        <GestoriaDespachoBarcelonaTramiteSection
          modo={modo}
          lugarNombre={lugarNombre}
          solicitarHref={solicitarHref}
          mapAnchorId={mapAnchorId}
        />
      ) : null}
    </>
  )
}
