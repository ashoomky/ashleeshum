// components/PillarHeading.tsx
//
// A pillar's title, set as one word in two faces: an oversized initial in Demo
// Motherlane at 300, then the rest in Alte Haas at 80. The spec names them
// separately — "Pillar initial (L / T / F)" and "Pillar word (\"ifestyle
// content\")" — which is the split this makes.
//
// The split is taken off the first character rather than kept in content,
// because it is a rendering rule that holds for all three ("Lifestyle content"
// -> L + "ifestyle content", and likewise Travel and Food), not a copy
// decision the way the hero's name was.
//
// Both parts are inline, so they share a baseline without being told to, and
// the heading still reads as one word — "Lifestyle content" — to a screen
// reader rather than as two fragments.

type PillarHeadingProps = {
  heading: string
  top: number
  left: number
  /** Caps the line so a long title wraps where the layout wants it to. */
  width?: number
}

export default function PillarHeading({ heading, top, left, width }: PillarHeadingProps) {
  const initial = heading.slice(0, 1)
  const rest = heading.slice(1)

  return (
    <h2
      className="absolute font-heading text-pillar-word text-plum"
      style={{ top, left, width }}
    >
      <span className="font-display text-pillar-initial">{initial}</span>
      {rest}
    </h2>
  )
}
