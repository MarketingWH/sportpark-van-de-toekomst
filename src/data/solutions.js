const parkImage = '/sportpark-photo-2026-05-19-1280.webp?v=1';
const defaultButtonText = 'Bekijk productpagina';

const videoExtensions = new Set(['mp4', 'webm', 'mov', 'm4v', 'ogg']);

function parkCrop(label, objectPosition, alt) {
  return {
    type: 'image',
    src: parkImage,
    alt,
    objectPosition,
    label,
  };
}

function mediaPath(relativeFolder, fileName) {
  const segments = ['media', 'solutions', ...relativeFolder.split('/'), fileName];
  return `/${segments.map((segment) => encodeURIComponent(segment)).join('/')}`;
}

function folderMedia(relativeFolder, fileNames, title, labelPrefix = 'Foto') {
  return fileNames.map((fileName, index) => {
    const extension = fileName.split('.').pop()?.toLowerCase() ?? '';
    const shared = {
      src: mediaPath(relativeFolder, fileName),
      label: `${labelPrefix} ${index + 1}`,
    };

    if (videoExtensions.has(extension)) {
      return {
        ...shared,
        type: 'video',
        title: `${title} video ${index + 1}`,
      };
    }

    return {
      ...shared,
      type: 'image',
      alt: `${title} - ${labelPrefix.toLowerCase()} ${index + 1}`,
      objectPosition: 'center center',
    };
  });
}

function youtubeMedia(url, title) {
  return {
    type: 'youtube',
    url,
    title,
  };
}

const waterbouwMedia = [
  youtubeMedia('https://www.youtube.com/watch?v=d2LiHRxQ_KM', 'Waterbouw - Brug video'),
  youtubeMedia(
    'https://www.youtube.com/watch?v=30fEoV5cv7k',
    'Waterbouw - Walbeschoeiing video',
  ),
  youtubeMedia(
    'https://www.youtube.com/watch?v=cIMAjaQevi8',
    'Waterbouw - Vissteiger video',
  ),
  youtubeMedia('https://www.youtube.com/watch?v=BQ1up2yy4so', 'Waterbouw - Damwand video'),
  ...folderMedia(
    'Waterbouw/Walbeschoeiing',
    ['GreenMatter walbeschoeiing (1).JPG'],
    'Waterbouw',
    'Walbeschoeiing',
  ),
  ...folderMedia(
    'Waterbouw/Brug',
    [
      '20221123_122007.jpg',
      '20241206 GM - Gemeente Haarlem - Groene Brug.jpg',
    ],
    'Waterbouw',
    'Brug',
  ),
  ...folderMedia(
    'Waterbouw/Damwand',
    ['Combi damwanden Bosbaan oktober 2021  (6).jpg'],
    'Waterbouw',
    'Damwand',
  ),
 ...folderMedia(
    'Waterbouw/Vissteiger',
    ['GM Vissteiger (1).JPG'],
    'Waterbouw',
    'Vissteiger',
  ),
];

const modulaireSportvloerenMedia = [
  youtubeMedia(
    'https://www.youtube.com/watch?v=GfaEm3qliAY',
    'Modulaire sportvloeren video 1',
  ),
  youtubeMedia(
    'https://www.youtube.com/watch?v=o4dprA2wwCQ',
    'Modulaire sportvloeren video 2',
  ),
  ...folderMedia(
    'Modulaire sportvloeren',
    [
      'GreenMatter-modulaire-sportvloer-groen-Tilburg_1.jpg',
      'modulaire sportvloer.webp',
      'GreenMatter-modulaire-sportvloer-3x3-basketball-court_8.jpg',
      'GreenMatter-modulaire-sportvloer-Tilburg-1_3.jpg',
      'Heer-vrankenstraat.JPG_4.jpg',
    ],
    'Modulaire sportvloeren',
    'Sportvloer',
  ),
];

const vlonderplankenMedia = folderMedia(
  'GreenMatter vlonderplanken',
  [
    'GreenMatter-vlonderplanken.JPG_1.jpg',
  ],
  'GreenMatter vlonderplanken',
  'Vlonder',
);

