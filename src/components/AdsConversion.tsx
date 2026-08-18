"use client";

import { useEffect, useRef } from "react";
// Imported for its `declare global` block, which types window.gtag.
import "@/lib/gtm";

/**
 * Google Ads conversion event for the "Submit lead form" action.
 *
 * Renders nothing. Mounted only on the conversion page - src/app/thank-you -
 * which is reached exactly once per completed submission, so arriving there is
 * the conversion.
 *
 * Google's instructions give this as a bare inline <script> in the page <head>.
 * That does not work in the App Router: inline scripts in JSX are stripped, and
 * a hard navigation never happens here anyway - the form uses a client-side
 * router.push, so a <head> script would only ever run on a full page load and
 * would miss the real conversion path entirely. Firing it from an effect on
 * mount covers both client navigation and a direct hit on the URL.
 *
 * The global gtag() and its config for AW-18372303940 come from
 * src/app/layout.tsx.
 */
const SEND_TO = "AW-18372303940/OlxtCI_e4OMcEMS4zLhE";

export default function AdsConversion() {
  // React 18+ mounts effects twice in dev StrictMode, and a double-fired
  // conversion is a real reporting error rather than a cosmetic one.
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    if (typeof window === "undefined") return;

    // gtag() is defined by the shim in layout.tsx, which runs before the
    // gtag.js network request finishes - so calling it here always queues the
    // hit onto dataLayer even if this page mounts first. The guard is a
    // belt-and-braces against a blocked or failed script, where doing nothing
    // is correct anyway.
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "conversion", { send_to: SEND_TO });
  }, []);

  return null;
}
