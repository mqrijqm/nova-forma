'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { runtime } from '@/lib/store'

/** Link that plays the leave transition before navigating. */
export default function TLink({ href, onClick, ...rest }: ComponentProps<typeof Link> & { href: string }) {
  return (
    <Link
      href={href}
      scroll={false}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        if (href.startsWith('http') || href.startsWith('mailto:')) return
        e.preventDefault()
        runtime.navigate(href)
      }}
      {...rest}
    />
  )
}
