'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Media from './Media'
import { reducedMotion } from '@/lib/store'

gsap.registerPlugin(ScrollTrigger)

/**
 * Full-bleed media with reveal (scale 1.4→1.2, fade) and scroll parallax.
 * `speed` ≈ locomotive data-scroll-speed (negative = slower than page).
 */
export default function ParallaxMedia({
  src,
  video,
  alt,
  ratio,
  speed = -2,
  priority = false,
}: {
  src: string
  video?: string
  alt: string
  ratio?: number
  speed?: number
  priority?: boolean
}) {
  const box = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion() || !box.current) return
    const amt = speed * 5
    const tw = gsap.fromTo(
      inner.current,
      { yPercent: -amt },
      {
        yPercent: amt,
        ease: 'none',
        scrollTrigger: { trigger: box.current, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    )
    return () => {
      tw.scrollTrigger?.kill()
      tw.kill()
    }
  }, [speed])

  return (
    <div
      ref={box}
      className="bg-img is-parallax"
      data-io=""
      style={ratio ? { aspectRatio: `${ratio}` } : undefined}
    >
      <div ref={inner} className="pm-inner">
        <Media src={src} video={video} alt={alt} priority={priority} />
      </div>
    </div>
  )
}
