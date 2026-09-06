// components/AboutCarousel.tsx
//
// The rotating half of About. Every slide is a peer — the camera included —
// drawn into one slot and captioned on one line beneath it. The camera is not
// a frame the photos sit inside; it takes its turn like the rest, which is why
// there is a single slot here rather than a screen cut-out to fill.
//
// Slides are letterboxed into the slot with object-contain, never cropped or
// stretched: they disagree wildly on aspect ratio — the camera is 1.76 wide,
// katara is square — and the slot is sized to the camera, which is the only
// one of them the spec measures.
//
// Interactive, so this is the one client component in the build: the arrows
// move the index and the slide and caption follow it.
//
// The image is absolutely positioned inside its own box, so the float planned
// for M4 can drift it without dragging the caption or the arrows around.
//
// A caveat for that float: the exports do not share a trim. katara carries
// 169px of transparent padding above its artwork where others carry almost
// none, so slides sit differently in the slot and appear to jump as you page
// through. object-contain keeps them whole, but they want re-exporting to a
// common crop.
//
// The camera slide alone also carries a video: camera.png's screen is a real
// transparent cutout (confirmed against the file's own alpha channel), same
// trick as PhoneFrame's bezel, so the clip sits in the DOM before the image
// and shows through it rather than needing a slot of its own. It only plays
// while this is the visible slide — the video unmounts like any other slide's
// image does the moment you page away, so nothing plays or downloads off
// screen.

'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { AboutSlide } from '@/content'

/**
 * camera.png's screen cutout as a percentage of the file's own 1228x698 box —
 * measured off the export's alpha channel, not eyeballed, same reasoning as
 * PhoneFrame's SCREEN_INSET. Only meaningful for a slide whose aspect ratio
 * matches the slot (the camera's own 614x349 slot is that ratio by
 * construction), so this is applied to the slot's own box directly rather
 * than computed against the rendered image size.
 */
const SCREEN_INSET = { left: 11.156, right: 31.759, top: 14.040, bottom: 9.885 }

type Box = { top: number; left: number; width: number; height: number }

type AboutCarouselProps = {
  slides: AboutSlide[]
  /** Where each slide draws, in band coordinates. Sized to the camera. */
  slot: Box
  /** The caption, centred under the slot. */
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

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 9v6h4l5 4V5L8 9H4Z"
        fill="currentColor"
      />
      {muted ? (
        <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <path
          d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}

export default function AboutCarousel({ slides, slot, caption, arrows }: AboutCarouselProps) {
  const [index, setIndex] = useState(0)
  const [muted, setMuted] = useState(true)
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
      {/* The slot every slide takes its turn in, the camera included. */}
      <div className="absolute" style={slot}>
        {slide.video && (
          <>
            <video
              key={slide.video}
              src={slide.video}
              poster={slide.posterImage}
              autoPlay
              loop
              muted={muted}
              playsInline
              className="absolute object-cover"
              style={{
                // `<video>` is a replaced element: an absolutely positioned
                // one sized only by left/right/top/bottom keeps its intrinsic
                // (decoded) size rather than stretching to fill that box, so
                // width/height need to be explicit percentages rather than
                // left+right and top+bottom alone.
                left: `${SCREEN_INSET.left}%`,
                top: `${SCREEN_INSET.top}%`,
                width: `${100 - SCREEN_INSET.left - SCREEN_INSET.right}%`,
                height: `${100 - SCREEN_INSET.top - SCREEN_INSET.bottom}%`,
              }}
            />
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? 'Unmute video' : 'Mute video'}
              aria-pressed={!muted}
              className="absolute z-10 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-cream transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              style={{
                // Corner of the video itself, not the camera body — same
                // insets as the video's own box, plus a small margin so the
                // button sits just inside its bottom-right corner.
                right: `calc(${SCREEN_INSET.right}% + 8px)`,
                bottom: `calc(${SCREEN_INSET.bottom}% + 8px)`,
              }}
            >
              <SpeakerIcon muted={muted} />
            </button>
          </>
        )}
        <Image
          key={slide.image}
          src={slide.image}
          alt={alt}
          fill
          sizes={`${slot.width}px`}
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
