"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Clock, MapPin, Phone } from "lucide-react";
import { HOURS } from "@/lib/content";
import { PHONE_DISPLAY, PHONE_TEL, PRACTICE } from "@/lib/lp.config";

/**
 * Confirmation screen.
 *
 * The job here is not celebration, it is reassurance and dead time. Someone who
 * has just handed over their phone number wants to know three things: that it
 * arrived, when they will hear back, and what to do if they change their mind.
 * Everything on this page answers one of those.
 *
 * ── Fits one screen from `sm` up ──
 * No scrolling on tablet or desktop. That constraint drives the whole layout:
 *
 *  · The page is a flex column pinned to `h-dvh` at `sm`+ (`dvh`, not `vh`, so
 *    a mobile browser's collapsing address bar cannot cut the bottom off).
 *  · From `sm` the three "what happens next" steps sit in a row rather than a
 *    stack, and the address/hours pair sits beside them at `lg`.
 *  · Type and spacing step up in small increments rather than one big jump, so
 *    the content grows into the viewport instead of overflowing it.
 *
 * Below `sm` it scrolls normally - a 320px-wide phone cannot show this much
 * without shrinking the text past readable, and a phone user expects to scroll.
 */

/** Kept in step with the four steps in ProcessSteps. */
const WHAT_HAPPENS = [
  {
    title: "We call you back",
    body: "Usually the same day, or first thing the next working morning.",
  },
  {
    title: "We find a time that suits",
    body: "Evenings and early mornings are often available - just ask.",
  },
  {
    title: "Your first visit",
    body: "About an hour. A gentle exam, X-rays, a cleaning and an honest plan.",
  },
];

export default function ThankYou() {
  return (
    <main className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-beige-light sm:h-dvh sm:min-h-0">
      {/* Same ambient treatment as the hero, so this reads as the same site
          rather than a bare system page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_0%,rgba(15,138,109,0.12),transparent_70%),radial-gradient(40%_45%_at_0%_100%,rgba(30,96,118,0.10),transparent_70%)]"
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-8 text-center sm:px-6 sm:py-6 lg:py-8">
        <Link
          href="/"
          aria-label={`${PRACTICE.name} - back to the main page`}
          className="shrink-0 rounded-md transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <Image
            src="/logo.svg"
            alt={`${PRACTICE.name} - ${PRACTICE.city}, ${PRACTICE.state}`}
            width={1282}
            height={321}
            priority
            className="h-8 w-auto sm:h-9 lg:h-10"
          />
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-urgent/10 ring-1 ring-urgent/20 sm:mt-4 sm:h-14 sm:w-14 lg:mt-6 lg:h-16 lg:w-16"
        >
          <CheckCircle2
            className="h-7 w-7 text-urgent lg:h-8 lg:w-8"
            strokeWidth={2}
            aria-hidden
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 font-heading leading-[1.1] tracking-[-0.025em] text-navy sm:mt-3 lg:mt-4"
          style={{ fontSize: "clamp(1.5rem, 4.2vw, 2.4rem)" }}
        >
          Thank you - we&apos;ve got your request.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.26 }}
          className="mt-2.5 max-w-md text-[14px] leading-relaxed text-navy/65 sm:text-[14.5px] lg:text-[15.5px]"
        >
          Someone from the office will call you shortly to find a time that
          suits you. There&apos;s nothing else you need to do.
        </motion.p>

        {/* Calling is the one action still worth offering - someone who would
            rather not wait for the callback. */}
        <motion.a
          href={PHONE_TEL}
          data-cta="thankyou-call"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="mt-5 inline-flex w-full max-w-xs shrink-0 items-center justify-center gap-2 rounded-2xl bg-urgent px-5 py-3 text-[14.5px] font-bold text-white shadow-[0_14px_36px_-10px_rgba(15,138,109,0.7)] transition-colors hover:bg-urgent-dark active:scale-[0.99] sm:mt-4 sm:w-auto lg:mt-5 lg:py-3.5 lg:text-[15px]"
        >
          <Phone className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
          <span className="truncate">Prefer to talk? {PHONE_DISPLAY}</span>
        </motion.a>

        {/* At lg the steps and the details sit side by side, which is what
            keeps the whole page inside a laptop viewport. */}
        <div className="mt-6 grid w-full gap-2.5 text-left sm:mt-5 lg:mt-7 lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-3">
          <motion.ol
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-1 lg:gap-2.5"
          >
            {WHAT_HAPPENS.map((step, i) => (
              <li
                key={step.title}
                className="flex min-w-0 gap-3 rounded-2xl border border-beige-dark/50 bg-white p-3.5 sm:flex-col sm:gap-2 lg:flex-row lg:gap-3.5 lg:p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-urgent/10 text-[12.5px] font-bold tabular-nums text-urgent-dark">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h2 className="font-heading text-[14.5px] leading-snug text-navy lg:text-[15.5px]">
                    {step.title}
                  </h2>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-navy/60">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </motion.ol>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 lg:gap-2.5"
          >
            <div className="min-w-0 rounded-2xl border border-beige-dark/50 bg-white p-3.5 lg:p-4">
              <h2 className="flex items-center gap-2 text-[9.5px] font-bold uppercase tracking-[0.16em] text-primary">
                <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} aria-hidden />
                Where to find us
              </h2>
              <address className="mt-2 text-[12.5px] not-italic leading-relaxed text-navy/70">
                {PRACTICE.street}
                <br />
                {PRACTICE.city}, {PRACTICE.state} {PRACTICE.zip}
              </address>
              <a
                href={PRACTICE.mapsQuery}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="thankyou-directions"
                className="mt-2 inline-block text-[12.5px] font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary/60"
              >
                Get directions
              </a>
            </div>

            <div className="min-w-0 rounded-2xl border border-beige-dark/50 bg-white p-3.5 lg:p-4">
              <h2 className="flex items-center gap-2 text-[9.5px] font-bold uppercase tracking-[0.16em] text-primary">
                <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} aria-hidden />
                Opening hours
              </h2>
              <dl className="mt-2 space-y-0.5">
                {HOURS.map((row) => (
                  <div
                    key={row.day}
                    className="flex items-baseline justify-between gap-3"
                  >
                    <dt className="shrink-0 text-[12px] text-navy/60">
                      {row.day}
                    </dt>
                    <dd className="text-right text-[12px] font-medium tabular-nums text-navy/80">
                      {row.confirm ? "Call for hours" : row.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.58 }}
          className="mt-6 shrink-0 sm:mt-4 lg:mt-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-navy/55 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} aria-hidden />
            Back to the site
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
