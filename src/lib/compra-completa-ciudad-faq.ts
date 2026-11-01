import type { DueDiligenceFaqItem } from './due-diligence-ciudad-faq'

export function getCompraCompletaFaq(
  nombre: string,
  region: string,
  precioEjemplo: number,
  prioritarias: DueDiligenceFaqItem[] = [],
): DueDiligenceFaqItem[] {
  const base: DueDiligenceFaqItem[] = [
    {
      q: `¿Cuánto cuesta la compra completa con gestoría en ${nombre}?`,
      a: `687 € IVA incluido por acompañamiento desde due diligence y arras hasta escritura. Sin comisión de agencia sobre el precio del piso (0 % captación).`,
    },
    {
      q: '¿Qué incluye el pack compra completa?',
      a: 'Gestor dedicado, revisión registral y de comunidad, redacción o corrección de arras con cláusula de hipoteca, checklist documental, coordinación con banco y notaría hasta minuta de escritura.',
    },
    {
      q: '¿Debo contratar antes de entregar señal?',
      a: 'Lo ideal es antes de arras o señal elevada. Si ya firmaste borrador, lo revisamos de urgencia. La due diligence previa evita perder dinero por cargas ocultas o derramas.',
    },
    {
      q: `¿Conocéis la documentación exigida en ${region}?`,
      a: `Sí. Cédula de habitabilidad, certificado energético, certificado de deudas de comunidad, actas recientes (ITE, derramas) y coherencia entre precio en contrato e ITP en ${nombre}.`,
    },
    {
      q: '¿687 € incluye ITP, notaría o registro?',
      a: 'No. Es la tarifa de gestoría Inmonest. El ITP lo liquida el comprador tras escritura; notaría y registro van aparte según tarifas oficiales.',
    },
    {
      q: '¿Puedo hacer todo online?',
      a: 'Sí en toda España. En Barcelona puedes combinar panel online con cita en Mejía Lequerica 44 (Les Corts) para revisar originales sin suplemento.',
    },
    {
      q: '¿Qué pasa si el banco deniega la hipoteca?',
      a: 'Redactamos o corregimos la cláusula suspensiva con plazo y documentación exigible para recuperar la señal si la financiación no sale.',
    },
    {
      q: `¿Compráis el piso o buscáis inmuebles en ${nombre}?`,
      a: 'No somos agencia: no captamos pisos ni negociamos precio por ti. Entramos cuando ya tienes vivienda y vendedor (portal, boca a boca o contacto directo).',
    },
    {
      q: '¿Revisáis arras que me pasa el vendedor?',
      a: 'Sí. Corregimos cláusulas abusivas, plazos irreales o ausencia de condición suspensiva antes de que firmes.',
    },
    {
      q: '¿Cuánto tarda hasta escritura?',
      a: 'Suele ser 1–3 meses según hipoteca, documentación del vendedor y notaría. Tu gestor fija calendario desde la primera llamada.',
    },
    {
      q: `¿Tenéis landings por barrio en Barcelona?`,
      a: 'Sí: más de 15 barrios con guía local en /barcelona/compra-completa/[barrio] — mercado, FAQ ampliada y contenido editorial único.',
    },
    {
      q: '¿Incluye tasación o negociación de precio?',
      a: 'No incluye tasación oficial ni negociación comercial. Sí orientación sobre hallazgos documentales para renegociar si procede.',
    },
  ]

  const seen = new Set<string>()
  const merged: DueDiligenceFaqItem[] = []
  for (const item of [...prioritarias, ...base]) {
    const key = item.q.trim()
    if (seen.has(key)) continue
    seen.add(key)
    merged.push(item)
  }
  return merged
}
