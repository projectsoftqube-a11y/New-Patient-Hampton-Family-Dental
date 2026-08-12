"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  RefreshCw,
  Smile,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeading } from "./Section";
import { AUDIENCE } from "@/lib/content";
import { useBooking } from "./BookingProvider";

const ICONS: Record<string, LucideIcon> = {
  MapPin,
  Smile,
  Users,
  RefreshCw,
  Sparkles,
};

/**
 * "Sound like you?" - audience recognition.
 *
 * The job of this section is for the visitor to find themselves in one of the
 * five rows. Someone who has avoided the dentist for years and someone who
 * just moved to the area arrive with completely different anxieties, and the
 * page converts better when it names them rather than addressing a generic
 * "new patient".
 *
 * ── Layout ──
 * Five items divide badly. A three-column grid leaves an orphan hole in the
 * last row, and five equal cards give the eye no entry point - every card the
 * same weight means the visitor reads all five or none.
 *
 * So: one feature card at 2×2 carrying "it's been a while", plus four compact
 * cards. That fills a 4×2 grid exactly with no gap, and gives the section a
 * clear focal point. The feature slot is the anxious lapsed patient because
 * that is both the hardest objection on the page and the one this practice
 * most wants to answer - the others are logistics, this one is fear.
 */

/** The row promoted to the large card. Index into AUDIENCE. */
const FEATURE_INDEX = 1;

export default function Audience() {
  const { open: openBooking } = useBooking();
  const feature = AUDIENCE[FEATURE_INDEX];
  const rest = AUDIENCE.filter((_, i) => i !== FEATURE_INDEX);
  const FeatureIcon = ICONS[feature.icon];

  return (
    <Section id="who" className="bg-beige-light">
      {/* Hairline grid, masked to a soft ellipse - structure under the cards
          without competing with them. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_45%,#000,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(30,96,118,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,96,118,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative">
        <SectionHeading
          eyebrow="Sound like you?"
          title={
            <>
              Wherever you&apos;re coming from,{" "}
              <span className="font-normal italic text-primary">
                you&apos;re welcome here.
              </span>
            </>
          }
          lead="Most new patients arrive for one of these five reasons. Find yours - the first visit is the same gentle, unhurried hour either way."
        />

        <div className="mt-8 grid gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
          {/* ── Feature card - spans 2×2 ── */}
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-primary/15 sm:col-span-2 sm:p-7 lg:row-span-2 lg:p-8"
          >
            {/* Deliberately light, not navy. The offer band directly below this
                section is a full navy panel - a dark feature card here would
                sit a few dozen pixels above it and the two would read as one
                heavy mass, spending the offer's impact early. The teal wash
                and ring give the card its weight instead. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_65%_at_10%_0%,rgba(15,138,109,0.10),transparent_70%),radial-gradient(65%_60%_at_100%_100%,rgba(30,96,118,0.10),transparent_72%)]"
            />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-urgent/10 px-3 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-urgent-dark ring-1 ring-urgent/20 sm:text-[10px] sm:tracking-[0.18em]">
                Most common
              </span>

              <span className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-urgent/10 text-urgent ring-1 ring-urgent/20 transition-transform duration-500 group-hover:scale-105 lg:h-16 lg:w-16">
                <FeatureIcon className="h-7 w-7 lg:h-8 lg:w-8" strokeWidth={1.9} aria-hidden />
              </span>

              <h3 className="mt-5 font-heading text-[22px] leading-[1.15] tracking-[-0.01em] text-navy sm:text-[26px] lg:text-[30px]">
                {feature.tag}
              </h3>

              <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-navy/60 sm:text-[15.5px]">
                <span className="font-semibold text-navy">
                  {feature.title}.
                </span>{" "}
                {feature.body}
              </p>
            </div>

            <p className="relative mt-7 border-t border-beige-dark/50 pt-5 text-[13.5px] leading-relaxed text-navy/55">
              We will never make you feel bad about how long it&apos;s been.
              You&apos;re here now - that&apos;s the part that counts.
            </p>
          </motion.article>

          {/* ── Four supporting cards ── */}
          {rest.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.45,
                  delay: 0.06 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-3xl border border-beige-dark/50 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_22px_44px_-28px_rgba(20,60,80,0.6)] sm:p-6"
              >
                {/* Tint that washes in from the top-left on hover. Cheaper than
                    animating the background colour and it keeps the card's
                    white base for the text to sit on. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_0%_0%,rgba(30,96,118,0.07),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="relative flex items-start gap-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary ring-1 ring-primary/12 transition-colors duration-300 group-hover:bg-primary group-hover:text-white group-hover:ring-primary">
                    <Icon className="h-5 w-5" strokeWidth={2.1} aria-hidden />
                  </span>

                  <h3 className="min-w-0 pt-1.5 font-heading text-[16.5px] leading-snug text-navy sm:text-[17.5px]">
                    {item.tag}
                  </h3>
                </div>

                <p className="relative mt-3.5 text-[13.5px] leading-relaxed text-navy/60">
                  <span className="font-medium text-navy/85">
                    {item.title}.
                  </span>{" "}
                  {item.body}
                </p>
              </motion.article>
            );
          })}
        </div>

        {/* Deliberately NOT a button. The offer band immediately below opens
            with the $99 price and a teal "Book my first visit" CTA; a second
            teal button here would be the same ask, weaker, and eight pixels
            earlier. This closes the recognition thought and hands off to it. */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-[13.5px] leading-relaxed text-navy/55"
        >
          <span>None of these quite you?</span>
          <span className="font-medium text-navy/75">
            You&apos;re still welcome -
          </span>
          <button
            type="button"
            onClick={() => openBooking("audience-book")}
            data-cta="audience-book"
            className="group/link inline-flex items-center gap-1 font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary-dark hover:decoration-primary/60"
          >
            tell us when you book
            <ArrowRight
              className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/link:translate-x-0.5"
              strokeWidth={2.6}
              aria-hidden
            />
          </button>
        </motion.div>
      </div>
    </Section>
  );
}
