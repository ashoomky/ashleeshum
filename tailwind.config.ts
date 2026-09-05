// tailwind.config.ts
//
// Every value here is measured from the Figma file
// (A4pqjdqSX4RVHyE5TxCLl4, frame "landing page" 2076:30).
// The file defines no Figma variables, so THIS FILE IS THE TOKEN SET.
//
// Rule: no arbitrary values in components — no text- or bg- class with square
// brackets round a raw px size or hex colour. If something needs a value that
// isn't here, add it here first.
//
// (Written without the literal bracket syntax on purpose: Tailwind v4 scans this
// file too, and an example spelled out in full gets compiled into a real utility.)

import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    // Replaced, not extended — the design uses five colours and nothing else.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      cream: '#f4f2e0',
      plum: '#453643',
      thistle: '#c9b1bd',
      olive: '#79745c',
      ink: '#0d1b1e',
    },

    fontFamily: {
      signature: ['var(--font-bootzy)', 'cursive'], // Bootzy TM
      display: ['var(--font-motherlane)', 'Georgia', 'serif'], // Demo Motherlane, initials only
      heading: ['var(--font-alte-haas)', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      label: ['var(--font-oskon)', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      hand: ['var(--font-reenie)', 'cursive'], // Reenie Beanie, travel notes popup
      body: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'], // never self-hosted
    },

    /**
     * Named for the role, not the pixel size, so components read like the design.
     * Each entry carries its own line-height and letter-spacing, so one class
     * sets all three. Tracking is absolute px, as in Figma.
     */
    fontSize: {
      // hero
      'hero-greeting': ['50px', { lineHeight: 'normal', letterSpacing: '1px' }],
      'hero-name': ['240px', { lineHeight: 'normal', letterSpacing: '4.8px' }],
      'hero-name-lg': ['250px', { lineHeight: 'normal', letterSpacing: '5px' }],
      'hero-initial': ['370px', { lineHeight: 'normal', letterSpacing: '7.4px' }],
      tagline: ['25px', { lineHeight: 'normal', letterSpacing: '0.75px' }],

      // section headings
      'script-lg': ['120px', { lineHeight: 'normal', letterSpacing: '3.6px' }], // "about me."
      'script-sm': ['60px', { lineHeight: 'normal', letterSpacing: '1.8px' }], // "brands i've worked with"
      'testimonial-head': ['45px', { lineHeight: 'normal', letterSpacing: '1.35px' }],

      // pillars
      'pillar-initial': ['300px', { lineHeight: 'normal', letterSpacing: '9px' }],
      'pillar-word': ['80px', { lineHeight: 'normal', letterSpacing: '2.4px' }],

      // stats
      stat: ['130px', { lineHeight: 'normal', letterSpacing: '3.9px' }],
      // 1.57M is tracked wider than the other two
      'stat-wide': ['130px', { lineHeight: 'normal', letterSpacing: '5.2px' }],

      // process + contact
      'process-heading': ['90px', { lineHeight: 'normal', letterSpacing: '-3.6px' }],
      'process-step': ['40px', { lineHeight: 'normal', letterSpacing: '1.2px' }],
      'contact-heading': ['200px', { lineHeight: '0.78165', letterSpacing: '8px' }],

      // body scale
      'body-lg': ['35px', { lineHeight: 'normal', letterSpacing: '1.05px' }],
      body: ['30px', { lineHeight: 'normal', letterSpacing: '0.9px' }],
      'body-sm': ['25px', { lineHeight: 'normal', letterSpacing: '0.75px' }],
      caption: ['20px', { lineHeight: 'normal', letterSpacing: '0.6px' }],

      // travel notes popup — not in the Figma spec (the popup's contents
      // aren't a documented frame), so these are placed by eye rather than
      // measured. Handwriting faces read smaller than they measure, hence
      // the looser line-height than the body scale above.
      note: ['20px', { lineHeight: '1.3', letterSpacing: 'normal' }],
      'note-close': ['32px', { lineHeight: '1', letterSpacing: 'normal' }],
    },

    extend: {
      maxWidth: {
        // Design width. Not 1440.
        canvas: '1511px',
      },

      width: {
        canvas: '1511px',
        'hero-panel': '370px', // plum panel, hero right
        'contact-olive': '206px',
        'contact-cream': '144px',
        phone: '309px', // pillar phone frame
        'phone-lg': '375px', // credibility phone mockup
        'text-col': '564px', // about body column
        chip: '345px', // tagline pill
        'chip-email': '350px', // contact email pill
        'chip-phone': '213px', // contact phone pill
      },

      height: {
        band: '956px', // every section except the two below
        'band-stats': '321px',
        'band-process': '1912px',
        phone: '549px',
        'phone-lg': '666px',
        chip: '40px',
      },

      spacing: {
        gutter: '120px', // about body column left edge
        'pillar-gap': '309px', // phone frames sit edge to edge
      },

      /**
       * The screen window cut into props/phone-frame.png, as a percentage of
       * the frame box. Measured off the asset itself: the transparent screen
       * sits at 91 / 89 / 49 / 48px inside a 750x1332 image. Percentages, not
       * px, so one set of values serves both PhoneFrame sizes — the art and
       * both boxes share an aspect ratio of 0.563.
       */
      inset: {
        'screen-l': '12.133%',
        'screen-r': '11.867%',
        'screen-t': '3.679%',
        'screen-b': '3.604%',
      },

      borderRadius: {
        chip: '21px',
      },

      rotate: {
        // exact rotations used in the design
        'initial-s': '-17deg',
        photostrip: '9deg',
        band: '3deg',
        'band-alt': '-1deg',
        prop: '-9deg',
        'prop-alt': '-15deg',
        sticker: '122deg',
      },
    },
  },
  plugins: [],
}

export default config
