@AGENTS.md

# Scalability requirement — routes and mobile

Standing instruction, not a one-off: every future change in this repo,
whoever's making it, keeps the site able to (a) grow past a single route and
(b) not break on a phone. What that means concretely, and what it does not:

**Routes.** New pages are new folders under `app/`, and nothing outside
`app/` should need to know that only "/" exists today. Concretely: don't
hardcode "/" or the current page's shape into a shared component; put copy
and asset paths in `content/`, not inline in a component, so a second route
can reuse them; keep `components/` and `components/sections/` route-agnostic
— a section takes props and reads `content/`, it doesn't assume which page
it's rendered on. This already held before this note was added; the
instruction is to keep holding it, not to restructure anything now.

**The page is one scroll. Never let a section scroll inside itself.** Every
section is a `Band`, built at the Figma frame's exact 1511x956 and scaled to
fit the viewport with `min(vw/1511, vh/956)`. A section that becomes its own
scroll container captures the wheel, so the page stops moving until that
section has scrolled to its own end. This has already been shipped and
reverted once, and it is easy to reintroduce by accident, because CSS `scale`
is a transform and **transforms do not change layout size** — the frame is
laid out at its full 1511x956 however far it is scaled down, so sizing
anything by the frame's own box leaves 956px of layout inside a section only
as tall as the viewport. That phantom overflow is invisible until something
reacts to it, and then it becomes a nested scrollbar and breaks absolutely
positioned bleeds in two. `Band` avoids it by sizing its wrapper to the
frame's *visual* size (`calc(956px * var(--canvas-scale))`) and taking the
frame itself out of flow. Keep that property. If you change `Band`, check
`scrollHeight === clientHeight` on every section at a viewport shorter than
956px — a laptop, e.g. 1440x780 — since taller windows hide the bug.

**Mobile is a known, open problem — don't paper over it here.** Because a
band always fits the viewport, a phone scales the design right down: 0.258 at
390px wide, which puts the About body copy at 9px and the carousel arrows at
11px. Unreadable and untappable, and not fixable by making the band bigger
than the screen — that is exactly the nested-scroll trap above, and below the
viewport width it also adds a horizontal scrollbar. The real fix is a mobile
layout, and there is no mobile Figma frame to build one from (checked:
`figmaspec.md` documents exactly one frame, "landing page"). When mobile
designs exist, the variant belongs inside each section — a breakpoint, or an
`md:hidden`/`hidden md:block` pair — decided per-section against real
content, not solved once in `Band`. Until then, check new sections at a real
phone width (390x844) before calling them done, and say plainly that mobile
is unhandled rather than implying otherwise.

# Motion references — not implemented yet

Design reference for float/wobble motion, saved for when these are actually
built (not yet — static builds only so far):

- **About carousel photo**, **contact-section lotus flower**: continuous
  ambient float (small vertical drift, slow ease-in-out loop).
- **Hero stars**: wobble on mouse proximity/hover, not a constant loop.

Reference: https://www.framer.com/marketplace/components/floating-downloader/
("Floating Downloader" — closed-source paid Framer component; page gives no
inspectable code, easing curve, duration, or translate/rotate values, only
"gently floats to pull attention" plus a click-to-expand/confetti
interaction that doesn't apply here). Useful only as a *visual* reference for
the idle-float feel, not as a source to copy from — when building, implement
directly with CSS `@keyframes`/Motion rather than trying to extract specifics
from that page.
