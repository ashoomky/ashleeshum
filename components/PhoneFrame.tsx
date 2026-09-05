// components/PhoneFrame.tsx
//
// The phone mockup, reused ten times across the page: three per pillar section
// plus the large one in Credibility. The frame is the exported art
// (props/phone-frame.png), and whatever is passed as children shows through the
// screen.
//
// The screen in that PNG is a genuine transparent cut-out, so children sit
// UNDER the image rather than over it. Two things fall out of that, both
// wanted: the notch is painted over the content the way a real screenshot sits
// under a real notch, and the bezel — opaque, with the screen's rounded corners
// cut into it — masks the content corners for us, so the slot needs no radius
// of its own.
//
// `orientation="landscape"` exists for exactly one caller today (Travel's
// third phone, which the design turns 90deg and which now holds a genuinely
// landscape reel) but is built as a real prop rather than a one-off, since
// "a sideways phone with landscape content" is a real, reusable shape, not a
// property of that one section.
//
// The naive way to turn a phone sideways is to rotate the whole PhoneFrame
// from outside, which is what Travel's third phone did before it held real
// content. That rotates the SCREEN CONTENT too — fine for an empty screen,
// wrong the moment there's a video in it, because a genuinely landscape clip
// rotated 90deg reads sideways to the viewer. `orientation="landscape"`
// fixes this by rotating only the frame internally and counter-rotating
// `children` by the same amount, so the bezel turns but whatever's on the
// screen doesn't. The two rotations are independent: only the wrapper size
// (which must swap to the turned footprint) and the counter-rotation are
// specific to this component; the caller just asks for landscape and drops
// in ordinary landscape content.
//
// Static by design otherwise. The one animated node in the Figma file is a
// lifestyle prop, not this.

import Image from 'next/image'

export type PhoneFrameSize = 'default' | 'large'
export type PhoneFrameOrientation = 'portrait' | 'landscape'

type PhoneFrameProps = {
  /** Poster, video or image to show in the screen. In landscape mode this
   *  should be ordinary (unrotated) landscape content — the counter-rotation
   *  is handled here, not by the caller. */
  children?: React.ReactNode
  /** 'default' is the 309x549 pillar frame, 'large' the 375x666 in Credibility. */
  size?: PhoneFrameSize
  /** 'landscape' turns the frame 90deg and counter-turns the screen content
   *  the same amount, so the bezel reads sideways but what's on the screen
   *  doesn't. See the file header for why this beats rotating the whole
   *  component from outside. */
  orientation?: PhoneFrameOrientation
  /** For placing the frame — the sections own that, not this. Positions the
   *  turned footprint in landscape mode (width/height already swapped), not
   *  the underlying portrait artwork. */
  className?: string
}

/** Design px per size — the same numbers `w-phone`/`h-phone` etc. resolve to,
 *  duplicated here because the landscape footprint needs them swapped
 *  (549x309, not 309x549), which a fixed Tailwind class can't express. */
const DIMENSIONS: Record<PhoneFrameSize, { width: number; height: number }> = {
  default: { width: 309, height: 549 },
  large: { width: 375, height: 666 },
}

const IMAGE_SIZES: Record<PhoneFrameSize, string> = {
  default: '309px',
  large: '375px',
}

/** The screen cutout's inset from each edge, as a percentage of the frame's
 *  own box — must match `inset.screen-*` in tailwind.config.ts, which is
 *  where these were actually measured (off the phone-frame.png export
 *  itself). Needed here as numbers, not Tailwind classes, to compute the
 *  screen's actual pixel size for the counter-rotation wrapper below. */
const SCREEN_INSET = { left: 12.133, right: 11.867, top: 3.679, bottom: 3.604 }

export default function PhoneFrame({
  children,
  size = 'default',
  orientation = 'portrait',
  className,
}: PhoneFrameProps) {
  const { width, height } = DIMENSIONS[size]
  const imageSizes = IMAGE_SIZES[size]
  const landscape = orientation === 'landscape'

  const screenWidth = width * (1 - (SCREEN_INSET.left + SCREEN_INSET.right) / 100)
  const screenHeight = height * (1 - (SCREEN_INSET.top + SCREEN_INSET.bottom) / 100)

  const frame = (
    <div className="relative" style={{ width, height }}>
      {/* The screen. Sits behind the frame art and is clipped to the window. */}
      <div className="absolute left-screen-l right-screen-r top-screen-t bottom-screen-b overflow-hidden">
        {landscape ? (
          // Counter-rotated and dimension-swapped, so it presents children a
          // real landscape box to fill (w-full h-full) and, once the outer
          // +90deg below is applied on top of this -90deg, cancels out to 0 —
          // the content reads upright despite the bezel around it turning.
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              width: screenHeight,
              height: screenWidth,
              transform: 'translate(-50%, -50%) rotate(-90deg)',
            }}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </div>

      {/* Decorative: the frame carries no meaning the content doesn't already. */}
      <Image
        src="/props/phone-frame.png"
        alt=""
        fill
        sizes={imageSizes}
        className="pointer-events-none select-none object-contain"
      />
    </div>
  )

  if (!landscape) {
    return <div className={['relative', className].filter(Boolean).join(' ')} style={{ width, height }}>{frame}</div>
  }

  return (
    // Footprint is the swapped (turned) size, so a caller can position this
    // by its own top-left like any other box — no extra rotation math needed
    // at the call site, unlike the old external-rotate approach.
    <div className={['relative', className].filter(Boolean).join(' ')} style={{ width: height, height: width }}>
      <div
        className="absolute top-1/2 left-1/2"
        style={{ width, height, transform: 'translate(-50%, -50%) rotate(90deg)' }}
      >
        {frame}
      </div>
    </div>
  )
}
