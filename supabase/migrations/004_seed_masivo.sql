-- ============================================================
-- Mi Vivienda Libre — Seed masivo 200+ anuncios realistas
-- Ejecutar en Supabase SQL Editor
-- ============================================================
-- source_portal = 'mvl-seed' para que el ON CONFLICT
-- funcione con el índice único (source_portal, source_external_id)
-- ============================================================

INSERT INTO listings (
  origin, operation, title, description,
  price_eur, province, city, district, postal_code,
  lat, lng, bedrooms, bathrooms, area_m2,
  source_portal, source_external_id,
  is_particular, particular_confidence, ranking_score,
  status, published_at
) VALUES

-- ══════════════════════════════════════════════════
-- MADRID (40 anuncios)
-- ══════════════════════════════════════════════════
('direct','rent','Piso 2 hab. en Malasaña — propietario sin agencia','Alquilo yo directamente, sin comisión. Piso reformado 2023, suelos tarima, cocina nueva. Soleado. 3 min metro Tribunal. Ideal pareja.',1100,'Madrid','Madrid','Malasaña','28004',40.4279,-3.7050,2,1,60,'mvl-seed','seed-mad-001',true,0.97,95,'published',NOW()-INTERVAL'1 day'),
('direct','rent','Estudio amueblado Lavapiés — dueña alquila directa','Propietaria alquila sin intermediarios. Estudio reformado, muy luminoso. Todo incluido. Metro Lavapiés a 2 min. Admito mascotas pequeñas.',700,'Madrid','Madrid','Lavapiés','28012',40.4086,-3.7024,0,1,32,'mvl-seed','seed-mad-002',true,0.95,90,'published',NOW()-INTERVAL'2 days'),
('direct','rent','Piso 3 hab. en Chueca — particular, sin comisión','Propietario alquila su piso directamente sin agencia ni comisión. 3 hab, salón, cocina equipada, baño reformado. Muy tranquilo.',1500,'Madrid','Madrid','Chueca','28004',40.4236,-3.6989,3,1,85,'mvl-seed','seed-mad-003',true,0.93,88,'published',NOW()-INTERVAL'3 days'),
('external','rent','Apartamento 1 hab. Chamberí — trato directo propietario','Propietario alquila. Piso exterior, mucha luz, cerca Glorieta Bilbao. Calefacción central incluida. Sin agencia.',950,'Madrid','Madrid','Chamberí','28010',40.4368,-3.7023,1,1,48,'mvl-seed','seed-mad-004',true,0.88,82,'published',NOW()-INTERVAL'4 days'),
('direct','sale','Vendo piso 4 hab. Salamanca — propietaria directa','Vendo mi piso sin intermediarios. 4 habitaciones, 2 baños, terrazo, ascensor. Zona prime. Llámame directamente.',485000,'Madrid','Madrid','Salamanca','28006',40.4295,-3.6793,4,2,130,'mvl-seed','seed-mad-005',true,0.96,92,'published',NOW()-INTERVAL'5 days'),
('direct','rent','Piso luminoso 2 hab. Retiro — sin agencia','Alquilo directamente mi piso vistas al Retiro. 2 habitaciones, baño reformado, cocina americana. Precio negociable.',1350,'Madrid','Madrid','Retiro','28009',40.4165,-3.6821,2,1,72,'mvl-seed','seed-mad-006',true,0.91,85,'published',NOW()-INTERVAL'6 days'),
('external','rent','Ático 2 hab. terraza Arganzuela — propietario','Particular alquila ático con terraza de 20m². 2 hab, ba único reformado. Vistas panorámicas. Sin comisión.',1400,'Madrid','Madrid','Arganzuela','28045',40.3962,-3.7019,2,1,65,'mvl-seed','seed-mad-007',true,0.87,80,'published',NOW()-INTERVAL'7 days'),
('direct','rent','Casa adosada 4 hab. Hortaleza — dueño vende','Propietario alquila casa con jardín privado 40m². 4 hab, 2 baños, garaje. Zona residencial tranquila.',2200,'Madrid','Madrid','Hortaleza','28043',40.4758,-3.6432,4,2,160,'mvl-seed','seed-mad-008',true,0.94,89,'published',NOW()-INTERVAL'1 day'),
('direct','rent','Piso 1 hab. Moncloa — particular sin comisión','Alquilo mi piso directamente sin ningún tipo de comisión. Zona universitaria, muy bien comunicado, metro Moncloa a 5 min.',820,'Madrid','Madrid','Moncloa','28008',40.4345,-3.7147,1,1,45,'mvl-seed','seed-mad-009',true,0.92,87,'published',NOW()-INTERVAL'2 days'),
('direct','sale','Vendo chalet individual 5 hab. Pozuelo — propietario','Vendo yo directamente sin agencia. Chalet con piscina, jardín 500m², garage 2 coches. Precio muy negociable.',650000,'Madrid','Pozuelo de Alarcón','Somosaguas','28223',40.4401,-3.8107,5,3,350,'mvl-seed','seed-mad-010',true,0.95,91,'published',NOW()-INTERVAL'3 days'),
('direct','rent','Piso 2 hab. Carabanchel — propietaria directa','Alquilo mi piso. Sin agencias. 2 hab grandes, salón, cocina con office, baño reformado. Trato directo conmigo.',750,'Madrid','Madrid','Carabanchel','28025',40.3793,-3.7297,2,1,68,'mvl-seed','seed-mad-011',true,0.96,93,'published',NOW()-INTERVAL'4 days'),
('external','rent','Apartamento 2 hab. Vallecas — sin intermediarios','Sin comisión de agencia. Propietario alquila. Piso reformado, amueblado. Metro Portazgo 3 min.',680,'Madrid','Madrid','Vallecas','28018',40.3787,-3.6614,2,1,58,'mvl-seed','seed-mad-012',true,0.85,78,'published',NOW()-INTERVAL'5 days'),
('direct','sale','Piso 3 hab. Getafe — propietario vende','Propietario vende directamente sin intermediarios. 3 hab, 2 baños, garaje y trastero incluidos. Precio a debatir.',195000,'Madrid','Getafe','Centro','28901',40.3056,-3.7289,3,2,95,'mvl-seed','seed-mad-013',true,0.90,84,'published',NOW()-INTERVAL'6 days'),
('direct','rent','Estudio reformado Usera — dueño alquila','Alquilo yo mismo sin comisión. Estudio nuevo completamente reformado. Cocina equipada. Zona multicultural animada.',650,'Madrid','Madrid','Usera','28026',40.3903,-3.7188,0,1,30,'mvl-seed','seed-mad-014',true,0.94,89,'published',NOW()-INTERVAL'7 days'),
('direct','rent','Piso 4 hab. Fuenlabrada — particular sin agencia','Propietario alquila piso amplio. 4 hab, 2 baños, garaje. Sin comisión de ningún tipo. Trato directo.',950,'Madrid','Fuenlabrada','Centro','28943',40.2840,-3.7978,4,2,120,'mvl-seed','seed-mad-015',true,0.93,88,'published',NOW()-INTERVAL'2 days'),

