"use client";

import { Clock } from "lucide-react";
import ImageSlot from "./ImageSlot";
import { Reveal, Section, SectionHeading } from "./Section";
import { STEPS } from "@/lib/content";

/**
 * "What your first visit looks like".
 *
 * The single biggest barrier for someone who has avoided the dentist is not
 * knowing what will happen to them. Spelling out all four steps - including
 * that step four is "or think it over" - removes the fear of being trapped
 * into treatment, which is the objection this page exists to answer.
 *
 * ── Layout ──
 * The four steps are short, so as bare text they collapsed into a fraction of
 * the height of the photo column beside them and left a large void under the
 * list. Two changes fix that without padding the copy:
 *
 *  1. Each step states its duration, so the column has real height and the
 *     "about an hour" promise above it becomes checkable rather than
 *     decorative.
 *  2. The photo column is one portrait plus a stacked pair rather than a
 *     single tall image, so the two columns land at comparable heights.
 *
 * The steps render as a connected timeline - numbered nodes threaded on a
 * continuous rail - rather than four boxed cards, which read as unrelated
 * tiles when they are in fact one sequence.
 */
/**
 * The section is placed twice in the page, and each copy renders on exactly one
 * breakpoint - see src/app/page.tsx.
 *
 *  · "mobile"  - directly under the hero, where the client wants the reassurance
 *                to land before anything else on a phone. Step bodies are
 *                dropped so it stays a scannable four-line summary rather than
 *                a wall of text at the top of the page; the photos stay.
 *  · "desktop" - its original position and full treatment, untouched.
 *
 * Only one is ever in the layout at a given width, so `id="first-visit"` and
 * the images are never duplicated in the rendered output.
 */
