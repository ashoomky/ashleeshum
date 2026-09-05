// components/TravelNotesPopup.tsx
//
// The paper-strip popup: a crumpled-paper card with three handwritten notes,
// each paired with a prop (the "I ♥ NY" sticker, the jellycat, the paper
// plane) and a caption that links to the section that note describes, plus a
// "contact me!!" row of icon links at the bottom. Text is font-hand
// (Reenie Beanie) throughout — the one place in the design that isn't.
//
// Two exports, deliberately split: `TravelNotesCard` is just the paper and
// its content, with no opinion on how it's presented; `TravelNotesPopup`
// (the default export) is the modal chrome around it — the fixed backdrop,
// the scroll cap, the close button, Escape-to-close. Splitting them means
// the card can be dropped straight into a page in normal flow (to preview
// it, or if it's ever wanted somewhere that isn't a modal) without dragging
// `fixed inset-0` along for the ride.
//
// TravelNotesPopup is standalone: it takes `open` and `onClose` rather than
// owning any trigger itself. The hero's paper strip is meant to open it, but
// that click isn't wired yet (M5) — until it is, flip `open` by hand
// wherever this is rendered to preview it. `onClose` is optional for
// exactly that reason: a hand-flipped preview has nothing meaningful to
// call back into, and the card's own internal links degrade to plain
// same-page anchors without it.
//
// No Figma frame covers this popup's own layout (the spec documents the
// paper strip as a trigger, nothing about what it opens), so everything
// below — sizes, positions, the icon glyphs — is placed by eye, not
// measured. The three prop images disagree wildly on shape (the NY sticker
// is circular, the plane is square-ish), so each sits in a uniform box with
// object-contain rather than being sized to its own file.
//
// The section ids each note links to (about / credibility / pillars) live on
// the sections themselves via Band's `id` prop, not duplicated here.
//
// The card has no fixed height — the notes' full text plus the contact row
// need more room than a guessed height would give them (a fixed height
// clipped the contact row entirely the first time this was built). In the
// modal it scrolls internally past 90dvh instead, so it can never be centred
// taller than the screen with part of it out of reach; in normal flow (the
// bare card) it just takes whatever height its content needs, same as any
// other block on the page.

'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { travelNotes, contact, hero } from '@/content'

const PROP_IMAGES = [travelNotes.props.nySticker, travelNotes.props.toy, travelNotes.props.plane]

function Envelope() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function Instagram() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}

function TikTok() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function YouTube() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 9.5 15 12l-4.5 2.5Z" fill="currentColor" />
    </svg>
  )
}

type TravelNotesCardProps = {
  /** Called when a note or "contact me!!" is clicked — the modal uses this
   *  to close itself before the page jumps to the target section. Omit for
   *  a bare, in-flow render (a preview, say): the links still work as plain
   *  anchors, there's just nothing to close. */
  onNavigate?: () => void
}

export function TravelNotesCard({ onNavigate }: TravelNotesCardProps) {
  return (
    <div className="relative flex flex-col">
      <Image src={travelNotes.texture} alt="" fill sizes="384px" className="object-cover" />

      <div className="relative flex flex-col gap-6 px-8 py-16">
        {travelNotes.notes.map((note, i) => (
          <a
            key={note.id}
            href={`#${note.linkTo}`}
            onClick={() => onNavigate?.()}
            className={[
              'flex items-center gap-4',
              // ny and travel read image-then-text; fact reads text-then-image
              i === 1 ? 'flex-row-reverse' : '',
            ].join(' ')}
          >
            <div className="flex shrink-0 flex-col items-center gap-2">
              <div className="relative h-28 w-28">
                <Image src={PROP_IMAGES[i]} alt="" fill className="object-contain" />
              </div>
              {/* whitespace-pre-line: "what i can do for you" carries a
                  deliberate line break in its content string; the other two
                  labels have no newline, so this is a no-op for them. */}
              <span className="whitespace-pre-line text-center font-signature text-caption font-bold text-ink">
                {note.label}
              </span>
            </div>
            <p className="font-hand text-note text-ink">{note.text}</p>
          </a>
        ))}

        {/*
          Not one big link: "contact me!!" jumps to the section, but each
          icon is its own link out to that platform — nesting the icons
          inside the same anchor as the label would be invalid HTML (an
          anchor can't contain another anchor).
        */}
        <div className="flex flex-col items-center gap-3 border-t border-ink/20 pt-6">
          <a href="#contact" onClick={() => onNavigate?.()} className="font-signature text-caption font-bold text-ink">
            contact me!!
          </a>
          <div className="flex items-center gap-4 text-ink">
            {hero.socials.map((social) => (
              <a key={social.platform} href={social.href}>
                {social.platform === 'instagram' && <Instagram />}
                {social.platform === 'tiktok' && <TikTok />}
                {social.platform === 'youtube' && <YouTube />}
              </a>
            ))}
            <a href={`mailto:${contact.email}`}>
              <Envelope />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

type TravelNotesPopupProps = {
  open: boolean
  onClose?: () => void
}

export default function TravelNotesPopup({ open, onClose }: TravelNotesPopupProps) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50" onClick={() => onClose?.()}>
      {/*
        The scroll viewport: capped to 90dvh so the card can never be taller
        than the screen and centred out of reach. The card itself has no
        fixed height — it's exactly as tall as its content — so this is what
        scrolls that content when it exceeds the cap.
      */}
      <div className="w-full max-w-sm overflow-y-auto rounded" style={{ maxHeight: '90dvh' }}>
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <TravelNotesCard onNavigate={onClose} />

          <button
            type="button"
            onClick={() => onClose?.()}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 font-hand text-note-close text-ink"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}
