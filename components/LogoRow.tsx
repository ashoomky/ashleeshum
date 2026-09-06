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
// POSITIONS ARE GENERATED, NOT LISTED: a fixed `lefts` array is what produced
// the bug this replaced — a short, hand-placed list runs out partway across
// the ribbon, leaving it visibly empty past the last logo. Instead the row
// tiles `items` end to end, cycling back to the start of the list, all the
// way from the canvas's left edge to its right.
//
// THE GAP IS A TARGET, NOT A FIXED VALUE. Filling the full canvas width with
// a constant gap almost never lands the last logo exactly on the far edge —
// it either stops short (blank ribbon after it) or overshoots (the last logo
// sliced in half by the canvas clip, which read as a stray black triangle
// when this was `Math.ceil(...) + 1` and the sliced logo happened to be
// Charles & Keith's solid-black square). Both are wrong for a row that's
// meant to look edge-to-edge, so instead the row picks however many logos —
// the count nearest `gap` — actually divide the width evenly, then spreads
// them at the gap THAT does, which lands the last logo's right edge exactly
// on the canvas's right edge with none held back.

import Image from 'next/image'

type LogoRowItem = { name: string; logo: string }

type LogoRowProps = {
  items: LogoRowItem[]
  /** Roughly how far apart each logo should sit — see the file header for why
   *  this is adjusted slightly rather than used exactly. */
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
   * How far each logo is turned, which is deliberately its own value. Matching
   * it to `tilt` makes a row sit dead parallel to its ribbon, and at the
   * ribbons' angles that reads as more tilt than the design wants; turning
   * them less than the ribbon they ride keeps the row calmer than the ribbon
   * under it. Defaults to upright.
   */
  rotate?: number
}

/** Half the canvas — the point the ribbons are turned about. */
const CANVAS_MID_X = 755.5

/** The canvas's own width — both edges a tiled row now fills exactly. */
const CANVAS_WIDTH = 1511

/**
 * How many copies of a `width`-wide logo, `targetGap` apart, best fill
 * `available` px edge to edge — then the gap that actually makes that count
 * span exactly `available`, which is never quite `targetGap` (that's the
 * point: a whole number of logos essentially never divides the width with
 * the exact gap asked for).
 */
function fill(available: number, width: number, targetGap: number) {
  const period = width + targetGap
  const low = Math.max(1, Math.floor(available / period))
  const high = low + 1
  let count = low
  let bestGap = count > 1 ? (available - count * width) / (count - 1) : available - width
  for (const candidate of [low, high]) {
    const candidateGap = candidate > 1 ? (available - candidate * width) / (candidate - 1) : available - width
    if (candidateGap < 0) continue
    if (Math.abs(candidateGap - targetGap) < Math.abs(bestGap - targetGap)) {
      count = candidate
      bestGap = candidateGap
    }
  }
  return { count, gap: bestGap }
}

export default function LogoRow({
  items,
  gap,
  centreY,
  width,
  height,
  tilt = 0,
  rotate = 0,
}: LogoRowProps) {
  const slope = Math.sin((tilt * Math.PI) / 180)
  const { count, gap: actualGap } = fill(CANVAS_WIDTH, width, gap)
  const period = width + actualGap

  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const item = items[i % items.length]
        const left = i * period
        // Where the ribbon's centre has got to by this logo's own centre.
        const centreX = left + width / 2
        const y = centreY + (centreX - CANVAS_MID_X) * slope

        return (
          <div
            key={`${item.name}-${i}`}
            className="absolute"
            style={{
              top: y - height / 2,
              left,
              width,
              height,
              transform: rotate ? `rotate(${rotate}deg)` : undefined,
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
    </>
  )
}
