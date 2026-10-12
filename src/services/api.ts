import { ContactFormData, FormSubmissionResult, InquiryType } from '../types';

// Client-side rate limiting for basic abuse protection
const submissionTimestamps: number[] = [];
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute

function checkRateLimit(): boolean {
  const now = Date.now();
  while (submissionTimestamps.length > 0 && submissionTimestamps[0] < now - RATE_LIMIT_WINDOW_MS) {
    submissionTimestamps.shift();
  }
  if (submissionTimestamps.length >= RATE_LIMIT_MAX) {
    return false;
  }
  submissionTimestamps.push(now);
  return true;
}

export const HOMEPAGE_INQUIRY_TYPES: InquiryType[] = [
  'Independent Living Inquiry',
  'Residential Information',
  'General Questions',
  'Other Inquiry',
];

/** Accepted by the shared validator. Homepage shows HOMEPAGE_INQUIRY_TYPES only. */
export const INQUIRY_TYPES: InquiryType[] = [
  'General Inquiry',
  'Community Partnership',
  'Resource Support',
  'Get Involved',
  ...HOMEPAGE_INQUIRY_TYPES,
];

export const CONTACT_RECIPIENT = 'info@heirloomlegacy.org';

export const NOT_CONFIGURED_MESSAGE =
  'The contact form is not yet connected to a submission service. Please email info@heirloomlegacy.org directly while this is being configured.';

export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}

export function validateContact(data: ContactFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full name is required (minimum 2 characters).';
  }
  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Please provide a valid email address.';
  }
  if (!data.inquiryType || !INQUIRY_TYPES.includes(data.inquiryType)) {
    errors.inquiryType = 'Please select an inquiry type.';
  }
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Please include a brief message (minimum 10 characters).';
  } else if (data.message.trim().length > 2000) {
    errors.message = 'Message must be 2,000 characters or fewer.';
  }

  return errors;
}

/**
 * Returns the configured secure submission endpoint (e.g. Formspree, a serverless
 * function, or a form-relay webhook that delivers to info@heirloomlegacy.org).
 * No API keys or mail credentials live in the frontend — the endpoint itself must
 * handle authentication and delivery server-side.
 */
export function getContactEndpoint(): string | undefined {
  const endpoint = import.meta.env?.VITE_CONTACT_ENDPOINT as string | undefined;
  return endpoint && endpoint.trim().length > 0 ? endpoint.trim() : undefined;
}

export async function submitContact(data: ContactFormData): Promise<FormSubmissionResult> {
  // Honeypot: bots that fill the hidden field are rejected without feedback detail.
  if (data.website && data.website.trim().length > 0) {
    return { success: false, message: 'Submission could not be processed.' };
  }

  if (!checkRateLimit()) {
    return {
      success: false,
      message: 'Too many requests. Please wait a minute before trying again.',
    };
  }

  const errors = validateContact(data);
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Please resolve the highlighted errors.',
      fieldErrors: errors,
    };
  }

  const endpoint = getContactEndpoint();

  // Never report a false success: without a configured service the form is inert.
  if (!endpoint) {
    return { success: false, message: NOT_CONFIGURED_MESSAGE };
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        type: 'contact-inquiry',
        to: CONTACT_RECIPIENT,
        fullName: data.fullName.trim(),
        email: data.email.trim(),
        inquiryType: data.inquiryType,
        message: data.message.trim(),
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    return {
      success: true,
      message: 'Thank you. Your inquiry has been received and our team will respond shortly.',
    };
  } catch (err: unknown) {
    const errMessage = err instanceof Error ? err.message : 'Unknown error';
    return {
      success: false,
      message: `Submission failed: ${errMessage}. Please try again or email ${CONTACT_RECIPIENT}.`,
    };
  }
}
