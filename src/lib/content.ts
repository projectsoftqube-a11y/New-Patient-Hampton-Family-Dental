import type { AccordionItem } from "@/components/Accordion";

/**
 * All page copy, lifted verbatim from the approved client-review draft
 * (New Patients Landing Page Copy). Edit here, never in the components.
 */

/**
 * "Sound like you?" - the audience-recognition list.
 *
 * `tag` is the two-or-three-word version of the same idea. The section renders
 * it as the scannable label so a visitor finds their own row in about a second;
 * `title` then confirms it in full. Without the short form every card opens
 * with a different-length sentence and the list has to be read rather than
 * scanned, which is the opposite of what this section is for.
 */
export const AUDIENCE = [
  {
    icon: "MapPin" as const,
    tag: "New in town",
    title: "New to the Southampton area",
    body: "And looking for a dentist you can settle in with.",
  },
  {
    icon: "Smile" as const,
    tag: "It's been a while",
    title: "Years since your last visit",
    body: "No guilt, no lecture - just a fresh, gentle start.",
  },
  {
    icon: "Users" as const,
    tag: "The whole family",
    title: "You want one place for everyone",
    body: "Kids, parents, grandparents - all seen under one roof.",
  },
  {
    icon: "RefreshCw" as const,
    tag: "Switching dentists",
    title: "Rushed or upsold somewhere else",
    body: "Here you'll get honest advice and only what you actually need.",
  },
  {
    icon: "Sparkles" as const,
    tag: "Just due a check-up",
    title: "Time for a cleaning & check-up",
    body: "Easy to book, and we'll keep you on track from here.",
  },
];

/**
 * "What your first visit looks like" - the four steps.
 *
 * `duration` is the approximate minutes each step takes. It exists because the
 * section promises "about an hour, start to finish" and then does not account
 * for it; the four figures add to roughly that hour, which turns the claim
 * into something checkable. [CONFIRM] the split with the office - the total is
 * right, but the per-step breakdown is an estimate.
 */
export const STEPS = [
  {
    duration: "5 min",
    title: "A warm welcome - no rushing",
    body: "We take a few minutes to get to know you and what you're hoping for.",
  },
  {
    duration: "15 min",
    title: "A gentle exam + X-rays",
    body: "We check your teeth and gums thoroughly, and answer every question.",
  },
  {
    duration: "30 min",
    title: "Your cleaning + an honest plan",
    body: "We recommend only what you actually need - nothing you don't.",
  },
  {
    duration: "5 min",
    title: "Book your next visit - or think it over",
    body: "Zero pressure. You leave feeling looked after, not sold to.",
  },
];

/** "Why new patients choose us". */
export const WHY_US = [
  {
    lead: "Gentle and unhurried.",
    body: "We take our time - you're a person, not a slot.",
  },
  {
    lead: "Honest.",
    body: "We only recommend treatment you actually need. No scare tactics.",
  },
  {
    lead: "The whole family, one place.",
    body: "Kids to grandparents, all welcome.",
  },
  {
    lead: "On time.",
    body: "We respect your schedule and keep to it.",
  },
  {
    lead: "Easy on your wallet.",
    body: "Most PPO insurances accepted. We also offer an in-office membership for patients with no dental insurance.",
  },
];

/** Financing / affordability cards. */
export const FINANCING = [
  {
    title: "Most PPO insurances accepted",
    body: "We bill your plan directly, so you pay less out of pocket.",
  },
  {
    title: "No insurance, No Problem!",
    body: "Get our in-office membership plan.",
  },
  {
    title: "Ask about our Financing plans",
    body: "Spread the cost of any treatment so it fits your budget.",
  },
];

/**
 * The dentists.
 *
 * Portraits are shared with the Emergency LP - same people, same practice.
 * [CONFIRM] bios with the office.
 */
export type Dentist = {
  name: string;
  bio: string;
  file: string;
  src: string;
  alt: string;
  /** object-position for the round crop. */
  objectPosition?: string;
  /** Contain rather than cover - for icon art, not photographs. */
  contain?: boolean;
};

export const DENTISTS: Dentist[] = [
  {
    name: "Dr. Jeffrey Brenner",
    bio: "General & restorative dentistry. Caring for Southampton families for years.",
    file: "lp/dr-jeffrey-brenner.webp",
    src: "/images/lp/dr-jeffrey-brenner.webp",
    alt: "Dr. Jeffrey Brenner, general and restorative dentist at Hampton Family Dental in Southampton, PA",
    /** Pulls the crop up to the face on a tall portrait. */
    objectPosition: "center 20%",
  },
  {
    name: "Dr. Keyur Dudhat",
    bio: "Gentle, patient-first care for the whole family.",
    // Generic outline avatar, at the office's request - the same placeholder
    // the main website uses - until a real portrait is supplied.
    file: "lp/doctor-avatar.jpg",
    src: "/images/lp/doctor-avatar.jpg",
    alt: "Dr. Keyur Dudhat, family dentist at Hampton Family Dental in Southampton, PA",
    /**
     * The avatar is a centred icon on white with its own margin, not a
     * photograph. Cropping it like one (center 20%, object-cover) cuts the
     * head off inside the round frame, so it is contained and centred.
     */
    objectPosition: "center",
    contain: true,
  },
];

