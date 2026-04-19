/**
 * Devuelve la Stripe Secret Key limpia como string.
 *
 * Problema conocido: si la clave se subió a Vercel via PowerShell con
 * Set-Content -Encoding Byte, el valor llega como bytes separados por espacio
 * ("115 107 95 116 101 ...") en lugar del string real ("sk_test_51...").
 * Esta función detecta ese caso y lo decodifica automáticamente.
 */
export function getStripeKey(): string {
  const raw = process.env.STRIPE_SECRET_KEY ?? ''
  return decodeEnvKey(raw)
}

/**
 * Decodifica una variable de entorno que puede haberse guardado como bytes.
 *
 * Casos que maneja:
 *  1. Bytes ASCII separados por espacio: "115 107 95 ..." → "sk_..."
 *  2. BOM UTF-8 al inicio (\uFEFF o \xEF\xBB\xBF en raw)
 *  3. Null bytes (\x00), CR (\r), tabs, non-printable ASCII
 *  4. Espacios internos (claves pegadas con espacio por error de copiar-pegar)
 *
 * En todos los casos devuelve solo los caracteres ASCII imprimibles (0x21-0x7E).
 */
export function decodeEnvKey(raw: string): string {
  // Convertir a string seguro y quitar BOM + whitespace externo
  let s = String(raw ?? '')
    .replace(/^\uFEFF/, '')   // BOM UTF-8
    .trim()

  if (!s) return ''

  // ── Caso 1: bytes ASCII separados por espacio ────────────────────────
  const parts = s.split(/\s+/)
  if (
    parts.length > 10 &&
    parts.every(p => /^\d{1,3}$/.test(p) && parseInt(p, 10) <= 255)
  ) {
    const decoded = parts.map(p => String.fromCharCode(parseInt(p, 10))).join('')
    console.warn(
      '[stripe-key] AVISO: clave en formato bytes. Decodificada OK.' +
      ' Vuelve a subir la clave directamente en Vercel Dashboard (no con PowerShell Set-Content).'
    )
    s = decoded
  }

  // ── Paso final: eliminar CUALQUIER carácter no imprimible (null bytes,
  //    CR, LF, tabs, Unicode fuera del rango ASCII imprimible) ──────────
  const clean = s.replace(/[^\x21-\x7E]/g, '')

  if (clean !== s.trim()) {
    console.warn(
      '[stripe-key] AVISO: se eliminaron caracteres no imprimibles de la clave.' +
      ` Longitud original: ${s.length}, limpia: ${clean.length}.`
    )
  }

  return clean
}

