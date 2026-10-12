export const siteConfig = {
  name: 'Heirloom Legacy, Inc.',
  organization: 'Heirloom Legacy, Inc.',
  domain: 'HeirloomCorp.org',
  publicWebsite: { label: 'HeirloomLegacy.org', href: 'https://heirloomlegacy.org' },
  corporateSite: { label: 'HeirloomCorp.org', href: 'https://heirloomcorp.org' },
  tagline: 'Building a Legacy of Stability Through Community, Partnership, and Purpose.',
  email: 'info@heirloomlegacy.org',
  copyright: '© 2026 Heirloom Legacy, Inc. All Rights Reserved.',
  // PLACEHOLDER: social profile URLs below are generic and must be replaced with
  // client-approved Heirloom Legacy profiles (or removed) before publishing.
  socials: [
    { label: 'IG', href: 'https://instagram.com', ariaLabel: 'Instagram (placeholder link)' },
    { label: 'LI', href: 'https://linkedin.com', ariaLabel: 'LinkedIn (placeholder link)' },
    { label: 'FB', href: 'https://facebook.com', ariaLabel: 'Facebook (placeholder link)' },
    { label: 'YT', href: 'https://youtube.com', ariaLabel: 'YouTube (placeholder link)' },
    { label: 'X', href: 'https://x.com', ariaLabel: 'X (placeholder link)' },
  ],
  logos: {
    // Heirloom Legacy, Inc. full wordmark (gold monogram + ivory text, transparent bg) — header & footer
    primary: '/assets/brand/heirloom-legacy-logo.png',
    light: '/assets/brand/heirloom-legacy-logo.png',
    // Gold monogram mark — favicon / app icon / organizational avatar
    mark: '/assets/brand/heirloom-legacy-mark.png',
    favicon: '/assets/brand/favicon-32.png',
  },
  hero: {
    bgImage: '/assets/dit.nomadenstudio.com/arvon/wp-content/uploads/sites/7/2026/01/Image-Gen-5.png',
    watermark: 'LEGACY',
    eyebrow: 'The Heirloom Living Vision',
    heading: 'A Place to Feel at Home, Live Independently, and Thrive.',
    description:
      'Discover independent living shaped by personal comfort, everyday dignity, and a welcoming sense of home.',
    cta: { label: 'Discover Our Vision', href: '#mission' },
    // Static highlight bar (replaces the former property-search bar; text only, same design)
    highlights: [
      { label: 'Living Experience', value: 'Comfort & Independence' },
      { label: 'Our Approach', value: 'Privacy & Dignity' },
      { label: 'Our Priority', value: 'A Place to Belong' },
    ],
    highlightCta: { label: 'Learn More', href: '#about' },
  },
};
