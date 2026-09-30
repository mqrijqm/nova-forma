'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import TLink from '../shell/TLink'
import { Arrow } from '../ui'
import Media from '../Media'
import { reducedMotion } from '@/lib/store'

type Slide = { href: string; src: string; video?: string; alt: string }

const RING = 189

/** Arch-shaped auto slider (bottom-right of the home hero). */
export default function Pickup({ slides, label }: { slides: Slide[]; label: string }) {
  const [index, setIndex] = useState(0)
  const ul = useRef<HTMLDivElement>(null)
  const ring = useRef<SVGCircleElement>(null)
  const count = useRef<HTMLSpanElement>(null)
  const state = useRef({ i: 0, busy: false, tl: null as gsap.core.Timeline | null })

  const go = (next: number, manual = false) => {
    const s = state.current
    if (s.busy || !ul.current) return
    s.busy = true
    const items = ul.current.querySelectorAll<HTMLElement>('.pickup-slide')
    const prev = items[s.i]
    const now = items[next]
    const dur = manual ? 2 : 2.4
    gsap.set(now, { x: '-101%', scale: 1.8, rotate: -10, zIndex: 2, visibility: 'visible' })
    gsap.set(prev, { zIndex: 1 })
    gsap.to(prev, { x: '101%', duration: dur, ease: 'power3.inOut' })
    gsap.to(now, {
      x: '0%',
      scale: 1,
      rotate: 0,
      duration: dur,
      ease: 'power3.inOut',
      onComplete: () => {
        gsap.set(prev, { visibility: 'hidden' })
        s.busy = false
      },
    })
    gsap.to(count.current, { y: `${-1.2 * next}em`, duration: dur, ease: 'power3.inOut' })
    gsap.to(ring.current, { strokeDashoffset: -RING, duration: dur, ease: 'power3.inOut' })
    s.i = next
    setIndex(next)
  }

  useEffect(() => {
    if (reducedMotion()) return
    const s = state.current
    const loop = () => {
      s.tl?.kill()
      gsap.set(ring.current, { strokeDashoffset: RING })
      s.tl = gsap.timeline({ delay: 0.2 }).to(ring.current, {
        strokeDashoffset: 0,
        duration: 6,
        ease: 'power2.inOut',
        onComplete: () => {
          go((s.i + 1) % slides.length)
          gsap.delayedCall(2.4, loop)
        },
      })
    }
    const start = gsap.delayedCall(1.2, loop)
    return () => {
      start.kill()
      s.tl?.kill()
      gsap.killTweensOf(loop)
    }
     
  }, [slides.length])

  return (
    <div className="pickup">
      <div className="pickup-label upper fadein" data-io="">
        {label}
      </div>
      <div className="pickup-count light">
        <span>(</span>
        <span className="pickup-count-mask">
          <span ref={count} className="pickup-count-col">
            {slides.map((_, i) => (
              <span key={i}>{String(i + 1).padStart(2, '0')}</span>
            ))}
          </span>
        </span>
        <span>/{String(slides.length).padStart(2, '0')})</span>
      </div>
      <div className="pickup-ul" ref={ul}>
        {slides.map((s, i) => (
          <TLink
            key={s.href}
            href={s.href}
            className="pickup-slide"
            style={{ visibility: i === 0 ? 'visible' : 'hidden' }}
            aria-hidden={i !== index}
            tabIndex={i === index ? 0 : -1}
            data-c="small"
          >
            <Media src={s.src} alt={s.alt} sizes="(max-width: 767px) 50vw, 270px" priority={i === 0} eager />
          </TLink>
        ))}
      </div>
      <button
        className="pickup-control"
        aria-label="Next project"
        data-c="small"
        onClick={() => {
          const s = state.current
          if (s.busy) return
          s.tl?.pause()
          go((s.i + 1) % slides.length, true)
          gsap.delayedCall(2, () => {
            gsap.set(ring.current, { strokeDashoffset: RING })
            s.tl?.restart()
          })
        }}
      >
        <svg className="pickup-ring" viewBox="0 0 62 62" aria-hidden="true">
          <circle ref={ring} cx="31" cy="31" r="30" pathLength={RING} strokeDasharray={RING} strokeDashoffset={RING} />
        </svg>
        <span className="btn-arrow">
          <span className="b" />
          <Arrow />
        </span>
      </button>
    </div>
  )
}
