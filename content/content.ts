// content/index.ts
//
// Single source of truth for every word and asset reference on the page.
// Components read from here. Never hardcode copy or image paths in a component.
//
// Copy transcribed from the Figma design. [BRACKETS] = still to supply.

// ============================================================ types

export type Pillar = 'lifestyle' | 'travel' | 'food'

export type Reel = {
  id: string
  pillar: Pillar
  videoId: string // Cloudflare Stream / Bunny / Mux id, never a local file
  poster: string
  caption?: string
}

/**
 * `relationship` drives honest labelling site-wide.
 *  'paid'    a real paid partnership
 *  'gifted'  gifted product, PR package, unpaid collab
 *  'concept' self-directed, no brand relationship
 * Anything that is not 'paid' renders with a marker and the footnote below.
 */
export type Relationship = 'paid' | 'gifted' | 'concept'

export type Brand = { name: string; logo: string; relationship: Relationship }
export type Credential = { name: string; logo: string }

export type AboutSlide = { image: string; alt: string; caption: string }

// ============================================================ hero

export const hero = {
  greeting: "hi! i'm",
  name: 'Ashlee Shum',
  tagline: 'ugc / marketing portfolio',
  socials: [
    { platform: 'instagram', href: '[INSTAGRAM URL]' },
    { platform: 'tiktok', href: '[TIKTOK URL]' },
    { platform: 'youtube', href: 'https://youtube.com/@ashoomky' },
  ],
  props: {
    flower: '/props/flower-hero.png',
    photostrip: '/props/photobooth-strip.png', // 4 vertical photos
    paperStrip: '/props/paper-strip.png',      // click target -> TravelNotesPopup
    stars: '/props/stars-pattern.svg',
  },
} as const

// ============================================================ about

export const about = {
  heading: 'about me.',
  greeting: "hi, i'm ashlee!",
  // fixed column, does not change as the carousel advances
  paragraphs: [
    'i have a passion for anything to do with marketing, tech and product.',
    'i love being able to contribute to my community through making meaningful content, connecting people all around the world.',
    'i am constantly seeking new experiences and open to connect :)',
  ],
  props: {
    camera: '/props/camera.png',
    cameraCaption: '[vlog]',
    musicNotes: '/props/music-notes.png',
  },
}

// One floating image per slide, each with its own caption.
// Static build renders index 0 only. M4 makes them float, M3-style advance comes later.
export const aboutSlides: AboutSlide[] = [
  {
    image: '/about/katara.png',
    alt: '[ALT TEXT]',
    caption: 'katara from “avatar and the last air bender”',
  },
  {
    image: '/about/chocolate.png',
    alt: '[ALT TEXT]',
    caption: 'froyo + dubai chocolate, ofc',
  },
  {
    image: '/about/black-widow.png',
    alt: '[ALT TEXT]',
    caption: 'black widow in captain america winter soldier',
  },
  {
    image: '/about/penguin.png',
    alt: '[ALT TEXT]',
    caption: 'my spirit animal is a penguin',
  },
  {
    image: '/about/matcha-pastry.png',
    alt: '[ALT TEXT]',
    caption: 'a cafe with good pastries + strawberry matcha (w/ oat milk) will always get me',
  },
  {
    image: '/about/books.png',
    alt: '[ALT TEXT]',
    caption: "fantasy - my fav genre (don't talk to me about the poppy war trilogy)",
  },
]

// ============================================================ stats

export const stats = [
  { value: '6,800+', label: 'combined followers' },
  { value: '1.57M', label: 'combined views' },
  { value: '3+', label: 'years of experience' },
]

// ============================================================ credibility

export const brandsHeading = "brands i've worked with"
export const credentialsHeading = 'credentials / experience'

export const RELATIONSHIP_FOOTNOTE =
  'Gifted or collaborative partnership. Unmarked pieces are self-directed concepts.'

export const brands: Brand[] = [
  { name: 'Charles & Keith', logo: '/logos/charles-and-keith.png', relationship: 'gifted' },
  { name: 'LEWKIN', logo: '/logos/lewkin.png', relationship: 'gifted' },
  { name: 'dailybean', logo: '/logos/dailybean.png', relationship: 'gifted' },
]

