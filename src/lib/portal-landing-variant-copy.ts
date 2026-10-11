import { getContratoAlquilerPrecio, getPrecioServicio } from '@/lib/gestoria-catalogo'

export type PortalLandingVariant =
  | 'alquiler-particulares'
  | 'pisos'
  | 'hub'
  | 'alquiler-sin-agencia'
  | 'vender-piso'
  | 'pisos-sin-comision'

export function getPortalLandingIntro(
  variant: PortalLandingVariant,
  nombre: string,
  fallbackIntro: string,
): string {
  switch (variant) {
    case 'alquiler-sin-agencia':
      return `Alquilar sin agencia en ${nombre} sigue siendo posible: tú buscas piso o inquilino por tu cuenta y Inmonest formaliza el contrato LAU, temporada o habitación con gestoría online — sin comisiones de intermediación ni portal de anuncios.`
    case 'vender-piso':
      return `Vender tu piso en ${nombre} sin comisión de agencia implica negociar tú la operación. Inmonest te acompaña en arras, documentación y servicio integral de venta o compra entre particulares, con precio cerrado y panel de cliente.`
    case 'pisos-sin-comision':
      return `Si buscabas pisos de particulares sin comisión en ${nombre}, Inmonest ya no lista anuncios: somos gestoría para que cierres alquiler LAU, temporada, habitación o compraventa con contratos blindados desde 145 €.`
    default:
      return fallbackIntro
  }
}

export function getPortalLandingLeadConfig(variant: PortalLandingVariant): {
  serviceKey: string
  price: number
  labelSuffix: string
  solicitarHref: string
} {
  if (variant === 'vender-piso') {
    return {
      serviceKey: 'arras-penitenciales',
      price: getPrecioServicio('arras-penitenciales') ?? 295,
      labelSuffix: 'Arras y venta entre particulares',
      solicitarHref: '/gestoria/solicitar/arras-penitenciales',
    }
  }
  return {
    serviceKey: 'contrato-alquiler',
    price: getContratoAlquilerPrecio(),
    labelSuffix: 'Contrato de alquiler LAU',
    solicitarHref: '/gestoria/solicitar/contrato-alquiler',
  }
}
