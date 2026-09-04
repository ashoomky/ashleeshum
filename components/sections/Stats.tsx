// components/sections/Stats.tsx
//
// Figma node 2076:30, the third band, and the first one that is not a full
// 956: it is a 321px plum strip sitting between About and Credibility, so it
// takes its own height rather than filling the screen.
//
// The spec gives these as page coordinates and the band starts at y1911, so
// every y here is the spec's less 1911 — 6,800+ at page 1998 is 87 into the
// band.

import Band from '@/components/Band'
import Stat from '@/components/Stat'
import { stats } from '@/content'

/**
 * Positions per figure, in the order `stats` lists them. Note 3+ sits 4px
 * higher than the other two — that is in the design, not a slip.
 *
 * `wide` is the 5.2px tracking the spec calls for on 1.57M alone; the other
 * two take 3.9px.
 *
 * The spec places the labels on "the 2112-2118 line" without breaking that
 * down per label, so all three take the top of that range, 201 into the band.
 * It records no x for them at all, so they are centred under their figure —
 * see Stat, which does that without measuring anything.
 */
const LAYOUT = [
  { left: 139, top: 87 }, // 6,800+
  { left: 660, top: 87, wide: true }, // 1.57M
  { left: 1205, top: 83 }, // 3+
]

const LABEL_TOP = 201

export default function Stats() {
  return (
    <Band className="bg-plum" height={321}>
      {stats.map((stat, i) => (
        <Stat
          key={stat.label}
          value={stat.value}
          label={stat.label}
          left={LAYOUT[i].left}
          top={LAYOUT[i].top}
          labelTop={LABEL_TOP}
          wide={LAYOUT[i].wide}
        />
      ))}
    </Band>
  )
}
