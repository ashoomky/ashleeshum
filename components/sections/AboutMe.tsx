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

      {/*
        The star, tucked behind the end of "about me." — PLACED BY EYE off the
        Figma frame, which is the only record of it. The box is bigger than the
        star because the file carries 6px of padding left and 13 above, and Prop
        places files rather than their content. Drawn before the heading so the
        full stop reads over the top of it, as it does in the design.
      */}
      <Prop
        src={about.props.star}
        alt=""
        width={108}
        height={113}
        top={225}
        left={1248}
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

      {/*
        The carousel, drawn before the camera so the photo sits behind the art
        and shows through the screen. The arrows and caption fall outside the
        camera, so nothing of theirs is covered by it.

        Screen: the LCD is a transparent cut-out 68,48 into the camera art and
        352x267 at its rendered size, which puts it at 865,400 in the band.

        Caption: centred on the camera rather than pinned to the spec's
        1065,1675. That coordinate is where the placeholder "[vlog]" starts,
        and "[vlog]" set at this size is about 65 wide, which centres on the
        camera to within a few px — so centring generalises it to captions of
        any length. See the note below about what happened to "[vlog]".

        Arrows: PLACED BY EYE, since they are not in the design at all. Centred
        on the camera's height and clear of its artwork, which runs 808 to 1400
        once the file's own padding is taken off.
      */}
      <AboutCarousel
        slides={aboutSlides}
        screen={{ top: 400, left: 865, width: 352, height: 267 }}
        caption={{ top: 720, left: 797, width: 614 }}
        arrows={{ top: 504, left: 726, right: 1424 }}
      />

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
        REPLACED: the static "[vlog]" that sat at 1065,1675 in olive. It is
        bracketed, which in this content module means copy still to supply, and
        it occupies the only caption slot the camera has — so the carousel's
        changing caption now uses it, in the same olive. about.props
        .cameraCaption is still there if "[vlog]" turns out to be real copy that
        belongs alongside rather than a placeholder for this.
      */}
    </Band>
  )
}
