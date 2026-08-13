"use client";

import { Star } from "lucide-react";
import ReviewNote from "./ReviewNote";
import { Reveal } from "./Section";
import { REVIEWS, type Review } from "@/lib/content";

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

/**
 * The Google "G" in its four brand colours.
 *
 * Inline SVG rather than an image file: it is a handful of paths, it must stay
 * crisp at 18px on a retina phone, and an <img> here would be one more network
 * round-trip for something this small.
 */
function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden focusable="false">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

/**
 * Avatar tints. Google assigns each reviewer a colour; picking from a small
 * fixed set by name keeps the row varied without looking random, and the same
 * person always gets the same colour across a re-render.
 */
const AVATAR_TONES = [
  "bg-[#1E6076] text-white",
  "bg-[#0F8A6D] text-white",
  "bg-[#B8531F] text-white",
  "bg-[#5B4B8A] text-white",
  "bg-[#1B7A9E] text-white",
];

function initial(name: string) {
  return name.trim().charAt(0).toUpperCase();
}

function toneFor(name: string) {
  // Sum of char codes - a stable, dependency-free hash.
  const n = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_TONES[n % AVATAR_TONES.length];
}

/**
 * A single review, styled to read like a card lifted from a Google Business
 * Profile: coloured initial avatar, name, review count, the Google mark, a
 * star row and the relative date.
 *
 * These are the practice's real Google reviews - see REVIEWS in
 * src/lib/content.ts. Do not substitute invented quotes or names here.
 */
function ReviewCard({
  review,
  duplicate = false,
}: {
  review: Review;
  /** Marks the marquee's second copy so it is not announced twice. */
  duplicate?: boolean;
}) {
  return (
    <figure
      aria-hidden={duplicate || undefined}
      className="flex h-full w-[300px] shrink-0 snap-center flex-col rounded-2xl border border-beige-dark/50 bg-white p-5 shadow-[0_10px_30px_-20px_rgba(20,60,80,0.4)] sm:w-[360px] sm:p-6"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          aria-hidden
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[14px] font-bold ${toneFor(
            review.name
          )}`}
        >
          {initial(review.name)}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13.5px] font-semibold text-navy">
            {review.name}
          </span>
          <span className="mt-0.5 block truncate text-[11px] text-navy/45">
            {review.meta}
          </span>
        </span>

        <GoogleG className="h-[18px] w-[18px] shrink-0" />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Stars />
        <span className="text-[11.5px] text-navy/45">{review.when}</span>
      </div>

      {/* Clamped so one long review cannot make every card in the row tall.
          The full text stays in the DOM for screen readers and for SEO. */}
      <blockquote className="mt-2.5 line-clamp-6 flex-1 text-[13.5px] leading-relaxed text-navy/80 sm:text-[14.5px]">
        {review.quote}
      </blockquote>

      <figcaption className="mt-4 flex items-center gap-1.5 border-t border-beige pt-3.5 text-[11.5px] text-navy/50">
        <GoogleG className="h-3.5 w-3.5 shrink-0" />
        Posted on Google
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
/**
 * Placed twice in the page, each copy rendering at exactly one breakpoint -
 * see src/app/page.tsx. On mobile the client wants social proof directly under
 * "What your first visit looks like"; desktop keeps its original position after
 * "Why new patients choose us". Only one is ever in the layout, so `id` is
 * never duplicated.
 */
export default function Reviews({
  variant = "desktop",
}: {
  variant?: "mobile" | "desktop";
}) {
  // py-* on the clipping container, not margin on the cards. overflow-hidden
  // is needed horizontally so the track disappears at the edges, but it clips
  // vertically too - which would shave the shadow off every card. -my-*
  // cancels the padding again in the page layout.
  return (
    <section
      id="reviews"
      aria-label="Patient reviews"
      className={`relative isolate w-full flex-col justify-center overflow-hidden border-y border-beige/70 bg-white py-16 sm:py-20 lg:py-24 ${
        variant === "mobile" ? "flex lg:hidden" : "hidden lg:flex"
      }`}
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
          <GoogleG className="h-4 w-4 shrink-0" />
          <span className="font-heading text-[1.4rem] leading-none text-navy">4.9</span>
          <Stars />
          <span className="text-[12px] text-navy/55">
            Google reviews · Southampton, PA
          </span>
        </div>
      </Reveal>

      {/*
        ── The rail ──

        Auto-scrolling on both breakpoints, and swipeable by hand on touch:
        overflow-x-auto plus touch-pan-x means a thumb can drag the track at
        any time, and the animation simply continues from wherever it is let
        go. Hovering pauses it on desktop, where there is a cursor to hover
        with. Ten reviews at 110s keeps the pass slow enough to actually read.
      */}
      <div className="relative mt-10 sm:mt-12 lg:mt-14">
        <div className="group relative -my-4 flex touch-pan-x overflow-x-auto py-4 scrollbar-none [&::-webkit-scrollbar]:hidden">
          <div
            className="flex shrink-0 items-stretch gap-4 pr-4 motion-safe:animate-[lp-marquee_linear_infinite] motion-safe:group-hover:[animation-play-state:paused] sm:gap-5 sm:pr-5"
            style={{ animationDuration: "110s" }}
          >
            {REVIEWS.map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
            {/* Seamless-loop duplicate. Siblings of the originals - not wrapped
                - because -50% only lands on the second copy when both halves
                are identical flex children of the same track. */}
            {REVIEWS.map((review) => (
              <ReviewCard key={`dup-${review.name}`} review={review} duplicate />
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
          These are the practice&apos;s real Google reviews, supplied by the
          office (Aug 2026). The relative dates (&ldquo;6 months ago&rdquo;) are
          copied from Google and will age - refresh them next time this section
          is touched. [CONFIRM] the 4.9 rating and total review count -
          aggregateRating is deliberately omitted from the page schema until
          both are verified.
        </ReviewNote>
      </div>
    </section>
  );
}
