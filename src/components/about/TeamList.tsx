'use client'

import { useRef, useState } from 'react'
import HoverPlane, { type HoverPlaneHandle } from '../HoverPlane'
import { ULink } from '../ui'
import type { Member } from '@/content/team'
import type { Locale } from '@/lib/i18n'
import type { Dict } from '@/content/dict'

export default function TeamList({ team, lang, t }: { team: Member[]; lang: Locale; t: Dict }) {
  const plane = useRef<HoverPlaneHandle>(null)
  const [open, setOpen] = useState<Record<number, boolean>>({})
  const withImg = team.filter((m) => m.img)

  return (
    <div className="team" onMouseLeave={() => plane.current?.hide()}>
      {team.map((m, i) => {
        const imgIndex = withImg.indexOf(m)
        const isOpen = !m.collaborator || open[i]
        return (
          <div
            key={m.name}
            className={`team-li ${m.collaborator ? 'toggle' : ''} ${isOpen ? 'is-open' : ''}`}
            data-io=""
            onMouseEnter={() => (imgIndex >= 0 ? plane.current?.show(imgIndex) : plane.current?.hide())}
          >
            <div className="team-name clip">
              <span className="o">
                <span className="t">{m.name}</span>
              </span>
              {m.collaborator && <span className="team-collab f-xxs upper light">{t.about.collaborator}</span>}
            </div>
            <div className="team-body">
              <div className="team-role upper">
                {m.role[lang]}
                {m.collaborator && (
                  <button
                    className="pill team-toggle"
                    data-c="small"
                    onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
                    aria-expanded={isOpen}
                  >
                    <span className="pt">{isOpen ? t.about.close : t.about.open}</span>
                  </button>
                )}
              </div>
              <div className="team-bio-wrap">
                <div className="team-bio editor">
                  <p>{m.bio[lang]}</p>
                  {m.link && (
                    <a href={m.link} target="_blank" rel="noreferrer" data-c="small">
                      <ULink>→ Website</ULink>
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="rule sub">
              <div className="b" />
            </div>
          </div>
        )
      })}
      <HoverPlane ref={plane} images={withImg.map((m) => ({ src: m.img! }))} width={7} ratio={4 / 3} />
    </div>
  )
}
