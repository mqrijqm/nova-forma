import type { Locale } from '@/lib/i18n'

type T = Record<Locale, string>

export type Member = { name: string; role: T; bio: T; img?: string; collaborator?: boolean; link?: string }

export const team: Member[] = [
  {
    name: 'Amar Hadžić',
    img: '/media/team-1.webp',
    role: { en: 'Founder / Creative director', bs: 'Osnivač / Kreativni direktor' },
    bio: {
      en: 'Trained as an architect in Sarajevo and Vienna, Amar spent a decade designing exhibitions before founding Nova Forma in 2019. He leads every project from the first sketch to the last light cue, and still believes the best ideas start with a pencil and a window.',
      bs: 'Školovan kao arhitekta u Sarajevu i Beču, Amar je deceniju dizajnirao izložbe prije nego što je 2019. osnovao Novu Formu. Vodi svaki projekat od prve skice do posljednjeg svjetlosnog znaka i i dalje vjeruje da najbolje ideje počinju olovkom i prozorom.',
    },
  },
  {
    name: 'Lejla Begović',
    img: '/media/team-2.webp',
    role: { en: 'Art director / Designer', bs: 'Art direktorica / Dizajnerica' },
    bio: {
      en: 'Lejla shapes the visual language of the studio, from typography to film. Before Nova Forma she worked with fashion houses in Milan and Paris. She collects old Bosnian textiles and brings their patterns quietly into digital work.',
      bs: 'Lejla oblikuje vizuelni jezik studija, od tipografije do filma. Prije Nove Forme radila je s modnim kućama u Milanu i Parizu. Sakuplja stare bosanske tekstile i njihove uzorke tiho unosi u digitalni rad.',
    },
  },
  {
    name: 'Tarik Mujić',
    img: '/media/team-3.webp',
    role: { en: 'Technical director', bs: 'Tehnički direktor' },
    bio: {
      en: 'Engineer, tinkerer and lighting nerd. Tarik builds the sensors, software and hardware that let our spaces respond to people. If something blinks, moves or listens in a Nova Forma project, he probably soldered it.',
      bs: 'Inženjer, majstor i zaljubljenik u svjetlo. Tarik pravi senzore, softver i hardver koji omogućavaju našim prostorima da reaguju na ljude. Ako nešto trepće, pomjera se ili sluša u projektu Nove Forme, vjerovatno ga je on zalemio.',
    },
  },
  {
    name: 'Ena Kovač',
    img: '/media/team-4.webp',
    role: { en: 'Creative developer', bs: 'Kreativna developerica' },
    bio: {
      en: 'Ena writes the code behind our websites and real-time experiences, from WebGL to installations. She cares about the last ten percent: the easing of a curve, the timing of a fade, the feeling of a scroll.',
      bs: 'Ena piše kod iza naših web stranica i iskustava u realnom vremenu, od WebGL-a do instalacija. Brine o posljednjih deset posto: ublažavanju krivulje, tajmingu pretapanja, osjećaju skrola.',
    },
  },
  {
    name: 'Haris Delić',
    img: '/media/team-5.webp',
    role: { en: '3D artist', bs: '3D umjetnik' },
    bio: {
      en: 'Haris turns products into choreography. His exploded views and material studies have become a signature of the studio. Outside work he restores old motorcycles, one bolt at a time.',
      bs: 'Haris pretvara proizvode u koreografiju. Njegovi rastavljeni prikazi i studije materijala postali su potpis studija. Van posla restaurira stare motocikle, šaraf po šaraf.',
    },
  },
  {
    name: 'Mirela Softić',
    img: '/media/team-6.webp',
    role: { en: 'Producer', bs: 'Producentica' },
    bio: {
      en: 'Mirela keeps projects, people and budgets in balance. With a background in film production, she makes sure every installation opens on time and every client feels at home.',
      bs: 'Mirela drži projekte, ljude i budžete u ravnoteži. S iskustvom u filmskoj produkciji, brine da se svaka instalacija otvori na vrijeme i da se svaki klijent osjeća kao kod kuće.',
    },
  },
  {
    name: 'Atelier Svjetlo',
    collaborator: true,
    role: { en: 'Lighting engineering', bs: 'Inženjering svjetla' },
    bio: {
      en: 'Our long-time partner for custom luminaires and light control systems, based in Mostar.',
      bs: 'Naš dugogodišnji partner za svjetiljke po mjeri i sisteme upravljanja svjetlom, iz Mostara.',
    },
    link: 'https://example.com',
  },
  {
    name: 'Studio Zvuk',
    collaborator: true,
    role: { en: 'Sound design', bs: 'Dizajn zvuka' },
    bio: {
      en: 'Composers and sound designers who give our spaces a voice, from spatial audio to generative scores.',
      bs: 'Kompozitori i dizajneri zvuka koji našim prostorima daju glas, od prostornog zvuka do generativnih kompozicija.',
    },
    link: 'https://example.com',
  },
]

export const gallery = [
  { src: '/media/about-studio.webp', caption: { en: 'The studio, Ferhadija', bs: 'Studio, Ferhadija' } },
  { src: '/media/gal-studio-1.webp', caption: { en: 'Prototype workshop', bs: 'Radionica prototipova' } },
  { src: '/media/gal-studio-2.webp', caption: { en: 'Layout review', bs: 'Pregled layouta' } },
  { src: '/media/about-team.webp', caption: { en: 'The team, 2026', bs: 'Tim, 2026' } },
  { src: '/media/gal-studio-3.webp', caption: { en: 'Late light', bs: 'Kasno svjetlo' } },
]
