import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, locales } from '@/lib/i18n'
import { getDict } from '@/content/dict'
import { getProject, nextProject, projects } from '@/content/projects'
import Split from '@/components/Split'
import Footer from '@/components/Footer'
import TLink from '@/components/shell/TLink'
import LangPill from '@/components/LangPill'
import ParallaxMedia from '@/components/ParallaxMedia'
import LightDiagram from '@/components/detail/LightDiagram'
import { Border, Headline, Marquee, Spacer, Star } from '@/components/ui'

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })))
}

export async function generateMetadata({ params }: PageProps<'/[lang]/project/[slug]'>): Promise<Metadata> {
  const { slug, lang } = await params
  const p = getProject(slug)
  if (!p || !hasLocale(lang)) return {}
  return { title: p.title.join(' '), description: p.lead[lang] }
}

export default async function ProjectDetail({ params }: PageProps<'/[lang]/project/[slug]'>) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()
  const p = getProject(slug)
  if (!p) notFound()
  const t = getDict(lang)
  const next = nextProject(slug)
  const [s1, s2, s3] = p.statement?.[lang] ?? [p.title[0], '', p.title[1] ?? '']

  return (
    <>
      <section className="page-header single-header">
        <LangPill lang={lang} />
        <div className="single-title-wrap">
          <Split as="h1" lines={p.title} mode="char" variant="flip-c" alternate className="page-title center single-title" />
        </div>
        <div className="parts parts-b single-parts f-xs upper">
          <TLink href={`/${lang}/project`} className="link-u" data-c="small">
            {t.detail.back}
            <span className="u" />
          </TLink>
          <span className="light">{t.detail.scroll}</span>
          <TLink href={`/${lang}/project/${next.slug}`} className="link-u" data-c="small">
            {t.detail.next}
            <span className="u" />
          </TLink>
        </div>
      </section>

      <section className="single-hero" data-bg="dark">
        <ParallaxMedia src={p.wide} alt={p.title.join(' ')} priority />
        <div className="single-statement">
          <Split lines={[s1]} mode="char" variant="flip-c" className="st-solid" />
          <div className="st-row">
            <Split lines={[s2]} mode="char" variant="flip-c" className="st-solid" delay={0.1} />
            <Split lines={[s3]} mode="char" variant="flip-c" className="st-outline" delay={0.2} />
          </div>
          <Split lines={p.lead[lang]} variant="clip" className="st-lead upper" />
        </div>
      </section>

      <section className="single-info">
        <Spacer n={2} />
        <div className="body">
          <Headline text={p.title.join(' ')} />
          <Border className="sub" />
          <ul className="info-ul clip" data-io="">
            {[
              [t.detail.client, p.client],
              [t.detail.year, String(p.year)],
              [t.detail.category, p.category[lang]],
              [t.detail.link, t.detail.visit],
            ].map(([k, v], i) => (
              <li key={k}>
                <span className="o" style={{ ['--d' as string]: i }}>
                  <span className="t upper">{k}</span>
                </span>
                <span className="o" style={{ ['--d' as string]: i + 1 }}>
                  <span className="t upper light f-xs">{v}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Spacer n={3} />
        <div className="col-editor">
          <Split lines={p.lead[lang]} className="p1 single-lead" variant="clip" />
          <Spacer n={1.5} />
          <div className="editor fadein" data-io="">
            <p>{p.body[lang]}</p>
          </div>
        </div>
        <Spacer n={3} />
      </section>

      {p.gallery?.[0] && (
        <section className="single-img">
          <div className={`thin ${p.gallery[0].ratio < 1 ? 'is-portrait' : ''}`}>
            <ParallaxMedia src={p.gallery[0].src} alt="" ratio={p.gallery[0].ratio} speed={0.6} />
          </div>
          <Spacer n={3} />
        </section>
      )}

      <section className="single-shift">
        <div className="body">
          <Headline text={t.detail.shiftThe} />
          <Border className="sub" />
        </div>
        <Spacer n={1.5} />
        <Marquee a={[p.marquee[lang], p.marquee[lang], p.marquee[lang]]} b={[p.marquee[lang], p.marquee[lang], p.marquee[lang]]} />
        <Spacer n={2} />
        {p.diagram && (
          <>
            <LightDiagram lang={lang} />
            <Spacer n={2} />
          </>
        )}
      </section>

      {p.gallery?.[1] && (
        <section className="single-img" data-bg="dark">
          <Spacer n={3} />
          <div className={`thin ${p.gallery[1].ratio < 1 ? 'is-portrait' : ''}`}>
            <ParallaxMedia src={p.gallery[1].src} alt="" ratio={p.gallery[1].ratio} speed={0.6} />
          </div>
          <Spacer n={3} />
        </section>
      )}

      <section className="single-credits">
        <Spacer n={3} />
        <Split lines={t.detail.credits} mode="char" variant="flip-c" className="big-title" />
        <div className="star-row fadein" data-io="">
          <Star />
        </div>
        <div className="body">
          <Border />
        </div>
        <Spacer n={1.5} />
        <div className="inner credits-grid clip" data-io="">
          {p.credits.map((c, i) => (
            <div key={i} className="credit">
              <div className="credit-role upper">
                <span className="o" style={{ ['--d' as string]: i }}>
                  <span className="t">{c.role[lang]}</span>
                </span>
              </div>
              <div className="credit-name editor f-s">
                <span className="o" style={{ ['--d' as string]: i }}>
                  <span className="t">{c.name}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
        <Spacer n={3} />
        <div className="body">
          <Headline text={t.detail.awards} />
          <Border className="sub" />
          <Spacer n={1} />
          <Split lines={t.detail.awardsText} variant="clip" className="editor awards-text" />
        </div>
        <Spacer n={4} />
      </section>

      <Footer lang={lang} t={t} territory={false} headline={t.detail.nextProject}>
        <TLink href={`/${lang}/project/${next.slug}`} className="next-title" data-c={`label:${t.cursor.next}`}>
          <Split lines={next.title} mode="char" variant="flip-c" alternate className="page-title center" />
        </TLink>
      </Footer>
    </>
  )
}
