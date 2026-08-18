/**
 * Google Tag Manager dataLayer helper.
 *
 * The container itself is injected in src/app/layout.tsx. This module is only
 * the typed push side, so every conversion event on the page has one shape and
 * one definition rather than a `window as any` at each call site.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    /** Defined by the gtag.js shim in src/app/layout.tsx. */
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Push an event to the GTM dataLayer.
 *
 * Safe to call before the container has loaded: layout.tsx creates the array
 * ahead of the GTM snippet, and GTM replays anything already queued when it
 * initialises. Also safe during SSR - it no-ops rather than throwing on the
 * missing `window`.
 */
export function pushToDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/**
 * Successful appointment-form submission - the conversion this page exists to
 * produce. `page_type` distinguishes this page from the Emergency LP, which
 * shares the same GTM container and pushes the same event with
 * page_type: 'emergency'.
 */
export function trackFormSubmitSuccess() {
  pushToDataLayer({
    event: "form_submit_success",
    form_name: "appointment_request",
    page_type: "new_patient",
  });
}
