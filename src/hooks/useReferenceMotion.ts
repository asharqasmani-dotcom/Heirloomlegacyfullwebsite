import { useLayoutEffect, type RefObject } from 'react';

/** Arvon's observed Elementor motion, mapped onto the existing React layout. */
const entrances: Array<[string, string, number?, number?]> = [
  ['.header-container', 'slideDown'],
  ['.process-banner-copy', 'up'],
  ['.process-watermark', 'slideUp'],
  ['.benefits-heading', 'left'],
  ['.benefits-intro-text', 'right'],
  ['.benefit-item', 'up', 100, 100],
  ['.how-we-work-heading', 'left'],
  ['.how-we-work-right', 'right'],
  ['.process-steps-image-wrap', 'up'],
  ['.process-step-card', 'up', 100, 100],
  ['.reviews-header-left', 'left'],
  ['.reviews-header-right', 'right'],
  ['.reviews-showcase', 'up'],
  ['.contact-banner-copy', 'up'],
  ['.contact-watermark', 'slideUp'],
  ['.contact-form-col', 'left'],
  ['.contact-info-card', 'right'],
  ['.contact-map-section', 'up'],
  ['.services-banner-copy', 'up'],
  ['.services-watermark', 'slideUp'],
  ['.services-intro-heading', 'left'],
  ['.services-intro-details', 'right'],
  ['.services-offer-heading', 'left'],
  ['.services-offer-header > p', 'right'],
  ['.service-card', 'up', 100, 100],
  ['.about-banner-copy', 'up'],
  ['.about-watermark', 'slideUp'],
  ['.about-intro-heading', 'left'],
  ['.about-intro-details', 'right'],
  ['.about-principles', 'up'],
  ['.about-wide-image', 'up'],
  ['.about-pathways-heading', 'left'],
  ['.about-pathways-description', 'right'],
  ['.about-pathway', 'up', 100, 100],
  ['.about-connect-copy', 'left'],
  ['.hero-watermark', 'slideUp'],
  ['.hero-upper-left', 'left'],
  ['.hero-inquiry-card', 'slideUp'],
  ['.refined-header-eyebrow-col', 'left'],
  ['.refined-header-title-col', 'right'],
  ['.refined-col-tall-image', 'right'],
  ['.counter-item', 'right', 200, 100],
  ['.refined-narrative-top', 'right', 500],
  ['.refined-feature-card', 'right', 600],
  ['.property-slider-header .header-left', 'left'],
  ['.property-slider-header .header-right', 'right'],
  ['.carousel-viewport', 'up'],
  ['.features-header', 'down'],
  ['.feature-list-item', 'left', 100, 100],
  ['.features-media-col', 'right'],
  ['.process-header-left', 'left'],
  ['.process-header-right', 'right'],
  ['.process-timeline-wrapper', 'up'],
  ['.testimonials-header-left', 'left'],
  ['.testimonials-header-right', 'right'],
  ['.testimonials-card-col', 'right'],
  ['.newsletter-card', 'left'],
  ['.newsletter-watermark', 'right'],
];

const offsets: Record<string, string> = {
  left: 'translate3d(-100%,0,0)', right: 'translate3d(100%,0,0)',
  up: 'translate3d(0,100%,0)', down: 'translate3d(0,-100%,0)',
  slideUp: 'translate3d(0,100%,0)', slideDown: 'translate3d(0,-100%,0)',
};

export function useReferenceMotion(root: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const container = root.current;
    if (!container || !window.matchMedia || !window.IntersectionObserver || !Element.prototype.animate) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set<Animation>();
    const pending = new Map<HTMLElement, { direction: string; delay: number; opacity: string }>();
    const reveal = (element: HTMLElement) => {
      const settings = pending.get(element);
      if (!settings) return;
      pending.delete(element);
      element.style.opacity = settings.opacity;
      observer.unobserve(element);
      const base = getComputedStyle(element).transform;
      const opacity = getComputedStyle(element).opacity;
      const animation = element.animate([
        { transform: `${offsets[settings.direction]} ${base === 'none' ? '' : base}`, opacity: settings.direction.startsWith('slide') ? opacity : 0 },
        { transform: base, opacity },
      ], { duration: 1250, delay: settings.delay, easing: 'ease', fill: 'backwards' });
      animations.add(animation);
      animation.onfinish = () => { animations.delete(animation); animation.cancel(); };
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target as HTMLElement); });
    }, { threshold: 0 });
    const restore = () => {
      observer.disconnect();
      pending.forEach((settings, element) => { element.style.opacity = settings.opacity; });
      pending.clear();
      animations.forEach(animation => animation.cancel());
      animations.clear();
    };
    const start = () => {
      restore();
      if (preference.matches) return;
      entrances.forEach(([selector, direction, delay = 0, stagger = 0]) => {
        container.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
          // Hash navigation and keyboard focus should never land on hidden content.
          const bounds = element.getBoundingClientRect();
          if (bounds.bottom <= 0 || element.contains(document.activeElement)) return;
          pending.set(element, { direction, delay: delay + index * stagger, opacity: element.style.opacity });
          element.style.opacity = '0';
          observer.observe(element);
        });
      });
    };
    const onFocus = (event: FocusEvent) => {
      pending.forEach((settings, element) => {
        if (event.target instanceof Node && element.contains(event.target)) {
          element.style.opacity = settings.opacity;
          observer.unobserve(element);
          pending.delete(element);
        }
      });
      animations.forEach(animation => {
        const target = (animation.effect as KeyframeEffect | null)?.target;
        if (target instanceof Element && event.target instanceof Node && target.contains(event.target)) {
          animation.cancel(); animations.delete(animation);
        }
      });
    };
    start();
    preference.addEventListener('change', start);
    container.addEventListener('focusin', onFocus);
    return () => {
      restore();
      preference.removeEventListener('change', start);
      container.removeEventListener('focusin', onFocus);
    };
  }, [root]);
}
