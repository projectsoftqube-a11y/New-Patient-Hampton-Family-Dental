import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

import LpHeader from "@/components/LpHeader";
import Hero from "@/components/Hero";
import Audience from "@/components/Audience";
import InsuranceAndFinancing from "@/components/InsuranceAndFinancing";
import ProcessSteps from "@/components/ProcessSteps";
import MeetTheDentists from "@/components/MeetTheDentists";
import WhyUs from "@/components/WhyUs";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import LocationBlock from "@/components/LocationBlock";
import BookingProvider from "@/components/BookingProvider";
import LpFooter from "@/components/LpFooter";
import SmoothScroll from "@/components/SmoothScroll";
import StickyCallBar from "@/components/StickyCallBar";

import { FAQS } from "@/lib/content";
import { getCarriers } from "@/lib/insurance";
import { PHONE_DISPLAY, PRACTICE } from "@/lib/lp.config";

export const metadata: Metadata = {
  title:
    "Family Dentist Southampton PA | New Patients Welcome - Hampton Family Dental",
  description:
    `Now accepting new patients in Southampton, PA. Gentle, unhurried family dentistry - exam, X-rays & cleaning in one relaxed first visit. Most PPO insurances accepted. Call ${PHONE_DISPLAY}.`,
  alternates: { canonical: absoluteUrl("/") },
  // A paid-traffic landing page should not compete in organic search with the
  // main site's own new-patient page. It stays crawlable so quality signals and
  // conversion tracking work, but out of the index so the two never cannibalise
  // each other.
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    title: "New Patients Welcome - Family Dentist in Southampton, PA",
    description:
      "A gentle first visit with no pressure and no judgment. New-patient exam, X-rays & cleaning in one relaxed visit.",
    images: [
      {
        url: absoluteUrl("/images/lp/og-newpatients.jpg"),
        width: 1200,
        height: 630,
        alt: "New Patients Welcome - gentle family dentistry at Hampton Family Dental in Southampton, PA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Patients Welcome - Family Dentist in Southampton, PA",
    description:
      "A gentle first visit with no pressure and no judgment. New-patient exam, X-rays & cleaning in one relaxed visit.",
    images: [absoluteUrl("/images/lp/og-newpatients.jpg")],
  },
};

/**
 * Structured data.
 *
 * Deliberately omitted until the office confirms them:
 *  · aggregateRating - an unverifiable rating in schema risks a manual action,
 *    and the reviews on this page are still placeholders.
 *
 * Full opening hours are now emitted: the office confirmed Wednesday 8-2 and
 * Fri-Sun closed (Aug 2026), so every day of the week is accounted for.
 */
const dentistSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": absoluteUrl("/") + "#practice",
  name: PRACTICE.name,
  alternateName: "Brenner Dental Group",
  url: absoluteUrl("/"),
  telephone: "+1-215-357-2224",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: PRACTICE.street,
    addressLocality: PRACTICE.city,
    addressRegion: PRACTICE.state,
    postalCode: PRACTICE.zip,
    addressCountry: "US",
  },
  areaServed: [
    "Southampton, PA",
    "Richboro, PA",
    "Feasterville, PA",
    "Holland, PA",
    "Churchville, PA",
    "Ivyland, PA",
  ],
  availableService: {
    "@type": "MedicalProcedure",
    name: "New patient dental exam and cleaning",
    description:
      "New-patient examination, digital X-rays and professional cleaning for adults and children, plus routine family and preventive dentistry.",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Monday",
      opens: "09:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Tuesday",
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Wednesday",
      opens: "08:00",
      closes: "14:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Thursday",
      opens: "08:00",
      closes: "17:00",
    },
    // Confirmed closed by the office - stated explicitly rather than omitted so
    // Google shows "Closed" instead of leaving the day unknown.
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "00:00",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function NewPatientsLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Lenis. Renders nothing; no-ops entirely under prefers-reduced-motion
          and leaves native scrolling in place on touch devices. */}
      <SmoothScroll />

      {/* Skip link - the first tab stop should be the conversion, not the logo. */}
      <a
        href="#request"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to booking form
      </a>

      {/* Wraps everything with a booking CTA so all of them - header, hero,
          offer band, audience, footer and the sticky mobile bar - open one
          shared dialog rather than each mounting its own. */}
      <BookingProvider>
        <main className="w-full overflow-x-hidden bg-white pb-[52px] md:pb-0">
          <LpHeader />
          <Hero />
          {/* Mobile only. On a phone the client wants "what actually happens"
              answered before anything else, so this copy sits directly under
              the hero; the lg: copy below keeps the original placement and its
              full detail. Exactly one of the two renders at any width. */}
          <ProcessSteps variant="mobile" />
          {/* Mobile only - social proof directly after the first-visit steps.
              The lg: copy below keeps its original spot after WhyUs. */}
          <Reviews variant="mobile" />
          {/* Mobile only - the dentists are introduced before the cost
              section. The lg: copy below keeps the original order. */}
          <MeetTheDentists variant="mobile" />
          <Audience />
          {/* The $99 new-patient OfferBand sat here. Pulled at the office's
              request (Aug 2026) - a replacement offer is still being decided,
              so the component is left in the repo ready to drop back in. */}
          {/* Reads public/images/lp/insurance/ - any logo file present is used,
              any carrier without one renders as type. */}
          <InsuranceAndFinancing carriers={getCarriers()} />
          <ProcessSteps />
          <MeetTheDentists />
          <WhyUs />
          <Reviews />
          <Faq />
          <LocationBlock />
          <LpFooter year={new Date().getFullYear()} />
        </main>

        <StickyCallBar />
      </BookingProvider>
    </>
  );
}
