import type { Metadata } from "next";
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
    <html
      lang="en"
      className={[
        bootzy.variable,
        motherlane.variable,
        alteHaas.variable,
        oskon.variable,
        reenie.variable,
      ].join(" ")}
    >
      <body className="font-body bg-cream text-plum">{children}</body>
    </html>
  );
}
