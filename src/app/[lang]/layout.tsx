import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import '../globals.css'
import { hasLocale, locales } from '@/lib/i18n'
import { getDict } from '@/content/dict'
import AppShell from '@/components/shell/AppShell'
import Header from '@/components/shell/Header'
import Cursor from '@/components/shell/Cursor'

// Zolina Light — metrics nudged towards the original display serif
// (cap height .657em, ascent .875 / descent .301).
const zolina = localFont({
  src: '../../fonts/zolina-light.woff2',
  variable: '--font-zolina',
  display: 'swap',
  declarations: [
    { prop: 'size-adjust', value: '94%' },
    { prop: 'ascent-override', value: '93%' },
    { prop: 'descent-override', value: '32%' },
    { prop: 'line-gap-override', value: '0%' },
  ],
})

// Hanken Grotesk (variable) — stands in for TWK Everett.
const hanken = localFont({
  src: '../../fonts/hanken-grotesk.woff2',
  variable: '--font-hanken',
  weight: '100 900',
  display: 'swap',
  declarations: [
    { prop: 'size-adjust', value: '106%' },
    { prop: 'ascent-override', value: '95%' },
    { prop: 'descent-override', value: '20%' },
    { prop: 'line-gap-override', value: '0%' },
  ],
})

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  return {
    title: { default: 'NOVA FORMA', template: '%s — NOVA FORMA' },
    description:
      lang === 'en'
        ? 'Nova Forma is a creative studio based in Sarajevo, giving ideas a new form through light and space.'
        : 'Nova Forma je kreativni studio iz Sarajeva koji idejama daje novu formu kroz svjetlo i prostor.',
  }
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = getDict(lang)

  return (
    <html lang={lang} className={`${zolina.variable} ${hanken.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(localStorage.getItem('nf-theme')==='inverted')document.documentElement.dataset.theme='inverted'}catch(e){}",
          }}
        />
      </head>
      <body>
        <Header lang={lang} t={t} />
        <main className="site-window">
          <AppShell>{children}</AppShell>
        </main>
        <Cursor />
      </body>
    </html>
  )
}