export default function ProcessSteps({
  variant = "desktop",
}: {
  variant?: "mobile" | "desktop";
}) {
  const mobile = variant === "mobile";

  return (
    <Section
      id="first-visit"
      className={mobile ? "bg-white lg:hidden" : "hidden bg-white lg:block"}
    >
      <div className="grid gap-9 lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:gap-14">
        {/* ── Left: the sequence ── */}
        <div className="min-w-0">
          <SectionHeading
            eyebrow="No surprises"
            title="What your first visit looks like"
            lead={
              mobile
                ? "About an hour, start to finish."
                : "About an hour, start to finish. Here's exactly how it goes - and how long each part takes."
            }
          />

          {/* One card per step, nothing outside them.
              The previous pass kept an external numbered rail AND wrapped each
              step in a card - two structures doing the same job. The numbers
              collided with the card edges and the rail ran through the gaps
              between them, which is what made it read as cluttered. The cards
              already separate the steps, so the rail is gone and the number
              lives inside the card as part of its header row. */}
          {/* <ol> would be the semantic choice, but Reveal wraps each child in
              a motion <div> - and a <div> is not a valid child of <ol>. An
              ordered list whose items are not <li> is worse for a screen reader
              than a plain group, so this is a list of role="listitem" cards
              under an explicit role="list" instead. */}
          {/*
            A connected timeline rather than four separate cards.

            These steps are one sequence, and boxing each of them made the
            section read as a list of unrelated tiles - four surfaces, four
            borders, four hover states, for what is really a single line from
            "you walk in" to "you leave". The rail draws that line: numbered
            nodes threaded on a continuous stroke, with only a hairline
            separating one row from the next.
          */}
          <div role="list" className="relative mt-8">
            {/* The rail. Inset to the node's centre (17.5px = half of the 36px
                node) and stopped short at both ends so it emerges from the
                first node and dies into the last rather than overshooting. */}
            <span
              aria-hidden
              className="absolute bottom-6 left-[17.5px] top-6 w-px bg-gradient-to-b from-urgent/40 via-urgent/25 to-transparent"
            />

            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.07}>
                <div
                  role="listitem"
                  className="group relative flex min-w-0 gap-4 py-4 first:pt-1 last:pb-1"
                >
                  {/* Node. bg-white (not transparent) so the rail passes
                      behind the ring rather than through the numeral. */}
                  <span className="relative z-10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[15px] font-bold tabular-nums text-urgent-dark ring-2 ring-urgent/30 transition-all duration-300 group-hover:bg-urgent group-hover:text-white group-hover:ring-urgent">
                    {i + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="min-w-0 font-heading text-[18px] leading-snug text-navy sm:text-[20px]">
                        {step.title}
                      </h3>

                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-beige-light px-2.5 py-1 text-[12px] font-semibold tabular-nums text-navy/55 transition-colors duration-300 group-hover:bg-urgent/10 group-hover:text-urgent-dark">
                        <Clock className="h-3 w-3 shrink-0" strokeWidth={2.6} aria-hidden />
                        {step.duration}
                      </span>
                    </div>

                    {/* Dropped in the mobile copy, where this section runs
                        directly under the hero and has to stay scannable. */}
                    {!mobile && (
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-navy/60">
                        {step.body}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Closes the sequence on the promise the whole section is making. */}
          <Reveal delay={0.3}>
            <p className="mt-5 text-[13px] leading-relaxed text-navy/55">
              <strong className="font-semibold text-navy/80">
                That&apos;s the whole visit.
              </strong>{" "}
              No upsell, no lecture, no surprise bill at the desk.
            </p>
          </Reveal>
        </div>

        {/* ── Right: the rooms it happens in ──
            Sticky on desktop so the photos stay in view while the steps are
            read; on smaller screens it simply follows the list. */}
        <Reveal delay={0.1} className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <ImageSlot
            label="First visit - relaxed consultation"
            file="lp/first-visit-consult.webp"
            src="/images/lp/first-visit-consult.webp"
            dimensions="1200 × 1400"
            alt="A dentist talking calmly with a new patient at Hampton Family Dental in Southampton, PA"
            // Half the height it used to be below lg (was 5/4, then 4/3): on a
            // phone this portrait ate most of a screen for one supporting
            // photo. The lg sticky column keeps the taller 7/6 crop, where the
            // height is doing real work beside the step list.
            className="aspect-[5/2] w-full rounded-3xl ring-1 ring-beige-dark/50 sm:aspect-[8/3] lg:aspect-[7/6]"
            // Capped at the real rendered width. The default sizes string made
            // the browser pick the 3840w candidate for a slot that is never
            // wider than ~620px, so it downloaded roughly six times the bytes
            // it needed and left the box empty for that much longer.
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 620px"
            // 38% rather than 28%: the letterbox crop below lg is a much
            // narrower slice of the same portrait, and at 28% it cut the
            // faces off at the chin.
            objectPosition="center 38%"
          />

          {/* The two rooms the steps above actually describe - the waiting area
              you arrive in, and the room you're seen in. Both deliberately
              empty: a spotless unoccupied room reads as calm and hygienic,
              where a room with someone mid-treatment reads as the thing a
              nervous new patient is trying to avoid. */}
          <div className="mt-3.5 grid grid-cols-2 gap-3.5">
            <figure className="min-w-0">
              <ImageSlot
                label="Reception and waiting area"
                file="lp/reception-area.webp"
                src="/images/lp/reception-area.webp"
                dimensions="1400 × 1000"
                alt="The skylit waiting room at Hampton Family Dental in Southampton, PA, with cushioned seating and the reception window"
                className="aspect-[7/5] w-full rounded-2xl ring-1 ring-beige-dark/50"
                sizes="(max-width: 1024px) 50vw, 23vw"
              />
              <figcaption className="mt-2 text-[11.5px] font-medium text-navy/50">
                Where you wait
              </figcaption>
            </figure>

            <figure className="min-w-0">
              <ImageSlot
                label="Modern treatment room"
                file="lp/treatment-room.webp"
                src="/images/lp/treatment-room.webp"
                dimensions="1400 × 1000"
                alt="A treatment room at Hampton Family Dental in Southampton, PA, with a dental chair and a wall-mounted screen"
                className="aspect-[7/5] w-full rounded-2xl ring-1 ring-beige-dark/50"
                sizes="(max-width: 1024px) 50vw, 23vw"
              />
              <figcaption className="mt-2 text-[11.5px] font-medium text-navy/50">
                Where you&apos;re seen
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
