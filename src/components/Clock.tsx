'use client'

import { useEffect, useState } from 'react'

const TZ = 'Europe/Sarajevo'

function parts(d: Date) {
  const f = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
  return f.format(d).split(':')
}

/** Seconds until midnight in Sarajevo. */
function untilMidnight(d: Date) {
  const [h, m, s] = parts(d).map(Number)
  return 86400 - (h * 3600 + m * 60 + s)
}

function Digits({ v }: { v: string[] }) {
  return (
    <span className="clock-d">
      {v.map((g, i) => (
        <span key={i} style={{ display: 'inline-flex' }}>
          {i > 0 && <span className="clock-colon">:</span>}
          <span className="clock-g">{g}</span>
        </span>
      ))}
    </span>
  )
}

export default function Clock({ label, countdown = false }: { label: string; countdown?: boolean }) {
  const [v, setV] = useState(['00', '00', '00'])
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      if (countdown) {
        const r = untilMidnight(now)
        const p = (n: number) => String(n).padStart(2, '0')
        setV([p(Math.floor(r / 3600)), p(Math.floor((r % 3600) / 60)), p(r % 60)])
      } else setV(parts(now))
    }
    tick()
    const iv = setInterval(tick, 1000)
    return () => clearInterval(iv)
  }, [countdown])
  return (
    <span className="clock upper">
      <span className="clock-l">{label}</span>
      <Digits v={v} />
    </span>
  )
}
