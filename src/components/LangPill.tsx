'use client'

import { usePathname } from 'next/navigation'
import TLink from './shell/TLink'
import { swapLocale } from './shell/Header'
import type { Locale } from '@/lib/i18n'

/** In-page language pill (top bar, 4gw from the right edge). */
export default function LangPill({ lang }: { lang: Locale }) {
  const pathname = usePathname()
  const other: Locale = lang === 'en' ? 'bs' : 'en'
  return (
    <div className="site-lang fadein" data-io="">
      <TLink href={swapLocale(pathname, other)} className="pill" data-c="small">
        <span className="pt">{other.toUpperCase()}</span>
      </TLink>
    </div>
  )
}
