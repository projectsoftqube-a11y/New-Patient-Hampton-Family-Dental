import type { Metadata } from "next";
import ThankYou from "@/components/ThankYou";

/**
 * Post-submission confirmation page.
 *
 * A distinct URL rather than an inline success state, because a landing page's
 * conversion has to be *countable*. Google Ads and GA4 both key off a
 * destination URL by default, and "/thank-you was reached" is a far more
 * robust conversion signal than a DOM event that any script blocker can eat.
 * It also gives the office something to link to and the visitor something they
 * can screenshot.
 *
 * noindex for the same reason the main page carries it - a thank-you page in
 * the search index is a page that can be reached without converting, which
 * inflates the count and wastes ad spend.
 */
export const metadata: Metadata = {
  title: "Thank you - we've got your request | Hampton Family Dental",
  description:
    "Thanks for getting in touch. Someone from Hampton Family Dental will call you shortly to confirm your first visit.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYou />;
}
