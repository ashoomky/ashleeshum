// components/SocialLinks.tsx
//
// One small row of links out to `content`'s `hero.socials`, shared by
// whichever section wants it — Hero, Contact, TravelNotesPopup's own footer
// — rather than each mapping the platform list and picking an icon itself.
// Colour and size are the caller's call (`className` on the row, `iconSize`
// on each glyph), since Hero sits on thistle and wants a small plum row,
// Contact sits on plum and wants a slightly larger cream one, and the popup
// wants its own compact size again.
//
// `children` is for TravelNotesPopup's envelope: it pairs a `mailto:` link
// with the same row, and that's a fourth icon this component has no reason
// to know about, so it's appended after the mapped ones instead.

import type { CSSProperties, ReactNode } from 'react'
import { Instagram, TikTok, YouTube } from '@/components/SocialIcon'
import { hero } from '@/content'

const ICONS = { instagram: Instagram, tiktok: TikTok, youtube: YouTube } as const

type SocialLinksProps = {
  className?: string
  iconSize: number
  /** For an absolutely positioned row — pairs with an `absolute` class in
   *  `className`, same split as every other placed element in this codebase. */
  style?: CSSProperties
  children?: ReactNode
}

export default function SocialLinks({ className, iconSize, style, children }: SocialLinksProps) {
  return (
    <div className={['flex items-center', className].filter(Boolean).join(' ')} style={style}>
      {hero.socials.map((social) => {
        const Icon = ICONS[social.platform as keyof typeof ICONS]
        if (!Icon) return null

        return (
          <a
            key={social.platform}
            href={social.href}
            aria-label={social.platform}
            style={{ width: iconSize, height: iconSize }}
          >
            <Icon />
          </a>
        )
      })}
      {children}
    </div>
  )
}
