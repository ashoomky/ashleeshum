# Figma spec — exact values

Pulled from `ashlee-s-personal-website.2 - creative portfolio`, frame `landing page` (`2076:30`).
File key `A4pqjdqSX4RVHyE5TxCLl4`.

Everything below is measured from the file, not estimated. Where a number looks odd (fractional offsets, the 206px contact strip) it is odd in the design too.

## Canvas

- **Design width: 1511px.** Not 1440. Build the layout at 1511 and scale from there.
- Total height 8909px.
- Sections are a stack of 956px bands, except Stats (321px) and How I Work (1912px, a double band).

## Section map

| Section | Top | Height | Ground |
|---|---|---|---|
| Hero | 0 | 956 | `#c9b1bd`, with a `#453643` panel at `left: 1193, width: 370`, full height |
| About | 955 | 956 | `#f4f2e0` |
| Stats | 1911 | 321 | `#453643` |
| Credibility | 2232 | 956 | `#79745c` |
| Lifestyle | 3188 | 956 | `#f4f2e0` |
| Travel | 4144 | 956 | `#f4f2e0` |
| Food | 5100 | 956 | `#f4f2e0` |
| How I Work | 6056 | 1912 | `#c9b1bd` |
| Contact | 7968 | 956 | `#453643` from x206; `#79745c` strip x0–206; `#f4f2e0` strip x0–144 |

Note the 1px overlaps between bands (About starts at 955, not 956). Harmless in Figma, but in code use a clean stack rather than reproducing the overlap.

## Type — real values

| Use | Font | Size | Tracking | Colour |
|---|---|---|---|---|
| "hi! i'm" | Bootzy TM | 50 | 1px | `#453643` |
| "shlee" | ZT Bros Oskon 90s | 240 | 4.8px | `#453643` |
| "hum" | ZT Bros Oskon 90s | 250 | 5px | `#453643` |
| "S" (rotated −17°) | Demo Motherlane | 370 | 7.4px | `#453643` |
| "ugc / marketing portfolio" | Alte Haas Grotesk | 25 | 0.75px | `#453643` |
| "about me." | Bootzy TM | 120 | 3.6px | `#453643` |
| About body | Helvetica | 35 | 1.05px | `#453643` |
| Stat numbers | Bootzy TM | 130 | 3.9px (5.2px on 1.57M) | `#f4f2e0` |
| Stat labels | Helvetica | 30 | 0.9px | `#f4f2e0` |
| Section titles ("brands i've worked with", "credentials / experience") | Bootzy TM | 60 | 1.8px | `#f4f2e0` |

The second of those titles **renders as "experience / tools"**, not the Figma wording, since that band carries experience and tools. See `experienceHeading` in `content/`.
| Pillar initial (L / T / F) | Demo Motherlane | 300 | 9px | `#453643` |
| Pillar word ("ifestyle content") | Alte Haas Grotesk | 80 | 2.4px | `#453643` |
| Pillar offer copy | Helvetica | 35 | 1.05px | `#453643` |
| Pillar sub-caption | Helvetica | 20 | 0.6px | `#453643` |
| "how i work" | Alte Haas Grotesk | 90 | **−3.6px** | `#453643` |
| Process step text | Helvetica | 40 | 1.2px | `#f4f2e0` |
| Process step numbers | Helvetica | 35 | 1.05px | `#453643` |
| Testimonial header | Bootzy TM | 45 | 1.35px | `#453643` |
| Testimonial body | Helvetica | 30 | 0.9px, justified | `#453643` |
| "let's work together!!" | Bootzy TM | 200 | 8px, line-height 78.165% | `#f4f2e0` |
| Contact chip text | Helvetica | 20 | 0.6px | `#453643` |

**The "A" in "Ashlee" is an image, not type** (`monogram_453643_2000px`, 543×380 at 61,192). The "S" in "Shum" is Demo Motherlane rotated −17°. Only "shlee" and "hum" are live text.

There are **no Figma variables defined in the file**, so there is no token set to import. The table above is the token set. Put it into `tailwind.config.ts` by hand.

## Key positions

**Hero.** "hi! i'm" at 213,189. Monogram A 543×380 at 61,192. "shlee" at 543,214. "S" at 398,546. "hum" at 693,418. Tagline pill `#f4f2e0` 345×40 radius 21 at 662,686, text at 688,691. Social icons at 639,715 (90px), 711,730 (59px), 756,721 (79px). Photostrip 122.7×637.5 rotated 9° at ~1137,209. Eleven 34px star SVGs scattered across the plum panel.

