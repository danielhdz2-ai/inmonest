import { getPrecioServicio } from '@/lib/gestoria-catalogo'
import type { ContratoAlquilerServicioBloque } from '@/lib/contrato-alquiler-servicio-content'

export const DUE_DILIGENCE_SERVICIO_PRECIO =
  getPrecioServicio('pack-due-diligence-precompra') ?? 350

export const DUE_DILIGENCE_SERVICIO_BLOQUES: ContratoAlquilerServicioBloque[] = [
  {
    id: 'llamada-gestor',
    kicker: 'Paso 1',
    titulo: 'Primera llamada con tu gestor: preparar y explicar la operación',
    intro:
      'En menos de 24 horas un gestor inmobiliario real entiende tu compra: precio pactado, estado de las arras, plazos a escritura, vendedor particular o profesional y qué documentación ya tienes. Te orientamos antes de contratar para que sepas qué cubre el pack y qué conviene pedir al vendedor.',
    pasos: [
      'Videollamada, llamada o WhatsApp: tú eliges cómo hablar.',
      'Repasamos el inmueble, importe de la operación y riesgos que te preocupan.',
      'Definimos qué documentación falta y cómo obtenerla antes de la auditoría.',
      'Resolvemos dudas sobre plazos, informe y acompañamiento hasta escritura.',
    ],
    incluye: [
      'Gestor con nombre, teléfono y WhatsApp directo',
      'Primera consulta sin compromiso',
      'Enfoque comprador entre particulares — sin comisión sobre el piso',
      '100 % online — válido en toda España',
    ],
    imagen: '/promo.png',
    imagenAlt: 'Llamada con gestor para due diligence pre-compra',
  },
  {
    id: 'contratacion',
    kicker: 'Paso 2',
    titulo: `Contratas el servicio — ${DUE_DILIGENCE_SERVICIO_PRECIO} € IVA incluido`,
    intro:
      'Pagas la tarifa plana online y se abre tu expediente de due diligence en el panel. Sin costes ocultos ni comisión sobre el precio del inmueble: un único precio por la revisión documental completa y el informe ejecutivo.',
    pasos: [
      'Contratación en minutos desde la landing o tras la primera llamada.',
      'Confirmación de pago y apertura de mi-cuenta/contratos.',
      'Asignación del mismo gestor que ya conoce tu operación.',
      'Plan claro: documentación → auditoría → informe → asesoramiento hasta escritura.',
    ],
    incluye: [
      `${DUE_DILIGENCE_SERVICIO_PRECIO} € IVA incluido — precio cerrado`,
      'Panel de seguimiento desde el primer minuto',
      'Factura y contrato de prestación de servicios',
      'Plazo orientativo de informe: 3–5 días laborables',
    ],
    imagen: '/gestoria11.jpg',
    imagenAlt: 'Contratación online del pack due diligence Inmonest',
    invertido: true,
  },
  {
    id: 'documentacion',
    kicker: 'Paso 3',
    titulo: 'Subes toda la documentación al expediente',
    intro:
      'Centralizamos en el panel arras, nota simple, certificados, actas de comunidad y cualquier documento del vendedor. Puedes adjuntar archivos tú mismo o enviarlos al gestor; te guiamos con un checklist de compraventa para no dejar huecos.',
    pasos: [
      'Contrato de arras firmado o borrador en negociación, si lo tienes.',
      'Nota simple registral, escrituras y datos de comprador y vendedor.',
      'Actas de comunidad, certificado energético, IBI y suministros.',
      'Documentación técnica disponible (ITE, cédula, licencias).',
      'El gestor indica qué falta y cómo solicitarla al vendedor o administrador.',
    ],
    incluye: [
      'Checklist due diligence en el panel',
      'Subida segura de documentos o envío directo al gestor',
      'Recordatorios hasta completar el expediente',
      'Sin desplazamientos a ninguna oficina',
    ],
    imagen: '/gestoria15.jpg',
    imagenAlt: 'Documentación de compraventa en panel Inmonest',
  },
  {
    id: 'auditoria',
    kicker: 'Paso 4',
    titulo: 'Tu gestor audita arras, registros, urbanismo y edificio',
    intro:
      'Con la documentación reunida, el gestor revisa el contrato de arras y el resto de contratos vinculados, cruza la nota registral con la operación, analiza plano y situación urbanística, actas vecinales, derramas e ITE o aptitud técnica del edificio cuando aplique.',
    pasos: [
      'Revisión del contrato de arras: cláusulas, plazos, señal y condiciones suspensivas.',
      'Nota registral: titularidad, cargas, hipotecas, anotaciones y coherencia con el precio.',
      'Comunidad: deudas, derramas aprobadas o pendientes y actas relevantes.',
      'Urbanismo y licencias; plano o documentación técnica del inmueble y del edificio.',
      'ITE, cédula de habitabilidad y certificados obligatorios según antigüedad y comunidad.',
    ],
    incluye: [
      'Análisis jurídico-documental por gestor inmobiliario especializado',
      'Detección de riesgos antes de escriturar',
      'Coordinación con el vendedor si falta documentación',
      'Seguimiento visible en el panel (“En revisión”)',
    ],
    imagen: '/interior1.jpg',
    imagenAlt: 'Auditoría documental due diligence pre-compra',
    invertido: true,
  },
  {
    id: 'informe',
    kicker: 'Paso 5',
    titulo: 'Informe completo y asesoramiento en todo el proceso',
    intro:
      'Recibes un informe ejecutivo en PDF con la situación del inmueble, hallazgos y recomendaciones. Tu gestor sigue disponible por teléfono, WhatsApp y correo para resolver cualquier duda hasta la firma en notaría — y si surge un imprevisto documental, te orienta sobre opciones.',
    pasos: [
      'Informe PDF con resumen ejecutivo, riesgos y puntos a negociar o resolver.',
      'Asesoramiento telefónico y por email sobre el contenido del informe.',
      'Respuesta a dudas de última hora antes de escriturar.',
      'Acompañamiento si necesitas pedir documentación adicional al vendedor.',
    ],
    incluye: [
      'Informe ejecutivo due diligence en PDF',
      'Mismo gestor de principio a fin',
      'Canal directo WhatsApp, llamada y videollamada',
      'Asesoramiento continuo hasta que firmes con tranquilidad',
    ],
    imagen: '/gestoria9.jpg',
    imagenAlt: 'Informe due diligence y asesoramiento hasta escritura',
  },
]
