import type { CSSProperties, ElementType, ReactNode } from 'react'

type Line = string | { text: string; className?: string }

type Props = {
  /** Lines authored by hand. A string with `\n` is split into lines. */
  lines: Line[] | string
  /** `char` → each letter gets its own mask (used by flip-c titles). */
  mode?: 'char' | 'word'
  /** Reveal variant: flip-c | flip-y | clip | none */
  variant?: 'flip-c' | 'flip-y' | 'clip' | 'none'
  as?: ElementType
  className?: string
  style?: CSSProperties
  /** Adds odd/even classes to lines (serif/sans alternation on titles). */
  alternate?: boolean
  /** Observe with IntersectionObserver (sets data-shown). */
  io?: boolean
  /** Extra delay before the stagger starts (seconds). */
  delay?: number
  children?: ReactNode
}

/**
 * Words wrapped in *asterisks* render in the serif face,
 * e.g. "GET *IN* TOUCH".
 */
export default function Split({
  lines,
  mode = 'word',
  variant = 'flip-y',
  as: Tag = 'div',
  className = '',
  style,
  alternate = false,
  io = true,
  delay,
  children,
}: Props) {
  const list: Line[] = typeof lines === 'string' ? lines.split('\n') : lines
  let d = 0

  const content = list.map((line, li) => {
    const text = typeof line === 'string' ? line : line.text
    const lcls = typeof line === 'string' ? '' : line.className ?? ''
    const words = text.split(' ').filter(Boolean)
    const alt = alternate ? (li % 2 === 0 ? ' odd' : ' even') : ''
    const last = li === list.length - 1 ? ' last' : ''
    return (
      <span key={li} className={`l${alt}${last} ${lcls}`} style={{ '--y': li } as CSSProperties}>
        {words.map((raw, wi) => {
          const serif = raw.startsWith('*') && raw.endsWith('*')
          const word = serif ? raw.slice(1, -1) : raw
          const wcls = `w${serif ? ' serif' : ''}`
          const node =
            mode === 'char' ? (
              <span key={wi} className={wcls} data-w={word}>
                {[...word].map((c, ci) => (
                  <span key={ci} className="o c" style={{ '--d': d++ } as CSSProperties}>
                    <span className="t">{c}</span>
                  </span>
                ))}
              </span>
            ) : (
              <span key={wi} className={wcls} data-w={word}>
                <span className="o" style={{ '--d': d++ } as CSSProperties}>
                  <span className="t">{word}</span>
                </span>
              </span>
            )
          return wi === 0 ? node : [<span key={`s${wi}`} className="s"> </span>, node]
        })}
      </span>
    )
  })

  return (
    <Tag
      className={`${variant === 'none' ? '' : variant} ${className}`}
      style={delay ? ({ ...style, '--d0': `${delay}s` } as CSSProperties) : style}
      data-io={io ? '' : undefined}
      aria-label={list.map((l) => (typeof l === 'string' ? l : l.text)).join(' ').replace(/\*/g, '')}
    >
      <span aria-hidden="true" style={{ display: 'contents' }}>
        {content}
      </span>
      {children}
    </Tag>
  )
}
