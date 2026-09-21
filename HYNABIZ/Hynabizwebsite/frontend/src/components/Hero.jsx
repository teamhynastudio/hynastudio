import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import ProductPreview from './ProductPreview';
import './Hero.css';

const Hero = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      // Planet comes from top to center
      tl.fromTo('.hero-planet', 
        { y: '-100vh', x: '-50%' }, 
        { y: '0%', x: '-50%', duration: 1.5, ease: 'power2.out' }
      )
      // Text starts as shadow/blurred, then brightens
      .from('.hero-headline span', { 
        opacity: 0, 
        y: 25, 
        filter: 'blur(16px)',
        color: 'rgba(255,255,255,0)',
        textShadow: '0 10px 20px rgba(0,0,0,0.8)',
        duration: 1.2,
      }, '-=0.5')
      .from('.hero-eyebrow', { opacity: 0, y: 15, duration: 0.6 }, '-=0.8')
      .from('.hero-supporting', { opacity: 0, y: 15, duration: 0.6 }, '-=0.6')
      .from('.hero-actions', { opacity: 0, y: 15, duration: 0.6 }, '-=0.5')
      .from('.hero-app-section', { opacity: 0, y: 15, duration: 0.6 }, '-=0.4')
      .from('.product-preview-container', { opacity: 0, scale: 0.95, y: 30, duration: 1 }, '-=0.3');
    }, containerRef);
    
    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section className="hero" ref={containerRef}>
      <div className="hero-planet"></div>
      
      <div className="container hero-content">
        <div className="hero-eyebrow">
          Business Management &middot; CRM &middot; Connections &middot; Trade &middot; Automation
        </div>
        
        <h1 className="hero-headline">
          <span>Where Business Connects, Operates & Grows.</span>
        </h1>
        
        <p className="hero-supporting text-muted">
          HynaBiz unifies business intelligence, operations, relationships, trade, and automation in one connected platform.
        </p>

        <div className="hero-actions">
          <button className="uiverse-btn">
            <span className="uiverse-btn-text">Get Started</span>
            <ArrowRight size={18} className="uiverse-btn-icon" />
          </button>
        </div>

        <div className="hero-app-section">
          <span className="hero-app-label">AVAILABLE IN</span>
          <div className="hero-app-badges">
            <a href="#download" className="app-badge-link" aria-label="Get it on Google Play">
              <img src="/google-play-badge.svg" alt="Get it on Google Play" className="app-badge-img google-play-badge" />
            </a>
            <a href="#download" className="app-badge-link" aria-label="Download on the App Store">
              <img src="/app-store-badge.svg" alt="Download on the App Store" className="app-badge-img app-store-badge" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="product-preview-container">
        <ProductPreview />
      </div>
    </section>
  );
};

export default Hero;
