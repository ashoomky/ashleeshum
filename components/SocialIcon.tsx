// components/SocialIcon.tsx
//
// Inline glyphs for the platforms in content's `hero.socials`, plus the
// envelope TravelNotesPopup pairs with them for "contact me!!". No exported
// icon artwork exists for any of these (see Hero.tsx), so these stand in for
// it — simple enough to draw directly rather than wait on assets.
//
// Sized via the box each is rendered in (`h-full w-full` on the `<svg>`
// itself, `currentColor` for the stroke/fill) rather than a fixed pixel
// size, so the same glyph serves a small row on Hero or Contact and the
// popup's own small footer row without two versions.

export function Instagram() {
  return (
    <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}

export function TikTok() {
  return (
    <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 3v10.5a3 3 0 1 1-2.4-2.94M14 3c.4 2.2 2 3.8 4.2 4.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function YouTube() {
  return (
    <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 9.5 15 12l-4.5 2.5Z" fill="currentColor" />
    </svg>
  )
}

export function Envelope() {
  return (
    <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4 6.5 12 13 20 6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** The "elsewhere on the web" mark — Hero's link out to the portfolio site,
 *  ashleeshum.com. Not one of `hero.socials` (it isn't a social platform),
 *  so it's a plain sibling icon rather than something the platform → icon
 *  map in SocialLinks needs to know about. */
export function Globe() {
  return (
    <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 12h18M4.4 7h15.2M4.4 17h15.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