const fitnessparkMedia = [
  youtubeMedia('https://www.youtube.com/watch?v=uKLZc567DdQ', 'GreenMatter fitnesspark video'),
  ...folderMedia(
    'GreenMatter fitnesspark',
    [
      'GreenMatter fitnesspark.webp',
      'WhatsApp Image 2025-11-26 at 16.13.05 (1).jpg',
      'GreenMatter-QR-FIT-beweegbank-header_2.jpg',
      'WhatsApp Image 2025-11-26 at 16.13.04.jpg',
      'WhatsApp Image 2025-11-26 at 16.13.04 (4).jpg',
      'WhatsApp Image 2025-11-26 at 16.13.05 (5).jpg',
      'WhatsApp Image 2025-11-26 at 16.13.05 (6).jpg',
    ],
    'GreenMatter fitnesspark',
    'Fitnesspark',
  ),
];

const dugoutMedia = folderMedia(
  'GreenMatter dug-Out',
  [
    'GM Dugout.jpg',
  ],
  'GreenMatter dug-out',
  'Dug-out',
);

const kantplankenMedia = [
  youtubeMedia('https://www.youtube.com/watch?v=Wtb5tms_QZc', 'GreenMatter kantplanken video'),
  ...folderMedia(
    'GreenMatter kantplanken',
    [
      'P1100463.JPG.jpg',
      '20210601 GM - Kantplanken voetbal.jpg',
      'Kantplanken Pernis.jpg',
      'kantplanken-2_1.jpg',
      'P1100463.JPG.jpg',
      'Site3-e1678799514614_5.jpg',
    ],
    'GreenMatter kantplanken',
    'Kantplank',
  ),
];

const ecorasterPadMedia = [
  youtubeMedia(
    'https://www.youtube.com/watch?v=BwAZAEGyKwE',
    'Waterdoorlatende tegels van Ecoraster video',
  ),
  ...folderMedia(
    'Waterdoorlatende tegels van ecoraster',
    ['DJI_0206 pad.JPG'],
    'Waterdoorlatende tegels van Ecoraster',
    'Ecoraster pad',
  ),
];

const terrasMedia = [
  youtubeMedia('https://www.youtube.com/watch?v=2pCCWXfbRPU', 'Klimaatadaptief terras video'),
  ...folderMedia(
    'Klimaatadaptief terras',
    [
      'Ecoraster bloxx met picknicktafels.jpg',
      'groenste terras.jpg',
      '74c0a87b-b12a-4218-8b80-ed05da2ca4c3.jpg',
      'Bloembakken (2).jpg',
      'DJI_0219.JPG.jpg',
      'GM ecoraster bloxx met bloembak.jpg',
      '20250909 GM - Ecoraster spellen (2).jpg',
    ],
    'Klimaatadaptief terras',
    'Terras',
  ),
];

const speeltoestellenMedia = [
 youtubeMedia('https://www.youtube.com/watch?v=3LOkswUYy_Q', 'Leisure Lands'),
  {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=UHa9XNbhOQ0',
    title: 'Speeltoestellen video',
  },
  ...folderMedia(
    'Speeltoestellen',
    [
      'Speeltoestel.jpg',
      'Speeltoestel2.jpg',
    ],
    'Speeltoestellen',
    'Speelplek',
  ),
];

const fietsenstallingMedia = folderMedia(
  'Klimaatadaptieve fietsenstalling',
  [
    'Klimaatadaptieve fietsenstalling.webp',
    'Klimaatadaptieve fietsenstalling 2.webp',
    'IMG_4358.JPG.jpg',
    'IMG_4361.JPG.jpg',
  ],
  'Klimaatadaptatieve fietsenstalling',
  'Fietsenstalling',
);