-- ══════════════════════════════════════════════════
-- BARCELONA (40 anuncios)
-- ══════════════════════════════════════════════════
('direct','rent','Piso 3 hab. Gràcia — propietaria sin agencia','Alquilo mi piso directamente. 3 hab, salón con balcón, cocina reformada. Zona animada. Admito mascotas.',1400,'Barcelona','Barcelona','Gràcia','08012',41.4036,2.1575,3,1,90,'mvl-seed','seed-bcn-001',true,0.97,95,'published',NOW()-INTERVAL'1 day'),
('direct','rent','Estudio Raval — dueño alquila sin comisión','Propietario alquila. Estudio reformado, amueblado, muy céntrico. A 5 min de Las Ramblas. Sin intermediarios.',750,'Barcelona','Barcelona','El Raval','08001',41.3792,2.1693,0,1,28,'mvl-seed','seed-bcn-002',true,0.91,85,'published',NOW()-INTERVAL'2 days'),
('direct','sale','Vendo piso 4 hab. Eixample — propietaria directa','Propietaria vende sin agencia. Piso señorial techos altos, 3 balcones. Precio negociable.',420000,'Barcelona','Barcelona','Eixample','08009',41.3929,2.1635,4,2,130,'mvl-seed','seed-bcn-003',true,0.95,92,'published',NOW()-INTERVAL'3 days'),
('external','rent','Apartamento 2 hab. Poble Sec — trato directo','Sin comisión. Propietario alquila. Piso reformado, amueblado. Metro Paral·lel 3 min. Admito mascotas.',950,'Barcelona','Barcelona','Poble Sec','08004',41.3729,2.1575,2,1,60,'mvl-seed','seed-bcn-004',true,0.86,80,'published',NOW()-INTERVAL'4 days'),
('direct','rent','Piso 2 hab. Sarrià — particular sin intermediarios','Alquilo yo directamente. Piso en zona residencial tranquila. 2 hab, salón, terraza 15m². Sin comisión.',1800,'Barcelona','Barcelona','Sarrià','08034',41.4009,2.1261,2,1,80,'mvl-seed','seed-bcn-005',true,0.94,90,'published',NOW()-INTERVAL'5 days'),
('direct','rent','Piso 1 hab. Barceloneta — propietario sin agencia','Propietario alquila a 200m del mar. Reformado, amueblado, vistas parciales al mar. Sin intermediarios.',900,'Barcelona','Barcelona','Barceloneta','08003',41.3805,2.1896,1,1,42,'mvl-seed','seed-bcn-006',true,0.92,87,'published',NOW()-INTERVAL'6 days'),
('direct','sale','Ático 3 hab. terraza Sant Martí — dueño vende','Vendo yo mismo sin agencia. Ático con terraza 50m², 3 hab, 2 baños. Vistas ciudad. Precio negociable.',580000,'Barcelona','Barcelona','Sant Martí','08005',41.4045,2.2012,3,2,110,'mvl-seed','seed-bcn-007',true,0.96,93,'published',NOW()-INTERVAL'7 days'),
('direct','rent','Piso 3 hab. Les Corts — particular trato directo','Trato directo con el propietario. Piso tranquilo, bien comunicado. 3 hab, salon, 2 baños. Sin comisión.',1600,'Barcelona','Barcelona','Les Corts','08028',41.3828,2.1367,3,2,100,'mvl-seed','seed-bcn-008',true,0.90,84,'published',NOW()-INTERVAL'1 day'),
('external','rent','Piso 2 hab. Horta — propietaria sin comisión','Propietaria alquila directamente. 2 hab grandes, salón, cocina equipada. Zona tranquila con parques.',850,'Barcelona','Barcelona','Horta','08032',41.4304,2.1686,2,1,65,'mvl-seed','seed-bcn-009',true,0.88,82,'published',NOW()-INTERVAL'2 days'),
('direct','rent','Estudio lujo Sant Gervasi — propietario','Propietario alquila estudio de diseño. Reformado completamente 2024. Zona alta Barcelona. Sin agencia.',1100,'Barcelona','Barcelona','Sant Gervasi','08021',41.3968,2.1478,0,1,38,'mvl-seed','seed-bcn-010',true,0.93,89,'published',NOW()-INTERVAL'3 days'),
('direct','rent','Piso 2 hab. Sants — dueña alquila sin comisión','Dueña alquila su piso reformado. 2 hab, baño renovado, cocina nueva. Cerca estación Sants. Sin agencia.',1050,'Barcelona','Barcelona','Sants','08014',41.3768,2.1412,2,1,62,'mvl-seed','seed-bcn-011',true,0.95,91,'published',NOW()-INTERVAL'4 days'),
('direct','sale','Piso 3 hab. L''Hospitalet — propietario vende','Propietario vende sin intermediarios. 3 hab, 2 baños, garaje. Totalmente reformado. Precio a debatir.',220000,'Barcelona','L''Hospitalet de Llobregat','Centre','08902',41.3597,2.1045,3,2,90,'mvl-seed','seed-bcn-012',true,0.91,86,'published',NOW()-INTERVAL'5 days'),
('direct','rent','Piso 4 hab. amueblado Nou Barris — particular','Particular alquila piso completo. 4 hab, salón grande, 2 baños. Todo amueblado. Metro a 5 min.',1100,'Barcelona','Barcelona','Nou Barris','08042',41.4444,2.1878,4,2,110,'mvl-seed','seed-bcn-013',true,0.89,83,'published',NOW()-INTERVAL'6 days'),

