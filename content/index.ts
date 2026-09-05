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
  video: string // self-hosted, /videos/{id}.mp4 — see public/videos
  poster: string
  caption?: string
}

/**
 * What each brand relationship actually was.
 *  'paid'    a real paid partnership
 *  'gifted'  gifted product, PR package, unpaid collab
 *  'concept' self-directed, no brand relationship
 *
 * Recorded but NOT currently shown: Credibility used to mark anything that
 * was not 'paid' with an asterisk and a footnote, and that was taken out. The
 * field stays because it is true of the work and figmaspec asks for each one
 * to be confirmed before the logos ship — not because anything renders it.
 */
export type Relationship = 'paid' | 'gifted' | 'concept'

export type Brand = { name: string; logo: string; relationship: Relationship }

/** A name/logo pair — used for both `experience` and `tools`. */
export type LogoItem = { name: string; logo: string }

export type AboutSlide = { image: string; alt: string; caption: string }

// ============================================================ hero

export const hero = {
  greeting: "hi! i'm",
  name: 'Ashlee Shum',
  /**
   * The name is drawn, not set. "A" is artwork (`props.monogram`), "S" is Demo
   * Motherlane rotated -17deg, and only `first` and `last` are live text. Kept
   * here rather than sliced out of `name` in the component, so the split is
   * visible and editable where the rest of the copy lives.
   */
  nameParts: {
    first: 'shlee', // follows the monogram
    initial: 'S',
    last: 'hum',
  },
  tagline: 'ugc / marketing portfolio',
  socials: [
    { platform: 'instagram', href: '[INSTAGRAM URL]' },
    { platform: 'tiktok', href: '[TIKTOK URL]' },
    { platform: 'youtube', href: 'https://youtube.com/@ashoomky' },
  ],
  props: {
    // The "A" of "Ashlee" is artwork, not type — only "shlee" and "hum" are
    // live text. 543x380 at 61,192.
    monogram: '/props/monogram-a.png',
    flower: '/props/flower.png',          // same asset as the contact flower
    photostrip: '/props/photostrip.png',  // 4 vertical photos
    paperStrip: '/props/paper-strip.jpg', // click target -> TravelNotesPopup
    stars: '/props/star.svg',             // one star, repeated 11x across the panel
    sticker: '/props/sticker-hero.png',   // rotate-sticker (122deg)
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
    musicNotes: '/props/about-decor.png', // the decorative element at 1057,999
    star: '/props/prop-small.png',        // pink, polka-dotted, 5-pointed
  },
}

/**
 * One image per slide, each with its own caption, cycled by AboutCarousel.
 *
 * The camera is one of these rather than a frame the rest sit inside. It leads
 * because it is what the Figma frame shows at rest — with its screen empty and
 * "[vlog]" beneath it, which is simply this slide's caption. Everything here is
 * a peer: same slot, same caption line, same place in the rotation.
 *
 * M4 makes them float; the advance itself is already live.
 */
