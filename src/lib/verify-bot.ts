/**
 * Protección anti-bot para formularios públicos.
 * Combina honeypot, timing, heurísticas de contenido y Cloudflare Turnstile.
 */

export interface BotProtectionPayload {
  _hp?: string
  _ts?: number | string
  turnstile_token?: string
}

export interface HumanTextFields {
  name?: string
  phone?: string
  notes?: string
  email?: string
}

type VerifyResult =
  | { allowed: true; isHoneypot: false }
  | { allowed: false; isHoneypot: true }
  | { allowed: false; isHoneypot: false; status: number; error: string }

const MIN_FORM_MS = 3_000
const MAX_FORM_MS = 3_600_000

/** Vocales en español + inglés para detectar texto aleatorio */
const VOWEL_RE = /[aeiouáéíóúüAEIOUÁÉÍÓÚÜ]/g

/**
 * Detecta cadenas aleatorias tipo SCziCzCsEAlbXNrpJZZvVgf
 */
export function looksLikeGibberish(text: string): boolean {
  const s = text.trim()
  if (!s || s.length < 10) return false

  const letters = s.replace(/[\s\d+\-().]/g, '')
  if (letters.length < 10) return false

  const vowels = (letters.match(VOWEL_RE) ?? []).length
  const vowelRatio = vowels / letters.length

  // Texto largo sin espacios y casi sin vocales
  if (s.length >= 12 && !/\s/.test(s) && vowelRatio < 0.18) return true

  // Mezcla caótica de mayúsculas/minúsculas sin vocales suficientes
  if (
    /^[A-Za-z]+$/.test(letters) &&
    /[a-z]/.test(letters) &&
    /[A-Z]/.test(letters) &&
    vowelRatio < 0.22
  ) {
    return true
  }

  return false
}

/** Teléfono válido: al menos 7 dígitos y no parece texto aleatorio */
export function isValidPhone(phone: string): boolean {
  const s = phone.trim()
  if (!s) return true
  const digits = s.replace(/\D/g, '')
  if (digits.length < 7 || digits.length > 15) return false
  if (looksLikeGibberish(s)) return false
  return true
}

/** Nombre válido: no vacío y no parece bot */
export function isValidHumanName(name: string): boolean {
  const s = name.trim()
  if (s.length < 2) return false
  if (looksLikeGibberish(s)) return false
  return true
}

async function verifyTurnstileToken(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true

  const body = new URLSearchParams({
    secret,
    response: token,
  })
  if (ip) body.set('remoteip', ip)

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch {
    return false
  }
}

/**
 * Verifica señales anti-bot del payload.
 * Si isHoneypot=true, devolver respuesta falsa de éxito sin procesar.
 */
export async function verifyBotSubmission(
  body: BotProtectionPayload,
  ip?: string,
): Promise<VerifyResult> {
  // Honeypot: bots rellenan el campo oculto
  if (body._hp && String(body._hp).trim() !== '') {
    return { allowed: false, isHoneypot: true }
  }

  const ts = Number(body._ts)
  if (!Number.isFinite(ts) || ts <= 0) {
    return {
      allowed: false,
      isHoneypot: false,
      status: 422,
      error: 'Formulario inválido. Recarga la página e inténtalo de nuevo.',
    }
  }

  const elapsed = Date.now() - ts
  if (elapsed < MIN_FORM_MS) {
    return {
      allowed: false,
      isHoneypot: false,
      status: 422,
      error: 'Envío demasiado rápido. Espera unos segundos e inténtalo de nuevo.',
    }
  }

  if (elapsed > MAX_FORM_MS) {
    return {
      allowed: false,
      isHoneypot: false,
      status: 422,
      error: 'El formulario ha expirado. Recarga la página e inténtalo de nuevo.',
    }
  }

  // Turnstile obligatorio si hay secret key configurada
  if (process.env.TURNSTILE_SECRET_KEY) {
    const token = body.turnstile_token?.trim()
    if (!token) {
      return {
        allowed: false,
        isHoneypot: false,
        status: 422,
        error: 'Completa la verificación de seguridad.',
      }
    }
    const valid = await verifyTurnstileToken(token, ip)
    if (!valid) {
      return {
        allowed: false,
        isHoneypot: false,
        status: 422,
        error: 'Verificación de seguridad fallida. Recarga la página.',
      }
    }
  }

  return { allowed: true, isHoneypot: false }
}

/** Valida campos de texto que suelen rellenar los bots con basura */
export function validateHumanFields(fields: HumanTextFields): string | null {
  if (fields.name !== undefined && !isValidHumanName(fields.name)) {
    return 'El nombre no parece válido.'
  }
  if (fields.phone !== undefined && !isValidPhone(fields.phone)) {
    return 'El teléfono no parece válido.'
  }
  if (fields.notes !== undefined && fields.notes.trim() && looksLikeGibberish(fields.notes)) {
    return 'Los detalles adicionales no parecen válidos.'
  }
  return null
}

export function isTurnstileEnabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
}
