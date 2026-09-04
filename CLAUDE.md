@AGENTS.md

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
