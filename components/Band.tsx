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
//
// READ THIS FIRST — the one rule this component has to keep:
//
// A band must never scroll inside itself. The page is a stack of these and it
// has to read as one continuous scroll, so a section that is its own scroll
// container captures the wheel and stops the page moving until it has scrolled
// to its own end. That is not a hypothetical: it shipped, from an attempt to
// give small screens a pannable window onto the full-size design by clamping
// --canvas-scale at a floor. It made the hero feel stuck and split the plum
// bleed in two. Both are the same fault, and the fix is the sized box below.
//
// The corollary is that a band always fits the viewport, which is why the
// scale has no lower bound and why a phone scales the design right down rather
// than panning it. That is a real problem — 35px body copy lands at 9px on a
// 390px screen — but it is a mobile-layout problem, not one this component can
// solve by making the band bigger than the screen. Nothing here reflows,
// stacks or hides anything, and there is no mobile Figma frame to build a real
// layout from (checked: figmaspec.md documents one frame, "landing page").
// When mobile designs exist, the variant belongs inside each section — a
// breakpoint, or an `md:hidden` / `hidden md:block` pair — not here. Band's
// job stays "fit the given band to the viewport," the same for every section.

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
      className={['relative flex min-h-dvh w-full items-center justify-center overflow-hidden', className]
        .filter(Boolean)
        .join(' ')}
    >
      {bleed}
      {/*
        THE SIZED BOX. This is the load-bearing part, so: CSS `scale` is a
        transform, and transforms do not change layout size. The frame below
        is laid out at its full 1511x956 no matter how far it is scaled down,
        so sizing this wrapper by the frame's own box would leave 956px of
        layout inside a section that is only as tall as the viewport — phantom
        overflow on any screen shorter than 956, which is every laptop.
        That overflow is invisible until something reacts to it, and then it
        turns a section into a nested scroll container: the wheel scrolls the
        section to its end before the page moves at all, and an absolutely
        positioned bleed stops at the padding box while the content carries on
        past it, breaking in two.

        So this wrapper is sized to what the frame actually *looks* like —
        the design box times the scale — and the frame is taken out of flow
        inside it and pinned to the top left, so the visual and the layout
        agree. No phantom overflow, no nested scrolling, one page scroll.
      */}
      <div
        className="relative shrink-0"
        style={{
          width: 'calc(1511px * var(--canvas-scale, 1))',
          height: 'calc(956px * var(--canvas-scale, 1))',
        }}
      >
        <div
          className="absolute top-0 left-0 h-band w-canvas origin-top-left overflow-hidden"
          style={{ scale: 'var(--canvas-scale, 1)' }}
        >
          {children}
        </div>
      </div>
      {bleedOver}
    </section>
  )
}
