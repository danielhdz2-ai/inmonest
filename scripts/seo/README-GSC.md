# Google Search Console — scripts automáticos

## Requisitos

1. Proyecto Google Cloud **inmonest-seo** con **Search Console API** habilitada.
2. OAuth cliente **Aplicación de escritorio** (JSON descargado de Google Cloud).
3. Cuenta Google con acceso de propietario a **inmonest.com** en Search Console.

## Configuración (una vez)

1. Copia el JSON descargado a:
   ```
   scripts/seo/gsc-oauth-client.json
   ```
   (Plantilla: `gsc-oauth-client.json.example`)

2. Autoriza (abre URL en navegador, pega el `code` de la redirección):
   ```bash
   npm run gsc:auth
   ```
   Guarda el token en `scripts/seo/.gsc-token.json` (no se sube a git).

## Uso

```bash
# Rendimiento últimos 28 días por página (clics, impresiones, CTR, posición)
npm run gsc:fetch

# Por query de búsqueda
npm run gsc:fetch:queries

# Personalizado
npx tsx scripts/seo/fetch-gsc-performance.ts -- --days 90 --dimension date
```

Salida en `scripts/seo/output/gsc-performance-{dimension}.json` y `.csv`.

## Auditoría cobertura vs producción

Compara el export GSC con el estado HTTP actual del sitio:

```bash
npm run gsc:audit
npm run gsc:audit -- --limit 100
npm run gsc:audit -- --issue 404
```

Salida: `scripts/seo/output/gsc-coverage-live-audit.json` y `gsc-coverage-still-broken.csv`.

## Indexación gestoría (híbrido)

El informe de cobertura masiva sigue usando export CSV manual de GSC:

```bash
npm run gsc:indexacion
```

(Con `scripts/gsc-coverage-urls.csv` exportado desde Indexación → Páginas.)

## Notas

- **No** subas `gsc-oauth-client.json` ni `.gsc-token.json` al repo.
- **No** dejes el JSON en `public/` — se desplegaría en Vercel.
- Si el OAuth está en modo prueba, añade tu cuenta como usuario de prueba en Google Cloud.
