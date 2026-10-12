import React, { useState } from 'react';
import { submitContact, HOMEPAGE_INQUIRY_TYPES, CONTACT_RECIPIENT } from '../services/api';
import { ContactFormData } from '../types';
import { User, Mail, ListFilter, MessageSquare, CheckCircle, AlertCircle, Loader2, ChevronDown } from 'lucide-react';
import './ContactForm.css';

const initialState: ContactFormData = {
  fullName: '',
  email: '',
  inquiryType: '',
  message: '',
  website: '',
};

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMessage('');
    setFieldErrors({});

    const res = await submitContact(formData);
    if (res.success) {
      setStatus('success');
      setStatusMessage(res.message);
      setFormData(initialState);
    } else {
      setStatus('error');
      setStatusMessage(res.message);
      if (res.fieldErrors) setFieldErrors(res.fieldErrors);
    }
  };

  const errorId = (field: string) => (fieldErrors[field] ? `contact-${field}-error` : undefined);

  return (
    <section className="newsletter-section" id="contact" aria-label="Contact Us">
      {/* Background with overlay */}
      <div
        className="newsletter-backdrop"
        style={{
          backgroundImage: `url("/assets/dit.nomadenstudio.com/arvon/wp-content/uploads/sites/7/2026/01/Image-Gen-3.jpg")`,
        }}
      >
        <div className="newsletter-overlay" />

        {/* Watermark brand text */}
        <div className="newsletter-watermark" aria-hidden="true">
          LEGACY
        </div>

        <div className="container newsletter-content-wrapper">
          <div className="newsletter-card">
            <span className="eyebrow eyebrow-dark">Connect With Heirloom</span>
            <h2 className="newsletter-title">Discover a More Thoughtful Way of Living.</h2>
            <p className="newsletter-desc">
              Have questions about our independent living vision? Connect with our team to learn
              more about Heirloom Legacy and its residential approach.
            </p>

            {/* Contact Inquiry Form */}
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="contact-form-card">
                <div className="contact-grid">
                  {/* Full Name */}
                  <div className="contact-field">
                    <label htmlFor="contact-fullName" className="cf-label">
                      <User size={14} className="cf-label-icon" /> Full Name
                    </label>
                    <input
                      type="text"
                      id="contact-fullName"
                      name="fullName"
                      autoComplete="name"
                      className={`contact-input ${fieldErrors.fullName ? 'input-error' : ''}`}
                      placeholder="Your Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      aria-invalid={Boolean(fieldErrors.fullName)}
                      aria-describedby={errorId('fullName')}
                      required
                    />
                    {fieldErrors.fullName && (
                      <span id="contact-fullName-error" className="contact-error" role="alert">
                        {fieldErrors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="contact-field">
                    <label htmlFor="contact-email" className="cf-label">
                      <Mail size={14} className="cf-label-icon" /> Email Address
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      autoComplete="email"
                      className={`contact-input ${fieldErrors.email ? 'input-error' : ''}`}
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={errorId('email')}
                      required
                    />
                    {fieldErrors.email && (
                      <span id="contact-email-error" className="contact-error" role="alert">
                        {fieldErrors.email}
                      </span>
                    )}
                  </div>

                  {/* Inquiry Type */}
                  <div className="contact-field contact-field-full">
                    <label htmlFor="contact-inquiryType" className="cf-label">
                      <ListFilter size={14} className="cf-label-icon" /> Inquiry Type
                    </label>
                    <div className="contact-select-wrap">
                      <select
                        id="contact-inquiryType"
                        name="inquiryType"
                        className={`contact-input contact-select ${fieldErrors.inquiryType ? 'input-error' : ''} ${
                          formData.inquiryType === '' ? 'is-placeholder' : ''
                        }`}
                        value={formData.inquiryType}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.inquiryType)}
                        aria-describedby={errorId('inquiryType')}
                        required
                      >
                        <option value="" disabled>
                          Select an inquiry type
                        </option>
                        {HOMEPAGE_INQUIRY_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="contact-select-chevron" aria-hidden="true" />
                    </div>
                    {fieldErrors.inquiryType && (
                      <span id="contact-inquiryType-error" className="contact-error" role="alert">
                        {fieldErrors.inquiryType}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="contact-field contact-field-full">
                    <label htmlFor="contact-message" className="cf-label">
                      <MessageSquare size={14} className="cf-label-icon" /> Your Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={3}
                      maxLength={2000}
                      className={`contact-input contact-textarea ${fieldErrors.message ? 'input-error' : ''}`}
                      placeholder="How Can We Help?"
                      value={formData.message}
                      onChange={handleChange}
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={errorId('message')}
                      required
                    />
                    {fieldErrors.message && (
                      <span id="contact-message-error" className="contact-error" role="alert">
                        {fieldErrors.message}
                      </span>
                    )}
                  </div>

                  {/* Honeypot — hidden from humans, catches naive bots */}
                  <div className="contact-honeypot" aria-hidden="true">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      type="text"
                      id="contact-website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact-actions">
                  <button
                    type="submit"
                    className="btn-primary contact-submit-btn"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="spinner" size={16} /> SENDING...
                      </>
                    ) : (
                      'SEND INQUIRY'
                    )}
                  </button>
                  <span className="contact-direct-note">
                    Or email{' '}
                    <a href={`mailto:${CONTACT_RECIPIENT}`} className="contact-direct-link">
                      {CONTACT_RECIPIENT}
                    </a>
                  </span>
                </div>
              </div>

              {/* Status messaging */}
              {status === 'success' && (
                <div className="form-alert success-alert contact-alert" role="status">
                  <CheckCircle size={18} /> {statusMessage}
                </div>
              )}
              {status === 'error' && (
                <div className="form-alert error-alert contact-alert" role="alert">
                  <AlertCircle size={18} /> {statusMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
