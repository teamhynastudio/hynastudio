import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
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

  const [activePlatformIndex, setActivePlatformIndex] = useState(0);
  const [isSocOpen, setIsSocOpen] = useState(false);

  // Stats Counters & Intersection Observer
  const [statsFlyIn, setStatsFlyIn] = useState(false);
  const [counters, setCounters] = useState({ faster: 0, conversion: 0, businesses: 0, uptime: 0 });
  const statsRef = useRef(null);

  // Customers Loader to Reviews state
  const [customersLoaded, setCustomersLoaded] = useState(true);
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

  // 6 Expandable Platform Feature Accordions with Custom High-Resolution Backgrounds
  const platformFeatures = [
    {
      title: 'Lead tracking',
      tag: 'Leads & Enquiries',
      desc: 'Capture leads from every channel and never miss a follow-up.',
      image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Deal pipeline',
      tag: 'Visual Pipelines',
      desc: 'Drag deals across stages and watch your forecast update live.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Smart automation',
      tag: 'AI Reminders & Triggers',
      desc: 'Auto-assign leads, send reminders and trigger emails on autopilot.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Reports & analytics',
      tag: 'Live Forecasts',
      desc: 'Live dashboards for revenue, conversion and team performance.',
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Email & WhatsApp',
      tag: 'Omnichannel Inbox',
      desc: 'Talk to customers from one inbox with full communication history.',
      image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Team & permissions',
      tag: 'Secure Enterprise Roles',
      desc: 'Roles, shared notes and secure granular access for every member.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80'
    }
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

      {/* Intro / Hero Section (#intro) */}
      <section className="crm-intro-sec" id="intro" data-aos="fade-up">
        <div>
          <span className="crm-in-kick">Meet HYNBIZ CRM</span>
          <h2 className="crm-in-h">
            Your whole sales <em>pipeline</em>, in one connected place
          </h2>
          <p className="crm-in-p">
            HYNABIZ brings leads, deals, follow-ups and reports together, so your team always knows who to call next and what to close this week.
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
      <section
        className="crm-trust-strip"
        data-aos="fade-up"
        style={{
          marginTop: '50px',
          paddingTop: '60px',
          position: 'relative',
          zIndex: 10
        }}
      >
        <p style={{ marginBottom: '40px' }}>Trusted by growing B2B teams across India</p>
        <div className="crm-mq" style={{ paddingTop: '100px', paddingBottom: '30px', marginTop: '15px' }}>
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

        <div
          className="crm-acc aos-animate"
          style={{
            '--theme-c': '#00C2FF',
            '--theme-c2': '#1AE5C4',
            '--theme-glow': 'rgba(0, 194, 255, 0.35)',
          }}
        >
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
                {/* Feature-specific Background Photo */}
                <div
                  className="crm-ac-bg"
                  style={{
                    backgroundImage: `url(${feat.image})`,
                  }}
                />
                <div className="crm-ac-overlay" />

                <span className="crm-vl">{feat.title}</span>

                <div className="crm-bd">
                  <span className="crm-feat-tag">{feat.tag}</span>
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
          <h2>Teams love working in HYNABIZ</h2>
        </div>

        <div className="crm-cwrap done" ref={customersRef}>
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
        <style>{`
          /* Accordion Cards Feature Backgrounds & Theme Customization */
          .crm-acc {
            position: relative;
            display: flex;
            gap: 12px;
            height: 380px;
          }

          .crm-ac {
            position: relative;
            flex: 1;
            min-width: 0;
            overflow: hidden;
            cursor: pointer;
            border-radius: 18px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            background: #0B0F17;
            transition: flex 0.65s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.4s, box-shadow 0.45s;
          }

          .crm-ac.open {
            flex: 5.5;
            border-color: var(--theme-c, #00C2FF);
            box-shadow: 0 20px 60px var(--theme-glow, rgba(0, 194, 255, 0.25));
          }

          .crm-ac-bg {
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center;
            opacity: 0.35;
            filter: saturate(1.2);
            transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
            transform: scale(1);
          }

          .crm-ac.open .crm-ac-bg {
            opacity: 0.65;
            transform: scale(1.05);
          }

          .crm-ac-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to top,
              rgba(11, 15, 23, 0.96) 0%,
              rgba(11, 15, 23, 0.82) 45%,
              rgba(11, 15, 23, 0.4) 100%
            );
            transition: background 0.5s ease;
          }

          .crm-ac.open .crm-ac-overlay {
            background: linear-gradient(
              to top,
              rgba(11, 15, 23, 0.98) 0%,
              rgba(11, 15, 23, 0.80) 50%,
              color-mix(in srgb, var(--theme-c, #00C2FF) 15%, transparent) 100%
            );
          }

          .crm-ac .crm-vl {
            position: absolute;
            left: 50%;
            top: 50%;
            white-space: nowrap;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 13px;
            font-weight: 700;
            color: #ffffff;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
            transform: translate(-50%, -50%) rotate(-90deg);
            transition: opacity 0.3s;
            z-index: 2;
          }

          .crm-ac.open .crm-vl {
            opacity: 0;
            pointer-events: none;
          }

          .crm-ac .crm-bd {
            position: absolute;
            inset: 0;
            min-width: 340px;
            padding: 34px 30px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            opacity: 0;
            transform: translateY(14px);
            pointer-events: none;
            z-index: 3;
          }

          .crm-ac.open .crm-bd {
            opacity: 1;
            transform: none;
            pointer-events: auto;
            transition: opacity 0.5s ease 0.25s, transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) 0.25s;
          }

          .crm-bd .crm-feat-tag {
            display: inline-block;
            align-self: flex-start;
            padding: 4px 12px;
            border-radius: 99px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--theme-c, #00C2FF);
            background: color-mix(in srgb, var(--theme-c, #00C2FF) 14%, transparent);
            border: 1px solid color-mix(in srgb, var(--theme-c, #00C2FF) 30%, transparent);
            margin-bottom: 12px;
          }

          .crm-bd h3 {
            margin: 0 0 10px;
            font-size: 28px;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: -0.02em;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
          }

          .crm-bd p {
            margin: 0;
            font-size: 15px;
            line-height: 1.6;
            color: #D1D5DB;
            max-width: 520px;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
          }
          /* Networks Section - Exactly fits screen height so top & bottom lines fit the screen */
          .crm-footer {
            min-height: 100vh !important;
            min-height: 100dvh !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            box-sizing: border-box !important;
            padding: clamp(40px, 6vh, 80px) 20px !important;
            border-top: 1px solid var(--line) !important;
            border-bottom: 1px solid var(--line) !important;
            position: relative !important;
            width: 100% !important;
          }

          /* CTA Section - Full Screen Fit */
          .crm-cta-sec {
            min-height: 100vh !important;
            min-height: 100dvh !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            box-sizing: border-box !important;
          }

          /* Networks Card Dimension & Spacing */
          .crm-soc {
            width: min(660px, 94vw) !important;
            height: 260px !important;
          }

          /* Proportionate Quarter-Circle Layers to guarantee zero overlap with text */
          .crm-soc .p1 { width: 48% !important; height: 58% !important; }
          .crm-soc .p2 { width: 36% !important; height: 44% !important; }
          .crm-soc .p3 { width: 24% !important; height: 30% !important; }
          .crm-soc .p4 { width: 14% !important; height: 16% !important; }

          /* Networks Box Right Content Column (Our Networks + Description) */
          .crm-soc-right-col {
            position: absolute;
            left: 50%;
            top: 58%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 90%;
            max-width: 440px;
            pointer-events: none;
            transition: all 0.65s cubic-bezier(0.2, 0.9, 0.2, 1);
            z-index: 6;
          }

          .crm-soc-right-col .sl {
            position: static !important;
            transform: none !important;
            background: none;
            border: 0;
            padding: 0;
            color: #ffffff;
            font: 800 24px/1.2 'Plus Jakarta Sans', sans-serif;
            letter-spacing: -0.01em;
            cursor: pointer;
            white-space: nowrap;
            pointer-events: auto;
          }

          .crm-soc-right-col .crm-soc-desc {
            margin: 10px 0 0 0;
            font-size: 13.5px;
            line-height: 1.45;
            color: #94a3b8;
            font-weight: 500;
          }

          .crm-soc.open .crm-soc-right-col {
            left: auto;
            right: 28px;
            top: 24px;
            transform: none;
            align-items: flex-end;
            text-align: right;
            width: auto;
            max-width: 260px;
          }

          .crm-soc.open .crm-soc-right-col .sl {
            font-size: 24px;
            text-align: right;
          }

          .crm-soc.open .crm-soc-right-col .crm-soc-desc {
            text-align: right;
            margin-top: 8px;
            font-size: 13.5px;
            line-height: 1.45;
            color: #94a3b8;
          }

          /* Pricing Grid Container */
          .crm-pricing-grid {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            gap: 24px;
            max-width: 1240px;
            margin: 0 auto;
            padding: 0 20px;
            width: 100%;
          }

          @media (min-width: 640px) {
            .crm-pricing-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (min-width: 1024px) {
            .crm-pricing-grid {
              grid-template-columns: repeat(4, minmax(0, 1fr));
              gap: 24px;
            }
          }

          /* Animated Roaming Border Card for Pricing */
          .crm-pricing-card {
            position: relative;
            width: 100%;
            height: 100%;
            min-height: 440px;
            background: #0B0F17;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 32px 24px;
            border-radius: 20px;
            overflow: hidden;
            z-index: 1;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            /* Static clean placement: no pop-out, no scale transform, no carousel shifts */
            transform: none !important;
            transition: none !important;
          }

          /* Continuous Roaming Gradient Outline */
          .crm-pricing-card::before {
            content: '';
            position: absolute;
            width: 200%;
            height: 200%;
            background: conic-gradient(
              from 0deg,
              transparent 0deg,
              #00C2FF 70deg,
              #1AE5C4 140deg,
              transparent 210deg,
              #00C2FF 280deg,
              #1AE5C4 330deg,
              transparent 360deg
            );
            top: -50%;
            left: -50%;
            animation: crmRoamingBorder 4s linear infinite;
            z-index: -2;
          }

          @keyframes crmRoamingBorder {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Inner Dark Surface to mask the center, creating the crisp border */
          .crm-pricing-card::after {
            content: '';
            position: absolute;
            background: #0B0F17;
            inset: 2px;
            border-radius: 18px;
            z-index: -1;
          }

          .crm-pricing-card.pop::after {
            background: linear-gradient(180deg, #07262E 0%, #0B0F17 100%);
          }

          /* Elevate all inner card content above pseudo-elements */
          .crm-pricing-card > * {
            z-index: 2;
            position: relative;
          }

          .crm-pricing-card h3 {
            margin: 0 0 12px;
            font-size: 22px;
            font-weight: 700;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .crm-pricing-card .pr {
            font-size: 38px;
            font-weight: 800;
            letter-spacing: -0.03em;
            margin: 8px 0 20px;
            color: #ffffff;
            line-height: 1;
          }

          .crm-pricing-card .pr small {
            font-size: 15px;
            color: #8FA3C7;
            font-weight: 500;
            margin-left: 4px;
          }

          .crm-pricing-card ul {
            list-style: none;
            padding: 0;
            margin: 0 0 28px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            flex-grow: 1;
          }

          .crm-pricing-card li {
            margin: 0;
            color: #8FA3C7;
            font-size: 14px;
            line-height: 1.5;
            display: flex;
            align-items: flex-start;
            gap: 8px;
          }

          .crm-pricing-card li::before {
            content: '✓';
            color: #1AE5C4;
            font-weight: 700;
            font-size: 14px;
            line-height: 1.5;
          }

          .crm-pricing-card .pricing-btn {
            display: block;
            width: 100%;
            text-align: center;
            padding: 13px 20px;
            border-radius: 12px;
            border: 1px solid #3A3A3E;
            background: rgba(255, 255, 255, 0.04);
            font-weight: 600;
            font-size: 15px;
            color: #ffffff;
            text-decoration: none;
            transition: background 0.25s, color 0.25s, border-color 0.25s;
            margin-top: auto;
          }

          .crm-pricing-card .pricing-btn:hover {
            background: #00C2FF;
            color: #04141C;
            border-color: #00C2FF;
          }
        `}</style>

        <div className="crm-hd" data-aos="fade-up">
          <span>Pricing</span>
          <h2>Simple plans that grow with you</h2>
        </div>

        {/* 4-Column Straight Row Grid with Continuous Roaming Gradient Border */}
        <div className="crm-pricing-grid" data-aos="fade-up">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`crm-pricing-card ${plan.popular ? 'pop' : ''}`}
              aria-label={`${plan.name} plan`}
            >
              <div>
                <h3>
                  <span>{plan.name}</span>
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
              </div>
              <a
                href="#pricing"
                className="pricing-btn"
                onClick={(e) => { e.stopPropagation(); scrollToSection(e, 'pricing'); }}
              >
                {plan.btnText}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Networks Section */}
      <footer className="crm-footer" id="networks">
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
                <img src="/hynabiz-logo.png" alt="HYNA Biz Logo" style={{ height: '30px', width: 'auto' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                HYNA <span>BIZ</span>
              </div>
            </div>

            <div className="crm-soc-right-col">
              <button className="sl" aria-expanded={isSocOpen}>
                Our Networks
              </button>
              <p className="crm-soc-desc">
                Be part of the HynaBiz and stay inspired by our latest updates, ideas, and achievements.
              </p>
            </div>

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
      </footer>

      {/* Call-To-Action (CTA) Section - At Very Bottom After Networks */}
      <section
        className="crm-cta-sec relative overflow-hidden py-20 px-6 text-center flex flex-col items-center justify-center bg-black"
        style={{
          backgroundColor: '#000000',
        }}
        data-aos="fade-up"
      >
        {/* Subtle Radial Top Glow / Gradient */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] lg:w-[1100px] h-[360px]"
          style={{
            background: 'radial-gradient(circle 450px at 50% 0%, rgba(0, 194, 255, 0.2), rgba(26, 229, 196, 0.06) 50%, transparent 80%)',
          }}
          aria-hidden="true"
        />

        {/* Subtle Accent Top Border / Divider */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0, 194, 255, 0.35) 50%, transparent)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center pt-6">
          {/* Main Heading - Matched strictly to Sales page CTA font size & style */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Experience how HynaBiz can set your sales team up for success today.
          </h2>

          {/* Subtitle - Matched to Sales page scale */}
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of modern B2B enterprises that are already closing deals faster and smarter.
          </p>

          {/* Primary CTA Button */}
          <button
            type="button"
            className="px-10 py-5 bg-white text-gray-900 hover:bg-gray-200 rounded-full font-bold text-lg transition-all shadow-xl shadow-white/10 flex items-center justify-center gap-2 mx-auto cursor-pointer group"
            onClick={(e) => scrollToSection(e, 'pricing')}
            aria-label="Start your free trial"
          >
            <span>Start your free trial</span>
            <ChevronRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

          {/* Micro-copy */}
          <p className="mt-6 text-sm text-gray-500">
            No credit card required. 14-day free trial.
          </p>

          {/* Copyright notice at very bottom */}
          <div className="crm-copy" style={{ marginTop: '52px', width: '100%', borderTop: '1px solid var(--line)', paddingTop: '20px' }}>
            © 2026 HYNA Studio. All rights reserved.
          </div>
        </div>
      </section>
    </div>
  );
};

export default CRM;
