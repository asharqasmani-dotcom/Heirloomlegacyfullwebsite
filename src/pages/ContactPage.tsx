import { useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { contactPage as content } from '../data/contactPage';
import { siteConfig } from '../data/siteConfig';
import { CONTACT_RECIPIENT, getContactEndpoint, NOT_CONFIGURED_MESSAGE } from '../services/api';
import { useReferenceMotion } from '../hooks/useReferenceMotion';
import './ContactPage.css';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export function ContactPage() {
  const root = useRef<HTMLDivElement>(null);
  useReferenceMotion(root);

  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormState> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Please enter your phone number.';
    if (!formData.subject.trim()) newErrors.subject = 'Please enter a subject.';
    if (!formData.message.trim()) newErrors.message = 'Please enter your message.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitError(null);
    const endpoint = getContactEndpoint();
    if (!endpoint) {
      setSubmitError(NOT_CONFIGURED_MESSAGE);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          type: 'contact-page',
          to: CONTACT_RECIPIENT,
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`Server returned HTTP ${res.status}`);
      setSubmitted(true);
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : 'Unknown error';
      setSubmitError(`Submission failed: ${errMessage}. Please try again or email ${CONTACT_RECIPIENT}.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-root contact-page" ref={root}>
      <a className="contact-skip-link" href="#main-content">
        Skip to content
      </a>
      <Header innerPage currentPage="/contact-us/" />
      <main id="main-content">
        {/* 01. Banner */}
        <section
          className="contact-banner"
          style={{
            backgroundImage: `linear-gradient(rgba(11,27,61,.45),rgba(11,27,61,.45)),url("${content.heroImage}")`,
          }}
          aria-labelledby="contact-title"
        >
          <div className="contact-watermark" aria-hidden="true">
            {content.watermark}
          </div>
          <div className="contact-banner-copy">
            <h1 id="contact-title">{content.title}</h1>
            <nav aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span aria-hidden="true"> / </span>
              <span aria-current="page">Contact</span>
            </nav>
          </div>
        </section>

        {/* 02. Form & Contact Info Section */}
        <section className="contact-main container" aria-labelledby="connect-title">
          <div className="contact-grid">
            {/* Form Column */}
            <div className="contact-form-col">
              <span className="eyebrow">{content.eyebrow}</span>
              <h2 id="connect-title">{content.introTitle}</h2>
              <p className="contact-intro-desc">{content.introDescription}</p>

              {submitted ? (
                <div className="contact-success-msg" role="status" tabIndex={-1}>
                  <CheckCircle2 size={32} className="success-icon" />
                  <div>
                    <h3>Thank you! Form submitted successfully.</h3>
                    <p>Our team has received your message and will respond shortly.</p>
                  </div>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-group">
                    <label htmlFor="contact-full-name">Full Name *</label>
                    <input
                      id="contact-full-name"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      aria-required="true"
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? 'error-full-name' : undefined}
                    />
                    {errors.fullName && (
                      <span id="error-full-name" className="field-error" role="alert">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="contact-email">Email Address *</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email address"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'error-email' : undefined}
                      />
                      {errors.email && (
                        <span id="error-email" className="field-error" role="alert">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-phone">Phone Number *</label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                        aria-required="true"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'error-phone' : undefined}
                      />
                      {errors.phone && (
                        <span id="error-phone" className="field-error" role="alert">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-subject">Subject *</label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Inquiry subject"
                      aria-required="true"
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? 'error-subject' : undefined}
                    />
                    {errors.subject && (
                      <span id="error-subject" className="field-error" role="alert">
                        {errors.subject}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message">Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'error-message' : undefined}
                    />
                    {errors.message && (
                      <span id="error-message" className="field-error" role="alert">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {submitError && (
                    <p className="field-error" role="alert">
                      {submitError}
                    </p>
                  )}

                  <button type="submit" className="btn-primary contact-submit-btn" disabled={submitting}>
                    Send Inquiry <ArrowUpRight size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Info Card Column */}
            <aside className="contact-info-col" aria-label="Contact Information">
              <div className="contact-info-card">
                <h3>{content.infoTitle}</h3>

                {/* Phone */}
                <div className="info-block">
                  <div className="info-block-header">
                    <Phone size={18} className="info-icon" aria-hidden="true" />
                    <span className="info-label">{content.phoneLabel}</span>
                  </div>
                  <div className="info-val-primary">{content.phoneValue}</div>
                  <div className="info-val-secondary">
                    <Clock size={13} className="info-sub-icon" aria-hidden="true" />
                    <span>{content.phoneNote}</span>
                  </div>
                </div>

                <div className="info-divider" />

                {/* Email */}
                <div className="info-block">
                  <div className="info-block-header">
                    <Mail size={18} className="info-icon" aria-hidden="true" />
                    <span className="info-label">{content.emailLabel}</span>
                  </div>
                  <div className="info-val-primary">
                    <a href={`mailto:${content.email}`}>{content.email}</a>
                  </div>
                  <div className="info-badge">{content.emailResponse}</div>
                </div>

                <div className="info-divider" />

                {/* Address */}
                <div className="info-block">
                  <div className="info-block-header">
                    <MapPin size={18} className="info-icon" aria-hidden="true" />
                    <span className="info-label">{content.addressLabel}</span>
                  </div>
                  <address className="info-val-address">
                    {content.addressValue}
                    <br />
                    {content.addressNote}
                  </address>
                </div>

                <div className="info-divider" />

                {/* Social Icons */}
                <div className="info-social-block">
                  <span className="info-label">Follow Us</span>
                  <div className="info-social-links">
                    {siteConfig.socials.map((s) => (
                      <span
                        key={s.label}
                        className="info-social-btn"
                        title="Verified profile pending"
                        aria-label={`${s.label} (verified Heirloom Legacy profile not yet connected)`}
                      >
                        {s.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* 03. Google Maps Section */}
        <section className="contact-map-section" aria-label="Service area map">
          <div className="map-frame" data-placeholder="true">
            <div className="map-pending" role="status">
              <span>Location</span>
              <p>{content.mapStatus}</p>
            </div>
          </div>
        </section>

      </main>
      <Footer innerPage />
    </div>
  );
}
