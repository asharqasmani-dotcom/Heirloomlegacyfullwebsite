import { useRef } from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { initiativesFooterConnect, initiativesFooterExplore } from '../data/navigation';
import { servicesPage as content } from '../data/services';
import { useReferenceMotion } from '../hooks/useReferenceMotion';
import './ServicesPage.css';

export function ServicesPage() {
  const root = useRef<HTMLDivElement>(null);
  useReferenceMotion(root);
  return (
    <div className="app-root services-page" ref={root}>
      <a className="services-skip-link" href="#main-content">Skip to content</a>
      <Header innerPage currentPage="/our-services/" />
      <main id="main-content" data-template-content="true">
        <section className="services-banner" style={{ backgroundImage: `linear-gradient(rgba(11,27,61,.4),rgba(11,27,61,.4)),url("${content.heroImage}")` }} aria-labelledby="services-title">
          <div className="services-watermark" aria-hidden="true">{content.watermark}</div>
          <div className="services-banner-copy"><h1 id="services-title">{content.title}</h1><nav aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Community Initiatives</span></nav></div>
        </section>

        <section className="services-intro container" aria-labelledby="services-intro-title">
          <div className="services-intro-heading"><span className="eyebrow">{content.eyebrow}</span><h2 id="services-intro-title">{content.introTitle}</h2>
            <div className="services-trust" data-placeholder="true">
              <div className="services-avatars" aria-hidden="true">{content.avatars.map(src => <img key={src} src={src} alt="" width="48" height="48" loading="lazy" />)}</div>
              <div><div className="services-stars" aria-label="Placeholder portraits and rating graphic, pending replacement">{[0,1,2,3,4].map(i => <Star key={i} size={13} fill="currentColor" aria-hidden="true" />)}</div><p>{content.trustLabel}</p></div>
            </div>
          </div>
          <div className="services-intro-details"><img className="services-intro-image" src={content.introImage} alt="Contemporary residences with terracotta architecture" width="720" height="155" loading="lazy" />
            <div className="services-purpose-row"><h3>Our Mission</h3><p>{content.mission}</p></div>
            <div className="services-purpose-row"><h3>Our Vision</h3><p>{content.vision}</p></div>
          </div>
        </section>

        <div className="services-video container"><div className="services-video-frame"><img src={content.videoImage} alt="Contemporary residence beside a swimming pool" width="1500" height="700" loading="lazy" /></div></div>

        <section className="services-offer container" aria-labelledby="services-offer-title">
          <div className="services-offer-header"><div className="services-offer-heading"><span className="eyebrow">{content.offerEyebrow}</span><h2 id="services-offer-title">{content.offerTitle}</h2></div><p>{content.offerDescription}</p></div>
          <div className="services-grid">{content.cards.map(service => <article className="service-card" key={service.title}><div className="service-icon"><img src={service.icon} alt="" width="64" height="64" loading="lazy" /></div><h3>{service.title}</h3><p>{service.description}</p><a className="service-details" href={service.href} aria-label={`Learn more about ${service.title}`}>Learn More <ArrowUpRight size={16} aria-hidden="true" /></a></article>)}</div>
        </section>
      </main>
      <Footer innerPage exploreLinks={initiativesFooterExplore} connectLinks={initiativesFooterConnect} websiteLabel="WEBSITE" showCorporate={false} />
    </div>
  );
}
