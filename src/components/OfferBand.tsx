"use client";

import { motion } from "framer-motion";
import { CalendarDays, ShieldCheck } from "lucide-react";
import { useBooking } from "./BookingProvider";
import { OFFER } from "@/lib/lp.config";

/**
 * The $99 new-patient offer.
 *
 * Glow is painted with radial gradients rather than blurred circles: a
 * blur-[120px] filter forces a large offscreen rasterisation on every paint
 * and visibly lags this band in while scrolling on mid-range phones.
 */
export default function OfferBand() {
  const { open: openBooking } = useBooking();

  return (
    <section className="w-full overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative isolate overflow-hidden rounded-3xl bg-navy px-5 py-8 text-center sm:px-8 sm:py-12 lg:px-14 lg:py-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_50%_-10%,rgba(30,96,118,0.30),transparent_70%),radial-gradient(50%_60%_at_100%_110%,rgba(30,96,118,0.45),transparent_72%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 hidden opacity-[0.06] mix-blend-overlay sm:block"
            style={{ backgroundImage: "url('/images/noise.webp')" }}
          />

          <span className="mx-auto inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/80 sm:text-[10.5px] sm:tracking-[0.2em] sm:backdrop-blur-sm">
            <ShieldCheck className="h-3 w-3 shrink-0" strokeWidth={2.4} aria-hidden />
            New-patient special
          </span>

          <p
            className="mt-4 font-heading text-white"
            style={{
              fontSize: "clamp(1.55rem, 6vw, 3.25rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
            }}
          >
            {OFFER.includes}{" "}
            <span className="whitespace-nowrap text-urgent-light">
              {OFFER.price}*
            </span>
          </p>

          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-white/70 sm:text-[15.5px]">
            Everything you need for a healthy start, in one relaxed visit. No
            surprise fees - we&apos;ll always explain any treatment and its cost{" "}
            <strong className="font-semibold text-white">before</strong> you
            decide.
          </p>

          <button
            type="button"
            onClick={() => openBooking("offer-book")}
            data-cta="offer-book"
            className="mt-7 inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-2xl bg-urgent px-5 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_36px_-8px_rgba(30,96,118,0.8)] transition-all hover:bg-urgent-dark active:scale-[0.99] sm:w-auto sm:text-[16px]"
          >
            <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
            <span className="truncate">Book my first visit</span>
          </button>

          <p className="mt-4 text-[11.5px] italic text-white/45">
            *{OFFER.disclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
