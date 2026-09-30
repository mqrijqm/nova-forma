# Nova Forma — studio site (use case: theshift.tokyo)

Multipage creative-studio site rebuilt from the UX of theshift.tokyo.
Next.js 16 (App Router) · Tailwind 4 · GSAP + ScrollTrigger · Lenis. EN / BS.

## Run
```
pnpm install
pnpm dev        # http://localhost:3000/en
```

## Pages
| Route | What it shows |
|---|---|
| `/[lang]` | Hero title (serif/sans/serif) + arch auto-slider, statement, featured list with cursor-following hover media, marquee footer |
| `/[lang]/project` | Tilted infinite drag/wheel strip, hover title flip, minimap |
| `/[lang]/project/[slug]` | Title, parallax hero video + statement, info, marquee, credits, next-project footer |
| `/[lang]/research` | Multi-speed parallax collages with giant titles |
| `/[lang]/about` | Concept, daily generative logo, team with hover portraits, drag gallery, join, profile |

## Reuse
- Copy lives in `src/content/` (`dict.ts` UI strings, `projects.ts`, `research.ts`, `team.ts`).
- Motion system (split text + reveals) = `src/components/Split.tsx` + the "Split text" section of `globals.css`.
- Grid unit `--gw` = 1/24 of the viewport; colors `--paper / --ink / --accent`.
- Fonts: Zolina Light (display) + Hanken Grotesk (UI), in `src/fonts`.

## Media
Images were generated with Codex (`gpt-6-sol`); prompts in `_gen/batch*.txt` (git-ignored).
- `python scripts/optimize.py` → PNG → WebP into `public/media`
- `bash scripts/make-loops.sh` → seamless 10 s "breathing camera" MP4 loops from stills
