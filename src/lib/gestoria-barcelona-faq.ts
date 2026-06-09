export const GESTORIA_BARCELONA_FAQ = [
  {
    q: '¿Es obligatoria la cédula de habitabilidad para vender un piso en Barcelona?',
    a: 'Sí. En Cataluña la cédula de habitabilidad es obligatoria para transmitir cualquier vivienda. Sin ella la operación puede bloquearse en notaría. Inmonest verifica su vigencia como parte del servicio.',
  },
  {
    q: '¿Cómo afecta la declaración de zona tensionada al contrato de alquiler en Barcelona?',
    a: 'En zonas tensionadas como Barcelona, el precio del alquiler está limitado al índice de referencia de precios de la Generalitat. Los contratos deben incluir cláusulas específicas de prórroga y condiciones especiales. Nuestros contratos LAU ya están adaptados a esta normativa.',
  },
  {
    q: '¿Qué diferencia hay entre contratar una gestoría y una agencia inmobiliaria en Barcelona?',
    a: 'Una agencia cobra entre el 3% y el 5% del precio de venta (entre 12.000€ y 20.000€ en Barcelona). Una gestoría como Inmonest cobra honorarios fijos desde 120€ por contrato o 687€ por acompañamiento completo hasta escritura.',
  },
  {
    q: '¿Cuánto tiempo tarda la gestión de una compraventa en Barcelona?',
    a: 'El proceso completo desde reserva hasta escritura suele durar entre 4 y 8 semanas en Barcelona, dependiendo de la disponibilidad notarial y la documentación. Inmonest coordina todos los plazos para minimizar retrasos.',
  },
] as const

export function gestoriaBarcelonaFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GESTORIA_BARCELONA_FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}
