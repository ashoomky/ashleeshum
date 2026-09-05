// components/TestimonialBleed.tsx
//
// The testimonial card's cream reaches only to the canvas edge (x1513, just
// past 1511) because it is sized to the design, not to the screen — on any
// window wider than the canvas's own 1.58 aspect (most laptops), that leaves
// thistle letterbox between the card and the actual edge of the screen.
//
// This is a bleedOver, not a bleed: drawn in front of the frame, starting a
// pixel inside its clipped edge (see Band's own bleedOver doc for why),
// extending to the true right edge of the screen rather than to any fixed
// width. It only needs to match the card's own vertical span — its left edge
// never has to reach the card's x756, because the frame's clip already ends
// well past it.
//
// Computes its open/closed target height the same way TestimonialCard does
// (header + the shared measured quote height, from TestimonialToggle) and
// runs the identical `height` transition on it, rather than copying the
// card's own live rendered height frame by frame — that was tried, and a
// copied value lands a frame or so behind the transition that produced it,
// which read as the two visibly falling out of step. Two independent
// transitions with the same endpoints and duration stay in lockstep; a
// value being chased did not.
//
// The height itself is a LOCAL number — same coordinate space as every other
// design px in this file, since that's what TestimonialCard's `scrollHeight`
// measures — but this element lives OUTSIDE Band's scaled canvas (bleedOver
// is drawn at the section level, not inside `.w-canvas`), where nothing else
// applies that scale for it. So height multiplies by --canvas-scale
// explicitly here, same as `top` and `left` already do below.
//
// A separate client component (rather than a plain function inside a
// section file) because it needs the hook, and the section around it
// (HowIWork) has to stay a server component so ProcessPath can keep reading
// its SVG off disk.

'use client'

import { useTestimonialToggle } from '@/components/TestimonialToggle'

/** Half of HowIWork's own height (1912), not the usual 956 — what a
 *  band-relative y has to be measured against to land in the same screen
 *  position as the card itself, which Band centres on this band's own
 *  height, not the standard one. */
const BAND_MID_Y = 956

const HEADER_HEIGHT = 82

type TestimonialBleedProps = {
  top: number
}

export default function TestimonialBleed({ top }: TestimonialBleedProps) {
  const { open, quoteHeight } = useTestimonialToggle()
  const height = open ? HEADER_HEIGHT + quoteHeight : HEADER_HEIGHT

  return (
    <div
      className="absolute right-0 bg-cream"
      style={{
        top: `calc(50% + ${top - BAND_MID_Y}px * var(--canvas-scale, 1))`,
        height: `calc(${height}px * var(--canvas-scale, 1))`,
        left: 'calc(50% + (1511px * var(--canvas-scale, 1)) / 2 - 1px)',
        transition: 'height 300ms ease',
      }}
    />
  )
}
