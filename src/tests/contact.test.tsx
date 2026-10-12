import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { ContactPage } from '../pages/ContactPage';

it('renders the Contact Us route with form, info card, map, and working navigation', () => {
  render(<ContactPage />);
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Get In Touch');
  expect(screen.getByRole('heading', { name: 'Connect With Heirloom Legacy' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Contact Info' })).toBeInTheDocument();
  expect(screen.queryByText(/arvon|new york|london|123-4567/i)).not.toBeInTheDocument();

  // Navigation
  const nav = within(screen.getByRole('navigation', { name: 'Main Navigation' }));
  expect(nav.getByRole('link', { name: 'Contact Us' })).toHaveAttribute('aria-current', 'page');
  expect(nav.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  expect(nav.getByRole('link', { name: 'Partnerships & Support' })).toHaveAttribute('href', '/partnerships-support/');

  // Form Fields
  expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /send inquiry/i })).toBeInTheDocument();

  // Contact Info
  expect(screen.getAllByText('info@heirloomlegacy.org').length).toBeGreaterThan(0);
  expect(screen.getByText('General Inquiries')).toBeInTheDocument();
  expect(screen.getByText(/Service Information/)).toBeInTheDocument();
  expect(screen.getByText(/service address is confirmed/i)).toBeInTheDocument();
  expect(document.querySelector('iframe')).not.toBeInTheDocument();
});

it('validates contact form submission', async () => {
  render(<ContactPage />);
  fireEvent.click(screen.getByRole('button', { name: /send inquiry/i }));
  await waitFor(() => {
    expect(screen.getAllByRole('alert').length).toBeGreaterThanOrEqual(1);
  });

  // Fill in valid details
  fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Alex Morgan' } });
  fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'alex@example.com' } });
  fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '+1 234 567 8900' } });
  fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Property Consultation' } });
  fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'I would like to schedule a private viewing.' } });

  fireEvent.click(screen.getByRole('button', { name: /send inquiry/i }));

  await waitFor(() => {
    expect(screen.getByRole('alert')).toHaveTextContent(/info@heirloomlegacy.org/i);
  });
  expect(screen.queryByText(/thank you! form submitted successfully/i)).not.toBeInTheDocument();
});
