"use client";

import { useEffect, useState } from "react";
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
 *
 * Hidden until the hero has scrolled away. The hero already carries both CTAs
 * and the form, so showing this over them duplicates the ask and covers the
 * copy underneath. An IntersectionObserver on the hero does the gating - a
 * scroll listener would run this check on every frame of every scroll.
 */
export default function StickyCallBar() {
  const { open: openBooking } = useBooking();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    // No hero found (shouldn't happen) - fail open on the next tick, since a
    // permanently hidden bar loses conversions where a slightly early one
    // does not. Deferred so it is not a synchronous set-state in the effect.
    if (!hero) {
      const t = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(t);
    }

    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      // Fires the moment the hero's last pixel leaves the top of the screen.
      { threshold: 0 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 flex shadow-[0_-6px_24px_rgba(13,42,56,0.28)] transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      // Slides out of view rather than unmounting, so the transition can play;
      // inert keeps the offscreen buttons out of the tab order meanwhile.
      inert={!visible}
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
