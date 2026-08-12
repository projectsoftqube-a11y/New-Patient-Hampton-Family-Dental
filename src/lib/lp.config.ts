/**
 * New Patients LP - single source of truth for every value a marketer or the
 * office might need to change. Nothing below is hardcoded in the section
 * components, so a copy tweak never requires touching JSX.
 *
 * Sister page to the Emergency LP. Same practice, different intent: that page
 * converts people in pain right now, this one converts people choosing a
 * dentist. Tone is unhurried where the emergency page is urgent.
 */

export const PHONE_DISPLAY = "(215) 357-2224";
export const PHONE_TEL = "tel:+12153572224";
export const PHONE_SMS = "sms:+12153572224";

/**
 * Front-desk inbox. Patients are asked to email a photo of their insurance
 * card here rather than bring the card in, so this address is a real
 * conversion path - it appears in the insurance section and the FAQ.
 */
export const PRACTICE_EMAIL = "info@hamptonfamilydentist.com";

/**
 * Online booking destination.
 * [CONFIRM] Replace with the practice's real booking URL before launch. Until
 * then every "Book online" CTA falls back to the phone number, which is a
 * working action rather than a dead link.
 */
export const BOOKING_URL = "";

/**
 * New-patient offer.
 *
 * NOT CURRENTLY RENDERED. The $99 special was pulled at the office's request
 * (Aug 2026) and OfferBand is unmounted from src/app/page.tsx while a
 * replacement offer is decided. Kept, with OfferBand, so the band can be
 * restored by editing the values here and re-adding the one line to the page.
 * [CONFIRM] price and inclusions with the office before it goes back.
 */
export const OFFER = {
  price: "$99",
  includes: "Exam + X-rays + cleaning",
  /** Shown as the asterisk note wherever the price appears. */
  disclaimer: "Example price - confirm final offer with office.",
} as const;

export const PRACTICE = {
  name: "Hampton Family Dental",
  formerly: "formerly Brenner Dental Group",
  street: "283 Second Street Pike, Suite 140",
  city: "Southampton",
  state: "PA",
  zip: "18966",
  serving:
    "Serving Southampton, Richboro, Feasterville, Holland, Churchville & Ivyland",
  mapsQuery:
    "https://www.google.com/maps/search/?api=1&query=283+Second+Street+Pike,+Suite+140,+Southampton,+PA+18966",
} as const;

/**
 * Insurance carriers shown in the "PPO Insurances Accepted" strip.
 *
 * `slug` is also the filename the logo auto-detector looks for in
 * public/images/lp/insurance/ - e.g. `delta-dental.webp`. See
 * src/lib/insurance.ts. A carrier with no matching file renders as its name in
 * type, which is a perfectly good production state.
 *
 * CONFIRM this list with the office before launch. Listing a plan the practice
 * is not in-network for generates angry calls and refund requests.
 */
export type Carrier = {
  name: string;
  slug: string;
  /** Filled in at request time by getCarriers() when a file exists. */
  logo?: string;
};

export const CARRIERS: Carrier[] = [
  // Delta Dental removed at the office's request (Aug 2026) - the practice is
  // not in-network for it. Do not re-add without confirming with the office;
  // the logo file is still on disk, so listing the slug is all it would take.
  { name: "Cigna", slug: "cigna" },
  { name: "Aetna", slug: "aetna" },
  { name: "MetLife", slug: "metlife" },
  { name: "Guardian", slug: "guardian" },
  { name: "United Concordia", slug: "united-concordia" },
];

/**
 * REVIEW NOTES
 * ------------
 * The draft carried [CONFIRM] (office to verify) and [DEV] (developer to
 * supply) annotations. Rather than delete that information - which would lose
 * the sign-off trail - they render as small amber notes that are visibly *not*
 * part of the page design.
 *
 * OFF by default so no visitor ever sees one. Set
 * NEXT_PUBLIC_LP_REVIEW_NOTES=true to bring them back for a review pass.
 */
export const SHOW_REVIEW_NOTES =
  process.env.NEXT_PUBLIC_LP_REVIEW_NOTES === "true";

/**
 * Image placeholders render as designed, on-brand slots until real artwork
 * lands in /public/images/lp/. Set to `true` while adding new images so each
 * slot states which file it expects; keep `false` for anything public-facing.
 */
export const SHOW_IMAGE_SLOT_LABELS: boolean = false;
