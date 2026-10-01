import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './PageHero.css';

const PageHero = ({ title, subtitle, accentColor = '#00C2FF' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.fromTo('.page-hero-content', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section className="page-hero" ref={containerRef}>
      <div className="page-hero-bg" style={{ '--accent-color': accentColor }}></div>
      <div className="container page-hero-content">
        <h1 className="page-hero-title">{title}</h1>
        <p className="page-hero-subtitle text-muted">{subtitle}</p>
        <div className="page-hero-placeholder">
          <div className="placeholder-box">
            <span className="placeholder-text">Module Content Placeholder</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
