'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { runtime } from '@/lib/store'

/**
 * Red disc cursor. Elements opt-in via data-c:
 *   data-c="small"        → 6px dot (links, buttons)
 *   data-c="label:DRAG"   → 120px disc with a label
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    const html = document.documentElement
    const pos = { x: -100, y: -100 }
    let activated = false
    let current = ''

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return
      runtime.mouse.x = e.clientX
      runtime.mouse.y = e.clientY
      if (!activated) {
        activated = true
        html.classList.add('has-mouse')
        pos.x = e.clientX
        pos.y = e.clientY
        setTimeout(() => html.classList.add('is-mouse-active'), 600)
      }
    }
    const over = (e: Event) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-c]')
      const c = el?.dataset.c ?? ''
      if (c === current) return
      current = c
      if (!c) {
        html.removeAttribute('data-cursor')
      } else if (c.startsWith('label:')) {
        html.dataset.cursor = 'label'
        setLabel(c.slice(6))
      } else {
        html.dataset.cursor = c
      }
    }
    const down = () => html.classList.add('is-dragging')
    const up = () => html.classList.remove('is-dragging')
    const leave = () => html.classList.remove('is-mouse-active')
    const enter = () => activated && html.classList.add('is-mouse-active')

    const tick = () => {
      pos.x += (runtime.mouse.x - pos.x) * 0.15
      pos.y += (runtime.mouse.y - pos.y) * 0.15
      if (ref.current) ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
    }
    gsap.ticker.add(tick)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)
    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
    }
  }, [])

  return (
    <div className="ui-cursor" ref={ref} aria-hidden="true">
      <div className="ui-cursor-body">
        <div className="ui-cursor-bg" />
        <div className="ui-cursor-text">
          <span className="t">{label}</span>
        </div>
      </div>
    </div>
  )
}
