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
//
// TWO THINGS THAT BITE when placing an asset:
//
// 1. Some exports have their rotation baked in — the photostrip PNG is already
//    turned 9deg inside a bounding box whose corners are transparent. Passing
//    `rotate` as well turns it twice. Check whether the file's aspect ratio
//    matches the Figma node's before reaching for `rotate`: if it does not, the
//    export is probably the rotated bounding box, and the size to pass is the
//    file's own, not the node's.
//
// 2. `fit` defaults to cover, so an image whose box does not match its aspect
//    ratio is cropped rather than squashed — what Figma does with an image
//    fill. Stretching is almost never what the design meant.

import Image from 'next/image'

type PropProps = {
  src: string
  /** Empty string for anything purely decorative, which is most of these. */
  alt: string
  width: number
  height: number
  top: number
  left: number
  /**
   * Degrees clockwise, about the centre — negative turns anticlockwise. Leave
   * unset when the export already carries the rotation; see the note above.
   */
  rotate?: number
  /** How the image fills its box when the ratios differ. Never stretches. */
  fit?: 'cover' | 'contain'
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
  fit = 'cover',
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
      className={['absolute', fit === 'cover' ? 'object-cover' : 'object-contain', className]
        .filter(Boolean)
        .join(' ')}
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