const solarWoodleMedia = [
  youtubeMedia('https://www.youtube.com/watch?v=A0rrS0pytiA', 'GreenMatter Solar Woodle video'),
  ...folderMedia(
    'Greenmatter Solar Woodle',
    [
      '20240311 Solar - persoon 4505_2 (web).jpg',
      'Solar paal (1).jpg',
      '20260207_182835.jpg',
      'Solar woodle deata.jpg',
    ],
    'GreenMatter Solar Woodle',
    'Solar',
  ),
];

const parkeerplaatsMedia = [
  youtubeMedia(
    'https://www.youtube.com/watch?v=OV8bCw6BQw4',
    'Klimaatadaptatieve parkeerplaats video',
  ),
  ...folderMedia(
    'Klimaatadaptieve parkeerplaats',
    [
      '20260423 Ecoraster Bloxx - Nederlands kenteken_2.jpg',
      'PP_Parkplatz-06-18-15_bearbeitet_1600x1200-1024x777.jpg',
      '20241121 GM - Ecoraster (Gras)Tegels - Insta (2).jpg',
      '20260331 GM - Klimaatadaptief parkeerterrein Delft.jpg',
      'Alternatief vor header.jpg',
      'bewerkt.jpg',
      'DJI_0024.JPG.jpg',
      'DJI_0028.JPG.jpg',
      'Ecoraster_8.jpg',
      'Ecoraster-tegel_5.jpg',
      'GreenMatter_ecoraster_(gras)tegels__05__GreenMatter-Ecoraster-GME50-grastegel-eco.jpg',
      'IMG_0124.jpg',
    ],
    'Klimaatadaptatieve parkeerplaats',
    'Parkeerplaats',
  ),
];