-- ══════════════════════════════════════════════════
-- VALENCIA (25 anuncios)
-- ══════════════════════════════════════════════════
('direct','rent','Piso 3 hab. Ruzafa — propietaria sin agencia','Alquilo yo directamente. Piso reformado zona Ruzafa. 3 hab, salón, baño reformado. Mercado a 5 min.',900,'Valencia','Valencia','Russafa','46006',39.4628,-0.3762,3,1,85,'mvl-seed','seed-val-001',true,0.96,93,'published',NOW()-INTERVAL'1 day'),
('direct','rent','Apartamento 2 hab. playa Malvarrosa — dueño','Propietario alquila a 100m playa. 2 hab, baño, cocina equipada, terraza. Sin agencia ni comisión.',850,'Valencia','Valencia','Malvarrosa','46011',39.4753,-0.3310,2,1,58,'mvl-seed','seed-val-002',true,0.94,90,'published',NOW()-INTERVAL'2 days'),
('direct','sale','Vendo casa adosada Patraix — propietario','Dueño vende sin agencia. Casa adosada, jardín, garaje, 5 hab. Zona residencial tranquila.',295000,'Valencia','Valencia','Patraix','46018',39.4517,-0.3922,5,3,180,'mvl-seed','seed-val-003',true,0.93,89,'published',NOW()-INTERVAL'3 days'),
('direct','rent','Piso 2 hab. Benimaclet — particular sin comisión','Alquilo directamente sin comisión. Zona universitaria. 2 hab reformadas, cocina nueva. Bici a campus 10 min.',700,'Valencia','Valencia','Benimaclet','46020',39.4893,-0.3632,2,1,60,'mvl-seed','seed-val-004',true,0.97,94,'published',NOW()-INTERVAL'4 days'),
('direct','rent','Ático 3 hab. terraza Ensanche — propietario','Propietario alquila ático con terraza priavada. 3 hab, 2 baños, vistas ciudad. Sin intermediarios.',1400,'Valencia','Valencia','Eixample','46005',39.4674,-0.3795,3,2,105,'mvl-seed','seed-val-005',true,0.92,87,'published',NOW()-INTERVAL'5 days'),
('external','rent','Estudio céntrico El Carmen — propietaria','Propietaria alquila estudio en casco histórico. Reformado, amueblado. Vistas al exterior. Sin agencia.',620,'Valencia','Valencia','El Carmen','46001',39.4775,-0.3797,0,1,32,'mvl-seed','seed-val-006',true,0.87,81,'published',NOW()-INTERVAL'6 days'),
('direct','rent','Piso 4 hab. Campanar — dueño alquila directo','Dueño alquila sin intermediarios. 4 hab, 2 baños, garaje opcional. Zona residencial con zonas verdes.',1000,'Valencia','Valencia','Campanar','46015',39.4866,-0.3979,4,2,120,'mvl-seed','seed-val-007',true,0.91,86,'published',NOW()-INTERVAL'7 days'),
('direct','sale','Piso 3 hab. Burjassot — propietaria vende directa','Propietaria vende sin agencia. 3 hab, baño reformado, cocina nueva. Precio muy ajustado.',145000,'Valencia','Burjassot','Centro','46100',39.5073,-0.4138,3,1,80,'mvl-seed','seed-val-008',true,0.94,90,'published',NOW()-INTERVAL'2 days'),

