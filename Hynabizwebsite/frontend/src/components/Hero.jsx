import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Play } from 'lucide-react';
import ProductPreview from './ProductPreview';
import './Hero.css';

const Hero = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.from('.hero-eyebrow', { opacity: 0, y: 15, duration: 0.6, delay: 0.2 })
        .from('.hero-headline span', { opacity: 0, y: 30, duration: 0.8, stagger: 0.15 }, '-=0.3')
        .from('.hero-supporting', { opacity: 0, y: 15, duration: 0.6 }, '-=0.4')
        .from('.hero-actions', { opacity: 0, y: 15, duration: 0.6 }, '-=0.4')
        .from('.hero-features', { opacity: 0, duration: 0.6 }, '-=0.2')
        .from('.product-preview-container', { opacity: 0, scale: 0.95, y: 40, duration: 1 }, '-=0.3');
    }, containerRef);
    
    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section className="hero" ref={containerRef}>
      <div className="container hero-content">
        <div className="hero-eyebrow">
          BUSINESS MANAGEMENT & CONNECTION PLATFORM
        </div>
        
        <h1 className="hero-headline">
          <span>Manage your business.</span><br/>
          <span>Build connections.</span><br/>
          <span className="text-blue">Trade better.</span>
        </h1>
        
        <p className="hero-supporting text-muted">
          HynaBiz brings your business operations, relationships and trade workflows together in one place.
        </p>
        
        <div className="hero-actions">
          <button className="btn btn-primary">
            Get Started <ArrowRight size={16} style={{ marginLeft: '8px' }} />
          </button>
          <button className="btn btn-secondary">
            <Play size={16} style={{ marginRight: '8px' }} /> Explore HynaBiz
          </button>
        </div>
        
        <div className="hero-features text-muted">
          Business Management &middot; CRM &middot; Connections &middot; Trade &middot; Automation
        </div>
      </div>
      
      <div className="product-preview-container">
        <ProductPreview />
      </div>
    </section>
  );
};

export default Hero;
