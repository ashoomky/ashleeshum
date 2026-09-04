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
   * Fills the letterbox where a block of the design runs off the canvas edge
   * and should carry on to the edge of the screen — the hero's plum panel on
   * the right, or Contact's olive and cream strips on the left.
   *
   * Drawn ON TOP of the frame, so it must be positioned to start at the frame's
   * edge. That edge is computable, because the frame is centred and its width
   * is known: from the section's own box, its right edge sits at
   *
   *   calc(50% + (1511px * var(--canvas-scale)) / 2)
   *
   * and its left edge at 50% minus the same. Overlap that by a pixel. The frame
   * is scaled by a fractional factor, so its clipped edge is antialiased and
   * leaks a 1px hairline of the ground; starting a pixel early covers it.
   * Percentages of the section rather than vw, so a scrollbar cannot shift it.
   */
  bleed?: React.ReactNode
}

export default function Band({ children, className, bleed }: BandProps) {
  return (
    <section
      className={['relative flex h-dvh w-full items-center justify-center overflow-hidden', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className="relative h-band w-canvas shrink-0 overflow-hidden"
        style={{ scale: 'var(--canvas-scale, 1)' }}
      >
        {children}
      </div>
      {bleed}
    </section>
  )
}
