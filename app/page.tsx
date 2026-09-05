import Nav from '@/components/Nav'
import Hero from '@/components/sections/Hero'
import AboutMe from '@/components/sections/AboutMe'
import Stats from '@/components/sections/Stats'
import Credibility from '@/components/sections/Credibility'
import Pillar from '@/components/sections/Pillar'
import HowIWork from '@/components/sections/HowIWork'
import LetsWorkTogether from '@/components/sections/LetsWorkTogether'
import TravelNotesPopup from '@/components/TravelNotesPopup'
import { pillars } from '@/content'

// The hero click meant to open this isn't wired yet (M5) — flip this to true
// by hand to preview the popup as it will actually appear (a fixed modal).
const PREVIEW_TRAVEL_NOTES_OPEN = false

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <AboutMe />
      <Stats />
      <Credibility />
      {pillars.map((pillar) => (
        <Pillar key={pillar.id} pillar={pillar} />
      ))}
      <HowIWork />
      <LetsWorkTogether />
      <TravelNotesPopup open={PREVIEW_TRAVEL_NOTES_OPEN} />
    </>
  )
}
