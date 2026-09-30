import type { Locale } from '@/lib/i18n'

type T = Record<Locale, string>

export type Project = {
  slug: string
  /** Title split into display lines (uppercase in UI). */
  title: string[]
  year: number
  client: string
  category: T
  cover: string
  wide: string
  featured?: boolean
  /** Hero statement lines over the wide media: [solid, solid, outline] */
  statement?: Record<Locale, [string, string, string]>
  lead: T
  body: T
  gallery?: { src: string; ratio: number }[]
  marquee: T
  /** Shows the light-control system diagram. */
  diagram?: boolean
  credits: { role: T; name: string }[]
}

const m = (n: string) => `/media/${n}.webp`

const baseCredits = (extra: { role: T; name: string }[] = []) => [
  { role: { en: 'Lighting designer / Founder', bs: 'Dizajner svjetla / Osnivač' }, name: 'Amar Hadžić' },
  { role: { en: 'Product designer', bs: 'Dizajnerica proizvoda' }, name: 'Lejla Begović' },
  { role: { en: 'Brass & metalwork', bs: 'Mesing i metal' }, name: 'Haris Delić' },
  ...extra,
  { role: { en: 'Lighting engineer', bs: 'Inženjer rasvjete' }, name: 'Tarik Mujić' },
  { role: { en: 'Photography', bs: 'Fotografija' }, name: 'Dino Šehić' },
]

