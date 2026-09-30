'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import gsap from 'gsap'
import Clock from '../Clock'

const STRIPS = 12

/** Xorshift128 seeded by today's date → 12 digits (0–8). */
function seedDigits(d: Date) {
  let x = d.getFullYear(), y = d.getMonth() + 1, z = d.getDate(), w = x * 10000 + y * 100 + z
  const next = () => {
    const t = x ^ (x << 11)
    x = y; y = z; z = w
    w = (w ^ (w >>> 19)) ^ (t ^ (t >>> 8))
    return w >>> 0
  }
  for (let i = 0; i < 20; i++) next()
  return Array.from({ length: STRIPS }, () => next() % 9)
}

function sarajevoDate() {
  const s = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Sarajevo' }).format(new Date())
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/**
 * Logo sliced into 12 horizontal strips; each strip is shifted by a
 * daily seed, so the mark re-forms itself every midnight.
 */
export default function GenLogo({ label, lead }: { label: string; lead: string }) {
  const [digits, setDigits] = useState<number[]>(() => Array(STRIPS).fill(0))
  const root = useRef<HTMLDivElement>(null)
  const shown = useRef(false)

  useEffect(() => {
    const apply = (ds: number[], intro: boolean) => {
      setDigits(ds)
      const strips = root.current?.querySelectorAll<HTMLElement>('.gl-strip-in')
      strips?.forEach((el, i) => {
        const x = -(ds[i] / 9) * 100
        if (intro) {
          gsap.fromTo(
            el,
            { xPercent: x + (i % 2 ? 100 : -100) / 2 },
            { xPercent: x / 2, duration: 1, delay: i * 0.06, ease: 'expo.out' },
          )
        } else gsap.to(el, { xPercent: x / 2, duration: 2, ease: 'power3.inOut', delay: i * 0.04 })
      })
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !shown.current) {
        shown.current = true
        apply(seedDigits(sarajevoDate()), true)
      }
    })
    if (root.current) io.observe(root.current)
    let day = sarajevoDate().getDate()
    const iv = setInterval(() => {
      const d = sarajevoDate()
      if (d.getDate() !== day) {
        day = d.getDate()
        apply(seedDigits(d), false)
      }
    }, 1000)
    return () => {
      io.disconnect()
      clearInterval(iv)
    }
  }, [])

  const mark = (
    <span className="gl-mark" aria-hidden="true">
      <span>NOVA</span>
      <span>FORMA</span>
    </span>
  )

  return (
    <div className="thin section-logo" ref={root}>
      <div className="gl" role="img" aria-label="Nova Forma logo">
        {Array.from({ length: STRIPS }, (_, i) => (
          <div key={i} className="gl-strip" style={{ '--i': i } as CSSProperties}>
            <div className="gl-strip-in">
              {mark}
              {mark}
            </div>
          </div>
        ))}
        <div className="gl-code f-xxs light">
          {digits.map((d, i) => (
            <span key={i} className="gl-digit">
              <span className="gl-digit-col" style={{ transform: `translateY(${-d * 10}%)` }}>
                {Array.from({ length: 10 }, (_, k) => (
                  <span key={k}>{k}</span>
                ))}
              </span>
            </span>
          ))}
        </div>
      </div>
      <div className="gl-foot">
        <span />
        <span className="f-xs fadein" data-io="">
          <Clock label={label} countdown />
        </span>
        <p className="lead-box gl-lead fadein" data-io="">
          <span className="indent" />
          {lead}
        </p>
      </div>
    </div>
  )
}
