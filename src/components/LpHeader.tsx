"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Phone } from "lucide-react";
import { useBooking } from "./BookingProvider";
import { PHONE_DISPLAY, PHONE_TEL, PRACTICE } from "@/lib/lp.config";

/**
 * Minimal landing-page header, light theme. No navigation by design - the only
 * interactive elements are the two conversions. Sticky on every breakpoint so
 * booking is always one tap away.
 */
export default function LpHeader() {
  const { open } = useBooking();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-beige/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-3 py-2.5 sm:px-6 sm:py-3">
        {/* Brand links to the top of this page, not out to the main site - the
            LP lives on its own subdomain (newpatients.hamptonfamilydentist.com)
            and sending paid traffic to the full site loses the conversion. */}
        <Link
          href="/"
          aria-label={`${PRACTICE.name} - back to top`}
          className="flex min-w-0 items-center rounded-md transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <Image
            src="/logo.avif"
            alt={`${PRACTICE.name} - ${PRACTICE.city}, ${PRACTICE.state}`}
            width={1282}
            height={321}
            priority
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Hidden below sm. The fixed StickyCallBar already puts "Call us"
              across the bottom of every phone screen, so this was the same
              action twice — and on a 320px header it crowded the logo and the
              booking CTA, which is the one that should dominate. */}
          <a
            href={PHONE_TEL}
            data-cta="header-call"
            className="hidden shrink-0 items-center gap-1.5 rounded-full border border-navy/12 bg-white px-3 py-2 text-[12.5px] font-bold text-navy transition-colors hover:border-primary/35 hover:text-primary sm:inline-flex sm:px-3.5 sm:text-[13.5px]"
          >
            <Phone className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.6} aria-hidden />
            {PHONE_DISPLAY}
          </a>

          {/* Booking is the primary action on this page - the emergency LP
              leads with the phone, but someone choosing a dentist is far more
              likely to book than to ring.

              Opens the form in a dialog rather than linking out. Keeping the
              visitor on the page is the whole point of a landing page, and it
              means this works today without the real BOOKING_URL, which is
              still [CONFIRM] in lp.config. */}
          <button
            type="button"
            onClick={() => open("header-book")}
            data-cta="header-book"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-urgent px-3.5 py-2 text-[12.5px] font-bold text-white shadow-[0_8px_20px_-6px_rgba(15,138,109,0.5)] transition-colors hover:bg-urgent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-urgent sm:gap-2 sm:px-4 sm:py-2.5 sm:text-[13.5px]"
          >
            <CalendarDays className="h-3.5 w-3.5 shrink-0" strokeWidth={2.6} aria-hidden />
            Book now
          </button>
        </div>
      </div>
    </header>
  );
}
