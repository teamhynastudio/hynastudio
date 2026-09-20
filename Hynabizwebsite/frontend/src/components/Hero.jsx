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
      
      // Planet comes from top to center
      tl.fromTo('.hero-planet', 
        { y: '-100vh', x: '-50%' }, 
        { y: '0%', x: '-50%', duration: 1.5, ease: 'power2.out' }
      )
      // Text starts as shadow/blurred, then brightens
      .from('.hero-headline span', { 
        opacity: 0, 
        y: 30, 
        filter: 'blur(20px)',
        color: 'rgba(255,255,255,0)',
        textShadow: '0 10px 20px rgba(0,0,0,0.8)',
        duration: 1.2, 
        stagger: 0.15 
      }, '-=0.5')
      .from('.hero-eyebrow', { opacity: 0, y: 15, duration: 0.6 }, '-=0.8')
      .from('.hero-supporting', { opacity: 0, y: 15, duration: 0.6 }, '-=0.6')
      .from('.hero-actions', { opacity: 0, y: 15, duration: 0.6 }, '-=0.4')
      .from('.product-preview-container', { opacity: 0, scale: 0.95, y: 40, duration: 1 }, '-=0.3');
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
          <span>The Future of</span><br/>
          <span>Business Starts</span><br/>
          <span>Here</span>
        </h1>
        
        <p className="hero-supporting text-muted">
          Say goodbye to manual workflows and inefficient processes. SaasCN streamlines your business operations, making work intuitive, efficient, and tailored to your needs.
        </p>
        
        <div className="hero-actions">
          <button className="btn btn-primary">
            Get Started <ArrowRight size={16} style={{ marginLeft: '8px' }} />
          </button>
          <button className="btn btn-secondary">
            <Play size={16} style={{ marginRight: '8px' }} /> Explore HynaBiz
          </button>
        </div>
      </div>
      
      <div className="product-preview-container">
        <ProductPreview />
      </div>
    </section>
  );
};

export default Hero;
