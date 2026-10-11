import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ParticularesGestoriaCiudadLanding from '@/components/ParticularesGestoriaCiudadLanding'
import { getAlquilerParticularesCiudadDatos } from '@/lib/alquiler-particulares-ciudad-datos'

const BASE_URL = 'https://inmonest.com'

const CIUDADES: Record<string, { nombre: string; precio: string; descripcion: string }> = {
  madrid: {
    nombre: 'Madrid',
    precio: '1.300 – 1.800 €/mes',
    descripcion:
      'Gestoría inmobiliaria online en Madrid: contrato LAU, arras y revisión legal para particulares. Sin comisiones de agencia.',
  },
  barcelona: {
    nombre: 'Barcelona',
    precio: '1.400 – 2.000 €/mes',
    descripcion:
      'Particulares en Barcelona: LAU con IRAV e INCASÒL cuando aplica. Inmonest redacta y entrega en 48 h.',
  },
  valencia: {
    nombre: 'Valencia',
    precio: '800 – 1.200 €/mes',
    descripcion: 'Contratos de alquiler y arras en Valencia para propietarios e inquilinos particulares.',
  },
  sevilla: {
    nombre: 'Sevilla',
    precio: '700 – 1.100 €/mes',
    descripcion: 'Gestoría online en Sevilla: formaliza tu alquiler con LAU desde 145 €.',
  },
  malaga: {
    nombre: 'Málaga',
    precio: '1.000 – 1.600 €/mes',
    descripcion: 'Alquiler en Málaga entre particulares: apoyo jurídico Inmonest, no portal de pisos.',
  },
  bilbao: {
    nombre: 'Bilbao',
    precio: '900 – 1.400 €/mes',
    descripcion: 'Contrato LAU en Bilbao con gestor experto y precio cerrado.',
  },
  zaragoza: {
    nombre: 'Zaragoza',
    precio: '600 – 950 €/mes',
    descripcion: 'Gestoría para alquiler y compraventa en Zaragoza.',
  },
  alicante: {
    nombre: 'Alicante',
    precio: '700 – 1.150 €/mes',
    descripcion: 'Particulares en Alicante: contrato alquiler LAU y arras online.',
  },
}

export function generateStaticParams() {
  return Object.keys(CIUDADES).map((ciudad) => ({ ciudad }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ciudad: string }>
}): Promise<Metadata> {
  const { ciudad } = await params
  const data = CIUDADES[ciudad]
  if (!data) return {}
  const { nombre, descripcion, precio } = data
  return {
    title: `Gestoría inmobiliaria en ${nombre} — contrato LAU y arras`,
    description: `${descripcion} Renta orientativa: ${precio}.`,
    keywords: `gestoría ${nombre.toLowerCase()}, contrato alquiler ${nombre.toLowerCase()}, LAU ${nombre.toLowerCase()}`,
    alternates: { canonical: `${BASE_URL}/${ciudad}` },
    openGraph: {
      title: `Inmonest ${nombre} — gestoría para particulares`,
      description: descripcion,
      url: `${BASE_URL}/${ciudad}`,
      locale: 'es_ES',
      type: 'website',
      siteName: 'Inmonest',
    },
  }
}

export default async function CiudadPage({
  params,
}: {
  params: Promise<{ ciudad: string }>
}) {
  const { ciudad } = await params
  const data = CIUDADES[ciudad]
  if (!data) notFound()

  const { nombre, precio, descripcion } = data
  const datos = getAlquilerParticularesCiudadDatos(ciudad)

  return (
    <ParticularesGestoriaCiudadLanding
      ciudad={ciudad}
      nombre={nombre}
      precioMedio={precio}
      barrios={datos.barrios}
      intro={descripcion}
      faqs={datos.faq}
      variant="hub"
    />
  )
}
