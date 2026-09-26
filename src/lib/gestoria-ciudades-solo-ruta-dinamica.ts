/** Ciudades con landing en data pero sin carpeta estática bajo /gestoria/.../[ciudad] */
export const GESTORIA_CIUDADES_SOLO_RUTA_DINAMICA = ['castellon'] as const

export function isGestoriaCiudadSoloRutaDinamica(slug: string): boolean {
  return (GESTORIA_CIUDADES_SOLO_RUTA_DINAMICA as readonly string[]).includes(slug)
}

export function gestoriaCiudadesSoloRutaDinamicaParams() {
  return GESTORIA_CIUDADES_SOLO_RUTA_DINAMICA.map((ciudad) => ({ ciudad }))
}
