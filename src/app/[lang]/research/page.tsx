import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { hasLocale } from '@/lib/i18n'
import { getDict } from '@/content/dict'
import { research, type Slot } from '@/content/research'
import Split from '@/components/Split'
import Footer from '@/components/Footer'
import TLink from '@/components/shell/TLink'
import SubHeader from '@/components/SubHeader'
import ParallaxScope from '@/components/ParallaxScope'
import { Arrow, Border, Headline, Spacer } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[lang]/research'>): Promise<Metadata> {
  const { lang } = await params
  return { title: lang === 'bs' ? 'Istraživanje' : 'Research' }
}

function Grid({ slots, h, className }: { slots: Slot[]; h: number; className: string }) {
  return (
    <div className={`grid-c ${className}`} style={{ height: `calc(var(--gw) * ${h})` }}>
      {slots.map((s) => (
        <div
          key={s.src}
          className="grid-img"
          data-speed={s.speed}
          style={{
            left: `calc(var(--gw) * ${s.x})`,
            top: `calc(var(--gw) * ${s.y})`,
            width: `calc(var(--gw) * ${s.w})`,
            height: `calc(var(--gw) * ${s.h})`,
          }}
        >
          <div className="bg-img" data-io="">
            <Image src={s.src} alt={s.caption ?? ''} fill sizes="(max-width: 768px) 50vw, 35vw" className="media" />
          </div>
          {s.caption && <span className="grid-cap f-xxxs upper">{s.caption}</span>}
        </div>
      ))}
    </div>
  )
}

export default async function ResearchPage({ params }: PageProps<'/[lang]/research'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = getDict(lang)

  return (
    <>
      <SubHeader lang={lang} title={t.research.title} support={t.research.support} scroll={t.detail.scroll} />
      <ParallaxScope>
        {research.map((r, i) => (
          <section key={r.slug} className="section-research">
            <div className="body">
              <Headline text={r.headline[lang]} />
              <Border left={r.year} right={`(${String(i + 1).padStart(2, '0')})`} />
            </div>
            <TLink href={`/${lang}/project/${r.project}`} className="research-a body" data-c={`label:${t.cursor.explore}`}>
              <Spacer n={2} />
              <Grid slots={r.top} h={r.topH} className="grid-top" />
              <div className="grid-title" data-speed="1">
                <Split lines={[r.title]} mode="char" variant="flip-c" alternate className="page-title center research-title" />
              </div>
              <Grid slots={r.bottom} h={r.bottomH} className="grid-bottom" />
              <div className="grid-lead" style={{ top: `auto` }}>
                <Split lines={r.lead[lang]} variant="clip" className="lead-box research-lead" />
                <span className="btn-arrow">
                  <span className="b" />
                  <Arrow />
                </span>
              </div>
            </TLink>
            <Spacer n={2} />
          </section>
        ))}
      </ParallaxScope>
      <Footer lang={lang} t={t} />
    </>
  )
}
