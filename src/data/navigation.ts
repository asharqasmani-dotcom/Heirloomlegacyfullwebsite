import { NavItem } from '../types';

// Shared navigation: homepage and standalone pages.
export const navigationItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us/' },
  { label: 'Community Initiatives', href: '/our-services/' },
  { label: 'Partnerships & Support', href: '/partnerships-support/' },
  { label: 'Contact Us', href: '/contact-us/' },
];

export const headerCta = { label: 'Partner With Us', href: '/contact-us/' };

/** Homepage-only navigation. Inner pages keep navigationItems above. */
export const homepageNav: NavItem[] = [
  { label: 'Home', href: '#top' },
  { label: 'About Us', href: '/about-us/' },
  { label: 'Our Mission', href: '#mission' },
  { label: 'Community', href: '#initiatives' },
  { label: 'Get Involved', href: '#contact' },
  { label: 'Contact', href: '#contact' },
];

export const homepageCta = { label: 'Get Involved', href: '#contact' };

export const homepageFooterExplore: NavItem[] = [
  { label: 'Home', href: '#top' },
  { label: 'About Us', href: '/about-us/' },
  { label: 'Our Mission', href: '#mission' },
  { label: 'Community', href: '#initiatives' },
  { label: 'Contact', href: '#contact' },
];

export const homepageFooterInvolve: NavItem[] = [
  { label: 'Community Partnerships', href: '#partnerships' },
  { label: 'Purposeful Resources', href: '#mission' },
  { label: 'Our Values', href: '#values' },
  { label: 'Get Involved', href: '#contact' },
  { label: 'Contact Us', href: '/contact-us/' },
];

export const footerExplore: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us/' },
  { label: 'Community Initiatives', href: '/our-services/' },
  { label: 'Partnerships & Support', href: '/partnerships-support/' },
  { label: 'Contact Us', href: '/contact-us/' },
  { label: 'Our Mission', href: '/#mission' },
  { label: 'Our Values', href: '/#values' },
  { label: 'Partnerships', href: '/#partnerships' },
];

/** About Us footer only. Other pages keep footerExplore and footerConnect. */
export const aboutFooterExplore: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us/' },
  { label: 'Our Mission', href: '/#mission' },
  { label: 'Get Involved', href: '/#contact' },
  { label: 'Contact Us', href: '/contact-us/' },
];

export const aboutFooterConnect: NavItem[] = [
  { label: 'Community Initiatives', href: '/#initiatives' },
  { label: 'Purposeful Resources', href: '/#mission' },
  { label: 'Institutional Inquiries', href: '/#contact' },
  { label: 'Contact Our Team', href: '/contact-us/' },
];

/** Community Initiatives page footer. Other inner pages keep footerExplore and footerConnect. */
export const initiativesFooterExplore: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us/' },
  { label: 'Community Initiatives', href: '/our-services/' },
  { label: 'Partnerships & Support', href: '/partnerships-support/' },
  { label: 'Contact Us', href: '/contact-us/' },
];

export const initiativesFooterConnect: NavItem[] = [
  { label: 'Community Initiatives', href: '/our-services/' },
  { label: 'Purposeful Resources', href: '/#mission' },
  { label: 'Institutional Inquiries', href: '/#contact' },
  { label: 'Contact Our Team', href: '/contact-us/' },
];

/** Partnerships & Support page footer. */
export const partnershipsFooterExplore: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us/' },
  { label: 'Community Initiatives', href: '/our-services/' },
  { label: 'Partnerships & Support', href: '/partnerships-support/' },
  { label: 'Contact Us', href: '/contact-us/' },
];

export const partnershipsFooterConnect: NavItem[] = [
  { label: 'Community Initiatives', href: '/our-services/' },
  { label: 'Resource Partnerships', href: '/#partnerships' },
  { label: 'Institutional Inquiries', href: '/#contact' },
  { label: 'Contact Our Team', href: '/contact-us/' },
];

export const footerConnect: NavItem[] = [
  { label: 'Community Initiatives', href: '#initiatives' },
  { label: 'Resource Partnerships', href: '#partnerships' },
  { label: 'Institutional Inquiries', href: '#contact' },
  { label: 'Contact Our Team', href: '#contact' },
];

// PLACEHOLDER: legal pages do not exist yet; anchors are inert until client supplies content.
export const footerLegal: NavItem[] = [
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Terms of Use', href: '#terms' },
];

/** Resolve homepage sections when shared navigation is rendered on an inner page. */
export function pageHref(href: string, innerPage = false): string {
  return innerPage && href.startsWith('#') ? `/${href}` : href;
}
