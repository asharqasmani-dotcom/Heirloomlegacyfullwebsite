import React, { useState } from 'react';
import { statementsData } from '../data/statements';
import { Quote } from 'lucide-react';
import './Testimonials.css';

export const Testimonials: React.FC<{
  contactHref?: string;
  lead?: string;
  ctaLabel?: string;
  quote?: string;
  eyebrow?: string;
  title?: string;
  role?: string;
  sectionLabel?: string;
}> = ({
  contactHref = '#contact',
  lead = 'Strong communities are shaped by meaningful relationships, shared responsibility, and people working toward a common purpose.',
  ctaLabel = 'CONNECT WITH US',
  quote,
  eyebrow = 'Our Community Commitment',
  title = 'Building Trust Through Meaningful Partnerships.',
  role,
  sectionLabel = 'Community Partnerships',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const source = statementsData[currentIndex];
  const current = { ...source, ...(quote ? { quote } : {}), ...(role ? { role } : {}) };

  return (
    <section
      className="testimonials-section section-light"
      id="partnerships"
      aria-label={sectionLabel}
    >
      <div className="container">
        {/* Section Header: Left lead text + CTA; Right Eyebrow + Heading */}
        <div className="testimonials-header">
          <div className="testimonials-header-left">
            <p className="testimonials-header-desc">{lead}</p>
            <div className="testimonials-cta-wrap">
              <a href={contactHref} className="btn-outline-on-light">
                {ctaLabel}
              </a>
            </div>
          </div>

          <div className="testimonials-header-right">
            <span className="eyebrow eyebrow-light">{eyebrow}</span>
            <h2 className="testimonials-title">{title}</h2>
          </div>
        </div>

        {/* 2-Column Split: Left photo; Right organizational statement card */}
        <div className="testimonials-split-grid">
          <div className="testimonials-image-col">
            <div className="testimonial-photo-frame">
              <img
                src="/assets/community/community-partnerships-team.jpg"
                alt="Community members and partners united with shared purpose"
                className="testimonial-photo"
                loading="lazy"
                width={819}
                height={1024}
              />
            </div>
          </div>

          <div className="testimonials-card-col">
            {/* Organizational statement — not a donor/client testimonial */}
            <article className="testimonial-card" key={current.id} aria-label="Our community philosophy">
              <div className="quote-icon-box">
                <Quote size={48} className="quote-icon" />
              </div>

              <p className="testimonial-quote-text">“{current.quote}”</p>

              <div className="testimonial-author-row">
                <img
                  src={current.avatar}
                  alt=""
                  className="author-avatar author-avatar-mark"
                  width={56}
                  height={56}
                  loading="lazy"
                />
                <div className="author-details">
                  <h4 className="author-name">{current.author.toUpperCase()}</h4>
                  <span className="author-role">{current.role}</span>
                  <div className="author-rating">{current.identifier}</div>
                </div>
              </div>
            </article>

            {statementsData.length > 1 && (
              <div className="testimonial-dots" role="tablist" aria-label="Statement navigation">
                {statementsData.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={currentIndex === idx}
                    className={`testimonial-dot ${currentIndex === idx ? 'dot-active' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to statement ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
