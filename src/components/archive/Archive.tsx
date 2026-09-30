'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import gsap from 'gsap'
import Split from '../Split'
import { Arrow } from '../ui'
import { runtime, isTouch, reducedMotion } from '@/lib/store'
import type { Project } from '@/content/projects'
import type { Locale } from '@/lib/i18n'
import type { Dict } from '@/content/dict'

const TILT = 15

/**
 * Infinite, tilted, draggable strip of project cards.
 * Wheel & drag drive a target offset; the strip eases towards it
 * (ease .125 on Windows/touch, .05 elsewhere) — see SPEC §5.
 */
export default function Archive({ items, lang, t }: { items: Project[]; lang: Locale; t: Dict }) {
  const strip = useRef<HTMLDivElement>(null)
  const root = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLAnchorElement | null)[]>([])
  const map = useRef<(HTMLSpanElement | null)[]>([])
  const pivot = useRef<HTMLSpanElement>(null)
  const counter = useRef<HTMLSpanElement>(null)
  const [hover, setHover] = useState(-1)
  const drag = useRef({ down: false, moved: false, startX: 0, startDelta: 0, t0: 0, hist: [] as number[] })

  useEffect(() => {
    const html = document.documentElement
    html.dataset.pageTheme = 'dark'
    html.classList.add('is-locked')
    runtime.lenis?.stop()

    const n = items.length
    const isWin = navigator.userAgent.includes('Windows')
    const ease = isWin || isTouch() ? 0.125 : 0.05
    const s = { x: 0, delta: 0, W: 0, total: 0 }

    const measure = () => {
      s.W = (window.innerWidth / 24) * 6.8
      s.total = s.W * n
    }
    measure()
    // start with the first card slightly left of center
    s.delta = s.x = -s.W * 1.5

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      s.delta -= (d / 100) * (isWin ? 120 : 100)
      html.classList.add('is-project-scrolling')
      clearTimeout((onWheel as unknown as { t: number }).t)
      ;(onWheel as unknown as { t: number }).t = window.setTimeout(
        () => html.classList.remove('is-project-scrolling'),
        200,
      )
    }

    const onDown = (e: PointerEvent) => {
      const d = drag.current
      d.down = true
      d.moved = false
      d.startX = e.clientX
      d.startDelta = s.delta
      d.t0 = performance.now()
      d.hist = [e.clientX]
      gsap.killTweensOf(s)
    }
    const onMove = (e: PointerEvent) => {
      const d = drag.current
      if (!d.down) return
      const dx = e.clientX - d.startX
      if (Math.abs(dx) > 4) d.moved = true
      s.delta = d.startDelta + dx * 2
      d.hist.push(e.clientX)
      if (d.hist.length > 4) d.hist.shift()
    }
    const onUp = () => {
      const d = drag.current
      if (!d.down) return
      d.down = false
      const v = d.hist.length > 1 ? d.hist[d.hist.length - 1] - d.hist[0] : 0
      const pow = Math.min(Math.abs(v) / 10, 4)
      if (pow > 0.2) gsap.to(s, { delta: s.delta + 0.2 * window.innerWidth * pow * Math.sign(v), duration: 1, ease: 'power2.out' })
    }

    const wrap = (v: number) => {
      const h = s.total / 2
      return ((((v + h) % s.total) + s.total) % s.total) - h
    }

    const tick = () => {
      s.x += (s.delta - s.x) * ease
      const vw = window.innerWidth
      const half = vw / 2
      cards.current.forEach((el, i) => {
        if (!el) return
        const pos = wrap(i * s.W + s.x)
        const offset = (pos + s.W * 0.25) / half
        const sc = 1 - Math.abs(0.1 * offset)
        el.style.transform = `translate3d(${pos}px,0,0) scale(${Math.max(0.6, sc)})`
        el.style.setProperty('--off', `${Math.max(-1.5, Math.min(1.5, offset)) * -7}%`)
        const on = Math.abs(pos) < half + s.W
        const m = map.current[i]
        if (m) m.dataset.on = on ? '1' : '0'
      })
      // progress 00–99
      const prog = ((((-s.x / s.total) % 1) + 1) % 1)
      if (counter.current) counter.current.textContent = String(Math.floor(prog * 100)).padStart(2, '0')
      if (pivot.current) pivot.current.style.transform = `translateX(${prog * n * 16}px)`
    }

    const intro = () => {
      if (reducedMotion()) return
      const visible = cards.current
        .map((el, i) => ({ el, pos: wrap(i * s.W + s.x) }))
        .filter((c) => Math.abs(c.pos) < window.innerWidth)
        .sort((a, b) => a.pos - b.pos)
      visible.forEach(({ el }, k) => {
        if (!el) return
        const clip = el.querySelector('.slide-img')
        const img = el.querySelector('.slide-img-in')
        gsap.fromTo(clip, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, delay: 0.35 + k * 0.1, ease: 'power2.out' })
        gsap.fromTo(img, { scale: 1.6 }, { scale: 1.2, duration: 2, delay: 0.35 + k * 0.1, ease: 'power2.out' })
      })
    }

    gsap.ticker.add(tick)
    intro()
    const el = root.current!
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('resize', measure)
    return () => {
      gsap.ticker.remove(tick)
      gsap.killTweensOf(s)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('resize', measure)
      delete html.dataset.pageTheme
      html.classList.remove('is-locked', 'is-project-scrolling')
    }
  }, [items.length])

  return (
    <div className="archive" ref={root} data-c={`label:${t.cursor.drag}`}>
      <div className="slide-scroll" style={{ '--tilt': `${TILT}deg` } as CSSProperties}>
        <div className="slide-strip" ref={strip}>
          {items.map((p, i) => (
            <a
              key={p.slug}
              ref={(n) => void (cards.current[i] = n)}
              href={`/${lang}/project/${p.slug}`}
              className={`slide-a ${i % 2 ? 'odd' : 'even'} ${hover === i ? 'is-hover' : ''}`}
              data-c="small"
              draggable={false}
              onMouseEnter={() => !drag.current.down && setHover(i)}
              onMouseLeave={() => setHover(-1)}
              onClick={(e) => {
                e.preventDefault()
                if (drag.current.moved || performance.now() - drag.current.t0 > 400) return
                runtime.navigate(`/${lang}/project/${p.slug}`)
              }}
            >
              <div className="slide-img">
                <div className="slide-img-in">
                  <Image src={p.cover} alt={p.title.join(' ')} fill sizes="(max-width: 768px) 50vw, 25vw" draggable={false} />
                </div>
              </div>
              <div className="slide-parts slide-year f-xxxs">
                <span className="t">{p.year}</span>
              </div>
              <div className="slide-parts slide-name f-xxxs upper">
                <span className="t">
                  ({String(i + 1).padStart(2, '0')}) {p.title.join(' ')}
                </span>
              </div>
              <span className="slide-arrow btn-arrow inv">
                <span className="b" />
                <Arrow />
              </span>
              <div className={`slide-title flip-origin ${hover === i ? 'is-hover' : ''}`} data-shown="1">
                <Split lines={p.title} mode="char" variant="none" io={false} alternate className="flip-b slide-title-t" />
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="archive-parts archive-top f-s light">
        (<span ref={counter}>00</span>)
      </div>
      <div className="archive-parts archive-drag f-xs upper light">{isTouchLabel(t)}</div>
      <div className="archive-map">
        {items.map((p, i) => (
          <span key={p.slug} ref={(n) => void (map.current[i] = n)} className={`map-r ${hover === i ? 'is-hover' : ''}`} />
        ))}
        <span className="map-pivot" ref={pivot} />
      </div>
    </div>
  )
}

function isTouchLabel(t: Dict) {
  return t.archive.drag
}
