/** Barrios / zonas por ciudad para landings de contrato (SEO + confianza local). */
export type BarrioCiudad = { nombre: string; nota: string }

const BARRIOS: Record<string, BarrioCiudad[]> = {
  bilbao: [
    { nombre: 'Abando / Indautxu', nota: 'Alquiler y compraventa de alta rotación; conviene inventario y cláusulas claras.' },
    { nombre: 'Deusto', nota: 'Demanda familiar y universitaria; fianza vasca y duración LAU bien definidas.' },
    { nombre: 'Getxo / Barakaldo', nota: 'Área metropolitana de Bizkaia; mismo marco legal del País Vasco.' },
    { nombre: 'Casco Viejo / San Francisco', nota: 'Pisos urbanos; revisar comunidad, obras y subarrendamiento.' },
  ],
  valencia: [
    { nombre: 'Ruzafa / Eixample', nota: 'Alta demanda de alquiler; fianza Generalitat y actualización de renta al día.' },
    { nombre: 'Benimaclet / Campanar', nota: 'Perfil familiar y estudiante; inventario recomendable en amueblados.' },
    { nombre: 'El Carmen / Ciutat Vella', nota: 'Pisos históricos; revisar habitabilidad y régimen de obras.' },
    { nombre: 'Patraix / Quatre Carreres', nota: 'Zona residencial; contrato LAU de larga duración.' },
  ],
  madrid: [
    { nombre: 'Chamberí / Salamanca', nota: 'Rentas altas; cláusulas de actualización y garantías bien acotadas.' },
    { nombre: 'Malasaña / Centro', nota: 'Rotación alta; distinguir vivienda habitual vs temporal.' },
    { nombre: 'Usera / Carabanchel', nota: 'Demanda familiar; fianza y devolución explícitas.' },
    { nombre: 'Alcalá / Getafe (área)', nota: 'Área metropolitana; mismo LAU estatal.' },
  ],
  barcelona: [
    { nombre: 'Eixample / Gràcia', nota: 'Zonas tensionadas posibles; índice de referencia cuando aplique.' },
    { nombre: 'Sants / Les Corts', nota: 'Familias y larga duración; fianza INCASÒL.' },
    { nombre: 'Poblenou / Sant Martí', nota: 'Nueva demanda; revisar comunidad y obras.' },
    { nombre: 'L’Hospitalet / Badalona', nota: 'Área metropolitana; contrato LAU catalán.' },
  ],
  malaga: [
    { nombre: 'Centro / Soho', nota: 'Alquiler urbano; inventario y mascotas frecuentes.' },
    { nombre: 'Teatinos / El Palo', nota: 'Demanda residencial y universitaria.' },
    { nombre: 'Torremolinos / Benalmádena', nota: 'Costa; distinguir habitual vs temporada.' },
    { nombre: 'Marbella / Estepona', nota: 'Operaciones de mayor valor; arras y documentación críticas.' },
  ],
  sevilla: [
    { nombre: 'Triana / Los Remedios', nota: 'Alta demanda; contrato LAU con fianza andaluza.' },
    { nombre: 'Nervión / Sevilla Este', nota: 'Perfil familiar; actualización de renta clara.' },
    { nombre: 'Centro / Alameda', nota: 'Pisos urbanos; régimen de obras y comunidad.' },
    { nombre: 'Dos Hermanas / Alcalá', nota: 'Área metropolitana; mismo marco legal.' },
  ],
  zaragoza: [
    { nombre: 'Centro / Casco', nota: 'Rotación urbana; inventario en amueblados.' },
    { nombre: 'Delicias / Actur', nota: 'Demanda familiar y larga duración.' },
    { nombre: 'Universidad / Romareda', nota: 'Perfil estudiante; cláusulas de convivencia.' },
    { nombre: 'Utebo / Cuarte', nota: 'Cinturón metropolitano.' },
  ],
  alicante: [
    { nombre: 'Centro / Carolinas', nota: 'Alquiler urbano; fianza Comunitat Valenciana.' },
    { nombre: 'Playa de San Juan', nota: 'Costa; distinguir habitual vs temporada.' },
    { nombre: 'San Vicente / Elche', nota: 'Área metropolitana y comarca.' },
    { nombre: 'Benidorm / Altea', nota: 'Costa Blanca; arras y uso del inmueble bien definidos.' },
  ],
  santander: [
    { nombre: 'Centro / Puertochico', nota: 'Alquiler urbano de alta rotación.' },
    { nombre: 'El Sardinero / Cueto', nota: 'Residencial y temporada larga.' },
    { nombre: 'Camargo / Astillero', nota: 'Área metropolitana de Cantabria.' },
    { nombre: 'Torrelavega', nota: 'Comarca; mismo LAU estatal.' },
  ],
  vitoria: [
    { nombre: 'Ensanche / Casco', nota: 'Núcleo urbano; fianza País Vasco.' },
    { nombre: 'Lakua', nota: 'Residencial; duración LAU 5/7 años.' },
    { nombre: 'Zabalgana / Salburua', nota: 'Barrios familiares de expansión.' },
    { nombre: 'Área de Álava', nota: 'Mismo marco foral vasco.' },
  ],
  'san-sebastian': [
    { nombre: 'Gros / Centro', nota: 'Alta demanda y rentas elevadas.' },
    { nombre: 'Amara / Antiguo', nota: 'Perfil familiar; fianza vasca.' },
    { nombre: 'Egia / Intxaurrondo', nota: 'Residencial; inventario recomendable.' },
    { nombre: 'Irun / Hondarribia', nota: 'Comarca de Gipuzkoa; mismo contrato LAU.' },
  ],
  murcia: [
    { nombre: 'Centro / Vistabella', nota: 'Alquiler urbano.' },
    { nombre: 'Espinardo / Guadalupe', nota: 'Zona universitaria.' },
    { nombre: 'Infante / Santiago el Mayor', nota: 'Residencial familiar.' },
    { nombre: 'Área metropolitana', nota: 'Misma validez del contrato LAU.' },
  ],
  pamplona: [
    { nombre: 'Casco Antiguo / Ensanche', nota: 'Núcleo urbano de Pamplona.' },
    { nombre: 'Iturrama / San Juan', nota: 'Residencial y familiar.' },
    { nombre: 'Mendillorri / Rochapea', nota: 'Barrios de expansión.' },
    { nombre: 'Comarca de Pamplona', nota: 'Mismo marco legal navarro/estatal.' },
  ],
  coruna: [
    { nombre: 'Centro / Ciudad Vieja', nota: 'Alquiler urbano.' },
    { nombre: 'Os Mallos / Agra', nota: 'Residencial.' },
    { nombre: 'Oleiros / Arteixo', nota: 'Área metropolitana.' },
    { nombre: 'Santiago / Ferrol', nota: 'Galicia; mismo LAU estatal.' },
  ],
  palma: [
    { nombre: 'Centro / Born', nota: 'Alta demanda turística; distinguir habitual vs temporada.' },
    { nombre: 'El Terreno / Portixol', nota: 'Residencial y costa.' },
    { nombre: 'Son Espanyolet / Pere Garau', nota: 'Barrios urbanos.' },
    { nombre: 'Calvià / Marratxí', nota: 'Área de Mallorca.' },
  ],
  castellon: [
    { nombre: 'Centro / Grao', nota: 'Capital y puerto.' },
    { nombre: 'Benicàssim / Vila-real', nota: 'Provincia de Castellón.' },
    { nombre: 'Burriana / Vinaròs', nota: 'Costa norte.' },
    { nombre: 'Comunitat Valenciana', nota: 'Fianza autonómica AVANT/Generalitat.' },
  ],
  asturias: [
    { nombre: 'Oviedo centro', nota: 'Capital del Principado.' },
    { nombre: 'Gijón / El Natahoyo', nota: 'Mayor mercado de alquiler.' },
    { nombre: 'Avilés', nota: 'Área central asturiana.' },
    { nombre: 'Resto de Asturias', nota: 'Mismo LAU estatal.' },
  ],
  mallorca: [
    { nombre: 'Palma', nota: 'Principal mercado de la isla.' },
    { nombre: 'Calvià / Andratx', nota: 'Costa suroeste.' },
    { nombre: 'Alcúdia / Pollença', nota: 'Norte de Mallorca.' },
    { nombre: 'Manacor / Inca', nota: 'Interior; distinguir uso habitual.' },
  ],
}

export function getBarriosCiudad(slug: string): BarrioCiudad[] {
  return BARRIOS[slug] ?? [
    { nombre: 'Centro urbano', nota: 'Mayor rotación de alquiler y compraventa.' },
    { nombre: 'Barrios residenciales', nota: 'Contratos de larga duración LAU.' },
    { nombre: 'Área metropolitana', nota: 'Misma validez legal del contrato.' },
    { nombre: 'Zona costa / periferia', nota: 'Revisar si el uso es habitual o temporal.' },
  ]
}
