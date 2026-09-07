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
  /**
   * Pre-formatted strings ("9.1k", "800+"), not numbers — each platform's own
   * count formatting, not something to derive from a raw number here. `likes`
   * is what was given as "engagement"; the chip's heart icon is the only
   * reading of it on the page, so the field keeps that name.
   */
  views: string
  likes: string
  /** Where "watch here" on the reel's stat chip links — the original post,
   *  not the self-hosted clip already playing in the phone above it. */
  watchHref: string
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

export type AboutSlide = {
  image: string
  alt: string
  caption: string
  /**
   * The camera slide alone: plays behind camera.png's own transparent screen
   * cutout, muted and looping, with `posterImage` covering the gap before the
   * first frame decodes. See AboutCarousel for the cutout's measured inset.
   */
  video?: string
  posterImage?: string
}

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
    { platform: 'instagram', href: 'https://www.instagram.com/ashoom.ky/?hl=en' },
    { platform: 'tiktok', href: 'https://www.tiktok.com/@ashoom.ky?lang=en' },
    { platform: 'youtube', href: 'https://youtube.com/@ashoomky?si=aQhS3PYbzbOoD1i2' },
  ],
  // Not a social platform, so it isn't in `socials` above — the separate
  // professional portfolio site, linked beside the social row on Hero only.
  portfolioHref: 'https://ashleeshum.com',
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
    'i love being able to contribute to my community through creating meaningful content, connecting people all around the world.',
    "i am constantly seeking new experiences and opportunities to learn, create and grow within the things i'm passionate about.",
    "let's collaborate! :)",
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
    video: '/about/digicam-vid.mp4',
    posterImage: '/about/digicam-poster.jpg',
  },
  {
    image: '/about/katara.png',
    alt: '[ALT TEXT]',
    caption: 'one of my fav characters: katara from “avatar and the last air bender”',
  },
  {
    image: '/about/chocolate.png',
    alt: '[ALT TEXT]',
    caption: 'i could live off froyo + dubai chocolate forever',
  },
  {
    image: '/about/black-widow.png',
    alt: '[ALT TEXT]',
    caption: 'black widow is my fav marvel character!! specifically in captain america winter soldier',
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
    caption: "fantasy is my fav genre (don't talk to me about the poppy war trilogy)",
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

/**
 * The first 3 seconds of 7 of the 8 portrait reels (life-01/02/03,
 * travel-01/02, food-01/03 — travel-03 is the one landscape source, left out;
 * food-02 cut at the requester's call), concatenated in that order. Lives in
 * its own screen behind Credibility's phone, standing in for any single
 * pillar's clip since this phone sits beside all three's logos, not one.
 */
export const highlightReel = {
  video: '/credibility/highlight-reel.mp4',
  poster: '/credibility/highlight-reel-poster.jpg',
}

// ============================================================ pillars

// NOT YET EXPORTED: the three `paper` notes below. Every other path here points
// at a file that exists.
export const pillars = [
  {
    id: 'lifestyle' as Pillar,
    heading: 'Lifestyle content',
    subCaption: '',
    offerLabel: '',
    offer:
      'my lifestyle content is engaging and aesthetic, providing relateable and inspirational content. a few niches of mine contain content about beauty, fashion and self development!',
    props: ['/props/prop-lifestyle-1.png', '/props/prop-lifestyle-2.png'],
    paper: '/props/paper-note-lifestyle.png',
  },
  {
    id: 'travel' as Pillar,
    heading: 'Travel content',
    offerLabel: '',
    offer:
      'my travel content is fun and enticing for people wanting to travel, exhibiting fun times while also containing educational information about the location.',
    props: ['/props/prop-travel.png'],
    paper: '/props/paper-note-travel.png',
  },
  {
    id: 'food' as Pillar,
    heading: 'Food content',
    offerLabel: '',
    offer:
      'my love for food can be felt through the screen - i have a knack for making food look amazing on camera, and creating awareness and engagement with food brands / restaurants through my content.',
    props: ['/props/prop-food.png'],
    paper: '/props/paper-note-food.png',
  },
]

// Self-hosted in public/videos and public/posters. The travel ids read
// "travel-", not the "trav-" this originally shipped with — renaming three
// video files to match a naming convention is more churn than just letting
// the convention match what was actually uploaded.
export const reels: Reel[] = [
  {
    id: 'life-01',
    pillar: 'lifestyle',
    video: '/videos/life-01.mp4',
    poster: '/posters/life-01.jpg',
    views: '9.1k',
    likes: '800+',
    watchHref: 'https://www.tiktok.com/@ashoom.ky/video/7520208456784088328',
  },
  {
    id: 'life-02',
    pillar: 'lifestyle',
    video: '/videos/life-02.mp4',
    poster: '/posters/life-02.jpg',
    views: '17k',
    likes: '2k+',
    watchHref: 'https://www.tiktok.com/@ashoom.ky/video/7521302846566829330',
  },
  {
    id: 'life-03',
    pillar: 'lifestyle',
    video: '/videos/life-03.mp4',
    poster: '/posters/life-03.jpg',
    views: '6.5k',
    likes: '200+',
    watchHref: 'https://www.tiktok.com/@ashoom.ky/video/7625787651295137045',
  },
  {
    id: 'travel-01',
    pillar: 'travel',
    video: '/videos/travel-01.mp4',
    poster: '/posters/travel-01.jpg',
    views: '11.7k',
    likes: '1k+',
    watchHref: 'https://www.instagram.com/reel/DWpw1n0D8-N/?hl=en',
  },
  {
    id: 'travel-02',
    pillar: 'travel',
    video: '/videos/travel-02.mp4',
    poster: '/posters/travel-02.jpg',
    views: '2k+',
    likes: '200+',
    watchHref: 'https://www.tiktok.com/@ashoom.ky/video/7660703109580180757',
  },
  // The one source shot landscape, not portrait like the other eight — kept
  // that way rather than cropped to 9:16. This is the phone LAYOUTS.travel
  // turns 90deg, so a landscape clip is the one that actually belongs here;
  // an earlier version force-cropped it to portrait to match the other two
  // phones, which just cut up the shot for no reason.
  {
    id: 'travel-03',
    pillar: 'travel',
    video: '/videos/travel-03.mp4',
    poster: '/posters/travel-03.jpg',
    views: '6.7k+',
    likes: '300+',
    watchHref: 'https://www.youtube.com/watch?v=KK1dFcWQDkM',
  },
  {
    id: 'food-01',
    pillar: 'food',
    video: '/videos/food-01.mp4',
    poster: '/posters/food-01.jpg',
    views: '3k+',
    likes: '200+',
    watchHref: 'https://www.tiktok.com/@ashoom.ky/video/7584003394457586965',
  },
  {
    id: 'food-02',
    pillar: 'food',
    video: '/videos/food-02.mp4',
    poster: '/posters/food-02.jpg',
    views: '12.2k+',
    likes: '1k+',
    // A TikTok photo post, not a video — the source itself is a carousel of
    // photos, unlike the other eight's video posts.
    watchHref: 'https://www.tiktok.com/@ashoom.ky/photo/7571008215681420552',
  },
  {
    id: 'food-03',
    pillar: 'food',
    video: '/videos/food-03.mp4',
    poster: '/posters/food-03.jpg',
    views: '10.2k',
    likes: '600+',
    watchHref: 'https://www.tiktok.com/@ashoom.ky/video/7551595479105080584',
  },
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
    handle: 'testimonial',
    label: 'dailybean',
    quote:
      'Working with Ashlee was a lovely experience. She has a knack for seamlessly weaving a product into her everyday content, making it feel natural instead of forced. She will take her time to understand your product and find a way to create high-quality videos that feel authentic and relatable at the same time. We would love to collaborate with her again!',
  },
]

// ============================================================ contact

export const contact = {
  heading: "let's work together!!",
  email: 'ashoomky.business@gmail.com',
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
