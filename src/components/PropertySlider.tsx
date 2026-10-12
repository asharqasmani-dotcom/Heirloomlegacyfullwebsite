import React from 'react';
import { initiativesData } from '../data/initiatives';
import { ArrowUpRight, Tag } from 'lucide-react';
import './PropertySlider.css';

export const PropertySlider: React.FC = () => {
  return (
    <section
      className="property-slider-section section-dark"
      id="initiatives"
      aria-label="The Living Experience"
    >
      <div className="container">
        {/* Section Header */}
        <div className="property-slider-header">
          <div className="header-left">
            <span className="eyebrow eyebrow-dark">Discover Better Living</span>
            <h2 className="property-slider-title">Independent Living Designed Around Everyday Comfort.</h2>
          </div>
          <div className="header-right">
            <p className="property-header-desc">
              Explore our vision for welcoming spaces, thoughtfully planned surroundings, and a
              residential experience centered on personal independence.
            </p>
            <div className="header-action-row">
              <a href="#mission" className="btn-primary">
                EXPLORE LIVING <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Three image cards (native snap-scroll below 1024px) */}
        <div className="carousel-viewport">
          <div className="carousel-track">
            {initiativesData.map((item) => (
              <article key={item.id} className="property-card" aria-label={item.title}>
                <div className="card-media-wrapper">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="card-media-img"
                    loading="lazy"
                    width={400}
                    height={480}
                  />
                  <div className="card-media-overlay" />
                  <div className="card-location-tag">
                    <Tag size={14} className="tag-icon" /> {item.category.toUpperCase()}
                  </div>
                </div>

                <div className="card-content">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.description}</p>
                  <div className="card-footer">
                    <a href={item.href} className="card-detail-link">
                      DISCOVER MORE <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
