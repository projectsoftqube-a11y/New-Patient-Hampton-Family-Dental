import type { Metadata } from "next";
import { Exo_2, Inter } from "next/font/google";
import "./globals.css";

/**
 * Type pairing - chosen for this page specifically, not inherited from the
 * main site.
 *
 * Headings: Exo 2, at the client's request (Aug 2026). A geometric sans with
 * slightly angled terminals - it replaced Fraunces, the warm serif this page
 * shipped with. Being a sans, it needs a sans fallback stack: see --font-heading
 * in globals.css, which was a serif stack and would have flashed a Georgia
 * heading before the webfont landed.
 *
 * Body and UI: Inter. Large x-height, open apertures, and genuine tabular
 * numerals - which matters here, because the phone number is the conversion
 * and it appears eight times.
 *
 * Both are variable fonts, self-hosted and subset by next/font, so this pairing
 * ships fewer bytes than the two static families it replaces.
 */
const exo2 = Exo_2({
  subsets: ["latin"],
  style: ["normal", "italic"],
  // Variable font - the whole wght range comes automatically, and headings
  // pick specific weights via Tailwind's font-* classes. Do not pin `weight`.
  variable: "--font-heading-family",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-family",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://hamptonfamilydentist.com"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${exo2.variable} ${inter.variable}`}>
      {/* No site header or footer by design - this is a paid-traffic landing
          page. Every outbound nav link is an exit path. The page supplies its
          own minimal header and footer. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
