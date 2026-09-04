// app/fonts.ts
//
// Self-hosted faces via next/font/local. All files live in app/fonts/.
// Every block below is live — the .woff2 files exist.
//
// ---------------------------------------------------------------------------
// WIRING (app/layout.tsx):
//
//   import { bootzy, motherlane, alteHaas, oskon, reenie } from './fonts'
//
//   export default function RootLayout({ children }: { children: React.ReactNode }) {
//     return (
//       <html
//         lang="en"
//         className={[
//           bootzy.variable,
//           motherlane.variable,
//           alteHaas.variable,
//           oskon.variable,
//           reenie.variable,
//         ].join(' ')}
//       >
//         <body className="font-body bg-cream text-plum">{children}</body>
//       </html>
//     )
//   }
// ---------------------------------------------------------------------------
//
// FORMATS: .woff2, .woff, .otf and .ttf all work with next/font/local. These are
// woff2, roughly 45% smaller than the .otf/.ttf originals across the set.
//
// Only the faces the design actually uses are loaded. Every loaded face is a
// separate network request, so do not add one speculatively.

import localFont from 'next/font/local'

/**
 * Bootzy TM — the script voice.
 * "hi! i'm" (50) · "about me." (120) · stat numbers (130) · section scripts
 * "brands i've worked with" / "credentials / experience" (60) · testimonial
 * header (45) · "let's work together!!" (200).
 *
 * woff2 with woff as fallback. The supplied .eot is IE-only, not shipped.
 */
export const bootzy = localFont({
  src: [
    { path: './fonts/BootzyTM.woff2', weight: '400', style: 'normal' },
    { path: './fonts/BootzyTM.woff', weight: '400', style: 'normal' },
  ],
  variable: '--font-bootzy',
  display: 'swap',
  fallback: ['cursive'],
})

/**
 * Demo Motherlane — ornamental initials only.
 * The "S" in Shum (370, rotated -17deg) and the L / T / F pillar initials (300).
 *
 * Verified: 98 glyphs, full A-Z / a-z / 0-9. S, L, T and F all present.
 *
 * LICENCE: personal use only. Ashlee has assessed her use as personal and
 * approved it. Kept isolated to these four characters so it is a one-line swap
 * if that ever changes.
 */
export const motherlane = localFont({
  src: [{ path: './fonts/demomotherlanekvoka.woff2', weight: '400', style: 'normal' }],
  variable: '--font-motherlane',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
})

/**
 * Alte Haas Grotesk — statement headings.
 * "ugc / marketing portfolio" (25) · pillar words "ifestyle content" (80) ·
 * "how i work" (90, tracking -3.6px).
 *
 * LICENCE: freeware. Keep "Alte Haas Grotesk licence.rtf" in app/fonts/
 * alongside the files — the licence asks to be distributed with the font.
 */
export const alteHaas = localFont({
  src: [
    { path: './fonts/AlteHaasGroteskRegular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/AlteHaasGroteskBold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-alte-haas',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
})

/**
 * ZT Bros Oskon 90s — the big name type.
 * "shlee" (240) and "hum" (250).
 *
 * LICENCE: six styles are free for commercial use; the full 72-style family is
 * paid. The six supplied files ARE that free set (ExtraLight, ExtraLight Italic,
 * Light, Light Italic, Regular, Italic), so this is within licence.
 *
 * The design only uses Regular, so only Regular is loaded. The other five
 * .woff2 files are in app/fonts/ if a use appears — add them here then, not now.
 */
export const oskon = localFont({
  src: [{ path: './fonts/ZTBrosOskon90sRegular.woff2', weight: '400', style: 'normal' }],
  variable: '--font-oskon',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
})

/**
 * Reenie Beanie — handwriting.
 * For the travel notes popup (TravelNotesPopup), where the notes read as
 * handwritten on crumpled paper.
 *
 * LICENCE: SIL Open Font License 1.1 (James Grieshaber). This is what the
 * supplied OFL.txt covers. Commercial use permitted. Keep OFL.txt in app/fonts/.
 */
export const reenie = localFont({
  src: [{ path: './fonts/ReenieBeanieRegular.woff2', weight: '400', style: 'normal' }],
  variable: '--font-reenie',
  display: 'swap',
  fallback: ['cursive'],
})

/**
 * Helvetica — body copy.
 * About paragraphs (35) · stat labels (30) · pillar offer copy (35) ·
 * process steps (40) · testimonial body (30) · contact chips (20).
 *
 * NOT self-hosted, deliberately. Embedding Helvetica as a webfont needs a
 * Monotype licence. It is declared as a plain CSS stack in tailwind.config.ts
 * so it uses the visitor's installed copy, falling back to Arial (near-identical
 * metrics) elsewhere. Do not add a localFont block for this.
 */
