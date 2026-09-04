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

          This deliberately has NO lower bound. A floor was tried and reverted:
          it makes a band larger than the viewport by design, which can only
          be reached by scrolling it, and a band that scrolls inside itself is
          a nested scroll container — it captures the wheel and stops the page
          being one continuous scroll. Below the floor it would also be wider
          than the screen, adding a horizontal scrollbar on every phone. The
          cost of leaving it out is that a phone scales the band right down
          (0.258 at 390px wide, putting 35px body copy at 9px), which is a
          real problem but a mobile-layout one — see CLAUDE.md.
        */}
        <Script id="canvas-scale" strategy="beforeInteractive">
          {`(function(){var d=document.documentElement;function s(){d.style.setProperty("--canvas-scale",String(Math.min(innerWidth/1511,innerHeight/956)))}s();addEventListener("resize",s,{passive:true})})()`}
        </Script>
        {children}
      </body>
    </html>
  );
}
