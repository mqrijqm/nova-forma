'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reducedMotion } from '@/lib/store'

gsap.registerPlugin(ScrollTrigger)

/**
 * Light-control system diagram (Galerija Ars) — metaball blobs (gooey SVG filter)
 * joined by necks, with arc labels. Arcs draw in on enter, blobs breathe.
 */
const L = {
  en: {
    arcL: 'DAYLIGHT / PRESENCE / DOORS', arcR: 'TRACK / SPOT / WALLWASH', top: 'SCENES',
    gl1: 'DAYLIGHT', gl2: 'CURVE', dr1: 'LUX', dr2: 'LIMITS', bl: 'SENSORS', br: 'LUMINAIRES', bottom: '20 — 150 LUX',
    in1: 'SENSOR', in2: 'NETWORK', hub: 'LIGHT CONTROL HUB', out1: '84 SPOT', out2: 'LIGHTS', aria: 'Galerija Ars light control diagram',
  },
  bs: {
    arcL: 'DNEVNO SVJETLO / PRISUSTVO / VRATA', arcR: 'ŠINA / REFLEKTOR / ZIDNO', top: 'SCENE',
    gl1: 'KRIVULJA', gl2: 'DANA', dr1: 'GRANICE', dr2: 'LUKSA', bl: 'SENZORI', br: 'SVJETILJKE', bottom: '20 — 150 LUKSA',
    in1: 'MREŽA', in2: 'SENZORA', hub: 'HUB ZA SVJETLO', out1: '84', out2: 'REFLEKTORA', aria: 'Dijagram upravljanja svjetlom, Galerija Ars',
  },
}

export default function LightDiagram({ lang }: { lang: 'en' | 'bs' }) {
  const t = L[lang]
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = ref.current
    if (!svg || reducedMotion()) return
    const ctx = gsap.context(() => {
      const breathe = () => {
        gsap.to('.pd-hub', { scale: 1.035, transformOrigin: '600px 300px', duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 })
        gsap.to('.pd-side', { scale: 0.95, transformOrigin: 'center', duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 1 })
        gsap.to('.pd-neck', { scaleY: 0.8, transformOrigin: 'center', duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      }
      gsap
        .timeline({ scrollTrigger: { trigger: svg, start: 'top 75%' }, onComplete: breathe })
        .from('.pd-blob', { scale: 0, transformOrigin: 'center', duration: 1.4, ease: 'expo.out', stagger: 0.12 })
        .from('.pd-neck', { scaleY: 0, transformOrigin: 'center', duration: 1, ease: 'expo.out' }, 0.4)
        .fromTo('.pd-arc', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power3.inOut', stagger: 0.1 }, 0.3)
        .from('.pd-label', { opacity: 0, y: 12, duration: 0.8, ease: 'power3.out', stagger: 0.05 }, 0.8)
    }, svg)
    return () => ctx.revert()
  }, [])

  const arc = (cx: number, cy: number, r: number, a0: number, a1: number) => {
    const p = (a: number) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)]
    const [x0, y0] = p(a0)
    const [x1, y1] = p(a1)
    const large = Math.abs(a1 - a0) > 180 ? 1 : 0
    return `M${x0} ${y0} A${r} ${r} 0 ${large} 1 ${x1} ${y1}`
  }

  return (
    <div className="thin pd-wrap">
      <svg ref={ref} viewBox="0 0 1200 620" className="pd-svg" role="img" aria-label={t.aria}>
        <defs>
          <linearGradient id="pd-g" gradientUnits="userSpaceOnUse" x1="40" x2="1160" y1="0" y2="0">
            <stop offset="0" stopColor="#e2c192" />
            <stop offset="0.24" stopColor="#c48a4a" />
            <stop offset="0.4" stopColor="#6e421f" />
            <stop offset="0.6" stopColor="#6e421f" />
            <stop offset="0.76" stopColor="#c48a4a" />
            <stop offset="1" stopColor="#e2c192" />
          </linearGradient>
          <filter id="pd-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -12" />
          </filter>
          <path id="pd-t-l" d={arc(150, 300, 118, 200, 340)} />
          <path id="pd-t-r" d={arc(1050, 300, 118, 200, 340)} />
        </defs>

        <g filter="url(#pd-goo)" fill="url(#pd-g)">
          <circle className="pd-blob pd-side" cx="150" cy="300" r="92" />
          <rect className="pd-neck" x="220" y="268" width="170" height="64" rx="32" />
          <g className="pd-hub">
            <ellipse className="pd-blob" cx="600" cy="300" rx="230" ry="175" />
          </g>
          <rect className="pd-neck" x="810" y="268" width="170" height="64" rx="32" />
          <circle className="pd-blob pd-side" cx="1050" cy="300" r="92" />
        </g>

        <g fill="none" stroke="currentColor" strokeWidth="1.2">
          <path className="pd-arc" pathLength={1} strokeDasharray="1" d={arc(150, 300, 128, 100, 255)} />
          <path className="pd-arc" pathLength={1} strokeDasharray="1" d={arc(150, 300, 128, 285, 440)} />
          <path className="pd-arc" pathLength={1} strokeDasharray="1" d={arc(600, 300, 222, 185, 255)} />
          <path className="pd-arc" pathLength={1} strokeDasharray="1" d={arc(600, 300, 222, 285, 355)} />
          <path className="pd-arc" pathLength={1} strokeDasharray="1" d={arc(600, 300, 250, 55, 125)} />
          <path className="pd-arc" pathLength={1} strokeDasharray="1" d={arc(1050, 300, 128, 100, 255)} />
          <path className="pd-arc" pathLength={1} strokeDasharray="1" d={arc(1050, 300, 128, 285, 440)} />
        </g>

        <g className="pd-text" fill="currentColor">
          <text className="pd-label pd-s">
            <textPath href="#pd-t-l" startOffset="50%" textAnchor="middle">{t.arcL}</textPath>
          </text>
          <text className="pd-label pd-s">
            <textPath href="#pd-t-r" startOffset="50%" textAnchor="middle">{t.arcR}</textPath>
          </text>
          <text className="pd-label pd-m" x="600" y="70" textAnchor="middle">{t.top}</text>
          <text className="pd-label pd-m" x="370" y="420" textAnchor="end">{t.gl1}</text>
          <text className="pd-label pd-m" x="370" y="446" textAnchor="end">{t.gl2}</text>
          <text className="pd-label pd-m" x="830" y="420">{t.dr1}</text>
          <text className="pd-label pd-m" x="830" y="446">{t.dr2}</text>
          <text className="pd-label pd-b" x="150" y="480" textAnchor="middle">{t.bl}</text>
          <text className="pd-label pd-b" x="1050" y="480" textAnchor="middle">{t.br}</text>
          <text className="pd-label pd-b" x="600" y="600" textAnchor="middle">{t.bottom}</text>
        </g>
        <g className="pd-inner" fill="#f0f0f0" textAnchor="middle">
          <text className="pd-label pd-s" x="150" y="290">{t.in1}</text>
          <text className="pd-label pd-s" x="150" y="312">{t.in2}</text>
          <text className="pd-label pd-hubt" x="600" y="309">{t.hub}</text>
          <text className="pd-label pd-sb" x="305" y="305">DALI</text>
          <text className="pd-label pd-sb" x="895" y="305">DALI</text>
          <text className="pd-label pd-s" x="1050" y="290">{t.out1}</text>
          <text className="pd-label pd-s" x="1050" y="312">{t.out2}</text>
        </g>
      </svg>
    </div>
  )
}