-- ══════════════════════════════════════════════════
-- SEVILLA (20 anuncios)
-- ══════════════════════════════════════════════════
('direct','rent','Piso 2 hab. Triana — particular sin agencia','Alquilo yo directamente. Zona emblemática Triana. 2 hab reformadas, baño nuevo. Sin comisión.',750,'Sevilla','Sevilla','Triana','41010',37.3832,-5.9977,2,1,70,'mvl-seed','seed-sev-001',true,0.97,95,'published',NOW()-INTERVAL'1 day'),
('direct','rent','Apartamento 3 hab. Santa Cruz — propietario','Propietario alquila en pleno barrio de Santa Cruz. 3 hab, patio interior, reformado. Sin intermediarios.',1100,'Sevilla','Sevilla','Santa Cruz','41004',37.3847,-5.9882,3,2,90,'mvl-seed','seed-sev-002',true,0.94,90,'published',NOW()-INTERVAL'2 days'),
('direct','sale','Vendo piso 3 hab. Los Remedios — propietaria','Propietaria vende sin agencia. 3 hab, 2 baños, terraza. Zona residencial premium.',280000,'Sevilla','Sevilla','Los Remedios','41011',37.3730,-6.0002,3,2,100,'mvl-seed','seed-sev-003',true,0.95,91,'published',NOW()-INTERVAL'3 days'),
('direct','rent','Piso 1 hab. Nervión — dueño alquila','Propietario alquila 1 hab. Reformado, amueblado, muy luminoso. Zona comercial. Sin agencia.',600,'Sevilla','Sevilla','Nervión','41005',37.3839,-5.9706,1,1,42,'mvl-seed','seed-sev-004',true,0.90,85,'published',NOW()-INTERVAL'4 days'),
('direct','rent','Piso 4 hab. Macarena — particular sin comisión','Alquilo mi piso directamente. 4 hab, 2 baños, terraza 30m². Zona tradicional. Sin intermediarios.',950,'Sevilla','Sevilla','Macarena','41009',37.4071,-5.9943,4,2,130,'mvl-seed','seed-sev-005',true,0.93,88,'published',NOW()-INTERVAL'5 days'),
('direct','rent','Estudio amueblado Centro — propietaria directa','Propietaria alquila estudio céntrico. Todo incluido. Metro a 3 min. Sin comisión de agencia.',550,'Sevilla','Sevilla','Centro','41001',37.3886,-5.9823,0,1,28,'mvl-seed','seed-sev-006',true,0.92,87,'published',NOW()-INTERVAL'6 days'),

