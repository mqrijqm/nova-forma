import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from '@/lib/i18n'
import { getDict } from '@/content/dict'
import { gallery, team } from '@/content/team'
import Split from '@/components/Split'
import Footer from '@/components/Footer'
import SubHeader from '@/components/SubHeader'
import GenLogo from '@/components/about/GenLogo'
import TeamList from '@/components/about/TeamList'
import DragGallery from '@/components/about/DragGallery'
import { Arrow, Border, Headline, Marquee, Spacer, Star } from '@/components/ui'

export async function generateMetadata({ params }: PageProps<'/[lang]/about'>): Promise<Metadata> {
  const { lang } = await params
  return { title: lang === 'bs' ? 'O nama' : 'About' }
}

function BigTitle({ text, star = true }: { text: string; star?: boolean }) {
  return (
    <>
      <Split lines={text} mode="char" variant="flip-c" className="big-title" />
      {star ? (
        <div className="star-row fadein" data-io="">
          <Star />
        </div>
      ) : (
        <Spacer n={1.5} />
      )}
      <div className="body">
        <Border />
      </div>
    </>
  )
}

export default async function AboutPage({ params }: PageProps<'/[lang]/about'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = getDict(lang)
  const a = t.about

  return (
    <>
      <SubHeader lang={lang} title={a.title} support={a.support} scroll={t.detail.scroll} />

      <section className="about-concept">
        <div className="body">
          <Headline text={a.concept} />
          <Border right="(01)" />
          <Spacer n={2} />
          <Split lines={a.statement} className="p1" />
          <Spacer n={2} />
          <div className="concept-cols">
            <span />
            <div className="editor indent fadein" data-io="">
              <p>{a.conceptBody}</p>
            </div>
          </div>
        </div>
        <Spacer n={4} />
      </section>

      <section className="about-logo">
        <GenLogo label={a.nextForm} lead={a.logoLead} />
        <Spacer n={4} />
      </section>

      <section data-bg="dark" className="about-shift">
        <Spacer n={3} />
        <div className="body">
          <Headline text={t.detail.shiftThe} />
          <Border />
        </div>
        <Spacer n={1.5} />
        <Marquee a={a.formThe} b={a.formThe} />
        <Spacer n={4} />
      </section>

      <section className="about-team">
        <Spacer n={3} />
        <BigTitle text={a.team} />
        <div className="body">
          <TeamList team={team} lang={lang} t={t} />
        </div>
        <Spacer n={4} />
      </section>

      <section data-bg="dark" className="about-gallery">
        <Spacer n={3} />
        <BigTitle text={a.gallery} star={false} />
        <Spacer n={2} />
        <DragGallery items={gallery.map((g) => ({ src: g.src, caption: g.caption[lang] }))} label={t.cursor.drag} />
        <Spacer n={4} />
      </section>

      <section className="about-join">
        <Spacer n={3} />
        <BigTitle text={a.join} />
        <Spacer n={2} />
        <div className="inner join-cols">
          <ul className="join-roles clip" data-io="">
            {a.roles.map((r, i) => (
              <li key={r}>
                <span className="o" style={{ ['--d' as string]: i }}>
                  <span className="t">{r}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="join-body">
            <div className="editor fadein" data-io="">
              <p>{a.joinBody}</p>
            </div>
            <a href="mailto:jobs@novaforma.studio" className="join-entry" data-c="small">
              <span className="link-u upper">
                {a.entry}
                <span className="u" />
              </span>
              <span className="btn-arrow">
                <span className="b" />
                <Arrow />
              </span>
            </a>
          </div>
        </div>
        <Spacer n={4} />
      </section>

      <section className="about-profile">
        <BigTitle text={a.profile} star={false} />
        <Spacer n={1.5} />
        <div className="inner profile-grid clip" data-io="">
          {a.profileRows.map(([k, v], i) => (
            <div key={k} className="profile-cell">
              <div className="upper">
                <span className="o" style={{ ['--d' as string]: i }}>
                  <span className="t">{k}</span>
                </span>
              </div>
              <p className="editor f-s">{v}</p>
            </div>
          ))}
        </div>
        <Spacer n={3} />
        <div className="body">
          <Headline text={t.detail.awards} />
          <Border className="sub" />
          <Spacer n={1} />
          <Split lines={t.detail.awardsText} variant="clip" className="editor awards-text" />
          <Spacer n={3} />
          <Headline text={a.partners} />
          <Border className="sub" />
          <Spacer n={1.5} />
          <div className="partner fadein" data-io="">
            <div className="partner-title">{a.partner}</div>
            <div className="f-xs upper light">{a.partnerDesc}</div>
          </div>
        </div>
        <Spacer n={4} />
      </section>

      <Footer lang={lang} t={t} />
    </>
  )
}
