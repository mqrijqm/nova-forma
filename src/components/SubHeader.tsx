import Split from './Split'
import LangPill from './LangPill'
import type { Locale } from '@/lib/i18n'

/** Subpage hero: serif + sans title, support text, (SCROLL). */
export default function SubHeader({
  lang,
  title,
  support,
  scroll,
}: {
  lang: Locale
  title: string[]
  support: string
  scroll: string
}) {
  return (
    <section className="page-header sub-header">
      <LangPill lang={lang} />
      <div className="sub-header-in">
        <Split as="h1" lines={title} mode="char" variant="flip-c" alternate className="page-title sub center" />
        <Split lines={support} className="sub-support upper f-xs" delay={0.4} />
      </div>
      <div className="parts parts-b justify-center f-xs upper light">
        <span className="fadein" data-io="">
          {scroll}
        </span>
      </div>
    </section>
  )
}
