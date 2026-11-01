# Auditoría landings SEO (gestoría + portal)

Checklist operativo tras cambios de landings. Ejecutar en local:

```bash
npm run audit:seo
npm run audit:gestoria-landings
python scripts/audit-landings-gaps.py
```

## Canonical y duplicados

| Regla | Estado |
|-------|--------|
| **Compra 687€** → solo `/gestoria/compra-completa-reserva-escritura[/ciudad]` | OK: alias `asesoria-compra-piso` → 301 + noindex + fuera de sitemap |
| **Préstamo particulares** | noindex, follow (silo financiación) |
| **Checkout** `/gestoria/solicitar/*` | noindex, fuera de sitemap |
| **LAU premium** `/{ciudad}/contrato-alquiler` vs hub `/gestoria/contrato-alquiler` | intención distinta; enlaces cruzados controlados |

## Diferenciación de contenido

- **Barrios Barcelona** (alquiler, arras, habitación, temporada, venta/compra): meta title único por barrio en `barcelona-*-barrios.ts`.
- **Compra completa ciudad**: copys premium en Madrid, Barcelona, Valencia; resto derivado de venta con meta única por slug.
- **Pendiente evolutivo**: migrar FAQ/casos reales del dataset legacy `asesoria-compra-ciudad-data.ts` a `COMPRA_COMPLETA_OVERRIDES` en ciudades con tráfico GSC (Sevilla, Málaga, Bilbao…).

## Medición

Baseline y refresh: `docs/GSC_GESTORIA_MEDICION.md`, `npm run gsc:gestoria:refresh`.

## Indexación GSC

No solicitar de nuevo URLs ya indexadas. Priorizar CTR (cuanto-cuesta, contrato-alquiler) y hubs gestoría ciudad.
