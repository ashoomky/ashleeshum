// components/Nav.tsx
//
// The one piece of page chrome that isn't a Band: a fixed top bar with
// anchor links to the four sections worth jumping straight to. Not part of
// the Figma spec (it documents bands, not navigation), so this is plain
// Tailwind spacing rather than the canvas-scale system every section uses —
// a nav bar is meant to stay a constant size regardless of viewport, which
// is the opposite of how a Band behaves.
//
// z-40, below TravelNotesPopup's z-50, so an open popup still covers it.
//
// Smooth scrolling and the offset that keeps a section's top clear of this
// bar are both global, in globals.css (`scroll-padding-top` matching NAV_H
// below) — not per-link behaviour, so every anchor on the page benefits,
// including the ones inside TravelNotesPopup.

const LINKS = [
  { href: '#about', label: 'about' },
  { href: '#work', label: 'work' },
  { href: '#process', label: 'process' },
  { href: '#contact', label: 'contact' },
]

export default function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-center gap-10 border-b border-plum/10 bg-cream">
      {LINKS.map((link) => (
        <a key={link.href} href={link.href} className="font-body text-caption text-plum">
          {link.label}
        </a>
      ))}
    </nav>
  )
}
