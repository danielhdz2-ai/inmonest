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

- [ ] Posición queries «gestoría inmobiliaria [ciudad]» (meta + H1 + FAQ + schema)
- [ ] Reducir canibalización: hub `/gestoria/{ciudad}` vs `/gestoria/{servicio}/{ciudad}`
- [ ] Madrid/Valencia: mismos bloques que Barcelona (sin comisión + estrella)
- [ ] Enlazar blog arras → hubs ciudad + packs 687€

## Fase 3 — Venta/compra completa

- [ ] Hubs compra en mismas ciudades que venta (19 ciudades)
- [ ] Barrios BCN: indexación GSC (top 10 barrios/semana)
- [ ] Queries «vender/comprar sin comisiones» → landings dedicadas + enlaces desde marketplace
- [ ] CTR: rich results (FAQ, HowTo, LocalBusiness) en todas las landings barrio

## Fase 4 — Páginas con impresiones sin clics (GSC)

- [ ] `/gestoria/cuanto-cuesta-contrato-alquiler` — CTR (pos ~7)
- [ ] `/gestoria/compra-completa-reserva-escritura` — copy + FAQ above fold
- [ ] `/gestoria/contrato-compraventa`, `/gestoria/rescision-alquiler` — redirect 301 o contenido
- [ ] Ciudad×servicio con 0 clics: titles locales + enlace desde hub

## Fase 5 — Arquitectura y silos

- [ ] Silo `prestamo-particulares` (menos enlaces desde hub gestoría principal)
- [ ] Puente `contratos-inmobiliarios` ↔ `/gestoria/{servicio}`
- [ ] Checkout: no indexar variantes `?ciudad=`; canonical limpia
- [ ] 404 legacy gestoría (lista GSC ago 2026) → redirects en `seo-redirects.ts`

## Fase 6 — E-E-A-T y conversión

- [ ] Testimonios por servicio/ciudad en landings con >500 imp
- [ ] CTA WhatsApp con mensaje pre-rellenado por landing
- [ ] Panel demo por servicio en landings top 10
- [ ] Agregación reseñas schema solo donde proceda

## Fase 7 — Medición

- [ ] `npm run gsc:fetch` mensual; diff vs `gsc-gestoria-analysis.json`
- [ ] Panel interno: top 20 URLs gestoría sin clics
- [ ] A/B titles en 3 landings (manual GSC)

---

## Prioridad de indexación GSC (cuota ~10/día)

1. `/gestoria/compra-completa-reserva-escritura/barcelona` (y Madrid/Valencia)
2. `/gestoria/venta-completa-reserva-escritura/barcelona`
3. Barrios BCN venta/compra (Eixample, Gràcia, Sants, Les Corts, Sant Antoni)
4. Nacional compra/venta completa
5. `/gestoria/barcelona`, `/gestoria/madrid`, `/gestoria/valencia`
