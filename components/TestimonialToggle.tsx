// components/TestimonialToggle.tsx
//
// Shared state for the testimonial card and its screen-edge bleed patch (see
// HowIWork's `TestimonialBleed`) — they live in two different slots of the
// same `Band` call (`children` vs `bleedOver`), which puts them in different
// places in the DOM, but a `Band` doesn't interpose a context boundary
// between them: both are still descendants, in the React tree, of whatever
// rendered that `Band` call. So a provider wrapped around the `Band` call
// reaches both, and this is plain Context rather than separate `useState`s,
// which would drift out of sync the moment one changed.
//
// Carries the quote's own measured height, not just open/closed: both the
// card and the bleed patch need it to compute their own open target height
// (header + quote), and it depends on how the quote wraps at this width,
// which isn't worth hand-measuring and hard-coding twice.
//
// Deliberately NOT a continuously-updated "current live height" — that was
// tried (the card reporting its own animated height every frame via
// ResizeObserver, the bleed patch copying it), and the two visibly fell out
// of step: a ResizeObserver callback lands a frame or so behind the CSS
// transition that triggered it, so the copy always trailed the original by a
// beat. Sharing the stable, unchanging quote height instead means both the
// card and the bleed patch compute the same fixed open/closed target and run
// the same CSS transition on it — two independent transitions with identical
// endpoints stay in lockstep; a live value being chased did not.

'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

type TestimonialToggleValue = {
  open: boolean
  toggle: () => void
  /** The quote paragraph's own measured height, real px, pre-scale (see
   *  TestimonialCard's `scrollHeight` measurement) — 0 until it has measured
   *  once. */
  quoteHeight: number
  setQuoteHeight: (height: number) => void
}

const TestimonialToggleContext = createContext<TestimonialToggleValue | null>(null)

export function TestimonialToggleProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [quoteHeight, setQuoteHeight] = useState(0)
  return (
    <TestimonialToggleContext.Provider
      value={{ open, toggle: () => setOpen((o) => !o), quoteHeight, setQuoteHeight }}
    >
      {children}
    </TestimonialToggleContext.Provider>
  )
}

export function useTestimonialToggle() {
  const value = useContext(TestimonialToggleContext)
  if (!value) {
    throw new Error('useTestimonialToggle must be used within a TestimonialToggleProvider')
  }
  return value
}
