// components/SmoothScrollProvider.tsx
//
// Wraps the page in Lenis smooth scroll. Nothing renders — this is a
// lifecycle wrapper, not a visual one — so `children` pass straight through
// and this could sit anywhere above them in the tree.
//
// Disabled entirely when prefers-reduced-motion is set, not just eased down:
// no Lenis instance is created at all, so scrolling stays the browser's own
// native, instant behaviour for anyone who asked for reduced motion. Reacts
// to the setting changing live (see useReducedMotion) by tearing down or
// standing up the instance to match, not just at mount.
//
// Driven by GSAP's ticker rather than Lenis's own internal RAF loop
// (`autoRaf: false`): this is the standard Lenis+ScrollTrigger recipe —
// gsap.ticker calls lenis.raf() every frame, and lenis's own scroll event
// calls ScrollTrigger.update() — so the two stay in lockstep once
// scroll-triggered animations exist. No ScrollTrigger instances are created
// anywhere yet; this just keeps that wiring correct in advance rather than
// retrofitting it later.

'use client'

import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis({ autoRaf: false })
    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    // Lenis already smooths the scroll itself; GSAP's own frame-skipping
    // after a long tab-away would otherwise fight that with a sudden jump.
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [reducedMotion])

  return children
}