**The white paper strip** is `_ (9) 1`, 377×959, rotated 180°, at 1134,−4. This is the popup trigger.

**About.** "about me." at 819,1175. Body column starts x120: greeting 1201, paragraphs at 1261, 1396, 1576, width 564. Camera 614×349 at 797,1307. "[vlog]" at 1065,1675 in `#79745c`.

**Stats.** 6,800+ at 139,1998 · 1.57M at 660,1998 · 3+ at 1205,1994. Labels on the 2112–2118 line.

**Credibility.** Phone mockup 375×666 at 565,2352. Two cream bands 1572.3×173.56 rotated 3° and −1° at y2398 and y2751.

The rest of this band was re-measured from a later screenshot of the frame, and the numbers below supersede the originals — which were: brand logos ~128px square at 1057, 1201, 1347 on the 2475–2489 line, and four credential logos on the 2800–2811 line at x12, 245, 488, 713.

- The **cream bands run the full width of the screen**, not just the canvas. They are wider than 1511 and carry on past both edges.
- **Brand logos are 160 square**, at 978, 1154, 1330, still rotated 3°. Three at 160 will not fit from the old x1057 — they reach 1569, past the canvas.
- **The credential row carries six marks, not four**: UOACS, GA4, HubSpot, UoA, then CapCut and DaVinci. Evenly spread at 257 apart from x12, in a 200×120 box.
- Each row **sits on its band's centre line rather than a fixed y**, so it follows the tilt. Band one's centre falls ~38px between the middle of the canvas and the right of the brand row; band two's rises ~23px across the credential row. A single y leaves a row climbing out of its band.
- The **star** sits over the phone's top left corner, ~134 wide at 508,2293. The spec previously recorded it as belonging to this band without a coordinate.
- The **phone's screen is empty**, so the band behind shows through it.
- **No relationship markers.** An earlier build put an asterisk on each non-paid brand with a footnote under the row; both were removed. `relationship` is still recorded per brand in `content/`, just not drawn.
- There is **no "marketing director" caption**. One was added from a verbal note and has been removed; it appears nowhere in the frame.

**Pillars.** Phone frames are **309×549**. Lifestyle: three at x115/424/733, y3452. Travel: two at x173/482, y4375, third rotated 90° at 817,4648. Food: three at x428/737/1046, y5344.

**How I Work.** Cream bar 1334×113 at 89,6180. The winding line is a single SVG, 1020.6×1281 at 243.7,6428.5. Steps at (122,6411), (1063,6559), (201,7087), (533,7694). Testimonial card 757 wide, header 82 tall, body 184, at 756,7343.

**Contact.** Headline at 391,8184, width 720. Email pill 350×40 at 391,8729. Phone pill 213×40 at 763,8729. Flower 482×425 at 773,8122.

## Assets to export

Every image below is already in the file. Export at 2x from Figma rather than screenshotting.

Hero: monogram A, photostrip, paper strip (`_ (9) 1`), star SVG, three social icons, flower (`___4_-removebg-preview`).
About: camera (`___2_-removebg-preview`), the decorative element at 1057,999.
Credibility: phone mockup (`___3_-removebg-preview`), Charles & Keith logo, LEWKIN logo, dailybean logo, UOACS header, GA4 logo, HubSpot logo, UoA logo, plus the CapCut and DaVinci marks that now share the lower band, and the star that sits on the phone.
Pillars: reuse the phone mockup; props at 396,3307 / 1237,3727 / 529,4215 / 151,5714.
How I Work: the winding path SVG (`Vector 1`).
Contact: flower.

The phone frame is the same image reused 10 times. Build it once as a component with the image as its frame, video poster inside.

## Two things the file already tells us

1. **One node is already animated** (`2140:918`, a rotate track on the lifestyle prop). The design exports with `motion/react`. Not needed for the static build, but the motion data is there when you want it.
2. **Brand logos found:** Charles & Keith, LEWKIN, dailybean. Confirm the relationship for each (paid / gifted / concept) before they ship.

## Corrections to earlier assumptions

- Design width is 1511, not 1440.
- Email is `ashoomky.business@gmail.com`.
- Phone is `+64 21 236 3800`.
- The book series is the **Poppy War** trilogy.
- The unreadable fun fact: "i own a peanut jellycat named bernie! (AKA bernacle AKA big bern AKA bern)".
- Countries visited: over 9.
- The lifestyle offer line still ends in a blank in Figma: "often inspiring people and _____".
