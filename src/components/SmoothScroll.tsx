"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scrolling.
 *
 * Mounted once in the page shell. Everything below is deliberate:
 *
 * · **Reduced motion is respected, and respected live.** Smooth scroll is
 *   exactly the kind of motion that triggers vestibular symptoms, and this is
 *   a healthcare page. If the user has asked the OS for reduced motion we
 *   never start Lenis at all, and the media query is watched so toggling the
 *   setting takes effect without a reload.
 *
 * · **Touch devices keep native scrolling.** `syncTouch` is off, so phones and
 *   tablets get the momentum scrolling their OS provides. Overriding it costs
 *   battery, fights the browser's address-bar hide, and reliably feels worse
 *   than the real thing. Most of this page's paid traffic is mobile.
 *
 * · **Anchor links are handed to Lenis.** `html { scroll-behavior: smooth }`
 *   and Lenis both animating the same scroll fight each other, so the CSS is
 *   switched off while Lenis is running (see globals.css) and the one in-page
 *   anchor - the "#request" jump to the form - is routed through
 *   `lenis.scrollTo` with the same 80px offset `scroll-padding-top` used.
 */

/** Matches `scroll-padding-top` in globals.css - the sticky header's height. */
const HEADER_OFFSET = -80;

export default function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let frame = 0;

    const stop = () => {
      if (!lenis) return;
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenis = null;
      delete (window as unknown as { lenis?: Lenis }).lenis;
      document.documentElement.classList.remove("lenis-active");
    };

    const start = () => {
      if (lenis) return;

      lenis = new Lenis({
        // Slightly longer than the default so the easing is felt rather than
        // just seen; still short enough that the page never feels sluggish.
        duration: 1.05,
        // Exponential ease-out - fast pickup, long settle.
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        // Native momentum on touch. See the note above.
        syncTouch: false,
        touchMultiplier: 1.6,
      });

      // Tells the stylesheet Lenis owns scrolling now, so the native
      // `scroll-behavior: smooth` can stand down and stop competing.
      document.documentElement.classList.add("lenis-active");

      // Exposed so overlays can pause scrolling. Lenis runs its own rAF loop
      // and ignores `body { overflow: hidden }`, so a modal that only locks
      // the body would still let the page scroll underneath it.
      (window as unknown as { lenis?: Lenis }).lenis = lenis;

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    };

    const sync = () => (query.matches ? stop() : start());

    sync();
    query.addEventListener("change", sync);

    // Route in-page anchors through Lenis. Without this the browser jumps
    // instantly to the target and Lenis has to catch up, which reads as a
    // stutter on the one link that matters most - the CTA into the form.
    const onClick = (e: MouseEvent) => {
      if (!lenis) return;
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target, { offset: HEADER_OFFSET });
      // Keep the URL honest so the link is still shareable and the back
      // button behaves, without triggering the browser's own jump.
      window.history.pushState(null, "", `#${id}`);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      query.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return null;
}
