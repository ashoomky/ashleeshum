// components/LogoRow.tsx
//
// A row of logos riding one of Credibility's cream ribbons. Used twice: the
// brands Ashlee has worked with, and the study, certification and software
// marks.
//
// Every logo gets the same box and is contained within it, so a row keeps one
// common size whatever each mark's proportions are. That matters more than it
// sounds: the credential wordmarks run from 1.74 to 3.45 wide-to-tall, so
// sizing them by a square box would leave HubSpot a third the height of the
// others.
//
// THE ROW FOLLOWS THE RIBBON, BUT IS NOT TURNED BY IT. Two separate things,
// and keeping them apart is the point of `tilt` and `rotate`.
//
// `tilt` is the ribbon's own angle. The ribbons are turned a few degrees, so
// their centre line climbs or falls across the canvas — ribbon one drops about
// 38px between the middle of the canvas and its right edge. A row pinned to a
// single y therefore rides higher and higher up the ribbon the further along
// it goes, and eventually breaks out of the top. So each logo takes its y from
// where the ribbon's centre actually is at that logo's x.
//
// `rotate` is how far the logo itself is turned, and it is not the same
// number. Turning each logo by the full ribbon angle makes the row dead
// parallel to the ribbon, which reads as more tilt than the design wants. The
// logos ride the ribbon's line while sitting straighter than it does.
//
// A single logo can override that row-wide angle with its own `rotate` in
// content (on the `Brand`/`LogoItem` entry itself) — falls back to the row's
// own `rotate` prop when omitted, so nothing else has to change to add one.
//
// THIS IS A BLEED, LIKE THE RIBBON IT RIDES — pass it to Band's `bleed`, not
// as an ordinary child. It used to live inside the canvas and fill exactly
// its 1511 width, which fixed one bug (a logo sliced by the canvas clip,
// mid-shape) by trading it for another: the canvas only fills the true
// browser width when the viewport's aspect is width-limited. The moment it
// isn't — any ordinary widescreen monitor, where height is the tighter
// constraint — the canvas renders narrower than the window, and a row tiled
// to just the canvas stopped short of the real edge with visible ribbon
// (and olive letterbox past that) left bare on both sides. The ribbon itself
// never had this problem because it's a bleed already, drawn at 120% of the
// actual viewport rather than of the canvas.
//
// So the row now positions itself the same way: `calc(50% + (x - mid)px *
// var(--canvas-scale))`, i.e. real screen px out from the canvas's own
// centre, and it tiles generously past both sides of the canvas (see
// OVERSCAN) rather than trying to land a last logo exactly on any one edge.
// Overshooting and letting the section's own overflow clip it is what the
// ribbon already does; a logo sliced there reads as the pattern continuing
// off whatever screen it happens to be on, not as a rendering bug — the
// difference from before is that there's no visible gap after the cut.
//
// MARQUEE: the tiled items sit inside one `.marquee-row` wrapper (styles in
// globals.css) rather than being individually animated, sized and placed
// with `inset-0` so every item's own `calc(50% + ...)` math keeps resolving
// against the same box it always has.
//
// THE SHIFT IS ONE FULL CYCLE (every item once), NOT ONE ITEM'S OWN PERIOD —
// shifting by a single period looked seamless on paper (the tiling repeats
// with that period) but wasn't: it rotates which item sits in which slot,
// so the reset from -period back to 0 swaps every logo in place, which reads
// as a visible reshuffle rather than a smooth loop. Shifting by items.length
// periods lands each item back in the exact slot it started in, so the
// reset is genuinely invisible. See `cycleLength` below, and OVERSCAN, which
// has to cover a whole cycle of buffer now rather than just a letterbox
// margin — a marquee running for a whole cycle before resetting needs that
// much untranslated tiling in reserve on the leading side, or the reset
// point becomes visible as a gap instead of a reshuffle.
//
// THE SHIFT IS DIAGONAL, NOT PURELY HORIZONTAL — each item's own `top` is
// baked in for its STATIC design-space x (`y = f(x)` above, a straight line
// of slope `slope`); animating x alone without also moving y along that
// same line drags every item off the ribbon's own diagonal as the animation
// progresses (most visible on the brands row, whose 3deg tilt is the
// steepest), reading as the row sinking, then snapping back into place on
// reset. Translating by `(shift, shift * slope)` together keeps every item
// exactly on `y = f(x)` at every point in the animation, because f is
// linear: f(x + dx) = f(x) + dx * slope, which is exactly this translation.

import type { CSSProperties } from 'react'
import Image from 'next/image'

type LogoRowItem = {
  name: string
  logo: string
  /** Overrides the row's own `rotate` for just this logo. Omit to use the
   *  row's shared angle, same as every logo did before this existed. */
  rotate?: number
}

