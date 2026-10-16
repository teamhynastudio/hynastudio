import React from 'react';
import './Footer.css';

const Footer = () => {
  const scrollToSection = (e, id) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="crm-page-footer" aria-label="Site footer">
      <div className="crm-page-footer__inner">

        {/* Brand column */}
        <div className="crm-pf-brand">
          <a href="/" className="crm-pf-brand-logo" aria-label="HYNA Biz home">
            <img src="/hynabiz-logo.png" alt="HYNA Biz" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            HYNA <span>BIZ</span>
          </a>
          <p className="crm-pf-brand-tagline">
            HYNA Biz — your whole sales pipeline, leads, deals and growth in one connected place.
          </p>
          <a href="#pricing" className="crm-pf-brand-cta" onClick={(e) => scrollToSection(e, 'pricing')}>
            start your free trial →
          </a>
        </div>

        {/* Product column */}
        <nav className="crm-pf-col" aria-label="Product">
          <h4>product</h4>
          <ul>
            <li><a href="#intro" onClick={(e) => scrollToSection(e, 'intro')}>crm overview</a></li>
            <li><a href="#features" onClick={(e) => scrollToSection(e, 'features')}>features</a></li>
            <li><a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')}>pricing</a></li>
            <li><a href="#networks" onClick={(e) => scrollToSection(e, 'networks')}>integrations</a></li>
            <li><a href="#">changelog</a></li>
          </ul>
        </nav>

        {/* Services column */}
        <nav className="crm-pf-col" aria-label="Services">
          <h4>services</h4>
          <ul>
            <li><a href="#">lead tracking</a></li>
            <li><a href="#">deal pipeline</a></li>
            <li><a href="#">automation</a></li>
            <li><a href="#">reporting</a></li>
            <li><a href="#">whatsapp &amp; email</a></li>
            <li><a href="#">team roles</a></li>
          </ul>
        </nav>

        {/* Contact column */}
        <nav className="crm-pf-col" aria-label="Contact">
          <h4>contact</h4>
          <ul>
            <li><a href="mailto:hello@hynabiz.com">hello@hynabiz.com</a></li>
            <li><a href="https://x.com/HynaStudio" target="_blank" rel="noopener noreferrer">x / twitter</a></li>
            <li><a href="https://www.linkedin.com/in/hyna-studio-089b33416/" target="_blank" rel="noopener noreferrer">linkedin</a></li>
            <li><a href="#">about hyna studio</a></li>
            <li><a href="#">careers</a></li>
          </ul>
        </nav>

      </div>

      {/* Bottom bar */}
      <div className="crm-page-footer__bottom">
        <p className="crm-pf-copy">© 2026 HYNA Studio. All rights reserved.</p>
        <div className="crm-pf-links">
          <a href="#">privacy policy</a>
          <a href="#">terms of service</a>
          <a href="#">cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
