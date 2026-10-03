import React, { useState, useRef, useEffect } from 'react';
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
  Plus
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


  const benefits = [
    { icon: <Zap className="text-cyan-400" size={24} />, tag: "SPEED", title: "AI Match Scoring", desc: "Instantly identify the best-fit vendors and buyers with intelligent percentage scoring." },
    { icon: <FileText className="text-emerald-400" size={24} />, tag: "SCALE", title: "Instant Quotations", desc: "Generate professional, data-backed proposals in minutes, not hours." },
    { icon: <Shield className="text-indigo-400" size={24} />, tag: "SECURE", title: "High Security", desc: "Enterprise-grade encryption and secure deal rooms for peace of mind." },
    { icon: <Settings className="text-purple-400" size={24} />, tag: "ADAPT", title: "Flexible Workflows", desc: "Automate your approval pipelines and tailor routing to your team's needs." },
    { icon: <TrendingUp className="text-pink-400" size={24} />, tag: "PROFIT", title: "Real-time Margins", desc: "Dynamic pricing models give you live margin insights before you send a quote." },
    { icon: <Link className="text-amber-400" size={24} />, tag: "CONNECT", title: "Seamless Integrations", desc: "Connect effortlessly with your existing CRM, ERP, and payment systems." }
  ];

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

      {/* 2. Trust / Social Proof Banner */}
      <section className="border-y border-gray-800/50 bg-gray-900/20 py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 opacity-60">
          <p className="text-sm font-semibold text-gray-400 tracking-wider uppercase whitespace-nowrap">Trusted by growing B2B enterprises</p>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-8 md:gap-12">
            <span className="text-2xl font-bold font-serif tracking-tight text-white">AcmeCorp</span>
            <span className="text-2xl font-bold tracking-tighter flex items-center gap-1 text-white"><Zap size={24} /> STARK</span>
            <span className="text-2xl font-black italic tracking-widest text-white">GLOBALTECH</span>
            <span className="text-2xl font-bold text-white">WayneEnt</span>
            <span className="text-2xl font-medium tracking-wide text-white">OSCORP</span>
          </div>
        </div>
      </section>

      {/* 3. Feature Showcase (Split Layout) */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The right tools for expert B2B commerce</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Everything you need to source partners, quote accurately, and close deals faster.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Feature Tabs */}
            <div className="lg:col-span-5 space-y-3">
              <button
                onClick={() => setActiveTab('connect')}
                className={`w-full text-left p-6 rounded-2xl transition-all ${activeTab === 'connect' ? 'bg-slate-800/80 border border-slate-700 shadow-xl' : 'hover:bg-slate-800/30 border border-transparent'}`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className={`p-2 rounded-lg ${activeTab === 'connect' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Users size={20} />
                  </div>
                  <h3 className={`text-xl font-semibold ${activeTab === 'connect' ? 'text-white' : 'text-slate-300'}`}>B2B Connection Hub</h3>
                </div>
                <p className="text-slate-400 ml-14">Discover and verify trusted vendors and buyers with AI-driven match scoring.</p>
              </button>

              <button
                onClick={() => setActiveTab('quote')}
                className={`w-full text-left p-6 rounded-2xl transition-all ${activeTab === 'quote' ? 'bg-slate-800/80 border border-slate-700 shadow-xl' : 'hover:bg-slate-800/30 border border-transparent'}`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className={`p-2 rounded-lg ${activeTab === 'quote' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                    <FileText size={20} />
                  </div>
                  <h3 className={`text-xl font-semibold ${activeTab === 'quote' ? 'text-white' : 'text-slate-300'}`}>Smart Quote Builder</h3>
                </div>
                <p className="text-slate-400 ml-14">Construct detailed proposals with dynamic pricing, discounts, and real-time margin tracking.</p>
              </button>

              <button
                onClick={() => setActiveTab('secure')}
                className={`w-full text-left p-6 rounded-2xl transition-all ${activeTab === 'secure' ? 'bg-slate-800/80 border border-slate-700 shadow-xl' : 'hover:bg-slate-800/30 border border-transparent'}`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className={`p-2 rounded-lg ${activeTab === 'secure' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Lock size={20} />
                  </div>
                  <h3 className={`text-xl font-semibold ${activeTab === 'secure' ? 'text-white' : 'text-slate-300'}`}>Secure Deal Rooms</h3>
                </div>
                <p className="text-slate-400 ml-14">Negotiate and collaborate in dedicated, encrypted environments for every deal.</p>
              </button>

              <button
                onClick={() => setActiveTab('invoice')}
                className={`w-full text-left p-6 rounded-2xl transition-all ${activeTab === 'invoice' ? 'bg-slate-800/80 border border-slate-700 shadow-xl' : 'hover:bg-slate-800/30 border border-transparent'}`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className={`p-2 rounded-lg ${activeTab === 'invoice' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Layers size={20} />
                  </div>
                  <h3 className={`text-xl font-semibold ${activeTab === 'invoice' ? 'text-white' : 'text-slate-300'}`}>Automated Invoicing</h3>
                </div>
                <p className="text-slate-400 ml-14">Convert winning quotes directly into professional invoices with zero manual data entry.</p>
              </button>
            </div>

            {/* Right Column: Visual Mockup */}
            <div className="lg:col-span-7 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 blur-3xl rounded-full" />
              <div className="relative bg-[#111827] border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8">
                {/* Mockup Header */}
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-900/50 rounded-lg flex items-center justify-center text-cyan-400">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Smart Quote Builder</h4>
                      <p className="text-xs text-slate-400">Editing #RFP-2026-8992</p>
                    </div>
                  </div>
                  <button className="bg-cyan-600/20 text-cyan-400 px-4 py-2 rounded-lg text-sm font-medium border border-cyan-500/20">
                    Preview
                  </button>
                </div>

                {/* Mockup Body */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900 rounded-xl p-4 border border-slate-800/50">
                      <p className="text-xs text-slate-500 mb-1">Client Name</p>
                      <p className="font-medium text-slate-200">Global Tech Industries</p>
                    </div>
                    <div className="bg-slate-900 rounded-xl p-4 border border-slate-800/50">
                      <p className="text-xs text-slate-500 mb-1">Estimated Margin</p>
                      <p className="font-bold text-emerald-400 text-lg">42.5%</p>
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-xl border border-slate-800/50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-800/50 flex justify-between items-center bg-slate-800/20">
                      <h5 className="text-sm font-medium text-slate-300">Line Items</h5>
                      <span className="text-xs text-slate-500 flex items-center gap-1 cursor-pointer hover:text-cyan-400"><Plus size={14} /> Add</span>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-slate-800/50">
                        <div>
                          <p className="text-sm font-medium text-slate-200">Enterprise License</p>
                          <p className="text-xs text-slate-500 mt-1">Qty: 50 × $120.00 (10% Off)</p>
                        </div>
                        <p className="text-sm font-bold text-white">$5,400.00</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-slate-200">Implementation Services</p>
                          <p className="text-xs text-slate-500 mt-1">Qty: 1 × $5,000.00</p>
                        </div>
                        <p className="text-sm font-bold text-white">$5,000.00</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <p className="text-slate-400 text-sm">Total Value</p>
                    <p className="text-2xl font-bold text-white">$10,400.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Benefits Grid */}
      <section className="py-20 px-6 border-y border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why choose HynaBiz for your business?</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Designed from the ground up for the complexities of modern B2B transactions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl hover:-translate-y-1 transition-all duration-300 group flex flex-col items-start shadow-xl">
                <span className="inline-block px-3 py-1 mb-4 bg-cyan-50 text-cyan-600 font-bold text-xs uppercase tracking-wider rounded-full">
                  {benefit.tag}
                </span>
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden flex flex-col items-center">
        {/* Dynamic Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-black to-blue-900/20" />

        <div className="max-w-4xl mx-auto text-center relative z-10 pt-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Experience how HynaBiz can set your sales team up for success today.
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of modern B2B enterprises that are already closing deals faster and smarter.
          </p>
          <button className="px-10 py-5 bg-white text-gray-900 hover:bg-gray-200 rounded-xl font-bold text-lg transition-all shadow-xl shadow-white/10 flex items-center justify-center gap-2 mx-auto">
            Start your free trial <ChevronRight size={20} />
          </button>
          <p className="mt-6 text-sm text-gray-500">No credit card required. 14-day free trial.</p>
        </div>
      </section>
    </div>
  );
};

export default Sales;