/**
 * Reviews - the real Google Business Profile set, supplied by the office
 * (Aug 2026). Names, review counts and dates are as they appear on Google.
 *
 * `when` is relative ("6 months ago") exactly as Google renders it, which means
 * it silently ages. Refresh this list when the review section is next revisited
 * rather than letting "3 months ago" quietly become two years old.
 *
 * Longer reviews are quoted in full; Google's own "… More" truncation is left
 * to the card, not baked into the text.
 */
export type Review = {
  name: string;
  /** e.g. "3 reviews" or "Local Guide · 15 reviews" - shown under the name. */
  meta: string;
  when: string;
  quote: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Susan Donohue",
    meta: "3 reviews",
    when: "3 months ago",
    quote:
      "Dr. Brenner is an amazing dentist. He really explains everything you need to know. The staff is awesome and very friendly.",
  },
  {
    name: "Donnalee Charlton",
    meta: "5 reviews",
    when: "8 months ago",
    quote:
      "I had a crown come off. I called for an appointment. Angela returned my call within minutes. I was in the chair within one hour. Casey was setting up and assisting as Dr. Brenner was working on my tooth. The staff is always so friendly.",
  },
  {
    name: "Colleen McKeown",
    meta: "3 reviews",
    when: "6 months ago",
    quote:
      "Dr. Brenner and his office staff are extremely kind and helpful. I have been going for years and they are very honest, accommodating and helpful. Grateful 💜☀️",
  },
  {
    name: "Gary Balasa",
    meta: "2 reviews",
    when: "a year ago",
    quote:
      "Dr. Brenner and his staff provide a pleasant atmosphere with excellent quality dental care. I have been going to this office for 6 years for surgery and maintenance and have been very happy with my experiences.",
  },
  {
    name: "Lauren Fioresi",
    meta: "10 reviews",
    when: "2 years ago",
    quote:
      "Tiffany was great and very knowledgeable. She made me feel very comfortable and I got through my cleaning without any pain or discomfort! Dr. Brenner is great and also very knowledgeable and cares about his patients.",
  },
  {
    name: "Cynthia Perez",
    meta: "8 reviews",
    when: "a year ago",
    quote:
      "My family has been going to Dr Brenner's office for a few years. Highly recommend! It's like family there, the staff is great. Dr. is always looking out for the best on your dental health. He's proactive and a great Dr and person. Love this place ❤️",
  },
  {
    name: "Arlene Santonastasi",
    meta: "17 reviews",
    when: "6 months ago",
    quote:
      "Dr. Brenner stepped into the waiting area and introduced himself to me. Everyone was cheerful and made me feel very comfortable!",
  },
  {
    name: "Samantha Freeman",
    meta: "5 reviews · 1 photo",
    when: "a year ago",
    quote:
      "Dr. Brenner and his team were simply fantastic. Finding a dentist, hygienist, and even friendly front desk all in one is hard to come by and they certainly have it all. My hygienist could sense I was nervous but walked me through each step of the way and took her time and was as gentle as she could be. I look forward to bringing my family here.",
  },
  {
    name: "Scott St. Pierre",
    meta: "Local Guide · 15 reviews · 5 photos",
    when: "2 years ago",
    quote:
      "Dr Brenner purchased the practice from a dentist I went to since I was a kid. It was an easy and smooth transition and my family has been with him since. He and the entire staff are friendly, professional and do an excellent job on our teeth. Could not be happier with their service.",
  },
  {
    name: "Ellyn Caplan Klein",
    meta: "Local Guide · 13 reviews",
    when: "a year ago",
    quote:
      "Dr. Brenner is superb, compassionate and I can see why he has been chosen as the best dentist. He is restoring my mouth and I am in great hands. His staff, Michelle and Casey, have been trained by Dr. Brenner and they are also excellent. Angela, the office manager, is absolutely excellent as are their dental hygienists. Make sure you go to this practice.",
  },
];

/** "Good to know" - also emitted as FAQPage structured data. */
export const FAQS: AccordionItem[] = [
  {
    q: "What's included in the first visit?",
    a: "Your exam, digital X-rays, and a professional cleaning - everything for a healthy start. If we ever spot something that needs treatment, we'll explain it and the cost before you decide anything.",
  },
  {
    q: "How long is the first visit?",
    a: "Usually about an hour. We don't rush you through - you'll have time to ask anything.",
  },
  {
    q: "Do you take my insurance?",
    a: "We accept most PPO dental plans. Email us a picture of your insurance card at info@hamptonfamilydentist.com and we will get your insurance verified!",
  },
  {
    q: "Do you see kids?",
    a: "Yes - we're a family practice and love treating the whole family, from little ones up.",
  },
  {
    q: "It's been years - is that okay?",
    a: "Completely. Lots of our new patients are in the same boat. No lectures, no judgment - just a gentle fresh start.",
  },
  {
    q: "Do I have to commit to treatment?",
    a: "Never. Your first visit is about getting to know your smile. You decide what happens next, in your own time.",
  },
];

/**
 * Opening hours.
 *
 * `confirm: true` rows are unverified. They render as "Call for hours" and are
 * deliberately omitted from the JSON-LD rather than guessed - wrong hours in
 * structured data send patients to a locked door.
 */
export const HOURS = [
  { day: "Monday", time: "9 AM – 5 PM", confirm: false },
  { day: "Tuesday", time: "9 AM – 6 PM", confirm: false },
  { day: "Wednesday", time: "8 AM – 2 PM", confirm: false },
  { day: "Thursday", time: "8 AM – 5 PM", confirm: false },
  { day: "Fri – Sun", time: "Closed", confirm: false },
];
