import React from 'react';
import { clientLogos } from '../data/clients';
import './ClientLogos.css';

/**
 * Partner logo strip.
 * PLACEHOLDER: the artwork below is template filler, not actual Heirloom Legacy partners.
 * Replace with client-approved logos (or remove the strip) before publishing.
 */
export const ClientLogos: React.FC<{ label?: string }> = ({ label = 'Community & Partnership' }) => {
  return (
    <section
      className="client-logos-section section-light"
      aria-label="Community and partnership logos (placeholders)"
      data-placeholder="true"
    >
      <div className="container">
        {/* Divider with text */}
        <div className="logos-divider-row">
          <div className="divider-line" />
          <span className="divider-text">{label}</span>
          <div className="divider-line" />
        </div>

        {/* Ticker marquee of logos */}
        <div className="logos-marquee">
          <div className="logos-track">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((c, i) => (
              <div key={`${c.id}-${i}`} className="logo-item" aria-hidden={i >= clientLogos.length ? true : undefined} data-placeholder={c.placeholder || undefined}>
                <img
                  src={c.src}
                  alt={c.alt}
                  title={c.placeholder ? 'Placeholder logo — pending client approval' : undefined}
                  className="client-logo-img"
                  width={140}
                  height={50}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
