-- ═══════════════════════════════════════════════════════════════════════
-- 027_cleanup_no_photos.sql
-- Elimina todos los anuncios scrapeados (no de usuarios) que no tienen
-- ninguna imagen asociada.  Aplica a TODOS los portales (tucasa, pisoscom,
-- mitula, etc.) — los anuncios sin foto dañan la imagen de Inmonest.
--
-- EJECUTAR EN SUPABASE SQL EDITOR
-- ═══════════════════════════════════════════════════════════════════════

-- ── 1. Ver cuántos se van a borrar (diagnóstico previo) ──────────────
SELECT
  source_portal,
  COUNT(*) AS sin_foto
FROM listings
WHERE
  source_portal IS NOT NULL  -- solo scraping, no anuncios de usuarios
  AND has_images = false      -- sin ninguna imagen en listing_images
GROUP BY source_portal
ORDER BY sin_foto DESC;

-- ── 2. Borrar los listings sin foto scrapeados ────────────────────────
DELETE FROM listings
WHERE
  source_portal IS NOT NULL
  AND has_images = false;

-- ── 3. Verificación post-limpieza ────────────────────────────────────
SELECT COUNT(*) AS total_sin_foto_restantes
FROM listings
WHERE
  source_portal IS NOT NULL
  AND has_images = false;
