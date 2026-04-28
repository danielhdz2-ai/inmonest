-- ============================================================
-- Migración 037: Seed 10 anuncios de particulares
--   · 5 de Milanuncios (source_portal = 'milanuncios')
--   · 5 de Wallapop    (source_portal = 'wallapop')
-- Ejecutar en Supabase → SQL Editor
-- ============================================================

INSERT INTO listings (
  origin, operation, title, description,
  price_eur, province, city, district, postal_code,
  lat, lng, bedrooms, bathrooms, area_m2,
  source_portal, source_external_id,
  is_particular, particular_confidence, ranking_score,
  status, published_at
) VALUES

-- ══════════════════════════════════════════════════════════
-- MILANUNCIOS — 5 anuncios de particulares
-- ══════════════════════════════════════════════════════════

-- 1. Alquiler en Sevilla (particular, piso reformado)
(
  'external', 'rent',
  'Alquilo piso 2 hab. en Triana — particular, sin comisión',
  'Propietario alquila su piso directamente sin agencia. 2 habitaciones amplias, salón con balcón a calle peatonal, cocina reformada 2023 con electrodomésticos nuevos, baño renovado. Suelos de tarima, doble acristalamiento. Zona Triana, a 5 min caminando del puente de Triana. Metro Giraldillo a 8 min. No fumadores. Trato directo.',
  680, 'Sevilla', 'Sevilla', 'Triana', '41010',
  37.3869, -6.0005,
  2, 1, 65,
  'milanuncios', 'milan-sev-part-001',
  true, 0.96, 88,
  'published', NOW() - INTERVAL '1 day'
),

-- 2. Venta en Zaragoza (particular, piso en propiedad)
(
  'external', 'sale',
  'Vendo piso 3 hab. en Delicias — dueño sin intermediarios',
  'Propietario vende directamente sin agencia ni comisión para el comprador. Piso de 90 m² en planta 4ª con ascensor. 3 habitaciones dobles con armarios empotrados, 1 baño completo + aseo, salón de 20 m², cocina independiente equipada. Calefacción individual de gas. Garaje en planta sótano incluido en precio. Escritura limpia. Precio negociable para comprador serio.',
  139000, 'Zaragoza', 'Zaragoza', 'Delicias', '50010',
  41.6464, -0.9080,
  3, 2, 90,
  'milanuncios', 'milan-zgz-part-001',
  true, 0.95, 85,
  'published', NOW() - INTERVAL '2 days'
),

-- 3. Alquiler en Málaga (particular, cerca playa)
(
  'external', 'rent',
  'Alquiler piso 2 hab. Pedregalejo — 300m playa, propietaria',
  'Alquilo mi piso directamente. A 300 metros de playa El Pedregalejo. 2 hab, baño reformado, cocina con office, terraza de 10 m² con vistas al barrio. Piscina comunitaria y jardín. Sin agencia. Admito pareja o familia sin mascotas. Referencia: precio incluye comunidad.',
  820, 'Málaga', 'Málaga', 'Pedregalejo', '29017',
  36.7270, -4.3740,
  2, 1, 60,
  'milanuncios', 'milan-mlg-part-001',
  true, 0.94, 87,
  'published', NOW() - INTERVAL '3 days'
),

-- 4. Alquiler en Bilbao (particular, barrio Deusto)
(
  'external', 'rent',
  'Piso 1 hab. en Deusto — propietario sin agencia, trato directo',
  'Particular alquila. Piso exterior muy luminoso, totalmente reformado. 1 habitación doble, salón-comedor, cocina equipada con microondas y nevera, baño moderno. Calefacción central incluida en precio. A 10 min caminando de la Universidad de Deusto y metro Deusto. Ideal para profesional o estudiante de posgrado.',
  650, 'Vizcaya', 'Bilbao', 'Deusto', '48014',
  43.2730, -2.9490,
  1, 1, 48,
  'milanuncios', 'milan-bil-part-001',
  true, 0.93, 84,
  'published', NOW() - INTERVAL '4 days'
),

-- 5. Venta en Alicante (particular, ático con terraza)
(
  'external', 'sale',
  'Vendo ático 2 hab. con terraza en Alicante ciudad — dueño',
  'Propietario vende su ático directamente, sin ninguna agencia de por medio. Piso en última planta con terraza de 35 m² orientada al sur. 2 hab dobles, baño reformado, cocina abierta al salón. Comunidad pequeña y tranquila. A 5 min del centro. Parking en alquiler disponible en finca contigua. Precio a debatir con comprador directo.',
  198000, 'Alicante', 'Alicante', 'Centro', '03002',
  38.3452, -0.4815,
  2, 1, 72,
  'milanuncios', 'milan-ali-part-001',
  true, 0.92, 86,
  'published', NOW() - INTERVAL '5 days'
),

