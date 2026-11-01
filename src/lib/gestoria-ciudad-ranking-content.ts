export type CiudadRankingBlock = { h3: string; body: string }
export type CiudadRankingLink = { href: string; label: string; className?: string }

export type CiudadRankingConfig = {
  sections: readonly CiudadRankingBlock[]
  links: readonly CiudadRankingLink[]
}

export const GESTORIA_CIUDAD_RANKING: Record<string, CiudadRankingConfig> = {
  barcelona: {
    sections: [
      {
        h3: 'Servicios de gestoría inmobiliaria que más piden en Barcelona',
        body:
          'Contrato de alquiler LAU en zona tensionada, arras penitenciales entre particulares, revisión de borradores antes de entregar señal y packs de venta o compra completa hasta escritura (687 €). Normativa catalana: cédula, ITE, comunidad y notarías de Barcelona y área metropolitana.',
      },
      {
        h3: 'Gestoría inmobiliaria online y despacho en Les Corts',
        body:
          'Trámite 100 % online o cita en Mejía Lequerica 44 para revisar originales. Mismo gestor en ambos canales.',
      },
      {
        h3: 'Por barrio: venta y compra completa',
        body:
          'Landings por zona (Eixample, Gràcia, Sants, Poblenou, Les Corts…) con mercado local, FAQ y packs sin comisión de agencia.',
      },
    ],
    links: [
      { href: '/gestoria/solicitar/contrato-alquiler?ciudad=barcelona', label: 'Contratar LAU Barcelona' },
      { href: '/barcelona/venta-completa/eixample', label: 'Venta completa Eixample' },
      { href: '/barcelona/compra-completa/eixample', label: 'Compra completa Eixample', className: 'text-emerald-800' },
      { href: '/contratos-inmobiliarios/barcelona', label: 'Contratos inmobiliarios Barcelona', className: 'text-gray-700' },
    ],
  },
  madrid: {
    sections: [
      {
        h3: 'Gestoría inmobiliaria en Madrid: qué incluye',
        body:
          'Redacción de contratos LAU y arras, revisión registral, ITE en edificios de más de 50 años, plusvalía municipal y coordinación con notaría en capital y área metropolitana. Honorarios fijos: desde 145 € por contrato o 687 € venta/compra completa — sin comisión del 3–5 % de agencia.',
      },
      {
        h3: 'Compraventa entre particulares en la Comunidad de Madrid',
        body:
          'Si ya tienes comprador o vendedor, el pack hasta escritura incluye gestor dedicado, checklist documental y seguimiento hasta minuta. Trámite online con panel y WhatsApp.',
      },
      {
        h3: 'Alquiler LAU adaptado a Ley de Vivienda 2026',
        body:
          'Contratos para vivienda habitual con cláusulas personalizadas, fianza legal y entrega en 48 h. También revisión de borradores que te envíe la otra parte.',
      },
    ],
    links: [
      { href: '/gestoria/solicitar/contrato-alquiler?ciudad=madrid', label: 'Contratar LAU Madrid' },
      { href: '/gestoria/venta-completa-reserva-escritura/madrid', label: 'Venta completa Madrid' },
      { href: '/gestoria/compra-completa-reserva-escritura/madrid', label: 'Compra completa Madrid', className: 'text-emerald-800' },
      { href: '/contratos-inmobiliarios/madrid', label: 'Contratos inmobiliarios Madrid', className: 'text-gray-700' },
    ],
  },
  valencia: {
    sections: [
      {
        h3: 'Gestoría inmobiliaria en Valencia para particulares',
        body:
          'Contratos de alquiler con cédula de habitabilidad valenciana, arras entre particulares, due diligence tras señal y acompañamiento hasta escritura. Tarifa plana 687 € en venta/compra completa; 0 % de captación inmobiliaria.',
      },
      {
        h3: 'Normativa autonómica y mercado local',
        body:
          'Generalitat Valenciana, alquiler turístico (VUT) donde aplica, y revisión documental en Ruzafa, Benimaclet, Campanar o área metropolitana. Gestor asignado en 24 h.',
      },
      {
        h3: 'Online en toda España, foco en la Comunitat',
        body:
          'Panel de cliente, PDF firmable y coordinación con notarías de Valencia y provincia. Misma calidad que una gestoría presencial, sin desplazamientos obligatorios.',
      },
    ],
    links: [
      { href: '/gestoria/solicitar/contrato-alquiler?ciudad=valencia', label: 'Contratar LAU Valencia' },
      { href: '/gestoria/venta-completa-reserva-escritura/valencia', label: 'Venta completa Valencia' },
      { href: '/gestoria/compra-completa-reserva-escritura/valencia', label: 'Compra completa Valencia', className: 'text-emerald-800' },
      { href: '/contratos-inmobiliarios/valencia', label: 'Contratos inmobiliarios Valencia', className: 'text-gray-700' },
    ],
  },
}
