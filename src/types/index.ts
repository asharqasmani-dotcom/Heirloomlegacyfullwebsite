export interface NavItem {
  label: string;
  href: string;
}

export interface Initiative {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Feature {
  number: string;
  title: string;
  description: string;
}

export interface Statement {
  id: string;
  author: string;
  role: string;
  quote: string;
  avatar: string;
  /** Neutral organizational identifier shown where a star rating used to be. */
  identifier: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  src: string;
  alt: string;
  /** Placeholder artwork that must be replaced with client-approved partner logos before publishing. */
  placeholder: boolean;
}

export interface Article {
  id: string;
  title: string;
  /** Badge shown on the card. Articles are proposed editorial titles, so no dates are fabricated. */
  badge: { primary: string; secondary: string };
  category: string;
  author: string;
  image: string;
  href: string;
  /** True until the article has been written and published. */
  pending: boolean;
}

export interface BrandValue {
  number: string;
  label: string;
  caption: string;
}

export type InquiryType =
  | 'General Inquiry'
  | 'Community Partnership'
  | 'Resource Support'
  | 'Get Involved'
  | 'Independent Living Inquiry'
  | 'Residential Information'
  | 'General Questions'
  | 'Other Inquiry';

export interface ContactFormData {
  fullName: string;
  email: string;
  inquiryType: InquiryType | '';
  message: string;
  /** Honeypot — must remain empty. Bots that fill it are silently rejected. */
  website?: string;
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
}
