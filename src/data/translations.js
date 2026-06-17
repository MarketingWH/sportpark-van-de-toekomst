export const uiText = {
  nl: {
    languageToggle: 'English',
    languageLabel: 'Bekijk de pagina in het Engels',
    countdownLabel: 'Dagen tot deadline grondstoffenbeleid 2030:',
    countdownUnits: ['Dagen', 'Uur', 'Minuten', 'Seconden'],
    solarOn: 'Solar aan',
    solarOff: 'Solar uit',
    switchToDay: 'Schakel naar dagweergave',
    switchToNight: 'Schakel naar avondweergave',
    scrollFurther: 'Scroll verder',
    hotspotLabel: 'Oplossing',
    viewSolution: 'Bekijk oplossing',
    goToSolution: 'Ga naar oplossing',
    closeHotspot: 'Sluit hotspotinformatie',
    heroDayAlt: 'Sportpark van de Toekomst in daglicht',
    heroNightAlt: 'Sportpark van de Toekomst in avondverlichting',
    homeLogoAlt: 'GreenMatter - Het sportpark van de toekomst',
    solutionsHeading: 'Oplossingen in detail',
    solutionsIntro:
      'Bekijk hier op je gemak al onze oplossingen die wij passend vinden voor het sportpark van de toekomst. Ben je geïnspireerd geraakt? Klik dan hieronder de oplossingen aan die jou interesseren en gebruik daarna de mailknop. We maken het je makkelijk: er staat meteen een mailtje met jouw aangeklikte oplossingen klaar.',
    quoteButton: 'Offerte aanvragen',
    quoteButtonWithCount: (count) =>
      `Offerte aanvragen • ${count} ${count === 1 ? 'product' : 'producten'}`,
    quoteSubject: 'Aanvraag Sportpark van de Toekomst',
    quoteBody: (productNames) => `Hallo GreenMatter,

Ik ben geïnteresseerd in de volgende producten:

- ${productNames.join('\n- ')}

Kunnen jullie meer informatie sturen?

Met vriendelijke groet,`,
    whitepaperButton: 'Download whitepaper',
    mobileWhitepaperButton: 'Whitepaper',
    defaultProductButton: 'Bekijk productpagina',
    readMore: 'Meer lezen',
    readLess: 'Minder lezen',
    possibleSolutions: 'Mogelijke oplossingen',
  },
  en: {
    languageToggle: 'Nederlands',
    languageLabel: 'View the page in Dutch',
    countdownLabel: 'Days until the 2030 raw materials policy deadline:',
    countdownUnits: ['Days', 'Hours', 'Minutes', 'Seconds'],
    solarOn: 'Solar on',
    solarOff: 'Solar off',
    switchToDay: 'Switch to daytime view',
    switchToNight: 'Switch to evening view',
    scrollFurther: 'Scroll down',
    hotspotLabel: 'Solution',
    viewSolution: 'View solution',
    goToSolution: 'Go to solution',
    closeHotspot: 'Close hotspot information',
    heroDayAlt: 'Sportpark of the Future in daylight',
    heroNightAlt: 'Sportpark of the Future with evening lighting',
    homeLogoAlt: 'GreenMatter - The sport park of the future',
    solutionsHeading: 'Solutions in detail',
    solutionsIntro:
      'Explore the solutions we see as a strong fit for the sport park of the future. Inspired by what you see? Select the solutions that interest you below and use the mail button. We make it easy: your email will already include the selected solutions.',
    quoteButton: 'Request a quote',
    quoteButtonWithCount: (count) =>
      `Request a quote • ${count} ${count === 1 ? 'product' : 'products'}`,
    quoteSubject: 'Request Sport Park of the Future',
    quoteBody: (productNames) => `Hello GreenMatter,

I am interested in the following products:

- ${productNames.join('\n- ')}

Could you send me more information?

Kind regards,`,
    whitepaperButton: 'Download whitepaper',
    mobileWhitepaperButton: 'Whitepaper',
    defaultProductButton: 'View product page',
    readMore: 'Read more',
    readLess: 'Read less',
    possibleSolutions: 'Possible solutions',
  },
};

