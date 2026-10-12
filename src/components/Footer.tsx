import React from 'react';
import { siteConfig } from '../data/siteConfig';
import {
  footerExplore,
  footerConnect,
  footerLegal,
  homepageFooterExplore,
  homepageFooterInvolve,
  pageHref,
} from '../data/navigation';
import { NavItem } from '../types';
import './Footer.css';

export const Footer: React.FC<{
  innerPage?: boolean;
  exploreLinks?: NavItem[];
  connectLinks?: NavItem[];
  websiteLabel?: string;
  showCorporate?: boolean;
  tagline?: string;
  statement?: string;
}> = ({
  innerPage = false,
  exploreLinks: exploreOverride,
  connectLinks: connectOverride,
  websiteLabel,
  showCorporate,
  tagline,
  statement = 'BUILDING A LEGACY OF STABILITY',
}) => {
  const exploreLinks = exploreOverride ?? (innerPage ? footerExplore : homepageFooterExplore);
  const connectLinks = connectOverride ?? (innerPage ? footerConnect : homepageFooterInvolve);
  const corporateVisible = showCorporate ?? innerPage;
  const connectHeading = innerPage ? 'Connect' : 'Get Involved';
  return (
    <footer className="site-footer" id="footer" aria-label="Site Footer">
      <div className="container">
        {/* Main Footer Row */}
        <div className="footer-main-grid">
          {/* Column 1: Brand, Description & Official Contact */}
          <div className="footer-col-brand">
            <a href={pageHref('#top', innerPage)} className="footer-logo-link" aria-label={`${siteConfig.organization} home`}>
              <img
                src={siteConfig.logos.light}
                alt={siteConfig.name}
                className="footer-logo-img"
                width={265}
                height={56}
                loading="lazy"
              />
            </a>

            <h3 className="footer-tagline">{tagline ?? siteConfig.tagline}</h3>

            {/* Official contact only — no physical address or phone is published. */}
            <div className="footer-contact-block">
              <div className="contact-item">
                <span className="contact-label">EMAIL</span>
                <a href={`mailto:${siteConfig.email}`} className="contact-value">
                  {siteConfig.email}
                </a>
              </div>

              <div className="contact-item">
                <span className="contact-label">{websiteLabel ?? (innerPage ? 'PUBLIC WEBSITE' : 'WEBSITE')}</span>
                <a
                  href={siteConfig.publicWebsite.href}
                  className="contact-value"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {siteConfig.publicWebsite.label}
                </a>
              </div>

              {corporateVisible && (
                <div className="contact-item">
                  <span className="contact-label">CORPORATE LANDING PAGE</span>
                  <a href={siteConfig.corporateSite.href} className="contact-value">
                    {siteConfig.corporateSite.label}
                  </a>
                </div>
              )}
            </div>

            {/* Social Links — PLACEHOLDER URLs pending client-approved profiles */}
            <div className="footer-social-row" aria-label="Social media channels (placeholder links)" data-placeholder="true">
              {siteConfig.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="social-badge"
                  aria-label={s.ariaLabel}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="footer-col-nav">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links-list">
              {exploreLinks.map((p) => (
                <li key={p.label}>
                  <a href={pageHref(p.href, innerPage)} className="footer-link">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div className="footer-col-nav">
            <h4 className="footer-heading">{connectHeading}</h4>
            <ul className="footer-links-list">
              {connectLinks.map((s) => (
                <li key={s.label}>
                  <a href={pageHref(s.href, innerPage)} className="footer-link">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Large Decorative Statement */}
        <div className="footer-watermark-row" aria-hidden="true">
          <div className="footer-giant-title">{statement}</div>
        </div>

        {/* Bottom Copyright & Legal bar */}
        <div className="footer-bottom-bar">
          <div className="copyright-text">{siteConfig.copyright}</div>

          <ul className="legal-links-list">
            {footerLegal.map((l) => (
              <li key={l.label}>
                <a href={pageHref(l.href, innerPage)} className="legal-link" title="Page pending client content">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
