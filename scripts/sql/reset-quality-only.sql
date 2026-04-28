-- ══════════════════════════════════════════════════════════════════
-- RESET TOTAL: Eliminar listings sin AI description
-- ══════════════════════════════════════════════════════════════════
-- Fecha: 2026-04-27
-- Objetivo: Plataforma 100% calidad premium (solo contenido indexable)
-- Acción: Eliminar 501 listings sin AI description, mantener 206 con AI
-- Resultado esperado: 206 listings (100% con AI v2.0)
-- ══════════════════════════════════════════════════════════════════

-- PASO 1: Backup de seguridad
CREATE TABLE IF NOT EXISTS listings_backup_reset_quality_20260427 AS
SELECT * FROM listings WHERE ai_description IS NULL;

-- Verificar backup
SELECT COUNT(*) as "Listings respaldados (sin AI)" 
FROM listings_backup_reset_quality_20260427;

-- PASO 2: Eliminar listings sin AI description
DELETE FROM listings 
WHERE ai_description IS NULL;

-- PASO 3: Verificación final
SELECT 
  COUNT(*) as total_listings,
  COUNT(ai_description) as con_ai_description,
  COUNT(*) FILTER (WHERE ai_description IS NULL) as sin_ai_description,
  ROUND(COUNT(ai_description)::numeric / COUNT(*) * 100, 2) as porcentaje_con_ai
FROM listings;

-- Debe mostrar:
-- total_listings: 206
-- con_ai_description: 206
-- sin_ai_description: 0
-- porcentaje_con_ai: 100.00
