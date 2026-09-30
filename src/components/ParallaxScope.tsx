'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reducedMotion, isTouch } from '@/lib/store'

gsap.registerPlugin(ScrollTrigger)

/**
 * Applies scroll parallax to every descendant with data-speed
 * (≈ locomotive data-scroll-speed: + moves faster, − slower).
 */
export default function ParallaxScope({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current || reducedMotion() || isTouch()) return
    const ctx = gsap.context(() => {
      ref.current!.querySelectorAll<HTMLElement>('[data-speed]').forEach((el) => {
        const s = parseFloat(el.dataset.speed || '0')
        const d = (window.innerHeight / 15) * s
        gsap.fromTo(
          el,
          { y: d },
          { y: -d, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
