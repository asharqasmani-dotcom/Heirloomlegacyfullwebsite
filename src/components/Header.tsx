import React, { useState, useEffect } from 'react';
import { navigationItems, headerCta, pageHref } from '../data/navigation';
import { siteConfig } from '../data/siteConfig';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import './Header.css';

export const Header: React.FC<{ innerPage?: boolean; currentPage?: string }> = ({
  innerPage = false,
  currentPage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = navigationItems;
  const cta = headerCta;
  const activeHref =
    currentPage ?? (typeof window !== 'undefined' ? window.location.pathname : '/');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isItemActive = (href: string, index: number) => {
    const normalize = (path: string) => path.replace(/\/$/, '') || '/';
    if (normalize(activeHref) !== normalize(href)) return false;
    let lastMatch = -1;
    navItems.forEach((item, itemIndex) => {
      if (normalize(item.href) === normalize(href)) lastMatch = itemIndex;
    });
    return index === lastMatch;
  };

  return (
    <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        {/* Brand Logo */}
        <a href={pageHref('/', innerPage)} className="header-logo-link" aria-label={`${siteConfig.organization} home`}>
          <img
            src={siteConfig.logos.primary}
            alt={siteConfig.name}
            className="header-logo-img"
            width={237}
            height={50}
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="header-nav" aria-label="Main Navigation">
          <ul className="nav-menu">
            {navItems.map((item, index) => (
              <li key={item.label} className="nav-item">
                <a
                  href={pageHref(item.href, innerPage)}
                  className={`nav-link ${isItemActive(item.href, index) ? 'nav-link-active' : ''}`}
                  aria-current={isItemActive(item.href, index) ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Header Right: Partner CTA */}
        <div className="header-cta">
          <a href={pageHref(cta.href, innerPage)} className="btn-primary header-cta-btn">
            {cta.label} <ArrowUpRight size={16} />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`mobile-drawer ${mobileMenuOpen ? 'drawer-open' : ''}`}
        id="mobile-navigation"
        inert={!mobileMenuOpen}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-drawer-content">
          <ul className="mobile-nav-list">
            {navItems.map((item, index) => (
              <li key={item.label} className="mobile-nav-item">
                <a
                  href={pageHref(item.href, innerPage)}
                  className={`mobile-nav-link ${isItemActive(item.href, index) ? 'mobile-nav-link-active' : ''}`}
                  aria-current={isItemActive(item.href, index) ? 'page' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-drawer-footer">
            <a
              href={pageHref(cta.href, innerPage)}
              className="btn-primary"
              style={{ width: '100%' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {cta.label} <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
