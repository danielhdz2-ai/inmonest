import GestoriaTramiteOnlineSection from '@/components/GestoriaTramiteOnlineSection'
import PackArrasDocumentalServiciosDetalle from '@/components/PackArrasDocumentalServiciosDetalle'
import GestoriaDespachoBarcelonaTramiteSection from '@/components/GestoriaDespachoBarcelonaTramiteSection'
import { getPackArrasDocumentalDespachoContent } from '@/lib/gestoria-tramite-despacho-section-content'

type Props = {
  lugarNombre: string
  solicitarHref: string
  panelAnchorId?: string
  mapAnchorId?: string
  showDespachoBarcelona?: boolean
  headingPasosOverride?: string
}

export default function GestoriaPackArrasDocumentalModulosCompletos({
  lugarNombre,
  solicitarHref,
  panelAnchorId = 'panel-gestoria-pack-arras',
  mapAnchorId = 'despacho-barcelona',
  showDespachoBarcelona = true,
  headingPasosOverride,
}: Props) {
  const despachoContent = getPackArrasDocumentalDespachoContent(lugarNombre)

  return (
    <>
      <GestoriaTramiteOnlineSection
        ciudad={lugarNombre}
        panelAnchorId={panelAnchorId}
        tipo="pack-arras-documental"
      />
      <PackArrasDocumentalServiciosDetalle
        lugarNombre={lugarNombre}
        solicitarHref={solicitarHref}
        headingOverride={headingPasosOverride}
      />
      {showDespachoBarcelona ? (
        <GestoriaDespachoBarcelonaTramiteSection
          modo="compra"
          lugarNombre={lugarNombre}
          solicitarHref={solicitarHref}
          mapAnchorId={mapAnchorId}
          contentOverride={despachoContent}
        />
      ) : null}
    </>
  )
}
