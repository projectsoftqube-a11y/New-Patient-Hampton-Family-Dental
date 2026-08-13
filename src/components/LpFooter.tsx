"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Phone } from "lucide-react";
import { useBooking } from "./BookingProvider";
import { Reveal } from "./Section";
import { PHONE_DISPLAY, PHONE_TEL, PRACTICE } from "@/lib/lp.config";

/**
 * `year` is passed in from the server component rather than computed here with
 * `new Date()`, which would be evaluated once during SSR and again on hydration
 * and can mismatch across a new year's boundary.
 */
export default function LpFooter({ year }: { year: number }) {
  const { open: openBooking } = useBooking();

  return (
    <footer className="relative w-full overflow-hidden bg-navy-dark px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
      {/* Radial gradient rather than a blurred circle - see OfferBand. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_35%_at_50%_0%,rgba(15,138,109,0.24),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden opacity-[0.05] mix-blend-overlay sm:block"
        style={{ backgroundImage: "url('/images/noise.webp')" }}
      />

      {/* The footer is the last thing the page says; it arrived fully formed
          while every section above it animated in. */}
      <Reveal className="relative mx-auto w-full max-w-2xl">
        {/* Same reasoning as the header: the wordmark carries the name, and its
            petrol lettering needs a light surface to read against. */}
        <Link
          href="/"
          aria-label="Hampton Family Dental - back to top"
          className="mx-auto mb-6 inline-flex rounded-xl bg-white px-4 py-2.5 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <Image
            src="/logo.avif"
            alt="Hampton Family Dental"
            width={1282}
            height={321}
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        <h2
          className="font-heading text-white"
          style={{
            fontSize: "clamp(1.4rem, 5.5vw, 2.4rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
          }}
        >
          A gentle first visit is waiting.
        </h2>

        <div className="mt-6 grid gap-2.5 sm:mx-auto sm:max-w-md sm:grid-cols-2 sm:gap-3">
          <a
            href={PHONE_TEL}
            data-cta="footer-call"
            className="flex items-center justify-center gap-2 rounded-2xl bg-urgent px-4 py-3.5 text-[15px] font-bold text-white shadow-[0_12px_32px_-8px_rgba(15,138,109,0.7)] transition-colors hover:bg-urgent-dark"
          >
            <Phone className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
            <span className="whitespace-nowrap">{PHONE_DISPLAY}</span>
          </a>
          <button
            type="button"
            onClick={() => openBooking("footer-book")}
            data-cta="footer-book"
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-4 py-3.5 text-[15px] font-bold text-white backdrop-blur-md transition-colors hover:bg-white/18"
          >
            <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            Book online
          </button>
        </div>

        <p className="mt-7 text-[12.5px] leading-relaxed text-steel-light/70">
          {PRACTICE.street}, {PRACTICE.city}, {PRACTICE.state} {PRACTICE.zip}
        </p>
        {/* The "*Example price" half of this line footnoted the $99 promo,
            which was pulled in Aug 2026 - there is no price left on the page
            for it to qualify. */}
        <p className="mt-2 text-[11.5px] leading-relaxed text-white/60">
          Formerly Brenner Dental Group
        </p>

        <p className="mt-5 text-[11px] text-white/55">
          © {year} {PRACTICE.name}. All rights reserved.
        </p>
      </Reveal>
    </footer>
  );
}
