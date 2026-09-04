// components/sections/Hero.tsx
//
// Figma node 2076:30, the first band: y0 to y956 on the 1511 canvas.
//
// Coordinates come from figmaspec.md except for three, which the spec does not
// record and which are therefore placed by eye off a screenshot of the frame:
// the eleven stars, the flower and the clip. Each is marked at its use. Swap
// them for measured values whenever those are to hand.
//
// The name is drawn rather than set. "A" is artwork, "S" is Demo Motherlane
// turned -17deg, and only "shlee" and "hum" are live text. So the readable
// heading is a screen-reader-only h1 carrying the whole name, and the visible
// pieces are marked decorative — otherwise assistive tech hears "shlee hum".
//
// Z-ORDER, and this is an inference rather than something the spec states: the
// paper strip's box (x1134-1511) would otherwise cover the plum panel
// (x1193-1563) completely, and the panel is described as part of the hero
// ground. So the strip sits behind the panel and reads as the ~59px white
// sliver at x1134-1193. Check it against the Figma layer order.
//
// Static. The paper strip is the popup trigger but the click is not wired yet.

import Band from '@/components/Band'
import Prop from '@/components/Prop'
import Chip from '@/components/Chip'
import { hero } from '@/content'

/**
 * Eleven 34px stars scattered across the plum panel. figmaspec records the
 * count, the size and the fill but not the coordinates, so these are placed by
 * eye inside the panel and kept clear of the photostrip. Replace with measured
 * values when they are available.
 */
const STARS = [
  { top: 58, left: 1302 },
  { top: 118, left: 1436 },
  { top: 92, left: 1232 },
  { top: 254, left: 1472 },
  { top: 306, left: 1331 },
  { top: 468, left: 1288 },
  { top: 522, left: 1451 },
  { top: 664, left: 1358 },
  { top: 758, left: 1465 },
  { top: 858, left: 1298 },
  { top: 902, left: 1212 },
]

export default function Hero() {
  return (
    <Band className="bg-thistle">
      <h1 className="sr-only">{hero.name}</h1>

      {/*
        Paper strip: 377x959 at 1134,-4, rotated 180deg. Behind the plum panel —
        see the note above. This is the TravelNotesPopup trigger; the click is
        wired later (M5).
      */}
      <Prop
        src={hero.props.paperStrip}
        alt=""
        width={377}
        height={959}
        top={-4}
        left={1134}
        rotate={180}
        priority
      />

      {/* Plum panel: left 1193, width 370, full height. Overflows the canvas. */}
      <div className="absolute top-0 bottom-0 w-hero-panel bg-plum" style={{ left: 1193 }} />

      {/* The stars sit on the panel, so they follow it. */}
      {STARS.map((s) => (
        <Prop
          key={`${s.top}-${s.left}`}
          src={hero.props.stars}
          alt=""
          width={34}
          height={32}
          top={s.top}
          left={s.left}
        />
      ))}

      {/*
        Photostrip, over both the panel and the strip. The node in Figma is
        122.7x637.46 turned 9deg, but the export is that rotation already
        applied: the strip sits on the diagonal of a 442x1298 canvas with
        transparent corners. Solving which rotation maps 122.7x637.46 onto a
        442x1298 box gives exactly 9.00deg, and the node inside works out at
        245.5x1275.3 — a clean 2x export, as the spec asks for.
        So the size to pass is the file's own halved (221x649), and no `rotate`;
        adding one would turn it twice. 1137,209 is that box's top-left.
      */}
      <Prop
        src={hero.props.photostrip}
        alt=""
        width={221}
        height={649}
        top={209}
        left={1137}
        priority
      />

      {/*
        The clip on the photostrip's top right corner. ALSO PLACED BY EYE, and
        it has to come after the photostrip so it sits on top of it. Aimed at
        70x55 at 1318,224, which straddles the strip's right edge (1358) as it
        does in Figma. This file is mostly padding — 161x126 of artwork on a
        328x328 canvas — so the box is roughly twice the visible clip.
      */}
      <Prop
        src={hero.props.sticker}
        alt=""
        width={143}
        height={143}
        top={178}
        left={1285}
        priority
      />

      {/* The monogram "A": 543x380 at 61,192. Artwork, not type. */}
      <Prop
        src={hero.props.monogram}
        alt=""
        width={543}
        height={380}
        top={192}
        left={61}
        priority
      />

      {/*
        Flower, top left of the greeting. PLACED BY EYE off a screenshot of the
        Figma frame — figmaspec lists the asset but records no coordinate for
        it — so this is the one element here that is not measured. The visible
        bloom is aimed at 145x100 at 81,122; the box is larger because the file
        carries transparent padding (17 left, 49 top of 338x298), and Prop
        places files, not their content. Replace with real numbers when handy.
      */}
      <Prop
        src={hero.props.flower}
        alt=""
        width={164}
        height={145}
        top={98}
        left={73}
        priority
      />

      {/* "hi! i'm" at 213,189 — Bootzy 50 / 1px */}
      <p
        aria-hidden
        className="absolute font-signature text-hero-greeting text-plum"
        style={{ top: 189, left: 213 }}
      >
        {hero.greeting}
      </p>

      {/* "shlee" at 543,214 — Oskon 240 / 4.8px */}
      <span
        aria-hidden
        className="absolute font-label text-hero-name text-plum"
        style={{ top: 214, left: 543 }}
      >
        {hero.nameParts.first}
      </span>

      {/* "S" at 398,546 — Demo Motherlane 370 / 7.4px, turned -17deg */}
      <span
        aria-hidden
        className="absolute rotate-initial-s font-display text-hero-initial text-plum"
        style={{ top: 546, left: 398 }}
      >
        {hero.nameParts.initial}
      </span>

      {/* "hum" at 693,418 — Oskon 250 / 5px */}
      <span
        aria-hidden
        className="absolute font-label text-hero-name-lg text-plum"
        style={{ top: 418, left: 693 }}
      >
        {hero.nameParts.last}
      </span>

      {/* Tagline pill: 345x40 radius 21 at 662,686 */}
      <div className="absolute" style={{ top: 686, left: 662 }}>
        <Chip className="w-chip font-heading text-tagline">{hero.tagline}</Chip>
      </div>

      {/*
        NOT BUILT: the three social icons, at 639,715 (90px), 711,730 (59px) and
        756,721 (79px). No icon artwork exists in public/ yet, and two of the
        three hrefs in content are still placeholders, so there is nothing
        honest to render here.
      */}
    </Band>
  )
}
