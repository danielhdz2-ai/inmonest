/** Configuración compartida para subida de documentos de gestoría */

export const GESTORIA_DOC_KEYS = [
  'dni',
  'nomina',
  'escrituras',
  'nota-simple',
  'contrato-alquiler',
  'cert-energetico',
  'cedula-habitabilidad',
  'facturas',
  'partes',
  'otro',
] as const

export type GestoriaDocKey = (typeof GESTORIA_DOC_KEYS)[number]

/** Límite alineado con Supabase Storage (ajustable en dashboard del bucket) */
export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024 // 50 MB

export const ALLOWED_UPLOAD_MIMES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const

const EXT_TO_MIME: Record<string, string> = {
  pdf: 'application/pdf',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

export function sanitizeExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') ?? 'bin'
}

export function resolveUploadMimeType(fileName: string, reportedMime?: string | null): string | null {
  const normalized = reportedMime?.split(';')[0]?.trim().toLowerCase() ?? ''
  if (normalized && (ALLOWED_UPLOAD_MIMES as readonly string[]).includes(normalized)) {
    return normalized
  }

  const ext = sanitizeExtension(fileName)
  const fromExt = EXT_TO_MIME[ext]
  if (fromExt) return fromExt

  // Windows/Android a veces envían octet-stream para PDFs escaneados
  if (normalized === 'application/octet-stream' && ext === 'pdf') {
    return 'application/pdf'
  }

  return null
}

export function isAllowedDocKey(docKey: string): docKey is GestoriaDocKey {
  return (GESTORIA_DOC_KEYS as readonly string[]).includes(docKey)
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function validateUploadFile(
  fileName: string,
  mimeType: string | null | undefined,
  fileSizeBytes?: number | null,
): { ok: true; mime: string } | { ok: false; error: string } {
  if (!fileName?.trim()) {
    return { ok: false, error: 'Nombre de archivo inválido' }
  }

  const mime = resolveUploadMimeType(fileName, mimeType)
  if (!mime) {
    return {
      ok: false,
      error: 'Formato no permitido. Usa PDF, JPG, PNG, WEBP o Word (.doc/.docx)',
    }
  }

  if (fileSizeBytes != null && fileSizeBytes > MAX_UPLOAD_BYTES) {
    return {
      ok: false,
      error: `El archivo supera el límite de ${formatFileSize(MAX_UPLOAD_BYTES)}. Comprímelo o envíalo a info@inmonest.com`,
    }
  }

  if (fileSizeBytes != null && fileSizeBytes <= 0) {
    return { ok: false, error: 'El archivo está vacío' }
  }

  return { ok: true, mime }
}

export const MOBILE_FILE_ACCEPT =
  '.pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,application/pdf,image/*'

export const MOBILE_CAMERA_ACCEPT = 'image/*'

export function buildUserDocStoragePath(
  userId: string,
  docKey: string,
  fileName: string,
  requestId?: string | null,
): string {
  const ext = sanitizeExtension(fileName)
  const scope = requestId?.trim() || 'general'
  // Timestamp evita colisiones en re-subidas y problemas de caché CDN
  return `${userId}/${scope}/${docKey}/${Date.now()}.${ext}`
}

/** Cabeceras recomendadas para PUT directo a Supabase Storage */
export function storageUploadHeaders(contentType: string, upsert = true): HeadersInit {
  return {
    'Content-Type': contentType,
    ...(upsert ? { 'x-upsert': 'true' } : {}),
  }
}
