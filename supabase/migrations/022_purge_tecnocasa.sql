-- ============================================================
-- 022 — Purga total de Tecnocasa
-- Motivo: imágenes ilegibles (planos / logos de texto gigante)
--         y precios incorrectos (pisos a 180€)
-- Ejecutada: 2026-04-15 via scripts/purge-tecnocasa.ts
--   → 49 listings borrados, 27 imágenes borradas
-- ============================================================

-- 1. Borrar imágenes de listings de tecnocasa
DELETE FROM listing_images
WHERE listing_id IN (
  SELECT id FROM listings
  WHERE source_portal = 'tecnocasa'
);

-- 2. Borrar los listings de tecnocasa
DELETE FROM listings
WHERE source_portal = 'tecnocasa';

-- 3. Limpiar imágenes huérfanas (listing_id sin listing existente)
DELETE FROM listing_images
WHERE listing_id NOT IN (SELECT id FROM listings);
