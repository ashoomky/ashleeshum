// components/Reel.tsx
//
// One reel inside a PhoneFrame's screen. Shows its poster until a viewer
// presses play — nine clips autoplaying at once (one per phone, across
// three pillars) is neither good UX nor a reasonable thing to ship to
// everyone's data plan by default, so this is deliberately inert until
// asked: muted (autoplay would need it anyway, and it costs nothing to
// leave on) and preload="none", so the browser doesn't fetch a single byte
// of video for a phone the viewer never presses play on.

type ReelProps = {
  src: string
  poster: string
}

export default function Reel({ src, poster }: ReelProps) {
  return (
    <video
      src={src}
      poster={poster}
      controls
      muted
      playsInline
      preload="none"
      className="h-full w-full object-cover"
    />
  )
}
