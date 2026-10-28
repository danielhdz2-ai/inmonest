import { INMONEST_OFICINA_BARCELONA } from '@/lib/inmonest-oficina-barcelona'
import { COMPLETA_RESERVA_ESCRITURA_PRECIO } from '@/lib/completa-reserva-escritura-pasos-content'
import type { CompletaServicioModo } from '@/lib/completa-reserva-escritura-pasos-content'

export type DespachoTramitePunto = { titulo: string; desc: string }

export type DespachoTramiteSectionContent = {
  titulo: string
  hero: string
  desc: string
  puntos: DespachoTramitePunto[]
  imagenAlt: string
  overlaySubtitulo: string
}

export function getDespachoBarcelonaTramiteContent(
  modo: CompletaServicioModo,
  lugarNombre: string,
): DespachoTramiteSectionContent {
  const dir = INMONEST_OFICINA_BARCELONA.direccionCompleta
  const precio = COMPLETA_RESERVA_ESCRITURA_PRECIO

  if (modo === 'venta') {
    return {
      titulo: `Venta completa en ${lugarNombre} con cita en despacho Les Corts — mismo pack ${precio} €`,
      hero:
        'El precio no cambia: 687 € IVA incluido online o presencial. Si vendes en Barcelona y prefieres entregar originales, revisar arras en papel o hablar cara a cara con tu gestor, reservas cita en nuestro despacho.',
      desc: `Oficina en ${dir}. Cita previa L–V 9:00–19:00. Ideal si vienes desde ${lugarNombre} o Pedralbes: el trámite sigue en el panel, pero tienes punto físico de confianza.`,
      puntos: [
        {
          titulo: 'Mismo gestor, mismo expediente',
          desc: 'Lo acordado por WhatsApp se refleja en el panel; la cita presencial complementa, no sustituye, el seguimiento digital.',
        },
        {
          titulo: 'Entrega de documentación en mano',
          desc: 'Nota simple, escrituras o autorizaciones cuando no quieres escanear o necesitas validar originales.',
        },
        {
          titulo: 'Revisión de borradores de arras',
          desc: 'Repaso cláusula a cláusula antes de firmar la señal con el comprador.',
        },
        {
          titulo: 'Sin suplemento por presencial',
          desc: '687 € incluye online y opción de cita en Les Corts; no pagas comisión de agencia.',
        },
      ],
      imagenAlt: `Despacho Inmonest Les Corts — venta completa ${lugarNombre}`,
      overlaySubtitulo: `${lugarNombre} · Mejía Lequerica 44 · gestor asignado`,
    }
  }

  return {
    titulo: `Compra completa en ${lugarNombre} con cita en despacho Barcelona — ${precio} € IVA incl.`,
    hero:
      'Compras a particular y quieres revisar arras o documentación del vendedor en persona. Mismo pack 687 €: panel online + opción de reunión en Les Corts sin coste extra.',
    desc: `${INMONEST_OFICINA_BARCELONA.horario}. Dirección: ${dir}.`,
    puntos: [
      {
        titulo: 'Due diligence explicada en reunión',
        desc: 'Te mostramos hallazgos de nota simple, comunidad e ITE antes de entregar señal alta.',
      },
      {
        titulo: 'Entrega de PDFs y originales',
        desc: 'Llevamos orden al expediente que luego enviamos a notaría.',
      },
      {
        titulo: 'Coordinación con banco e hipoteca',
        desc: 'Alineamos plazos de tasación con el vendedor mientras sigues el trámite online.',
      },
      {
        titulo: '687 € planos — online o presencial',
        desc: 'Sin % sobre el precio del piso; no somos agencia captadora.',
      },
    ],
    imagenAlt: `Despacho Inmonest — compra completa ${lugarNombre}`,
    overlaySubtitulo: `${lugarNombre} · Les Corts · pack hasta escritura`,
  }
}
