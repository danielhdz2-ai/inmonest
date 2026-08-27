import type { PartesFormData } from '@/components/GestoriaPartesForm'

export const PARTES_FIELD_LABELS: { key: keyof PartesFormData; label: string; group?: string }[] = [
  { key: 'direccion_inmueble', label: 'Dirección del inmueble', group: 'Inmueble' },
  { key: 'precio', label: 'Precio / Renta', group: 'Inmueble' },
  { key: 'condiciones', label: 'Condiciones acordadas', group: 'Inmueble' },
  { key: 'parte1_nombre', label: 'Nombre completo', group: 'Parte 1' },
  { key: 'parte1_dni', label: 'DNI / NIE', group: 'Parte 1' },
  { key: 'parte1_email', label: 'Email', group: 'Parte 1' },
  { key: 'parte1_telefono', label: 'Teléfono', group: 'Parte 1' },
  { key: 'parte2_nombre', label: 'Nombre completo', group: 'Parte 2' },
  { key: 'parte2_dni', label: 'DNI / NIE', group: 'Parte 2' },
  { key: 'parte2_email', label: 'Email', group: 'Parte 2' },
  { key: 'parte2_telefono', label: 'Teléfono', group: 'Parte 2' },
  { key: 'notas', label: 'Notas adicionales', group: 'Otros' },
]

export function isPartesJsonDoc(doc: { doc_key?: string; file_name?: string }): boolean {
  return doc.doc_key === 'partes' || (doc.file_name?.toLowerCase().endsWith('.json') ?? false)
}
