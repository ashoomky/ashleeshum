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
        Measured: 964.92,2386 in the frame, so 154 into the band.

        CONFLICT, and it is the band below that is wrong rather than this. The
        title's box is 66 tall, so it runs to y220, while figmaspec puts the
        upper cream band's top at page 2398 — 12px under this title's top. A
        cream title cannot sit on a cream band, so the two numbers cannot both
        describe the current frame, and this one was read off it directly.
        Everything else in this band turned out to be superseded too, so the
        band's own y almost certainly moved with it. Needs the bands' real
        coordinates before the composition here is right.
      */}
      <h2
        className="absolute font-signature text-script-sm text-cream"
        style={{ top: 154, left: 964.92 }}
      >
        {brandsHeading}
      </h2>

      {/*
        STILL PLACED BY EYE — the frame's coordinate for this one has not been
        read off yet, unlike the title above. Left-aligned to its row's first
        logo and sat above the band it introduces.
      */}
      <h2
        className="absolute font-signature text-script-sm text-cream"
        style={{ top: 430, left: 12 }}
      >
        {experienceHeading}
      </h2>

      {/*
        Brands, turned 3deg to sit with the ribbon and seated on its centre
        line rather than a fixed y — see LogoRow. The spec's "2475-2489 line"
        is where that centre crosses the middle of the canvas; from there the
        3deg turn carries it down about 38px by the right of this row, and the
        row follows it.

        FROM THE SCREENSHOT: 160 square rather than the spec's ~128, which
        nearly fills the ribbon. At that size three no longer fit starting from
        the spec's x1057 — they would run to 1569, past the canvas — so the row
        is shifted left to end at 1490 instead.
      */}
      <LogoRow
        items={brands}
        lefts={[978, 1154, 1330]}
        centreY={252.78}
        width={160}
        height={160}
        tilt={3}
        rotate={1.5}
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

        Seated on the ribbon's own centre rather than the spec's 2800-2811
        line, and following it: the -1deg turn lifts that centre from y594 at
        the right of the row to y617 at the left, so no single y keeps all six
        on the ribbon and each takes the one belonging to its own x.
      */}
      <LogoRow
        items={[...experience, ...tools]}
        lefts={[12, 269, 527, 784, 1042, 1299]}
        centreY={605.78}
        width={200}
        height={120}
        tilt={-1}
      />

    </Band>
  )
}
