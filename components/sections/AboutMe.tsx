// components/sections/AboutMe.tsx
//
// Figma node 2076:30, the second band. The spec gives About's positions as
// page coordinates and the band starts at y955, so every y below is the spec's
// minus 955 — "about me." at page 1175 is 220 into the band.
//
// The one position the spec does not record is the carousel's, so that is
// placed by eye and marked at its use.
//
// Static.

import Band from '@/components/Band'
import Prop from '@/components/Prop'
import AboutCarousel from '@/components/AboutCarousel'
import { about, aboutSlides } from '@/content'

/** Paragraph tops, page 1261 / 1396 / 1576 less the band's 955. */
const PARAGRAPH_TOPS = [306, 441, 621]

export default function AboutMe() {
  return (
    <Band className="bg-cream">
      {/*
        The decorative element, page 1057,999. The spec records its position but
        not its size; 454x202 is the file halved, and 1057 + 454 lands exactly
        on the canvas edge at 1511, so it is a 2x export like the camera.
      */}
      <Prop
        src={about.props.musicNotes}
        alt=""
        width={454}
        height={202}
        top={44}
        left={1057}
      />

      {/* "about me." at 819,1175 — Bootzy 120 / 3.6px */}
      <h2
        className="absolute font-signature text-script-lg text-plum"
        style={{ top: 220, left: 819 }}
      >
        {about.heading}
      </h2>

      {/*
        The body column: x120, width 564, fixed while the carousel advances.
        Helvetica 35 / 1.05px. The spec gives the greeting its own line at page
        1201 but no size of its own, so it takes the body's.
      */}
      <p
        className="absolute font-body text-body-lg text-plum"
        style={{ top: 246, left: 120, width: 564 }}
      >
        {about.greeting}
      </p>

      {about.paragraphs.map((paragraph, i) => (
        <p
          key={paragraph}
          className="absolute font-body text-body-lg text-plum"
          style={{ top: PARAGRAPH_TOPS[i], left: 120, width: 564 }}
        >
          {paragraph}
        </p>
      ))}

      {/* Camera, 614x349 at 797,1307. The file is a clean 2x of that. */}
      <Prop
        src={about.props.camera}
        alt=""
        width={614}
        height={349}
        top={352}
        left={797}
      />

      {/*
        "[vlog]" at 1065,1675 in olive. The spec gives it a colour and a
        position but no size or face, so it takes the body face one step down.
      */}
      <p
        className="absolute font-body text-body-sm text-olive"
        style={{ top: 720, left: 1065 }}
      >
        {about.props.cameraCaption}
      </p>

      {/*
        PLACED BY EYE: the spec records no position or size for the about
        slides. This sits in the clear below the camera, which bottoms out at
        701, and right of "[vlog]". The box is wider than it is tall so the
        caption wraps to two lines and clears the bottom of the band — at 200
        wide it ran to three and was cut off. Swap for measured values when
        they exist.
      */}
      <AboutCarousel slides={aboutSlides} top={702} left={1130} width={360} height={180} />

      {/*
        NOT PLACED: about.props.star. It belongs to this section but the spec
        records no coordinate for it, and unlike the carousel there is no
        obvious gap it wants to sit in. Needs a position from the design file.
      */}
    </Band>
  )
}
