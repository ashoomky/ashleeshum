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

import Image from 'next/image'
import Band from '@/components/Band'
import PhoneFrame from '@/components/PhoneFrame'
import Prop from '@/components/Prop'
import PillarHeading from '@/components/PillarHeading'
import type { pillars } from '@/content'

type PillarData = (typeof pillars)[number]

type PhoneSpot = { top: number; left: number; rotate?: number }
type PropSpot = { top: number; left: number; width: number; height: number }
type Box = { top: number; left: number; width: number; height: number }

type PillarLayout = {
  phones: PhoneSpot[]
  props: PropSpot[]
  heading: { top: number; left: number }
  /** The paper the offer copy is written on. */
  note: Box
  /** Lifestyle alone carries one, and it sits apart from the note. */
  subCaption?: { top: number; left: number; width: number }
  /** Nudge to centre this band's content on screen; see Band. */
  offsetY: number
}

/**
 * STAND-IN. Each pillar names its own paper in `paper` — paper-note-lifestyle
 * and the other two — and none of the three has ever been exported. This is the
 * travel popup's crumpled paper, the same texture family, standing in so the
 * notes read as paper rather than as loose text on the cream. Swap it for the
 * real three when they exist.
 */
const PAPER = '/popup/crumpled-paper.jpg'

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
    heading: { top: 130, left: 543 },
    note: { top: 230, left: 975, width: 540, height: 410 },
    subCaption: { top: 860, left: 113, width: 420 },
    offsetY: -23,
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
    heading: { top: 110, left: 106 },
    note: { top: 200, left: 809, width: 700, height: 300 },
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
    heading: { top: 72, left: 477 },
    // Runs off the left edge in the frame, as it does in the design; the
    // band's own clip is what cuts it.
    note: { top: 244, left: -40, width: 545, height: 400 },
    offsetY: 46,
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

      {/*
        The note: copy on paper, set justified as the design has it. Drawn
        before the title, which overlaps it — the design reads the title over
        the paper, not the paper over the title.
      */}
      <div className="absolute" style={layout.note}>
        <Image src={PAPER} alt="" fill sizes={`${layout.note.width}px`} className="object-cover" />
        {/*
          The copy is inset past however far the paper bleeds off the canvas,
          so a note that runs off the left edge — Food's does — still starts
          its text inside the frame rather than under the clip.
        */}
        <div
          className="relative flex h-full flex-col justify-center gap-3 pr-10"
          style={{ paddingLeft: 40 + Math.max(0, -layout.note.left) }}
        >
          {pillar.offerLabel && (
            <p className="font-body text-body-lg text-plum">{pillar.offerLabel}</p>
          )}
          <p className="text-justify font-body text-body-lg text-plum">{pillar.offer}</p>
        </div>
      </div>

      <PillarHeading heading={pillar.heading} {...layout.heading} />

      {/* Lifestyle's alone, under its phones rather than on the paper. */}
      {layout.subCaption && 'subCaption' in pillar && pillar.subCaption && (
        <p className="absolute font-body text-caption text-plum" style={layout.subCaption}>
          {pillar.subCaption}
        </p>
      )}
    </Band>
  )
}
