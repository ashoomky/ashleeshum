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
  credibilityCaption,
  credibilityProps,
  experience,
  experienceHeading,
  RELATIONSHIP_FOOTNOTE,
  tools,
} from '@/content'

/** Half the canvas, for mapping a design y into the section's own box. */
const CANVAS_MID_Y = 478

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
        top: `calc(50% + ${top - CANVAS_MID_Y}px * var(--canvas-scale, 1))`,
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
      className="bg-olive"
      bleed={
        <>
          <Ribbon top={166} className="rotate-band" />
          <Ribbon top={519} className="rotate-band-alt" />
        </>
      }
    >
      {/* Phone mockup, 375x666 at 565,2352 — PhoneFrame's large size exactly.
          Its screen is left empty so the ribbon behind shows through it. */}
      <div className="absolute" style={{ top: 120, left: 565 }}>
        <PhoneFrame size="large" />
      </div>

      {/*
        FROM THE SCREENSHOT: the star, sitting over the phone's top left
        corner. The spec records it as belonging to this section but gives no
        coordinate. The box is a little larger than the star because the file
        carries 8px of padding down its left edge.
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
        PLACED BY EYE: the spec gives no position for either heading. Each sits
        above the row it introduces.
      */}
      <h2
        className="absolute font-signature text-script-sm text-cream"
        style={{ top: 60, left: 810 }}
      >
        {brandsHeading}
      </h2>

      <h2
        className="absolute font-signature text-script-sm text-cream"
        style={{ top: 430, left: 12 }}
      >
        {experienceHeading}
      </h2>

      {/*
        Brands, each turned 3deg to sit with the ribbon. The spec's
        "2475-2489 line" is the line they are centred on rather than a top
        edge — centring on it puts them within a couple of px of the ribbon's
        own centre, which a top edge does not.

        FROM THE SCREENSHOT: 160 square rather than the spec's ~128, which
        nearly fills the ribbon as the screenshot shows. At that size they no
        longer fit starting from the spec's x1057 — three of them plus gaps
        would run to 1569, past the canvas — so the row is shifted left to end
        at 1490 instead.

        All three are gifted rather than paid, so each carries a marker and the
        footnote renders below. That footnote clears the ribbon rather than
        sitting just under the logos: it is cream and so is the ribbon, and the
        3deg turn drops the ribbon's bottom edge to y377 by the right end of
        this row, so anything higher is cream on cream and simply disappears.
      */}
      <LogoRow
        items={brands}
        lefts={[978, 1154, 1330]}
        centreY={250}
        width={160}
        height={160}
        rotate={3}
        footnote={RELATIONSHIP_FOOTNOTE}
        footnoteTop={390}
      />

      {/*
        FROM THE SCREENSHOT: six marks, not the spec's four — CapCut and
        DaVinci join the study and certification ones, which is where the
        `tools` list finally has a home. Six no longer fit the spec's x12/245/
        488/713, so they are spread evenly across the canvas at 257 apart,
        which lands the last at 1299 — close to where the screenshot puts it.
        Sized into a 200x120 box rather than by height alone, so each fills its
        slot as far as its own proportions allow: these run from 1.74 to 3.45
        wide-to-tall, so HubSpot comes out 200x58 where DaVinci is 120x120.

        Centred on the ribbon's own middle rather than the spec's 2800-2811
        line. The -1deg turn swings that middle from y619 at the left of the
        row to y593 at the right, so 606 is the one value that keeps all six
        on it.
      */}
      <LogoRow
        items={[...experience, ...tools]}
        lefts={[12, 269, 527, 784, 1042, 1299]}
        centreY={606}
        width={200}
        height={120}
      />

      {/*
        PLACED BY EYE, and the least certain thing here: this caption is not in
        figmaspec at all — neither its position, size, nor what it belongs to.
        It sits under the phone on the assumption that it captions it.
      */}
      <p
        className="absolute text-center font-body text-body-sm text-cream"
        style={{ top: 800, left: 565, width: 375 }}
      >
        {credibilityCaption}
      </p>
    </Band>
  )
}
