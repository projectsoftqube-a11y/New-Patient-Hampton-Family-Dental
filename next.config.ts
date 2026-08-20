import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    /**
     * Next 16 only serves qualities that appear in this list, and defaults to
     * [75] alone. Every photo on this page is therefore re-encoded at q75 on
     * top of whatever compression the source file already carries - lossy on
     * lossy, which is what made the images look soft to the client.
     *
     * 90 is the quality the components actually request. 75 stays listed
     * because it is Next's default and any URL that omits `q` still uses it.
     */
    qualities: [75, 90],
    // The header/footer logo is our own trusted SVG in /public. Allow next/image
    // to serve it; CSP keeps it from executing scripts.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
