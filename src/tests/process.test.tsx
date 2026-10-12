import { render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { ProcessPage } from '../pages/ProcessPage';

it('renders Partnerships & Support with four values, four steps, and an organizational statement', () => {
  render(<ProcessPage />);
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Partnerships & Support');
  expect(screen.queryByText(/Daniel Wright|Arvon|56\+|luxury real estate/i)).not.toBeInTheDocument();

  expect(screen.getByRole('heading', { name: 'Stronger Communities Begin with Shared Purpose.' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Shared Purpose' })).toBeInTheDocument();

  expect(screen.getByRole('heading', { name: 'Together, We Can Make a Meaningful Difference.' })).toBeInTheDocument();
  expect(document.querySelectorAll('.process-step-card')).toHaveLength(4);

  expect(screen.getByRole('heading', { name: 'Building Meaningful Relationships That Last.' })).toBeInTheDocument();
  expect(screen.getByText('HEIRLOOM LEGACY, INC.')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /connect with us/i })).toHaveAttribute('href', '/contact-us/');

  const nav = within(screen.getByRole('navigation', { name: 'Main Navigation' }));
  expect(nav.getByRole('link', { name: 'Partnerships & Support' })).toHaveAttribute('aria-current', 'page');
  expect(nav.getByRole('link', { name: 'Partnerships & Support' })).toHaveAttribute('href', '/partnerships-support/');
  expect(nav.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  expect(nav.getByRole('link', { name: 'Contact Us' })).toHaveAttribute('href', '/contact-us/');
});