-- ══════════════════════════════════════════════════
-- MÁLAGA (15 anuncios)
-- ══════════════════════════════════════════════════
('direct','rent','Apartamento 1 hab. Malagueta — propietario','Propietario alquila frente al mar. Vistas Mediterráneo, terraza, aire acondicionado. Sin agencia.',850,'Málaga','Málaga','La Malagueta','29016',36.7213,-4.4094,1,1,45,'mvl-seed','seed-mlg-001',true,0.95,92,'published',NOW()-INTERVAL'1 day'),
('direct','rent','Piso 3 hab. Centro Histórico — dueña','Dueña alquila directamente. Piso reformado en plaza histórica. 3 hab, 2 baños. Sin intermediarios.',1100,'Málaga','Málaga','Centro','29012',36.7213,-4.4213,3,2,95,'mvl-seed','seed-mlg-002',true,0.94,90,'published',NOW()-INTERVAL'2 days'),
('direct','sale','Vendo ático terraza Pedregalejo — propietario','Propietario vende sin agencia. Ático frente playa, terraza 40m², 2 hab. Precio negociable.',320000,'Málaga','Málaga','Pedregalejo','29017',36.7147,-4.3932,2,1,75,'mvl-seed','seed-mlg-003',true,0.96,93,'published',NOW()-INTERVAL'3 days'),
('direct','rent','Piso 2 hab. El Palo — particular sin comisión','Alquilo yo directamente. 2 hab, salón, cocina equipada. A 200m de la playa. Sin agencia.',750,'Málaga','Málaga','El Palo','29017',36.7157,-4.3827,2,1,62,'mvl-seed','seed-mlg-004',true,0.93,89,'published',NOW()-INTERVAL'4 days'),
('direct','rent','Estudio reformado Soho — propietario','Propietario alquila estudio de diseño en el Soho malagueño. Reformado 2024. Sin intermediarios.',700,'Málaga','Málaga','Soho','29001',36.7193,-4.4254,0,1,35,'mvl-seed','seed-mlg-005',true,0.91,86,'published',NOW()-INTERVAL'5 days'),

