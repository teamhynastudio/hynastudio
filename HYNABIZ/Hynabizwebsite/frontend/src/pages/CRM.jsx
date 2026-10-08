import React, { useState, useEffect, useRef } from 'react';
import './CRM.css';

// SVG Definitions for bump filters and pattern hatches
const CrmSvgDefs = () => (
  <svg width="0" height="0" style={{ position: 'absolute', width: 0, height: 0 }}>
    <defs>
      <filter id="bump">
        <feTurbulence result="noise" numOctaves="3" baseFrequency="0.7" type="fractalNoise" />
        <feSpecularLighting in="noise" result="specular" lightingColor="#fffffc" specularExponent="25" specularConstant="0.8" surfaceScale="0.15">
          <fePointLight z="210" y="100" x="100" />
        </feSpecularLighting>
        <feComposite result="noise2" operator="in" in="specular" in2="SourceGraphic" />
        <feBlend mode="screen" in2="noise2" in="SourceGraphic" />
      </filter>

      <pattern id="hatchCyan" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="6" stroke="#00C2FF" strokeWidth="1.5" strokeOpacity="0.55" />
      </pattern>
    </defs>
  </svg>
);

const CRM = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePlatformIndex, setActivePlatformIndex] = useState(0);
  const [selectedPricingIndex, setSelectedPricingIndex] = useState(2); // Growth popular selected by default
  const [isSocOpen, setIsSocOpen] = useState(false);

  // Stats Counters & Intersection Observer
  const [statsFlyIn, setStatsFlyIn] = useState(false);
  const [counters, setCounters] = useState({ faster: 0, conversion: 0, businesses: 0, uptime: 0 });
  const statsRef = useRef(null);

  // Customers Loader to Reviews state
  const [customersLoaded, setCustomersLoaded] = useState(false);
  const customersRef = useRef(null);

  // Set document title & favicon on mount
  useEffect(() => {
    document.title = "HYNA Biz CRM";
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'shortcut icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = '/hynabiz-logo.png';
  }, []);

  // Handle Scroll Progress & Nav Shrink
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsNavScrolled(scrollY > 40);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stats Intersection Observer Count-Up
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !statsFlyIn) {
          setStatsFlyIn(true);
          let duration = 1800;
          let steps = 60;
          let stepTime = duration / steps;
          let count = 0;

          const timer = setInterval(() => {
            count++;
            const progress = count / steps;
            setCounters({
              faster: Math.floor(progress * 40),
              conversion: parseFloat((progress * 2).toFixed(1)),
              businesses: Math.floor(progress * 500),
              uptime: parseFloat((progress * 99.9).toFixed(1))
            });

            if (count >= steps) {
              clearInterval(timer);
              setCounters({ faster: 40, conversion: 2, businesses: 500, uptime: 99.9 });
            }
          }, stepTime);
        }
      },
      { threshold: 0.35 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, [statsFlyIn]);

  // Customers Loader Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !customersLoaded) {
          const timer = setTimeout(() => {
            setCustomersLoaded(true);
          }, 2400);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (customersRef.current) {
      observer.observe(customersRef.current);
    }
    return () => observer.disconnect();
  }, [customersLoaded]);

  // Smooth Scroll Helper
  const scrollToSection = (e, id) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Trust Strip Chips Data
  const marqueeCustomers = [
    { name: 'Kaveri Textiles', industry: 'Textiles', color: '#F5A524', svg: '<path d="M3 7c3-3 5 3 9 0s6 3 9 0M3 13c3-3 5 3 9 0s6 3 9 0M3 19c3-3 5 3 9 0s6 3 9 0"/>' },
    { name: 'Marina Foods', industry: 'Food & Beverage', color: '#FF6B6B', svg: '<path d="M7 3v8M5 3v5a2 2 0 044 0V3M7 11v10M17 3c-2 2-2 6 0 8v10"/>' },
    { name: 'Chola Logistics', industry: 'Logistics', color: '#4DA3FF', svg: '<path d="M5 5l7 7-7 7M13 5l7 7-7 7"/>' },
    { name: 'Bluewave Studio', industry: 'Design', color: '#00C2FF', svg: '<circle cx="12" cy="12" r="9"/><path d="M6 13c2-3 4 3 6 0s4 3 6 0"/>' },
    { name: 'Orbit Clinics', industry: 'Healthcare', color: '#3DDC97', svg: '<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)"/>' },
    { name: 'Sundaram Interiors', industry: 'Interiors', color: '#C79BFF', svg: '<path d="M4 20V9l8-6 8 6v11zM10 20v-6h4v6"/>' },
    { name: 'Greenfield Agro', industry: 'Agriculture', color: '#7BD94C', svg: '<path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15zM5 19l8-8"/>' }
  ];

  // 6 Expandable Platform Feature Accordions
  const platformFeatures = [
    { icon: '👥', title: 'Lead tracking', desc: 'Capture leads from every channel and never miss a follow-up.' },
    { icon: '📊', title: 'Deal pipeline', desc: 'Drag deals across stages and watch your forecast update live.' },
    { icon: '⚡', title: 'Smart automation', desc: 'Auto-assign leads, send reminders and trigger emails.' },
    { icon: '📈', title: 'Reports & analytics', desc: 'Live dashboards for revenue, conversion and team performance.' },
    { icon: '💬', title: 'Email & WhatsApp', desc: 'Talk to customers from one inbox with full history.' },
    { icon: '🛡️', title: 'Team & permissions', desc: 'Roles, shared notes and secure access for every member.' }
  ];

  // 3 Automation Glass Steps
  const automationSteps = [
    { title: 'Connect your data', desc: 'Import contacts from sheets or other CRMs in minutes.', rot: -15 },
    { title: 'Automate your pipeline', desc: 'Set rules once and let HYNA Biz handle routing and reminders.', rot: 5 },
    { title: 'Close more deals', desc: 'Track every stage and focus on the deals that matter.', rot: 25 }
  ];

  // 4 Pricing Cards
  const pricingPlans = [
    { name: 'Free', price: '₹0', period: '/forever', features: ['1 user', 'Up to 100 contacts', 'Basic lead tracking'], btnText: 'Start for free' },
    { name: 'Starter', price: '₹999', period: '/user/mo', features: ['Lead tracking', 'Basic pipeline', 'Email support'], btnText: 'Choose plan' },
    { name: 'Growth', price: '₹2,499', period: '/user/mo', features: ['Everything in Starter', 'Automation', 'WhatsApp & email', 'Reports'], popular: true, btnText: 'Choose plan' },
    { name: 'Enterprise', price: 'Custom', period: '', features: ['Unlimited users', 'Custom integrations', 'Dedicated manager'], btnText: 'Contact sales' }
  ];

  return (
    <div className="crm-page-wrapper">
      <CrmSvgDefs />

      {/* Sticky CRM Navbar */}
      <nav id="nav" className={`crm-sticky-nav ${isNavScrolled ? 'scrolled' : ''}`}>
        <a className="crm-nav-logo" href="#intro" onClick={(e) => scrollToSection(e, 'intro')}>
          <img src="/hynabiz-logo.png" alt="HYNA Biz Logo" style={{ height: '30px', width: 'auto' }} />
          HYNA <span>Biz</span>
        </a>

        <div className={`crm-nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="crm-dd">
            <a className="crm-nl" href="#features" onClick={(e) => scrollToSection(e, 'features')}>
              Platform
            </a>
            <div className="crm-dd-panel">
              <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="crm-dd-item">
                <span className="crm-dd-icon">👥</span>
                <div>
                  <b>Lead tracking</b>
                  <div style={{ color: 'var(--mute)', fontSize: '12px' }}>Capture every lead</div>
                </div>
              </a>
              <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="crm-dd-item">
                <span className="crm-dd-icon">📊</span>
                <div>
                  <b>Deal pipeline</b>
                  <div style={{ color: 'var(--mute)', fontSize: '12px' }}>Drag and close deals</div>
                </div>
              </a>
              <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="crm-dd-item">
                <span className="crm-dd-icon">📈</span>
                <div>
                  <b>Reports</b>
                  <div style={{ color: 'var(--mute)', fontSize: '12px' }}>Live analytics</div>
                </div>
              </a>
            </div>
          </div>

          <a className="crm-nl" href="#how" onClick={(e) => scrollToSection(e, 'how')}>
            Automation
          </a>
          <a className="crm-nl" href="#customers" onClick={(e) => scrollToSection(e, 'customers')}>
            Customers
          </a>
          <a className="crm-nl" href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')}>
            Pricing
          </a>
        </div>

        <div className="crm-nav-auth">
          <button className="crm-btn-si">Sign in</button>
          <a className="crm-btn-su" href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')}>
            Sign up
          </a>
          <button
            className="crm-burger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <i className="crm-scroll-prog" style={{ width: `${scrollProgress}%` }} />
      </nav>

      {/* Top Initial Dashboard Showcase (from CRM.jsx output) */}
      <section className="crm-dash-showcase">
        <div className="crm-dash-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ color: 'var(--c)', fontSize: '12px', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase' }}>CRM Dashboard Output</span>
              <h2 style={{ margin: '4px 0 0', fontSize: '22px', fontWeight: '700', color: '#fff' }}>Live B2B Sales & Pipeline Overview</h2>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ background: '#14171B', color: 'var(--c)', border: '1px solid var(--line)', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '600' }}>Live Pipeline</button>
              <button style={{ background: 'var(--c)', color: '#04141C', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '700' }}>+ New Deal</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            <div style={{ background: '#0E1114', border: '1px solid var(--line)', padding: '16px', borderRadius: '14px' }}>
              <span style={{ color: 'var(--mute)', fontSize: '12px', display: 'block' }}>Total Leads</span>
              <b style={{ fontSize: '26px', color: '#fff', display: 'block', margin: '4px 0' }}>1,284</b>
              <span style={{ fontSize: '11px', color: '#3DDC97', background: '#3DDC9722', padding: '2px 7px', borderRadius: '6px', fontWeight: '700' }}>+24% vs last mo</span>
            </div>
            <div style={{ background: '#0E1114', border: '1px solid var(--line)', padding: '16px', borderRadius: '14px' }}>
              <span style={{ color: 'var(--mute)', fontSize: '12px', display: 'block' }}>Active Pipeline</span>
              <b style={{ fontSize: '26px', color: '#fff', display: 'block', margin: '4px 0' }}>₹42.8 Lakh</b>
              <span style={{ fontSize: '11px', color: '#3DDC97', background: '#3DDC9722', padding: '2px 7px', borderRadius: '6px', fontWeight: '700' }}>18 Deals Closing</span>
            </div>
            <div style={{ background: '#0E1114', border: '1px solid var(--line)', padding: '16px', borderRadius: '14px' }}>
              <span style={{ color: 'var(--mute)', fontSize: '12px', display: 'block' }}>Follow-up Rate</span>
              <b style={{ fontSize: '26px', color: '#fff', display: 'block', margin: '4px 0' }}>98.4%</b>
              <span style={{ fontSize: '11px', color: '#3DDC97', background: '#3DDC9722', padding: '2px 7px', borderRadius: '6px', fontWeight: '700' }}>Autopilot On</span>
            </div>
            <div style={{ background: '#0E1114', border: '1px solid var(--line)', padding: '16px', borderRadius: '14px' }}>
              <span style={{ color: 'var(--mute)', fontSize: '12px', display: 'block' }}>Avg. Closure Time</span>
              <b style={{ fontSize: '26px', color: '#fff', display: 'block', margin: '4px 0' }}>4.2 Days</b>
              <span style={{ fontSize: '11px', color: '#00C2FF', background: 'rgba(0,194,255,0.15)', padding: '2px 7px', borderRadius: '6px', fontWeight: '700' }}>40% Faster</span>
            </div>
          </div>

          <div style={{ textAlign: 'center', paddingTop: '10px' }}>
            <a href="#intro" onClick={(e) => scrollToSection(e, 'intro')} style={{ color: 'var(--c)', fontSize: '14px', fontWeight: '600', textDecoration: 'underline' }}>
              Scroll down to explore full CRM features & platform details ↓
            </a>
          </div>
        </div>
      </section>

      {/* Intro / Hero Section (#intro) */}
      <section className="crm-intro-sec" id="intro" data-aos="fade-up">
        <div>
          <span className="crm-in-kick">Meet HYNA Biz CRM</span>
          <h2 className="crm-in-h">
            Your whole sales <em>pipeline</em>, in one connected place
          </h2>
          <p className="crm-in-p">
            HYNA Biz brings leads, deals, follow-ups and reports together, so your team always knows who to call next and what to close this week.
          </p>
          {/* NO BUTTONS or feature pills here */}
        </div>

        {/* 3 Holographic Fanned Ticket Cards */}
        <div className="crm-tks" data-aos="zoom-in">
          {/* Card 1 */}
          <div className="crm-tkw" style={{ '--r': -9, '--y': '14px' }}>
            <div className="crm-tk" style={{ '--i': 0 }}>
              <div className="crm-tk-h">LEADS</div>
              <div className="crm-tk-b">
                <em>Capture</em><br />
                Every enquiry, one inbox<br />
                Never miss a follow-up
              </div>
              <div className="crm-tk-f">
                <div className="crm-tk-n">Step <span className="bold">01</span></div>
                <div className="crm-tk-bar" />
              </div>
              <div className="crm-tk-bg crm-holo" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="crm-tkw" style={{ '--r': 0, '--y': '-6px' }}>
            <div className="crm-tk" style={{ '--i': 1 }}>
              <div className="crm-tk-h">DEALS</div>
              <div className="crm-tk-b">
                <em>Pipeline</em><br />
                Drag deals across stages<br />
                Live revenue forecasts
              </div>
              <div className="crm-tk-f">
                <div className="crm-tk-n">Step <span className="bold">02</span></div>
                <div className="crm-tk-bar" />
              </div>
              <div className="crm-tk-bg crm-holo" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="crm-tkw" style={{ '--r': 9, '--y': '14px' }}>
            <div className="crm-tk" style={{ '--i': 2 }}>
              <div className="crm-tk-h">GROWTH</div>
              <div className="crm-tk-b">
                <em>Automate</em><br />
                Reminders on autopilot<br />
                Reports that guide you
              </div>
              <div className="crm-tk-f">
                <div className="crm-tk-n">Step <span className="bold">03</span></div>
                <div className="crm-tk-bar" />
              </div>
              <div className="crm-tk-bg crm-holo" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip Section with Comic Dock Tooltips */}
      <section className="crm-trust-strip" data-aos="fade-up">
        <p>Trusted by growing B2B teams across India</p>
        <div className="crm-mq">
          <div className="crm-mqt">
            {[...marqueeCustomers, ...marqueeCustomers].map((cust, idx) => (
              <div
                key={idx}
                className="crm-lg"
                data-tip={cust.industry}
                style={{ '--k': cust.color }}
                tabIndex={0}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="26"
                  height="26"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  dangerouslySetInnerHTML={{ __html: cust.svg }}
                />
                <b>{cust.name}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Section (#features) */}
      <section className="crm-sec" id="features">
        <div className="crm-hd" data-aos="fade-up">
          <span>Platform</span>
          <h2>Everything your sales team needs, in one place</h2>
        </div>

        <div className="crm-acc aos-animate">
          {platformFeatures.map((feat, idx) => {
            const isOpen = activePlatformIndex === idx;
            return (
              <div
                key={idx}
                className={`crm-ac ${isOpen ? 'open' : ''}`}
                onClick={() => setActivePlatformIndex(idx)}
                onMouseEnter={() => setActivePlatformIndex(idx)}
                tabIndex={0}
                role="button"
                aria-expanded={isOpen}
              >
                <span className="crm-vi">{feat.icon}</span>
                <span className="crm-vl">{feat.title}</span>

                <div className="crm-bd">
                  <span className="no">0{idx + 1}</span>
                  <div style={{ fontSize: '24px', marginBottom: '10px' }}>{feat.icon}</div>
                  <h3>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Automation Section (#how) */}
      <section className="crm-sec" id="how">
        <div className="crm-hd" data-aos="fade-up">
          <span>Automation</span>
          <h2>Go live in three simple steps</h2>
        </div>

        <div className="crm-gfan" data-aos="fade-up">
          {automationSteps.map((step, idx) => (
            <div key={idx} className="crm-gc" style={{ '--r': step.rot }} tabIndex={0}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {idx === 0 && <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />}
                {idx === 1 && <path d="M13 2L4 14h7l-1 8 9-12h-7z" />}
                {idx === 2 && (
                  <>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12l3 3 5-6" />
                  </>
                )}
              </svg>
              <p>{step.desc}</p>
              <div className="crm-gb">
                <i>{idx + 1}</i>{step.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section with Fly-In Count-Up */}
      <section className="crm-sec stats" ref={statsRef}>
        <div className={`crm-sg ${statsFlyIn ? 'fly' : ''}`}>
          <div className="crm-st" style={{ '--i': 0, '--fx': '-170px', '--fy': '50px', '--fr': '-14deg' }}>
            <div className="fl">
              <b>{counters.faster}%</b>
              <small>Faster follow-ups</small>
            </div>
          </div>
          <div className="crm-st" style={{ '--i': 1, '--fx': '0px', '--fy': '-130px', '--fr': '8deg' }}>
            <div className="fl">
              <b>{counters.conversion}x</b>
              <small>Lead conversion</small>
            </div>
          </div>
          <div className="crm-st" style={{ '--i': 2, '--fx': '0px', '--fy': '130px', '--fr': '-8deg' }}>
            <div className="fl">
              <b>{counters.businesses}+</b>
              <small>Businesses onboarded</small>
            </div>
          </div>
          <div className="crm-st" style={{ '--i': 3, '--fx': '170px', '--fy': '50px', '--fr': '14deg' }}>
            <div className="fl">
              <b>{counters.uptime}%</b>
              <small>Uptime</small>
            </div>
          </div>
        </div>
      </section>

      {/* Customers Section (#customers) */}
      <section className="crm-sec" id="customers">
        <div className="crm-hd" data-aos="fade-up">
          <span>Customers</span>
          <h2>Teams love working in HYNA Biz</h2>
        </div>

        <div className={`crm-cwrap ${customersLoaded ? 'done' : ''}`} ref={customersRef}>
          {/* Equalizer Bar Loader */}
          <div className="crm-loader" aria-label="Loading reviews">
            <div className="crm-loader__bar" />
            <div className="crm-loader__bar" />
            <div className="crm-loader__bar" />
            <div className="crm-loader__bar" />
            <div className="crm-loader__bar" />
            <div className="crm-loader__ball" />
          </div>

          {/* Fanned Rotating Reviews Stack */}
          <div className="crm-cstack">
            <div className="crm-rc">
              <p>“Our follow-ups used to slip. Now every lead gets a reminder and nothing is missed.”</p>
              <div className="who">
                <i>A</i>
                <div>
                  <b>Aarav Menon</b>
                  Kaveri Textiles
                </div>
              </div>
            </div>

            <div className="crm-rc">
              <p>“The pipeline view gives me my weekly forecast in seconds.”</p>
              <div className="who">
                <i>D</i>
                <div>
                  <b>Divya Rao</b>
                  Marina Foods
                </div>
              </div>
            </div>

            <div className="crm-rc">
              <p>“Setup took one afternoon and the whole team was using it the next day.”</p>
              <div className="who">
                <i>K</i>
                <div>
                  <b>Karthik S</b>
                  Chola Logistics
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (#pricing) */}
      <section className="crm-sec" id="pricing">
        <div className="crm-hd" data-aos="fade-up">
          <span>Pricing</span>
          <h2>Simple plans that grow with you</h2>
        </div>

        {/* 3D Fanned Carousel */}
        <div className="crm-cf">
          {pricingPlans.map((plan, idx) => {
            const positionOffset = idx - selectedPricingIndex;
            return (
              <div
                key={idx}
                className={`crm-pc ${plan.popular ? 'pop' : ''}`}
                data-p={positionOffset}
                onClick={() => setSelectedPricingIndex(idx)}
                tabIndex={0}
                role="button"
                aria-label={`${plan.name} plan`}
              >
                <h3>
                  {plan.name}
                  {plan.popular && <span className="crm-tag2">Popular</span>}
                </h3>
                <div className="pr">
                  {plan.price}
                  <small>{plan.period}</small>
                </div>
                <ul>
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx}>{feat}</li>
                  ))}
                </ul>
                <a href="#pricing" onClick={(e) => { e.stopPropagation(); scrollToSection(e, 'pricing'); }}>
                  {plan.btnText}
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="crm-footer">
        <div className="crm-fg">
          {/* Branded Expandable Networks Box */}
          <div
            className={`crm-soc ${isSocOpen ? 'open' : ''}`}
            onMouseEnter={() => setIsSocOpen(true)}
            onMouseLeave={() => setIsSocOpen(false)}
            onClick={() => setIsSocOpen(!isSocOpen)}
          >
            <div className="br">
              <div className="crm-nav-logo" style={{ fontSize: '24px' }}>
                <img src="/hynabiz-logo.png" alt="HYNA Biz Logo" style={{ height: '30px', width: 'auto' }} />
                HYNA <span>Biz</span>
              </div>
            </div>

            <button className="sl" aria-expanded={isSocOpen}>
              Our Networks
            </button>

            <a className="sp p1" href="https://www.linkedin.com/in/hyna-studio-089b33416/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 34 34" width="34" height="34">
                <rect width="34" height="34" rx="6" fill="#0A66C2" />
                <g fill="#fff">
                  <rect x="6.2" y="13.2" width="4.6" height="14.2" />
                  <circle cx="8.5" cy="8.6" r="2.7" />
                  <path d="M14 13.2h4.4v1.9c.8-1.4 2.3-2.2 4.2-2.2 4 0 5.2 2.5 5.2 6.2v8.3h-4.6v-7.3c0-1.7-.3-3.1-2.1-3.1-1.9 0-2.5 1.3-2.5 3.2v7.2H14z" />
                </g>
              </svg>
            </a>

            <a className="sp p2" href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 34 34" width="34" height="34">
                <defs>
                  <radialGradient id="igg" cx=".3" cy="1.08" r="1.25">
                    <stop offset="0" stopColor="#FFD561" />
                    <stop offset=".22" stopColor="#FF8A2B" />
                    <stop offset=".5" stopColor="#E4306F" />
                    <stop offset=".78" stopColor="#9B35C4" />
                    <stop offset="1" stopColor="#5B5BD6" />
                  </radialGradient>
                </defs>
                <rect width="34" height="34" rx="9" fill="url(#igg)" />
                <g fill="none" stroke="#fff" strokeWidth="2.9">
                  <rect x="6.6" y="6.6" width="20.8" height="20.8" rx="6.6" />
                  <circle cx="17" cy="17" r="5.1" />
                </g>
                <circle cx="23.2" cy="10.9" r="1.7" fill="#fff" />
              </svg>
            </a>

            <a className="sp p3" href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg viewBox="0 0 34 34" width="34" height="34">
                <rect x="0" y="5" width="34" height="24" rx="8" fill="#FF0000" />
                <path d="M13.5 11.2v11.6L23.6 17z" fill="#fff" />
              </svg>
            </a>

            <a className="sp p4" href="https://x.com/HynaStudio" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <svg viewBox="0 0 34 34" width="34" height="34">
                <rect width="34" height="34" rx="10" fill="#000" stroke="#ffffff66" strokeWidth="1" />
                <g transform="translate(8.2 8.2) scale(.72)" fill="#fff">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </g>
              </svg>
            </a>
          </div>
        </div>

        <div className="crm-copy">
          © 2026 HYNA Studio. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default CRM;
