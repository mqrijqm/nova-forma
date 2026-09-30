import type { Locale } from '@/lib/i18n'

type T = Record<Locale, string>

/** Collage slot in grid units (1 = 1/24 of the viewport width). */
export type Slot = { src: string; x: number; y: number; w: number; h: number; speed: number; caption?: string }

export type Research = {
  slug: string
  title: string
  headline: T
  year: number
  lead: T
  project: string
  top: Slot[]
  topH: number
  bottom: Slot[]
  bottomH: number
}

const m = (n: string) => `/media/${n}.webp`

export const research: Research[] = [
  {
    slug: 'glass-lab',
    title: 'Glass:Lab',
    headline: { en: 'Glass research', bs: 'Istraživanje stakla' },
    year: 2026,
    lead: {
      en: 'Every week our glassblowers test new shapes and wall thicknesses to find how glass can hide the light source and still let 80% of the light through.',
      bs: 'Svake sedmice naši staklari testiraju nove oblike i debljine stakla kako bi otkrili kako staklo može sakriti izvor svjetla, a ipak propustiti 80% svjetla.',
    },
    project: 'opal-series',
    topH: 9,
    top: [
      { src: m('rs-glass-1'), x: 1, y: 1, w: 6, h: 4.5, speed: -1, caption: 'Furnace, 1,150 °C' },
      { src: m('rs-glass-3'), x: 14, y: 2.6, w: 8, h: 6, speed: 0.5, caption: 'Clear, smoked, opal' },
    ],
    bottomH: 9,
    bottom: [{ src: m('rs-glass-2'), x: 3, y: 0, w: 5, h: 6.67, speed: -1.25, caption: 'Shade prototypes' }],
  },
  {
    slug: 'brass-patina',
    title: 'Brass & Patina',
    headline: { en: 'Metal research', bs: 'Istraživanje metala' },
    year: 2025,
    lead: {
      en: 'Forty finishes tested on brass over two years: which ones age beautifully in hotel lobbies and which ones need polishing every month.',
      bs: 'Četrdeset završnih obrada testiranih na mesingu tokom dvije godine: koje lijepo stare u hotelskim lobijima, a koje traže poliranje svakog mjeseca.',
    },
    project: 'basta-lobby',
    topH: 8,
    top: [
      { src: m('rs-brass-2'), x: 2, y: 0.5, w: 5, h: 6.67, speed: -0.75, caption: 'Canopy on the lathe' },
      { src: m('rs-brass-3'), x: 13, y: 1.5, w: 8, h: 6, speed: 0.6, caption: 'Finish samples' },
    ],
    bottomH: 7,
    bottom: [{ src: m('rs-brass-1'), x: 5, y: 0, w: 7, h: 5.25, speed: -1, caption: 'Rods and fittings' }],
  },
  {
    slug: 'pleated-light',
    title: 'Pleated Light',
    headline: { en: 'Textile research', bs: 'Istraživanje tekstila' },
    year: 2025,
    lead: {
      en: 'How deep should a pleat be? We folded linen and paper in 60 variations to find the shade that glows evenly with no hot spot.',
      bs: 'Koliko dubok treba biti nabor? Savili smo lan i papir u 60 varijacija kako bismo pronašli abažur koji svijetli ravnomjerno, bez jače tačke.',
    },
    project: 'linen-shade',
    topH: 9,
    top: [
      { src: m('rs-linen-1'), x: 1, y: 1.5, w: 8, h: 6, speed: -0.5, caption: 'Pleating table' },
      { src: m('rs-linen-2'), x: 16, y: 0.5, w: 5, h: 6.67, speed: 0.8, caption: 'Shade prototypes' },
    ],
    bottomH: 7,
    bottom: [{ src: m('rs-linen-3'), x: 2, y: 0, w: 8, h: 6, speed: -1.25, caption: 'Backlit linen' }],
  },
  {
    slug: 'warm-dim',
    title: 'Warm Dim',
    headline: { en: 'Colour research', bs: 'Istraživanje boje svjetla' },
    year: 2024,
    lead: {
      en: 'Light should get warmer as it gets dimmer, like a candle. We built our own driver that moves from 3000K to 1800K as you turn it down.',
      bs: 'Svjetlo treba postajati toplije kako se prigušuje, kao svijeća. Napravili smo vlastiti drajver koji prelazi sa 3000K na 1800K dok ga smanjujete.',
    },
    project: 'basta-lobby',
    topH: 9,
    top: [
      { src: m('rs-warm-1'), x: 1, y: 1, w: 8, h: 6, speed: -1, caption: 'Dimming test room' },
      { src: m('rs-warm-2'), x: 15, y: 2, w: 5, h: 6.67, speed: 0.6, caption: 'Spectrometer reading' },
    ],
    bottomH: 7,
    bottom: [{ src: m('rs-warm-3'), x: 4, y: 0, w: 7, h: 5.25, speed: -1.25, caption: '3000K to 1800K' }],
  },
  {
    slug: 'opal-optics',
    title: 'Opal Optics',
    headline: { en: 'Optics research', bs: 'Istraživanje optike' },
    year: 2024,
    lead: {
      en: 'Measuring how opal glass spreads light. The results became the wall thickness of every globe in our Opal Series.',
      bs: 'Mjerenje kako opal staklo raspršuje svjetlo. Rezultati su postali debljina stakla svake kugle iz naše Opal serije.',
    },
    project: 'opal-series',
    topH: 8,
    top: [
      { src: m('rs-opal-2'), x: 2, y: 0.5, w: 5, h: 6.67, speed: -0.75, caption: 'Diffuser discs' },
      { src: m('rs-opal-1'), x: 13, y: 1, w: 8, h: 6, speed: 0.5, caption: 'Diffusion test' },
    ],
    bottomH: 7,
    bottom: [{ src: m('rs-opal-3'), x: 5, y: 0, w: 7, h: 5.25, speed: -1, caption: 'Prototype assembly' }],
  },
  {
    slug: 'heritage-light',
    title: 'Old Walls',
    headline: { en: 'Heritage research', bs: 'Istraživanje naslijeđa' },
    year: 2023,
    lead: {
      en: 'Rules we follow when lighting historic buildings: no drilling, no glare, no light spill into the sky, and every fitting removable without trace.',
      bs: 'Pravila kojih se držimo kad osvjetljavamo historijske objekte: bez bušenja, bez bliještanja, bez svjetla prema nebu, i svaka svjetiljka uklonjiva bez traga.',
    },
    project: 'konak-house',
    topH: 9,
    top: [
      { src: m('rs-heritage-1'), x: 1, y: 1, w: 8, h: 6, speed: -1, caption: 'Courtyard at dusk' },
      { src: m('rs-heritage-3'), x: 14, y: 2.6, w: 8, h: 6, speed: 0.5, caption: 'Survey tools' },
    ],
    bottomH: 9,
    bottom: [{ src: m('rs-heritage-2'), x: 3, y: 0, w: 5, h: 6.67, speed: -1.25, caption: 'Carved ceiling' }],
  },
]