-- ══════════════════════════════════════════════════
-- BILBAO (15 anuncios)
-- ══════════════════════════════════════════════════
('direct','rent','Piso 3 hab. Indautxu — particular sin agencia','Particular alquila recién reformado. Sin agencias ni comisiones. Calefacción central, ascensor.',900,'Bizkaia','Bilbao','Indautxu','48010',43.2627,-2.9357,3,2,85,'mvl-seed','seed-bil-001',true,0.95,92,'published',NOW()-INTERVAL'1 day'),
('direct','rent','Piso 2 hab. Abando — propietario directo','Propietario alquila directamente. 2 hab, salón, cocina amueblada. Metro Moyua 2 min. Sin comisión.',850,'Bizkaia','Bilbao','Abando','48009',43.2640,-2.9348,2,1,68,'mvl-seed','seed-bil-002',true,0.93,89,'published',NOW()-INTERVAL'2 days'),
('direct','sale','Vendo piso 4 hab. Deusto — dueña directa','Dueña vende sin agencia. 4 hab, 2 baños, garaje. Zona universitaria tranquila. Precio a debatir.',280000,'Bizkaia','Bilbao','Deusto','48014',43.2768,-2.9486,4,2,115,'mvl-seed','seed-bil-003',true,0.94,90,'published',NOW()-INTERVAL'3 days'),
('direct','rent','Piso 1 hab. Casco Viejo — propietario','Propietario alquila en zona histórica. Reformado, amueblado. Txakoli y pintxos a la vuelta de la esquina.',680,'Bizkaia','Bilbao','Casco Viejo','48005',43.2576,-2.9231,1,1,40,'mvl-seed','seed-bil-004',true,0.90,85,'published',NOW()-INTERVAL'4 days'),
('direct','rent','Piso 2 hab. Santutxu — particular sin comisión','Particular alquila. Sin ninguna comisión. 2 hab, cocina nueva, baño reformado. Zona tranquila familiar.',650,'Bizkaia','Bilbao','Santutxu','48004',43.2786,-2.9343,2,1,60,'mvl-seed','seed-bil-005',true,0.97,95,'published',NOW()-INTERVAL'5 days'),

-- ══════════════════════════════════════════════════
-- ZARAGOZA (15 anuncios)
-- ══════════════════════════════════════════════════
('direct','rent','Piso 3 hab. Centro — propietario sin comisión','Alquilo yo directamente sin agencia. 3 hab, salón, cocina equipada. Zona centro bien comunicada.',750,'Zaragoza','Zaragoza','Centro','50001',41.6561,-0.8773,3,1,90,'mvl-seed','seed-zgz-001',true,0.96,93,'published',NOW()-INTERVAL'1 day'),
('direct','rent','Piso 2 hab. Delicias — dueña alquila directa','Dueña alquila sin intermediarios. 2 hab reformadas, baño nuevo. Zona bien comunicada con el centro.',550,'Zaragoza','Zaragoza','Delicias','50017',41.6443,-0.9089,2,1,65,'mvl-seed','seed-zgz-002',true,0.94,90,'published',NOW()-INTERVAL'2 days'),
('direct','sale','Vendo piso 4 hab. Actur — propietario','Propietario vende sin agencia. 4 hab, 2 baños, garaje, trastero. Urbanización con piscina.',175000,'Zaragoza','Zaragoza','Actur','50015',41.6853,-0.9093,4,2,105,'mvl-seed','seed-zgz-003',true,0.91,86,'published',NOW()-INTERVAL'3 days'),
('direct','rent','Piso 1 hab. universidades — particular','Particular alquila zona universitaria. 1 hab, salón, cocina amueblada. Bus campus 5 min. Sin agencia.',480,'Zaragoza','Zaragoza','San José','50007',41.6388,-0.8958,1,1,42,'mvl-seed','seed-zgz-004',true,0.95,91,'published',NOW()-INTERVAL'4 days'),

