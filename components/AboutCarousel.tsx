// components/AboutCarousel.tsx
//
// The floating photo beside the About copy. Takes the whole slide list but
// draws only the first one: the advance comes later (M3), and the float on the
// image comes with it (M4). The image is absolutely positioned inside its own
// box for exactly that reason — once it drifts it must not drag the caption or
// anything else around with it.
//
// The caller places the box, the way sections place every other prop.
//
// A caveat for when the advance lands: these exports do not share a trim.
// katara carries 169px of transparent padding above the artwork while others
// carry almost none, so the same box frames each slide differently and the
// photo will appear to jump as they cycle. Re-export them to a common crop, or
// give each slide its own offset, before wiring the advance.

import Image from 'next/image'
import type { AboutSlide } from '@/content'

type AboutCarouselProps = {
  slides: AboutSlide[]
  top: number
  left: number
  width: number
  height: number
}

export default function AboutCarousel({ slides, top, left, width, height }: AboutCarouselProps) {
  const slide = slides[0]

  // The alt copy in content is still a [BRACKETS] placeholder. Announcing that
  // is worse than announcing nothing, so until real alt text exists the image
  // is decorative and the caption beneath it carries the meaning — which is
  // what figure/figcaption ties together. Real copy starts being used the
  // moment it replaces the placeholder.
  const alt = slide.alt.startsWith('[') ? '' : slide.alt

  return (
    <figure className="absolute m-0" style={{ top, left, width }}>
      <div className="relative" style={{ height }}>
        <Image src={slide.image} alt={alt} fill sizes={`${width}px`} className="object-contain" />
      </div>
      <figcaption className="mt-3 font-body text-caption text-plum">{slide.caption}</figcaption>
    </figure>
  )
}
