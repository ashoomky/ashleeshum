// components/Stat.tsx
//
// One figure and its label, from the Stats band. Bootzy 130 over Helvetica 30,
// both cream on the plum ground.
//
// The two are separate absolutely positioned elements rather than one stacked
// box: the design puts 114px between the top of a 130px figure and the top of
// its label, so they overlap in flow and only their measured tops place them
// correctly. They stay adjacent in the DOM, so a screen reader still reads the
// figure and then what it counts.

type StatProps = {
  value: string
  label: string
  /** Shared by the figure and its label — they are left-aligned in the design. */
  left: number
  top: number
  labelTop: number
  /**
   * Wider tracking on the figure: 5.2px rather than 3.9px. The design does
   * this for 1.57M alone, hence the flag rather than a rule.
   */
  wide?: boolean
}

export default function Stat({ value, label, left, top, labelTop, wide }: StatProps) {
  return (
    <>
      <span
        className={[
          'absolute font-signature text-cream',
          wide ? 'text-stat-wide' : 'text-stat',
        ].join(' ')}
        style={{ top, left }}
      >
        {value}
      </span>
      <p className="absolute font-body text-body text-cream" style={{ top: labelTop, left }}>
        {label}
      </p>
    </>
  )
}
