'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

/**
 * Image with an optional looping video on top (muted, inline).
 * The video only plays while on screen.
 */
export default function Media({
  src,
  video,
  alt,
  sizes = '100vw',
  priority = false,
  className = 'media',
}: {
  src: string
  video?: string
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
}) {
  const vref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = vref.current
    if (!v) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {})
      else v.pause()
    })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} />
      {video && (
        <video
          ref={vref}
          className={`${className} media-video`}
          src={video}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
      )}
    </>
  )
}
