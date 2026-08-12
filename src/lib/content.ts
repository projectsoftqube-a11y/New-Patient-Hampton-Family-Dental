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
 * Reviews.
 *
 * [DEV] These are the draft's placeholder quotes - they are NOT real Google
 * reviews and carry no reviewer names. Replace all five with genuine reviews
 * from the Google Business Profile before this page takes traffic. Quotes
 * attributed to invented patients are an FTC endorsement problem.
 *
 * The Emergency LP already has the real review set pulled from Google; use
 * that same source here.
 */
export const REVIEWS = [
  "First dentist I've had who doesn't try to sell me things I don't need. Honest, gentle, and they explained everything. So relieved I found them.",
  "We take all three kids here now. They're so patient and kind with them - no tears, no drama. One appointment for the whole family is a game changer.",
  "Hadn't been to a dentist in years and was dreading it. Zero judgment. They made it completely comfortable. Actually looking forward to going back.",
  "New to the area and so glad this was the first office I tried. On time, friendly, and my cleaning was the most thorough I've had in ages.",
  "They took the time to actually listen. Never felt rushed or judged. This is what a family dentist should feel like.",
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
