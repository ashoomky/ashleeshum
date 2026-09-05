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
  /**
   * The band's height in the design. Most are 956, which is the default;
   * Stats is 321 and How I Work is 1912, a double band.
   *
   * A band shorter than 956 is a strip that sits inline between full bands,
   * so it takes exactly its own scaled height. Anything 956 or taller keeps
   * filling the screen when the scale leaves it short of the viewport, which
   * is what letterboxes a full band on a narrow window — and a double band is
   * taller than the viewport anyway, so the same rule covers it.
   */
  height?: number
  /**
   * Shifts everything in the band down by this many design px, to sit the
   * content in the middle of the screen.
   *
   * The canvas already fills the viewport, so there is no letterbox left to
   * redistribute — a band whose content sits high in its own 956 has to move
   * the content, not the canvas. The frames were laid out against the design's
   * full page, where each band's content had the band above and below it for
   * company; on their own, one to a screen, several of them sit noticeably
   * high. Measured per band as half the difference between the space above the
   * content and the space below it.
   *
   * Applied inside the frame, so it is plain design px and needs no scaling.
   * `bleed` sits outside and is NOT moved by this — a band using both has to
   * offset its bleed itself, or the two come apart.
   */
  offsetY?: number
  /**
   * Extra background, in real px, added above and/or below the canvas —
   * plain flow space outside the 1511x956 coordinate system entirely.
   *
   * This is the one knob for "make this section's background taller" and it
   * is deliberately independent of everything else here: it cannot move
   * `children` (their coordinates are all inside the canvas, not the pad),
   * cannot need rescaling (it is real px, not design px run through
   * `--canvas-scale`), and cannot touch `offsetY` (that still just centres
   * the design's own content inside the canvas; this adds room outside it).
   * Reach for it before reaching for `offsetY` or a taller `height` — both
   * of those work in design-frame coordinates and require redoing the
   * frame's internal centring math, where this never does.
   *
   * Implemented as flex-basis spacers around the canvas rather than section
   * padding, so `bleed`/`bleedOver`'s `calc(50% + ...)` math — which assumes
   * 50% of its containing block is the canvas's own centre — keeps working:
   * they live inside the centring wrapper below, sized to just the canvas
   * area, not the padded section.
   *
   * DON'T USE THIS ON A BAND WITH AN `id`. Any nonzero amount here — not
   * just a large one — makes the section taller than one viewport, because
   * `height`-956-or-more bands already size to `max(100dvh, scaledHeight)`,
   * and scaledHeight can never exceed 100dvh (`--canvas-scale` is computed
   * with vh/956 as one of its two terms, specifically so it can't). So the
   * section is already exactly one screen tall before this runs, and this
   * adds on top of that rather than fitting inside it. Harmless for a band
   * nobody jumps to directly, but a `#id` anchor scrolls to the section's
   * *top*, not to its content's centre — so a padded band lands with its
   * bottom pushed past the fold, reading as content getting cut off. Tried
   * on About, Credibility and the Pillars for breathing room, and reverted
   * for exactly this once they got nav links.
   */
  padTop?: number
  padBottom?: number
  /** For an in-page anchor target, e.g. Nav's links or TravelNotesPopup's
   *  props linking to the section they describe. Plain passthrough to the
   *  `<section>`. */
  id?: string
}

/** The design's standard band. Above this a band fills the screen, below it a
 *  band is a strip and takes its own height. */
const FULL_BAND = 956

export default function Band({
  children,
  className,
  bleed,
  bleedOver,
  height = FULL_BAND,
  offsetY = 0,
  padTop = 0,
  padBottom = 0,
  id,
}: BandProps) {
  const scaledHeight = `calc(${height}px * var(--canvas-scale, 1))`
  const stageHeight = height >= FULL_BAND ? `max(100dvh, ${scaledHeight})` : scaledHeight

  return (
    <section
      id={id}
      className={['flex w-full flex-col overflow-hidden', className].filter(Boolean).join(' ')}
      style={{
        minHeight: padTop || padBottom ? `calc(${stageHeight} + ${padTop + padBottom}px)` : stageHeight,
      }}
    >
      {padTop > 0 && <div aria-hidden className="w-full shrink-0" style={{ height: padTop }} />}

      {/*
        The stage: everything that used to be the section's own content,
        unchanged, just moved down a level so `padTop`/`padBottom` can sit
        outside it as plain siblings. `bleed` and `bleedOver`'s 50%-of-
        container math targets THIS box, sized to exactly the canvas area —
        not the section, which the padding above/below would otherwise throw
        off by making the section taller than the canvas it is centring.
      */}
      <div
        className="relative flex w-full flex-1 items-center justify-center"
        style={{ minHeight: stageHeight }}
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
          style={{ width: 'calc(1511px * var(--canvas-scale, 1))', height: scaledHeight }}
        >
          <div
            className="absolute top-0 left-0 w-canvas origin-top-left overflow-hidden"
            style={{ height, scale: 'var(--canvas-scale, 1)' }}
          >
            {/* Inside the frame, so the offset is design px and scales with it. */}
            <div
              className="absolute inset-0"
              style={offsetY ? { transform: `translateY(${offsetY}px)` } : undefined}
            >
              {children}
            </div>
          </div>
        </div>
        {bleedOver}
      </div>

      {padBottom > 0 && <div aria-hidden className="w-full shrink-0" style={{ height: padBottom }} />}
    </section>
  )
}
