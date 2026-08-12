"use client";

import { Quote, Star } from "lucide-react";
import ReviewNote from "./ReviewNote";
import { Reveal } from "./Section";
import { REVIEWS } from "@/lib/content";

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`flex gap-0.5 ${className}`} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
          strokeWidth={0}
          aria-hidden
        />
      ))}
    </span>
  );
}

function ReviewCard({
  quote,
  duplicate = false,
}: {
  quote: string;
  /** Marks the marquee's second copy so it is not announced twice. */
  duplicate?: boolean;
}) {
  return (
    <figure
      aria-hidden={duplicate || undefined}
      className="flex w-[300px] shrink-0 flex-col rounded-2xl border border-beige-dark/50 bg-white p-5 shadow-[0_10px_30px_-20px_rgba(20,60,80,0.4)] sm:w-[360px] sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <Stars />
        <Quote className="h-5 w-5 shrink-0 text-urgent/30" strokeWidth={2} aria-hidden />
      </div>

      <blockquote className="mt-3.5 flex-1 text-[13.5px] leading-relaxed text-navy/80 sm:text-[14.5px]">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <figcaption className="mt-4 border-t border-beige pt-3.5">
        <p className="text-[11.5px] text-navy/50">Verified Google review</p>
      </figcaption>
    </figure>
  );
}

/**
 * Review marquee - one row, scrolling on a seamless infinite loop.
 *
 * The track renders its cards twice and translates by exactly -50%, so the
 * second copy lands precisely where the first began. Pure CSS (see the
 * lp-marquee keyframes in globals.css): a JS-driven marquee fires a state
 * update every frame and janks on mid-range phones.
 */
export default function Reviews() {
  // py-* on the clipping container, not margin on the cards. overflow-hidden
  // is needed horizontally so the track disappears at the edges, but it clips
  // vertically too - which would shave the shadow off every card. -my-*
  // cancels the padding again in the page layout.
  return (
    <section
      id="reviews"
      aria-label="Patient reviews"
      className="relative isolate flex w-full flex-col justify-center overflow-hidden border-y border-beige/70 bg-white py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_50%_at_15%_0%,rgba(30,96,118,0.06),transparent_70%),radial-gradient(45%_50%_at_90%_100%,rgba(15,138,109,0.06),transparent_72%)]"
      />

      {/* ── Header ──
          Wrapped so it arrives like every other section heading on the page;
          without this the reviews block was the only one that simply existed. */}
      <Reveal className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2.5">
          <span className="h-px w-6 shrink-0 bg-primary/40" aria-hidden />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            Social proof
          </span>
          <span className="h-px w-6 shrink-0 bg-primary/40" aria-hidden />
        </div>

        <h2 className="mt-3 font-heading text-[1.6rem] leading-[1.12] tracking-[-0.02em] text-navy sm:text-[2rem] lg:text-[2.6rem]">
          What our patients say
        </h2>

        <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-full border border-beige-dark/50 bg-white px-4 py-2.5 shadow-[0_1px_2px_rgba(20,60,80,0.04)]">
          <span className="font-heading text-[1.4rem] leading-none text-navy">4.9</span>
          <Stars />
          <span className="text-[12px] text-navy/55">
            Google reviews · Southampton, PA
          </span>
        </div>
      </Reveal>

      {/* ── Marquee ── */}
      <div className="relative mt-10 sm:mt-12 lg:mt-14">
        <div className="group relative -my-4 flex overflow-hidden py-4">
          <div
            className="flex shrink-0 items-stretch gap-4 pr-4 motion-safe:animate-[lp-marquee_linear_infinite] motion-safe:group-hover:[animation-play-state:paused] sm:gap-5 sm:pr-5"
            style={{ animationDuration: "70s" }}
          >
            {REVIEWS.map((quote) => (
              <ReviewCard key={quote} quote={quote} />
            ))}
            {/* Seamless-loop duplicate. Siblings of the originals - not wrapped
                - because -50% only lands on the second copy when both halves
                are identical flex children of the same track. */}
            {REVIEWS.map((quote) => (
              <ReviewCard key={`dup-${quote}`} quote={quote} duplicate />
            ))}
          </div>
        </div>

        {/* Edge fades so cards dissolve rather than being cut off mid-word. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent sm:w-28 lg:w-40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent sm:w-28 lg:w-40"
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <ReviewNote>
          [DEV] These five quotes are the copywriter&apos;s placeholders - they
          are NOT real reviews and carry no reviewer names. Replace all five
          with genuine reviews from the Google Business Profile before this page
          takes traffic; the Emergency LP already has the real set pulled from
          Google. Publishing invented testimonials attributed to patients is an
          FTC endorsement problem. [CONFIRM] the 4.9 rating and total review
          count - aggregateRating is deliberately omitted from the page schema
          until both are verified.
        </ReviewNote>
      </div>
    </section>
  );
}