export const projects: Project[] = [
  {
    slug: 'basta-lobby',
    title: ['Bašta', 'Lobby'],
    year: 2026,
    client: 'Hotel Bašta, Sarajevo',
    category: { en: 'Custom chandelier', bs: 'Luster po mjeri' },
    cover: m('c-basta-lobby'),
    wide: m('w-basta-lobby'),
    featured: true,
    statement: { en: ['A ring', 'of', 'Glass'], bs: ['Prsten', 'od', 'Stakla'] },
    lead: {
      en: 'A six-metre brass ring holding 1,240 glass drops for the double-height lobby of Hotel Bašta.',
      bs: 'Mesingani prsten od šest metara sa 1.240 staklenih kapi za lobi Hotela Bašta.',
    },
    body: {
      en: 'The hotel wanted guests to feel the lobby before they see it. We designed a single ring chandelier that fills the double-height space without blocking the view to the old town. Every drop was fitted to the ring in our Sarajevo workshop and hung by hand over four nights. Warm-dimming LEDs hidden in the ring move from 3000K at noon to 2200K after dinner.',
      bs: 'Hotel je želio da gosti osjete lobi prije nego što ga vide. Dizajnirali smo jedan prstenasti luster koji ispunjava prostor dvostruke visine, a ne zaklanja pogled na stari grad. Svaka kap je montirana na prsten u našoj radionici u Sarajevu i ručno okačena tokom četiri noći. LED diode skrivene u prstenu prelaze sa 3000K u podne na 2200K nakon večere.',
    },
    gallery: [
      { src: m('gal-basta-1'), ratio: 1.5 },
      { src: m('gal-basta-2'), ratio: 0.8 },
    ],
    marquee: { en: '1,240 glass drops', bs: '1.240 staklenih kapi' },
    credits: baseCredits([{ role: { en: 'Installation', bs: 'Montaža' }, name: 'Kenan Alić' }]),
  },
  {
    slug: 'opal-series',
    title: ['Opal', 'Series'],
    year: 2025,
    client: 'Nova Forma Collection',
    category: { en: 'Pendant collection', bs: 'Kolekcija visilica' },
    cover: m('c-opal-series'),
    wide: m('w-opal-series'),
    featured: true,
    statement: { en: ['Soft', 'as', 'Milk'], bs: ['Meko', 'kao', 'Mlijeko'] },
    lead: {
      en: 'Our first collection: opal glass globes in four sizes, with brushed brass caps made in-house.',
      bs: 'Naša prva kolekcija: kugle od opal stakla u četiri veličine, s mesinganim kapama iz naše radionice.',
    },
    body: {
      en: 'Opal glass turns a bright point of light into a calm, even glow. After two years of tests we found the wall thickness that hides the LED completely while losing only 18% of its light. The Opal Series comes in 20, 30, 40 and 55 cm, can hang alone or in clusters, and every lamp is assembled, tested and numbered in our workshop.',
      bs: 'Opal staklo pretvara jaku tačku svjetla u miran, ujednačen sjaj. Nakon dvije godine testova pronašli smo debljinu stakla koja potpuno skriva LED, a gubi samo 18% svjetla. Opal serija dolazi u veličinama 20, 30, 40 i 55 cm, može visiti sama ili u grupama, a svaka lampa se sklapa, testira i numeriše u našoj radionici.',
    },
    marquee: { en: 'Soft opal glow', bs: 'Mek opal sjaj' },
    credits: baseCredits(),
  },
  {
    slug: 'river-house',
    title: ['River', 'House'],
    year: 2025,
    client: 'Private residence, Konjic',
    category: { en: 'Residential lighting', bs: 'Rasvjeta za dom' },
    cover: m('c-river-house'),
    wide: m('w-river-house'),
    featured: true,
    statement: { en: ['Light', 'the', 'Evening'], bs: ['Osvijetli', 'svaku', 'Večer'] },
    lead: {
      en: 'A complete lighting plan for a stone villa on the Neretva: 146 fixtures, five scenes, zero visible glare.',
      bs: 'Kompletan plan rasvjete za kamenu vilu na Neretvi: 146 svjetiljki, pet scena, bez ijednog bliještanja.',
    },
    body: {
      en: 'The owners asked for a house that feels like the river at dusk. We hid most of the light in the architecture: cove lines along the ceilings, step lights in the stone stairs, grazing light on the walls. Only a few pieces are meant to be seen, like the linen floor lamps in the living room. One button at the door switches between Morning, Day, Dinner, Night and Away.',
      bs: 'Vlasnici su tražili kuću koja se osjeća kao rijeka u sumrak. Većinu svjetla smo sakrili u arhitekturu: linije u stropu, svjetla u kamenim stepenicama, svjetlo koje klizi niz zidove. Samo nekoliko komada je tu da se vidi, poput lanenih podnih lampi u dnevnom boravku. Jedno dugme na ulazu mijenja scene Jutro, Dan, Večera, Noć i Odsutni.',
    },
    marquee: { en: 'Five scenes, one button', bs: 'Pet scena, jedno dugme' },
    credits: baseCredits(),
  },
  {
    slug: 'galerija-ars',
    title: ['Galerija', 'Ars'],
    year: 2024,
    client: 'Galerija Ars, Mostar',
    category: { en: 'Museum lighting', bs: 'Muzejska rasvjeta' },
    cover: m('c-galerija-ars'),
    wide: m('w-galerija-ars'),
    featured: true,
    diagram: true,
    statement: { en: ['Protect', 'the', 'Artwork'], bs: ['Zaštiti', 'svako', 'Djelo'] },
    lead: {
      en: 'Gallery lighting that follows the daylight and keeps every painting under its safe lux limit.',
      bs: 'Galerijska rasvjeta koja prati dnevno svjetlo i drži svaku sliku ispod njene sigurne granice osvjetljenja.',
    },
    body: {
      en: 'Old paintings fade under too much light, but visitors need to see colour and detail. We designed a control system where daylight and presence sensors talk to a central hub, which sets every spotlight to the exact level each artwork can tolerate. When the room is empty the light drops to a quiet 20 lux; when someone walks in, it rises smoothly to 150.',
      bs: 'Stare slike blijede pod previše svjetla, a posjetioci trebaju vidjeti boju i detalje. Dizajnirali smo sistem u kojem senzori dnevnog svjetla i prisustva razgovaraju s centralnim hubom, koji svaki reflektor postavlja tačno na nivo koji djelo može podnijeti. Kad je sala prazna, svjetlo pada na mirnih 20 luksa; kad neko uđe, glatko raste na 150.',
    },
    gallery: [{ src: m('gal-ars-1'), ratio: 1.5 }],
    marquee: { en: 'Light that protects', bs: 'Svjetlo koje čuva' },
    credits: baseCredits([{ role: { en: 'Conservation advisor', bs: 'Savjetnica za konzervaciju' }, name: 'Selma Hodžić' }]),
  },
  {
    slug: 'bakar-kafana',
    title: ['Bakar', 'Kafana'],
    year: 2024,
    client: 'Restoran Bakar, Sarajevo',
    category: { en: 'Restaurant lighting', bs: 'Rasvjeta restorana' },
    cover: m('c-bakar-kafana'),
    wide: m('w-bakar-kafana'),
    featured: true,
    statement: { en: ['Hammered', 'by', 'Hand'], bs: ['Kovano', 'ručno', 'Bakrom'] },
    lead: {
      en: '38 hand-hammered copper pendants, made with coppersmiths from Kazandžiluk, for a restaurant in the old town.',
      bs: '38 ručno kovanih bakrenih visilica, napravljenih s kazandžijama iz Kazandžiluka, za restoran u starom gradu.',
    },
    body: {
      en: 'Restoran Bakar wanted light that belongs to the street it stands on. We worked with two coppersmith families to turn traditional džezva techniques into lampshades. The hammer marks break the light into a soft, uneven glow that makes faces look warm and food look honest. Each pendant hangs 70 cm above the table, low enough to create a small room around every guest.',
      bs: 'Restoran Bakar je želio svjetlo koje pripada ulici u kojoj se nalazi. Radili smo s dvije kazandžijske porodice kako bismo tradicionalne tehnike izrade džezvi pretvorili u abažure. Tragovi čekića lome svjetlo u mek, neujednačen sjaj od kojeg lica izgledaju toplo, a hrana iskreno. Svaka visilica visi 70 cm iznad stola, dovoljno nisko da oko svakog gosta napravi malu sobu.',
    },
    marquee: { en: 'Copper, hammer, light', bs: 'Bakar, čekić, svjetlo' },
    credits: baseCredits([{ role: { en: 'Coppersmiths', bs: 'Kazandžije' }, name: 'Porodice Ćatić i Karahasan' }]),
  },
  {
    slug: 'linen-shade',
    title: ['Linen', 'Shade'],
    year: 2024,
    client: 'Nova Forma Collection',
    category: { en: 'Table & floor lamps', bs: 'Stone i podne lampe' },
    cover: m('c-linen-shade'),
    wide: m('c-linen-shade'),
    lead: { en: 'Pleated natural linen shades on hand-thrown ceramic bases, in three heights.', bs: 'Plisirani abažuri od prirodnog lana na ručno rađenim keramičkim postoljima, u tri visine.' },
    body: { en: 'Linen softens light the way curtains soften a window. Each shade is pleated by hand in our atelier and fits any lamp in the collection.', bs: 'Lan omekšava svjetlo kao što zavjese omekšavaju prozor. Svaki abažur se ručno plisira u našem ateljeu i odgovara svakoj lampi iz kolekcije.' },
    marquee: { en: 'Pleated by hand', bs: 'Ručno plisirano' },
    credits: baseCredits(),
  },
  {
    slug: 'alabaster-sconce',
    title: ['Alabaster', 'Sconce'],
    year: 2023,
    client: 'Nova Forma Collection',
    category: { en: 'Wall lights', bs: 'Zidne svjetiljke' },
    cover: m('c-alabaster-sconce'),
    wide: m('c-alabaster-sconce'),
    lead: { en: 'Wall lights cut from single blocks of alabaster, glowing like warm stone.', bs: 'Zidne svjetiljke izrezane iz jednog bloka alabastera, koje svijetle kao topao kamen.' },
    body: { en: 'No two pieces share the same veining. Light passes through 12 mm of stone and comes out amber.', bs: 'Nijedna dva komada nemaju iste žile. Svjetlo prolazi kroz 12 mm kamena i izlazi boje ćilibara.' },
    marquee: { en: 'Stone that glows', bs: 'Kamen koji svijetli' },
    credits: baseCredits(),
  },
  {
    slug: 'konak-house',
    title: ['Konak', 'House'],
    year: 2023,
    client: 'Heritage foundation, Počitelj',
    category: { en: 'Heritage lighting', bs: 'Rasvjeta naslijeđa' },
    cover: m('c-konak-house'),
    wide: m('c-konak-house'),
    lead: { en: 'Discreet lighting for a restored 18th-century house, without a single drilled beam.', bs: 'Diskretna rasvjeta za obnovljenu kuću iz 18. vijeka, bez ijedne izbušene grede.' },
    body: { en: 'All fittings clamp to existing joints and can be removed without trace. The carved ceilings are grazed by hidden light for the first time in 250 years.', bs: 'Sve svjetiljke se pričvršćuju na postojeće spojeve i mogu se ukloniti bez traga. Rezbareni stropovi su prvi put u 250 godina osvijetljeni skrivenim svjetlom.' },
    marquee: { en: 'No drilled beams', bs: 'Bez bušenja greda' },
    credits: baseCredits(),
  },
  {
    slug: 'night-garden',
    title: ['Night', 'Garden'],
    year: 2023,
    client: 'Private garden, Trebinje',
    category: { en: 'Landscape lighting', bs: 'Rasvjeta vrta' },
    cover: m('c-night-garden'),
    wide: m('c-night-garden'),
    lead: { en: 'Low bronze path lights and moonlight-style uplighting for an olive garden.', bs: 'Niska bronzana svjetla staza i rasvjeta poput mjesečine za maslinjak.' },
    body: { en: 'We lit the trees, not the sky. Every fitting is shielded so the stars stay visible from the terrace.', bs: 'Osvijetlili smo drveće, ne nebo. Svaka svjetiljka je zaštićena tako da se zvijezde i dalje vide s terase.' },
    marquee: { en: 'Keep the stars', bs: 'Sačuvaj zvijezde' },
    credits: baseCredits(),
  },
  {
    slug: 'atrium-office',
    title: ['Atrium', 'Office'],
    year: 2022,
    client: 'Unitas Tower, Banja Luka',
    category: { en: 'Workplace lighting', bs: 'Rasvjeta ureda' },
    cover: m('c-atrium-office'),
    wide: m('c-atrium-office'),
    lead: { en: 'A brass-rod sculpture pendant and glare-free linear light for a five-floor atrium.', bs: 'Skulpturalna visilica od mesinganih šipki i linijsko svjetlo bez bliještanja za atrij od pet spratova.' },
    body: { en: 'Daylight sensors dim the linear lights floor by floor, cutting energy use by 41%.', bs: 'Senzori dnevnog svjetla prigušuju linijsku rasvjetu sprat po sprat i smanjuju potrošnju energije za 41%.' },
    marquee: { en: 'Five floors of light', bs: 'Pet spratova svjetla' },
    credits: baseCredits(),
  },
  {
    slug: 'terrace-lanterns',
    title: ['Terrace', 'Lanterns'],
    year: 2022,
    client: 'Hotel Vidikovac, Sarajevo',
    category: { en: 'Outdoor lanterns', bs: 'Vanjski fenjeri' },
    cover: m('c-terrace-lanterns'),
    wide: m('c-terrace-lanterns'),
    lead: { en: 'Rechargeable brass and glass lanterns for a rooftop terrace above the city.', bs: 'Punjivi fenjeri od mesinga i stakla za krovnu terasu iznad grada.' },
    body: { en: 'Twelve hours of warm light on one charge, and heavy enough to stay put in strong wind.', bs: 'Dvanaest sati toplog svjetla na jedno punjenje, i dovoljno teški da ih vjetar ne pomjeri.' },
    marquee: { en: 'Twelve hours of glow', bs: 'Dvanaest sati sjaja' },
    credits: baseCredits(),
  },
  {
    slug: 'prism-bar',
    title: ['Prism', 'Bar'],
    year: 2022,
    client: 'Prism Bar, Sarajevo',
    category: { en: 'Bar lighting', bs: 'Rasvjeta bara' },
    cover: m('c-prism-bar'),
    wide: m('c-prism-bar'),
    lead: { en: 'A backlit onyx bar and faceted glass pendants for a 24-seat cocktail bar.', bs: 'Pozadinski osvijetljen šank od oniksa i fasetirane staklene visilice za koktel bar sa 24 mjesta.' },
    body: { en: 'The bar glows, the room stays dark, and every glass catches a small spark of light.', bs: 'Šank svijetli, prostorija ostaje tamna, a svaka čaša uhvati malu iskru svjetla.' },
    marquee: { en: 'Onyx and facets', bs: 'Oniks i fasete' },
    credits: baseCredits(),
  },
]

export const featured = projects.filter((p) => p.featured)
export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
