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
// Static by design. The one animated node in the Figma file is a lifestyle
// prop, not this.

import Image from 'next/image'

export type PhoneFrameSize = 'default' | 'large'

type PhoneFrameProps = {
  /** Poster, video or image to show in the screen. */
  children?: React.ReactNode
  /** 'default' is the 309x549 pillar frame, 'large' the 375x666 in Credibility. */
  size?: PhoneFrameSize
  /** For placing and rotating the frame — the sections own that, not this. */
  className?: string
}

/**
 * Written out in full rather than composed, so Tailwind's scanner sees the
 * class names. `sizes` matches the rendered width to keep the srcset honest.
 */
const SIZES: Record<PhoneFrameSize, { box: string; imageSizes: string }> = {
  default: { box: 'w-phone h-phone', imageSizes: '309px' },
  large: { box: 'w-phone-lg h-phone-lg', imageSizes: '375px' },
}

export default function PhoneFrame({
  children,
  size = 'default',
  className,
}: PhoneFrameProps) {
  const { box, imageSizes } = SIZES[size]

  return (
    <div className={['relative', box, className].filter(Boolean).join(' ')}>
      {/* The screen. Sits behind the frame art and is clipped to the window. */}
      <div className="absolute left-screen-l right-screen-r top-screen-t bottom-screen-b overflow-hidden">
        {children}
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
}
