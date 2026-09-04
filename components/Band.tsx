// components/Band.tsx
//
// One full-screen section. Every band in the design is 1511 x 956, and the
// sections are built at those exact coordinates, so this keeps that frame
// intact and scales the whole thing to fit the viewport instead of trying to
// reflow it.
//
// Scaling rather than stretching matters: 956px is taller than the usable
// height of a 13" laptop, so a band left at its design height would overflow
// the screen no matter what height the section claimed. The scale factor is
// min(vw/1511, vh/956), set once on <html> as --canvas-scale by a small script
// in the root layout, so it is correct on the first paint and there is no
// flash of an unscaled band.
//
// The frame keeps its own overflow-hidden so elements that run past the canvas
// edge — the plum panel reaches x1563 — still clip at 1511 exactly as they do
// in Figma, rather than spilling into the letterbox.

type BandProps = {
  children: React.ReactNode
  /** The section's ground, e.g. `bg-thistle`. Fills the whole viewport. */
  className?: string
  /**
   * A block of the design that runs off the canvas and should carry on to the
   * edge of the screen — the hero's plum panel on the right, or Contact's olive
   * and cream strips on the left. Give it `inset-y-0` and it also fills the
   * letterbox above and below, which appears whenever the viewport is narrower
   * than the canvas's 1.58 aspect and the scale is width-limited.
   *
   * Drawn BEHIND the frame, so it must start where its block starts in the
   * design, not at the frame's edge — otherwise it paints over the artwork in
   * front of it. The frame is centred and its width is known, so a design x
   * maps to the section's own box as
   *
   *   calc(50% + (x - 755.5)px * var(--canvas-scale))
   *
   * 755.5 being half of 1511. Percentages of the section rather than vw, so a
   * scrollbar cannot shift it once the page scrolls.
   *
   * Sitting behind also means no seam: the frame is scaled by a fractional
   * factor, so its clipped edge is antialiased, and anything painted there
   * blends into whatever is under it. Keep the frame's background transparent
   * and that is this bleed rather than the ground.
   */
  bleed?: React.ReactNode
  /**
   * The same idea, drawn IN FRONT of the frame, for the strip just outside its
   * edge. The frame is clipped — it has to be, or anything the design places
   * past the canvas would spill into the letterbox, as the paper strip's y-4
   * would — and that clip is antialiased at a fractional scale, so it leaves a
   * hairline of whatever is behind it. `bleed` cannot cover that from below.
   *
   * Overlap the frame's edge by a pixel to hide it, e.g. for the right edge
   *
   *   left: calc(50% + (1511px * var(--canvas-scale)) / 2 - 1px)
   *
   * Keep it strictly outside the canvas, plus that one pixel: it paints over
   * the artwork, so anything further in would cover the design.
   */
  bleedOver?: React.ReactNode
}

export default function Band({ children, className, bleed, bleedOver }: BandProps) {
  return (
    <section
      className={['relative flex h-dvh w-full items-center justify-center overflow-hidden', className]
        .filter(Boolean)
        .join(' ')}
    >
      {bleed}
      <div
        className="relative h-band w-canvas shrink-0 overflow-hidden"
        style={{ scale: 'var(--canvas-scale, 1)' }}
      >
        {children}
      </div>
      {bleedOver}
    </section>
  )
}
