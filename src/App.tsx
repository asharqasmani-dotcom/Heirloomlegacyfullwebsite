import React, { useRef, useLayoutEffect } from 'react';
import { useReferenceMotion } from './hooks/useReferenceMotion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RefinedLiving } from './components/RefinedLiving';
import { PropertySlider } from './components/PropertySlider';
import { Features } from './components/Features';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { homepageFeatures } from './data/features';

export const App: React.FC = () => {
  const motionRoot = useRef<HTMLDivElement>(null);
  useReferenceMotion(motionRoot);
  // Cross-page anchors must resolve after React has mounted the target section.
  useLayoutEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
  }, []);
  return (
    <div className="app-root" ref={motionRoot}>
      {/* Header Navigation */}
      <Header />

      <main id="main-content">
        {/* 01. Hero — #top */}
        <Hero />

        {/* 02 + 03. Nonprofit Introduction + Marquee — #about */}
        <RefinedLiving />

        {/* 04. Community Initiatives — #initiatives */}
        <PropertySlider />

        {/* 05. Our Values — #values */}
        <Features
          eyebrow="A More Personal Approach"
          title="Where Everyday Comfort Meets Independent Living."
          subtitle="Our residential vision places comfort, independence, privacy, and a welcoming atmosphere at the heart of daily life."
          items={homepageFeatures}
        />

        {/* 06. Our Purpose — #mission */}
        <Process />

        {/* 07. Community philosophy — #partnerships */}
        <Testimonials
          lead="A meaningful living experience begins with everyday comfort, personal dignity, and the freedom to feel at home."
          ctaLabel="OUR APPROACH"
          contactHref="#mission"
          eyebrow="The Heart of Heirloom"
          title="A Home Should Feel Like More Than a Place to Stay."
          quote="Everyone deserves an environment where comfort, independence, and dignity come together to create a genuine feeling of home."
          role="Our Independent Living Vision"
          sectionLabel="Independent living vision"
        />

        {/* 08. Connect with our community — #contact */}
        <ContactForm />
      </main>

      {/* 10. Footer */}
      <Footer
        tagline="Thoughtful Independent Living. Personal Comfort. A Lasting Sense of Home."
        statement="A PLACE TO CALL HOME"
      />
    </div>
  );
};

export default App;
