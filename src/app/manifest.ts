import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Inmonest — Contratos inmobiliarios y pisos P2P',
    short_name: 'Inmonest',
    description:
      'Contratos inmobiliarios desde 61 € en 48 h. Arras, alquiler LAU y portal de pisos entre particulares.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#1a0d00',
    theme_color: '#1a0d00',
    lang: 'es',
    dir: 'ltr',
    categories: ['business', 'finance', 'real estate'],
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: 'Buscar pisos',
        short_name: 'Pisos',
        url: '/pisos',
        icons: [{ src: '/icon-192x192.png', sizes: '192x192' }],
      },
      {
        name: 'Gestoría',
        short_name: 'Gestoría',
        url: '/gestoria',
        icons: [{ src: '/icon-192x192.png', sizes: '192x192' }],
      },
    ],
  }
}
