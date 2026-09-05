// components/sections/LetsWorkTogether.tsx
//
// Figma node 2076:30, the last band. Not a solid ground: two strips stack
// down its left edge — olive from x0-206, cream from x0-144 over it — before
// the plum starts at x206.
//
// Drawn via Band's `bleed`, not as ordinary content: these are meant to run
// down the actual left edge of the screen, and ordinary content is clipped
// at the canvas's own edge (x0), which sits well short of the true edge on
// any window wider than the canvas's 1.58 aspect (most laptops/desktops) —
// the same letterbox gap the testimonial card's bleed patch exists to close.
// `bleed` renders outside that clip, in real screen coordinates, which is
// the only place "reach the edge of the window" is expressible at all.
//
// Each strip is left-0 (the true edge) out to a `width` computed the same
// way Hero's plum panel computes its bleed's `left` — a design x maps to
// `50% + (x - 755.5)px * scale`, and since these start at 0, that mapped
// position doubles as the width needed to reach it exactly.
//
// The spec gives every position as a page coordinate and the band starts at
// y7968, so every y below is the spec's less that — the headline at page
// 8184 is 216 into the band.
//
// NOT OFFSET: content runs from the flower's top (154) to the chips' bottom
// (801), in a 956 band — 154px above, 155px below. Centred within a
// rounding error already, so no offsetY is needed here, unlike most other
// sections — which also means the bleed strips (immune to offsetY, same as
// any bleed) can't drift out of register with the rest of the band anyway.
//
// Static.

import Band from '@/components/Band'
import Prop from '@/components/Prop'
import Chip from '@/components/Chip'
import { contact } from '@/content'

/** Half the canvas width (1511/2), for mapping a design x into the section's
 *  own box — see Band's `bleed` doc. */
const CANVAS_MID_X = 755.5

function EdgeStrip({ toX, className }: { toX: number; className: string }) {
  return (
    <div
      className={['absolute inset-y-0 left-0', className].join(' ')}
      style={{ width: `calc(50% + ${toX - CANVAS_MID_X}px * var(--canvas-scale, 1))` }}
    />
  )
}

export default function LetsWorkTogether() {
  return (
    <Band
      id="contact"
      className="bg-plum"
      bleed={
        <>
          <EdgeStrip toX={206} className="bg-olive" />
          <EdgeStrip toX={144} className="bg-cream" />
        </>
      }
    >
      {/* Headline, page 391,8184, width 720 — Bootzy 200 / 8px, 78.165% line-height. */}
      <h2
        className="absolute font-signature text-contact-heading text-cream"
        style={{ top: 216, left: 391, width: 720 }}
      >
        {contact.heading}
      </h2>

      {/* Flower, 482x425 at 773,8122. */}
      <Prop src={contact.props.flower} alt="" width={482} height={425} top={154} left={773} />

      {/*
        Email pill, 350x40 at 391,8729. Chip is a plain span, so the anchor
        carries the position and the link behaviour, and Chip stays just the
        visual pill inside it — Helvetica 20/0.6 plum on cream is Chip's own
        default plus the spec's "Contact chip text" size.
      */}
      <a href={`mailto:${contact.email}`} className="absolute no-underline" style={{ top: 761, left: 391 }}>
        <Chip className="w-chip-email font-body text-caption">{contact.email}</Chip>
      </a>

      {/*
        Phone pill, 213x40 at 763,8729. The tel: URI drops the spaces content
        displays for reading — a href isn't a display string, and dialers
        aren't guaranteed to tolerate raw spaces the way most happen to.
      */}
      <a
        href={`tel:${contact.phone.replace(/\s+/g, '')}`}
        className="absolute no-underline"
        style={{ top: 761, left: 763 }}
      >
        <Chip className="w-chip-phone font-body text-caption">{contact.phone}</Chip>
      </a>
    </Band>
  )
}
