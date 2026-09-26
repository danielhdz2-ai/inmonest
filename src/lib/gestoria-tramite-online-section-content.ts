import { GESTORIA_TRAMITE_ONLINE_DESC, GESTORIA_TRAMITE_ONLINE_HERO } from '@/lib/gestoria-tramite-online'

export type TramiteOnlineSectionTipo =
  | 'lau'
  | 'temporada'
  | 'habitacion'
  | 'arras-penitenciales'
  | 'arras-confirmatorias'
  | 'due-diligence'

export type TramiteOnlinePunto = { titulo: string; desc: string }

export type TramiteOnlineSectionContent = {
  titulo: string
  hero: string
  desc: string
  puntos: TramiteOnlinePunto[]
  imagenAlt: string
  overlaySubtitulo: string
}

const PUNTOS_BASE: TramiteOnlinePunto[] = [
  {
    titulo: 'Panel mi-cuenta/contratos',
    desc: 'Sube documentos, consulta el progreso y descarga el PDF cuando esté listo.',
  },
  {
    titulo: 'Gestor con teléfono directo',
    desc: 'Un gestor inmobiliario asignado en menos de 24 h — WhatsApp, llamada o videollamada.',
  },
  {
    titulo: 'Firma digital FIRMACERT',
    desc: 'Contrato firmable con firma electrónica avanzada (eIDAS) incluida en el precio.',
  },
  {
    titulo: 'Sin desplazamientos',
    desc: 'Todo el trámite desde casa: contratación, documentación, revisión y entrega.',
  },
]

export function getTramiteOnlineSectionContent(
  tipo: TramiteOnlineSectionTipo,
  ciudad: string,
): TramiteOnlineSectionContent {
  switch (tipo) {
    case 'arras-penitenciales':
      return {
        titulo: `Tu contrato de arras penitenciales en ${ciudad} sin ir a ninguna oficina`,
        hero:
          'Trámite 100 % online para blindar la señal: panel de expediente, gestor asignado y borrador de arras en 48 h — sin desplazamientos.',
        desc: 'Subes nota simple, datos de comprador y vendedor, y condiciones de la compraventa al panel. Tu gestor revisa coherencia registral, redacta las arras y te guía hasta la firma digital.',
        puntos: [
          {
            titulo: 'Panel mi-cuenta/contratos',
            desc: 'Nota simple, DNI, precio pactado y señal: todo centralizado con checklist de arras.',
          },
          {
            titulo: 'Gestor con teléfono directo',
            desc: 'Resuelve dudas de hipoteca, plazo a escritura y cláusulas antes de firmar la señal.',
          },
          {
            titulo: 'Firma digital FIRMACERT',
            desc: 'Arras firmables con firma electrónica avanzada (eIDAS) incluida en el precio.',
          },
          {
            titulo: 'Sin desplazamientos',
            desc: 'Contratación, documentación, borrador y entrega del PDF desde casa.',
          },
        ],
        imagenAlt: `Contrato de arras penitenciales online en ${ciudad} — panel y gestor`,
        overlaySubtitulo: `${ciudad} · gestor asignado · expediente de arras`,
      }

    case 'arras-confirmatorias':
      return {
        titulo: `Tus arras confirmatorias en ${ciudad} sin ir a ninguna oficina`,
        hero:
          'Trámite 100 % online para formalizar el compromiso de compraventa: panel, gestor y redacción de arras confirmatorias en 48 h.',
        desc: 'Documentación, borrador y revisiones por WhatsApp o videollamada. Tu gestor adapta el contrato a la obligación de ir a escritura y a las condiciones suspensivas pactadas.',
        puntos: [
          {
            titulo: 'Panel mi-cuenta/contratos',
            desc: 'Expediente de compraventa con documentos de inmueble y partes en un solo sitio.',
          },
          ...PUNTOS_BASE.slice(1, 3),
          {
            titulo: 'Sin desplazamientos',
            desc: 'Todo el proceso de arras confirmatorias online hasta el PDF firmable.',
          },
        ],
        imagenAlt: `Arras confirmatorias online en ${ciudad}`,
        overlaySubtitulo: `${ciudad} · gestor asignado · panel de expediente`,
      }

    case 'temporada':
      return {
        titulo: `Tu alquiler por temporada en ${ciudad} sin ir a ninguna oficina`,
        hero: GESTORIA_TRAMITE_ONLINE_HERO,
        desc: 'Causa de temporalidad, duración y documentación en el panel. Tu gestor redacta el contrato válido fuera del LAU habitual con el mismo flujo online.',
        puntos: PUNTOS_BASE,
        imagenAlt: `Alquiler por temporada online en ${ciudad}`,
        overlaySubtitulo: `${ciudad} · gestor asignado · panel de expediente`,
      }

    case 'habitacion':
      return {
        titulo: `Tu contrato de habitación en ${ciudad} sin ir a ninguna oficina`,
        hero: GESTORIA_TRAMITE_ONLINE_HERO,
        desc: GESTORIA_TRAMITE_ONLINE_DESC,
        puntos: PUNTOS_BASE,
        imagenAlt: `Contrato de alquiler de habitación online en ${ciudad}`,
        overlaySubtitulo: `${ciudad} · gestor asignado · panel de expediente`,
      }

    case 'due-diligence':
      return {
        titulo: `Tu due diligence pre-compra en ${ciudad} sin ir a ninguna oficina`,
        hero:
          'Trámite 100 % online para verificar el inmueble antes de escriturar: panel de expediente, gestor asignado e informe ejecutivo — sin desplazamientos.',
        desc: 'Subes arras, nota simple, actas de comunidad y documentación técnica al panel. Tu gestor audita registros, urbanismo, edificio e informe; te asesora por teléfono, WhatsApp y email hasta la firma en notaría.',
        puntos: [
          {
            titulo: 'Panel mi-cuenta/contratos',
            desc: 'Expediente due diligence con checklist, documentos y estado de la revisión en un solo sitio.',
          },
          {
            titulo: 'Gestor con teléfono directo',
            desc: 'Un gestor inmobiliario asignado en menos de 24 h — WhatsApp, llamada o videollamada.',
          },
          {
            titulo: 'Informe ejecutivo en PDF',
            desc: 'Hallazgos, riesgos y recomendaciones antes de ir a notaría, incluidos en la tarifa plana.',
          },
          {
            titulo: 'Sin desplazamientos',
            desc: 'Contratación, documentación, auditoría y asesoramiento desde casa en toda España.',
          },
        ],
        imagenAlt: `Due diligence pre-compra online en ${ciudad} — panel y gestor`,
        overlaySubtitulo: `${ciudad} · gestor asignado · expediente due diligence`,
      }

    case 'lau':
    default:
      return {
        titulo: `Tu alquiler LAU en ${ciudad} sin ir a ninguna oficina`,
        hero: GESTORIA_TRAMITE_ONLINE_HERO,
        desc: GESTORIA_TRAMITE_ONLINE_DESC,
        puntos: PUNTOS_BASE,
        imagenAlt: `Gestoría inmobiliaria online en ${ciudad} — panel y gestor`,
        overlaySubtitulo: `${ciudad} · gestor asignado · panel de expediente`,
      }
  }
}
