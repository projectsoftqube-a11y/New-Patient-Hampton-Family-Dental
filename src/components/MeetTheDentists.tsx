"use client";

import ImageSlot from "./ImageSlot";
import ReviewNote from "./ReviewNote";
import { Reveal, Section, SectionHeading } from "./Section";
import { DENTISTS } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Compact horizontal roster cards.
 *
 * Deliberately not full-bleed portraits: two headshots at 3:4 take most of a
 * screen for what is a two-line bio each, and push the conversion sections
 * further down. A round avatar beside the text says the same thing in a third
 * of the height.
 */
export default function MeetTheDentists() {
  return (
    <Section id="team" className="bg-beige-light">
      <SectionHeading
        eyebrow="Your dentists"
        title="Meet your dentists"
        lead="The people you'll actually see - gentle, honest, and right here in Southampton."
      />

      <div className="mt-8 grid gap-3.5 sm:grid-cols-2 sm:gap-4">
        {DENTISTS.map((dentist, i) => (
          <Reveal key={dentist.name} delay={i * 0.08}>
            <figure className="group flex h-full min-w-0 items-center gap-4 rounded-2xl border border-beige-dark/50 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_16px_36px_-24px_rgba(20,60,80,0.5)] sm:gap-5 sm:p-5">
              <ImageSlot
                label="Dentist portrait"
                file={dentist.file}
                src={dentist.src}
                dimensions="900 × 1100"
                alt={dentist.alt}
                className={cn(
                  "h-20 w-20 shrink-0 rounded-full ring-1 ring-beige-dark/50 sm:h-24 sm:w-24",
                  // A contained icon needs a white ground behind it; the beige
                  // tint the photos sit on would show as a ring around the art.
                  dentist.contain && "bg-white"
                )}
                imgClassName={dentist.contain ? "object-contain p-1.5" : undefined}
                // Renders at 96px; next/image picks a 2x candidate for retina.
                sizes="96px"
                objectPosition={dentist.objectPosition}
              />

              <figcaption className="min-w-0">
                <h3 className="font-heading text-[16.5px] leading-snug text-navy sm:text-[18px]">
                  {dentist.name}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-navy/60">
                  {dentist.bio}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <ReviewNote>
        [CONFIRM] Dentist bios with the office. Photos match the main website:
        Dr. Brenner&apos;s portrait, and the generic avatar for Dr. Dudhat until
        a real photo is supplied.
      </ReviewNote>
    </Section>
  );
}
