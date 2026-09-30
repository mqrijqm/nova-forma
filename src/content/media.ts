/** Looping clips rendered from the stills (see scripts/make-loops). */
const loops: Record<string, { portrait?: boolean; wide?: boolean }> = {
  'salt-and-silence': { portrait: true, wide: true },
  'level-of-light': { portrait: true, wide: true },
  'aura-noir': { portrait: true, wide: true },
  'atelier-vedra': { portrait: true, wide: true },
  'pulse-link': { portrait: true, wide: true },
}

export function videoFor(slug: string, kind: 'portrait' | 'wide') {
  return loops[slug]?.[kind] ? `/media/loop-${slug}-${kind}.mp4` : undefined
}

/** Dedicated hover visuals for the home featured list. */
export function hoverFor(slug: string) {
  return { src: `/media/h-${slug}.webp`, video: `/media/loop-hover-${slug}.mp4` }
}
