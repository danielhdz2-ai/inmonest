import { GESTORIA_CIUDADES_EXPANSION_SLUGS } from '@/lib/gestoria-ciudades-expansion'

/** Ciudades con landing en data pero sin carpeta estática bajo /gestoria/.../[ciudad] (servicios Castellón) */
export const GESTORIA_CIUDADES_SOLO_RUTA_DINAMICA = ['castellon'] as const

/** Due diligence (y futuros servicios solo dinámicos) para ciudades de expansión geográfica */
export const GESTORIA_DUE_DILIGENCE_RUTA_DINAMICA = [
  'castellon',
  ...GESTORIA_CIUDADES_EXPANSION_SLUGS,
] as const

export function isGestoriaCiudadSoloRutaDinamica(slug: string): boolean {
  return (GESTORIA_CIUDADES_SOLO_RUTA_DINAMICA as readonly string[]).includes(slug)
}

export function gestoriaCiudadesSoloRutaDinamicaParams() {
  return GESTORIA_CIUDADES_SOLO_RUTA_DINAMICA.map((ciudad) => ({ ciudad }))
}

export function gestoriaDueDiligenceDinamicaParams() {
  return GESTORIA_DUE_DILIGENCE_RUTA_DINAMICA.map((ciudad) => ({ ciudad }))
}
