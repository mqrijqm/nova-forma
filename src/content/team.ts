import type { Locale } from '@/lib/i18n'

type T = Record<Locale, string>

export type Member = { name: string; role: T; bio: T; img?: string; collaborator?: boolean; link?: string }

export const team: Member[] = [
  {
    name: 'Amar Hadžić',
    img: '/media/team-1.webp',
    role: { en: 'Founder / Lighting designer', bs: 'Osnivač / Dizajner svjetla' },
    bio: {
      en: 'Trained as an architect in Sarajevo and Vienna, Amar spent ten years lighting museums and hotels across Europe before opening Nova Forma in 2019. He leads every project from the first site visit to the final focusing night, and still sketches every chandelier by hand.',
      bs: 'Školovan kao arhitekta u Sarajevu i Beču, Amar je deset godina osvjetljavao muzeje i hotele širom Evrope prije nego što je 2019. otvorio Novu Formu. Vodi svaki projekat od prve posjete prostoru do posljednje noći usmjeravanja svjetla, i svaki luster i dalje skicira rukom.',
    },
  },
  {
    name: 'Lejla Begović',
    img: '/media/team-2.webp',
    role: { en: 'Product designer', bs: 'Dizajnerica proizvoda' },
    bio: {
      en: 'Lejla designs our collections, from the Opal Series to the Linen Shade lamps. She turns a sketch into drawings the workshop can build, and knows exactly how thin a brass arm can be before it bends.',
      bs: 'Lejla dizajnira naše kolekcije, od Opal serije do Linen Shade lampi. Skicu pretvara u crteže po kojima radionica može raditi i tačno zna koliko tanka mesingana ruka može biti prije nego što se savije.',
    },
  },
  {
    name: 'Tarik Mujić',
    img: '/media/team-3.webp',
    role: { en: 'Lighting engineer', bs: 'Inženjer rasvjete' },
    bio: {
      en: 'Tarik calculates, wires and programs. He designs the LED modules and drivers inside our lamps and the control systems behind projects like Galerija Ars. If a light dims smoothly to 1%, he made it happen.',
      bs: 'Tarik računa, povezuje i programira. Dizajnira LED module i drajvere u našim lampama i sisteme upravljanja iza projekata poput Galerije Ars. Ako se svjetlo glatko priguši do 1%, on je zaslužan.',
    },
  },
  {
    name: 'Ena Kovač',
    img: '/media/team-4.webp',
    role: { en: 'Master glassblower', bs: 'Majstorica duvanja stakla' },
    bio: {
      en: 'Ena learned glassblowing in Murano and brought it home. She runs our furnace, trains apprentices and signs every globe of the Opal Series. Her record: 1,240 matching drops for the Bašta chandelier in nine weeks.',
      bs: 'Ena je duvanje stakla naučila na Muranu i donijela ga kući. Vodi našu peć, obučava šegrte i potpisuje svaku kuglu Opal serije. Njen rekord: 1.240 usklađenih kapi za luster u Bašti za devet sedmica.',
    },
  },
  {
    name: 'Haris Delić',
    img: '/media/team-5.webp',
    role: { en: 'Brass & metalwork', bs: 'Mesing i metal' },
    bio: {
      en: 'Haris turns, bends and polishes every brass part we make, from tiny canopies to six-metre rings. He grew up in his grandfather’s coppersmith shop two streets from our atelier.',
      bs: 'Haris tokari, savija i polira svaki mesingani dio koji pravimo, od malih kapa do prstenova od šest metara. Odrastao je u djedovoj kazandžijskoj radnji dvije ulice od našeg ateljea.',
    },
  },
  {
    name: 'Mirela Softić',
    img: '/media/team-6.webp',
    role: { en: 'Project manager', bs: 'Projekt menadžerka' },
    bio: {
      en: 'Mirela keeps projects, budgets and shipping in balance. She plans every installation with architects and contractors, so a chandelier made in Sarajevo is hanging in Vienna or Dubai on the promised day.',
      bs: 'Mirela drži projekte, budžete i isporuke u ravnoteži. Svaku montažu planira s arhitektima i izvođačima, kako bi luster napravljen u Sarajevu visio u Beču ili Dubaiju tačno na obećani dan.',
    },
  },
  {
    name: 'Staklara Kreševo',
    collaborator: true,
    role: { en: 'Glass furnace partner', bs: 'Partner za staklarsku peć' },
    bio: {
      en: 'A family glassworks near Kreševo where we blow our largest pieces. Partners since our first chandelier.',
      bs: 'Porodična staklara kod Kreševa u kojoj duvamo naše najveće komade. Partneri od našeg prvog lustera.',
    },
    link: 'https://example.com',
  },
  {
    name: 'Elektro Tim',
    collaborator: true,
    role: { en: 'Electrical installation', bs: 'Elektroinstalacije' },
    bio: {
      en: 'Certified electricians who install and test every project with us, from villas to museum control systems.',
      bs: 'Certificirani električari koji s nama montiraju i testiraju svaki projekat, od vila do muzejskih sistema upravljanja.',
    },
    link: 'https://example.com',
  },
]

export const gallery = [
  { src: '/media/ab-atelier-1.webp', caption: { en: 'Showroom, Kazandžiluk', bs: 'Izložbeni salon, Kazandžiluk' } },
  { src: '/media/ab-atelier-2.webp', caption: { en: 'Glass workshop', bs: 'Staklarska radionica' } },
  { src: '/media/ab-atelier-3.webp', caption: { en: 'Design desk', bs: 'Radni sto dizajna' } },
  { src: '/media/ab-atelier-4.webp', caption: { en: 'Brass workshop', bs: 'Radionica mesinga' } },
  { src: '/media/ab-atelier-5.webp', caption: { en: 'Ready for shipping', bs: 'Spremno za isporuku' } },
]
