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
      
      // 1. Planet (curve circle) comes from top to bottom
      tl.fromTo('.hero-planet', 
        { y: '-100vh', x: '-50%' }, 
        { y: '0%', x: '-50%', duration: 1.4, ease: 'power2.out' }
      )
      // 2. WHEN that curve circle comes from top to bottom, THEN ONLY navbar first shows
      .fromTo('.navbar', 
        { opacity: 0, y: -25 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.65, 
          ease: 'power2.out',
          onComplete: () => {
            gsap.set('.navbar', { clearProps: 'y' });
          }
        }
      )
      // 3. THEN all the rest want to show
      .fromTo('.hero-eyebrow', 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '+=0.05'
      )
      .fromTo('.hero-headline span', 
        { 
          opacity: 0, 
          y: 25, 
          filter: 'blur(16px)',
          color: 'rgba(255,255,255,0)',
          textShadow: '0 10px 20px rgba(0,0,0,0.8)'
        }, 
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          color: '#ffffff',
          textShadow: 'none',
          duration: 0.9, 
          ease: 'power2.out' 
        }, 
        '-=0.2'
      )
      .fromTo('.hero-supporting', 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 
        '-=0.4'
      )
      .fromTo('.hero-actions', 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 
        '-=0.3'
      )
      .fromTo('.hero-app-section', 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 
        '-=0.3'
      )
      .fromTo('.product-preview-container', 
        { opacity: 0, scale: 0.96, y: 30 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 
        '-=0.2'
      );
    }, containerRef);
    
    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section className="hero" ref={containerRef}>
      <div className="hero-planet"></div>
      
      <div className="container hero-content">
        <div className="hero-eyebrow">
          Business Management &middot; CRM &middot; Connections &middot; Trade &middot; AI Intelligence &middot; Automation
        </div>
        
        <h1 className="hero-headline">
          <span>Where Business Connects, Operates & Grows.</span>
        </h1>
        
        <p className="hero-supporting text-muted">
          HynaBiz unifies AI intelligence, operations, relationships, trade, and automation in one connected platform.
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
