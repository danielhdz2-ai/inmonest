export type LocalRegulationBlock = {
  titulo: string
  items: string[]
}

const REGULATIONS_BY_REGION: Record<string, LocalRegulationBlock[]> = {
  'Comunidad de Madrid': [
    {
      titulo: 'Documentación obligatoria en Madrid',
      items: [
        'Cédula de habitabilidad vigente',
        'Certificado energético actualizado',
        'IEE / ITE en edificios de más de 50 años',
        'Nota simple registral sin cargas ocultas',
      ],
    },
    {
      titulo: 'Particularidades de compra en Madrid',
      items: [
        'Plusvalía municipal (IIVTNU) a cargo del vendedor',
        'Operaciones rápidas: revisar contrato de reserva antes de firmar',
        'Verificar deudas de comunidad y derramas pendientes',
      ],
    },
  ],
  'Cataluña · Generalitat': [
    {
      titulo: 'Documentación obligatoria en Cataluña',
      items: [
        'Cédula de habitabilidad de la Generalitat (obligatoria)',
        'Certificado energético vigente',
        'ITE en edificios que la exijan',
        'Licencias de obra y reformas legalizadas',
      ],
    },
    {
      titulo: 'Particularidades en Barcelona y área metropolitana',
      items: [
        'Zonas tensionadas: límites de precio en alquiler (relevante si compras para invertir)',
        'Compradores extranjeros: verificar NIE y documentación bancaria',
        'Comunidades con estatutos restrictivos (alquiler turístico, mascotas)',
      ],
    },
  ],
  'Comunitat Valenciana': [
    {
      titulo: 'Documentación obligatoria en Valencia',
      items: [
        'Cédula de habitabilidad de la Generalitat Valenciana',
        'Certificado energético',
        'IEE en edificios antiguos',
        'Certificado de deudas de la comunidad',
      ],
    },
    {
      titulo: 'Riesgos frecuentes en compraventa valenciana',
      items: [
        'Viviendas turísticas mal inscritas en el Registro de Turisme',
        'Derramas de rehabilitación de fachada en edificios costeros',
        'Discrepancias entre catastro y superficie real',
      ],
    },
  ],
  Andalucía: [
    {
      titulo: 'Documentación obligatoria en Andalucía',
      items: [
        'Cédula de habitabilidad o certificado equivalente',
        'Certificado energético vigente',
        'IEE (Informe de Evaluación del Edificio) si aplica',
        'Licencias de obra en reformas recientes',
      ],
    },
    {
      titulo: 'Particularidades en Sevilla y Málaga',
      items: [
        'Verificar situación urbanística en suelos rústicos o semi-rústicos en periferia',
        'Comunidades con alto peso de turismo: estatutos restrictivos',
        'IBI y plusvalía municipal al día antes de escritura',
      ],
    },
  ],
  Aragón: [
    {
      titulo: 'Documentación en Aragón',
      items: [
        'Cédula de habitabilidad vigente',
        'Certificado energético',
        'ITE / IEE si el edificio lo exige',
        'Nota simple y certificado de comunidad',
      ],
    },
    {
      titulo: 'Comprar de particular en Zaragoza',
      items: [
        'Mercado en crecimiento: operaciones rápidas, revisar reserva antes de señal',
        'Verificar plusvalía municipal e IBI al corriente',
        'Compradores desde fuera: coordinación online con notaría zaragozana',
      ],
    },
  ],
  'País Vasco · Bizkaia': [
    {
      titulo: 'Documentación en Bizkaia',
      items: [
        'Cédula de habitabilidad',
        'Certificado energético',
        'ITE en edificios antiguos',
        'Verificación de normativa foral en transmisión',
      ],
    },
    {
      titulo: 'Comprar de particular en Bilbao',
      items: [
        'Plusvalía municipal de Bizkaia: verificar liquidación del vendedor',
        'Edificios del casco histórico: ITE y estado de conservación',
        'Operaciones rápidas: revisar reserva y arras antes de entregar señal',
        'Compradores desde fuera: coordinación online con notaría bilbaína',
      ],
    },
  ],
  'Castilla y León': [
    {
      titulo: 'Documentación para vender en Castilla y León',
      items: [
        'Cédula de habitabilidad vigente',
        'Certificado energético actualizado',
        'Nota simple registral sin cargas ocultas',
        'Certificado de deudas de la comunidad',
      ],
    },
    {
      titulo: 'Particularidades en Salamanca y Valladolid',
      items: [
        'Plusvalía municipal (IIVTNU) a cargo del vendedor',
        'Verificar estado de conservación en edificios históricos del centro',
        'IBI y suministros al corriente antes de escritura',
        'Compradores desde Madrid: operación 100% online con notaría local',
      ],
    },
  ],
  'Illes Balears · Normativa balear': [
    {
      titulo: 'Documentación en Baleares',
      items: [
        'Cédula de habitabilidad balear vigente',
        'Certificado energético',
        'Depósito IBAVI si aplica a la operación',
        'Nota simple y certificado de deudas de comunidad',
      ],
    },
    {
      titulo: 'Comprar de particular en Mallorca',
      items: [
        'Zonas tensionadas: límites de precio si compras para alquilar',
        'Viviendas turísticas: verificar licencia y estatutos de comunidad',
        'Compradores no residentes: NIE y documentación bancaria',
      ],
    },
  ],
  Galicia: [
    {
      titulo: 'Documentación en Galicia',
      items: [
        'Cédula de habitabilidad de la Xunta',
        'Certificado energético',
        'ITE si aplica por antigüedad del edificio',
        'Licencias de obra en reformas',
      ],
    },
    {
      titulo: 'Comprar de particular en A Coruña',
      items: [
        'Mercado con muchas operaciones directas: revisar reserva antes de señal',
        'Verificar deudas de comunidad y derramas en edificios costeros',
        'Discrepancias entre catastro y superficie real en viviendas antiguas',
        'Compradores desde fuera: operación 100% online con notaría local',
      ],
    },
  ],
  'Región de Murcia': [
    {
      titulo: 'Documentación en la Región de Murcia',
      items: [
        'Cédula de habitabilidad vigente',
        'Certificado energético actualizado',
        'Nota simple registral sin cargas ocultas',
        'Certificado de deudas de la comunidad',
      ],
    },
    {
      titulo: 'Comprar de particular en Murcia',
      items: [
        'Mercado accesible: muchas operaciones entre particulares sin intermediario',
        'Verificar IBI y plusvalía municipal al corriente',
        'Operaciones en Cartagena y Lorca: misma coordinación online',
        'Revisar arras antes de entregar señal: plazos para hipoteca',
      ],
    },
  ],
  Navarra: [
    {
      titulo: 'Documentación en Navarra',
      items: [
        'Cédula de habitabilidad vigente',
        'Certificado energético',
        'ITE en edificios que la exijan',
        'Nota simple y certificado de deudas de comunidad',
      ],
    },
    {
      titulo: 'Comprar de particular en Pamplona',
      items: [
        'Normativa foral navarra en impuestos de transmisión (ITP)',
        'Plusvalía municipal: liquidación a cargo del vendedor',
        'Casco antiguo: verificar protección patrimonial y licencias',
        'Compradores desde Madrid u otras CCAA: gestión online con notaría pamplonesa',
      ],
    },
  ],
}

const DEFAULT_REGULATIONS: LocalRegulationBlock[] = [
  {
    titulo: 'Documentación mínima en toda compraventa',
    items: [
      'Nota simple registral actualizada',
      'Certificado de deudas de la comunidad',
      'IBI y suministros al día',
      'Certificado energético y cédula de habitabilidad si aplica',
    ],
  },
]

export function getLocalRegulations(region: string): LocalRegulationBlock[] {
  return REGULATIONS_BY_REGION[region] ?? DEFAULT_REGULATIONS
}
