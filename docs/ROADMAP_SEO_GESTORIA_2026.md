# Roadmap SEO gestoría Inmonest (GSC → conversión)

**Objetivo:** maximizar clics cualificados, indexación y contrataciones (`/gestoria/solicitar/*`, WhatsApp, panel).

**KPIs 90 días (desde línea base ago–oct 2026):** gestoría >400 clics/90d · CTR hub Barcelona >2% · compra/venta completa nacional >15 clics/mes c/u · 5+ barrios BCN con >20 imp/mes.

---

## Fase 1 — Quick wins (implementado en código)

- [x] OAuth GSC + scripts análisis (`scripts/seo/output/`, `analyze-gsc-gestoria.mjs`)
- [x] Hubs compra completa Barcelona (+ Madrid/Valencia)
- [x] Bloques conversión «sin comisión» + servicios estrella (GSC)
- [x] Titles/meta SERP venta/compra completa nacional
- [x] Inventario sitemap: landings `compra-completa-reserva-escritura/{ciudad}`
- [x] Enlaces internos barcelona hub → venta/compra por barrio
- [x] Indexación GSC: URLs nuevas compra hub

## Fase 2 — Hubs ciudad (Barcelona, Madrid, Valencia)

- [x] Posición queries «gestoría inmobiliaria [ciudad]» — meta + FAQ/WA above fold BCN/MAD/VLC (oleada 5)
- [x] Reducir canibalización: enlaces compra→`compra-completa`, LAU premium `/{ciudad}/contrato-alquiler`, 301 legacy (oleada 6)
- [x] Madrid/Valencia: mismos bloques que Barcelona (sin comisión + estrella)
- [x] Enlazar blog arras → hubs ciudad + packs 687€ (4 posts)
- [x] Hub `/gestoria` — bloque conversión 687 € + meta SERP

## Fase 3 — Venta/compra completa

- [x] Hubs compra en mismas ciudades que venta (19 ciudades, ruta `[ciudad]`)
- [ ] Barrios BCN: indexación GSC (top 10 barrios/semana)
- [x] Queries «vender/comprar sin comisiones» — enlaces hub/guía precio + packs 687 (oleada 7)
- [x] CTR: FAQ above fold + LocalBusiness barrios BCN LAU/arras/habitación/temporada (oleada 6)

## Fase 4 — Páginas con impresiones sin clics (GSC)

- [x] `/gestoria/cuanto-cuesta-contrato-alquiler` — strike + FAQ above fold + title SERP (oleada 4)
- [x] `/gestoria/compra-completa-reserva-escritura` — FAQ above fold nacional (oleada 4)
- [ ] `/gestoria/contrato-compraventa`, `/gestoria/rescision-alquiler` — redirect 301 o contenido
- [ ] Ciudad×servicio con 0 clics: titles locales + enlace desde hub

## Fase 5 — Arquitectura y silos

- [x] Silo `prestamo-particulares` (oculto en grid «Todos» del hub `/gestoria`; excluido en hubs BCN/MAD/VLC)
- [x] Puente `contratos-inmobiliarios` ↔ `/gestoria/{servicio}` (oleada 3)
- [x] Checkout: URLs `?ciudad=` en solicitar — middleware 301 + CTAs sin query (Calculadora, hubs, oleada 8)
- [x] 404 legacy gestoría (GSC ago 2026) — oleada 4–6 en `seo-redirects.ts` (revisar Coverage tras deploy)

## Fase 6 — E-E-A-T y conversión

- [x] Testimonios en landings >500 imp (cuanto-cuesta + servicios top GSC, oleada 7)
- [x] CTA WhatsApp con mensaje pre-rellenado (hubs ciudad + servicios top GSC, oleada 5)
- [ ] Agregación reseñas schema solo donde proceda (no duplicar en todas las landings)

## Fase 7 — Medición

- [x] Baseline 90d documentado — `docs/GSC_GESTORIA_MEDICION.md` + `npm run gsc:gestoria:refresh` (2026-11-01)
- [ ] Repetir refresh mensual y anotar diff en `GSC_GESTORIA_MEDICION.md`
- [x] Top URLs sin clics / page-1 — listadas en `GSC_GESTORIA_MEDICION.md` (salida analyze local)
- [ ] A/B titles en 3 landings (manual GSC)

---

## Prioridad de indexación GSC (cuota ~10/día)

1. `/gestoria/compra-completa-reserva-escritura/barcelona` (y Madrid/Valencia)
2. `/gestoria/venta-completa-reserva-escritura/barcelona`
3. Barrios BCN venta/compra (Eixample, Gràcia, Sants, Les Corts, Sant Antoni)
4. Nacional compra/venta completa
5. `/gestoria/barcelona`, `/gestoria/madrid`, `/gestoria/valencia`