const solutionTranslations = {
  waterbouw: {
    title: 'Water engineering',
    description: 'Bank protection, retaining walls, access bridge, jetty',
    summary:
      'We see water not as a boundary, but as an opportunity. With circular water engineering solutions, canals, ponds and banks become valuable parts of the sport park of the future. They strengthen the connection between sport, nature and recreation, turning water into a place to experience, meet and unwind.',
    benefits: [
      '[Bank protection](https://greenmatter.nl/oplossingen/walbeschoeiing/) – A durable, low-maintenance bank finish that prevents erosion and lasts significantly longer than traditional timber thanks to circular synthetic turf material.',
      '[Retaining wall](https://greenmatter.nl/oplossingen/damwand/) – A robust circular construction for stable watersides and managing height differences.',
      '[Access bridge](https://greenmatter.nl/oplossingen/toegangsbrug/) – A circular bridge that connects different parts of the sport park safely and attractively.',
      '[Jetties](https://greenmatter.nl/oplossingen/vissteiger/) – An inviting place by the water where relaxation, meeting and nature experience come together.',
    ],
    buttonText: 'More about bank protection',
  },
  'modulaire-sportvloeren': {
    title: 'Modular sports flooring',
    description: 'GreenMatter Ultimate, GreenMatter Ultimate Plus',
    summary: [
      'A modern sport park is more than a place to train. It is a meeting place where young and old, beginners and advanced athletes, recreational users and top-level players can be active together.',
      'Thanks to the modular design, the floor can be tailored to the needs of the location and its users. Sports such as 3x3 basketball, padel, pickleball and indoor hockey can all be supported.',
      'The sports floor is low-maintenance and built to last. It creates a durable sports environment that combines flexibility, performance and inclusivity.',
    ],
    benefits: [
      'Ultimate – A versatile modular sports floor with excellent playing characteristics for daily and intensive use.',
      'Ultimate Plus – Our premium version with extra comfort, optimum cushioning and maximum performance.',
    ],
  },
  vlonderplanken: {
    title: 'GreenMatter decking boards',
    description: 'Decking board',
    summary: [
      'The sport park of the future is more than a place for sport alone. Decking along the water creates attractive routes and places to stay, walk and enjoy the surroundings.',
      'With our decking boards, you create durable terraces, jetties and walking routes with a natural look. The boards are low-maintenance and resistant to intensive use and changing weather conditions.',
    ],
  },
  fitnesspark: {
    title: 'GreenMatter fitness park',
    description: 'The GreenMatter Fitness Park',
    summary: [
      'The sport park of the future is a place where everyone can get moving. Outdoor fitness equipment makes exercise accessible to a broad target group and contributes to a healthy, active living environment.',
      'With the GreenMatter Fitness Park, you create a versatile outdoor training area where strength, condition and health come together.',
    ],
    benefits: [
      'Fitnesspark ATHLETIC – A complete outdoor fitness solution that invites young and old to move and train outdoors in an accessible way.',
    ],
  },
  dugout: {
    title: 'GreenMatter dug-out',
    description: 'Our circular dug-out',
    summary: [
      'The GreenMatter dug-out gives players, coaches and staff a comfortable sheltered place beside the pitch. It can be made from circular materials originating from worn-out sports fields.',
      'Use the button below to see how a dug-out from today’s field can become part of tomorrow’s sports environment.',
    ],
  },
  kantplanken: {
    title: 'GreenMatter edge boards',
    description: 'Circular edge boards',
    summary: [
      'The strength of a future-proof sport park is often in the details. Edge boards create a neat and durable boundary along sports fields and fencing.',
      'With our edge board, you choose a circular solution designed to last for years. Unlike traditional timber edging, these boards do not rot and retain their shape and appearance.',
    ],
  },
  'ecoraster-pad': {
    title: 'Path with GreenMatter Ecoraster base',
    description:
      'GreenMatter Ecoraster Bloxx, GreenMatter Ecoraster grass grids, GreenMatter Ecoraster XXL grass grids',
    summary: [
      'In the sport park of the future, walking paths connect sports fields, meeting places and recreational zones. They create comfortable, accessible routes for everyone.',
      'With our Ecoraster solutions, you create permeable, low-maintenance and durable paths. Rainwater can infiltrate directly into the soil, helping the sport park cope with extreme weather.',
    ],
    benefits: [
      '[GreenMatter Ecoraster Bloxx](https://greenmatter.nl/oplossingen/ecoraster-bloxx/) – A stylish and robust solution for comfortable walking paths with a natural look.',
      '[GreenMatter Ecoraster grass grids](https://greenmatter.nl/oplossingen/ecoraster-grastegels/) – A water-permeable solution where green appearance and functionality meet.',
    ],
  },
  terras: {
    title: 'Climate-adaptive terrace',
    description:
      '2-bank picnic table, 4-bank picnic table, team table, mobile bench with backrest, planter',
    summary: [
      'A future-proof sport park is not just about sport, but also about experience. The terrace is where matches are discussed, volunteers gather and supporters enjoy the view of the pitch.',
      'By combining water-permeable paving, sustainable lighting, greenery and circular outdoor furniture, you create a comfortable meeting place with a premium appearance.',
    ],
    benefits: [
      '[Ecoraster grass grids](https://greenmatter.nl/oplossingen/ecoraster-grastegels/) – Permeable paving that lets rainwater infiltrate and prevents puddles.',
      '[Solar lighting](https://greenmatter.nl/oplossingen/solar/) – Energy-efficient solar lighting for extra atmosphere and safety.',
      '[Berlin Field Green planter](https://greenmatter.nl/oplossingen/plantenbak-berlijn-field-green/) – Durable planters for a greener and more inviting look.',
      '[Picnic set](https://greenmatter.nl/oplossingen/picknicktafel-4-banks/) – Robust picnic tables for relaxed moments beside the field.',
      '[Team table](https://greenmatter.nl/oplossingen/teamtafel/) – A central meeting point for teams, volunteers and visitors.',
    ],
    buttonText: 'Our climate-adaptive terrace',
  },
  speeltoestellen: {
    title: 'Play equipment',
    description: 'W&H Play',
    summary: [
      'Sport starts with play. By encouraging children to climb, balance and discover from an early age, a foundation is created for lifelong movement.',
      'With durable W&H Play equipment, you create a safe and inviting play area where children can be active while families remain connected to the sport park.',
      'Click the button below for more information about W&H Play.',
    ],
  },
  fietsenstalling: {
    title: 'Climate-adaptive bicycle parking',
    description: 'Bicycle parking system, solar lighting, Ecoraster grass grids',
    summary: [
      'In the sport park of the future, sustainability starts on arrival. GreenMatter’s circular and climate-adaptive bicycle parking combines safe bicycle storage, water management and energy-efficient lighting in one concept.',
      'By combining the bicycle parking system with solar lighting and Ecoraster grass grids, a safe and clear parking facility is created.',
    ],
    benefits: [
      '[Bicycle parking system](https://greenmatter.nl/oplossingen/fietsparkeersysteem/) – A modular system for safe and organised bicycle parking.',
      '[Solar lighting](https://greenmatter.nl/oplossingen/solar/) – Energy-efficient solar lighting for extra safety and comfort.',
      '[Ecoraster grass grids](https://greenmatter.nl/oplossingen/ecoraster-grastegels/) – Permeable paving that lets rainwater infiltrate naturally.',
    ],
    buttonText: 'Our climate-adaptive bicycle parking',
  },
  'solar-woodle': {
    title: 'GreenMatter Solar Woodle',
    description: 'Our circular solar-powered lighting',
    summary: [
      'In the sport park of the future, lighting plays an important role in safety, sustainability and usability. Solar lighting illuminates paths, parking areas and meeting places without a grid connection.',
      'This solution combines innovative technology with a minimal ecological footprint and makes it easy to install lighting in hard-to-reach locations.',
    ],
  },
  parkeerplaats: {
    title: 'Climate-adaptive parking area',
    description:
      'GreenMatter Ecoraster Bloxx, GreenMatter Ecoraster grass grids, solar lighting',
    summary: [
      'In the sport park of the future, the parking area is more than a practical facility. It is a first impression that shows how sustainability and climate adaptation come together.',
      'By combining solar lighting with Ecoraster grass grids, you create a low-maintenance parking area that reduces water nuisance, limits heat stress and keeps visitors safe in the evening.',
    ],
    benefits: [
      '[Ecoraster grass grids](https://greenmatter.nl/oplossingen/ecoraster-grastegels/) – Water-permeable parking solutions that let rainwater infiltrate naturally and create a greener look.',
      '[Solar lighting](https://greenmatter.nl/oplossingen/solar/) – Energy-efficient solar lighting for a safe parking environment without a grid connection.',
    ],
    buttonText: 'Our climate-adaptive parking area',
  },
};

export function localizeSolutions(solutions, language) {
  if (language !== 'en') {
    return solutions;
  }

  return solutions.map((solution) => {
    const translation = solutionTranslations[solution.id] ?? {};
    const localizedSolution = {
      ...solution,
      ...translation,
    };

    if (
      !translation.buttonText &&
      localizedSolution.buttonText === uiText.nl.defaultProductButton
    ) {
      localizedSolution.buttonText = uiText.en.defaultProductButton;
    }

    return localizedSolution;
  });
}