export const aboutSlides: AboutSlide[] = [
  {
    image: '/props/camera.png',
    // Decorative: the caption beneath carries the meaning, as for every slide.
    alt: '',
    caption: '[vlog]',
  },
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

// Figma renders this title as "credentials / experience". The section now
// carries experience and tools, so the title follows the content.
export const experienceHeading = 'experience / tools'

export const brands: Brand[] = [
  { name: 'Charles & Keith', logo: '/logos/charles-and-keith.png', relationship: 'gifted' },
  { name: 'LEWKIN', logo: '/logos/lewkin.png', relationship: 'gifted' },
  { name: 'dailybean', logo: '/logos/dailybean.png', relationship: 'gifted' },
]

// Study and certification. Rendered in one row with `tools` — six marks, not
// the four the spec's x12/245/488/713 was written for.
export const experience: LogoItem[] = [
  { name: 'UOACS', logo: '/logos/uoacs.png' },
  { name: 'Google Analytics 4', logo: '/logos/ga4.png' },
  { name: 'HubSpot', logo: '/logos/hubspot.png' },
  { name: 'University of Auckland', logo: '/logos/uoa.png' },
]

// Editing software. Shares Credibility's lower ribbon with `experience`,
// appended after it.
export const tools: LogoItem[] = [
  { name: 'CapCut', logo: '/logos/capcut.png' },
  { name: 'DaVinci Resolve', logo: '/logos/davinci.png' },
]

// The star, over the phone's top left corner.
export const credibilityProps = {
  star: '/props/prop-small-2.png', // cream and black, 8-pointed
}

// ============================================================ pillars

// NOT YET EXPORTED: the three `paper` notes below. Every other path here points
// at a file that exists.
export const pillars = [
  {
    id: 'lifestyle' as Pillar,
    heading: 'Lifestyle content',
    subCaption: 'incl. beauty, fashion, self development',
    offerLabel: 'what i can offer you:',
    offer:
      'my lifestyle content is diverse and engaging, often inspiring people and [FINISH THIS SENTENCE — still blank in Figma]',
    props: ['/props/prop-lifestyle-1.png', '/props/prop-lifestyle-2.png'],
    paper: '/props/paper-note-lifestyle.png',
  },
  {
    id: 'travel' as Pillar,
    heading: 'Travel content',
    offerLabel: 'what i can offer you:',
    offer:
      'my travel content is well rehearsed and informational for people wanting to travel to places, displaying fun times while also being educational',
    props: ['/props/prop-travel.png'],
    paper: '/props/paper-note-travel.png',
  },
  {
    id: 'food' as Pillar,
    heading: 'Food content',
    offerLabel: '',
    offer:
      'my love for food can be felt through the screen - i have a knack for making food look amazing on camera, reach out for collabs!',
    props: ['/props/prop-food.png'],
    paper: '/props/paper-note-food.png',
  },
]

// Self-hosted in public/videos and public/posters. The travel ids read
// "travel-", not the "trav-" this originally shipped with — renaming three
// video files to match a naming convention is more churn than just letting
// the convention match what was actually uploaded.
export const reels: Reel[] = [
  { id: 'life-01', pillar: 'lifestyle', video: '/videos/life-01.mp4', poster: '/posters/life-01.jpg' },
  { id: 'life-02', pillar: 'lifestyle', video: '/videos/life-02.mp4', poster: '/posters/life-02.jpg' },
  { id: 'life-03', pillar: 'lifestyle', video: '/videos/life-03.mp4', poster: '/posters/life-03.jpg' },
  { id: 'travel-01', pillar: 'travel', video: '/videos/travel-01.mp4', poster: '/posters/travel-01.jpg' },
  { id: 'travel-02', pillar: 'travel', video: '/videos/travel-02.mp4', poster: '/posters/travel-02.jpg' },
  // The one source shot landscape, not portrait like the other eight.
  // Centre-cropped to the same 9:16 in both the video and its poster —
  // worth a reshoot in portrait if that crop reads too tight.
  { id: 'travel-03', pillar: 'travel', video: '/videos/travel-03.mp4', poster: '/posters/travel-03.jpg' },
  { id: 'food-01', pillar: 'food', video: '/videos/food-01.mp4', poster: '/posters/food-01.jpg' },
  { id: 'food-02', pillar: 'food', video: '/videos/food-02.mp4', poster: '/posters/food-02.jpg' },
  { id: 'food-03', pillar: 'food', video: '/videos/food-03.mp4', poster: '/posters/food-03.jpg' },
]

export const reelsByPillar = (p: Pillar) => reels.filter((r) => r.pillar === p)

// ============================================================ how i work

export const processHeading = 'how i work'

// The winding line the four steps sit along — one SVG, not four separate
// segments. 1020.6x1281 at 243.7,6428.5.
export const processPath = '/props/process-path.svg'

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
  props: { flower: '/props/flower.png' },
}

// ============================================================ travel notes popup
// Opened by clicking the white paper strip in the hero.
// Component is built now; the click is wired later (M5).

export const travelNotes = {
  texture: '/popup/crumpled-paper.jpg',
  props: {
    nySticker: '/popup/i-love-ny.png',
    toy: '/popup/jellycat.png',
    plane: '/popup/paper-plane.png',
  },
  /**
   * `label` is the caption under each prop in the popup ("about me",
   * "experience", "what i can do for you"); `linkTo` is the section id that
   * prop jumps to. Both live here rather than in the component because
   * they're copy/navigation decisions, same reasoning as everything else in
   * this file — see TravelNotesPopup for where the ids it points at come
   * from (Band's `id` prop on AboutMe, Credibility and the lifestyle pillar).
   * `linkTo` still says 'credibility' — that's the section's own id, unrenamed;
   * only the label reads "experience" now, matching the nav.
   */
  notes: [
    {
      id: 'ny',
      text: 'new york has a special place in my heart, my dream city :,)',
      label: 'about me',
      linkTo: 'about',
    },
    {
      id: 'fact',
      text: 'fun fact: i own a peanut jellycat named bernie! (AKA bernacle AKA big bern AKA bern)',
      label: 'experience',
      linkTo: 'credibility',
    },
    {
      id: 'travel',
      text: "i love travelling and experiencing new cultures, i've been to over 9 countries so far - and counting!",
      label: 'what i can\ndo for you',
      linkTo: 'work',
    },
  ],
}