// Pas deze array centraal aan voor:
// 1. de hotspots op de sportparkfoto
// 2. de preview-kaartjes bij de hotspots
// 3. de oplossing-secties verderop op de pagina
//
// Belangrijk:
// - `x` en `y` zijn percentages op de huidige sportparkfoto.
// - `mobileX` en `mobileY` zijn optionele percentages voor de mobiele parkfoto.
//   Laat je ze weg, dan gebruikt mobiel automatisch ook `x` en `y`.
// - Het EERSTE item in `media` wordt automatisch gebruikt als foto
//   in het kleine hotspot-kaartje op de parkweergave.
// - Per oplossing kun je nu media direct uit de juiste oplossingsmap halen
//   onder `public/media/solutions/...`.
// - `summary` mag een string zijn, of een array van strings voor meerdere alinea's:
//   summary: ['Eerste alinea.', 'Tweede alinea.']
// - In `description`, `summary` en `benefits` kun je links zetten met:
//   [Linktekst](https://voorbeeld.nl)
// - `buttonText` mag per oplossing een eigen tekst krijgen.
//   Laat je hem leeg of weg, dan wordt automatisch `Bekijk productpagina` gebruikt.
//   Voorbeeld:
//   buttonText: 'Bekijk hier onze PDF',
export const solutions = [
  {
    id: 'waterbouw',
    title: 'Waterbouw',
    description:
      'Walbeschoeiing, damwand, toegangsbrug, vissteiger',
    summary:
      'Wij zien water niet als een grens, maar als een kans. Met  circulaire waterbouwoplossingen transformeer je sloten, vijvers en oevers tot waardevolle onderdelen van het sportpark van de toekomst. Ze versterken de verbinding tussen sport, natuur en recreatie en maken van het water een plek om te beleven, te ontmoeten en te ontspannen.',
    x: 13,
    y: 62.1,
    benefits: [
      '[Walbeschoeiing](https://greenmatter.nl/oplossingen/walbeschoeiing/) – Een duurzame en onderhoudsarme oeverafwerking die afkalving voorkomt en, dankzij het circulaire kunstgras , aanzienlijk langer meegaat dan traditionele houten beschoeiing. Hierdoor blijft de oever jarenlang stabiel en verzorgd met minimale onderhoudskosten.',
      '[Damwand](https://greenmatter.nl/oplossingen/damwand/) – Een robuuste circulaire constructie voor stabiele waterkanten en het opvangen van hoogteverschillen. ',
      '[Toegangsbrug](https://greenmatter.nl/oplossingen/toegangsbrug/) – Een circulaire brug die verschillende delen van het sportpark op een veilige en aantrekkelijke manier met elkaar verbindt. ',
      '[Steigers](https://greenmatter.nl/oplossingen/vissteiger/) – Een uitnodigende plek aan het water waar ontspanning, ontmoeting en natuurbeleving samenkomen.',
    ],
    media: waterbouwMedia,
    mobileX: 30,
    mobileY: 30,
    buttonText: 'Hier meer over oeverbescherming!',
    url: 'https://greenmatter.nl/oplossingen-voor-oeverbescherming/',
  },
  {
    id: 'modulaire-sportvloeren',
    title: 'Modulaire sportvloeren',
    description:
      'GreenMatter Ultimate, GreenMatter Ultimate Plus',
    summary: [
          'Een modern sportpark is meer dan een plek om te sporten. Het is een ontmoetingsplek waar jong en oud, beginners en gevorderden, recreanten en topsporters samen actief kunnen zijn. Inclusiviteit speelt daarbij een centrale rol. Met onze modulaire sportvloer creëer je een veelzijdige en toegankelijke sportvoorziening die uitnodigt tot bewegen, ontmoeten en samen sporten.',
          'Dankzij het modulaire karakter kan de vloer volledig worden afgestemd op de wensen van de omgeving en de gebruikers. Zo zijn er verschillende sporten die de gebruiker kan beoefenen op onze modulaire sportvloeren, denk hierbij sporten zoals; 3X3 basketbal, padel, picklebal, zaalhockey en nog veel meer!',
          'De sportvloer is onderhoudsarm en gaat jarenlang mee. Zo ontstaat een duurzame sportomgeving die flexibiliteit, prestaties en inclusiviteit samenbrengt. De sportvloer is beschikbaar in twee uitvoeringen: Ultimate en Ultimate Plus. Beide systemen combineren hoogwaardige sporttechnische eigenschappen met een lange levensduur en minimaal onderhoud. Hiernaast kunnen de tegels apart van elkaar besteld worden in andere kleuren. Zo ontstaat er een leuke mogelijkheid om bepaalde patronen aan de veldjes toe te voegen.',
    ],
    x: 27,
    y: 37,
    mobileX: 32,
    mobileY: 56,
    benefits: [
      'Ultimate – Een veelzijdige modulaire sportvloer met uitstekende speeleigenschappen voor dagelijks en intensief gebruik. ',
      'Ultimate Plus – Onze premium uitvoering met extra comfort, optimale demping en maximale prestaties voor sporters van ieder niveau. ',
    ],
    media: modulaireSportvloerenMedia,
    buttonText: defaultButtonText,
    url: 'https://greenmatter.nl/oplossingen/modulaire-sportvloer/',
  },
  {
    id: 'vlonderplanken',
    title: 'GreenMatter vlonderplanken',
    description:
      'Vlonderplank',
    summary:
    [
      'Het sportpark van de toekomst is meer dan alleen een plek om te sporten. Vlonders langs het water creëren aantrekkelijke plekken om te wandelen, te verblijven en te genieten van de omgeving. Zo ontstaat een toegankelijke en inclusieve buitenruimte voor jong en oud.',
      'Met onze vlonderplanken  realiseer je duurzame terrassen, steigers en wandelroutes met een natuurlijke uitstraling. De planken zijn onderhoudsarm en bestand tegen intensief gebruik en uiteenlopende weersomstandigheden. Daarmee vormen ze een toekomstbestendige oplossing voor iedere buitenruimte.',
    ],
    x: 50.8,
    y: 19,
    mobileX: 67,
    mobileY: 40,
    benefits: [
      'Geschikt voor vlonders, steigers, bruggen en parkverbindingen dicht bij het water.',
      'Optioneel leverbaar met antislipafwerking voor veilig gebruik in natte zones.',
      'Ondersteunt een circulaire en onderhoudsarme inrichting met lange levensduur.',
    ],
    media: vlonderplankenMedia,
    buttonText: defaultButtonText,
    url: 'https://greenmatter.nl/oplossingen/vlonderplanken/',
  },
  {
    id: 'fitnesspark',
    title: 'GreenMatter fitnesspark',
    description:
      'Het GreenMatter Fitnesspark',
    summary:
    [
      'Het sportpark van de toekomst is een plek waar iedereen in beweging kan komen. Jong en oud, beginners en ervaren sporters, recreanten en fanatieke sporters: inclusiviteit staat centraal. Outdoor fitnesstoestellen maken sporten laagdrempelig en toegankelijk voor een brede doelgroep en dragen zo bij aan een gezonde en vitale leefomgeving.',
      'Met het GreenMatter Fitnesspark creëer je een veelzijdige beweegplek waar kracht, conditie en gezondheid samenkomen. De toestellen zijn geschikt voor warming-ups, krachttraining, revalidatie en recreatief gebruik en vormen daarmee een waardevolle aanvulling op ieder toekomstbestendig sportpark.',
    ],
    x: 58.4,
    y: 22.1,
    mobileX: 71,
    mobileY: 50,
    benefits: [
      'Fitnesspark ATHLETIC – Een complete outdoor fitnessoplossing die jong en oud uitnodigt om op een laagdrempelige manier te bewegen en te sporten in de buitenlucht.',
     ],
    media:
      fitnessparkMedia.length > 0
        ? fitnessparkMedia
        : [
            parkCrop(
              'Fitnesspark',
              '58% 22%',
              'GreenMatter fitnesspark in de bovenste parkzone',
            ),
            parkCrop(
              'Beweegzone',
              '61% 20%',
              'Openbare beweegzone als onderdeel van het sportpark',
            ),
          ],
    buttonText: defaultButtonText,
    url: 'https://greenmatter.nl/oplossingen/fitnesspark-athletic/',
  },
  {
    id: 'dugout',
    title: 'GreenMatter dug-out',
    description:
      'Onze circulaire dug-out',
    summary:
    [
      'De GreenMatter dug-out biedt spelers, coaches en begeleiders een comfortabele en beschutte plek langs het veld. Extra bijzonder is dat deze dug-out kan worden vervaardigd uit circulaire materialen die afkomstig zijn van versleten sportvelden dat er direct naast ligt. Zo krijgt oud materiaal een nieuw leven en wordt circulariteit letterlijk zichtbaar op het sportpark.',
      'Bekijk met een druk op de onderstaande knop hoe een dug-out van het veld van vandaag de sportomgeving van morgen vormt.',
    ],
      
    x: 44,
    y: 46.7,
    mobileX: 40,
    mobileY: 65,
    benefits: [
      'Verbetert de uitstraling en functionaliteit langs het hoofdveld.',
      'Modulair opgebouwd, waardoor maatwerk per sportpark mogelijk blijft.',
      'Ontwikkeld vanuit circulair materiaalgebruik en onderhoudsarm beheer.',
    ],
    media:
      dugoutMedia.length > 0
        ? dugoutMedia
        : [
            parkCrop(
              'Dug-outzone',
              '39% 47%',
              'GreenMatter dug-out langs het hoofdveld van het sportpark',
            ),
            parkCrop(
              'Langs het veld',
              '42% 45%',
              'Dug-out als onderdeel van een verzorgd sportparkbeeld',
            ),
          ],
    buttonText: defaultButtonText,
    url: 'https://greenmatter.nl/oplossingen/dug-out/',
  },
  {
    id: 'kantplanken',
    title: 'GreenMatter kantplanken',
    description:
      'Circulaire kantplanken',
    summary:
    ['De kracht van een toekomstbestendig sportpark zit vaak in de afwerking. Juist de subtiele elementen bepalen hoe strak, duurzaam en onderhoudsvriendelijk een buitenruimte functioneert. Kantplanken zorgen voor een nette en duurzame afscheiding langs sportvelden en hekwerken. Daarnaast helpen ze om infill binnen het veld te houden en de verspreiding van microplastics tegen te gaan, waardoor ze bijdragen aan een verzorgde, veilige en toekomstbestendige sportomgeving.', 
    'Met onze kantplank  kies je voor een circulaire oplossing die ontworpen is om jarenlang mee te gaan. In tegenstelling tot traditionele houten opsluitingen rotten deze kantplanken niet en behouden ze hun vorm en uitstraling, zelfs bij intensief gebruik en wisselende weersomstandigheden.',
   ],
      
    x: 46.8,
    y: 63.1,
    mobileX: 35,
    mobileY: 73,
    benefits: [
      'Houdt instrooimateriaal beter binnen het veldsysteem.',
      'Geeft sportvelden een verzorgde en rustige afwerking langs de randen.',
      'Ondersteunt circulair en onderhoudsarm terreinbeheer.',
    ],
    media: kantplankenMedia,
    buttonText: defaultButtonText,
    url: 'https://greenmatter.nl/oplossingen/kantplank-2-0/',
  },
  {
    id: 'ecoraster-pad',
    title: 'Pad met de GreenMatter Ecoraster als ondergrond',
    description:
      'GreenMatter ecoraster bloxx, GreenMatter ecoraster (gras)tegels, GreenMatter ecoraster (gras)tegels XXL',
    summary:
    ['In het sportpark van de toekomst verbinden looppaden sportvelden, ontmoetingsplekken en recreatieve zones met elkaar. Ze zorgen voor comfortabele en toegankelijke routes voor iedereen en dragen dankzij waterdoorlatende materialen bij aan een klimaatadaptieve en toekomstbestendige inrichting.',
      'Met onze ecoraster-oplossingen  realiseer je paden die waterdoorlatend, onderhoudsarm en duurzaam zijn. Regenwater kan direct in de bodem infiltreren, waardoor plassen worden voorkomen en het sportpark beter bestand is tegen extreme weersomstandigheden. Zo dragen looppaden niet alleen bij aan gebruiksgemak, maar ook aan een inclusieve en toekomstbestendige openbare ruimte.',

    ],
      
    x: 53.5,
    y: 68,
    mobileX: 38,
    mobileY: 79,
    benefits: [
      '[GreenMatter ecoraster bloxx](https://greenmatter.nl/oplossingen/ecoraster-bloxx/) – Een stijlvolle en robuuste oplossing voor comfortabele wandelpaden met een natuurlijke uitstraling.',
      '[GreenMatter ecoraster (gras)tegels](https://greenmatter.nl/oplossingen/ecoraster-grastegels/) – Een waterdoorlatende oplossing waarbij groen en functionaliteit perfect samenkomen.',
    ],
    media: ecorasterPadMedia,
  },
  {
    id: 'terras',
    title: 'Klimaatadaptief terras',
    description:
      'Picknicktafel 2 banks, picknicktafel 4 banks, teamtafel, mobiele bank met rugleuning, bloembak',
    summary:
    [
      'Een toekomstbestendig sportpark draait niet alleen om sport, maar ook om beleving. Het terras vormt de plek waar wedstrijden worden nabesproken, vrijwilligers samenkomen en supporters genieten van het uitzicht op het veld. Met onze circulaire en klimaatadaptieve terrasoplossingen  creëer je een sfeervolle buitenruimte die uitnodigt tot ontmoeten, ontspannen en verbinden.',
      'Door waterdoorlatende verharding, duurzame verlichting, groen en circulair buitenmeubilair slim te combineren, ontstaat een comfortabele ontmoetingsplek met een hoogwaardige uitstraling. Veel producten worden vervaardigd uit gerecycled kunstgras van versleten sportvelden, waardoor het sportpark letterlijk een tweede leven krijgt in de inrichting van het terras.',
    ],
      
    x: 76.1,
    y: 35.8,
    mobileX: 75,
    mobileY: 65,
    benefits: [
      '[Ecoraster (gras)tegels](https://greenmatter.nl/oplossingen/ecoraster-grastegels/) – Waterdoorlatende verharding die regenwater infiltreert en plasvorming voorkomt. ',
      '[Solar verlichting](https://greenmatter.nl/oplossingen/solar/) – Energiezuinige verlichting op zonne-energie voor extra sfeer en veiligheid. ',
      '[Bloembak Berlin Field Green](https://greenmatter.nl/oplossingen/plantenbak-berlijn-field-green/) – Duurzame plantenbakken die zorgen voor een groene en uitnodigende uitstraling. ',
      '[Picknickset](https://greenmatter.nl/oplossingen/picknicktafel-4-banks/) (2 of 4 banks) – Robuuste picknicktafels voor ontspannen momenten langs het veld.',
      '[Teamtafel](https://greenmatter.nl/oplossingen/teamtafel/) – Een centrale ontmoetingsplek voor teams, vrijwilligers en bezoekers.',
    ],
    media: terrasMedia,
    buttonText: 'Ons klimaatadaptieve terras!',
    url: 'https://greenmatter.nl/wp-content/uploads/2026/05/Flyer-GreenMatter-Circulair-en-klimaatadaptief-terras.pdf',
  },
  {
    id: 'speeltoestellen',
    title: 'Speeltoestellen',
    description:
      'W&H Play',
    summary:
    [
      'Sporten begint met spelen. Door kinderen al op jonge leeftijd uit te dagen om te klimmen, balanceren en ontdekken, ontstaat spelenderwijs de basis voor een leven lang bewegen. In het sportpark van de toekomst zijn speeltoestellen daarom veel meer dan een extra voorziening: ze vormen een belangrijke schakel in het stimuleren van beweging, ontwikkeling en inclusiviteit.',
      'Met de duurzame speeltoestellen van W&H Play creëer je een veilige en uitnodigende speelplek waar kinderen actief kunnen zijn terwijl ouders, broertjes en zusjes betrokken blijven bij het sportpark. De toestellen worden vervaardigd uit gerecycled kunststof en zijn ontworpen voor jarenlang intensief gebruik. Zo ontstaat een toekomstbestendige speelomgeving waar sport, spel en ontmoeting op natuurlijke wijze samenkomen.',
      'Klik op de onderstaande knop en krijg meer informatie te zien over W&H Play!',
     ],
      
    x: 88.7,
    y: 58,
    mobileX: 69,
    mobileY: 85,
    benefits: [
      'Vergroot de verblijfswaarde van het park voor gezinnen en buurtgebruikers.',
      'Maakt van het sportpark een plek waar bewegen, spelen en ontmoeten samenkomen.',
      'Sluit goed aan op een groene, circulaire en toekomstbestendige buitenruimte.',
    ],
    media: speeltoestellenMedia,
    buttonText: defaultButtonText,
    url: 'https://whplay.nl/',
  },
  {
    id: 'fietsenstalling',
    title: 'Klimaatadaptatieve fietsenstalling',
    description:
      'Fietsparkeersysteem, solar verlichting, ecoraster (gras)tegels',
    summary:
    [
      'In het sportpark van de toekomst begint duurzaamheid al bij aankomst. De circulaire en klimaatadaptieve fietsenstalling van GreenMatter combineert oplossingen voor veilig fietsparkeren, waterbeheer en energiezuinige verlichting in één doordacht totaalconcept. Deze oplossing is speciaal ontwikkeld voor sportparken waar circulariteit, klimaatadaptatie en gebruiksgemak centraal staan.',
      'Door het fietsparkeersysteem te combineren met solar verlichting en ecoraster (gras)tegels ontstaat een veilige en overzichtelijke stallingsvoorziening. ',
    ],
      
    x: 61.8,
    y: 70.3,
    mobileX: 41,
    mobileY: 87,
    benefits: [
      '[Fietsparkeersysteem](https://greenmatter.nl/oplossingen/fietsparkeersysteem/) – Een modulair systeem voor het veilig en overzichtelijk stallen van fietsen. ',
      '[Solar verlichting](https://greenmatter.nl/oplossingen/solar/) – Energiezuinige verlichting op zonne-energie voor extra veiligheid en comfort. ',
      '[Ecoraster (gras)tegels](https://greenmatter.nl/oplossingen/ecoraster-grastegels/) – Waterdoorlatende verharding die regenwater natuurlijk infiltreert en plasvorming voorkomt.',
    ],
    media: fietsenstallingMedia,
    buttonText: 'Ons klimaatadaptieve fietsenstalling',
    url: 'https://greenmatter.nl/wp-content/uploads/2026/05/Flyer-GreenMatter-Circulaire-en-klimaatadaptieve-fietsenstalling.pdf',
  },
  {
    id: 'solar-woodle',
    title: 'GreenMatter Solar Woodle',
    description:
      'Onze circulaire en door zon aangedreven verlichting',
    summary:
    [
      'In het sportpark van de toekomst speelt verlichting een belangrijke rol in veiligheid, duurzaamheid en gebruiksgemak. Met de solar verlichting verlicht je wandelpaden, parkeerplaatsen en ontmoetingsplekken zonder aansluiting op het elektriciteitsnet. Overdag wordt zonne-energie opgeslagen, zodat het sportpark ook in de avond veilig en aantrekkelijk blijft.',
      'Deze oplossing combineert innovatieve technologie met een minimale ecologische voetafdruk en maakt het mogelijk om ook op moeilijk bereikbare locaties eenvoudig verlichting te plaatsen. ',
    ],
      
    x: 80,
    y: 58,
    mobileX: 74,
    mobileY: 80,
    benefits: [
      'Werkt volledig op zonne-energie en ondersteunt een toekomstbestendige, energiezuinige buitenruimte.',
      'Geschikt als orientatieverlichting langs paden, entrees en verblijfsroutes in en rond het sportpark.',
      'Combineert circulair materiaalgebruik met eenvoudige plaatsing en weinig onderhoud.',
    ],
    media: solarWoodleMedia,
    buttonText: defaultButtonText,
    url: 'https://greenmatter.nl/oplossingen/solar/',
  },
  {
    id: 'parkeerplaats',
    title: 'Klimaatadaptatieve parkeerplaats',
    description:
      'GreenMatter Ecoraster bloxx, GreenMatter Ecoraster (gras)tegels, solar verlichting',
    summary:
    [
      'In het sportpark van de toekomst is de parkeerplaats veel meer dan een praktische voorziening. Het is een visitekaartje dat direct laat zien hoe duurzaamheid en klimaatadaptatie samenkomen. Met deze innovatieve parkeeroplossingen van GreenMatter ontstaat een circulaire en veilige parkeeromgeving waarin regenwater natuurlijk infiltreert en verlichting volledig werkt op zonne-energie.',
      'Door solar verlichting te combineren met ecoraster (gras)tegels realiseer je een onderhoudsarme parkeerplaats die wateroverlast voorkomt, hittestress vermindert en bezoekers ook in de avonduren veilig laat parkeren.',
    ],
      
    x: 75.3,
    y: 72.6,
    mobileX: 56,
    mobileY: 85,
    benefits: [
      '[Ecoraster (gras)tegels](https://greenmatter.nl/oplossingen/ecoraster-grastegels/) – Waterdoorlatende parkeeroplossingen die regenwater op natuurlijke wijze infiltreren en zorgen voor een groene uitstraling.',
      '[Solar verlichting](https://greenmatter.nl/oplossingen/solar/) – Energiezuinige verlichting op zonne-energie voor een veilige parkeeromgeving zonder netaansluiting.',
    ],
    media: parkeerplaatsMedia,
    buttonText: 'Ons klimaatadaptieve parkeerplaats',
    url: 'https://greenmatter.nl/wp-content/uploads/2026/05/Flyer-GreenMatter-Circulaire-en-klimaatadaptieve-parkeerplaatsen.pdf',
  },
];
