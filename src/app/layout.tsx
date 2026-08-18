import type { Metadata } from "next";
import Script from "next/script";
import { Exo_2, Inter } from "next/font/google";
import "./globals.css";

/**
 * Google Tag Manager container - same container as the Emergency LP.
 *
 * Lives here rather than in a .env var because it is not a secret, it must be
 * identical across both landing pages, and a missing env var in the Vercel
 * dashboard would silently ship a page with no analytics at all.
 */
const GTM_ID = "GTM-WLNN5FJV";

/**
 * Google tag (gtag.js) IDs - GA4 property and Google Ads conversion account.
 *
 * Deliberately hardcoded alongside GTM rather than routed through it. Google's
 * own instructions offer both paths; the office asked for the direct install so
 * the Ads conversion works without any container configuration.
 *
 * ⚠️ Because this is hardcoded, a Google Ads Conversion tag must NOT also be
 * created inside GTM-WLNN5FJV for AW-18372303940 - the conversion would fire
 * twice and every reported conversion would be double-counted.
 *
 * The conversion event itself lives on the conversion page only:
 * src/app/thank-you/page.tsx.
 */
const GA4_ID = "G-1KLWZ2499J";
const GOOGLE_ADS_ID = "AW-18372303940";

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
      <head>
        {/* ── Google Tag Manager ──
            strategy="afterInteractive" is the correct one for GTM: it injects
            the tag into <head> but defers execution until after hydration, so
            the container cannot block first paint on a paid-traffic page whose
            whole job is loading fast. `beforeInteractive` would render-block.

            The dataLayer array is created here rather than inside the GTM
            snippet so anything that pushes to it before the container loads -
            the form's conversion event on a fast submit, say - is queued
            rather than throwing. */}
        <Script id="gtm-datalayer" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];`}
        </Script>
        <Script id="gtm-base" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>

        {/* ── Google tag (gtag.js) - GA4 + Google Ads ──
            Sitewide, as the Ads setup instructions require. `gtag` is defined
            on window here so the conversion snippet on /thank-you can call it;
            defining it inside a module scope would leave that page with an
            undefined function. */}
        <Script
          id="gtag-src"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        />
        <Script id="gtag-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA4_ID}');
gtag('config', '${GOOGLE_ADS_ID}');`}
        </Script>
      </head>

      {/* No site header or footer by design - this is a paid-traffic landing
          page. Every outbound nav link is an exit path. The page supplies its
          own minimal header and footer. */}
      <body suppressHydrationWarning>
        {/* GTM noscript fallback - must be the first thing inside <body>. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}
