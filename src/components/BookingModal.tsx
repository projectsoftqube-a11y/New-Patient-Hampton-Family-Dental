"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import LeadForm from "./LeadForm";

/**
 * Booking dialog - the header's "Book now" opens this rather than navigating.
 *
 * It renders the same <LeadForm> the hero uses, in `bare` mode so the dialog
 * panel supplies the card rather than nesting one inside another.
 *
 * The accessibility work here is not optional decoration: this dialog is the
 * page's conversion path, and a booking form a keyboard or screen-reader user
 * cannot escape or navigate is a lost patient.
 *
 *  · `role="dialog"` + `aria-modal` + a labelled title.
 *  · Focus moves into the panel on open and returns to the trigger on close.
 *  · Tab is trapped inside the panel while open.
 *  · Escape and a backdrop click both close.
 *  · Background scroll is locked - including Lenis, which runs on rAF and
 *    would happily keep scrolling the page underneath the overlay.
 */
export default function BookingModal({
  open,
  onClose,
  source,
}: {
  open: boolean;
  onClose: () => void;
  /** Which CTA opened the dialog, forwarded to the enquiry for attribution. */
  source?: string;
}) {
  const panel = useRef<HTMLDivElement>(null);
  /** The element focused before opening, so focus can be handed back. */
  const restoreTo = useRef<HTMLElement | null>(null);
  const close = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!open) return;

    restoreTo.current = document.activeElement as HTMLElement | null;

    // Lock background scroll. Compensating for the scrollbar's width keeps the
    // page from lurching sideways as it disappears.
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    // Lenis animates scroll on its own rAF loop and ignores body overflow, so
    // it has to be told to stop separately. `lenis` is attached to window by
    // SmoothScroll for exactly this.
    const lenis = (window as unknown as { lenis?: { stop(): void; start(): void } })
      .lenis;
    lenis?.stop();

    // Focus the panel itself rather than the first input: opening a dialog
    // straight into a text field means a screen reader announces the field and
    // skips the dialog's own title.
    const raf = requestAnimationFrame(() => panel.current?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }

      if (e.key !== "Tab" || !panel.current) return;

      const focusable = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      // Wrap in both directions so Tab can never reach the page behind.
      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && (active === first || active === panel.current)) {
        e.preventDefault();
        last.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      lenis?.start();
      restoreTo.current?.focus?.();
    };
  }, [open, close]);

  // The dialog only ever renders in the browser - it is opened by a click, so
  // there is no server pass where `open` is true and no `document` to portal
  // into. Bailing out while closed keeps this safe during SSR.
  if (!open || typeof document === "undefined") return null;

  /* Portalled to <body>. The header this is mounted from is `sticky` with
     `backdrop-blur`, and a filtered ancestor becomes the containing block for
     `fixed` descendants - so rendered in place the overlay would be trapped
     inside the header bar instead of covering the viewport. */
  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="absolute inset-0 bg-navy-dark/55 backdrop-blur-sm"
            aria-hidden
          />

          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[92dvh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 shadow-[0_40px_90px_-20px_rgba(13,42,56,0.6)] outline-none sm:rounded-3xl sm:p-7"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2
                  id="booking-modal-title"
                  className="font-heading text-[1.35rem] leading-tight text-navy sm:text-[1.5rem]"
                >
                  Book your first visit
                </h2>
                <p className="mt-1 text-[13px] leading-snug text-navy/55">
                  Leave your details and we&apos;ll call you back to find a time.
                </p>
              </div>

              <button
                type="button"
                onClick={close}
                aria-label="Close booking form"
                className="-mr-1 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-navy/45 transition-colors hover:bg-beige-light hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <X className="h-4.5 w-4.5" strokeWidth={2.4} aria-hidden />
              </button>
            </div>

            {/* No onSuccess close: the form navigates to /thank-you on submit,
                which unmounts this along with the rest of the page. Closing the
                dialog as well would blank it for a frame before the route
                changes. */}
            <LeadForm bare source={source} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
