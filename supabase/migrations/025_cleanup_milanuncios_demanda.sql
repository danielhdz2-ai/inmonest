-- ═════════════════════════════════════════════════════════════════════════════
-- 025_cleanup_milanuncios_demanda.sql
-- Elimina anuncios de DEMANDA (compradores) de Milanuncios que se colaron
-- en la base de datos. Solo queremos OFERTA (vendedores/arrendadores).
--
-- Patrones de demanda detectados en título o descripción:
--   - "Compro ...", "Compramos ...", "Busco ...", "Buscamos ..."
--   - "Necesito ...", "Pagamos al contado", "Quiero comprar ..."
--   - "COMPRO INMUEBLE", "COMPRO VIVIENDA", "Se busca piso ..."
--
-- EJECUTAR EN SUPABASE SQL EDITOR
-- ═════════════════════════════════════════════════════════════════════════════


-- ─────────────────────────────────────────────────────────────────────────────
-- DIAGNÓSTICO PREVIO — descomenta y ejecuta este bloque primero
-- ─────────────────────────────────────────────────────────────────────────────
/*
SELECT id, title, source_portal
FROM listings
WHERE source_portal ILIKE '%milanuncios%'
  AND (
    title ILIKE 'Compro %'      OR
    title ILIKE 'Compramos %'   OR
    title ILIKE 'Busco %'       OR
    title ILIKE 'Buscamos %'    OR
    title ILIKE 'Necesito %'    OR
    title ILIKE 'Busco piso%'   OR
    title ILIKE 'Busco casa%'   OR
    title ILIKE 'Busco inmueble%' OR
    title ILIKE 'Compro inmueble%' OR
    title ILIKE 'Compro vivienda%' OR
    title ILIKE '%pagamos al contado%' OR
    title ILIKE '%se busca piso%'  OR
    title ILIKE '%quiero comprar%' OR
    title ILIKE '%quiero alquilar%'
  )
ORDER BY created_at DESC;
*/


-- ─────────────────────────────────────────────────────────────────────────────
-- PASO 1 — Borrar imágenes de los anuncios de demanda
-- ─────────────────────────────────────────────────────────────────────────────
DELETE FROM listing_images
WHERE listing_id IN (
  SELECT id FROM listings
  WHERE source_portal ILIKE '%milanuncios%'
    AND (
      title ILIKE 'Compro %'         OR
      title ILIKE 'Compramos %'      OR
      title ILIKE 'Busco %'          OR
      title ILIKE 'Buscamos %'       OR
      title ILIKE 'Necesito %'       OR
      title ILIKE 'Necesitamos %'    OR
      title ILIKE 'Busco piso%'      OR
      title ILIKE 'Busco casa%'      OR
      title ILIKE 'Busco inmueble%'  OR
      title ILIKE 'Compro inmueble%' OR
      title ILIKE 'Compro vivienda%' OR
      title ILIKE '%pagamos al contado%' OR
      title ILIKE '%se busca piso%'  OR
      title ILIKE '%se busca casa%'  OR
      title ILIKE '%quiero comprar%' OR
      title ILIKE '%quiero alquilar%'
    )
);


-- ─────────────────────────────────────────────────────────────────────────────
-- PASO 2 — Borrar los anuncios de demanda
-- ─────────────────────────────────────────────────────────────────────────────
DELETE FROM listings
WHERE source_portal ILIKE '%milanuncios%'
  AND (
    title ILIKE 'Compro %'         OR
    title ILIKE 'Compramos %'      OR
    title ILIKE 'Busco %'          OR
    title ILIKE 'Buscamos %'       OR
    title ILIKE 'Necesito %'       OR
    title ILIKE 'Necesitamos %'    OR
    title ILIKE 'Busco piso%'      OR
    title ILIKE 'Busco casa%'      OR
    title ILIKE 'Busco inmueble%'  OR
    title ILIKE 'Compro inmueble%' OR
    title ILIKE 'Compro vivienda%' OR
    title ILIKE '%pagamos al contado%' OR
    title ILIKE '%se busca piso%'  OR
    title ILIKE '%se busca casa%'  OR
    title ILIKE '%quiero comprar%' OR
    title ILIKE '%quiero alquilar%'
  );


-- ─────────────────────────────────────────────────────────────────────────────
-- PASO 3 — Imágenes huérfanas (por si CASCADE no actuó)
-- ─────────────────────────────────────────────────────────────────────────────
DELETE FROM listing_images
WHERE listing_id NOT IN (SELECT id FROM listings);
