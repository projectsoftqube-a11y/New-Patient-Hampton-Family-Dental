"use client";

import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Phone } from "lucide-react";
import ImageSlot from "./ImageSlot";
import LeadForm from "./LeadForm";
import { useBooking } from "./BookingProvider";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/lp.config";

// The "$99 exam, X-rays & cleaning" chip was pulled with the rest of the
// promo (Aug 2026); a replacement offer is still being decided.
const CHIPS = [
  "Now accepting new patients - all ages",
  "Most PPO insurances accepted - No Insurance, No problem! Ask about our office plans",
  "Gentle, honest care - we take our time",
];

/**
 * Light-theme hero, matching the Emergency LP's treatment: copy left on a
 * near-white wash, photograph full-bleed behind the whole section and faded
 * out across one continuous ramp so there is no seam.
 *
 * Where the emergency page shouts, this one reassures - the headline is an
 * invitation, and booking leads over calling.
 */
export default function Hero() {
  const { open: openBooking } = useBooking();

  return (
    // id is the anchor StickyCallBar observes to know when the hero has
    // scrolled away - see src/components/StickyCallBar.tsx.
    <section id="hero" className="relative isolate w-full overflow-hidden bg-white">
      {/* ── Background wash ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-[linear-gradient(160deg,#F7FAFC_0%,#EEF3F8_45%,#F4F7FA_100%)]"
      />

      {/* Ambient blooms as radial gradients, not blur filters - a large blur is
          one of the most expensive things a phone GPU can rasterise, and this
          is the first thing on the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(40%_45%_at_0%_0%,rgba(30,96,118,0.10),transparent_70%),radial-gradient(35%_40%_at_25%_100%,rgba(15,138,109,0.10),transparent_70%)]"
      />

      {/* ── Photograph - full-bleed behind the section (desktop) ── */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        <ImageSlot
          label="Hero - welcoming family dental reception"
          file="lp/hero-new-patients.webp"
          dimensions="2400 × 1400"
          alt="A patient being warmly welcomed at the Hampton Family Dental front desk in Southampton, PA"
          src="/images/lp/hero-new-patients.webp"
          tone="light"
          corner
          priority
          sizes="100vw"
          className="h-full w-full"
          objectPosition="70% 40%"
        />

        {/* One continuous ramp across the full width - solid under the
            headline, gone by the right edge, so nothing reads as a cut. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(95deg,#F4F7FA_0%,#F4F7FA_26%,rgba(244,247,250,0.94)_38%,rgba(244,247,250,0.78)_50%,rgba(244,247,250,0.52)_64%,rgba(244,247,250,0.26)_80%,rgba(244,247,250,0.10)_100%)]"
        />
        <div aria-hidden className="absolute inset-0 bg-white/30" />
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 z-[1] h-px bg-beige/70" />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-4 pb-12 pt-9 sm:px-6 sm:pb-16 sm:pt-12 lg:min-h-[660px] lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Left - the invitation */}
          <div className="min-w-0">
            {/* Was a single pill holding "New Patients · Family Dentist ·
                Southampton, PA" with `truncate`, which on a phone rendered as
                "...· SO…" — the location, the most useful word in the line,
                was the part being thrown away. Truncation hid the overflow
                rather than solving it.

                Now: the status claim leads on its own line, and the two facts
                sit beneath as separate items that wrap instead of clipping.
                Nothing is ever cut off at any width, and the eye gets a
                hierarchy rather than one undifferentiated run of small caps. */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-start gap-2"
            >
              {/*
                The status badge. Three layers, all continuous, all on
                compositor-only properties - see the lp-sheen / lp-breathe
                notes in globals.css:

                  1. a halo that breathes behind the pill,
                  2. a sheen that sweeps across its face,
                  3. the live dot, which keeps its own faster pulse.

                isolate + overflow-hidden on the pill clip the sheen to the
                rounded shape; the text sits above both on z-10.
              */}
              <span className="relative inline-flex max-w-full">
                {/* Expanding ring, drawn from the chip's own edge. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-urgent/45 motion-safe:animate-[lp-halo_4.5s_ease-out_infinite]"
                />

                <span className="relative isolate inline-flex max-w-full items-center gap-2 overflow-hidden rounded-full bg-urgent px-3.5 py-1.5 shadow-[0_6px_18px_-8px_rgba(15,138,109,0.9)]">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-1/3 z-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent motion-safe:animate-[lp-sheen_5.5s_ease-in-out_infinite]"
                  />

                  {/* Live dot - a quiet "we're open to you right now" signal. */}
                  <span className="relative z-10 flex h-2 w-2 shrink-0" aria-hidden>
                    <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-70 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                  </span>

                  <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.14em] text-white sm:text-[11px] sm:tracking-[0.16em]">
                    Now accepting new patients
                  </span>
                </span>
              </span>

              <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/50 sm:text-[11.5px]">
                <span>Family Dentist</span>
                <span aria-hidden className="h-3 w-px bg-navy/15" />
                <span>Southampton, PA</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-heading text-navy"
              style={{
                fontSize: "clamp(1.9rem, 5.4vw, 3.6rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.035em",
              }}
            >
              Let&apos;s find you a dentist you&apos;ll actually look forward
              to.
            </motion.h1>

            {/* Mobile-only image. On phones the copy is trimmed, and this
                carries the warmth the background photo does on desktop. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 lg:hidden"
            >
              <ImageSlot
                label="Hero - welcoming family dental reception"
                file="lp/hero-new-patients.webp"
                src="/images/lp/hero-new-patients.webp"
                dimensions="2400 × 1400"
                alt="A patient being warmly welcomed at the Hampton Family Dental front desk in Southampton, PA"
                tone="light"
                corner
                // Was 4/3. Shortened by ~30% at the client's request so the
                // form and CTAs sit higher on a phone.
                className="aspect-video w-full rounded-2xl ring-1 ring-navy/8"
                sizes="100vw"
                objectPosition="center 40%"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-5 hidden max-w-lg text-[15px] leading-relaxed text-navy/70 sm:text-[16.5px] lg:block lg:text-[17.5px]"
            >
              Southampton&apos;s gentle family dentist, now welcoming new
              patients. Come in for an easy first visit -{" "}
              <strong className="font-semibold text-navy">
                no pressure, no judgment, and no rush.
              </strong>
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mt-3 hidden max-w-lg text-[13.5px] italic leading-relaxed text-navy/50 lg:block"
            >
              Formerly Brenner Dental Group - same trusted team, same
              Southampton location.
            </motion.p>

            {/* CTAs - booking first here, unlike the emergency page. */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-6 grid gap-2.5 sm:grid-cols-2 sm:gap-3"
            >
              <button
                type="button"
                onClick={() => openBooking("hero-book")}
                data-cta="hero-book"
                className="group flex min-w-0 items-center justify-center gap-2.5 rounded-2xl bg-urgent px-4 py-2.5 text-white shadow-[0_14px_32px_-10px_rgba(15,138,109,0.65)] transition-all hover:bg-urgent-dark hover:shadow-[0_18px_40px_-10px_rgba(15,138,109,0.75)] active:scale-[0.99] sm:py-4"
              >
                <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                <span className="min-w-0 text-left">
                  <span className="block text-[15px] font-bold leading-tight sm:text-[16px]">
                    Book online
                  </span>
                  <span className="block text-[11px] font-medium leading-tight text-white/85">
                    New-patient visit
                  </span>
                </span>
              </button>

              <a
                href={PHONE_TEL}
                data-cta="hero-call"
                className="group flex min-w-0 items-center justify-center gap-2.5 rounded-2xl border border-navy/12 bg-white px-4 py-2.5 text-navy shadow-[0_10px_28px_-14px_rgba(20,60,80,0.45)] transition-all hover:border-primary/35 hover:bg-beige-light active:scale-[0.99] sm:py-4"
              >
                <Phone className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.4} aria-hidden />
                <span className="min-w-0 text-left">
                  <span className="block text-[15px] font-bold leading-tight sm:text-[16px]">
                    Call us
                  </span>
                  <span className="block text-[11px] font-medium leading-tight text-navy/55">
                    {PHONE_DISPLAY}
                  </span>
                </span>
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.34 }}
              className="mt-6 hidden flex-wrap gap-2 lg:flex"
            >
              {CHIPS.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy/8 bg-white/85 px-3 py-1.5 shadow-[0_2px_8px_-4px_rgba(20,60,80,0.15)] backdrop-blur-sm"
                >
                  <CheckCircle2
                    className="h-3.5 w-3.5 shrink-0 text-urgent"
                    strokeWidth={2.2}
                    aria-hidden
                  />
                  <span className="min-w-0 text-[12.5px] font-medium leading-none text-navy/75">
                    {item}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right - the form */}
          <div id="request" className="min-w-0 scroll-mt-24 lg:sticky lg:top-24">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
