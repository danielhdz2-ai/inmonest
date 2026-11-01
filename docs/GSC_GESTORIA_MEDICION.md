# Medición GSC gestoría (baseline)

**Última actualización:** 2026-11-01  
**Propiedad:** `sc-domain:inmonest.com`  
**Ventana baseline:** 2026-08-02 → 2026-10-30 (90 días)

## Cómo refrescar (local)

```bash
npx tsx scripts/seo/fetch-gsc-performance.ts --days 90
npx tsx scripts/seo/fetch-gsc-performance.ts --days 90 --dimension query
npm run gsc:gestoria:analyze
```

Salida completa (no commitear): `scripts/seo/output/gsc-gestoria-analysis.json`

## Totales (baseline)

| Métrica | Sitio | Gestoría + barrios BCN |
|--------|-------|-------------------------|
| Clics | 1.585 | 329 |
| Impresiones | 61.876 | 18.824 |
| CTR | 2,56 % | 1,75 % |
| Share clics gestoría | — | ~21 % del sitio |

## Top URLs gestoría (clics)

1. `/gestoria/cuanto-cuesta-contrato-alquiler` — 32 clics · ~3.607 imp · pos ~7,4  
2. `/gestoria/barcelona` — 31 · ~2.277 imp · pos ~36  
3. `/gestoria/valencia` — 16 · ~1.447 imp · pos ~42  
4. `/gestoria/prestamo-particulares/madrid` — 15 · ~923 imp (canibalización; silo en hubs)  
5. `/gestoria/madrid` — 9 · ~360 imp · pos ~25  

## Oportunidad página 1 (pos 4–15, muchas imp.)

Prioridad SEO ya atacada en código (oleadas 4–7): **cuanto-cuesta**, **hubs BCN/MAD/VLC**, **packs 687€**, **barrios BCN**.

Seguimiento post-deploy: CTR de cuanto-cuesta y hubs ciudad.

## Muchas impresiones, pocos clics (≤3)

| URL | Imp | Clics | Notas |
|-----|-----|-------|--------|
| `/gestoria/prestamo-particulares/valencia` | 491 | 0 | **Oleada 9:** `noindex` + sin enlaces internos/sitemap |
| `/gestoria/madrid` | 206 | 1 | FAQ/WA above fold (oleada 5) |
| `/gestoria/rescision-alquiler` | 118 | 0 | Strike + FAQ (oleada 2–3) |
| `/gestoria/prestamo-particulares/barcelona` | 117 | 0 | Excluido grid hubs |

## Queries gestoría (imp altas, ≤1 clic)

- «gestoría inmobiliaria» (~399 imp, pos ~45) → hubs + keyword blocks  
- «gestor inmobiliario» (~265 imp)  
- «vender piso sin comisiones» (~184 imp) → `/vender-piso-sin-agencia`, packs 687€  
- «precio gestion alquiler» (~189 imp) → guía cuanto-cuesta  

## Barrios Barcelona (venta/compra completa)

Muy pocas impresiones aún en GSC (venta ~4 imp / 2 URLs; compra ~1 imp). Prioridad: enlazado desde hub BCN (oleada 5–6), indexación selectiva si Coverage lo pide.

## Próximo diff (mensual)

Comparar `meta.period` y `totals` de un nuevo `gsc:gestoria:analyze` contra esta tabla. KPI roadmap 90d: gestoría >400 clics/90d en ventana equivalente.
