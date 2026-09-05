// lib/gsap.ts
//
// The one place GSAP's ScrollTrigger plugin gets registered. A module's
// top-level code runs once no matter how many places import it, which is
// exactly the guarantee this needs — registering a GSAP plugin more than
// once is harmless but pointless, and importing straight from `gsap`
// anywhere else in the app would make that easy to do by accident as the
// number of files that need it grows. Import gsap and ScrollTrigger from
// here, not from the packages directly, and registration stays this file's
// problem rather than every caller's.
//
// No animations are defined here — this only makes the plugin available.

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
