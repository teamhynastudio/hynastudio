import React, { useState, useRef, useEffect } from 'react';
import FeatureShowcase from '../components/FeatureShowcase';
import SalesEngineNode from '../components/SalesEngineNode';
import FeatureCardsReveal from '../components/FeatureCardsReveal';
import gsap from 'gsap';
import {
  ArrowRight,
  Zap,
  Shield,
  Settings,
  TrendingUp,
  Link,
  Users,
  FileText,
  Lock,
  Layers,
  ChevronRight,
  Plus,
  CheckCircle,
  Download,
  File
} from 'lucide-react';
import InternalPageCurve from '../components/InternalPageCurve';

const Sales = () => {
  const [activeTab, setActiveTab] = useState('quote');

  // Animation Refs
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
        navbarEl ? '+=0.05' : 0
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




  return (
    <div className="bg-black text-gray-300 min-h-screen font-sans selection:bg-cyan-500/30">

      {/* 1. Centered Hero Section */}
      <style>{`
        /* Uiverse.io Get Started Button by Javierrocadev - Compact & Proportional */
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

        /* Rose Glowing Orb (After) */
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



        /* Right Mockup Wrapper (Spacious74 Adapted) */
        .spacious-wrapper {
          background: linear-gradient(135deg, rgba(255,255,255,0.9), #3a4b8a, rgba(255,255,255,0.4));
          padding: 1px; /* Creates the crisp metallic border */
          border-radius: 1.25rem;
          box-shadow: 0px 1.5rem 2.5rem -0.5rem rgba(0,0,0,0.8);
          width: 100%;
          height: 100%;
        }

        .spacious-card {
          background: linear-gradient(135deg, #0B0F17 0%, #1e2a5e 43%, #0B0F17 100%);
          border-radius: 1.25rem;
          padding: 1.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
      `}</style>
      <section className="relative pt-[calc(var(--navbar-height,80px)+40px)] pb-64 px-6 overflow-hidden min-h-screen flex flex-col justify-start items-center text-center">
        <InternalPageCurve />
        <div className="max-w-[1100px] w-full mx-auto flex flex-col items-center relative z-10 font-sans">
          <h1 ref={headlineRef} className="text-[clamp(32px,4.3vw,54px)] leading-[1.15] font-[800] tracking-[-0.025em] text-white mb-[20px] whitespace-normal lg:whitespace-nowrap">
            Empower Your B2B <br className="hidden md:block" /> Sales & Smart Quotations
          </h1>
          <p ref={subheadlineRef} className="text-[19px] font-normal max-w-[640px] leading-[1.6] text-[#94a3b8] tracking-[-0.01em] mx-auto mt-0 mb-0">
            Connect seamlessly with vendors and buyers, generate accurate proposals instantly, and manage your entire B2B sales pipeline in one unified platform.
          </p>
          <div ref={actionsRef} className="flex justify-center w-full mt-[28px]">
            <button className="uiverse-btn">
              <span className="uiverse-btn-text">Get Started</span>
              <ArrowRight size={18} className="uiverse-btn-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Feature Showcase (Split Layout) */}
      <FeatureShowcase />

      {/* 3.5 Data Flow Infographic */}
      <SalesEngineNode />

      {/* 4. Benefits Grid */}
      <section className="py-20 px-6 border-y border-gray-800/50 font-sans">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why choose HynaBiz for your business?</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Designed from the ground up for the complexities of modern B2B transactions.</p>
          </div>

          <FeatureCardsReveal />
        </div>
      </section>

      {/* 5. Bottom CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden flex flex-col items-center font-sans">
        {/* Dynamic Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-black to-blue-900/20" />

        <div className="max-w-4xl mx-auto text-center relative z-10 pt-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Experience how HynaBiz can set your sales team up for success today.
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of modern B2B enterprises that are already closing deals faster and smarter.
          </p>
          <button className="px-10 py-5 bg-white text-gray-900 hover:bg-gray-200 rounded-xl font-bold font-sans text-lg transition-all shadow-xl shadow-white/10 flex items-center justify-center gap-2 mx-auto">
            Start your free trial <ChevronRight size={20} />
          </button>
          <p className="mt-6 text-sm text-gray-500">No credit card required. 14-day free trial.</p>
        </div>
      </section>
    </div>
  );
};

export default Sales;

