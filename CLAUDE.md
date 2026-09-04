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

**Mobile.** This is the part that needed an actual fix, not just a rule.
Every section is built at the Figma frame's exact 1511x956 and scaled by
`components/Band.tsx` to fit the viewport — `min(vw/1511, vh/956)`. Left
alone, that scale falls to ~0.25 on a real phone (iPhone 14: 390x844), which
puts the About body copy at 9px and the carousel's arrow buttons at 11px:
present on screen, unreadable, untappable. Band now floors the scale at 0.5
(`MIN` in `app/layout.tsx`) and switches from fitting the band to letting it
scroll once the floor is hit, so a phone gets a pannable window onto the full
design instead of the design shrunk past use. Verified: at 375x667 and
390x844 the section's `scrollHeight`/`scrollWidth` exceed its `clientHeight`/
`clientWidth` and every edge of the band is reachable by scrolling, with no
change at desktop sizes (scale never touches the floor there).

**That floor is a stopgap, not a mobile design, and every future section
should be built knowing that.** It stops the worst failure — illegible text,
dead buttons — without inventing a mobile layout, because there is no mobile
Figma frame to build one from (checked: `figmaspec.md` documents exactly one
frame, "landing page"). It does not reflow anything, stack columns, hide
what doesn't fit, or make touch targets meet 24x24 CSS px on a phone (0.5
scale gets a 44px arrow to 22px — still under that). A section that is fine
panned at 0.5 needs nothing further. A section where panning is genuinely
bad — something meant to be read start to finish on a phone, a control that
has to be tappable there — needs an explicit mobile variant inside that
section (a breakpoint, an `md:hidden`/`hidden md:block` pair), decided
per-section against real content, not solved once here. Silently shipping a
new section that only works panned-at-0.5 when it clearly needed better is
exactly the gap this note exists to close — check new sections at a real
phone width (390x844 is a reasonable stand-in) before calling them done, the
same way this codebase already checks new work against measured Figma values
rather than assuming it looks right.

When real mobile Figma frames exist, this note's "no frame to build from"
premise is gone and that changes the calculus — worth reopening then, not
just leaving this floor in place forever.

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
