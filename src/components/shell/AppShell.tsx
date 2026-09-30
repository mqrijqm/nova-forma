'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { runtime, isTouch, reducedMotion } from '@/lib/store'

gsap.registerPlugin(ScrollTrigger)

const LEAVE_MS = 300

/**
 * Persistent client runtime: smooth scroll, page transitions,
 * in-view reveals and header scroll states. Wraps the page content.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const first = useRef(true)
  const ioRef = useRef<IntersectionObserver | null>(null)
  const visRef = useRef<IntersectionObserver | null>(null)

  // --- Lenis + GSAP ticker ------------------------------------------------
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    if (isTouch() || reducedMotion()) {
      ScrollTrigger.refresh()
      return
    }
    const isWin = navigator.userAgent.includes('Windows')
    const lenis = new Lenis({ lerp: isWin ? 0.2 : 0.1, smoothWheel: true, autoRaf: false })
    runtime.lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      runtime.lenis = null
    }
  }, [])

  // --- Splash (first paint) ------------------------------------------------
  useEffect(() => {
    const html = document.documentElement
    let done = false
    const go = () => {
      if (done) return
      done = true
      html.classList.add('is-splash')
      scan()
    }
    document.fonts.ready.then(() => requestAnimationFrame(go))
    const t = setTimeout(go, 1500)
    return () => clearTimeout(t)
     
  }, [])

  // --- Reveal observers ----------------------------------------------------
  function scan() {
    if (!document.documentElement.classList.contains('is-splash')) return
    ioRef.current ??= new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            ;(e.target as HTMLElement).dataset.shown = '1'
            ioRef.current?.unobserve(e.target)
          }
        }),
      { threshold: 0 },
    )
    visRef.current ??= new IntersectionObserver((entries) =>
      entries.forEach((e) => ((e.target as HTMLElement).dataset.visible = e.isIntersecting ? '1' : '0')),
    )
    document.querySelectorAll<HTMLElement>('[data-io]:not([data-shown])').forEach((el) => ioRef.current!.observe(el))
    document.querySelectorAll<HTMLElement>('[data-vis]').forEach((el) => visRef.current!.observe(el))
  }

  // --- Page transitions ----------------------------------------------------
  useEffect(() => {
    runtime.navigate = (href: string) => {
      const html = document.documentElement
      if (href === window.location.pathname) {
        if (runtime.lenis) runtime.lenis.scrollTo(0)
        else window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      html.classList.add('is-tr-leaving')
      html.classList.remove('is-menu-open')
      runtime.lenis?.stop()
      window.setTimeout(() => router.push(href, { scroll: false }), LEAVE_MS)
    }
  }, [router])

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const html = document.documentElement
    runtime.lenis?.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
    ioRef.current?.disconnect()
    ioRef.current = null
    visRef.current?.disconnect()
    visRef.current = null
    const t = window.setTimeout(() => {
      html.classList.remove('is-tr-leaving')
      runtime.lenis?.start()
      ScrollTrigger.refresh()
      scan()
    }, LEAVE_MS)
    return () => clearTimeout(t)
     
  }, [pathname])

  // Late-mounted content (client components) → rescan
  useEffect(() => {
    const mo = new MutationObserver(() => {
      if (!document.documentElement.classList.contains('is-tr-leaving')) scan()
    })
    mo.observe(document.body, { childList: true, subtree: true })
    return () => mo.disconnect()
     
  }, [])

  // --- Header states -------------------------------------------------------
  useEffect(() => {
    const html = document.documentElement
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      const vh = window.innerHeight
      const gw = window.innerWidth / 24
      html.classList.toggle('has-over-navi', y > 156 || window.innerWidth < 768)
      const probe = gw * 0.83
      let dark = false
      document.querySelectorAll<HTMLElement>('[data-bg="dark"]').forEach((s) => {
        const r = s.getBoundingClientRect()
        if (r.top <= probe && r.bottom >= probe) dark = true
      })
      html.classList.toggle('has-over-dark', dark)
      const hasFooter = !!document.querySelector('[data-footer]')
      html.classList.toggle(
        'has-over-footer',
        hasFooter && y >= document.documentElement.scrollHeight - vh - gw * 2 - 2,
      )
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    let lastY = window.scrollY
    const onScroll = () => {
      if (Math.abs(window.scrollY - lastY) > 20) html.classList.remove('is-menu-open')
      lastY = window.scrollY
      on()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', on)
    update()
    const iv = window.setInterval(update, 500)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', on)
      clearInterval(iv)
    }
  }, [pathname])

  return <div className="page-origin">{children}</div>
}
