// components/Chip.tsx
//
// The cream pill. Used three times: the hero tagline (345x40) and the two
// contact chips, email (350x40) and phone (213x40).
//
// The shape is fixed and the width is not — three uses, three widths, only one
// of them tokenised. So it sizes to its content; pass `w-chip` or another width
// through className to pin it to a measured one.
//
// Typography is deliberately not set here either: the tagline is Alte Haas at
// 25px and the contact chips are Helvetica at 20px, so the caller brings the
// face and size. What this owns is the pill: height, radius, and the cream-on-
// plum colouring.

type ChipProps = {
  children: React.ReactNode
  className?: string
}

export default function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={[
        'inline-flex h-chip items-center rounded-chip bg-cream px-6 text-plum',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}
