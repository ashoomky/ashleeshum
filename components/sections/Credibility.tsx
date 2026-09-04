// components/sections/Credibility.tsx
//
// Figma node 2076:30, the fourth band: olive, a full 956. The spec gives its
// positions as page coordinates and the band starts at y2232, so every y here
// is the spec's less 2232 — the phone at page 2352 is 120 into the band.
//
// Measured: the phone, both logo rows' x positions and lines, and both cream
// ribbons. NOT measured, and marked at each use: the two headings, the caption
// by the phone, and the credential logos' size — the spec records none of them.

import Band from '@/components/Band'
import PhoneFrame from '@/components/PhoneFrame'
import LogoRow from '@/components/LogoRow'
import {
  brands,
  brandsHeading,
  credibilityCaption,
  experience,
  experienceHeading,
  RELATIONSHIP_FOOTNOTE,
} from '@/content'

/**
 * The two cream ribbons: 1572.3 x 173.56, turned 3deg and -1deg, at y2398 and
 * y2751. They are wider than the 1511 canvas, and the spec gives no x, so they
 * are centred and overhang both edges by ~31px — which is what a ribbon that
 * runs off the page wants to do anyway.
 */
const RIBBON = { width: 1572.3, height: 173.56, left: (1511 - 1572.3) / 2 }

export default function Credibility() {
  return (
    <Band className="bg-olive">
      {/* Ribbon behind the brand row. */}
      <div
        className="absolute rotate-band bg-cream"
        style={{ top: 166, left: RIBBON.left, width: RIBBON.width, height: RIBBON.height }}
      />

      {/* Ribbon behind the credential row. */}
      <div
        className="absolute rotate-band-alt bg-cream"
        style={{ top: 519, left: RIBBON.left, width: RIBBON.width, height: RIBBON.height }}
      />

      {/* Phone mockup, 375x666 at 565,2352 — PhoneFrame's large size exactly. */}
      <div className="absolute" style={{ top: 120, left: 565 }}>
        <PhoneFrame size="large">
          <div className="h-full w-full bg-thistle" />
        </PhoneFrame>
      </div>

      {/*
        PLACED BY EYE: the spec gives no position for either heading. Each sits
        above the row it introduces and is left-aligned to it, except that the
        brands heading starts well left of its logos — at 60px it is far too
        wide to begin at their x1057 and still fit the canvas.
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
        Brands: ~128px square at 1057, 1201, 1347, each turned 3deg to sit with
        the ribbon. The spec's "2475-2489 line" is the line they are centred
        on, not a top edge — centring on it puts them within a couple of px of
        the ribbon's own centre, which a top edge does not.

        All three are gifted rather than paid, so all three carry the marker
        and the footnote renders beneath.

        The footnote clears the ribbon rather than sitting just under the
        logos: the footnote is cream and so is the ribbon, and the 3deg turn
        drops the ribbon's bottom edge to y377 by the right end of this row, so
        anything higher than that is cream on cream and simply disappears. 390
        is inside the olive gap, which runs to y506 before the second ribbon
        reaches up into it.
      */}
      <LogoRow
        items={brands}
        lefts={[1057, 1201, 1347]}
        centreY={250}
        width={128}
        height={128}
        rotate={3}
        footnote={RELATIONSHIP_FOOTNOTE}
        footnoteTop={390}
      />

      {/*
        Credentials at x12, 245, 488, 713 on the 2800-2811 line, centred on it
        as above. SIZE PLACED BY EYE: the spec records none. These are
        wordmarks running from 1.74 to 3.45 wide-to-tall, so the row is sized
        by height — 56 — and the 200px box is wide enough for the widest of
        them, HubSpot, at its natural width while still clearing the next
        logo's x.

        UNRESOLVED, and visible: the spec's own numbers put the fourth logo on
        top of the phone. The phone is 565-940 across and this logo starts at
        x713, squarely inside it, at a y the phone also occupies. Drawn after
        the phone so it stays readable, which is the lesser of the two evils —
        drawn before, the phone would hide a credential entirely. Worth
        checking both against the Figma frame, since one of them has to move.
      */}
      <LogoRow
        items={experience}
        lefts={[12, 245, 488, 713]}
        centreY={573}
        width={200}
        height={56}
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

      {/*
        NOT PLACED: credibilityProps.star, and the two `tools` logos. The spec
        gives four credential positions and `experience` fills them exactly,
        leaving CapCut and DaVinci without one; the star has no coordinate
        either. Both need a position from the design file.
      */}
    </Band>
  )
}