type LogoRowProps = {
  items: LogoRowItem[]
  /** Gap between one logo's box and the next. */
  gap: number
  /** The ribbon's centre where it crosses the middle of the canvas. */
  centreY: number
  width: number
  height: number
  /**
   * The ribbon's own tilt in degrees. Only decides where each logo sits —
   * the line it follows — never how far the logo itself is turned.
   */
  tilt?: number
  /**
   * How far each logo is turned. Its own value rather than always mirroring
   * `tilt`, because the two answer different questions — `tilt` places a
   * logo on the ribbon's line, `rotate` decides whether the logo's own
   * edges sit parallel to that ribbon. Matching it to `tilt` (as Credibility
   * does for the brand row) is what makes a logo actually parallel; leaving
   * it lower — or at the 0 default — reads as the logo sitting straighter
   * than the ribbon underneath it, which is a legitimate look too, just a
   * different one, not a substitute for parallel.
   */
  rotate?: number
  /**
   * Band's `offsetY`, which a bleed does not get for free (see Band's own
   * doc for `bleed`) — has to be added here the same way Credibility's
   * Ribbon adds it to its own `top`, or the row rides a different line than
   * the ribbon under it.
   */
  offsetY?: number
  /** Which way the marquee drifts. Credibility gives its two rows opposite
   *  directions — a deliberate counter-scroll, not a default worth hiding. */
  direction?: 'left' | 'right'
  /** Design px/second — the same for every row by default, so a wider
   *  period (more gap, bigger logos) just means a longer loop, not a
   *  visually faster one. */
  speed?: number
}

/** Half the canvas, in both axes — what a design coordinate is measured
 *  against to land in the right place on screen. */
const CANVAS_MID_X = 755.5
const CANVAS_MID_Y = 478
const CANVAS_WIDTH = 1511

/**
 * How far past the canvas's own [0, 1511] span to keep tiling, in design px,
 * on each side, BEFORE adding a cycle's worth of marquee buffer (below).
 * Exists for the same reason the ribbon is drawn at 120% of the viewport
 * rather than 100% of the canvas: on a wide monitor the canvas is
 * height-limited and narrower than the screen. 1200 comfortably covers even
 * a 32:9 ultrawide (measured: the canvas falls about 1060px short of the
 * true edge on each side at that aspect).
 */
const LETTERBOX_BUFFER = 1200

export default function LogoRow({
  items,
  gap,
  centreY,
  width,
  height,
  tilt = 0,
  rotate = 0,
  offsetY = 0,
  direction = 'left',
  speed = 35,
}: LogoRowProps) {
  const slope = Math.sin((tilt * Math.PI) / 180)
  const period = width + gap
  const cycleLength = items.length * period

  // The letterbox margin, plus a full cycle so the leading edge always has
  // a cycle's worth of tiling in reserve to scroll into — otherwise the
  // reset point (now a whole cycle away instead of one period) runs past
  // where LETTERBOX_BUFFER alone would have covered it.
  const overscan = LETTERBOX_BUFFER + cycleLength
  const first = Math.floor(-overscan / period)
  const last = Math.ceil((CANVAS_WIDTH + overscan) / period)
  const indexes = Array.from({ length: last - first + 1 }, (_, n) => first + n)

  return (
    <div
      className="marquee-row absolute inset-0"
      style={
        {
          '--marquee-shift': `calc(${cycleLength}px * var(--canvas-scale, 1))`,
          '--marquee-shift-y': `calc(${cycleLength * slope}px * var(--canvas-scale, 1))`,
          '--marquee-duration': `${cycleLength / speed}s`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        } as CSSProperties
      }
    >
      {indexes.map((i) => {
        const left = i * period
        const item = items[((i % items.length) + items.length) % items.length]
        // This logo's own angle if it has one, otherwise the row's shared one.
        const itemRotate = item.rotate ?? rotate
        // Where the ribbon's centre has got to by this logo's own centre.
        const centreX = left + width / 2
        const y = centreY + (centreX - CANVAS_MID_X) * slope

        return (
          <div
            key={i}
            className="absolute"
            style={{
              top: `calc(50% + ${y - height / 2 + offsetY - CANVAS_MID_Y}px * var(--canvas-scale, 1))`,
              left: `calc(50% + ${left - CANVAS_MID_X}px * var(--canvas-scale, 1))`,
              width: `calc(${width}px * var(--canvas-scale, 1))`,
              height: `calc(${height}px * var(--canvas-scale, 1))`,
              transform: itemRotate ? `rotate(${itemRotate}deg)` : undefined,
            }}
          >
            <Image
              src={item.logo}
              alt={item.name}
              fill
              sizes={`${width}px`}
              className="object-contain"
            />
          </div>
        )
      })}
    </div>
  )
}
