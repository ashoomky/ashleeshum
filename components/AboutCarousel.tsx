// components/AboutCarousel.tsx
//
// The photos in the camera. The camera's LCD is a real transparent cut-out —
// 704x534 inside a 1228x698 file — so the photo sits UNDER the camera art and
// shows through it, the same trick PhoneFrame uses. The camera then frames it
// for free, and the bezel trims the edges.
//
// Interactive, so this is the one client component in the build: the arrows
// move the index and the photo and caption follow it.
//
// The image is absolutely positioned inside its own box, so the float planned
// for M4 can drift it without dragging the caption or the arrows around.
//
// A caveat for the float: the exports do not share a trim. katara carries
// 169px of transparent padding above its artwork where others carry almost
// none, so each photo sits differently inside the screen and they appear to
// jump as you page through. object-contain keeps them all whole, but they want
// re-exporting to a common crop.

'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { AboutSlide } from '@/content'

type Box = { top: number; left: number; width: number; height: number }

type AboutCarouselProps = {
  slides: AboutSlide[]
  /** The camera's screen cut-out, in band coordinates. */
  screen: Box
  /** The caption, centred under the camera. */
  caption: { top: number; left: number; width: number }
  /** Arrow buttons: shared y, and the x of each. */
  arrows: { top: number; left: number; right: number }
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M15 4 L7 12 L15 20' : 'M9 4 L17 12 L9 20'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function AboutCarousel({ slides, screen, caption, arrows }: AboutCarouselProps) {
  const [index, setIndex] = useState(0)
  const slide = slides[index]
  const step = (by: number) => setIndex((n) => (n + by + slides.length) % slides.length)

  // The alt copy in content is still a [BRACKETS] placeholder. Announcing that
  // is worse than announcing nothing, so until real alt text exists the photo
  // is decorative and the caption carries the meaning. Real copy starts being
  // used the moment it replaces the placeholder.
  const alt = slide.alt.startsWith('[') ? '' : slide.alt

  const button =
    'absolute flex h-11 w-11 items-center justify-center rounded-full text-plum ' +
    'transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 ' +
    'focus-visible:outline-offset-2 focus-visible:outline-plum'

  return (
    <>
      {/* Under the camera art, showing through the screen. */}
      <div className="absolute" style={screen}>
        <Image
          key={slide.image}
          src={slide.image}
          alt={alt}
          fill
          sizes={`${screen.width}px`}
          className="object-contain"
        />
      </div>

      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous photo"
        className={button}
        style={{ top: arrows.top, left: arrows.left }}
      >
        <Chevron direction="left" />
      </button>

      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next photo"
        className={button}
        style={{ top: arrows.top, left: arrows.right }}
      >
        <Chevron direction="right" />
      </button>

      {/* Announced on change, so the caption is not silent to a screen reader. */}
      <p
        aria-live="polite"
        className="absolute text-center font-body text-body-sm text-olive"
        style={{ top: caption.top, left: caption.left, width: caption.width }}
      >
        {slide.caption}
      </p>
    </>
  )
}
