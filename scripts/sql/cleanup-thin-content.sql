-- =====================================================
-- LIMPIEZA DE CHOQUE: ELIMINAR LISTINGS SIN IA
-- =====================================================
-- Este script elimina todos los listings que no tienen 
-- descripción IA, priorizando calidad sobre volumen.
--
-- ⚠️ ADVERTENCIA: Esta operación es IRREVERSIBLE
-- Se recomienda hacer backup antes de ejecutar
--
-- Ejecutar en Supabase SQL Editor
-- =====================================================

BEGIN;

-- Contar antes de eliminar (para registro)
SELECT 
  COUNT(*) as total_listings,
  COUNT(ai_description) as con_ai_description,
  COUNT(*) - COUNT(ai_description) as sin_ai_description
FROM listings;

-- Eliminar listings sin ai_description
DELETE FROM listings 
WHERE ai_description IS NULL;

-- Verificar resultado
SELECT 
  COUNT(*) as listings_restantes,
  COUNT(ai_description) as todos_con_ai
FROM listings;

COMMIT;

-- =====================================================
-- RESULTADO ESPERADO:
-- - Listings restantes: ~683 (23% del total)
-- - Todos tendrán ai_description
-- - Base limpia para indexación de calidad
-- =====================================================
