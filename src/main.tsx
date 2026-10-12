import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProcessPage } from './pages/ProcessPage';
import { ContactPage } from './pages/ContactPage';
import './styles/globals.css';
import './styles/motion.css';

const path = window.location.pathname.replace(/\/$/, '');
const Page =
  path === '/about-us'
    ? AboutPage
    : path === '/our-services'
    ? ServicesPage
    : path === '/partnerships-support'
    ? ProcessPage
    : path === '/contact-us'
    ? ContactPage
    : App;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);
