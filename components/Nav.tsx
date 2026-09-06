// components/Nav.tsx
//
// The one piece of page chrome that isn't a Band: a fixed top bar with
// anchor links to the five sections worth jumping straight to. Not part of
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
//
// The lotus in the corner is the same asset Hero and Contact already use
// (`hero.props.flower`), not a separate logo file — it's decorative in both
// places already, so reusing it as the "back to top" mark rather than
// exporting a fourth copy of the same flower.

import Link from 'next/link'
import Image from 'next/image'
import { hero } from '@/content'

const LINKS = [
  { href: '#about', label: 'about' },
  // Credibility's own id — that band carries "brands i've worked with" and
  // "experience / tools", and "experience" is what both the nav and the
  // travel notes popup call it now.
  { href: '#credibility', label: 'experience' },
  { href: '#work', label: 'work' },
  { href: '#process', label: 'process' },
  { href: '#contact', label: 'contact' },
]

export default function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-center gap-10 border-b border-plum/10 bg-cream">
      {/*
        Absolutely positioned rather than a third flex column: the links stay
        exactly centred on the bar regardless of how wide this mark ends up,
        instead of the row's centreline shifting to split the leftover space
        between two unequal siblings.
      */}
      <Link
        href="/"
        aria-label="Back to top"
        className="absolute left-4 flex h-10 w-11 items-center justify-center"
      >
        <Image src={hero.props.flower} alt="" fill sizes="44px" className="object-contain" />
      </Link>

      {LINKS.map((link) => (
        <a key={link.href} href={link.href} className="font-body text-caption text-plum">
          {link.label}
        </a>
      ))}
    </nav>
  )
}
