// hooks/useReducedMotion.ts
//
// Whether the user has prefers-reduced-motion: reduce set, kept live rather
// than read once at mount — the OS setting can change while the page is
// open, and every consumer of this (SmoothScrollProvider today, whatever
// animations come later) needs to react to that, not just to its value on
// first render.
//
// The initial value comes from useState's lazy initializer, not from
// setting state inside the effect — matchMedia is synchronous, so there is
// a real value available before first paint and no reason to render once
// with a wrong guess and correct it a tick later. `typeof window` guards
// the one render that initializer runs during on the server, where
// matchMedia doesn't exist; SmoothScrollProvider doesn't render anything
// that depends on this value, so a server default of false is never a
// hydration mismatch, only a starting point corrected before the effect
// that actually uses it (creating Lenis) ever runs on the client.
//
// The effect itself only subscribes to future changes — it doesn't set
// state on mount, which would just be the initializer's job done twice.

import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(QUERY).matches
  )

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return reduced
}
