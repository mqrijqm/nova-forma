'use client'

import { useRef, useState } from 'react'
import TLink from '../shell/TLink'
import Split from '../Split'
import HoverPlane, { type HoverPlaneHandle } from '../HoverPlane'
import type { Project } from '@/content/projects'
import { videoFor } from '@/content/media'
import type { Locale } from '@/lib/i18n'

export default function Featured({ items, lang }: { items: Project[]; lang: Locale }) {
  const plane = useRef<HoverPlaneHandle>(null)
  const [hover, setHover] = useState(-1)

  return (
    <div className="features" onMouseLeave={() => (plane.current?.hide(), setHover(-1))}>
      {items.map((p, i) => (
        <TLink
          key={p.slug}
          href={`/${lang}/project/${p.slug}`}
          className={`features-a flip-origin ${hover === i ? 'is-hover' : ''}`}
          data-io=""
          data-c="small"
          onMouseEnter={() => (plane.current?.show(i), setHover(i))}
        >
          <div className="features-h-wrap">
            <span className="features-num light">({String(i + 1).padStart(2, '0')})</span>
            <div className="features-h">
              <Split lines={p.title} mode="char" variant="none" io={false} className="features-t flip-f" />
              <Split lines={p.title} mode="char" variant="none" io={false} className="features-t flip-b" />
            </div>
          </div>
          <div className="rule faint">
            <div className="b" />
          </div>
        </TLink>
      ))}
      <HoverPlane ref={plane} images={items.map((p) => ({ src: p.wide, video: videoFor(p.slug, 'wide') }))} />
    </div>
  )
}
