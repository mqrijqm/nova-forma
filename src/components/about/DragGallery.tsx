'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Horizontal drag slider (50vh slides). Drag 1:1 with clamp,
 * smoothed with lerp .1; each image drifts inside its frame.
 */
export default function DragGallery({ items, label }: { items: { src: string; caption: string }[]; label: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrap.current!
    const tr = track.current!
    const s = { x: 0, target: 0, down: false, startX: 0, start: 0, min: 0 }
    const measure = () => {
      s.min = Math.min(0, el.clientWidth - tr.scrollWidth)
    }
    measure()
    const down = (e: PointerEvent) => {
      s.down = true
      s.startX = e.clientX
      s.start = s.target
      el.setPointerCapture(e.pointerId)
    }
    const move = (e: PointerEvent) => {
      if (!s.down) return
      s.target = Math.max(s.min, Math.min(0, s.start + (e.clientX - s.startX)))
    }
    const up = () => (s.down = false)
    const tick = () => {
      s.x += (s.target - s.x) * 0.1
      tr.style.transform = `translate3d(${s.x}px,0,0)`
      const vw = window.innerWidth
      tr.querySelectorAll<HTMLElement>('.dg-slide').forEach((sl) => {
        const r = sl.getBoundingClientRect()
        const c = r.left + r.width / 2
        const inner = sl.querySelector<HTMLElement>('.dg-in')
        if (inner) inner.style.transform = `translate3d(${((vw / 2 - c) / vw) * 0.2 * r.width}px,0,0)`
      })
    }
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    window.addEventListener('resize', measure)
    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <div className="dg" ref={wrap} data-c={`label:${label}`}>
      <div className="dg-track" ref={track}>
        {items.map((it) => (
          <figure key={it.src} className="dg-slide">
            <div className="dg-frame bg-img" data-io="">
              <div className="dg-in">
                <Image src={it.src} alt={it.caption} fill sizes="60vw" className="media" draggable={false} />
              </div>
            </div>
            <figcaption className="f-xxxs upper">{it.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
