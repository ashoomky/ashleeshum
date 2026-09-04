// components/Prop.tsx
//
// A cut-out image pinned to an exact spot: the monogram, the flower, the
// camera, the photostrip, the stars, the stickers. Every decorative image in
// the design is one of these.
//
// Position, size and rotation come straight off the Figma frame and are applied
// as inline styles rather than utilities. That is deliberate, and not a hole in
// the no-arbitrary-values rule: the rule exists so repeated design values live
// in one place, and there is nothing repeated about `left: 1137px` — each prop
// sits somewhere unique. Tokens keep covering the values that do repeat.
//
// Coordinates resolve against the nearest positioned ancestor, so the section
// wrapping these needs `relative`.

import Image from 'next/image'

type PropProps = {
  src: string
  /** Empty string for anything purely decorative, which is most of these. */
  alt: string
  width: number
  height: number
  top: number
  left: number
  /** Degrees clockwise, about the centre — negative turns anticlockwise. */
  rotate?: number
  /** Set on above-the-fold props so they are not lazy-loaded. */
  priority?: boolean
  /** For anything the placement itself does not cover, e.g. z-order. */
  className?: string
}

export default function Prop({
  src,
  alt,
  width,
  height,
  top,
  left,
  rotate,
  priority,
  className,
}: PropProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={['absolute', className].filter(Boolean).join(' ')}
      style={{
        top,
        left,
        // Repeated in CSS because Tailwind's preflight sets img { height: auto },
        // which otherwise re-derives the height from the width and quietly
        // ignores the measured box.
        width,
        height,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
    />
  )
}
