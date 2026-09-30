import type { CSSProperties, ReactNode } from 'react'
import Split from './Split'

export function Spacer({ n, className = '' }: { n: number; className?: string }) {
  return <div className={`spr ${className}`} style={{ height: `calc(var(--gw) * ${n})` }} />
}

export function Border({
  className = '',
  left,
  right,
}: {
  className?: string
  left?: ReactNode
  right?: ReactNode
}) {
  return (
    <div className={`rule ${className}`} data-io="">
      <div className="b" />
      {left != null && (
        <span className="num" style={{ left: 0 }}>
          {left}
        </span>
      )}
      {right != null && (
        <span className="num" style={{ right: 0 }}>
          {right}
        </span>
      )}
    </div>
  )
}

export function Arrow({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={style} aria-hidden="true">
      <path d="M3 12h17.5M14 5.5l6.5 6.5-6.5 6.5" />
    </svg>
  )
}

export function Star() {
  return <span aria-hidden="true">*</span>
}

/** Section headline row (2gw tall) + optional divider under it. */
export function Headline({ text, className = '' }: { text: string; className?: string }) {
  return <Split lines={text} className={`headline ${className}`} variant="flip-y" />
}

/** Underlined text link (13px, light). */
export function ULink({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`link-u ${className}`}>
      {children}
      <span className="u" />
    </span>
  )
}

/** Two-row marquee: serif row ← / light sans row →. */
export function Marquee({ a, b }: { a: string[]; b: string[] }) {
  const row = (words: string[], cls: string, back: boolean) => (
    <div className={`mq ${back ? 'back' : ''}`} data-io="" data-vis="">
      <div className="mq-anim">
        <div className={`mq-track ${cls}`}>
          {[0, 1].map((k) => (
            <div className="mq-li" key={k} aria-hidden={k === 1}>
              {[...words, ...words].map((w, i) => (
                <span key={i}>{w}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
  return (
    <div>
      {row(a, 'mq-g', false)}
      {row(b, 'mq-e', true)}
    </div>
  )
}
