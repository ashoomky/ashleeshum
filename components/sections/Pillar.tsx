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
import Reel from '@/components/Reel'
import VideoStats from '@/components/VideoStats'
import { reelsByPillar, type pillars } from '@/content'

type PillarData = (typeof pillars)[number]

type PhoneSpot = { top: number; left: number; landscape?: boolean }
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
      // The laptop, tucked over the note's bottom-right corner rather than
      // its middle. Dropped from 700, which still sat over the paragraph's
      // last few lines — 770 clears the current copy with a small gap below
      // it, at the cost of some of the laptop's own bottom edge running past
      // the canvas, an accepted bleed rather than covering copy meant to be
      // read. Depends on the offer copy staying roughly this length; a much
      // longer rewrite would need this revisited.
      { top: 710, left: 1280, width: 259, height: 255 },
    ],
    // Raised from 130: at that top the "ifestyle content" text itself (not
    // just the L's swash) ran 36px past the phones' top edge and behind them.
    heading: { top: 84, left: 543 },
    // Clears the third phone (which ends at 733+309=1042) by 24px, so the
    // paper — and the copy on it — never touches the screen. Narrowed from
    // 540 to keep its right edge where it was. Dropped from 230 to clear the
    // heading's own text, which — set at this width — runs to y300.
    //
    // Height raised from 410 to 500: the offer copy grew once the real
    // sentence replaced the placeholder, and at 410 the paragraph's last
    // line ran about 40px past the paper's own bottom edge onto the bare
    // cream underneath it.
    note: { top: 320, left: 1066, width: 445, height: 500 },
    // Raised from 860, closer to the phones' own bottom edge (264+549=813).
    subCaption: { top: 830, left: 113, width: 420 },
    // Re-centred with the sub-caption's own move: content runs from the
    // heading's 84 to the sub-caption's ~854 (830 + one caption line), a
    // 770px span, so 9 (not the previous -6, measured against the
    // sub-caption's former 860) centres it in the 956 band — 93px above,
    // 93px below.
    offsetY: 9,
  },

  travel: {
    // Two upright, then one turned 90deg holding a genuinely landscape reel.
    // The spec gives that one as a bounding box — 549x309 at 817,4648 — and
    // PhoneFrame's landscape orientation reports exactly that swapped
    // footprint as its own size, so this positions by the box's own
    // top-left directly rather than by an unrotated phone's centre the way
    // an externally-rotated wrapper would have needed.
    phones: [
      { top: 231, left: 173 },
      { top: 231, left: 482 },
      { top: 504, left: 817, landscape: true },
    ],
    // Moved up and right from 71,529: the plane's own box overlapped the
    // second phone by 262px of its 375 width, which hid most of the
    // fuselage and tail behind it and left only the nose poking out above.
    // Shifting it up and to the right pulls it clear of the phone, so more
    // of the plane shows rather than just the cockpit.
    props: [{ top: 20, left: 610, width: 375, height: 375 }],
    // Raised from 110: the "ravel content" text itself ran 49px behind the
    // first two phones' top edge, same issue as Lifestyle's heading.
    heading: { top: 51, left: 106 },
    note: { top: 200, left: 809, width: 700, height: 300 },
    offsetY: 36,
  },

  food: {
    // Note to the left, three phones filling the rest. Shifted right from
    // 428/737/1046: the note runs to x505 (its 545 width, from -40), so the
    // first phone was overlapping its last 77px, over the text.
    phones: [
      { top: 244, left: 525 },
      { top: 244, left: 834 },
      { top: 244, left: 1143 },
    ],
    // Moved up beside "Food content" from 590,151 (by the note, at the
    // bottom of the band) — the same spot Lifestyle's smoothie and Travel's
    // plane take beside their own headings, which Food's one prop didn't
    // until now. Right edge overlaps the heading's own left edge by 30px,
    // same tucked-beside relationship as Lifestyle's prop and its heading.
    props: [{ top: 100, left: 230, width: 277, height: 159 }],
    heading: { top: 72, left: 477 },
    // Runs off the left edge in the frame, as it does in the design; the
    // band's own clip is what cuts it.
    note: { top: 244, left: -40, width: 545, height: 400 },
    offsetY: 46,
  },
}

export default function Pillar({ pillar }: { pillar: PillarData }) {
  const layout = LAYOUTS[pillar.id]
  const reels = reelsByPillar(pillar.id)

  return (
    // "work" is only on the first of the three — both the nav and the
    // popup's "what i can do for you" link need one entry point into the
    // section, and lifestyle is where that section starts.
    <Band id={pillar.id === 'lifestyle' ? 'work' : undefined} className="bg-cream" offsetY={layout.offsetY}>
      {/*
        Paper at the bottom, then props, then the heading, then the phones on
        top of all three. That's what lets the title's oversized initial dip
        slightly behind a phone (Lifestyle's L behind its second phone)
        without the paper, the copy on it, or a prop ever showing through a
        phone's bezel — and what keeps the heading itself readable over
        Travel's plane, which sits right across its own heading's text.
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

      {/* After the props, not before: Travel's plane sits right where its
          heading's own text runs, and the plane used to win that overlap —
          it isn't decorative in the same way a prop tucked into blank space
          is, so the readable heading stays on top of it instead. */}
      <PillarHeading heading={pillar.heading} {...layout.heading} />

      {layout.phones.map((spot, i) => (
        <div key={`${spot.top}-${spot.left}`} className="absolute" style={{ top: spot.top, left: spot.left }}>
          {/* `relative`, not the outer div: VideoStats positions itself
              against THIS box's own edges (left-1/2, top-full, left-full...),
              so this needs to be its containing block, one level in from the
              band-relative top/left placement above. */}
          <div className="relative">
            {/* One reel per phone, in the same order as both arrays. The
                turned travel phone asks PhoneFrame for landscape orientation
                rather than being rotated from out here — that turns only
                the bezel, not the reel inside it, which is genuinely
                landscape footage and needs to read upright to the viewer. */}
            <PhoneFrame orientation={spot.landscape ? 'landscape' : 'portrait'}>
              {reels[i] && (
                <Reel
                  src={reels[i].video}
                  poster={reels[i].poster}
                  fit={spot.landscape ? 'contain' : 'cover'}
                />
              )}
            </PhoneFrame>

            {/* View/like counts and a "watch here" link out to the original
                post — see VideoStats for why the landscape arrangement
                isn't a measured Figma node. */}
            {reels[i] && (
              <VideoStats
                views={reels[i].views}
                likes={reels[i].likes}
                watchHref={reels[i].watchHref}
                orientation={spot.landscape ? 'landscape' : 'portrait'}
              />
            )}
          </div>
        </div>
      ))}

      {/* Lifestyle's alone, under its phones rather than on the paper. */}
      {layout.subCaption && 'subCaption' in pillar && pillar.subCaption && (
        <p className="absolute font-body text-caption text-plum" style={layout.subCaption}>
          {pillar.subCaption}
        </p>
      )}
    </Band>
  )
}
