import { notFound } from 'next/navigation'
import { hasLocale } from '@/lib/i18n'
import { getDict } from '@/content/dict'
import { featured } from '@/content/projects'
import { videoFor } from '@/content/media'
import Split from '@/components/Split'
import Clock from '@/components/Clock'
import Pickup from '@/components/home/Pickup'
import Featured from '@/components/home/Featured'
import Footer from '@/components/Footer'
import TLink from '@/components/shell/TLink'
import LangPill from '@/components/LangPill'
import { Border, Headline, Spacer, ULink } from '@/components/ui'

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const t = getDict(lang)
  const [l1, l2, l3] = t.home.title

  return (
    <>
      <section className="page-header home-header">
        <LangPill lang={lang} />
        <h1 className="sr-only">{t.home.title.join(' ')}</h1>
        <Split
          as="div"
          className="page-title home-title"
          mode="char"
          variant="flip-c"
          alternate
          lines={[l1, l2, l3]}
        />
        <div className="lead-box home-lead clip" data-io="">
          <span className="indent" />
          {t.home.lead.split(' ').map((w, i) => (
            <span key={i}>
              <span className="w">
                <span className="o" style={{ ['--d' as string]: i + 6 }}>
                  <span className="t">{w}</span>
                </span>
              </span>{' '}
            </span>
          ))}
        </div>
        <div className="parts parts-b f-xxs">
          <div className="fadein" data-io="">
            <Clock label={t.city} />
          </div>
        </div>
        <Pickup
          label={t.home.projects}
          slides={featured.map((p) => ({
            href: `/${lang}/project/${p.slug}`,
            src: p.cover,
            video: videoFor(p.slug, 'portrait'),
            alt: p.title.join(' '),
          }))}
        />
      </section>

      <section data-bg="dark" className="home-whatwedo">
        <Spacer n={3} />
        <div className="body">
          <Headline text={t.home.whatWeDo} />
          <Border className="sub" />
          <Spacer n={1} />
          <Split lines={t.home.statement} className="p1" />
          <Spacer n={1} />
          <div className="flex justify-center" data-io="">
            <TLink href={`/${lang}/about`} className="btn-circle" data-c="small">
              <span className="b" />
              <span className="f" />
              <ULink>{t.home.aboutUs}</ULink>
            </TLink>
          </div>
        </div>
        <Spacer n={4} />
      </section>

      <section className="home-featured">
        <Spacer n={3} />
        <div className="body">
          <Headline text={t.home.featured} />
          <Spacer n={1.5} />
          <div className="flex justify-center clip" data-io="">
            <TLink href={`/${lang}/project`} data-c="small">
              <span className="o">
                <span className="t">
                  <ULink>{t.home.viewAll}</ULink>
                </span>
              </span>
            </TLink>
          </div>
          <Spacer n={1} />
          <Border />
          <Featured items={featured} lang={lang} />
        </div>
        <Spacer n={4} />
      </section>

      <Footer lang={lang} t={t} />
    </>
  )
}
