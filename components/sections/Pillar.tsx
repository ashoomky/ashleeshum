// components/sections/Pillar.tsx
//
// One band, rendered three times — Lifestyle, Travel and Food. They share
// everything but their arrangement, so the arrangement is the data and this is
// the one component: phones, props, a title and a note, placed per pillar.
//
// Figma nodes at 3188, 4144 and 5100, all cream and a full 956. The spec gives
// positions as page coordinates, so every y below is the spec's less its own
// band's top — Lifestyle's phones at page 3452 are 264 into the band.
//
// MEASURED: every phone and every prop position. The phones are 309x549 and
// sit edge to edge, which is why Lifestyle's three are exactly 309 apart.
//
// NOT MEASURED, and this is most of the text: the spec records no position for
// any title, offer line or sub-caption in any of the three. Those are placed
// by eye from the described arrangement — Lifestyle's note to the right of its
// phones, Travel's between its uprights and its sideways one, Food's to the
// left — and they are the first thing to correct once the frame's own
// coordinates are to hand. Prop sizes are not recorded either; each is its
// file halved, on the same 2x export the rest of the band uses.
//
// The titles start at y78 rather than the top of the band because Demo
// Motherlane's swashes reach well above the type's own box at 300px: from y20
// the initial's flourish was cut off by the band's edge.

import Band from '@/components/Band'
import PhoneFrame from '@/components/PhoneFrame'
import Prop from '@/components/Prop'
import PillarHeading from '@/components/PillarHeading'
import type { pillars } from '@/content'

type PillarData = (typeof pillars)[number]

type PhoneSpot = { top: number; left: number; rotate?: number }
type PropSpot = { top: number; left: number; width: number; height: number }

type PillarLayout = {
  phones: PhoneSpot[]
  props: PropSpot[]
  heading: { top: number; left: number; width?: number }
  note: { top: number; left: number; width: number }
  /** Nudge to centre this band's content on screen; see Band. */
  offsetY: number
}

const LAYOUTS: Record<PillarData['id'], PillarLayout> = {
  lifestyle: {
    // Three in a row, edge to edge from x115.
    phones: [
      { top: 264, left: 115 },
      { top: 264, left: 424 },
      { top: 264, left: 733 },
    ],
    props: [
      { top: 119, left: 396, width: 185, height: 185 },
      { top: 539, left: 1237, width: 259, height: 255 },
    ],
    heading: { top: 78, left: 115, width: 900 },
    note: { top: 180, left: 1080, width: 400 },
    offsetY: 33,
  },

  travel: {
    // Two upright, then one turned 90deg. The spec gives that one as a bounding
    // box — 549x309 at 817,4648 — so the element is placed by the centre they
    // share: a 309x549 phone at 937,384 turns about its middle into exactly
    // that box.
    phones: [
      { top: 231, left: 173 },
      { top: 231, left: 482 },
      { top: 384, left: 937, rotate: 90 },
    ],
    props: [{ top: 71, left: 529, width: 375, height: 375 }],
    heading: { top: 78, left: 173, width: 900 },
    note: { top: 250, left: 860, width: 500 },
    offsetY: 36,
  },

  food: {
    // Note to the left, three phones filling the rest.
    phones: [
      { top: 244, left: 428 },
      { top: 244, left: 737 },
      { top: 244, left: 1046 },
    ],
    props: [{ top: 614, left: 151, width: 277, height: 159 }],
    heading: { top: 78, left: 12, width: 900 },
    note: { top: 330, left: 12, width: 380 },
    offsetY: 43,
  },
}

export default function Pillar({ pillar }: { pillar: PillarData }) {
  const layout = LAYOUTS[pillar.id]

  return (
    <Band className="bg-cream" offsetY={layout.offsetY}>
      {layout.props.map((spot, i) => (
        <Prop
          key={pillar.props[i]}
          src={pillar.props[i]}
          alt=""
          width={spot.width}
          height={spot.height}
          top={spot.top}
          left={spot.left}
        />
      ))}

      {layout.phones.map((spot) => (
        <div
          key={`${spot.top}-${spot.left}`}
          className="absolute"
          style={{
            top: spot.top,
            left: spot.left,
            transform: spot.rotate ? `rotate(${spot.rotate}deg)` : undefined,
          }}
        >
          <PhoneFrame />
        </div>
      ))}

      <PillarHeading heading={pillar.heading} {...layout.heading} />

      <div
        className="absolute flex flex-col gap-4"
        style={{ top: layout.note.top, left: layout.note.left, width: layout.note.width }}
      >
        {pillar.offerLabel && (
          <p className="font-body text-body-lg text-plum">{pillar.offerLabel}</p>
        )}
        <p className="font-body text-body-lg text-plum">{pillar.offer}</p>
        {'subCaption' in pillar && pillar.subCaption && (
          <p className="font-body text-caption text-plum">{pillar.subCaption}</p>
        )}
      </div>

      {/*
        NOT BUILT: the paper note each pillar names in `paper`. Those three
        files have never been exported — content marks them so — and the note
        above is plain text on the cream ground until they are.
      */}
    </Band>
  )
}
