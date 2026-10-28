/** Despacho Inmonest — Les Corts (Barcelona) */
export const INMONEST_OFICINA_BARCELONA = {
  nombre: 'Despacho Inmonest · Les Corts',
  calle: 'Carrer de Mejía Lequerica, 44',
  barrio: 'Les Corts',
  cp: '08028',
  ciudad: 'Barcelona',
  direccionCompleta: 'Carrer de Mejía Lequerica, 44, Les Corts, 08028 Barcelona',
  /** Enlace para abrir en Google Maps (app / navegador) */
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Carrer+de+Mej%C3%ADa+Lequerica+44+08028+Barcelona',
  /** Embed en www.google.com (CSP frame-src); misma dirección que mapsUrl */
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Carrer+de+Mej%C3%ADa+Lequerica,+44,+Les+Corts,+08028+Barcelona,+Espa%C3%B1a&hl=es&z=16&output=embed',
  /** Vista estática OpenStreetMap por si el iframe de Google falla en algún navegador */
  osmEmbedUrl:
    'https://www.openstreetmap.org/export/embed.html?bbox=2.1178%2C41.3828%2C2.1280%2C41.3876&layer=mapnik&marker=41.3852%2C2.1229',
  horario: 'Atención presencial con cita previa · L–V 9:00–19:00',
  nota: 'Trámite 100 % online con panel de cliente; el despacho sirve para entrega de documentación, firma de autorizaciones o reuniones con tu gestor cuando lo necesites.',
} as const
