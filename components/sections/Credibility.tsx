// components/sections/Credibility.tsx
//
// Figma node 2076:30, the fourth band: olive, a full 956. The spec gives its
// positions as page coordinates and the band starts at y2232, so every y here
// is the spec's less 2232 — the phone at page 2352 is 120 into the band.
//
// WHERE THIS DEPARTS FROM figmaspec, and why: the spec was written against an
// earlier state of the frame. Working from a screenshot of the current one,
// the ribbons run the full width of the screen rather than stopping at the
// canvas, both logo rows are markedly larger, the credential row carries six
// marks rather than four (CapCut and DaVinci join it), and the star sits on
// the phone. Sizes and positions that changed are marked FROM THE SCREENSHOT
// below; anything unmarked is still the spec's own measurement.

import Band from '@/components/Band'
import Prop from '@/components/Prop'
import PhoneFrame from '@/components/PhoneFrame'
import LogoRow from '@/components/LogoRow'
import {
  brands,
  brandsHeading,
  credibilityProps,
  experience,
  experienceHeading,
  highlightReel,
  tools,
} from '@/content'

/** Half the canvas, for mapping a design y into the section's own box. */
const CANVAS_MID_Y = 478

/**
 * How far the band's content is nudged down to centre it on screen. The
 * ribbons — and the logo rows riding them — are bleeds, drawn outside the
 * frame, so Band's own offsetY does not reach them; each adds it back itself.
 */
const OFFSET_Y = 55

/**
 * The cream ribbons, drawn as bleed so they reach both edges of the screen.
 *
 * They cannot live in the frame: the frame clips at the canvas, so a ribbon
 * inside it stops at x1511 and leaves olive either side, which is exactly what
 * the earlier build did. As bleed they sit behind the frame in the section's
 * own box, where they can be wider than the viewport — 120% of it, so the
 * corners of a turned ribbon still cover the edges rather than cutting them.
 *
 * Vertically they still follow the design: the frame is centred in the
 * section, so a design y maps to `50% + (y - 478) * scale`, and their 173.56
 * height scales with everything else.
 */
function Ribbon({ top, className }: { top: number; className: string }) {
  return (
    <div
      className={['absolute bg-cream', className].join(' ')}
      style={{
        top: `calc(50% + ${top + OFFSET_Y - CANVAS_MID_Y}px * var(--canvas-scale, 1))`,
        height: 'calc(173.56px * var(--canvas-scale, 1))',
        left: '-10%',
        width: '120%',
      }}
    />
  )
}

export default function Credibility() {
  return (
    <Band
      id="credibility"
      className="bg-olive"
      offsetY={OFFSET_Y}
      bleed={
        <>
          <Ribbon top={166} className="rotate-band" />
          <Ribbon top={519} className="rotate-band-alt" />

          {/*
            Brands, turned 3deg to sit with the ribbon and seated on its
            centre line rather than a fixed y — see LogoRow. The spec's
            "2475-2489 line" is where that centre crosses the middle of the
            canvas; from there the 3deg turn carries it down about 38px by
            the right of this row, and the row follows it.

            FROM THE SCREENSHOT: 160 square rather than the spec's ~128,
            which nearly fills the ribbon. A bleed like the ribbon itself,
            not a child of the frame — see LogoRow for why: the frame only
            reaches the true screen edge when the canvas's aspect happens to
            match the window's, so a row confined to it stops short on any
            ordinary widescreen monitor, leaving bare ribbon after the last
            logo.
          */}
          <LogoRow
            items={brands}
            gap={16}
            centreY={252.78}
            width={160}
            height={160}
            tilt={3}
            rotate={1.5}
            offsetY={OFFSET_Y}
            direction="left"
          />

          {/*
            FROM THE SCREENSHOT: six marks feeding the row, not the spec's
            four — CapCut and DaVinci join the study and certification ones,
            which is where the `tools` list finally has a home. Sized into a
            200x120 box rather than by height alone, so each fills its slot
            as far as its own proportions allow: these run from 1.74 to 3.45
            wide-to-tall, so HubSpot comes out 200x58 where DaVinci is
            120x120.

            Seated on the ribbon's own centre rather than the spec's
            2800-2811 line, and following it: the -1deg turn lifts that
            centre from y594 at the right of the row to y617 at the left, so
            no single y keeps every logo on the ribbon and each takes the one
            belonging to its own x.

            direction="right", against the brand row's "left": a deliberate
            counter-scroll rather than both drifting the same way, the same
            "wall of logos" motif most marquee templates default to when
            they stack more than one row.
          */}
          <LogoRow
            items={[...experience, ...tools]}
            gap={58}
            centreY={605.78}
            width={200}
            height={120}
            tilt={-1}
            offsetY={OFFSET_Y}
            direction="right"
          />
        </>
      }
    >
      {/* Phone mockup, 375x666 at 565,2352 — PhoneFrame's large size exactly.
          A three-second cut of each portrait reel, stitched into one loop —
          a highlight reel rather than any one clip, since no single pillar
          owns the phone that sits beside all three's logos. Ambient, same
          treatment as the About camera: autoplay, looping, muted, no
          controls — this is a backdrop, not something to interact with. */}
      <div className="absolute" style={{ top: 120, left: 565 }}>
        <PhoneFrame size="large">
          <video
            src={highlightReel.video}
            poster={highlightReel.poster}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        </PhoneFrame>
      </div>

      {/*
        FROM THE SCREENSHOT: the star, sitting over the phone's top left
        corner. The spec records it as belonging to this section but gives no
        coordinate. The box is a little larger than the star because the file
        carries 8px of padding down its left edge. Drawn after the phone so it
        stays on top of it.
      */}
      <Prop
        src={credibilityProps.star}
        alt=""
        width={138}
        height={135}
        top={61}
        left={508}
      />

      {/*
        Turned with the band so it sits parallel just above it, rather than
        cutting across it. The band drops 27px over this title's width, so an
        unrotated title cannot clear it evenly — level with the band at one end
        it is buried at the other, which is what the measured 964.92,2386 gave.

        Rotated about its BOTTOM LEFT corner, which is the thing that makes
        this hold: the corner is pinned 10px above the band's top edge where
        the title starts, and turning about that point swings the rest of the
        title along the band's own line, so the gap stays 10px the whole way
        across. Positioned by `bottom` rather than `top` so it does not depend
        on how tall the type happens to render.

        x is the measured 964.92. The y is not the measured 2386: at that y the
        title overlaps the band, and both are cream. One of the two is stale,
        and the title was read off the frame directly, so the band's y is the
        suspect — see figmaspec.
      */}
      <h2
        className="absolute origin-bottom-left rotate-band font-signature text-script-sm text-cream"
        style={{ bottom: 789, left: 964.92 }}
      >
        {brandsHeading}
      </h2>

      {/*
        STILL PLACED BY EYE — no coordinate has been read off the frame for
        this one. Left-aligned to its row's first logo, and sat 10px above the
        lower band's top edge, which is at y532 out at x12. Left level rather
        than turned: that band is tilted only -1deg, and nothing was asked of
        this title beyond dropping it onto the band.
      */}
      <h2
        className="absolute font-signature text-script-sm text-cream"
        style={{ bottom: 434, left: 12 }}
      >
        {experienceHeading}
      </h2>
    </Band>
  )
}
