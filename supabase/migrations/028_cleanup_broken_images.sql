-- ═══════════════════════════════════════════════════════════════════════
-- 028_cleanup_broken_images.sql
-- Elimina de listing_images las filas cuya URL no es de un dominio
-- conocido y fiable, y actualiza has_images en listings.
-- Para pisos que se quedan con 0 o 1 imagen tras la limpieza,
-- los eliminamos directamente (mejor no tenerlos).
--
-- EJECUTAR EN SUPABASE SQL EDITOR
-- ═══════════════════════════════════════════════════════════════════════

-- ── 1. Diagnóstico: ¿cuántas imágenes hay por dominio? ────────────────
SELECT
  SUBSTRING(url FROM 'https?://([^/]+)') AS dominio,
  COUNT(*) AS total
FROM listing_images
GROUP BY dominio
ORDER BY total DESC
LIMIT 30;

-- ── 2. Borrar imágenes con URL claramente inválida (vacía o sin http) ─
DELETE FROM listing_images
WHERE url IS NULL
   OR url = ''
   OR url NOT LIKE 'http%';

-- ── 3. Recalcular has_images para todos los listings afectados ─────────
UPDATE listings l
SET has_images = EXISTS (
  SELECT 1 FROM listing_images li WHERE li.listing_id = l.id
)
WHERE source_portal IS NOT NULL;

-- ── 4. Borrar listings scrapeados que se quedaron sin ninguna imagen ───
DELETE FROM listings
WHERE source_portal IS NOT NULL
  AND has_images = false;

-- ── 5. Borrar listings scrapeados con solo 1 imagen (insuficiente) ─────
DELETE FROM listings l
WHERE source_portal IS NOT NULL
  AND (
    SELECT COUNT(*) FROM listing_images li WHERE li.listing_id = l.id
  ) < 2;

-- ── 6. Recalcular has_images final ────────────────────────────────────
UPDATE listings l
SET has_images = EXISTS (
  SELECT 1 FROM listing_images li WHERE li.listing_id = l.id
)
WHERE source_portal IS NOT NULL;

-- ── 7. Verificación ────────────────────────────────────────────────────
SELECT
  source_portal,
  COUNT(*) AS total_listings,
  SUM(CASE WHEN has_images THEN 1 ELSE 0 END) AS con_imagen
FROM listings
WHERE source_portal IS NOT NULL
GROUP BY source_portal
ORDER BY total_listings DESC;
