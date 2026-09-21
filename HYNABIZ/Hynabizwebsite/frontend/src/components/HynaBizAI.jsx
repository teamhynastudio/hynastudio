import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  Search, 
  TrendingUp, 
  Briefcase, 
  ShoppingCart, 
  Workflow, 
  Activity,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import './HynaBizAI.css';

gsap.registerPlugin(ScrollTrigger);

const HynaBizAI = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline triggered on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' }
      });

      // 1. Eyebrow fades in
      tl.fromTo('.ai-eyebrow', 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
      // 2. Headline reveals line by line
      .fromTo('.ai-headline-line',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.12 },
        '-=0.3'
      )
      // 3. Description rises subtly
      .fromTo('.ai-description',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      )
      // Subtle CTA
      .fromTo('.ai-cta-wrap',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
      )
      // 4. AI interface scales from 0.97 to 1
      .fromTo('.ai-command-interface',
        { opacity: 0, scale: 0.97, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power2.out' },
        '-=0.6'
      )
      // 5. Metrics appear sequentially
      .fromTo('.ai-metric-card',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        '-=0.4'
      )
      // 6. AI Insight card activates with subtle cyan pulse
      .fromTo('.ai-insight-card',
        { opacity: 0, y: 15, borderColor: 'rgba(255, 255, 255, 0.08)' },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          borderColor: 'rgba(0, 194, 255, 0.4)',
          boxShadow: '0 0 28px rgba(0, 194, 255, 0.14)',
          ease: 'power2.out'
        },
        '-=0.2'
      )
      // Insight items stagger
      .fromTo('.ai-insight-item',
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.07 },
        '-=0.4'
      )
      // 7. Bottom modules connect with smooth line animation
      .fromTo('.ai-connectors-line',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.8, ease: 'power2.inOut' },
        '-=0.3'
      )
      .fromTo('.ai-module-node',
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08 },
        '-=0.5'
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hynabiz-ai-section" id="ai" ref={sectionRef}>
      {/* Background ambient lighting */}
      <div className="ai-bg-glow"></div>

      <div className="container ai-container">
        <div className="ai-grid">
          
          {/* Left Column: Editorial Content */}
          <div className="ai-editorial-col">
            <div className="ai-eyebrow">
              <span className="ai-eyebrow-dot"></span>
              <span>HYNA BIZ AI</span>
            </div>

            <h2 className="ai-headline">
              <span className="ai-headline-line">INTELLIGENCE</span>
              <span className="ai-headline-line">THAT MOVES</span>
              <span className="ai-headline-line text-blue">YOUR BUSINESS.</span>
            </h2>

            <p className="ai-description">
              HynaBiz AI understands your business, connects your data, identifies opportunities, and turns everyday activity into actionable intelligence.
            </p>

            <div className="ai-cta-wrap">
              <a href="#explore-ai" className="ai-cta-btn">
                <span>Explore HynaBiz AI</span>
                <ArrowRight size={16} className="ai-cta-arrow" />
              </a>
            </div>
          </div>

          {/* Right Column: AI Command Interface */}
          <div className="ai-interface-col">
            <div className="ai-command-interface">
              
              {/* Interface Header Bar */}
              <div className="ai-ui-header">
                <div className="ai-ui-brand">
                  <div className="ai-status-pulse">
                    <span className="ai-pulse-ring"></span>
                    <span className="ai-pulse-dot"></span>
                  </div>
                  <div className="ai-brand-text">
                    <span className="ai-brand-name">HYNA BIZ AI</span>
                    <span className="ai-brand-sub">Business Intelligence</span>
                  </div>
                </div>

                <div className="ai-ui-status">
                  <span className="ai-status-badge">
                    <ShieldCheck size={12} className="text-blue" />
                    <span>Live Telemetry</span>
                  </span>
                </div>
              </div>

              {/* Clean AI Input Field */}
              <div className="ai-input-wrapper">
                <div className="ai-input-bar">
                  <Search size={15} className="ai-search-icon" />
                  <span className="ai-input-placeholder">Ask anything about your business…</span>
                  <div className="ai-input-shortcut">⌘K</div>
                </div>
                
                {/* Active Example Query */}
                <div className="ai-active-query">
                  <span className="ai-query-label">QUERY</span>
                  <p className="ai-query-text">
                    “Show me this month’s business performance and opportunities.”
                  </p>
                  <span className="ai-query-tag">Autonomous</span>
                </div>
              </div>

              {/* Intelligent Business Metrics Grid */}
              <div className="ai-metrics-grid">
                
                {/* 1. REVENUE */}
                <div className="ai-metric-card">
                  <div className="ai-metric-head">
                    <span className="ai-metric-title">REVENUE</span>
                    <span className="ai-metric-badge badge-positive">
                      <TrendingUp size={11} /> +18.4%
                    </span>
                  </div>
                  <div className="ai-metric-value">₹24.8L</div>
                  <div className="ai-metric-foot">vs ₹20.9L previous cycle</div>
                </div>

                {/* 2. TRADE PIPELINE */}
                <div className="ai-metric-card">
                  <div className="ai-metric-head">
                    <span className="ai-metric-title">TRADE PIPELINE</span>
                    <span className="ai-metric-badge badge-neutral">Pipeline</span>
                  </div>
                  <div className="ai-metric-value">₹42.6L</div>
                  <div className="ai-metric-foot">12 active opportunities</div>
                </div>

                {/* 3. MARKET SIGNAL */}
                <div className="ai-metric-card">
                  <div className="ai-metric-head">
                    <span className="ai-metric-title">MARKET SIGNAL</span>
                    <span className="ai-metric-badge badge-positive">
                      <Activity size={11} /> Verified
                    </span>
                  </div>
                  <div className="ai-metric-value text-blue">Positive</div>
                  <div className="ai-metric-foot">24 monitored assets</div>
                </div>

                {/* 4. AUTOMATION */}
                <div className="ai-metric-card">
                  <div className="ai-metric-head">
                    <span className="ai-metric-title">AUTOMATION</span>
                    <span className="ai-metric-badge badge-cyan">
                      <Clock size={11} /> Saved
                    </span>
                  </div>
                  <div className="ai-metric-value">142 hrs</div>
                  <div className="ai-metric-foot">saved this month</div>
                </div>

              </div>

              {/* Prominent AI Insight Card */}
              <div className="ai-insight-card">
                <div className="ai-insight-header">
                  <div className="ai-insight-tag">
                    <span className="ai-insight-pip"></span>
                    <span>AI INSIGHT</span>
                  </div>
                  <span className="ai-insight-time">High Priority · Real-time Action</span>
                </div>

                <div className="ai-insight-headline">
                  “Three business opportunities need your attention.”
                </div>

                <div className="ai-insight-items">
                  <div className="ai-insight-item">
                    <div className="ai-item-bullet bullet-blue"></div>
                    <div className="ai-item-content">
                      <span className="ai-item-text">Pending high-value trade opportunity</span>
                      <span className="ai-item-meta">₹14.2L order ready for contract approval</span>
                    </div>
                    <ArrowUpRight size={14} className="ai-item-arrow" />
                  </div>

                  <div className="ai-insight-item">
                    <div className="ai-item-bullet bullet-emerald"></div>
                    <div className="ai-item-content">
                      <span className="ai-item-text">Supplier price movement detected</span>
                      <span className="ai-item-meta">Raw materials dropped 4.8% from Tier-1 vendor</span>
                    </div>
                    <ArrowUpRight size={14} className="ai-item-arrow" />
                  </div>

                  <div className="ai-insight-item">
                    <div className="ai-item-bullet bullet-purple"></div>
                    <div className="ai-item-content">
                      <span className="ai-item-text">Sales workflow ready for automation</span>
                      <span className="ai-item-meta">Quotation auto-follow-up rule triggered</span>
                    </div>
                    <ArrowUpRight size={14} className="ai-item-arrow" />
                  </div>
                </div>
              </div>

              {/* Bottom Connected Intelligence Modules */}
              <div className="ai-modules-container">
                <div className="ai-connectors-line"></div>
                <div className="ai-modules-grid">
                  
                  <div className="ai-module-node">
                    <div className="ai-module-icon">
                      <Briefcase size={13} />
                    </div>
                    <span className="ai-module-name">BUSINESS</span>
                  </div>

                  <div className="ai-module-node">
                    <div className="ai-module-icon">
                      <ShoppingCart size={13} />
                    </div>
                    <span className="ai-module-name">TRADE</span>
                  </div>

                  <div className="ai-module-node">
                    <div className="ai-module-icon">
                      <TrendingUp size={13} />
                    </div>
                    <span className="ai-module-name">MARKETS</span>
                  </div>

                  <div className="ai-module-node">
                    <div className="ai-module-icon">
                      <Workflow size={13} />
                    </div>
                    <span className="ai-module-name">AUTOMATION</span>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HynaBizAI;
