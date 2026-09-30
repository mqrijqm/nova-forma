'use client'

import { usePathname } from 'next/navigation'
import type { CSSProperties } from 'react'
import TLink from './TLink'
import type { Locale } from '@/lib/i18n'
import type { Dict } from '@/content/dict'

export function swapLocale(pathname: string, to: Locale) {
  return pathname.replace(/^\/(en|bs)(?=\/|$)/, `/${to}`)
}

export default function Header({ lang, t }: { lang: Locale; t: Dict }) {
  const pathname = usePathname()
  const links = [
    { href: `/${lang}`, label: t.nav.home, match: (p: string) => p === `/${lang}` },
    { href: `/${lang}/project`, label: t.nav.project, match: (p: string) => p.startsWith(`/${lang}/project`) },
    { href: `/${lang}/research`, label: t.nav.research, match: (p: string) => p.startsWith(`/${lang}/research`) },
    { href: `/${lang}/about`, label: t.nav.about, match: (p: string) => p.startsWith(`/${lang}/about`) },
  ]
  const other: Locale = lang === 'en' ? 'bs' : 'en'
  const html = () => document.documentElement

  return (
    <header className="site-header">
      <TLink href={`/${lang}`} className="site-name" data-c="small">
        <span className="t">{t.studio}</span>
      </TLink>

      <nav
        className="site-navi"
        onMouseEnter={() => html().classList.contains('has-mouse') && html().classList.contains('has-over-navi') && html().classList.add('is-menu-open')}
        onMouseLeave={() => html().classList.remove('is-menu-open')}
      >
        <div className="navi-bg" />
        <div className="navi-head">
          <button className="pill" data-c="small" onClick={() => html().classList.toggle('is-menu-open')}>
            <span className="pt">{t.menu}</span>
          </button>
        </div>
        <div className="navi-body">
          <ul className="navi-ul">
            {links.map((l, i) => (
              <li key={l.href} style={{ '--i': i } as CSSProperties}>
                <span className="t">
                  <TLink href={l.href} className={l.match(pathname) ? 'active' : ''} data-c="small">
                    {l.label}
                    <span className="u" />
                  </TLink>
                </span>
              </li>
            ))}
          </ul>
          <div className="navi-lang">
            <span className="t">{lang.toUpperCase()}</span>
            <TLink href={swapLocale(pathname, other)} className="pill" data-c="small">
              <span className="pt">{other.toUpperCase()}</span>
            </TLink>
          </div>
        </div>
      </nav>
    </header>
  )
}
