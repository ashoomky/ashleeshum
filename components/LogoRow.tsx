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
// THE ROW FOLLOWS THE RIBBON. The ribbons are turned a few degrees, so their
// centre line climbs or falls across the canvas — ribbon one drops about 38px
// between the middle of the canvas and its right edge. A row pinned to a
// single y therefore rides higher and higher up the ribbon the further along
// it goes, and eventually breaks out of the top. So each logo takes its y from
// where the ribbon's centre actually is at that logo's x, which is what keeps
// a row evenly seated the whole way across.

import Image from 'next/image'

type LogoRowItem = { name: string; logo: string }

type LogoRowProps = {
  items: LogoRowItem[]
  /** Left edge of each logo's box, in order. */
  lefts: number[]
  /** The ribbon's centre where it crosses the middle of the canvas. */
  centreY: number
  width: number
  height: number
  /**
   * The ribbon's tilt in degrees. Logos turn by it and follow the line it
   * puts the ribbon on; leave it off for a row on level ground.
   */
  rotate?: number
}

/** Half the canvas — the point the ribbons are turned about. */
const CANVAS_MID_X = 755.5

export default function LogoRow({
  items,
  lefts,
  centreY,
  width,
  height,
  rotate = 0,
}: LogoRowProps) {
  const tilt = Math.sin((rotate * Math.PI) / 180)

  return (
    <>
      {items.map((item, i) => {
        // Where the ribbon's centre has got to by this logo's own centre.
        const centreX = lefts[i] + width / 2
        const y = centreY + (centreX - CANVAS_MID_X) * tilt

        return (
          <div
            key={item.name}
            className="absolute"
            style={{
              top: y - height / 2,
              left: lefts[i],
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
