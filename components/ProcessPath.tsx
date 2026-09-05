// components/ProcessPath.tsx
//
// The winding line the four "How I Work" steps sit along — one continuous
// path, not four separate segments. Inlined rather than rendered as an
// `<img>`, because the path-drawing animation this is built for eventually
// needs a real `<path>` element to animate stroke-dashoffset on — an
// `<img src="…svg">` is opaque to that, it can only ever show the finished
// line. Static for now: this renders the finished line and nothing draws it.
//
// Reads the file from `public/` at render time rather than copying its path
// data into this component, so the SVG in `public/props` stays the one copy
// of the artwork — this never drifts from it.

import fs from 'fs'
import path from 'path'

type ProcessPathProps = {
  src: string
  width: number
  height: number
  top: number
  left: number
}

export default function ProcessPath({ src, width, height, top, left }: ProcessPathProps) {
  const raw = fs.readFileSync(path.join(process.cwd(), 'public', src), 'utf8')
  // The file's own width/height are its native export size, which is close
  // to but not exactly the design's 1020.6x1281 — stretched to fill this box
  // (sized to the spec) rather than trusting the file's own, so the line
  // scales with everything else via the wrapper below.
  const markup = raw.replace(/width="[\d.]+"/, 'width="100%"').replace(/height="[\d.]+"/, 'height="100%"')

  return (
    <div
      className="absolute"
      style={{ top, left, width, height }}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}
