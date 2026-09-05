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
  /**
   * The eight portrait reels are close enough to the screen's own aspect
   * that 'cover' just trims a sliver off the top or sides. The one
   * landscape reel (Travel's third phone, in PhoneFrame's landscape
   * orientation) is a much bigger mismatch — cropping it to fill would hide
   * most of the shot — so that one asks for 'contain' instead.
   */
  fit?: 'cover' | 'contain'
}

export default function Reel({ src, poster, fit = 'cover' }: ReelProps) {
  return (
    <video
      src={src}
      poster={poster}
      controls
      muted
      playsInline
      preload="none"
      className={[
        'h-full w-full',
        fit === 'cover' ? 'object-cover' : 'object-contain',
        // 'contain' leaves letterbox bars wherever the video's own aspect
        // doesn't fill the screen slot — a video element's own background
        // shows through there (and behind the poster, before playback),
        // same as any real video player's letterboxing. 'cover' always
        // fills the slot completely, so this never shows for those.
        //
        // ink, not black: tailwind.config.ts replaces the default palette
        // entirely with five named colours, so `bg-black` compiles to
        // nothing here — no rule exists for it, and the class name sitting
        // in the DOM with no effect is exactly what happened the first time.
        // ink (#0d1b1e) is this project's near-black.
        fit === 'contain' ? 'bg-ink' : '',
      ].join(' ')}
    />
  )
}