-- ══════════════════════════════════════════════════════════
-- WALLAPOP — 5 anuncios de particulares
-- ══════════════════════════════════════════════════════════

-- 6. Alquiler en Valencia (particular, Benimaclet)
(
  'external', 'rent',
  'Alquilo piso 3 hab. en Benimaclet — sin agencias, propietario',
  'Propietario alquila directamente. Piso de 85 m² en Benimaclet, a 5 minutos a pie del metro. 3 habitaciones (2 dobles + 1 individual), salón de 18 m², cocina independiente reformada, baño completo + aseo. Comunidad muy tranquila. Ideal para grupos de trabajo o familias. Sin fianza de agencia. Pido 1 mes fianza + 1 mes de garantía adicional.',
  780, 'Valencia', 'Valencia', 'Benimaclet', '46020',
  39.4893, -0.3632,
  3, 2, 85,
  'wallapop', 'walla-val-part-001',
  true, 0.97, 92,
  'published', NOW() - INTERVAL '1 day'
),

-- 7. Alquiler en Granada (particular, cerca Alhambra)
(
  'external', 'rent',
  'Estudio amueblado Realejo — propietaria alquila, sin comisión',
  'Alquilo mi estudio directamente. En el barrio del Realejo, a 10 min andando de la Alhambra y 5 min del centro. 32 m², completamente amueblado y equipado, WiFi incluido. Reformado en 2024. Calefacción y agua caliente incluidas. Admito mascotas pequeñas previa consulta. Mínimo 6 meses.',
  550, 'Granada', 'Granada', 'Realejo', '18009',
  37.1743, -3.5997,
  0, 1, 32,
  'wallapop', 'walla-grn-part-001',
  true, 0.95, 86,
  'published', NOW() - INTERVAL '2 days'
),

-- 8. Venta en Córdoba (particular, casa de pueblo reformada)
(
  'external', 'sale',
  'Vendo casa 4 hab. en el Casco Histórico de Córdoba — particular',
  'Dueña vende su casa directamente sin agencia. Casa de estilo andaluz en plena Judería. 4 habitaciones, 2 baños, patio interior típico cordobés de 20 m², salón con chimenea, cocina reformada. Declaración de obra nueva reciente. Potencial para vivienda habitual o alquiler turístico (licencia tramitable). Precio negociable si el trato es directo.',
  245000, 'Córdoba', 'Córdoba', 'Casco Histórico', '14003',
  37.8793, -4.7820,
  4, 2, 130,
  'wallapop', 'walla-cor-part-001',
  true, 0.93, 88,
  'published', NOW() - INTERVAL '3 days'
),

-- 9. Alquiler en San Sebastián / Donostia (particular, Gros)
(
  'external', 'rent',
  'Alquiler piso 2 hab. barrio Gros — Donostia, propietario sin agencia',
  'Propietario alquila piso directamente en el barrio de Gros. 2 habitaciones, salón, cocina americana renovada, baño completo. A 200m de la playa de Zurriola. Calefacción incluida en precio. Sin comisión de agencia. Pido nómina o garantía. Disponible desde 1 de mayo.',
  1050, 'Guipúzcoa', 'Donostia-San Sebastián', 'Gros', '20001',
  43.3208, -1.9817,
  2, 1, 58,
  'wallapop', 'walla-ss-part-001',
  true, 0.94, 89,
  'published', NOW() - INTERVAL '4 days'
),

-- 10. Venta en Murcia (particular, adosado con jardín)
(
  'external', 'sale',
  'Vendo adosado 4 hab. con jardín en La Alberca — propietario directo',
  'Particular vende adosado en urbanización privada La Alberca (Murcia). 4 hab dobles, 2 baños, aseo de cortesía, salón-comedor con salida a jardín privado de 80 m², garaje individual. Piscina comunitaria. Sin deudas con comunidad. A 10 min del centro de Murcia. Solo trato directo con el propietario, sin agencias.',
  225000, 'Murcia', 'Murcia', 'La Alberca', '30153',
  37.9544, -1.1320,
  4, 3, 145,
  'wallapop', 'walla-mur-part-001',
  true, 0.91, 85,
  'published', NOW() - INTERVAL '5 days'
)

ON CONFLICT (source_portal, source_external_id) DO NOTHING;
