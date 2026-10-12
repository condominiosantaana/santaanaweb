import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Base className="arrow" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const ArrowDown = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </Base>
);

export const ChevronLeft = (p: IconProps) => (
  <Base {...p}>
    <path d="M15 5l-7 7 7 7" />
  </Base>
);

export const ChevronRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 5l7 7-7 7" />
  </Base>
);

export const Close = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Base>
);

export const Expand = (p: IconProps) => (
  <Base {...p}>
    <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
  </Base>
);

export const Pause = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 5v14M15 5v14" />
  </Base>
);

export const Play = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 5.5v13l10.5-6.5z" />
  </Base>
);

export const MapPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Base>
);

export const Phone = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 4h3.5l1.8 4.4-2.3 1.4a11 11 0 006.2 6.2l1.4-2.3L20 15.5V19a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" />
  </Base>
);

export const Shield = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3l7 3v5.5c0 4.4-3 8.3-7 9.5-4-1.2-7-5.1-7-9.5V6z" />
    <path d="M9 12l2 2 4-4" />
  </Base>
);

export const Gate = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 21V8l9-5 9 5v13" />
    <path d="M7 21v-8h10v8M10 13v8M14 13v8" />
  </Base>
);

export const Car = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 16V12l2-5h10l2 5v4" />
    <path d="M3 16h18v3H3zM5 12h14" />
    <circle cx="7.5" cy="14" r="0.6" />
    <circle cx="16.5" cy="14" r="0.6" />
  </Base>
);

export const Walk = (p: IconProps) => (
  <Base {...p}>
    <circle cx="13" cy="4.5" r="1.8" />
    <path d="M10 21l2.5-6.5L15 17v4M9 11l3-3.5 3 2.5 2.5 1M12.5 14.5L12 8" />
  </Base>
);

export const Leaf = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" />
    <path d="M5 19l8-8" />
  </Base>
);

export const Trail = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 21c0-4 4-5 6-8s-1-6 3-10" />
    <path d="M10 21c0-3 3-4 5-6.5S16 9 19 6" opacity="0.55" />
  </Base>
);

export const Parking = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M10 16V8h3a2.5 2.5 0 010 5h-3" />
  </Base>
);

export const Store = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 9l1.5-5h13L20 9M4 9h16M4 9c0 1.7 1.3 3 3 3s3-1.3 3-3c0 1.7 1.3 3 2 3s2-1.3 2-3c0 1.7 1.3 3 3 3s3-1.3 3-3" />
    <path d="M5.5 12v8h13v-8M10 20v-5h4v5" />
  </Base>
);

export const Waves = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 15c2 0 2-1.5 4.5-1.5S9.5 15 12 15s2.5-1.5 4.5-1.5S19 15 21 15M3 19c2 0 2-1.5 4.5-1.5S9.5 19 12 19s2.5-1.5 4.5-1.5S19 19 21 19" />
    <path d="M8 11V7a4 4 0 018 0v4" />
  </Base>
);

export const ShoppingBag = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 8h14l-1 13H6zM9 8V6a3 3 0 016 0v2" />
  </Base>
);

export const School = (p: IconProps) => (
  <Base {...p}>
    <path d="M2 9l10-5 10 5-10 5z" />
    <path d="M6 11v5c2 2 10 2 12 0v-5M22 9v6" />
  </Base>
);

export const Sport = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.5 9.5c4 1 13 1 17 0M3.5 14.5c4-1 13-1 17 0" />
  </Base>
);

export const Services = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v18M3 12h18" />
    <rect x="6" y="6" width="12" height="12" rx="2" />
  </Base>
);

export const Home = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 11l8-7 8 7M6 9.5V20h12V9.5" />
    <path d="M10 20v-5h4v5" />
  </Base>
);

export const Compass = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15.5 8.5l-2 5-5 2 2-5z" />
  </Base>
);

export const Plan = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" />
    <path d="M9 4v14M15 6v14" />
  </Base>
);

export function WhatsAppGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor" {...props}>
      <path d="M19.05 4.91A9.82 9.82 0 0012.04 2C6.59 2 2.15 6.44 2.15 11.89c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.73 1.21h.01c5.45 0 9.89-4.44 9.89-9.89 0-2.64-1.03-5.12-2.88-7.03zM12.04 20.15h-.01a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 01-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.82c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
    </svg>
  );
}

// Glifos de marca (Remix Icon, licencia Apache 2.0), rellenos y en una caja de 24 × 24.
function BrandGlyph({ d, ...props }: IconProps & { d: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor" {...props}>
      <path d={d} />
    </svg>
  );
}

export const FacebookGlyph = (p: IconProps) => (
  <BrandGlyph
    d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"
    {...p}
  />
);

export const InstagramGlyph = (p: IconProps) => (
  <BrandGlyph
    d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"
    {...p}
  />
);

export const TikTokGlyph = (p: IconProps) => (
  <BrandGlyph
    d="M16 8.245V15.5a6.5 6.5 0 1 1-5-6.326v3.163a3.5 3.5 0 1 0 2 3.163V2h3a5 5 0 0 0 5 5v3a7.966 7.966 0 0 1-5-1.755z"
    {...p}
  />
);
