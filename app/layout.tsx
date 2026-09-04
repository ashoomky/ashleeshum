import type { Metadata } from "next";
import Script from "next/script";
import { bootzy, motherlane, alteHaas, oskon, reenie } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ashlee Shum — UGC / marketing portfolio",
  description: "UGC and marketing portfolio showcasing brand content, campaigns, and creative work by Ashlee Shum.",
  openGraph: {
    title: "Ashlee Shum — UGC / marketing portfolio",
    description: "UGC and marketing portfolio showcasing brand content, campaigns, and creative work by Ashlee Shum.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The scale script below writes a style attribute onto <html> before React
    // hydrates, which React would otherwise report as a mismatch. The
    // suppression is shallow — it covers this element's attributes only, not
    // the tree beneath it.
    <html
      suppressHydrationWarning
      lang="en"
      className={[
        bootzy.variable,
        motherlane.variable,
        alteHaas.variable,
        oskon.variable,
        reenie.variable,
      ].join(" ")}
    >
      <body className="font-body bg-cream text-plum">
        {/*
          Sets --canvas-scale before first paint, so a Band never appears at the
          wrong size and then jumps. Sections are built at the design's 1511x956
          and scaled to fit the viewport, so this is layout rather than
          decoration and cannot wait for hydration. See components/Band.

          MIN=0.5 is a floor on how far a band will shrink, below which Band
          switches from fitting the screen to scrolling instead. Without it,
          this scales all the way down on a phone — on a 390px-wide viewport,
          scale would be 0.258, which sets the About paragraphs (35px in the
          design) to 9px and the carousel's 44px arrows to 11px: unreadable,
          untappable. 0.5 is a provisional, easy-to-tune placeholder, not a
          design decision — see the READ THIS FIRST note in components/Band.
        */}
        <Script id="canvas-scale" strategy="beforeInteractive">
          {`(function(){var d=document.documentElement;var MIN=0.5;function s(){d.style.setProperty("--canvas-scale",String(Math.max(MIN,Math.min(innerWidth/1511,innerHeight/956))))}s();addEventListener("resize",s,{passive:true})})()`}
        </Script>
        {children}
      </body>
    </html>
  );
}
