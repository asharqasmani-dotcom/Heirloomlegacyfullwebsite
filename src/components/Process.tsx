import React from 'react';
import { processSteps } from '../data/process';
import './Process.css';

export const Process: React.FC = () => {
  return (
    <section className="process-section section-dark" id="mission" aria-label="Our Living Philosophy">
      <div className="container">
        {/* Section Header: Left Eyebrow & Title, Right Subtitle */}
        <div className="process-header">
          <div className="process-header-left">
            <span className="eyebrow eyebrow-dark">Our Living Philosophy</span>
            <h2 className="process-title">A Better Everyday Experience Begins at Home.</h2>
          </div>

          <div className="process-header-right">
            <p className="process-subtitle">
              Our vision for independent living brings together comfort, welcoming surroundings,
              and thoughtful design to support dignity and freedom.
            </p>
          </div>
        </div>

        {/* Middle: Full-width architectural image banner */}
        <div className="process-hero-banner">
          <img
            src="/assets/community/process-mission-banner.jpg"
            alt="Contemporary residence with open landscaped grounds"
            className="process-banner-image"
            width={1024}
            height={363}
            loading="lazy"
          />
        </div>

        {/* Bottom: 4 Connected Timeline Steps with circular nodes & connecting lines */}
        <div className="process-timeline-wrapper">
          <div className="process-timeline-line" aria-hidden="true" />
          <div className="process-timeline-grid">
            {processSteps.map((step) => (
              <div key={step.number} className="process-step-node">
                <div className="step-circle-badge">
                  {step.icon ? (
                    <img src={step.icon} alt="" className="step-badge-icon" width={32} height={32} />
                  ) : null}
                  <span className="step-badge-num">{step.number}</span>
                </div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
