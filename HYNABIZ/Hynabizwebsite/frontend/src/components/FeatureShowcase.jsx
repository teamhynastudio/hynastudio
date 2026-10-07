import React, { useState, useRef, useEffect } from 'react';
import {
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

const featuresData = [
  { 
    id: 'connect', 
    title: 'B2B Connection Hub', 
    desc: 'Discover and verify trusted vendors and buyers with AI-driven match scoring.', 
    Icon: Users,
    dashboard: {
      subtitle: 'System Active',
      gaugeValue: 98,
      rows: [
        { title: 'Apex Manufacturing', subtitle: 'Industrial Supplies' },
        { title: 'Nexus Supply Co.', subtitle: 'Raw Materials' },
        { title: 'Global Logistics', subtitle: 'Shipping Partners' }
      ]
    }
  },
  { 
    id: 'quote', 
    title: 'Smart Quote Builder', 
    desc: 'Construct detailed proposals with dynamic pricing, discounts, and real-time margin tracking.', 
    Icon: FileText,
    dashboard: {
      subtitle: 'Editing #RFP-2026-8992',
      gaugeValue: 42,
      rows: [
        { title: 'Enterprise License', subtitle: 'Qty: 50 × $120.00' },
        { title: 'Implementation Services', subtitle: 'Qty: 1 × $5,000.00' },
        { title: 'Priority Support', subtitle: '24/7 SLA Included' }
      ]
    }
  },
  { 
    id: 'secure', 
    title: 'Secure Deal Rooms', 
    desc: 'Negotiate and collaborate in dedicated, encrypted environments for every deal.', 
    Icon: Lock,
    dashboard: {
      subtitle: 'Verified on Oct 4, 2026',
      gaugeValue: 100,
      rows: [
        { title: 'Master_Service_Agreement.pdf', subtitle: 'Signed via DocuSign' },
        { title: 'Pricing_Tier_B.xlsx', subtitle: 'Confidential' },
        { title: 'Compliance_Audit.pdf', subtitle: 'Approved' }
      ]
    }
  },
  { 
    id: 'invoice', 
    title: 'Automated Invoicing', 
    desc: 'Convert winning quotes directly into professional invoices with zero manual data entry.', 
    Icon: Layers,
    dashboard: {
      subtitle: 'Auto-Dispatched',
      gaugeValue: 85,
      rows: [
        { title: 'Payment Terms', subtitle: 'Net-30' },
        { title: 'Amount Due', subtitle: '$10,400.00' },
        { title: 'Status', subtitle: 'Awaiting Payment' }
      ]
    }
  }
];

const FeatureShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Default: Smart Quote Builder
  const [isFlying, setIsFlying] = useState(false);
  const [landed, setLanded] = useState(true);
  const [dashboardFadingOut, setDashboardFadingOut] = useState(false);
  
  const [gaugeProgress, setGaugeProgress] = useState(0);
  const [countUpValue, setCountUpValue] = useState(0);
  
  const [pillStyle, setPillStyle] = useState({ top: 0, height: 0, opacity: 0 });
  
  const tabsContainerRef = useRef(null);
  const iconRefs = useRef([]);
  const destIconRef = useRef(null);

  // Update pill position
  useEffect(() => {
    const updatePill = () => {
      const activeEl = tabsContainerRef.current?.children[activeIndex + 1]; // +1 because the pill itself is the first child
      if (activeEl) {
        setPillStyle({
          top: activeEl.offsetTop,
          height: activeEl.offsetHeight,
          opacity: 1
        });
      }
    };
    updatePill();
    window.addEventListener('resize', updatePill);
    // slight delay to handle CSS layout thrashing after max-height transition starts
    setTimeout(updatePill, 50); 
    return () => window.removeEventListener('resize', updatePill);
  }, [activeIndex]);

  // Initial dashboard animation
  useEffect(() => {
    animateDashboardIn(featuresData[1].dashboard.gaugeValue);
  }, []);

  const animateDashboardIn = (targetValue) => {
    setGaugeProgress(targetValue);
    let start = 0;
    const duration = 1000;
    let startTime = null;
    
    const step = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      setCountUpValue(Math.floor(easeProgress * targetValue));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCountUpValue(targetValue);
      }
    };
    requestAnimationFrame(step);
  };

  const handleTabClick = (index) => {
    if (isFlying || index === activeIndex) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActiveIndex(index);
      setLanded(true);
      animateDashboardIn(featuresData[index].dashboard.gaugeValue);
      return;
    }

    setIsFlying(true);
    setDashboardFadingOut(true);
    setLanded(false);

    const originIcon = iconRefs.current[index];
    const destIcon = destIconRef.current;
    
    if (!originIcon || !destIcon) {
      setActiveIndex(index);
      setIsFlying(false);
      setDashboardFadingOut(false);
      return;
    }

    const originRect = originIcon.getBoundingClientRect();
    const destRect = destIcon.getBoundingClientRect();

    const clone = originIcon.cloneNode(true);
    document.body.appendChild(clone);

    Object.assign(clone.style, {
      position: 'fixed',
      top: `${originRect.top}px`,
      left: `${originRect.left}px`,
      width: `${originRect.width}px`,
      height: `${originRect.height}px`,
      zIndex: 9999,
      color: '#22d3ee', // text-cyan-400
      pointerEvents: 'none',
      margin: 0
    });

    const trailContainer = document.createElement('div');
    Object.assign(trailContainer.style, {
      position: 'fixed',
      inset: '0',
      pointerEvents: 'none',
      zIndex: 9998
    });
    document.body.appendChild(trailContainer);

    let startTime = null;
    const duration = 700;
    let lastTrailTime = 0;

    const p0 = { x: originRect.left, y: originRect.top };
    const p2 = { x: destRect.left, y: destRect.top };
    // Quadratic control point for a nice arc
    const p1 = { 
      x: (p0.x + p2.x) / 2, 
      y: Math.min(p0.y, p2.y) - 150 
    };

    const animate = (time) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Custom ease
      const easeProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const t = easeProgress;
      const invT = 1 - t;
      const x = invT * invT * p0.x + 2 * invT * t * p1.x + t * t * p2.x;
      const y = invT * invT * p0.y + 2 * invT * t * p1.y + t * t * p2.y;

      const scale = 1 + Math.sin(t * Math.PI) * 0.5;

      clone.style.transform = `translate(${x - p0.x}px, ${y - p0.y}px) scale(${scale})`;

      if (time - lastTrailTime > 30) {
        const dot = document.createElement('div');
        Object.assign(dot.style, {
          position: 'absolute',
          left: `${x + originRect.width/2 - 4}px`,
          top: `${y + originRect.height/2 - 4}px`,
          width: '8px',
          height: '8px',
          backgroundColor: '#34d399', // emerald-400
          borderRadius: '50%',
          opacity: '0.8',
          filter: 'blur(2px)'
        });
        trailContainer.appendChild(dot);
        
        dot.animate([
          { opacity: 0.8, transform: 'scale(1)' },
          { opacity: 0, transform: 'scale(0)' }
        ], { duration: 400, fill: 'forwards' }).onfinish = () => dot.remove();

        lastTrailTime = time;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        clone.remove();
        trailContainer.remove();
        setActiveIndex(index);
        setIsFlying(false);
        setDashboardFadingOut(false);
        setLanded(true);
        setGaugeProgress(0);
        setCountUpValue(0);
        setTimeout(() => {
          animateDashboardIn(featuresData[index].dashboard.gaugeValue);
        }, 50);
      }
    };
    requestAnimationFrame(animate);
  };

  const activeData = featuresData[activeIndex];
  const ActiveIcon = activeData.Icon;

  return (
    <section className="py-20 pt-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The right tools for expert B2B commerce</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">Everything you need to source partners, quote accurately, and close deals faster.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Column: Feature Tabs */}
          <div className="w-full lg:w-[40%] relative group" ref={tabsContainerRef}>
            {/* The gliding background pill */}
            <div 
              className="absolute left-0 w-full bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-400 text-white rounded-r-xl shadow-xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ top: pillStyle.top, height: pillStyle.height, opacity: pillStyle.opacity }}
            />
            
            {featuresData.map((tab, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(idx)}
                  className={`w-full text-left p-6 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 transition-all duration-400 ease-out group-hover:blur-[2px] group-hover:scale-[0.98] group-hover:opacity-70 hover:!blur-none hover:!scale-105 hover:!opacity-100 relative z-0 hover:z-10 ${!isActive ? 'hover:bg-slate-800/40' : ''}`}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-slate-900/50 text-slate-400">
                      <div ref={el => iconRefs.current[idx] = el} className={`transition-opacity duration-300 ${isFlying && !isActive ? 'opacity-30' : 'opacity-100'} ${isActive ? 'text-cyan-400' : ''}`}>
                        <tab.Icon size={20} />
                      </div>
                    </div>
                    <h3 className={`text-xl font-semibold transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {tab.title}
                    </h3>
                  </div>
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}
                  >
                    <p className="text-slate-400 ml-14">{tab.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="w-full lg:w-[60%] relative" aria-live="polite">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-emerald-500/10 blur-3xl rounded-full" />
            <div className="spacious-wrapper">
              <div className="spacious-card relative overflow-hidden min-h-[400px]">
                <div className={`transition-opacity duration-300 flex-1 flex flex-col ${dashboardFadingOut ? 'opacity-0' : 'opacity-100'}`}>
                {/* Mockup Header */}
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div 
                      ref={destIconRef} 
                      className={`w-10 h-10 rounded-lg flex items-center justify-center relative transition-colors duration-300 ${landed ? 'text-emerald-400 bg-emerald-900/30' : 'text-cyan-400 bg-cyan-900/50'}`}
                    >
                      {landed && (
                        <span className="absolute inset-0 rounded-lg border-2 border-emerald-400 animate-[ping_0.7s_ease-out_forwards]" />
                      )}
                      <ActiveIcon size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{activeData.title}</h4>
                      <p className="text-xs text-cyan-100">{activeData.dashboard.subtitle}</p>
                    </div>
                  </div>
                  <button className="bg-black/40 text-cyan-100 px-4 py-2 rounded-lg text-sm font-medium border border-cyan-500/10 hover:bg-black/60 transition-colors">
                    Preview
                  </button>
                </div>

                {/* Mockup Body */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 flex flex-col items-center justify-center bg-black/40 rounded-xl p-6 border border-slate-700/30 relative overflow-hidden">
                    {/* SVG Ring Gauge */}
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" className="text-slate-800" strokeWidth="8" stroke="currentColor" fill="transparent" />
                        <circle 
                          cx="50" cy="50" r="40" 
                          className="text-emerald-400 transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]" 
                          strokeWidth="8" 
                          stroke="currentColor" 
                          fill="transparent" 
                          strokeDasharray={251.2} 
                          strokeDashoffset={251.2 - (251.2 * gaugeProgress) / 100}
                          strokeLinecap="round" 
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-white">{countUpValue}%</span>
                        <span className="text-[10px] text-cyan-100 uppercase tracking-wider mt-1">{activeData.id === 'secure' ? 'Secure' : 'Score'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 flex flex-col gap-3">
                    {activeData.dashboard.rows.map((row, i) => (
                      <div 
                        key={`${activeData.id}-${i}`}
                        className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/30 flex justify-between items-center opacity-0 hover:bg-black/40 cursor-pointer transition-colors"
                        style={{ 
                          animation: `slideIn 0.5s ease-out ${i * 150}ms forwards`
                        }}
                      >
                        <div className="flex items-center gap-3">
                          {activeData.id === 'secure' && i === 0 && <File size={16} className="text-cyan-100" />}
                          {activeData.id === 'secure' && i > 0 && <Lock size={16} className="text-cyan-100" />}
                          <div>
                            <p className="font-medium text-white">{row.title}</p>
                            <p className="text-xs text-cyan-100 mt-1">{row.subtitle}</p>
                          </div>
                        </div>
                        {activeData.id === 'connect' ? (
                          <button className="border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-400 text-slate-300 px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wide transition-colors">Connect</button>
                        ) : activeData.id === 'secure' ? (
                          <Download size={16} className="text-slate-500 hover:text-cyan-400 cursor-pointer" />
                        ) : (
                          <ChevronRight size={16} className="text-slate-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* CSS Animations */}
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes slideIn {
                  from { opacity: 0; transform: translateY(15px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
