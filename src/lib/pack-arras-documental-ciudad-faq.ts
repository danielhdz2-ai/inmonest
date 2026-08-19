export type PackArrasDocumentalFaqItem = { q: string; a: string }

export function getPackArrasDocumentalFaq(
  nombre: string,
  region: string,
  prioritarias: PackArrasDocumentalFaqItem[] = [],
): PackArrasDocumentalFaqItem[] {
  const base: PackArrasDocumentalFaqItem[] = [
    {
      q: '¿Qué incluye exactamente el Pack Arras Plus?',
      a: `Incluye la redacción personalizada de tu contrato de arras penitenciales (PDF en 48h) más la revisión documental completa del inmueble: nota simple, actas de comunidad, derramas, ITE, certificados obligatorios en ${region} e informe escrito con hallazgos. Todo por 450€ IVA incluido en ${nombre}.`,
    },
    {
      q: '¿En qué se diferencia del Pack Due Diligence (350€)?',
      a: 'El Due Diligence es solo auditoría documental, habitualmente tras firmar arras. El Pack Arras Plus añade la redacción de arras penitenciales y la revisión documental integral en un único servicio pensado para compradores entre particulares que aún no han blindado la operación.',
    },
    {
      q: '¿Cuánto tarda el pack completo?',
      a: 'Las arras se entregan en 48 horas laborables desde que tenemos los datos de la operación. La revisión documental e informe suelen completarse en 3–5 días laborables adicionales, según la documentación que aporte el vendedor.',
    },
    {
      q: '¿Puedo contratar si el vendedor ya me ha pasado un borrador de arras?',
      a: 'Sí. Podemos partir de ese borrador, corregir cláusulas abusivas o desequilibradas y, en paralelo, auditar la documentación del inmueble. Si prefieres arras desde cero, también las redactamos nosotros.',
    },
    {
      q: `¿Conocéis la normativa de compraventa en ${region}?`,
      a: `Sí. Verificamos la documentación exigida en ${nombre} y ${region}: cédula de habitabilidad, certificado energético, inspecciones técnicas, licencias de obra y requisitos autonómicos que muchos vendedores particulares no aportan espontáneamente.`,
    },
    {
      q: '¿Por qué 450€ y no una comisión de agencia?',
      a: 'Inmonest es gestoría, no agencia. Cobramos tarifa plana por redactar arras y revisar documentación. No llevamos comisión sobre el precio del piso ni defendemos al vendedor: trabajamos exclusivamente para el comprador.',
    },
    {
      q: '¿Qué pasa si detectáis un problema grave en la documentación?',
      a: 'Te lo comunicamos antes o justo después de firmar arras, con detalle y opciones: renegociar precio, exigir subsanación, incluir condiciones suspensivas o desistir si el riesgo es inasumible.',
    },
    {
      q: '¿El gestor sigue disponible después de entregar las arras?',
      a: 'Sí. El mismo gestor resuelve dudas sobre el informe documental, negociación con el vendedor y preparación de la fase pre-escritura. No desaparecemos tras enviar el PDF.',
    },
  ]

  return prioritarias.length > 0 ? [...prioritarias, ...base] : base
}
