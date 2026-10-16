import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import InternalPageCurve from '../components/InternalPageCurve';
import CRM from './CRM';

const CrmPage = () => {
  // Animation Refs (Identical to Sales.jsx)
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const actionsRef = useRef(null);

  useEffect(() => {
    const navbarEl = document.querySelector('.navbar');
    if (navbarEl) {
      gsap.set(navbarEl, { opacity: 0, y: -20 });
    }

    const ctx = gsap.context(() => {
      // Delay 1.4s waits for the InternalPageCurve to finish its 1.4s drop
      const tl = gsap.timeline({ delay: 1.4, defaults: { ease: 'power3.out' } });

      if (navbarEl) {
        tl.to(navbarEl, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(navbarEl, { clearProps: 'y,transform' });
          }
        });
      }

      tl.fromTo(headlineRef.current,
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
        navbarEl ? "+=0.05" : 0
      )
        .fromTo(subheadlineRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(actionsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        );
    });

    return () => {
      ctx.revert();
      if (navbarEl) {
        gsap.set(navbarEl, { clearProps: 'all' });
      }
    };
  }, []);

  const scrollToSalesPipeline = () => {
    const el = document.getElementById('sales-pipeline-showcase') || document.getElementById('intro');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black text-gray-300 min-h-screen font-sans selection:bg-cyan-500/30">

      {/* 1. Centered Hero Section (100% Identical to Sales.jsx) */}
      <style>{`
        /* Uiverse.io Get Started Button by Javierrocadev - Compact & Proportional (Exact from Sales.jsx) */
        .uiverse-btn {
          position: relative;
          background-color: #262626;
          height: 48px;
          width: 170px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 12px;
          padding: 0 16px;
          color: #f9fafb;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.01em;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          overflow: hidden;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: all 0.4s ease;
          box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.5);
        }

        .uiverse-btn-text {
          position: relative;
          z-index: 20;
          transition: color 0.4s ease;
        }

        .uiverse-btn-icon {
          position: relative;
          z-index: 20;
          transition: transform 0.4s ease, color 0.4s ease;
        }

        /* Violet Glowing Orb (Before) */
        .uiverse-btn::before {
          content: '';
          position: absolute;
          width: 28px;
          height: 28px;
          right: 2px;
          top: 2px;
          z-index: 10;
          background-color: #8b5cf6;
          border-radius: 50%;
          filter: blur(10px);
          transition: all 0.4s ease;
          pointer-events: none;
        }

        /* Pink/Rose Glowing Orb (After) */
        .uiverse-btn::after {
          content: '';
          position: absolute;
          width: 44px;
          height: 44px;
          right: 14px;
          top: 6px;
          z-index: 10;
          background-color: #fda4af;
          border-radius: 50%;
          filter: blur(12px);
          transition: all 0.4s ease;
          pointer-events: none;
        }

        /* Hover States */
        .uiverse-btn:hover {
          border-color: #fda4af;
          color: #fda4af;
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-thickness: 2px;
          box-shadow: 0 8px 25px -4px rgba(162, 28, 175, 0.45);
        }

        .uiverse-btn:hover .uiverse-btn-icon {
          transform: translateX(3px);
          color: #fda4af;
        }

        .uiverse-btn:hover::before {
          right: 22px;
          top: auto;
          bottom: -16px;
          box-shadow: 12px 12px 16px 18px #a21caf;
          filter: blur(14px);
        }

        .uiverse-btn:hover::after {
          right: -16px;
        }
      `}</style>

      {/* Hero Header Section */}
      <section className="relative pt-[calc(var(--navbar-height,80px)+40px)] pb-24 md:pb-32 px-6 overflow-hidden flex flex-col justify-start items-center text-center">
        <InternalPageCurve />
        <div className="max-w-[1100px] w-full mx-auto flex flex-col items-center relative z-10 font-sans">
          <h1 ref={headlineRef} className="text-[clamp(32px,4.3vw,54px)] leading-[1.15] font-[800] tracking-[-0.025em] text-white mb-[20px] whitespace-normal lg:whitespace-nowrap">
            Empower Your B2B Customer Relationships <br className="hidden md:block" /> &amp; CRM Pipelines
          </h1>
          <p ref={subheadlineRef} className="text-[19px] font-normal max-w-[640px] leading-[1.6] text-[#94a3b8] tracking-[-0.01em] mx-auto mt-0 mb-0">
            Centralize customer interactions, automate lead tracking, manage deals, and accelerate sales growth in one connected platform.
          </p>
          <div ref={actionsRef} className="flex justify-center w-full mt-[28px]">
            <button
              id="crm-get-started-btn"
              className="uiverse-btn"
              onClick={scrollToSalesPipeline}
            >
              <span className="uiverse-btn-text">Get Started</span>
              <ArrowRight size={18} className="uiverse-btn-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* Subtle Divider between Hero and Sales Pipeline Showcase */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent my-0" />

      {/* Seamless Transition to Sales Pipeline Showcase, Testimonials, Pricing, and Footer */}
      <div id="sales-pipeline-showcase">
        <CRM />
      </div>

    </div>
  );
};

export default CrmPage;
