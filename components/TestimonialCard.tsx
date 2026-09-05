// components/TestimonialCard.tsx
//
// One testimonial: a cream header bar — the handle left, the label right —
// that opens onto a cream body box with the quote, justified. Collapsed by
// default; the header is the toggle, so clicking it drops the quote down and
// clicking again collapses it.
//
// Reads open/toggle from TestimonialToggle's context rather than taking them
// as props: the header lives here, but the screen-edge bleed patch beside it
// (HowIWork's `TestimonialBleed`) needs the same state to size itself, and
// that patch is rendered in a completely different part of the tree (Band's
// `bleedOver` slot) — context is what lets both read one shared value
// instead of separate `useState`s that could drift apart.
//
// The open height animates via `max-height`, sized to the quote's own
// `scrollHeight` rather than a hard-coded number — the quote's height
// depends on how it wraps at this width, which isn't worth hand-measuring.
// That measurement is written into TestimonialToggle's context (not just
// kept local) so the bleed patch can compute the identical open/closed
// target and run its own matching CSS transition — see that context file
// for why a shared fixed target, not a continuously-copied live value, is
// what keeps the two moving in lockstep.

'use client'

import { useLayoutEffect, useRef } from 'react'
import { useTestimonialToggle } from '@/components/TestimonialToggle'

type TestimonialCardProps = {
  handle: string
  label: string
  quote: string
  width: number
  top: number
  left: number
}

const HEADER_HEIGHT = 82

export default function TestimonialCard({ handle, label, quote, width, top, left }: TestimonialCardProps) {
  const { open, toggle, quoteHeight, setQuoteHeight } = useTestimonialToggle()
  const quoteRef = useRef<HTMLParagraphElement>(null)

  // Re-measures whenever the quote or the card's own width could change its
  // wrap, so the open height never lags behind what the paragraph actually
  // needs. scrollHeight, not getBoundingClientRect: this card sits inside
  // Band's scaled canvas, so getBoundingClientRect's number is post-scale
  // (screen px), but `maxHeight` below is a plain CSS property applying in
  // this element's own local (pre-scale) space — same space scrollHeight
  // measures in, and what TestimonialBleed's own scale multiplication
  // expects to receive.
  useLayoutEffect(() => {
    if (quoteRef.current) setQuoteHeight(quoteRef.current.scrollHeight)
  }, [quote, width, setQuoteHeight])

  return (
    <div className="absolute" style={{ top, left, width }}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between border-b border-plum bg-cream px-8 text-left"
        style={{ height: HEADER_HEIGHT }}
      >
        <span className="font-signature text-testimonial-head text-plum">{handle}</span>
        <span className="font-signature text-testimonial-head text-plum">{label}</span>
      </button>

      {/* max-height animates between 0 and the quote's own measured height,
          in step with TestimonialBleed's identical transition on the same
          two numbers. */}
      <div
        className="overflow-hidden bg-cream"
        style={{ maxHeight: open ? quoteHeight : 0, transition: 'max-height 300ms ease' }}
      >
        <p ref={quoteRef} className="text-justify font-body text-body text-plum px-8 py-6">
          {quote}
        </p>
      </div>
    </div>
  )
}
