// components/LogoRow.tsx
//
// A row of logos on one of Credibility's cream ribbons. Used twice: the brands
// Ashlee has worked with, and the study and certification marks.
//
// Every logo gets the same box and is contained within it, so a row keeps one
// common height whatever each mark's proportions are. That matters more than
// it sounds: the credential wordmarks run from 1.74 to 3.45 wide-to-tall, so
// sizing them by a square box would leave HubSpot a third the height of the
// others. Give a row a box as wide as its widest mark needs and they all land
// on the same baseline at their own natural widths.
//
// Rows are positioned by their vertical centre rather than their top, because
// that is how the spec records them — a range of a few px that the marks are
// centred on, not a top edge they hang from.
//
// HONEST LABELLING. Anything that is not a paid partnership is marked, and the
// footnote saying what the marker means is rendered under the row. The marker
// is not decorative: it also goes into the logo's alt text, so the distinction
// survives for anyone who cannot see the asterisk.

import Image from 'next/image'
import type { Relationship } from '@/content'

type LogoRowItem = {
  name: string
  logo: string
  /** Absent on rows where the distinction does not apply, e.g. credentials. */
  relationship?: Relationship
}

type LogoRowProps = {
  items: LogoRowItem[]
  /** Left edge of each logo's box, in order, as the spec gives them. */
  lefts: number[]
  /** The line the row is centred on. */
  centreY: number
  width: number
  height: number
  /** Degrees, to sit with the ribbon the row rides on. */
  rotate?: number
  /** Shown under the row when anything in it is not a paid partnership. */
  footnote?: string
  footnoteTop?: number
}

export default function LogoRow({
  items,
  lefts,
  centreY,
  width,
  height,
  rotate,
  footnote,
  footnoteTop,
}: LogoRowProps) {
  const needsFootnote = items.some((i) => i.relationship && i.relationship !== 'paid')

  return (
    <>
      {items.map((item, i) => {
        const marked = Boolean(item.relationship && item.relationship !== 'paid')
        return (
          <div
            key={item.name}
            className="absolute"
            style={{
              top: centreY - height / 2,
              left: lefts[i],
              width,
              height,
              transform: rotate ? `rotate(${rotate}deg)` : undefined,
            }}
          >
            <Image
              src={item.logo}
              // The relationship rides along in the name, so the asterisk is
              // not the only place the distinction is made.
              alt={marked ? `${item.name} (${item.relationship})` : item.name}
              fill
              sizes={`${width}px`}
              className="object-contain object-left"
            />
            {marked && (
              <span aria-hidden className="absolute top-0 left-0 font-body text-caption text-cream">
                *
              </span>
            )}
          </div>
        )
      })}

      {footnote && needsFootnote && footnoteTop !== undefined && (
        // Held to the row's own span so it wraps under the logos instead of
        // running off the canvas — unconstrained it is about 700px of text.
        <p
          className="absolute font-body text-caption text-cream"
          style={{
            top: footnoteTop,
            left: lefts[0],
            width: lefts[lefts.length - 1] + width - lefts[0],
          }}
        >
          * {footnote}
        </p>
      )}
    </>
  )
}
