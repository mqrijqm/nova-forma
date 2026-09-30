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
  statement?: [string, string, string]
  lead: T
  body: T
  gallery?: { src: string; ratio: number }[]
  marquee: string
  credits: { role: T; name: string }[]
}

const img = (n: string) => `/media/${n}.webp`

const baseCredits = (extra: { role: T; name: string }[] = []) => [
  { role: { en: 'Creative director / Producer', bs: 'Kreativni direktor / Producent' }, name: 'Amar Hadžić (Nova Forma)' },
  { role: { en: 'Art director / Designer', bs: 'Art direktorica / Dizajnerica' }, name: 'Lejla Begović (Nova Forma)' },
  { role: { en: 'Technical director', bs: 'Tehnički direktor' }, name: 'Tarik Mujić (Nova Forma)' },
  { role: { en: 'Developer (website)', bs: 'Developer (web)' }, name: 'Ena Kovač (Nova Forma)' },
  ...extra,
  { role: { en: 'Photographer', bs: 'Fotograf' }, name: 'Dino Šehić' },
  { role: { en: 'Sound designer', bs: 'Dizajnerica zvuka' }, name: 'Mia Radončić' },
]

export const projects: Project[] = [
  {
    slug: 'salt-and-silence',
    title: ['Salt and', 'Silence'],
    year: 2026,
    client: 'Hotel Bašta',
    category: { en: 'Space / Installation', bs: 'Prostor / Instalacija' },
    cover: img('p-salt-silence-portrait'),
    wide: img('p-salt-silence-wide'),
    featured: true,
    statement: ['Fold', 'the', 'Quiet'],
    lead: {
      en: 'A permanent installation of 140 pleated paper forms for a spa hotel in the old town.',
      bs: 'Stalna instalacija od 140 plisiranih papirnih formi za spa hotel u starom gradu.',
    },
    body: {
      en: 'Salt and Silence began with a single sheet of paper and a question: can a fold hold stillness? Working with local craftspeople, Nova Forma developed a series of pleated sculptures that stretch, twist and settle under small points of warm light. Each piece is unique, yet the collection reads as one slow breath along the corridor walls.',
      bs: 'Salt and Silence počeo je jednim listom papira i pitanjem: može li nabor zadržati tišinu? U saradnji s lokalnim zanatlijama, Nova Forma je razvila seriju plisiranih skulptura koje se istežu, uvijaju i smiruju pod malim tačkama tople svjetlosti. Svaki komad je unikatan, a ipak se kolekcija čita kao jedan spor udah duž zidova hodnika.',
    },
    gallery: [{ src: img('gal-salt-1'), ratio: 1.5 }, { src: img('gal-salt-2'), ratio: 0.8 }],
    marquee: 'The quiet fold',
    credits: baseCredits([{ role: { en: 'Paper artisan', bs: 'Majstor papira' }, name: 'Hana Zukić' }]),
  },
  {
    slug: 'level-of-light',
    title: ['Level of', 'Light'],
    year: 2025,
    client: 'Sarajevo Winter Festival',
    category: { en: 'Exhibition', bs: 'Izložba' },
    cover: img('p-level-light-portrait'),
    wide: img('p-level-light-wide'),
    featured: true,
    statement: ['Draw', 'with', 'Light'],
    lead: {
      en: 'An immersive exhibition where planes of light measure the distance between visitors.',
      bs: 'Imerzivna izložba u kojoj ravni svjetlosti mjere udaljenost između posjetilaca.',
    },
    body: {
      en: 'Thin horizontal planes of light cut through a haze-filled hall. As visitors move, sensors lower and raise each plane, turning the room into a living instrument that responds to how close we choose to stand to one another.',
      bs: 'Tanke horizontalne ravni svjetlosti presijecaju dvoranu ispunjenu izmaglicom. Dok se posjetioci kreću, senzori spuštaju i podižu svaku ravan, pretvarajući prostoriju u živi instrument koji odgovara na to koliko blizu biramo stajati jedni drugima.',
    },
    marquee: 'Measured in light',
    credits: baseCredits(),
  },
  {
    slug: 'aura-noir',
    title: ['Aura', 'Noir'],
    year: 2025,
    client: 'Maison Aura',
    category: { en: '3D / Film', bs: '3D / Film' },
    cover: img('p-aura-noir-portrait'),
    wide: img('p-aura-noir-wide'),
    featured: true,
    statement: ['Scent', 'in', 'Motion'],
    lead: {
      en: 'Launch film and 3D identity for a fragrance made of smoke, amber and night.',
      bs: 'Lansirni film i 3D identitet za parfem napravljen od dima, ambre i noći.',
    },
    body: {
      en: 'We translated an invisible product into a choreography of parts. The bottle opens, separates and reassembles in slow motion, its black glass catching light the way the fragrance catches memory.',
      bs: 'Nevidljivi proizvod preveli smo u koreografiju dijelova. Bočica se otvara, razdvaja i ponovo sklapa u usporenom snimku, a njeno crno staklo hvata svjetlost kao što miris hvata sjećanje.',
    },
    gallery: [{ src: img('gal-aura-1'), ratio: 0.8 }],
    marquee: 'Night in glass',
    credits: baseCredits(),
  },
  {
    slug: 'atelier-vedra',
    title: ['Atelier', 'Vedra'],
    year: 2024,
    client: 'Vedra Watches',
    category: { en: 'Product / 3D', bs: 'Proizvod / 3D' },
    cover: img('p-atelier-vedra-portrait'),
    wide: img('p-atelier-vedra-wide'),
    featured: true,
    statement: ['Time', 'set', 'Apart'],
    lead: {
      en: 'An exploded-view campaign revealing 212 components of a hand-finished watch.',
      bs: 'Kampanja u rastavljenom prikazu koja otkriva 212 komponenti ručno dorađenog sata.',
    },
    body: {
      en: 'For the launch of its green-dial reference, Vedra asked us to show the patience behind the product. We built a precise digital twin and let every part float free, so the watch could be read like an architecture of time.',
      bs: 'Za lansiranje modela sa zelenim brojčanikom, Vedra nas je zamolila da pokažemo strpljenje iza proizvoda. Izgradili smo precizan digitalni blizanac i pustili svaki dio da slobodno lebdi, kako bi se sat mogao čitati kao arhitektura vremena.',
    },
    gallery: [{ src: img('gal-vedra-1'), ratio: 0.8 }],
    marquee: 'Architecture of time',
    credits: baseCredits(),
  },
  {
    slug: 'pulse-link',
    title: ['Pulse', 'Link'],
    year: 2026,
    client: 'Pulse Labs',
    category: { en: 'Branding / Web / AR', bs: 'Brending / Web / AR' },
    cover: img('p-pulse-link-portrait'),
    wide: img('p-pulse-link-wide'),
    featured: true,
    statement: ['Connect', 'the', 'Experience'],
    lead: {
      en: 'Pulse Link aims to connect today’s people to tomorrow’s experiences through design and innovation.',
      bs: 'Pulse Link želi povezati današnje ljude sa sutrašnjim iskustvima kroz dizajn i inovaciju.',
    },
    body: {
      en: 'Pulse Link is an interface that links the physical world with the internet and the metaverse through different devices. For their launch, Nova Forma was in charge of the website design and overall branding. Based on their characteristic of linking two different worlds together, the image of linking and merging was essential to this project.',
      bs: 'Pulse Link je interfejs koji kroz različite uređaje povezuje fizički svijet s internetom i metaverzumom. Za njihovo lansiranje, Nova Forma je bila zadužena za dizajn web stranice i cjelokupni brending. Budući da spajaju dva različita svijeta, slika povezivanja i stapanja bila je ključna za ovaj projekat.',
    },
    gallery: [{ src: img('gal-pulse-1'), ratio: 1.5 }, { src: img('gal-pulse-2'), ratio: 1.5 }],
    marquee: 'The connection',
    credits: baseCredits([
      { role: { en: 'Production support (AR demo)', bs: 'Produkcijska podrška (AR demo)' }, name: 'Selma Hodžić' },
      { role: { en: 'Developer (AR demo)', bs: 'Developer (AR demo)' }, name: 'Kenan Alić (Pulse Labs)' },
    ]),
  },
  {
    slug: 'blue-orbit',
    title: ['Blue', 'Orbit'],
    year: 2025,
    client: 'Orbit Mobile',
    category: { en: 'Illustration', bs: 'Ilustracija' },
    cover: img('p-blue-orbit-portrait'),
    wide: img('p-blue-orbit-portrait'),
    lead: { en: 'An illustration system for a mobile network that sells distance as closeness.', bs: 'Ilustracijski sistem za mobilnu mrežu koja udaljenost prodaje kao bliskost.' },
    body: { en: 'Cobalt, white and one confident line: a visual language flexible enough for billboards and 16-pixel icons alike.', bs: 'Kobalt, bijela i jedna sigurna linija: vizuelni jezik dovoljno fleksibilan i za bilborde i za ikone od 16 piksela.' },
    marquee: 'Close in orbit',
    credits: baseCredits(),
  },
  {
    slug: 'sky-hangar',
    title: ['Sky', 'Hangar'],
    year: 2024,
    client: 'BH Aviation Museum',
    category: { en: 'Museum / Digital', bs: 'Muzej / Digitalno' },
    cover: img('p-sky-hangar-portrait'),
    wide: img('p-sky-hangar-wide'),
    lead: { en: 'A digital museum that opens the doors of a working hangar.', bs: 'Digitalni muzej koji otvara vrata hangara u radu.' },
    body: { en: 'Guided tours, archive film and live maintenance footage woven into one quiet interface.', bs: 'Vođene ture, arhivski film i snimci održavanja uživo utkani u jedan miran interfejs.' },
    marquee: 'Open the hangar',
    credits: baseCredits(),
  },
  {
    slug: 'flora-field',
    title: ['Flora', 'Field'],
    year: 2024,
    client: 'Botanical Garden',
    category: { en: 'Installation', bs: 'Instalacija' },
    cover: img('p-flora-field-portrait'),
    wide: img('p-flora-field-portrait'),
    lead: { en: 'A night garden of glowing flowers that bloom as you breathe.', bs: 'Noćni vrt svjetlećih cvjetova koji cvjetaju dok dišete.' },
    body: { en: 'Soft sensors read the rhythm of visitors and pass it to thousands of light-emitting petals.', bs: 'Mekani senzori čitaju ritam posjetilaca i prenose ga hiljadama svjetlećih latica.' },
    marquee: 'Bloom at night',
    credits: baseCredits(),
  },
  {
    slug: 'kafa-ritual',
    title: ['Kafa', 'Ritual'],
    year: 2023,
    client: 'Džezva & Co.',
    category: { en: 'Branding / Packaging', bs: 'Brending / Ambalaža' },
    cover: img('p-kafa-ritual-portrait'),
    wide: img('p-kafa-ritual-wide'),
    lead: { en: 'Brand and packaging for a coffee house that treats time as an ingredient.', bs: 'Brend i ambalaža za kafanu koja vrijeme tretira kao sastojak.' },
    body: { en: 'Copper, walnut and steam. A slow identity for a slow ritual.', bs: 'Bakar, orah i para. Spor identitet za spori ritual.' },
    marquee: 'Time is an ingredient',
    credits: baseCredits(),
  },
  {
    slug: 'stone-archive',
    title: ['Stone', 'Archive'],
    year: 2023,
    client: 'Mostar Heritage',
    category: { en: 'Research / Web', bs: 'Istraživanje / Web' },
    cover: img('p-stone-archive-portrait'),
    wide: img('p-stone-archive-portrait'),
    lead: { en: 'A scanned archive of 3,000 stones from a rebuilt bridge.', bs: 'Skenirana arhiva od 3.000 kamenova obnovljenog mosta.' },
    body: { en: 'Photogrammetry, oral histories and a browsable map of every block.', bs: 'Fotogrametrija, usmene historije i mapa svakog bloka koju možete pretraživati.' },
    marquee: 'Every stone remembers',
    credits: baseCredits(),
  },
  {
    slug: 'river-form',
    title: ['River', 'Form'],
    year: 2022,
    client: 'Neretva Foundation',
    category: { en: 'Campaign', bs: 'Kampanja' },
    cover: img('p-river-form-portrait'),
    wide: img('p-river-form-portrait'),
    lead: { en: 'A campaign mapping a river from above to protect it below.', bs: 'Kampanja koja mapira rijeku odozgo kako bi je zaštitila dolje.' },
    body: { en: 'Drone studies became posters, a film and a petition signed by 40,000 people.', bs: 'Studije dronom postale su plakati, film i peticija s 40.000 potpisa.' },
    marquee: 'Follow the river',
    credits: baseCredits(),
  },
  {
    slug: 'glass-hours',
    title: ['Glass', 'Hours'],
    year: 2022,
    client: 'Prism Gallery',
    category: { en: 'Object', bs: 'Objekat' },
    cover: img('p-glass-hours-portrait'),
    wide: img('p-glass-hours-portrait'),
    lead: { en: 'A limited edition of iridescent hourglasses for a gallery anniversary.', bs: 'Limitirana serija prelijevajućih pješčanih satova za godišnjicu galerije.' },
    body: { en: 'Each hourglass splits daylight into a slow rainbow that turns with the sand.', bs: 'Svaki pješčani sat razlaže dnevno svjetlo u sporu dugu koja se okreće s pijeskom.' },
    marquee: 'Light takes time',
    credits: baseCredits(),
  },
]

export const featured = projects.filter((p) => p.featured)
export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
