-- =====================================================
-- MIGRACIÓN 039: SEO PREMIUM + CALCULADORA DE GASTOS
-- =====================================================
-- Añade campos para optimización SEO avanzada:
-- - meta_description: meta tag optimizado (150-160 chars)
-- - monthly_expenses_json: calculadora de gastos (alquileres)
-- =====================================================

BEGIN;

-- Añadir campo meta_description (generado dinámicamente con análisis de precio)
ALTER TABLE listings 
ADD COLUMN IF NOT EXISTS meta_description text;

-- Añadir campo monthly_expenses_json (solo para alquileres)
ALTER TABLE listings 
ADD COLUMN IF NOT EXISTS monthly_expenses_json jsonb;

-- Crear índice para mejorar performance en búsquedas SEO
CREATE INDEX IF NOT EXISTS idx_listings_meta_description 
ON listings(meta_description) 
WHERE meta_description IS NOT NULL;

-- Comentarios para documentación
COMMENT ON COLUMN listings.meta_description IS 'Meta description optimizada para SEO (150-160 caracteres). Generada dinámicamente con análisis de precio y ubicación.';
COMMENT ON COLUMN listings.monthly_expenses_json IS 'Desglose de gastos mensuales estimados para alquileres. Formato: {rent, utilities, internet, insurance, communityFees, total, breakdown[]}';

COMMIT;

-- =====================================================
-- EJEMPLO DE CONTENIDO:
--
-- meta_description:
-- "Piso en Eixample, Barcelona por 1.200€/mes. 15% más barato que la media. Ver análisis de gastos y detalles del barrio en Inmonest."
--
-- monthly_expenses_json:
-- {
--   "rent": 1200,
--   "utilities": 120,
--   "internet": 35,
--   "insurance": 0,
--   "communityFees": 0,
--   "total": 1355,
--   "breakdown": [
--     {"label": "Alquiler mensual", "amount": 1200, "isEstimated": false},
--     {"label": "Suministros (Luz, Agua, Gas)", "amount": 120, "isEstimated": true},
--     {"label": "Internet/Fibra", "amount": 35, "isEstimated": true}
--   ]
-- }
-- =====================================================
