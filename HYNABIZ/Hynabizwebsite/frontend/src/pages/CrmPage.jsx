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
  Plus,
  Workflow,
  BarChart3,
  Bot,
  Clock,
  Smartphone,
  CheckCircle,
  Mail,
  Building2,
  UserCheck
} from 'lucide-react';
import InternalPageCurve from '../components/InternalPageCurve';

const CrmPage = () => {
  const [activeTab, setActiveTab] = useState('360view');

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
      // Delay 1.4s waits for the InternalPageCurve to finish its 1.4s drop (Identical to Sales.jsx)
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

  // 6 B2B CRM Feature Cards
  const crmFeatures = [
    {
      num: "1",
      icon: <Clock size={20} />,
      title: "Enjoy a 50% faster implementation than the competition.",
      desc: "Get up and running in days, not months, with pre-built B2B pipelines and seamless team onboarding."
    },
    {
      num: "2",
      icon: <Workflow size={20} />,
      title: "Adopt a flexible CRM that can adapt to evolving business needs.",
      desc: "Customize pipelines, deal stages, and approval workflows as your company expands."
    },
    {
      num: "3",
      icon: <Zap size={20} />,
      title: "Automate mundane tasks so you can focus on your customers.",
      desc: "Eliminate repetitive manual entry with automatic email logging and intelligent lead distribution."
    },
    {
      num: "4",
      icon: <Users size={20} />,
      title: "Build complete customer journeys and personalize every interaction.",
      desc: "Track every buyer touchpoint from initial lead inquiry through final renewal."
    },
    {
      num: "5",
      icon: <Bot size={20} />,
      title: "Use built-in AI to drive smarter engagement with customers.",
      desc: "Leverage predictive win probabilities and sentiment analysis to close key target accounts."
    },
    {
      num: "6",
      icon: <Smartphone size={20} />,
      title: "Sell on the go with a dedicated mobile app.",
      desc: "Access your entire deal pipeline and record meeting notes anytime, anywhere."
    }
  ];

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
            Empower Your B2B Customer Relationships <br className="hidden md:block" /> & CRM Pipelines
          </h1>
          <p ref={subheadlineRef} className="text-[19px] font-normal max-w-[640px] leading-[1.6] text-[#94a3b8] tracking-[-0.01em] mx-auto mt-0 mb-0">
            Centralize customer interactions, automate lead tracking, manage deals, and accelerate sales growth in one connected platform.
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
      <section className="border-y border-gray-800/50 bg-gray-900/20 py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <p className="text-sm font-semibold text-gray-400 tracking-wider uppercase whitespace-nowrap">
            Trusted by growing B2B enterprises
          </p>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-8 md:gap-12">
            <span className="text-2xl font-bold font-serif tracking-tight text-white opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              AcmeCorp
            </span>
            <span className="text-2xl font-bold tracking-tighter flex items-center gap-1.5 text-white opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <Zap size={22} className="text-cyan-400 fill-cyan-400/20" /> STARK
            </span>
            <span className="text-2xl font-black italic tracking-widest text-white opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              GLOBALTECH
            </span>
            <span className="text-2xl font-bold text-white opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              WayneEnt
            </span>
            <span className="text-2xl font-medium tracking-wide text-white opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              OSCORP
            </span>
          </div>
        </div>
      </section>

      {/* 3. B2B CRM Feature Sections - 6 Feature Cards Grid */}
      <section className="py-20 px-6 border-y border-gray-800/50 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Enterprise CRM built for modern sales teams</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Everything you need to automate workflows, manage relationships, and scale revenue.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crmFeatures.map((feature, idx) => (
              <div key={idx} className="bg-[#0c0d14] border border-white/10 hover:border-cyan-500/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group flex flex-col items-start shadow-xl">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-extrabold flex items-center justify-center text-base mb-5 shadow-md shadow-amber-400/20 group-hover:scale-110 transition-transform">
                  {feature.num}
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5 leading-snug">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Section ("The right tools for an expert sales team") */}
      <section className="py-24 px-6 relative bg-black overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">The right tools for an expert sales team</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Centralize customer interactions, automate lead tracking, and manage deal pipelines effortlessly.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Feature Tabs */}
            <div className="lg:col-span-5 space-y-3.5">
              {/* Tab 1: 360-degree view */}
              <button
                onClick={() => setActiveTab('360view')}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-300 ${
                  activeTab === '360view'
                    ? 'bg-white/10 border-l-4 border-cyan-400 text-white shadow-xl shadow-cyan-950/20'
                    : 'bg-white/[0.02] border-l-4 border-transparent text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3.5 mb-2">
                  <div className={`p-2 rounded-lg transition-colors ${activeTab === '360view' ? 'bg-cyan-400/20 text-cyan-400' : 'bg-white/5 text-slate-400'}`}>
                    <Users size={18} />
                  </div>
                  <h3 className={`text-lg font-semibold ${activeTab === '360view' ? 'text-white' : 'text-slate-300'}`}>360-degree view</h3>
                </div>
                <p className="text-slate-400 text-sm pl-11 leading-relaxed">Get a complete picture of every account, active deals, contacts, and email history.</p>
              </button>

              {/* Tab 2: Marketing automation */}
              <button
                onClick={() => setActiveTab('marketing')}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-300 ${
                  activeTab === 'marketing'
                    ? 'bg-white/10 border-l-4 border-cyan-400 text-white shadow-xl shadow-cyan-950/20'
                    : 'bg-white/[0.02] border-l-4 border-transparent text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3.5 mb-2">
                  <div className={`p-2 rounded-lg transition-colors ${activeTab === 'marketing' ? 'bg-cyan-400/20 text-cyan-400' : 'bg-white/5 text-slate-400'}`}>
                    <Workflow size={18} />
                  </div>
                  <h3 className={`text-lg font-semibold ${activeTab === 'marketing' ? 'text-white' : 'text-slate-300'}`}>Marketing automation →</h3>
                </div>
                <p className="text-slate-400 text-sm pl-11 leading-relaxed">Trigger automated sequences to engage prospects at every stage of the funnel.</p>
              </button>

              {/* Tab 3: Sales intelligence */}
              <button
                onClick={() => setActiveTab('intelligence')}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-300 ${
                  activeTab === 'intelligence'
                    ? 'bg-white/10 border-l-4 border-cyan-400 text-white shadow-xl shadow-cyan-950/20'
                    : 'bg-white/[0.02] border-l-4 border-transparent text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3.5 mb-2">
                  <div className={`p-2 rounded-lg transition-colors ${activeTab === 'intelligence' ? 'bg-cyan-400/20 text-cyan-400' : 'bg-white/5 text-slate-400'}`}>
                    <BarChart3 size={18} />
                  </div>
                  <h3 className={`text-lg font-semibold ${activeTab === 'intelligence' ? 'text-white' : 'text-slate-300'}`}>Sales intelligence →</h3>
                </div>
                <p className="text-slate-400 text-sm pl-11 leading-relaxed">Predict win probabilities and track intent signals with AI-driven analytics.</p>
              </button>

              {/* Tab 4: Customized quotes and invoices */}
              <button
                onClick={() => setActiveTab('quotes')}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-300 ${
                  activeTab === 'quotes'
                    ? 'bg-white/10 border-l-4 border-cyan-400 text-white shadow-xl shadow-cyan-950/20'
                    : 'bg-white/[0.02] border-l-4 border-transparent text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3.5 mb-2">
                  <div className={`p-2 rounded-lg transition-colors ${activeTab === 'quotes' ? 'bg-cyan-400/20 text-cyan-400' : 'bg-white/5 text-slate-400'}`}>
                    <FileText size={18} />
                  </div>
                  <h3 className={`text-lg font-semibold ${activeTab === 'quotes' ? 'text-white' : 'text-slate-300'}`}>Customized quotes and invoices →</h3>
                </div>
                <p className="text-slate-400 text-sm pl-11 leading-relaxed">Generate accurate proposals and transition won deals directly into invoices.</p>
              </button>
            </div>

            {/* Right Column: Visual Profile Card for "Blue Rivers Pvt Ltd" */}
            <div className="lg:col-span-7 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-blue-500/5 to-purple-500/10 blur-3xl rounded-3xl" />
              <div className="relative bg-[#0d111d] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md">
                
                {/* Mockup Header: Blue Rivers Pvt Ltd */}
                <div className="flex justify-between items-center mb-6 pb-5 border-b border-white/10">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 bg-cyan-950/80 border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-400 font-bold text-sm shadow-inner">
                      BR
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-base">Blue Rivers Pvt Ltd</h4>
                      <p className="text-xs text-slate-400">Account Profile • Enterprise SaaS</p>
                    </div>
                  </div>
                  <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase shadow-sm">
                    Active Client
                  </span>
                </div>

                {/* Account Owner & Employees Summary */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#080b13] rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-slate-400 mb-1">Account Owner</p>
                    <p className="font-medium text-slate-200 text-sm">Sarah Jenkins</p>
                  </div>
                  <div className="bg-[#080b13] rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-slate-400 mb-1">Employees</p>
                    <p className="font-bold text-cyan-400 text-base">250 - 500</p>
                  </div>
                </div>

                {/* Tab Content Preview */}
                {activeTab === '360view' && (
                  <div className="space-y-4">
                    {/* DEALS Badges */}
                    <div className="bg-[#080b13] rounded-xl border border-white/5 p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Deals</span>
                        <span className="text-xs text-emerald-400 font-semibold">$165,000 Pipeline</span>
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        <span className="bg-amber-400/10 text-amber-300 border border-amber-400/30 px-3.5 py-2 rounded-xl text-xs font-medium backdrop-blur-sm">
                          $120,000 - Enterprise Contract (In Negotiation)
                        </span>
                        <span className="bg-emerald-400/10 text-emerald-300 border border-emerald-400/30 px-3.5 py-2 rounded-xl text-xs font-medium backdrop-blur-sm flex items-center gap-1.5">
                          <CheckCircle size={13} className="text-emerald-400" /> $45,000 - Q3 Renewal (Closed Won)
                        </span>
                      </div>
                    </div>

                    {/* CONTACTS */}
                    <div className="bg-[#080b13] rounded-xl border border-white/5 p-4">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">Key Contacts</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-slate-200">Alex Vance</p>
                          <p className="text-xs text-slate-400">CTO (Primary Decision Maker)</p>
                        </div>
                        <p className="text-xs text-cyan-400 font-medium hover:underline cursor-pointer">alex@bluerivers.com</p>
                      </div>
                    </div>

                    {/* EMAILS */}
                    <div className="bg-[#080b13] rounded-xl border border-white/5 p-4 flex justify-between items-center">
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Latest Email</p>
                        <p className="text-sm font-medium text-slate-200">Re: Proposal Review & Next Steps</p>
                      </div>
                      <span className="text-xs text-slate-400">2h ago</span>
                    </div>
                  </div>
                )}

                {activeTab === 'marketing' && (
                  <div className="space-y-4">
                    <div className="bg-[#080b13] rounded-xl p-4 border border-white/5 flex justify-between items-center">
                      <div>
                        <p className="text-xs text-slate-400">Active Sequence</p>
                        <p className="font-medium text-slate-200">Enterprise Buyer Nurture</p>
                      </div>
                      <span className="text-emerald-400 font-bold text-sm bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">78.4% Open Rate</span>
                    </div>
                  </div>
                )}

                {activeTab === 'intelligence' && (
                  <div className="space-y-4">
                    <div className="bg-[#080b13] rounded-xl p-4 border border-white/5 flex justify-between items-center">
                      <div>
                        <p className="text-xs text-slate-400">AI Win Probability</p>
                        <p className="font-bold text-emerald-400 text-lg">92% High Probability</p>
                      </div>
                      <span className="text-xs text-slate-400 bg-white/5 px-3 py-1 rounded-lg">Intent Score: 9.4/10</span>
                    </div>
                  </div>
                )}

                {activeTab === 'quotes' && (
                  <div className="space-y-4">
                    <div className="bg-[#080b13] rounded-xl p-4 border border-white/5 flex justify-between items-center">
                      <div>
                        <p className="text-xs text-slate-400">Active Proposal #QUO-2026-8812</p>
                        <p className="font-bold text-white text-lg">$165,000.00</p>
                      </div>
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-lg text-xs font-semibold">Approved</span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden flex flex-col items-center bg-gradient-to-b from-black via-[#09111e] to-black border-t border-white/10">
        {/* Dark radial glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 pt-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            Experience how HynaBiz can set your sales team up for success today.
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of modern B2B enterprises that are already closing deals faster and smarter.
          </p>
          <button className="px-10 py-5 bg-white text-slate-950 hover:bg-slate-100 rounded-xl font-bold text-lg transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] hover:scale-[1.02] flex items-center justify-center gap-2 mx-auto cursor-pointer">
            Start your free trial <ChevronRight size={20} className="text-slate-950" />
          </button>
          <p className="mt-6 text-sm text-slate-400">No credit card required. 14-day free trial.</p>
        </div>
      </section>

    </div>
  );
};

export default CrmPage;