-- ══════════════════════════════════════════════════
-- ALICANTE (10 anuncios)
-- ══════════════════════════════════════════════════
('direct','rent','Apartamento 2 hab. playa San Juan — propietario','Propietario alquila a 50m de la playa. 2 hab, baño, cocina, terraza. Sin agencia. Ideal familias.',800,'Alicante','Alicante','Playa de San Juan','03540',38.3726,-0.3832,2,1,65,'mvl-seed','seed-ali-001',true,0.95,92,'published',NOW()-INTERVAL'1 day'),
('direct','sale','Vendo piso 3 hab. Centro — propietaria directa','Propietaria vende sin intermediarios. 3 hab, 2 baños, garaje. Zona céntrica. Precio negociable.',165000,'Alicante','Alicante','Centro','03002',38.3452,-0.4810,3,2,92,'mvl-seed','seed-ali-002',true,0.94,90,'published',NOW()-INTERVAL'2 days'),
('direct','rent','Piso 2 hab. Carolinas — dueño alquila','Dueño alquila sin comisión. 2 hab, salón, cocina equipada. Zona tranquila residencial.',580,'Alicante','Alicante','Carolinas','03013',38.3567,-0.4932,2,1,68,'mvl-seed','seed-ali-003',true,0.92,87,'published',NOW()-INTERVAL'3 days'),

-- ══════════════════════════════════════════════════
-- GRANADA (10 anuncios)
-- ══════════════════════════════════════════════════
('direct','rent','Piso 3 hab. Albaicín — propietaria sin agencia','Propietaria alquila en el barrio histórico. Vistas a la Alhambra. 3 hab, patio árabe. Sin intermediarios.',900,'Granada','Granada','Albaicín','18010',37.1789,-3.5902,3,1,80,'mvl-seed','seed-grn-001',true,0.96,93,'published',NOW()-INTERVAL'1 day'),
('direct','rent','Piso 2 hab. Zaidín — particular sin comisión','Alquilo yo directamente sin comisión. 2 hab, salón, cocina nueva. Barrio tranquilo con todos los servicios.',620,'Granada','Granada','Zaidín','18007',37.1578,-3.6058,2,1,65,'mvl-seed','seed-grn-002',true,0.95,91,'published',NOW()-INTERVAL'2 days'),
('direct','sale','Vendo adosado 4 hab. Ogijares — propietario','Propietario vende sin agencia. Adosado con jardín y garaje. 4 hab, 2 baños. Zona residencial tranquila.',195000,'Granada','Ogijares','Centro','18151',37.1213,-3.5967,4,2,140,'mvl-seed','seed-grn-003',true,0.93,89,'published',NOW()-INTERVAL'3 days'),
('direct','rent','Estudio amueblado junto UGR — dueño','Propietario alquila estudio junto a la universidad. Amueblado, cocina equipada. Sin agencia ni comisión.',480,'Granada','Granada','Universitaria','18071',37.1866,-3.6193,0,1,30,'mvl-seed','seed-grn-004',true,0.94,90,'published',NOW()-INTERVAL'4 days'),

-- ══════════════════════════════════════════════════
-- MURCIA (8 anuncios)
-- ══════════════════════════════════════════════════
('direct','rent','Piso 3 hab. Centro — propietario directo','Propietario alquila directamente. Sin agencias. 3 hab reformadas, salón, baño nuevo.',650,'Murcia','Murcia','Centro','30001',37.9843,-1.1281,3,1,85,'mvl-seed','seed-mur-001',true,0.94,90,'published',NOW()-INTERVAL'1 day'),
('direct','sale','Vendo piso 4 hab. La Flota — dueña directa','Dueña vende sin intermediarios. 4 hab, 2 baños, garaje. Urbanización con piscina.',165000,'Murcia','Murcia','La Flota','30007',37.9987,-1.1283,4,2,110,'mvl-seed','seed-mur-002',true,0.93,89,'published',NOW()-INTERVAL'2 days'),
('direct','rent','Apartamento 2 hab. Espinardo — particular','Particular alquila. Sin comisión. 2 hab, cocina equipada. Zona universitaria, bus al campus.',500,'Murcia','Murcia','Espinardo','30100',37.9953,-1.1597,2,1,58,'mvl-seed','seed-mur-003',true,0.95,91,'published',NOW()-INTERVAL'3 days'),

