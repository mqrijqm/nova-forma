import type Lenis from 'lenis'

/** Tiny shared runtime state for client modules (no framework needed). */
export const runtime: {
  lenis: Lenis | null
  navigate: (href: string) => void
  mouse: { x: number; y: number }
} = {
  lenis: null,
  navigate: () => {},
  mouse: { x: -999, y: -999 },
}

/**
 * True only for touch-only devices (phones/tablets). Touchscreen laptops
 * also have a trackpad/mouse, so they report any-hover: hover.
 */
export const isTouch = () =>
  typeof window !== 'undefined' && !window.matchMedia('(any-hover: hover)').matches

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
