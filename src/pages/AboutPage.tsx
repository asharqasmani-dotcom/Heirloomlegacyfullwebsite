import { FormEvent, useRef, useState } from 'react';
import { ArrowUpRight, Handshake, Landmark, Sprout } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Features } from '../components/Features';
import { Testimonials } from '../components/Testimonials';
import { aboutFooterConnect, aboutFooterExplore } from '../data/navigation';
import { siteConfig } from '../data/siteConfig';
import { useReferenceMotion } from '../hooks/useReferenceMotion';
import { getContactEndpoint, submitContact, validateEmail } from '../services/api';
import './AboutPage.css';

const asset = '/assets/dit.nomadenstudio.com/arvon/wp-content/uploads/sites/7/2026/01/';
const principles = ['Community', 'Stability', 'Dignity', 'Partnership', 'Resources', 'Opportunity', 'Community', 'Stability', 'Dignity'];
const statements = ['Community First', 'Meaningful Partnerships', 'Purposeful Resources', 'Lasting Stability'];
const pathways = [
  { title: 'Community Connection', caption: 'Dignity & Belonging', image: '/assets/community/community-partnerships-team.jpg', alt: 'Five people gathered in a circle, looking down between city towers' },
  { title: 'Meaningful Partnerships', caption: 'Shared Purpose', image: `${asset}Image-Gen-8.jpg`, alt: 'Glass high-rise buildings on a city corner' },
  { title: 'Purposeful Resources', caption: 'Resource Development', image: '/assets/community/values-community-room.jpg', alt: 'Interior room with a pool table, foosball table, and a chess table' },
  { title: 'Lasting Stability', caption: 'Stronger Together', image: `${asset}Image-Gen-13.jpg`, alt: 'White modern building reflected in a still pool beside a tree' },
];

export function AboutPage() {
  const root = useRef<HTMLDivElement>(null);
  const [connectEmail, setConnectEmail] = useState('');
  const [connectNote, setConnectNote] = useState('');
  useReferenceMotion(root);

  const handleConnect = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = connectEmail.trim();
    if (!validateEmail(email)) {
      setConnectNote('Please enter a valid email address.');
      return;
    }
    const result = await submitContact({
      fullName: 'About Us visitor',
      email,
      inquiryType: 'Get Involved',
      message: 'Please get in touch with me about Heirloom Legacy.',
      website: '',
    });
    if (result.success) {
      setConnectNote(result.message);
      return;
    }
    if (!getContactEndpoint()) {
      setConnectNote('');
      window.location.assign('/#contact');
      return;
    }
    setConnectNote(result.message);
  };
  return (
    <div className="app-root about-page" ref={root}>
      <a className="about-skip-link" href="#main-content">Skip to content</a>
      <Header innerPage currentPage="/about-us/" />
      <main id="main-content">
        <section className="about-banner" id="top" aria-labelledby="about-title">
          <div className="about-watermark" aria-hidden="true">ABOUT</div>
          <div className="about-banner-copy">
            <h1 id="about-title">About Our Legacy</h1>
            <nav aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true"> / </span><span aria-current="page">About Us</span></nav>
          </div>
        </section>

        <section className="about-intro container" aria-labelledby="about-purpose">
          <div className="about-intro-heading">
            <span className="eyebrow">Rooted in Community and Purpose</span>
            <h2 id="about-purpose">Building Stronger Communities with Purpose.</h2>
            <div className="about-commitment">
              <div className="about-commitment-icons" aria-hidden="true"><Landmark /><Handshake /><Sprout /></div>
              <p>Community • Partnership • Stability</p>
            </div>
          </div>
          <div className="about-intro-details">
            <img className="about-intro-image" src={`${asset}Image-Gen-7.jpg`} alt="Contemporary architecture with warm terracotta accents" width="720" height="155" loading="lazy" />
            <div className="about-purpose-row"><h3>Our Mission</h3><p>To strengthen communities through meaningful partnerships, purposeful resources, and a commitment to dignity and belonging.</p></div>
            <div className="about-purpose-row"><h3>Our Vision</h3><p>A future where individuals experience greater stability, stronger connections, and opportunities to thrive.</p></div>
          </div>
        </section>

        <section className="about-principles" aria-label="Our guiding principles">
          <p>Built on a shared commitment to community</p>
          <div className="about-principles-window"><div className="about-principles-track">
            {[0, 1, 2].map(run => <div className="about-principles-run" key={run} aria-hidden={run > 0 ? true : undefined}>{principles.map((word, index) => <span key={`${word}-${index}`}>{word}</span>)}</div>)}
          </div></div>
        </section>

        <div className="container about-wide-image">
          <img src={`${asset}Image-Gen-5.jpg`} alt="Open, welcoming architecture surrounded by landscaped outdoor spaces" width="1500" height="700" loading="lazy" />
        </div>

        <Features image={`${asset}Image-Gen-6-683x1024.jpg`} showCaption={false} eyebrow="What Guides Our Mission" />

        <div className="about-large-marquee" aria-hidden="true"><div className="about-large-track">
          {[0, 1, 2].map(run => <div className="about-large-run" key={run}>{statements.map(word => <span key={word}><img src={siteConfig.logos.mark} alt="" width="64" height="64" />{word}</span>)}</div>)}
        </div></div>

        <section className="about-pathways container" aria-labelledby="about-together">
          <div className="about-pathways-header">
            <div className="about-pathways-heading"><span className="eyebrow">People and Purpose</span><h2 id="about-together">Together, We Build a Lasting Legacy.</h2></div>
            <div className="about-pathways-description"><p>Strong communities begin with meaningful connections. Our vision brings people, organizations, and useful community resources together through partnership and purposeful initiatives.</p><a href="/#contact" className="btn-primary">Connect With Our Team <ArrowUpRight size={16} /></a></div>
          </div>
          <div className="about-pathway-grid">{pathways.map(item => <article className="about-pathway" key={item.title}><img src={item.image} alt={item.alt} width="320" height="370" loading="lazy" /><h3>{item.title}</h3><p>{item.caption}</p></article>)}</div>
        </section>

        <section className="about-connect" aria-labelledby="about-connect-title">
          <div className="about-connect-watermark" aria-hidden="true">LEGACY</div>
          <div className="container"><div className="about-connect-copy"><h2 id="about-connect-title">Let’s Build Stronger Communities Together.</h2><p>Connect with our team to explore meaningful partnerships, community initiatives, and opportunities to support our mission.</p><form className="about-contact-pill" onSubmit={handleConnect} noValidate><label className="sr-only" htmlFor="about-connect-email">Email address</label><input id="about-connect-email" type="email" name="email" autoComplete="email" placeholder="Enter your email address" value={connectEmail} onChange={(event) => setConnectEmail(event.target.value)} required /><button type="submit" className="btn-primary">Get in Touch <ArrowUpRight size={16} /></button></form>{connectNote && <p className="about-connect-note" role="status">{connectNote}</p>}</div></div>
        </section>
        <Testimonials contactHref="/#contact" />
      </main>
      <Footer innerPage exploreLinks={aboutFooterExplore} connectLinks={aboutFooterConnect} websiteLabel="WEBSITE" showCorporate={false} />
    </div>
  );
}
