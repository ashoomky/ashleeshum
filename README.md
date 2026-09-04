# ashleeshum

Ashlee Shum's UGC / marketing portfolio. Next.js App Router, TypeScript, Tailwind v4.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Other scripts: `npm run build`, `npm start`, `npm run lint`.

## Layout

```
app/           routes, root layout, global CSS
  fonts.ts     the five self-hosted faces (next/font/local)
  fonts/       the .woff2 files and their licences
components/    reusable pieces (PhoneFrame, …)
content/       every word and asset path on the page
public/        exported imagery from the Figma file
figmaspec.md   measured values from the design file
tailwind.config.ts   the token set
```

## Conventions

**The design file is the source of truth.** `figmaspec.md` holds values measured
from Figma (frame `landing page`, `2076:30`) rather than estimated. The design
defines no Figma variables, so `tailwind.config.ts` *is* the token set.

**No arbitrary values in components.** Never `text-[35px]` or `bg-[#453643]`.
If something needs a value that isn't in the config, add it there first, with a
note on where the number came from.

**Copy and asset paths live in `content/`.** Components read from there and never
hardcode either. `[BRACKETS]` mark content still to supply.

**Tailwind v4 needs `@config`.** The token set is a TS config file, which v4 does
not pick up on its own — `app/globals.css` loads it with `@config`. Remove that
line and every custom utility silently stops being generated.

**Brand relationships are labelled honestly.** Each entry in `brands` carries a
`relationship` of `paid`, `gifted` or `concept`; anything that isn't `paid`
renders with a marker and a footnote.

## Fonts

Five faces are self-hosted through `next/font/local` and exposed as CSS variables
on `<html>`; body copy uses a plain Helvetica stack that is deliberately not
self-hosted, since embedding Helvetica needs a Monotype licence. Licence terms
for the bundled faces are in `app/fonts/` and `app/fonts.ts` — read them before
adding a face or using Demo Motherlane beyond the four ornamental initials.
