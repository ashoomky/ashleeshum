// TEMPORARY component preview.
//
// Not the real page — a place to look at the primitives while the sections are
// being built. Replace this wholesale when the hero lands.

import Image from 'next/image'
import Prop from '@/components/Prop'
import Chip from '@/components/Chip'
import PhoneFrame from '@/components/PhoneFrame'
import { hero, about, contact } from '@/content'

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-body text-caption text-olive">{children}</p>
}

export default function Home() {
  return (
    <main className="flex flex-col gap-16 p-16">
      <header className="flex flex-col gap-2">
        <h1 className="font-signature text-script-sm">component preview</h1>
        <Label>
          Prop, Chip and PhoneFrame, drawn with the real assets and the measured
          values from figmaspec.md.
        </Label>
      </header>

      {/* ---------------------------------------------------------- Prop */}
      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-body-lg">Prop</h2>
        <Label>
          The hero band at its true size — 1511 x 956, thistle, plum panel at
          x1193. Every image below is a Prop at its Figma coordinate.
        </Label>

        <div className="overflow-x-auto">
          <div className="relative h-band w-canvas overflow-hidden bg-thistle">
            {/* the plum panel: a band, not a prop */}
            <div className="absolute top-0 bottom-0 w-hero-panel bg-plum" style={{ left: 1193 }} />

            {/* Monogram A 543x380 at 61,192 */}
            <Prop src={hero.props.monogram} alt="" width={543} height={380} top={192} left={61} priority />

            {/* Photostrip 122.7x637.5 rotated 9deg at ~1137,209 */}
            <Prop src={hero.props.photostrip} alt="" width={123} height={638} top={209} left={1137} rotate={9} priority />

            {/* Sticker — rotate-sticker in the token set is 122deg */}
            <Prop src={hero.props.sticker} alt="" width={96} height={96} top={800} left={880} rotate={122} />

            {/* Flower, also used in Contact */}
            <Prop src={hero.props.flower} alt="" width={220} height={194} top={690} left={330} />

            {/*
              Eleven 34px stars are scattered across the plum panel. The spec
              records the count and the size but not the coordinates, so these
              five are indicative placements, not measured ones.
            */}
            <Prop src={hero.props.stars} alt="" width={34} height={34} top={120} left={1250} />
            <Prop src={hero.props.stars} alt="" width={34} height={34} top={300} left={1460} />
            <Prop src={hero.props.stars} alt="" width={34} height={34} top={520} left={1230} />
            <Prop src={hero.props.stars} alt="" width={34} height={34} top={700} left={1420} />
            <Prop src={hero.props.stars} alt="" width={34} height={34} top={840} left={1280} />

            {/* Tagline pill 345x40 at 662,686 — Chip in its real position */}
            <div className="absolute" style={{ top: 686, left: 662 }}>
              <Chip className="w-chip font-heading text-tagline">{hero.tagline}</Chip>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Chip */}
      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-body-lg">Chip</h2>
        <Label>
          One shape, three widths. The tagline is pinned to w-chip (345px); the
          contact chips size to their content. Shown on the grounds they
          actually sit on — a cream pill is invisible on cream.
        </Label>

        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-4 bg-thistle p-8">
            <Chip className="w-chip font-heading text-tagline">{hero.tagline}</Chip>
          </div>
          <div className="flex flex-wrap items-center gap-4 bg-plum p-8">
            <Chip className="font-body text-caption">{contact.email}</Chip>
            <Chip className="font-body text-caption">{contact.phone}</Chip>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- PhoneFrame */}
      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-body-lg">PhoneFrame</h2>
        <Label>
          309 x 549 for the pillar sections, 375 x 666 for Credibility. The reel
          posters are not exported yet, so these hold a stand-in.
        </Label>

        <div className="flex flex-wrap items-end gap-12">
          <PhoneFrame>
            <div className="flex h-full w-full items-center justify-center bg-olive">
              <Image src={about.props.camera} alt="" width={240} height={136} />
            </div>
          </PhoneFrame>

          <PhoneFrame size="large">
            <div className="flex h-full w-full items-center justify-center bg-thistle">
              <Image src="/about/matcha-pastry.png" alt="" width={260} height={196} />
            </div>
          </PhoneFrame>
        </div>
      </section>
    </main>
  )
}
