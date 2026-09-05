// components/sections/HowIWork.tsx
//
// A double band, thistle, 1912 tall — Band's `height` prop covers this, same
// rule as any band 956 or taller: it fills the screen and then some, and
// still isn't its own scroll container.
//
// The spec gives every position as a page coordinate and the band starts at
// y6056, so every y below is the spec's less that — the cream bar at page
// 6180 is 124 into the band.
//
// MEASURED: the cream bar, the path SVG's box, and all four step anchors.
//
// NOT MEASURED: the step text boxes' widths (the spec gives each step's
// anchor point, not a text box) and the heading bar's own padding. Both are
// placed by eye against the reference screenshot's line wraps and spacing.
//
// This stays a server component (no 'use client') even though the
// testimonial card is interactive — ProcessPath reads its SVG off disk at
// render time, which only works server-side. TestimonialToggleProvider and
// TestimonialBleed carry the one interactive piece as client components of
// their own; see TestimonialToggle.tsx for how a card and a bleed patch in
// two different slots of the same Band share that state.
//
// The path itself is still just the finished line — nothing draws it yet.

import Band from '@/components/Band'
import ProcessPath from '@/components/ProcessPath'
import TestimonialCard from '@/components/TestimonialCard'
import TestimonialBleed from '@/components/TestimonialBleed'
import { TestimonialToggleProvider } from '@/components/TestimonialToggle'
import { processHeading, processPath, processSteps, testimonials } from '@/content'

/** Step anchors, page 6411 / 6559 / 7087 / 7694 less the band's 6056. Widths
 *  are placed by eye, matched to the reference screenshot's line wraps. */
const STEPS = [
  { top: 355, left: 122, width: 280 },
  { top: 503, left: 1063, width: 340 },
  { top: 1031, left: 201, width: 250 },
  { top: 1638, left: 533, width: 300 },
]

const TESTIMONIAL_TOP = 1287

export default function HowIWork() {
  const testimonial = testimonials[0]

  return (
    <TestimonialToggleProvider>
      <Band
        id="process"
        className="bg-thistle"
        height={1912}
        bleedOver={<TestimonialBleed top={TESTIMONIAL_TOP} />}
      >
        {/* Cream bar, 1334x113 at 89,124. "how", "i" and "work" are spread
            edge to edge rather than set with one tracking value — the gaps
            between them are wider and uneven, a word spacing, not a letter one. */}
        <div
          className="absolute flex items-center justify-between bg-cream px-16"
          style={{ top: 124, left: 89, width: 1334, height: 113 }}
        >
          {processHeading.split(' ').map((word) => (
            <span key={word} className="font-heading text-process-heading text-plum">
              {word}
            </span>
          ))}
        </div>

        <ProcessPath src={processPath} top={372.5} left={243.7} width={1020.6} height={1281} />

        {processSteps.map((step, i) => (
          <div
            key={step.n}
            className="absolute flex items-start gap-4"
            style={{ top: STEPS[i].top, left: STEPS[i].left }}
          >
            <span className="font-body text-body-lg text-plum">{step.n})</span>
            {/* Width sits on the text itself, not the row, so the wrap targets
                measured phrase widths directly rather than fighting the
                number's own width and the gap between them. */}
            <p className="font-body text-process-step text-cream" style={{ width: STEPS[i].width }}>
              {step.text}
            </p>
          </div>
        ))}

        <TestimonialCard
          handle={testimonial.handle}
          label={testimonial.label}
          quote={testimonial.quote}
          top={TESTIMONIAL_TOP}
          left={756}
          width={757}
        />
      </Band>
    </TestimonialToggleProvider>
  )
}
