"use client";

import { Check } from "lucide-react";
import ImageSlot from "./ImageSlot";
import { Reveal, Section, SectionHeading } from "./Section";
import { WHY_US } from "@/lib/content";

/**
 * "Why new patients choose us".
 *
 * Each line answers a specific reason people leave their previous dentist -
 * being rushed, being upsold, being kept waiting. The image carries the family
 * promise, which is the one claim here that copy alone does not sell.
 */
export default function WhyUs() {
  return (
    <Section id="why" className="bg-white">
      <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal className="min-w-0 lg:order-2">
          <ImageSlot
            label="Family of patients in the practice"
            file="lp/family-patients.webp"
            src="/images/lp/family-patients.webp"
            dimensions="1400 × 1100"
            alt="A family of three generations smiling together at Hampton Family Dental in Southampton, PA"
            className="aspect-[5/4] w-full rounded-3xl ring-1 ring-beige-dark/50"
            sizes="(max-width: 1024px) 100vw, 50vw"
            objectPosition="center 35%"
          />
        </Reveal>

        <div className="min-w-0 lg:order-1">
          <SectionHeading
            eyebrow="The difference"
            title="Why new patients choose us"
          />

          <ul className="mt-7 space-y-3.5">
            {WHY_US.map((item, i) => (
              <Reveal key={item.lead} delay={i * 0.05}>
                <li className="flex min-w-0 gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-urgent/10">
                    <Check className="h-3 w-3 text-urgent" strokeWidth={3.2} aria-hidden />
                  </span>
                  <p className="min-w-0 text-[14px] leading-relaxed text-navy/70 sm:text-[15px]">
                    <strong className="font-bold text-navy">{item.lead}</strong>{" "}
                    {item.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
