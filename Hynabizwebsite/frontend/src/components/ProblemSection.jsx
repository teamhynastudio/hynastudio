import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Users, FileText, ShoppingCart, Layers } from 'lucide-react';
import './ProblemSection.css';

gsap.registerPlugin(ScrollTrigger);

const ProblemSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        }
      });

      // Disconnected objects moving towards center
      tl.to('.floating-icon-1', { x: 100, y: 50, opacity: 0, scale: 0.5 }, 0)
        .to('.floating-icon-2', { x: -100, y: 50, opacity: 0, scale: 0.5 }, 0)
        .to('.floating-icon-3', { x: 100, y: -50, opacity: 0, scale: 0.5 }, 0)
        .to('.floating-icon-4', { x: -100, y: -50, opacity: 0, scale: 0.5 }, 0)
        
        // Hynabiz core appearing
        .from('.hynabiz-core', { scale: 0.8, opacity: 0, duration: 0.5 }, 0.3)
        .to('.hynabiz-core', { scale: 1.1, duration: 0.5 }, 0.5)
        .to('.hynabiz-core', { scale: 1, boxShadow: '0 0 30px rgba(0, 194, 255, 0.4)', duration: 0.2 }, 1);
        
      // Text reveals
      gsap.from('.problem-text > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="problem-section" ref={sectionRef}>
      <div className="container">
        
        <div className="problem-text">
          <h2 className="section-title">Your business shouldn't live across ten different tools.</h2>
          <p className="section-subtitle text-muted">
            Connections in one place. Conversations somewhere else. Quotes in another file. Customer history in another system.
          </p>
          <h3 className="solution-title text-blue">
            HynaBiz brings the journey together.
          </h3>
        </div>

        <div className="problem-visual">
          <div className="floating-icons">
            <div className="floating-icon floating-icon-1"><MessageSquare /></div>
            <div className="floating-icon floating-icon-2"><Users /></div>
            <div className="floating-icon floating-icon-3"><FileText /></div>
            <div className="floating-icon floating-icon-4"><ShoppingCart /></div>
          </div>
          
          <div className="hynabiz-core">
            <Layers size={48} className="text-blue" />
            <div className="core-text">HYNA<span className="text-blue">Biz</span> Workspace</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProblemSection;
