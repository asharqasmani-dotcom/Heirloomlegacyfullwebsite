import { useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { partnershipsFooterConnect, partnershipsFooterExplore } from '../data/navigation';
import { processPage as content } from '../data/processPage';
import { useReferenceMotion } from '../hooks/useReferenceMotion';
import './ProcessPage.css';

export function ProcessPage() {
  const root = useRef<HTMLDivElement>(null);
  useReferenceMotion(root);
  const [activeReview, setActiveReview] = useState(0);

  const prevReview = () => {
    setActiveReview((curr) => (curr === 0 ? content.reviews.length - 1 : curr - 1));
  };

  const nextReview = () => {
    setActiveReview((curr) => (curr === content.reviews.length - 1 ? 0 : curr + 1));
  };

  const review = content.reviews[activeReview];

  return (
    <div className="app-root process-page" ref={root}>
      <a className="process-skip-link" href="#main-content">
        Skip to content
      </a>
      <Header innerPage currentPage="/partnerships-support/" />
      <main id="main-content">
        {/* 01. Banner */}
        <section
          className="process-banner"
          style={{
            backgroundImage: `linear-gradient(rgba(11,27,61,.45),rgba(11,27,61,.45)),url("${content.heroImage}")`,
          }}
          aria-labelledby="process-title"
        >
          <div className="process-watermark" aria-hidden="true">
            {content.watermark}
          </div>
          <div className="process-banner-copy">
            <h1 id="process-title">{content.title}</h1>
            <nav aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span aria-hidden="true"> / </span>
              <span aria-current="page">Partnerships & Support</span>
            </nav>
          </div>
        </section>

        {/* 02. Why Choose Arvon / Benefits */}
        <section className="process-benefits container" aria-labelledby="benefits-title">
          <div className="process-benefits-header">
            <div className="benefits-heading">
              <span className="eyebrow">{content.benefitsEyebrow}</span>
              <h2 id="benefits-title">{content.benefitsTitle}</h2>
            </div>
            <p className="benefits-intro-text">{content.benefitsDescription}</p>
          </div>

          <div className="benefits-grid">
            {content.benefits.map((benefit, index) => (
              <div className="benefit-item" key={benefit.number}>
                <div className="benefit-num">{benefit.number}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
                {index < content.benefits.length - 1 && <div className="benefit-divider" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </section>

        {/* 03. How We Work / Process Steps */}
        <section className="process-steps-section container" aria-labelledby="steps-title">
          <div className="process-steps-header">
            <div className="how-we-work-heading">
              <span className="eyebrow">{content.stepsEyebrow}</span>
              <h2 id="steps-title">{content.stepsTitle}</h2>
            </div>
            <div className="how-we-work-right">
              <div className="process-trust-box">
                <div className="process-avatars" aria-hidden="true">
                  {content.avatars.map((src) => (
                    <img key={src} src={src} alt="" width={42} height={42} loading="lazy" />
                  ))}
                </div>
                <div className="process-trust-meta">
                  <div className="process-stars" aria-label="Placeholder portraits and rating graphic, pending replacement">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} size={13} fill="currentColor" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="trust-label">{content.trustLabel}</span>
                </div>
              </div>
              <p className="steps-description">{content.stepsDescription}</p>
            </div>
          </div>

          {/* Prominent feature image */}
          <div className="process-steps-image-wrap">
            <img
              src={content.stepsImage}
              alt="Contemporary residence with timber columns and landscaped grounds"
              className="process-steps-image"
              width={1500}
              height={600}
              loading="lazy"
            />
          </div>

          {/* Steps 4-Card Grid */}
          <div className="process-steps-grid">
            {content.steps.map((step) => (
              <article className="process-step-card" key={step.number}>
                <div className="step-card-top">
                  <div className="step-icon-badge">
                    <img src={step.icon} alt="" width={48} height={48} loading="lazy" />
                  </div>
                  <span className="step-num">{step.number}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 04. Client Trust Stories / Testimonials */}
        <section className="process-reviews-section container" aria-labelledby="reviews-title">
          <div className="reviews-header">
            <div className="reviews-header-left">
              <p>{content.reviewsDescription}</p>
              <a href="/contact-us/" className="btn-outline-on-light reviews-cta">
                Connect With Us <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="reviews-header-right">
              <span className="eyebrow">{content.reviewsEyebrow}</span>
              <h2 id="reviews-title">{content.reviewsTitle}</h2>
            </div>
          </div>

          <div className="reviews-showcase">
            <div className="reviews-image-col">
              <img
                src={content.reviewsImage}
                alt="Five people gathered in a circle, looking up between city towers"
                width={800}
                height={600}
                loading="lazy"
              />
            </div>
            <div className="reviews-carousel-col">
              <div className="reviews-carousel-card">
                <Quote size={52} className="reviews-quote-icon" aria-hidden="true" />
                <blockquote className="reviews-quote">{review.quote}</blockquote>
                <div className="reviews-author-row">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="reviews-avatar"
                    width={64}
                    height={64}
                    loading="lazy"
                  />
                  <div className="reviews-author-meta">
                    <div className="reviews-author-name">{review.name}</div>
                    <div className="reviews-author-role">{review.role}</div>
                  </div>
                </div>

                <div className="reviews-carousel-nav">
                  <div className="reviews-dots" role="tablist" aria-label="Partnership philosophy">
                    {content.reviews.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        role="tab"
                        aria-selected={activeReview === i}
                        aria-label={`Go to statement ${i + 1}`}
                        className={`reviews-dot ${activeReview === i ? 'reviews-dot-active' : ''}`}
                        onClick={() => setActiveReview(i)}
                      />
                    ))}
                  </div>
                  <div className="reviews-arrow-btns">
                    <button
                      type="button"
                      className="reviews-arrow-btn"
                      aria-label="Previous statement"
                      onClick={prevReview}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      className="reviews-arrow-btn"
                      aria-label="Next statement"
                      onClick={nextReview}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer
        innerPage
        exploreLinks={partnershipsFooterExplore}
        connectLinks={partnershipsFooterConnect}
        websiteLabel="WEBSITE"
        showCorporate={false}
      />
    </div>
  );
}
