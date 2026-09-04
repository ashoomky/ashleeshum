// components/Stat.tsx
//
// One figure and its label, from the Stats band. Bootzy 130 over Helvetica 30,
// both cream on the plum ground.
//
// The label is centred under its figure. That is done without measuring
// anything: the wrapper is absolutely positioned at the figure's own spot and
// left to shrink-wrap, so it ends up exactly as wide as the figure, and the
// label — taken out of flow inside it — is centred on that width. The figure
// keeps the x the spec gives it, and labels of any length stay centred on it.
//
// The label has to be positioned rather than stacked in flow because the
// design puts only 114px between the top of a 130px figure and the top of its
// label, so the two overlap. It stays adjacent in the DOM, so a screen reader
// still reads the figure and then what it counts.

type StatProps = {
  value: string
  label: string
  /** The figure's left edge, as measured. The label centres on the figure. */
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
    // No width: shrink-wraps to the figure, which is what the label centres on.
    <div className="absolute" style={{ top, left }}>
      <span
        className={[
          'font-signature text-cream',
          wide ? 'text-stat-wide' : 'text-stat',
        ].join(' ')}
      >
        {value}
      </span>
      {/*
        Out of flow, so it does not widen the wrapper and break the centring it
        depends on. nowrap for the same reason — a label allowed to wrap would
        be measured against the figure's width and break onto several lines.
      */}
      <p
        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-body text-body text-cream"
        style={{ top: labelTop - top }}
      >
        {label}
      </p>
    </div>
  )
}
