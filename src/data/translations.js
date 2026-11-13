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
    homeIntroTitle: 'Welkom in het sportpark van de toekomst',
    homeIntroParagraphs: [
      'Een sportpark is meer dan een plek om te sporten. Het is een omgeving die mensen samenbrengt, ruimte geeft aan beweging en gedurende de gehele dag van betekenis kan zijn.',
      'We nemen je mee door het sportpark van de toekomst, en laten je zien wat er allemaal al mogelijk is. Je ontdekt hoe doordachte keuzes in inrichting, gebruik en materiaal het verschil kunnen maken.',
      'Ook circulariteit krijgt daarin een zichtbare plek. Met materialen uit versleten kunstgrasvelden die opnieuw waarde krijgen in sportvloeren, inrichting en beweegoplossingen.',
      'Dat is waar MOVE MORE, WASTE LESS voor staat. Meer mensen in beweging brengen, met minder verspilling van grondstoffen.',  
      'Meer zien van het sportpark van de toekomst? Scroll dan verder, en bekijk de verschillende oplossingen die we voor het sportpark van de toekomst te bieden hebben!',
    ],
    homeIntroMotto: 'MOVE MORE, WASTE LESS',
    solutionsHeading: 'Oplossingen in detail',
    solutionsIntro:
      'Filter op het doel waar jouw gemeente of vereniging aan werkt. Zet de oplossingen die je aanspreken in "mijn sportpark" en vraag in één keer informatie of een offerte aan.',
    countdownExplain:
      'Het Rijk wil dat Nederland in 2030 de helft minder primaire grondstoffen gebruikt. Wat je nu aanlegt of vervangt, telt daarvoor mee.',
    countdownInfoLabel: 'Wat betekent deze deadline?',
    countdownSr: (days) =>
      `Nog ${days} dagen tot 2030, het jaar waarin Nederland de helft minder primaire grondstoffen moet gebruiken.`,
    skipLink: 'Direct naar de oplossingen',
    menu: 'Menu',
    closeMenu: 'Sluit menu',
    navLabel: 'Hoofdmenu',
    navItems: {
      oplossingen: 'Oplossingen',
      cases: 'Cases',
      downloads: 'Downloads',
      contact: 'Contact',
    },
    basketEmpty: 'Mijn sportpark',
    basketLabel: (count) =>
      `${count} ${count === 1 ? 'oplossing' : 'oplossingen'} gekozen`,
    basketAria: (count) =>
      `Mijn sportpark: ${count} ${count === 1 ? 'oplossing' : 'oplossingen'} gekozen. Ga naar het aanvraagformulier.`,
    addToPark: 'Zet in mijn sportpark',
    addedToPark: 'In mijn sportpark',
    addToParkAria: (title) => `Zet ${title} in mijn sportpark`,
    removeFromParkAria: (title) => `Haal ${title} uit mijn sportpark`,
    readMoreAbout: (name) => `Meer over ${name}`,
    readLessAbout: (name) => `Minder over ${name}`,
    goalsLabel: 'Filter op doel',
    goalAll: 'Alle doelen',
    goals: {
      klimaatadaptatie: 'Klimaatadaptatie',
      inclusie: 'Inclusie',
      sport: 'Sport',
    },
    chipsLabel: 'Kies oplossingen voor mijn sportpark',
    noResults: 'Geen oplossingen voor dit doel.',
    impactHeading: 'Impact',
    downloadsHeading: 'Voor bestek en ontwerp',
    rainOn: 'Regenbui aan',
    rainOff: 'Regenbui uit',
    switchRainOn: 'Laat het regenen op het sportpark',
    switchRainOff: 'Stop de regenbui',
    rainCaption:
      'Op de Ecoraster-tegels zakt het regenwater direct de grond in, zo blijven er geen plassen staan bij hevige regenbuien.',
    rainMarker: 'Water zakt weg',
    form: {
      heading: 'Informatie of offerte aanvragen',
      intro:
        'Vul het formulier in, dan neemt GreenMatter binnen twee werkdagen contact met je op. De oplossingen die je hebt gekozen staan er al in.',
      selectionLabel: 'Gekozen oplossingen',
      selectionEmpty:
        'Je hebt nog niets gekozen. Klik hieronder aan wat je interesseert, of zet oplossingen in "mijn sportpark".',
      name: 'Naam',
      email: 'E-mailadres',
      phone: 'Telefoonnummer (optioneel)',
      organisation: 'Organisatie',
      role: 'Ik ben',
      roles: {
        gemeente: 'Gemeente',
        vereniging: 'Sportvereniging',
        architect: 'Architect of ontwerper',
        aannemer: 'Aannemer of hovenier',
        anders: 'Anders',
      },
      phase: 'Projectfase',
      phases: {
        orientatie: 'Oriëntatie',
        ontwerp: 'Schetsontwerp of ontwerp',
        bestek: 'Bestek of aanbesteding',
        uitvoering: 'Uitvoering',
      },
      choose: 'Maak een keuze',
      message: 'Toelichting (optioneel)',
      messagePlaceholder: 'Bijvoorbeeld de locatie, het aantal m² of je planning.',
      submit: 'Verstuur aanvraag',
      sending: 'Bezig met versturen…',
      success:
        'Bedankt! Je aanvraag is verstuurd. GreenMatter neemt binnen twee werkdagen contact met je op.',
      error:
        'Versturen lukte niet. Je mailprogramma opent nu met je aanvraag erin. Werkt dat ook niet? Mail naar info@greenmatter.nl of bel +31 (0)252 683 300.',
      required: 'verplicht',
      privacy: 'We gebruiken je gegevens alleen om je aanvraag te beantwoorden. Lees de',
      privacyLink: 'privacyverklaring',
    },
    caseSection: {
      eyebrow: 'Case',
      heading: 'Onze Gezellen, Haarlem',
      intro:
        'Op sportpark Onze Gezellen lag eerst alleen een asfaltplaat. In opdracht van SRO Kennemerland kwamen er een 3x3-basketbalveld, outdoor fitness, een fietsenstalling en een parkeerplaats, gemaakt van gerecycled kunstgras.',
      stats: [
        { value: '7.157 kg', label: 'versleten kunstgras opnieuw toegepast' },
        { value: '4', label: 'voorzieningen: 3x3-basketbal, fitness, fietsenstalling, parkeren' },
        { value: 'Iedereen', label: 'het park is nu ook open voor wie niet bij een club sport' },
      ],
      quote:
        'We hebben vooraf niet gedacht dat we zoveel kilo’s kunstgrasafval weer een nieuw leven konden geven.',
      quoteAuthor: 'Jordy Kwaaitaal',
      quoteRole: 'projectleider, SRO Kennemerland',
      cta: 'Lees de volledige casefolder (pdf)',
      imageAlt: 'Modulaire sportvloer met 3x3-basketbalveld op sportpark Onze Gezellen in Haarlem',
    },
    downloadsSection: {
      heading: 'Downloads',
      intro:
        'Technische flyers en achtergrond voor beleidsmedewerkers, bestekschrijvers en ontwerpers.',
      whitepaper: 'Whitepaper GreenMatter',
      whitepaperNote: 'Achtergrond over circulair kunstgras en hergebruik',
      casefolder: 'Casefolder Onze Gezellen',
      casefolderNote: 'Aanpak, cijfers en interviews',
      flyerNote: 'Flyer met productoverzicht',
      bestekNote: 'Bestektekst voor aanbesteding en ontwerp',
      previous: 'Vorige downloads',
      next: 'Volgende downloads',
    },
    footer: {
      tagline: 'Het sportpark van de toekomst is een initiatief van GreenMatter B.V.',
      contactHeading: 'Contact',
      officesHeading: 'Vestigingen',
      linksHeading: 'Meer',
      privacy: 'Privacyverklaring',
      terms: 'Leveringsvoorwaarden',
      website: 'greenmatter.nl',
      whplay: 'W&H Play',
    },
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
    casefolderButton: 'Casefolder Onze Gezellen',
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
    homeIntroTitle: 'Welcome to the sport park of the future',
    homeIntroParagraphs: [
      'A sport park is more than a place to play sport. It is an environment that brings people together, creates space for movement and can be meaningful throughout the entire day.',
      'We take you through the sport park of the future and show what is already possible. You will discover how thoughtful choices in design, use and materials can make a real difference.',
      'Circularity also becomes visible here. Materials from worn-out synthetic turf fields gain new value in sports floors, furniture and movement solutions.',
      'That is what MOVE MORE, WASTE LESS stands for. Getting more people moving, while wasting fewer raw materials.',
      'Want to see more of the sports park of the future? Then scroll down and take a look at the various solutions we have to offer for the sports park of the future!',
    ],
    homeIntroMotto: 'MOVE MORE, WASTE LESS',
    solutionsHeading: 'Solutions in detail',
    solutionsIntro:
      'Filter by the goal your municipality or club is working on. Add the solutions you like to "my sport park" and request information or a quote in one go.',
    countdownExplain:
      'The Dutch government wants the country to use half as many primary raw materials by 2030. What you build or replace now counts towards that.',
    countdownInfoLabel: 'What does this deadline mean?',
    countdownSr: (days) =>
      `${days} days left until 2030, the year the Netherlands must use half as many primary raw materials.`,
    skipLink: 'Skip to the solutions',
    menu: 'Menu',
    closeMenu: 'Close menu',
    navLabel: 'Main menu',
    navItems: {
      oplossingen: 'Solutions',
      cases: 'Cases',
      downloads: 'Downloads',
      contact: 'Contact',
    },
    basketEmpty: 'My sport park',
    basketLabel: (count) =>
      `${count} ${count === 1 ? 'solution' : 'solutions'} selected`,
    basketAria: (count) =>
      `My sport park: ${count} ${count === 1 ? 'solution' : 'solutions'} selected. Go to the request form.`,
    addToPark: 'Add to my sport park',
    addedToPark: 'In my sport park',
    addToParkAria: (title) => `Add ${title} to my sport park`,
    removeFromParkAria: (title) => `Remove ${title} from my sport park`,
    readMoreAbout: (name) => `More about ${name}`,
    readLessAbout: (name) => `Less about ${name}`,
    goalsLabel: 'Filter by goal',
    goalAll: 'All goals',
    goals: {
      klimaatadaptatie: 'Climate adaptation',
      inclusie: 'Inclusion',
      sport: 'Sport',
    },
    chipsLabel: 'Choose solutions for my sport park',
    noResults: 'No solutions for this goal.',
    impactHeading: 'Impact',
    downloadsHeading: 'For specifications and design',
    rainOn: 'Rain on',
    rainOff: 'Rain off',
    switchRainOn: 'Make it rain on the sport park',
    switchRainOff: 'Stop the rain',
    rainCaption:
      'On the Ecoraster tiles, rainwater soaks straight into the ground, so no puddles are left behind during heavy showers.',
    rainMarker: 'Water soaks away',
    form: {
      heading: 'Request information or a quote',
      intro:
        'Fill in the form and GreenMatter will contact you within two working days. The solutions you selected are already included.',
      selectionLabel: 'Selected solutions',
      selectionEmpty:
        'You have not selected anything yet. Tick what interests you below, or add solutions to "my sport park".',
      name: 'Name',
      email: 'Email address',
      phone: 'Phone number (optional)',
      organisation: 'Organisation',
      role: 'I am a',
      roles: {
        gemeente: 'Municipality',
        vereniging: 'Sports club',
        architect: 'Architect or designer',
        aannemer: 'Contractor or landscaper',
        anders: 'Other',
      },
      phase: 'Project phase',
      phases: {
        orientatie: 'Exploring',
        ontwerp: 'Sketch or design',
        bestek: 'Specification or tender',
        uitvoering: 'Construction',
      },
      choose: 'Choose one',
      message: 'Notes (optional)',
      messagePlaceholder: 'For example the location, the area in m² or your planning.',
      submit: 'Send request',
      sending: 'Sending…',
      success:
        'Thank you! Your request has been sent. GreenMatter will contact you within two working days.',
      error:
        'Sending failed. Your email program will now open with your request. Not working either? Email info@greenmatter.nl or call +31 (0)252 683 300.',
      required: 'required',
      privacy: 'We only use your details to answer your request. Read the',
      privacyLink: 'privacy statement',
    },
    caseSection: {
      eyebrow: 'Case',
      heading: 'Onze Gezellen, Haarlem',
      intro:
        'Sport park Onze Gezellen used to have nothing but an asphalt slab. Commissioned by SRO Kennemerland, it now has a 3x3 basketball court, outdoor fitness, bicycle parking and a car park, made from recycled synthetic turf.',
      stats: [
        { value: '7,157 kg', label: 'of worn-out synthetic turf reused' },
        { value: '4', label: 'facilities: 3x3 basketball, fitness, bike parking, car park' },
        { value: 'Everyone', label: 'the park is now open to people who do not play at a club' },
      ],
      quote:
        'We never expected to give so many kilos of synthetic turf waste a new life.',
      quoteAuthor: 'Jordy Kwaaitaal',
      quoteRole: 'project leader, SRO Kennemerland (translated)',
      cta: 'Read the full case folder (pdf, Dutch)',
      imageAlt: 'Modular sports floor with a 3x3 basketball court at sport park Onze Gezellen in Haarlem',
    },
    downloadsSection: {
      heading: 'Downloads',
      intro:
        'Technical flyers and background for policy officers, specification writers and designers.',
      whitepaper: 'GreenMatter whitepaper',
      whitepaperNote: 'Background on circular synthetic turf and reuse',
      casefolder: 'Case folder Onze Gezellen',
      casefolderNote: 'Approach, figures and interviews (Dutch)',
      flyerNote: 'Flyer with product overview (Dutch)',
      bestekNote: 'Specification text for tenders and design (Dutch)',
      previous: 'Previous downloads',
      next: 'Next downloads',
    },
    footer: {
      tagline: 'The sport park of the future is an initiative of GreenMatter B.V.',
      contactHeading: 'Contact',
      officesHeading: 'Offices',
      linksHeading: 'More',
      privacy: 'Privacy statement',
      terms: 'Terms of delivery',
      website: 'greenmatter.nl',
      whplay: 'W&H Play',
    },
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
    casefolderButton: 'Casefolder Onze Gezellen',
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
      'Timber bank protection rots and banks erode. With circular water engineering, ditches, ponds and banks become a strong part of the sport park instead. They connect sport, nature and recreation, turning water into a place to experience, meet and unwind.',
    benefits: [
      '[Bank protection](https://greenmatter.nl/en/solutions/river-bank-protection/) – A durable, low-maintenance bank finish that prevents erosion and lasts significantly longer than traditional timber thanks to circular synthetic turf material.',
      '[Retaining wall](https://greenmatter.nl/en/solutions/combi-pile-planking/) – A robust circular construction for stable watersides and managing height differences.',
      '[Access bridge](https://greenmatter.nl/en/solutions/access-bridge/) – A circular bridge that connects different parts of the sport park safely and attractively.',
      '[Fishing pier](https://greenmatter.nl/en/solutions/fishing-pier/) – An inviting place by the water where relaxation, meeting and nature experience come together.',
    ],
    buttonText: 'More about bank protection',
  },
  'modulaire-sportvloeren': {
    title: 'Modular sports flooring',
    description: 'GreenMatter Ultimate, GreenMatter Ultimate Plus',
    summary: [
      'A bare asphalt slab or an outdated pitch mostly attracts regular club members. A modular sports floor turns it into a meeting place where young and old, beginners and top athletes are active together.',
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
      'Timber decking gets slippery, splinters and rots. Decking along the water should invite people to walk, stay and enjoy the surroundings.',
      'With our decking boards, you create durable terraces, fishing piers and walking routes with a natural look. The boards are low-maintenance and resistant to intensive use and changing weather conditions.',
    ],
  },
  fitnesspark: {
    title: 'GreenMatter fitness park',
    description: 'The GreenMatter Fitness Park',
    summary: [
      'Many people want to exercise without joining a club. Outdoor fitness equipment makes exercise accessible to a broad target group and contributes to a healthy, active living environment.',
      'With the GreenMatter Fitness Park, you create a versatile outdoor training area where strength, condition and health come together.',
    ],
    benefits: [
      'Fitnesspark ATHLETIC – A complete outdoor circular fitness solution that invites young and old to move and train outdoors in an accessible way.',
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
    title: 'GreenMatter side boards',
    description: 'Circular side boards',
    summary: [
      'Infill that washes off the pitch ends up in the ditch. Side boards keep it on the field, which limits the spread of microplastics, and create a neat, durable boundary along pitches and fencing.',
      'With our side board, you choose a circular solution designed to last for years. Unlike traditional timber edging, these circular boards do not rot and retain their shape and appearance.',
    ],
  },
  'ecoraster-pad': {
    title: 'Path with GreenMatter Ecoraster base',
    description:
      'GreenMatter Ecoraster Bloxx, GreenMatter Ecoraster grass grids, GreenMatter Ecoraster XXL grass grids',
    summary: [
      'After a heavy shower, the paths on many sport parks are under water. Ecoraster paths let water through, so it soaks straight into the ground and no puddles remain.',
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
      'Nobody stays after the match on a bare terrace full of puddles. Yet the terrace is where matches are discussed, volunteers gather and supporters enjoy the view of the pitch.',
      'By combining water-permeable paving, sustainable lighting, greenery and circular outdoor furniture, you create a comfortable meeting place with a premium appearance.',
    ],
    benefits: [
      '[Ecoraster grass grids](https://greenmatter.nl/en/solutions/ecoraster-grass-tiles-xxl/) – Permeable paving that lets rainwater infiltrate and prevents puddles.',
      '[Solar lighting](https://greenmatter.nl/en/solutions/solar/) – Energy-efficient solar lighting for extra atmosphere and safety.',
      '[Berlin Field Green planter](https://greenmatter.nl/en/solutions/planter-berlin-field-green/) – Durable planters for a greener and more inviting look.',
      '[Picnic set](https://greenmatter.nl/en/solutions/picknicktable-4-benches/) – Robust picnic tables for relaxed moments beside the field.',
      '[Team table](https://greenmatter.nl/en/solutions/team-table/) – A central meeting point for teams, volunteers and visitors.',
    ],
    buttonText: 'Our climate-adaptive terrace',
  },
  speeltoestellen: {
    title: 'Play equipment',
    description: 'By [W&H Play](https://whplay.nl/)',
    summary: [
      'Sport starts with play. By encouraging children to climb, balance and discover from an early age, a foundation is created for lifelong movement.',
      'With durable W&H Play equipment, you create a safe and inviting play area where children can be active while families remain connected to the sport park.',
      'Click the button below for more information about W&H Play.',
    ],
    buttonText: 'Go to W&H Play',
  },
  fietsenstalling: {
    title: 'Climate-adaptive bicycle parking',
    description: 'Bicycle parking system, solar lighting, Ecoraster grass grids',
    summary: [
      'Bikes parked all over the grounds cause nuisance and unsafe situations. GreenMatter’s circular and climate-adaptive bicycle parking combines safe bicycle storage, water management and solar lighting in one concept.',
      'By combining the bicycle parking system with solar lighting and Ecoraster grass grids, a safe and clear parking facility is created.',
    ],
    benefits: [
      '[Bicycle parking system](https://greenmatter.nl/en/solutions/bicycle-parking-system/) – A modular system for safe and organised bicycle parking.',
      '[Solar lighting](https://greenmatter.nl/en/solutions/solar/) – Energy-efficient solar lighting for extra safety and comfort.',
      '[Ecoraster grass tiles](https://greenmatter.nl/en/solutions/ecoraster-grasstiles/) – Permeable paving that lets rainwater infiltrate naturally.',
    ],
    buttonText: 'View bicycle parking',
  },
  'solar-woodle': {
    title: 'GreenMatter Solar',
    description: 'Our circular solar-powered lighting',
    summary: [
      'A dark path or car park feels unsafe in the evening, and running a cable to the grid is expensive. Solar lighting illuminates paths, parking areas and meeting places without a grid connection.',
      'This solution combines innovative technology with a minimal ecological footprint and makes it easy to install lighting in hard-to-reach locations.',
    ],
  },
  parkeerplaats: {
    title: 'Climate-adaptive parking area',
    description:
      'GreenMatter Ecoraster Bloxx, GreenMatter Ecoraster grass grids, solar lighting',
    summary: [
      'An asphalt or brick car park sends rainwater to the sewer and heats up in summer. With GreenMatter parking solutions, rainwater soaks into the ground on site and the lighting runs entirely on solar power.',
      'By combining solar lighting with Ecoraster grass tiles, you create a low-maintenance parking area that reduces water nuisance, limits heat stress and keeps visitors safe in the evening.',
    ],
    benefits: [
      '[Ecoraster grass grids](https://greenmatter.nl/en/solutions/ecoraster-grasstiles/) – Water-permeable parking solutions that let rainwater infiltrate naturally and create a greener look.',
      '[Solar lighting](https://greenmatter.nl/en/solutions/solar/) – Energy-efficient solar lighting for a safe parking environment without a grid connection.',
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
