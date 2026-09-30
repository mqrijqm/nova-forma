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
    slug: 'light-lab',
    title: 'Light:Lab',
    headline: { en: 'Optics research', bs: 'Istraživanje optike' },
    year: 2026,
    lead: {
      en: 'An open lab on how light can carry information in space: prisms, planes and sensors tested at one-to-one scale.',
      bs: 'Otvoreni laboratorij o tome kako svjetlo može nositi informaciju u prostoru: prizme, ravni i senzori testirani u stvarnoj veličini.',
    },
    project: 'level-of-light',
    topH: 9,
    top: [
      { src: m('research-light-lab'), x: 1, y: 1, w: 6, h: 4, speed: -1, caption: 'Prototype table, 2026' },
      { src: m('r-light-2'), x: 14, y: 2.6, w: 8, h: 6, speed: 0.5, caption: 'Lens array study' },
    ],
    bottomH: 9,
    bottom: [{ src: m('r-light-3'), x: 3, y: 0, w: 5, h: 6.67, speed: -1.25, caption: 'Light column' }],
  },
  {
    slug: 'soft-matter',
    title: 'Soft Matter',
    headline: { en: 'Material research', bs: 'Istraživanje materijala' },
    year: 2025,
    lead: {
      en: 'Stretch, fold, cast. A library of soft materials that react to touch and heat, catalogued for future spaces.',
      bs: 'Istegni, savij, izlij. Biblioteka mekih materijala koji reaguju na dodir i toplotu, katalogizirana za buduće prostore.',
    },
    project: 'salt-and-silence',
    topH: 8,
    top: [
      { src: m('r-soft-3'), x: 2, y: 0.5, w: 5, h: 6.67, speed: -0.75, caption: 'Fluted form, CAD' },
      { src: m('research-material'), x: 13, y: 1.5, w: 8, h: 5.33, speed: 0.6, caption: 'Sample grid' },
    ],
    bottomH: 7,
    bottom: [{ src: m('r-soft-2'), x: 5, y: 0, w: 7, h: 5.25, speed: -1, caption: 'Membrane test' }],
  },
  {
    slug: 'paper-city',
    title: 'Paper City',
    headline: { en: 'Spatial research', bs: 'Prostorno istraživanje' },
    year: 2025,
    lead: {
      en: 'A city built from a single fold. Pleated modules explore how architecture could expand and contract with its people.',
      bs: 'Grad izgrađen od jednog nabora. Plisirani moduli istražuju kako bi se arhitektura mogla širiti i skupljati sa svojim ljudima.',
    },
    project: 'salt-and-silence',
    topH: 9,
    top: [
      { src: m('r-paper-1'), x: 1, y: 1.5, w: 8, h: 6, speed: -0.5, caption: 'Model, scale 1:50' },
      { src: m('r-paper-2'), x: 16, y: 0.5, w: 5, h: 6.67, speed: 0.8, caption: 'Folding session' },
    ],
    bottomH: 7,
    bottom: [{ src: m('r-paper-3'), x: 2, y: 0, w: 8, h: 6, speed: -1.25, caption: 'Module field' }],
  },
  {
    slug: 'digital-twin',
    title: 'Twin:City',
    headline: { en: 'Digital research', bs: 'Digitalno istraživanje' },
    year: 2024,
    lead: {
      en: 'Scanning the old town into millions of points, so it can be walked, studied and preserved by anyone, anywhere.',
      bs: 'Skeniranje starog grada u milione tačaka, kako bi ga svako, bilo gdje, mogao obići, proučiti i sačuvati.',
    },
    project: 'stone-archive',
    topH: 9,
    top: [
      { src: m('r-twin-1'), x: 1, y: 1, w: 8, h: 6, speed: -1, caption: 'Point cloud, old town' },
      { src: m('r-twin-2'), x: 15, y: 2, w: 5, h: 6.67, speed: 0.6, caption: 'Bridge scan' },
    ],
    bottomH: 7,
    bottom: [{ src: m('r-twin-3'), x: 4, y: 0, w: 7, h: 5.25, speed: -1.25, caption: 'VR walkthrough' }],
  },
  {
    slug: 'sound-of-stone',
    title: 'Stone Echo',
    headline: { en: 'Sound research', bs: 'Istraživanje zvuka' },
    year: 2024,
    lead: {
      en: 'Every stone has a resonance. We recorded the bridge block by block and carved the sound back into limestone.',
      bs: 'Svaki kamen ima rezonancu. Snimili smo most blok po blok i zvuk ponovo uklesali u krečnjak.',
    },
    project: 'stone-archive',
    topH: 8,
    top: [
      { src: m('r-stone-2'), x: 2, y: 0.5, w: 5, h: 6.67, speed: -0.75, caption: 'Contact microphone' },
      { src: m('r-stone-1'), x: 13, y: 1, w: 8, h: 6, speed: 0.5, caption: 'Carved waveform' },
    ],
    bottomH: 7,
    bottom: [{ src: m('p-stone-archive-portrait'), x: 6, y: 0, w: 4.5, h: 6, speed: -1, caption: 'Source block' }],
  },
  {
    slug: 'bio-form',
    title: 'Bio:Form',
    headline: { en: 'Living research', bs: 'Živo istraživanje' },
    year: 2023,
    lead: {
      en: 'Glass, moss and mycelium. Designing objects that grow, change color and slowly return to the ground.',
      bs: 'Staklo, mahovina i micelij. Dizajn objekata koji rastu, mijenjaju boju i polako se vraćaju u zemlju.',
    },
    project: 'flora-field',
    topH: 9,
    top: [
      { src: m('r-bio-1'), x: 1, y: 1, w: 6, h: 4.5, speed: -1, caption: 'Living samples' },
      { src: m('r-bio-3'), x: 14, y: 2.6, w: 8, h: 6, speed: 0.5, caption: 'Glass petal field' },
    ],
    bottomH: 9,
    bottom: [{ src: m('r-bio-2'), x: 3, y: 0, w: 5, h: 6.67, speed: -1.25, caption: 'Vessel with poppies' }],
  },
]
