'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import gsap from 'gsap'
import type { Locale } from '@/lib/i18n'
import type { Dict } from '@/content/dict'
import Split from './Split'
import TLink from './shell/TLink'
import { swapLocale } from './shell/Header'
import { Arrow, Border, Headline, Marquee, Spacer, ULink } from './ui'
import { runtime } from '@/lib/store'

export function scrollTop() {
  runtime.lenis ? runtime.lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function ThemeToggle({ t }: { t: Dict }) {
  const [inv, setInv] = useState(false)
  useEffect(() => {
    setInv(document.documentElement.dataset.theme === 'inverted')
  }, [])
  const toggle = () => {
    const html = document.documentElement
    const origin = document.querySelector('.page-origin')
    gsap.to(origin, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        const next = !inv
        setInv(next)
        if (next) html.dataset.theme = 'inverted'
        else delete html.dataset.theme
        try {
          localStorage.setItem('nf-theme', next ? 'inverted' : '')
        } catch {}
        runtime.lenis?.scrollTo(0, { immediate: true, force: true })
        window.scrollTo(0, 0)
        gsap.to(origin, { opacity: 1, duration: 1.2, ease: 'power2.out', clearProps: 'opacity' })
      },
    })
  }
  return (
    <button className="pill" data-c="small" onClick={toggle}>
      <span className="pt">{inv ? t.footer.light : t.footer.dark}</span>
    </button>
  )
}

/** "Our territory and fields" marquee + sitemap footer (dark). */
export default function Footer({
  lang,
  t,
  territory = true,
  headline,
  children,
}: {
  lang: Locale
  t: Dict
  territory?: boolean
  headline?: string
  children?: React.ReactNode
}) {
  const pathname = usePathname()
  const other: Locale = lang === 'en' ? 'bs' : 'en'

  return (
    <footer className="page-footer" data-footer="">
      {territory && (
        <section data-bg="dark" className="footer-territory">
          <Spacer n={3} />
          <div className="body">
            <Headline text={t.territory} />
            <Spacer n={1.5} />
            <div className="flex justify-center clip" data-io="">
              <TLink href={`/${lang}/about`} data-c="small">
                <span className="o">
                  <span className="t">
                    <ULink>{t.home.aboutUs}</ULink>
                  </span>
                </span>
              </TLink>
            </div>
            <Spacer n={1} />
            <Border />
          </div>
          <Spacer n={1.5} />
          <Marquee a={t.fieldsA} b={t.fieldsB} />
          <Spacer n={4.5} />
        </section>
      )}

      <section data-bg="dark" className="section-sitemap">
        <div className="body">
          <Border />
          <div className="title-flex">
            <div className="tf-l">
              <TLink href={swapLocale(pathname, other)} className="pill" data-c="small">
                <span className="pt">{other.toUpperCase()}</span>
              </TLink>
            </div>
            <div className="tf-c">
              <Split lines={headline ?? t.footer.tagline} className="headline" />
            </div>
            <div className="tf-r">
              <button className="back-top" onClick={scrollTop} data-c="small">
                <span className="link-u" style={{ fontWeight: 300 }}>
                  {t.footer.backToTop}
                </span>
                <span className="btn-arrow inv">
                  <span className="b" />
                  <Arrow style={{ rotate: '-90deg' }} />
                </span>
              </button>
            </div>
          </div>

          <div className="footer-flex">
            <Border />
            <Spacer n={2.5} />
            {children ?? (
              <a href="mailto:hello@novaforma.studio" className="footer-cta" data-c="small">
                <Split lines={t.footer.cta} mode="char" variant="flip-c" className="footer-cta-t" />
              </a>
            )}
            <Spacer n={2.5} />
            <Border />
            <div className="footer-bottom">
              <span className="f-xs light">©{new Date().getFullYear()}</span>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" data-c="small">
                <ULink>{t.footer.social}</ULink>
              </a>
              <ThemeToggle t={t} />
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}
