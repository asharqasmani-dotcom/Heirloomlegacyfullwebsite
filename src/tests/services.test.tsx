import { render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { ServicesPage } from '../pages/ServicesPage';

it('renders Community Initiatives with six proposed directions and a single page heading', () => {
  render(<ServicesPage />);
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Community Initiatives');
  expect(document.querySelectorAll('.service-card')).toHaveLength(6);
  expect(screen.getByRole('heading', { name: 'Stability & Opportunity' })).toBeInTheDocument();
  expect(screen.queryByText(/luxury|real estate|56\+|900\+/i)).not.toBeInTheDocument();
  const nav = within(screen.getByRole('navigation', { name: 'Main Navigation' }));
  expect(nav.getByRole('link', { name: 'Community Initiatives' })).toHaveAttribute('aria-current', 'page');
  expect(nav.getByRole('link', { name: 'Community Initiatives' })).toHaveAttribute('href', '/our-services/');
  expect(nav.getByRole('link', { name: 'About Us' })).not.toHaveAttribute('aria-current');
  expect(nav.getByRole('link', { name: 'About Us' })).toHaveAttribute('href', '/about-us/');
  expect(screen.getAllByRole('link', { name: /learn more about/i })).toHaveLength(6);
  for (const link of screen.getAllByRole('link', { name: /learn more about/i })) expect(link).toHaveAttribute('href', '/#contact');
  expect(screen.queryByRole('link', { name: /placeholder video|play/i })).not.toBeInTheDocument();
  expect(document.querySelector('.services-video-frame img')).toBeInTheDocument();
});
