// TEMPORARY page — the sections built so far.

import Hero from '@/components/sections/Hero'
import AboutMe from '@/components/sections/AboutMe'
import Stats from '@/components/sections/Stats'
import Credibility from '@/components/sections/Credibility'
import Pillar from '@/components/sections/Pillar'
import { pillars } from '@/content'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutMe />
      <Stats />
      <Credibility />
      {pillars.map((pillar) => (
        <Pillar key={pillar.id} pillar={pillar} />
      ))}
    </>
  )
}