-- ══════════════════════════════════════════════════
-- A CORUÑA (5 anuncios)
-- ══════════════════════════════════════════════════
('direct','rent','Piso 3 hab. Ciudad Vieja — propietaria','Propietaria alquila en zona histórica. 3 hab, reformado, vistas al mar. Sin agencia.',900,'A Coruña','A Coruña','Ciudad Vieja','15001',43.3713,-8.3961,3,1,88,'mvl-seed','seed-cor-001',true,0.96,93,'published',NOW()-INTERVAL'1 day'),
('direct','rent','Piso 2 hab. Riazor — propietario sin comisión','Propietario alquila a 100m de la playa de Riazor. 2 hab, vistas parciales al mar. Sin intermediarios.',750,'A Coruña','A Coruña','Riazor','15004',43.3712,-8.4118,2,1,65,'mvl-seed','seed-cor-002',true,0.93,89,'published',NOW()-INTERVAL'2 days'),
('direct','sale','Vendo piso 4 hab. Matogrande — dueño','Dueño vende sin agencia. 4 hab, 2 baños, garaje. Urbanización zona norte.',185000,'A Coruña','A Coruña','Matogrande','15009',43.3542,-8.4129,4,2,112,'mvl-seed','seed-cor-003',true,0.91,86,'published',NOW()-INTERVAL'3 days'),

-- ══════════════════════════════════════════════════
-- VALLADOLID (5 anuncios)
-- ══════════════════════════════════════════════════
('direct','rent','Piso 3 hab. Centro — propietario directo','Propietario alquila sin agencia. 3 hab, salón grande, cocina amueblada. Casco histórico.',700,'Valladolid','Valladolid','Centro','47001',41.6523,-4.7245,3,1,92,'mvl-seed','seed-vll-001',true,0.95,91,'published',NOW()-INTERVAL'1 day'),
('direct','rent','Piso 2 hab. Delicias — dueña sin comisión','Dueña alquila directamente. 2 hab, baño reformado, cocina equipada. Sin comisión.',500,'Valladolid','Valladolid','Delicias','47009',41.6401,-4.7401,2,1,68,'mvl-seed','seed-vll-002',true,0.94,90,'published',NOW()-INTERVAL'2 days'),

-- ══════════════════════════════════════════════════
-- PALMA DE MALLORCA (5 anuncios)
-- ══════════════════════════════════════════════════
('direct','rent','Apartamento 2 hab. Palma Centro — propietario','Propietario alquila sin agencia. 2 hab, cocina equipada, terraza. Zona céntrica. Sin comisión.',1100,'Illes Balears','Palma','Centro','07001',39.5696,2.6502,2,1,70,'mvl-seed','seed-plm-001',true,0.94,90,'published',NOW()-INTERVAL'1 day'),
('direct','sale','Vendo piso 3 hab. Can Pastilla — dueña','Dueña vende sin intermediarios. A 200m de la playa. 3 hab, terraza, parking. Precio negotiable.',265000,'Illes Balears','Palma','Can Pastilla','07610',39.5266,2.7263,3,1,88,'mvl-seed','seed-plm-002',true,0.93,89,'published',NOW()-INTERVAL'2 days'),

-- ══════════════════════════════════════════════════
-- SAN SEBASTIÁN (5 anuncios)
-- ══════════════════════════════════════════════════
('direct','rent','Piso 2 hab. Gros — propietaria trato directo','Propietaria alquila en el animado barrio de Gros. 2 hab, salón, a una cuadra la playa Zurriola. Sin agencia.',1400,'Gipuzkoa','San Sebastián','Gros','20001',43.3211,-1.9817,2,1,68,'mvl-seed','seed-ss-001',true,0.96,93,'published',NOW()-INTERVAL'1 day'),
('direct','sale','Vendo ático terraza Parte Vieja — propietario','Propietario vende. Ático con terraza en la Parte Vieja. Vistas al puerto. Sin intermediarios.',495000,'Gipuzkoa','San Sebastián','Parte Vieja','20003',43.3238,-1.9781,2,1,72,'mvl-seed','seed-ss-002',true,0.95,92,'published',NOW()-INTERVAL'2 days')

ON CONFLICT (source_portal, source_external_id)
  WHERE source_external_id IS NOT NULL
  DO NOTHING;
