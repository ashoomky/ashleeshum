// components/VideoStats.tsx
//
// The stat chip under each pillar phone — a speech-bubble-style plum pill
// pointing back at the phone it belongs to, carrying a view count, a like
// count and a "watch here" caption. Figma node 2222:50 (fileKey
// A4pqjdqSX4RVHyE5TxCLl4): 270x76, radius 21, bg #453643 (this project's
// `plum`), a triangle pointer, "2.4k"/"1.2k" at 20px/0.6px (exactly
// `text-caption`) and "watch here" at 10px/0.3px (`text-stat-caption`,
// added for this).
//
// ICONS ARE FROM lucide-react, NOT THE FIGMA EXPORT: the design's play and
// heart glyphs are raster PNGs ("...-removebg-preview"), and the brief for
// this component was explicitly to draw them from a React icon library
// instead and colour them white, not to commit two more image files.
//
// Positioned by the caller: this is a child of the same `relative`-wrapped
// box the phone itself sits in (see Pillar.tsx), and centres/aligns itself
// against that box's own edges — `left-1/2`/`top-full` etc. resolve against
// whatever that box's size is, so this never needs to know the phone's own
// width or height as numbers.
//
// LANDSCAPE HAS NO FIGMA NODE OF ITS OWN — node 2222:50 is the portrait
// chip; the landscape arrangement (stacked vertically, pointer on the left)
// is read off the reference screenshot in the request that asked for this,
// not a located, measured node. Same visual language (plum, radius 21,
// white glyphs), different arrangement to fit beside a sideways phone
// instead of under an upright one.

import { Heart, Play } from 'lucide-react'

type VideoStatsProps = {
  views: string
  likes: string
  orientation?: 'portrait' | 'landscape'
}

const PORTRAIT_SIZE = { width: 270, height: 76 }

// `text-cream`, not `text-white`: tailwind.config.ts replaces the default
// palette entirely with five named colours, so `text-white` compiles to no
// rule at all — same trap Reel.tsx hit with `bg-black`. cream (#f4f2e0) is
// this project's near-white.
export default function VideoStats({ views, likes, orientation = 'portrait' }: VideoStatsProps) {
  if (orientation === 'landscape') {
    return (
      <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2">
        <div className="relative flex flex-col items-center gap-2 rounded-[21px] bg-plum px-4 py-4 text-cream">
          {/* Pointer, left: apex where the transparent top/bottom borders
              meet, flat plum edge on the right — the phone sits to the left. */}
          <div
            aria-hidden
            className="absolute top-1/2 -left-4 -translate-y-1/2 border-y-[15px] border-r-[16px] border-y-transparent border-r-plum"
          />
          <span className="flex items-center gap-1.5 font-body text-caption">
            <Heart size={18} />
            {likes}
          </span>
          <span className="flex items-center gap-1.5 font-body text-caption">
            <Play size={18} fill="currentColor" />
            {views}
          </span>
          <span className="font-body text-stat-caption underline">watch here</span>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute left-1/2 top-full mt-3.5 -translate-x-1/2">
      <div
        className="relative flex flex-col items-center justify-center gap-1.5 rounded-[21px] bg-plum text-cream"
        style={PORTRAIT_SIZE}
      >
        {/* Pointer, up: apex where the transparent left/right borders meet,
            flat plum edge on the bottom — the phone sits above. */}
        <div
          aria-hidden
          className="absolute -top-4 left-1/2 -translate-x-1/2 border-x-[15px] border-b-[16px] border-x-transparent border-b-plum"
        />
        <div className="flex items-center gap-8">
          <span className="flex items-center gap-1.5 font-body text-caption">
            <Play size={18} fill="currentColor" />
            {views}
          </span>
          <span className="flex items-center gap-1.5 font-body text-caption">
            <Heart size={18} />
            {likes}
          </span>
        </div>
        <span className="font-body text-stat-caption underline">watch here</span>
      </div>
    </div>
  )
}
