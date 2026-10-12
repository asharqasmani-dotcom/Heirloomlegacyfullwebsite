import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AboutPage } from '../pages/AboutPage';

describe('About page', () => {
  it('provides an accessible page title and working navigation back to homepage sections', () => {
    render(<AboutPage />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About Our Legacy');
    const nav = within(screen.getByRole('navigation', { name: 'Main Navigation' }));
    expect(nav.getByRole('link', { name: 'About Us' })).toHaveAttribute('aria-current', 'page');
    expect(nav.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(nav.getByRole('link', { name: 'Community Initiatives' })).toHaveAttribute('href', '/our-services/');
    expect(screen.getByRole('button', { name: /get in touch/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email address/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Get Involved' })).toHaveAttribute('href', '/#contact');
  expect(screen.queryByRole('link', { name: /explore our mission/i })).not.toBeInTheDocument();
  });
  it('uses nonprofit content without fabricated template staff, ratings or client claims', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { name: 'Our Mission' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Our Vision' })).toBeInTheDocument();
    expect(screen.queryByText(/Sophia Bennett|56\+ Clients|900\+|Private Investor/)).not.toBeInTheDocument();
    expect(document.querySelectorAll('.about-pathway')).toHaveLength(4);
    expect(document.querySelector('.mobile-drawer')).toHaveAttribute('inert');
  });
});

it('resolves homepage contact anchors after mounting from another page', async () => {
  const { vi } = await import('vitest');
  const { App } = await import('../App');
  const scroll = vi.fn();
  const original = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = scroll;
  window.history.replaceState(null, '', '/#contact');
  try {
    render(<App />);
    expect(scroll).toHaveBeenCalledWith({ behavior: 'instant' });
    expect(scroll.mock.instances[0]).toBe(document.getElementById('contact'));
  } finally {
    Element.prototype.scrollIntoView = original;
    window.history.replaceState(null, '', '/');
  }
});
