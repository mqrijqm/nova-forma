'use client'

import Image from 'next/image'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import gsap from 'gsap'
import { runtime } from '@/lib/store'

export type HoverPlaneHandle = { show: (i: number) => void; hide: () => void }

/**
 * Cursor-following image plane (the original draws this in WebGL/OGL).
 * Center follows the mouse with lerp .1; inside, the image drifts with the
 * mouse delta (parallax). Enter: scale 1.6→1.2 + clip reveal bottom→top.
 * Leave: scale →.9 + clip wipes out towards the top.
 */
const HoverPlane = forwardRef<HoverPlaneHandle, { images: { src: string; video?: string }[]; width?: number; ratio?: number }>(
  function HoverPlane({ images, width = 8, ratio = 2 / 3 }, ref) {
    const plane = useRef<HTMLDivElement>(null)
    const layers = useRef<(HTMLDivElement | null)[]>([])
    const active = useRef(-1)

    useImperativeHandle(ref, () => ({
      show(i) {
        if (i === active.current) return
        this.hide()
        active.current = i
        const el = layers.current[i]
        if (!el) return
        const inner = el.firstElementChild as HTMLElement
        gsap.killTweensOf([el, inner])
        gsap.set(el, { clipPath: 'inset(100% 0% 0% 0%)', visibility: 'visible', zIndex: 2 })
        gsap.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power2.out' })
        gsap.fromTo(inner, { scale: 1.6 }, { scale: 1.2, duration: 1.6, ease: 'power2.out' })
        el.querySelector('video')?.play().catch(() => {})
      },
      hide() {
        const i = active.current
        active.current = -1
        const el = layers.current[i]
        if (!el) return
        const inner = el.firstElementChild as HTMLElement
        gsap.killTweensOf([el, inner])
        gsap.set(el, { zIndex: 1 })
        gsap.to(inner, { scale: 0.9, duration: 1, ease: 'power2.out' })
        gsap.to(el, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 1,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(el, { visibility: 'hidden' })
            el.querySelector('video')?.pause()
          },
        })
      },
    }))

    useEffect(() => {
      const p = { x: runtime.mouse.x, y: runtime.mouse.y }
      const tick = () => {
        const el = plane.current
        if (!el) return
        const dx = runtime.mouse.x - p.x
        const dy = runtime.mouse.y - p.y
        p.x += dx * 0.1
        p.y += dy * 0.1
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`
        const w = el.offsetWidth || 1
        const h = el.offsetHeight || 1
        el.style.setProperty('--px', `${(-dx / w) * 0.5 * 100 * 0.15}%`)
        el.style.setProperty('--py', `${(-dy / h) * 0.5 * 100 * 0.15}%`)
      }
      gsap.ticker.add(tick)
      return () => gsap.ticker.remove(tick)
    }, [])

    return (
      <div
        ref={plane}
        className="hover-plane"
        style={{ width: `calc(var(--gw) * ${width})`, height: `calc(var(--gw) * ${width * ratio})` }}
        aria-hidden="true"
      >
        {images.map((im, i) => (
          <div key={i} className="hp-layer" ref={(n) => void (layers.current[i] = n)}>
            <div className="hp-inner">
              <Image src={im.src} alt="" fill sizes="480px" />
              {im.video && <video src={im.video} muted loop playsInline preload="none" />}
            </div>
          </div>
        ))}
      </div>
    )
  },
)

export default HoverPlane
