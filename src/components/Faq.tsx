"use client";

import Accordion from "./Accordion";
import { Reveal, Section, SectionHeading } from "./Section";
import { FAQS } from "@/lib/content";

export default function Faq() {
  return (
    <Section id="faq" className="bg-white">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Questions"
          title="Good to know"
          align="center"
        />
        {/* The heading animated in but the accordion did not, so the list
            appeared fully formed under a heading that was still arriving. */}
        <Reveal delay={0.08}>
          {/* Shared name → only one answer open at a time. */}
          <Accordion items={FAQS} name="lp-faq" />
        </Reveal>
      </div>
    </Section>
  );
}
