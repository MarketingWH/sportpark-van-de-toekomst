export const overviewCamera = {
  position: [58, 26, 36],
  target: [10, 1.8, 2],
};

export const products = [
  {
    id: 'damwand',
    zone: 'Aan het water',
    title: 'GreenMatter damwand',
    shortLabel: 'Damwand',
    color: '#5b7081',
    position: [-31, 2.2, 20],
    camera: {
      position: [-18, 9, 28],
      target: [-31, 1.2, 20],
    },
    summary:
      'Een robuuste oeverversterking voor zones waar belasting, waterdruk en beeldkwaliteit samenkomen in een duurzame sportparkopgave.',
    description:
      'De damwandzone laat zien hoe waterveiligheid, circulariteit en een rustige landschappelijke uitstraling elkaar kunnen versterken. Voor gemeenten en ontwikkelaars is dit een logische oplossing op plekken waar oevers jarenlang stabiel moeten blijven zonder frequente vervangingscycli.',
    benefits: [
      "Ontworpen voor langdurige stabiliteit langs watergangen, wadi's en retentiezones.",
      'Beperkt onderhoud en geen rot- of corrosieproblematiek zoals bij traditionele materialen.',
      'Rustige vormtaal die goed aansluit op een hoogwaardige park- en verblijfsomgeving.',
      'Geschikt om waterstructuren toekomstbestendig in te passen in sport- en recreatiegebieden.',
    ],
    stats: [
      { label: 'Levensduur', value: '75+ jaar' },
      { label: 'Onderhoud', value: 'Laag' },
      { label: 'Circulariteit', value: 'Herbruikbaar' },
      { label: 'Toepassing', value: 'Intensief belast' },
    ],
  },
  {
    id: 'walbeschoeiing',
    zone: 'Aan het water',
    title: 'Walbeschoeiing met zachte landschappelijke overgang',
    shortLabel: 'Walbeschoeiing',
    color: '#8aa27a',
    position: [-10, 1.8, 13],
    camera: {
      position: [2, 7.5, 20],
      target: [-10, 0.9, 13],
    },
    summary:
      'Een waterlijn die erosie voorkomt en tegelijk ruimte laat voor een natuurlijke, biodiverse oeverrand.',
    description:
      'Deze zone toont hoe walbeschoeiing kan bijdragen aan zowel oeverbescherming als ecologische kwaliteit. Door harde en zachte randen slim te combineren ontstaat een sportpark waar waterbeheer, verblijfskwaliteit en biodiversiteit elkaar versterken.',
    benefits: [
      'Ondersteunt een gecontroleerde waterlijn zonder de parkbeleving te verharden.',
      'Combineert erosiebescherming met kansen voor oeverbeplanting en biodiversiteit.',
      'Verlaagt beheerdruk door een stabiele randconstructie met rustige materialisering.',
      'Past goed in klimaatadaptieve herinrichtingen van sportparken en openbare ruimte.',
    ],
    stats: [
      { label: 'Oeverbeeld', value: 'Natuurlijk' },
      { label: 'Beheerdruk', value: 'Beperkt' },
      { label: 'Biodiversiteit', value: 'Versterkt' },
      { label: 'Projecttype', value: 'Waterfront' },
    ],
  },
  {
    id: 'terras',
    zone: 'Verblijf & klimaatadaptatie',
    title: 'Klimaatadaptief terras met GreenMatter picknicktafels op Ecorasters',
    shortLabel: 'Klimaatadaptief terras',
    color: '#c79358',
    position: [18, 1.9, 16],
    camera: {
      position: [31, 8, 25],
      target: [18, 1, 16],
    },
    summary:
      'Een verblijfslocatie die waterpasserende verharding, circulair meubilair en een comfortabele parkbeleving samenbrengt.',
    description:
      'Rond het clubgebouw ontstaat een terraszone waar piekbuien, hitte en intensief gebruik slim worden opgevangen. De combinatie van Ecorasters en GreenMatter picknicktafels levert een rustige, onderhoudsarme buitenruimte op die past bij sportverenigingen, scholen en multifunctionele sportparken.',
    benefits: [
      'Water kan lokaal infiltreren in plaats van direct af te stromen naar het riool.',
      'Circulair buitenmeubilair ondersteunt een duurzame en toekomstbestendige uitstraling.',
      'Geschikt voor dagelijks gebruik tijdens wedstrijden, evenementen en ontmoeting.',
      'Beperkt hittestress en voorkomt plasvorming op belangrijke verblijfsplekken.',
    ],
    stats: [
      { label: 'Waterpasserend', value: 'Ja' },
      { label: 'Gebruik', value: 'Intensief' },
      { label: 'Materiaal', value: 'Circulair' },
      { label: 'Beleving', value: 'Comfortabel' },
    ],
  },
  {
    id: 'parking',
    zone: 'Mobiliteit & opvang',
    title: 'Parkeerplaats met klimaatadaptieve Ecorasters',
    shortLabel: 'Parkeerplaats',
    color: '#93aa64',
    position: [43, 1.8, 16],
    camera: {
      position: [56, 8.5, 24],
      target: [43, 0.8, 16],
    },
    summary:
      'Een groene parkeeroplossing die verharding, draagkracht en waterberging slim in balans brengt.',
    description:
      'Voor sportparken zijn parkeerplaatsen vaak een grote bron van verhard oppervlak. In deze zone wordt parkeren gekoppeld aan infiltratie, koeling en een landschappelijk rustiger beeld. Dat maakt het terrein toekomstbestendiger bij piekbuien en hogere zomertemperaturen.',
    benefits: [
      'Beperkt afstromend hemelwater en ondersteunt lokale infiltratie.',
      'Geeft een groener en minder stenig beeld dan conventionele parkeeroplossingen.',
      'Geschikt voor dagelijkse bezoekersstromen en piekmomenten op wedstrijddagen.',
      'Past binnen klimaatadaptieve gebiedsontwikkeling met minder hitte-opbouw.',
    ],
    stats: [
      { label: 'Waterberging', value: 'Lokaal' },
      { label: 'Hittestress', value: 'Geremd' },
      { label: 'Draagkracht', value: 'Hoog' },
      { label: 'Beheer', value: 'Efficient' },
    ],
  },
  {
    id: 'bike-hub',
    zone: 'Fiets & toegang',
    title: 'Fietsenstalling met Ecorasters en GreenMatter fietsparkeersysteem',
    shortLabel: 'Fietsenstalling',
    color: '#7bb28e',
    position: [31, 1.9, -2],
    camera: {
      position: [45, 7.5, 7],
      target: [31, 0.9, -2],
    },
    summary:
      'Een heldere entreezone waar duurzame mobiliteit, waterinfiltratie en gebruiksgemak samenkomen.',
    description:
      'De fietsenstalling is ontworpen als een vanzelfsprekend onderdeel van de route naar het sportpark. Door de ondergrond klimaatadaptief uit te voeren en het fietsparkeren ruimtelijk rustig te organiseren, ontstaat een entree met minder verhardingsdruk en meer comfort voor bezoekers.',
    benefits: [
      'Stimuleert fietsgebruik als logisch alternatief voor de auto.',
      'Voorkomt een rommelig entreebeeld door een duidelijke stallingsstructuur.',
      'Waterpasserende ondergrond houdt de toegangszone bruikbaar tijdens natte periodes.',
      'Ondersteunt duurzaam mobiliteitsbeleid van gemeenten en sportaccommodaties.',
    ],
    stats: [
      { label: 'Modal shift', value: 'Fietsgericht' },
      { label: 'Ondergrond', value: 'Infiltrerend' },
      { label: 'Entreebeeld', value: 'Geordend' },
      { label: 'Beheer', value: 'Laag' },
    ],
  },
  {
    id: 'sports-floor',
    zone: 'Sport & ontmoeting',
    title: 'Sportveldje met GreenMatter modulaire sportvloer',
    shortLabel: 'Modulaire sportvloer',
    color: '#5d8a74',
    position: [32, 1.8, -28],
    camera: {
      position: [45, 8.5, -19],
      target: [32, 0.7, -28],
    },
    summary:
      'Een compacte sportzone die ontmoeting, laagdrempelige beweging en toekomstbestendig beheer samenbrengt.',
    description:
      'Deze sportvloer maakt het mogelijk om binnen een beperkt ruimtebeslag een aantrekkelijke nevenfunctie toe te voegen aan het park. De modulaire opbouw ondersteunt flexibiliteit in gebruik en maakt het eenvoudiger om zones later aan te passen of uit te breiden.',
    benefits: [
      'Geschikt voor multisport, ontmoeten en informeel bewegen in een compacte zone.',
      'De modulaire opbouw ondersteunt aanpasbaarheid in de tijd.',
      'Kan logisch worden ingepast tussen routing, verblijf en groenstructuren.',
      'Versterkt de dagelijkse gebruikswaarde van het sportpark buiten wedstrijdmomenten.',
    ],
    stats: [
      { label: 'Gebruik', value: 'Multifunctioneel' },
      { label: 'Opbouw', value: 'Modulair' },
      { label: 'Aanpasbaar', value: 'Ja' },
      { label: 'Doelgroep', value: 'Alle leeftijden' },
    ],
  },
  {
    id: 'bridge',
    zone: 'Toegang & routing',
    title: 'GreenMatter toegangsbrug',
    shortLabel: 'Toegangsbrug',
    color: '#6b907a',
    position: [3, 2.2, 8],
    camera: {
      position: [17, 8.5, 15],
      target: [3, 1, 8],
    },
    summary:
      'Een entree-element dat routing, identiteit en veilige oversteek over het water op een vanzelfsprekende manier verbindt.',
    description:
      'De toegangsbrug functioneert niet alleen als verbinding, maar ook als orientatiepunt binnen het park. Daarmee wordt de entree herkenbaar en ontstaat een duidelijke relatie tussen waterstructuur, verblijfskwaliteit en de route naar velden, clubgebouw en voorzieningen.',
    benefits: [
      'Maakt de waterstructuur onderdeel van de identiteit van het sportpark.',
      'Verbetert de routing en spreiding van bezoekersstromen.',
      'Ondersteunt veilige, duidelijke overgangen tussen verschillende parkdelen.',
      'Voegt verblijfskwaliteit toe aan de dagelijkse aankomst- en looproutes.',
    ],
    stats: [
      { label: 'Routing', value: 'Helder' },
      { label: 'Entreewaarde', value: 'Hoog' },
      { label: 'Veiligheid', value: 'Versterkt' },
      { label: 'Beleving', value: 'Iconisch' },
    ],
  },
  {
    id: 'jetty',
    zone: 'Waterbeleving',
    title: 'GreenMatter vissteiger',
    shortLabel: 'Vissteiger',
    color: '#4e8c9a',
    position: [-17, 1.7, -24],
    camera: {
      position: [-4, 7.5, -17],
      target: [-17, 0.8, -24],
    },
    summary:
      'Een rustige verblijfsplek aan het water die recreatie, natuurbeleving en inclusieve parkprogrammering verbindt.',
    description:
      'Met de vissteiger krijgt het sportpark meer dan alleen sportfuncties: het wordt een plek om te ontmoeten, te observeren en langer te verblijven. Daarmee groeit het terrein uit tot een veelzijdige openbare bestemming die ook buiten trainingsuren kwaliteit biedt.',
    benefits: [
      'Verbreed de gebruikswaarde van het terrein naar verblijf en recreatie.',
      'Versterkt de relatie tussen sportpark, landschap en waterbeleving.',
      'Biedt kansen voor natuureducatie, ontmoeting en rustige verblijfsplekken.',
      'Maakt het park aantrekkelijker voor verschillende doelgroepen en leeftijden.',
    ],
    stats: [
      { label: 'Verblijfsduur', value: 'Langer' },
      { label: 'Doelgroepen', value: 'Breed' },
      { label: 'Waterbeleving', value: 'Direct' },
      { label: 'Programma', value: 'Aanvullend' },
    ],
  },
];