export const credentials: Credential[] = [
  { name: 'UOACS', logo: '/logos/uoacs.png' },
  { name: 'Google Analytics 4', logo: '/logos/ga4.png' },
  { name: 'HubSpot', logo: '/logos/hubspot.png' },
  { name: 'University of Auckland', logo: '/logos/uoa.png' },
]

// ============================================================ pillars

export const pillars = [
  {
    id: 'lifestyle' as Pillar,
    heading: 'Lifestyle content',
    subCaption: 'incl. beauty, fashion, self development',
    offerLabel: 'what i can offer you:',
    offer:
      'my lifestyle content is diverse and engaging, often inspiring people and [FINISH THIS SENTENCE — still blank in Figma]',
    props: ['/props/matcha.png', '/props/laptop.png'],
    paper: '/props/paper-note-lifestyle.png',
  },
  {
    id: 'travel' as Pillar,
    heading: 'Travel content',
    offerLabel: 'what i can offer you:',
    offer:
      'my travel content is well rehearsed and informational for people wanting to travel to places, displaying fun times while also being educational',
    props: ['/props/plane.png'],
    paper: '/props/paper-note-travel.png',
  },
  {
    id: 'food' as Pillar,
    heading: 'Food content',
    offerLabel: '',
    offer:
      'my love for food can be felt through the screen - i have a knack for making food look amazing on camera, reach out for collabs!',
    props: ['/props/mochi.png'],
    paper: '/props/paper-note-food.png',
  },
]

export const reels: Reel[] = [
  { id: 'life-01', pillar: 'lifestyle', videoId: '[STREAM_ID]', poster: '/posters/life-01.jpg' },
  { id: 'life-02', pillar: 'lifestyle', videoId: '[STREAM_ID]', poster: '/posters/life-02.jpg' },
  { id: 'life-03', pillar: 'lifestyle', videoId: '[STREAM_ID]', poster: '/posters/life-03.jpg' },
  { id: 'trav-01', pillar: 'travel', videoId: '[STREAM_ID]', poster: '/posters/trav-01.jpg' },
  { id: 'trav-02', pillar: 'travel', videoId: '[STREAM_ID]', poster: '/posters/trav-02.jpg' },
  { id: 'trav-03', pillar: 'travel', videoId: '[STREAM_ID]', poster: '/posters/trav-03.jpg' },
  { id: 'food-01', pillar: 'food', videoId: '[STREAM_ID]', poster: '/posters/food-01.jpg' },
  { id: 'food-02', pillar: 'food', videoId: '[STREAM_ID]', poster: '/posters/food-02.jpg' },
  { id: 'food-03', pillar: 'food', videoId: '[STREAM_ID]', poster: '/posters/food-03.jpg' },
]

export const reelsByPillar = (p: Pillar) => reels.filter((r) => r.pillar === p)

// ============================================================ how i work

export const processHeading = 'how i work'

export const processSteps = [
  { n: 1, text: 'read through the brief' },
  { n: 2, text: 'come up with concept, story and hooks' },
  { n: 3, text: 'shoot and edit!' },
  { n: 4, text: 'delivery and iterate :)' },
]

export const testimonials = [
  {
    handle: 'dailybean',
    label: 'testimonial',
    quote:
      'ashlee has been amazing to work with! her videos manage to capture the audience in an engaging and captivating way, would definitely work with her again!',
  },
]

// ============================================================ contact

export const contact = {
  heading: "let's work together!!",
  email: 'ashoomky.business@gmail.com',
  phone: '+64 21 236 3800',
  props: { flower: '/props/flower-contact.png' },
}

// ============================================================ travel notes popup
// Opened by clicking the white paper strip in the hero.
// Component is built now; the click is wired later (M5).

export const travelNotes = {
  texture: '/props/crumpled-paper.png',
  props: {
    nySticker: '/props/i-love-ny.png',
    toy: '/props/toy.png',
    plane: '/props/paper-plane.png',
  },
  notes: [
    { id: 'ny', text: 'new york has a special place in my heart, my dream city :,)' },
    {
      id: 'fact',
      text: 'fun fact: i own a peanut jellycat named bernie! (AKA bernacle AKA big bern AKA bern)',
    },
    {
      id: 'travel',
      text: "i love travelling and experiencing new cultures, i've been to over 9 countries so far - and counting!",
    },
  ],
}
