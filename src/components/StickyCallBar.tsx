"use client";

import { CalendarDays, Phone } from "lucide-react";
import { useBooking } from "./BookingProvider";
import { PHONE_TEL } from "@/lib/lp.config";

/**
 * Mobile-only. On desktop the LP header is already sticky with both CTAs, so a
 * second fixed bar would just eat viewport. The page root reserves bottom
 * padding (pb-[76px] md:pb-0) so this never covers footer content.
 *
 * env(safe-area-inset-bottom) keeps the buttons clear of the iOS home
 * indicator - without it the bottom ~20px of the tap target is unreachable.
 *
 * Booking takes the accent colour and calling the navy: on this page booking
 * is the primary conversion, but someone with a question still wants the
 * phone one tap away.
 */
export default function StickyCallBar() {
  const { open: openBooking } = useBooking();

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex shadow-[0_-6px_24px_rgba(13,42,56,0.28)] md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      role="group"
      aria-label="Contact Hampton Family Dental"
    >
      <a
        href={PHONE_TEL}
        data-cta="sticky-call"
        className="flex flex-1 items-center justify-center gap-1.5 bg-navy px-2 py-4 text-[14px] font-bold text-white active:bg-navy-dark"
      >
        <Phone className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
        <span className="truncate">Call us</span>
      </a>

      <button
        type="button"
        onClick={() => openBooking("sticky-book")}
        data-cta="sticky-book"
        className="flex flex-1 items-center justify-center gap-1.5 bg-urgent px-2 py-4 text-[14px] font-bold text-white active:bg-urgent-dark"
      >
        <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
        <span className="truncate">Book online</span>
      </button>
    </div>
  );
}
