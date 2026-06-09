export type Testimonio = {
  id: number
  nombre: string
  ciudad: string
  servicio: string
  foto: string
  rating: number
  texto: string
  fecha: string
  ahorro?: string
}

export const TESTIMONIOS: Testimonio[] = [
  {
    id: 1,
    nombre: 'María González',
    ciudad: 'Barcelona',
    servicio: 'Venta completa reserva-escritura',
    foto: '/familia1.jpg',
    rating: 5,
    texto: 'Vendí mi piso sin agencia gracias a Inmonest. El gestor personalizado me guió en cada paso desde la reserva hasta las escrituras. Me ahorré más de 12,000€ en comisiones y todo el proceso fue transparente y profesional.',
    fecha: 'Mayo 2026',
    ahorro: '12,000€',
  },
  {
    id: 2,
    nombre: 'Carlos Ruiz',
    ciudad: 'Madrid',
    servicio: 'Revisión contrato arras',
    foto: '/familia2.jpg',
    rating: 5,
    texto: 'Iba a firmar un contrato de arras con cláusulas abusivas que me hubieran costado 15,000€ si el vendedor se echaba atrás. La revisión legal de Inmonest detectó el problema y me salvó de una situación muy complicada.',
    fecha: 'Abril 2026',
  },
  {
    id: 3,
    nombre: 'Laura Martínez',
    ciudad: 'Valencia',
    servicio: 'Contrato alquiler LAU',
    foto: '/familia3.jpg',
    rating: 5,
    texto: 'Necesitaba un contrato de alquiler urgente y legal. En 48h tenía el contrato adaptado a la nueva Ley de Vivienda 2026. Mi inquilino y yo firmamos tranquilos sabiendo que todo estaba en regla.',
    fecha: 'Mayo 2026',
  },
  {
    id: 4,
    nombre: 'Javier López',
    ciudad: 'Sevilla',
    servicio: 'Compra completa reserva-escritura',
    foto: '/familia5.jpg',
    rating: 5,
    texto: 'Comprar mi primer piso era un proceso que me daba miedo por toda la burocracia. El servicio de acompañamiento completo fue perfecto: me explicaron cada paso, revisaron toda la documentación y coordinaron con la notaría. Valió cada euro.',
    fecha: 'Marzo 2026',
  },
  {
    id: 5,
    nombre: 'Ana Fernández',
    ciudad: 'Málaga',
    servicio: 'Due diligence pre-compra',
    foto: '/familia6.jpg',
    rating: 5,
    texto: 'Después de firmar las arras, contraté el pack de Due Diligence. Descubrieron derramas pendientes de 8,000€ que el vendedor no había mencionado. Pude negociar el precio final y evitar una sorpresa muy desagradable.',
    fecha: 'Abril 2026',
    ahorro: '8,000€',
  },
]
