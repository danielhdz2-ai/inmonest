export type HomeProcesoBloque = {
  id: string
  kicker: string
  titulo: string
  intro: string
  pasos: string[]
  incluye: string[]
  imagen: string
  imagenAlt: string
  invertido?: boolean
}

export const HOME_PROCESO_BLOQUES: HomeProcesoBloque[] = [
  {
    id: 'llamada-gestor',
    kicker: 'Paso 1',
    titulo: 'Llamada con tu gestor: le explicas lo que necesitas',
    intro:
      'En menos de 24 horas un gestor inmobiliario real entiende tu caso: alquiler, arras, compraventa o revisión. Cuéntanos la operación, plazos y dudas antes de contratar.',
    pasos: [
      'Videollamada, llamada o WhatsApp: tú eliges cómo hablar.',
      'Repasamos qué servicio encaja (LAU, arras, pack compra/venta, revisión).',
      'Detectamos riesgos y documentación que hará falta.',
      'Resolvemos dudas sobre precio cerrado, plazos y panel online.',
    ],
    incluye: [
      'Gestor con nombre, teléfono y WhatsApp directo',
      'Primera consulta sin compromiso',
      'Asesoramiento sobre tu operación concreta',
      '100 % online — válido en toda España',
    ],
    imagen: '/promo.png',
    imagenAlt: 'Llamada con gestor Inmonest',
  },
  {
    id: 'asesoramiento',
    kicker: 'Paso 2',
    titulo: 'Tu gestor te asesora y te explica el proceso',
    intro:
      'No te mandamos a leer letra pequeña solo. Te explicamos paso a paso qué haremos, qué entregamos, en qué plazo y qué necesitamos de ti para blindar la operación.',
    pasos: [
      'Recorrido claro del trámite de principio a fin.',
      'Qué incluye el precio y qué queda fuera (sin sorpresas).',
      'Plazos orientativos y cómo verás el avance en el panel.',
      'Respuestas a dudas legales habituales en tu tipo de contrato.',
    ],
    incluye: [
      'Asesoramiento continuo antes y después de contratar',
      'Explicación en lenguaje claro, no jerga innecesaria',
      'Recomendación del servicio adecuado a tu situación',
      'Mismo interlocutor durante el expediente',
    ],
    imagen: '/amigos5.jpg',
    imagenAlt: 'Asesoramiento gestoría inmobiliaria online',
    invertido: true,
  },
  {
    id: 'contratacion',
    kicker: 'Paso 3',
    titulo: 'Si te encaja, contratas el servicio — IVA incluido',
    intro:
      'Cuando estés conforme, eliges el servicio en el catálogo y pagas la tarifa plana online. Precio cerrado según el trámite (desde 61 €), sin comisión sobre el precio del inmueble.',
    pasos: [
      'Catálogo con precios visibles e IVA incluido.',
      'Pago seguro con Stripe desde la web.',
      'Contrato de prestación de servicios y factura.',
      'Sin permanencia: pagas solo el trámite que contratas.',
    ],
    incluye: [
      'IVA incluido — precio cerrado por servicio',
      'Catálogo: alquiler, arras, compra, venta y revisiones',
      'Pago online en minutos',
      'Transparencia total antes de pagar',
    ],
    imagen: '/gestoria11.jpg',
    imagenAlt: 'Contratación online gestoría Inmonest',
  },
  {
    id: 'confirmacion',
    kicker: 'Paso 4',
    titulo: 'Confirmación de pago y gestor asignado',
    intro:
      'Tras el pago recibes confirmación al instante, se abre tu expediente en el panel y se asigna tu gestor con plazo orientativo de entrega (habitualmente 48 h laborables en contratos estándar).',
    pasos: [
      'Contratación en minutos desde la home o tras la primera llamada.',
      'Confirmación de pago y acceso a mi-cuenta / contratos.',
      'Asignación de gestor y plan: documentación → redacción → entrega.',
      'Estado del trámite visible desde el primer minuto.',
    ],
    incluye: [
      'Panel de seguimiento activo al contratar',
      'Email de confirmación con resumen del servicio',
      'Gestor asignado con contacto directo',
      'Plazos orientativos comunicados por escrito',
    ],
    imagen: '/businessman-checking-documents-table.jpg',
    imagenAlt: 'Confirmación de contratación gestoría',
    invertido: true,
  },
  {
    id: 'documentacion',
    kicker: 'Paso 5',
    titulo: 'Subes la documentación al panel o se la envías al gestor',
    intro:
      'Centralizamos datos de las partes e inmueble. Adjuntas DNI, contrato previo, nota simple o lo que aplique en el panel o por WhatsApp; el gestor te indica qué falta hasta completar el 100 %.',
    pasos: [
      'Checklist adaptada a tu servicio en el panel.',
      'Subida segura de archivos o envío al gestor.',
      'Recordatorios hasta tener toda la información.',
      'Sin desplazamientos a ninguna oficina.',
    ],
    incluye: [
      'Panel con documentos y mensajes centralizados',
      'Guía de qué aportar en cada tipo de trámite',
      'Canal WhatsApp con tu gestor',
      '100 % online en toda España',
    ],
    imagen: '/gestoria15.jpg',
    imagenAlt: 'Subida de documentación al panel Inmonest',
  },
  {
    id: 'trabajo-gestor',
    kicker: 'Paso 6',
    titulo: 'Tu gestor empieza a trabajar en la operación',
    intro:
      'Con la documentación lista, redactamos o revisamos tu contrato, te enviamos borrador para validar y entregamos el PDF firmable. Acompañamos hasta la entrega y una ronda de cambios incluida en el precio.',
    pasos: [
      'Redacción o revisión personalizada — no plantilla genérica.',
      'Borrador en PDF para revisar con calma.',
      'Ajustes acordados con tu gestor por teléfono o WhatsApp.',
      'Entrega final en panel y orientación sobre firma y siguientes pasos.',
    ],
    incluye: [
      'Trabajo del gestor visible en el panel (“En elaboración”)',
      'Ronda de cambios incluida en el precio cerrado',
      'PDF listo para firmar entre las partes',
      'Soporte hasta cerrar el trámite contratado',
    ],
    imagen: '/contrato1.jpg',
    imagenAlt: 'Gestor trabajando en contrato inmobiliario',
    invertido: true,
  },
]

export const HOME_PROCESO_NAV = HOME_PROCESO_BLOQUES.map((b) => ({
  id: b.id,
  label: b.kicker,
}))
