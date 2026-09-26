import JsonLd from '@/components/JsonLd'
import {
  buildGestoriaLandingSchemas,
  type GestoriaLandingSeoInput,
} from '@/lib/gestoria-ciudad-schema'

/** JSON-LD homogéneo para landings gestoría (actuales y nuevas). */
export default function GestoriaLandingSeo(input: GestoriaLandingSeoInput) {
  return <JsonLd schema={buildGestoriaLandingSchemas(input)} />
}
