import React, { useState, useRef, useEffect } from 'react';
import {
  Zap,
  FileText,
  Shield,
  Sliders,
  TrendingUp,
  Link2,
  ArrowRight,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   FEATURE CARDS REVEAL COMPONENT (Compact Size)
   Specifications:
   - Container max-width: 980px, grid gap: 16px
   - Middle column offset (every 3n+2 card): 32px
   - Tablet (max 900px): 2 columns, every even card pushed down 24px
   - Phone (max 560px): 1 column, no offsets
   - Card height: 270px, radius: 20px, background: #0b101c
   - Front Face: Icon tile 56x56, radius 16px, icon 24px, gap 12px, title 18px bold
   - Revealed Face: gap 8px, title 19px (800), desc 12.5px (1.5 lh), stat 26px,
     divider padding-top 10px, margin-top 4px
   - Resting circles:
     Circle 1: top -125px, left -58px, 128 x 170px
     Circle 2: bottom -108px, right -58px, 136 x 162px
   - Hover fill: All six cards fill with var(--fill) (#c084fc)
───────────────────────────────────────────────────────────────────────────── */

const CARDS_DATA = [
  {
    num: '01',
    color: '#22d3ee',
    tag: 'SPEED',
    title: 'AI Match Scoring',
    desc: 'Instantly identify the best-fit vendors and buyers with intelligent percentage scoring.',
    stat: '94%',
    statLabel: 'best-fit match',
    Icon: Zap,
  },
  {
    num: '02',
    color: '#34d399',
    tag: 'SCALE',
    title: 'Instant Quotations',
    desc: 'Generate professional, data-backed proposals in minutes, not hours.',
    stat: '5 min',
    statLabel: 'to a finished proposal',
    Icon: FileText,
  },
  {
    num: '03',
    color: '#a5b4fc',
    tag: 'SECURE',
    title: 'High Security',
    desc: 'Enterprise-grade encryption and secure deal rooms for peace of mind.',
    stat: '256-bit',
    statLabel: 'encryption',
    Icon: Shield,
  },
  {
    num: '04',
    color: '#c084fc',
    tag: 'ADAPT',
    title: 'Flexible Workflows',
    desc: "Automate your approval pipelines and tailor routing to your team's needs.",
    stat: '3x',
    statLabel: 'faster approvals',
    Icon: Sliders,
  },
  {
    num: '05',
    color: '#f472b6',
    tag: 'PROFIT',
    title: 'Real-time Margins',
    desc: 'Dynamic pricing models give you live margin insights before you send a quote.',
    stat: '+18%',
    statLabel: 'margin uplift',
    Icon: TrendingUp,
  },
  {
    num: '06',
    color: '#fbbf24',
    tag: 'CONNECT',
    title: 'Seamless Integrations',
    desc: 'Connect effortlessly with your existing CRM, ERP, and payment systems.',
    stat: '100+',
    statLabel: 'connected apps',
    Icon: Link2,
  },
];

export default function FeatureCardsReveal() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const gridRef = useRef(null);

  // IntersectionObserver: threshold 0.2, 0.8s entrance staggered by 120ms col & 80ms row
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle(index);
    }
  };

  return (
    <>
      <style>{`
        :root {
          --fill: #c084fc;
        }

        /* ── GRID LAYOUT (2 straight rows of 3, max-width 980px, gap 16px) ── */
        .fcr-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          align-items: stretch;
          max-width: 980px;
          margin: 0 auto;
          width: 100%;
        }

        /* Phone (max-width 760px): 1 column, same 16px gap, no offsets */
        @media (max-width: 760px) {
          .fcr-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 16px;
          }
        }

        /* ── CARD BASE (Height 270px, radius 20px) ── */
        .fcr-card {
          height: 270px;
          border-radius: 20px;
          overflow: hidden;
          background: #0b101c;
          border: 1px solid color-mix(in srgb, var(--c) 22%, #1d2640);
          cursor: pointer;
          position: relative;
          min-width: 0;
          width: 100%;
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .fcr-card:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 3px;
        }

        /* Scroll entrance */
        .fcr-card-enter {
          opacity: 0;
          transform: translateY(24px);
        }
        .fcr-card-visible {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1),
                      transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* ── THE HOVER MECHANIC (Corner Circles - Scaled for 270px card) ── */
        /* Circle 1: rest top -125px, left -58px, 128 x 170px, 50% radius */
        .fcr-circle-1 {
          position: absolute;
          top: -125px;
          left: -58px;
          width: 128px;
          height: 170px;
          border-radius: 50%;
          background: color-mix(in srgb, var(--c) 16%, #0b101c);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          z-index: 1;
        }

        /* Circle 2: rest bottom -108px, right -58px, 136 x 162px, 50% radius */
        .fcr-circle-2 {
          position: absolute;
          bottom: -108px;
          right: -58px;
          width: 136px;
          height: 162px;
          border-radius: 50%;
          background: color-mix(in srgb, var(--c) 11%, #0b101c);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transition-delay: 0.05s;
          pointer-events: none;
          z-index: 1;
        }

        /* Faint dotted pattern (1px dots, 16px grid, accent at 50%) fading from top-right */
        .fcr-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, color-mix(in srgb, var(--c) 50%, transparent) 1px, transparent 1px);
          background-size: 16px 16px;
          opacity: 0.3;
          mask-image: radial-gradient(circle at top right, black 20%, transparent 75%);
          -webkit-mask-image: radial-gradient(circle at top right, black 20%, transparent 75%);
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          z-index: 1;
        }

        /* Hover / Focus / Open State - ALL cards fill with var(--fill) purple */
        .fcr-card:hover,
        .fcr-card:focus-visible,
        .fcr-card.open {
          border-color: var(--fill);
          box-shadow: 0 24px 60px color-mix(in srgb, var(--fill) 28%, transparent);
        }

        .fcr-card:hover .fcr-circle-1,
        .fcr-card:focus-visible .fcr-circle-1,
        .fcr-card.open .fcr-circle-1 {
          top: -35%;
          left: -35%;
          width: 170%;
          height: 170%;
          background: color-mix(in srgb, var(--fill) 65%, #fff);
        }

        .fcr-card:hover .fcr-circle-2,
        .fcr-card:focus-visible .fcr-circle-2,
        .fcr-card.open .fcr-circle-2 {
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
          border-radius: 0;
          background: var(--fill);
        }

        .fcr-card:hover .fcr-dots,
        .fcr-card:focus-visible .fcr-dots,
        .fcr-card.open .fcr-dots {
          opacity: 0;
        }

        /* ── FRONT FACE (Top row sits 16px from top and 18px from sides; bottom 16px) ── */
        .fcr-front {
          position: absolute;
          inset: 0;
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          z-index: 2;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .fcr-card:hover .fcr-front,
        .fcr-card:focus-visible .fcr-front,
        .fcr-card.open .fcr-front {
          opacity: 0;
          transform: translateY(-12px);
          pointer-events: none;
        }

        .fcr-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .fcr-tag-pill {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: var(--c);
          background: color-mix(in srgb, var(--c) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--c) 28%, transparent);
          padding: 3px 9px;
          border-radius: 9999px;
          line-height: 1.2;
        }

        .fcr-num {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.2);
          line-height: 1;
        }

        .fcr-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin: auto 0;
        }

        /* Icon tile 56 x 56, radius 16px - all icons use var(--fill) */
        .fcr-icon-tile {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: color-mix(in srgb, var(--fill) 12%, #080c14);
          border: 1px solid color-mix(in srgb, var(--fill) 28%, #080c14);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .fcr-icon-ring {
          position: absolute;
          inset: -1px;
          border-radius: 16px;
          border: 1px solid var(--fill);
          animation: fcrRing 3s ease-out infinite;
          pointer-events: none;
        }

        .fcr-icon-svg {
          color: var(--fill);
          animation: fcrFloat 4s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes fcrFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        @keyframes fcrRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.35); opacity: 0; }
        }

        /* Gap between tile and title 12px, title 18px bold */
        .fcr-title {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin-top: 12px;
          line-height: 1.25;
        }

        /* Hover hint bottom 16px */
        .fcr-bottom-hint {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
        }

        .fcr-arrow {
          display: inline-block;
          animation: fcrArrow 1.8s ease-in-out infinite;
        }

        @keyframes fcrArrow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }

        /* ── REVEALED FACE (Inner padding 18px, gap 8px) ── */
        .fcr-revealed {
          position: absolute;
          inset: 0;
          padding: 18px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 8px;
          z-index: 3;
          opacity: 0;
          transform: translateY(18px);
          pointer-events: none;
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .fcr-card:hover .fcr-revealed,
        .fcr-card:focus-visible .fcr-revealed,
        .fcr-card.open .fcr-revealed {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
          transition-delay: 0.22s;
        }

        .fcr-revealed-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: #06121b;
          background: rgba(255, 255, 255, 0.33);
          padding: 3px 9px;
          border-radius: 9999px;
          align-self: flex-start;
          line-height: 1.2;
          margin: 0;
        }

        .fcr-revealed-title {
          font-size: 19px;
          font-weight: 800;
          color: #06121b;
          line-height: 1.2;
          margin: 0;
        }

        .fcr-revealed-desc {
          font-size: 12.5px;
          font-weight: 500;
          line-height: 1.5;
          color: #06121b;
          opacity: 0.9;
          margin: 0;
        }

        /* Divider: margin-top 4px, padding-top 10px */
        .fcr-divider {
          border: none;
          border-top: 1px solid rgba(6, 18, 27, 0.2);
          margin-top: 4px;
          padding-top: 10px;
          width: 100%;
        }

        .fcr-stat-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin: 0;
        }

        .fcr-stat-val {
          font-size: 26px;
          font-weight: 800;
          color: #06121b;
          line-height: 1;
        }

        .fcr-stat-label {
          font-size: 12px;
          font-weight: 600;
          color: #06121b;
          opacity: 0.85;
          line-height: 1.2;
        }

        /* ── PREFERS REDUCED MOTION ── */
        @media (prefers-reduced-motion: reduce) {
          .fcr-circle-1,
          .fcr-circle-2,
          .fcr-front,
          .fcr-revealed,
          .fcr-card,
          .fcr-card-visible {
            transition: none !important;
            animation: none !important;
          }
          .fcr-icon-ring,
          .fcr-icon-svg,
          .fcr-arrow {
            animation: none !important;
          }
        }
      `}</style>

      <div className="fcr-grid" ref={gridRef}>
        {CARDS_DATA.map((card, idx) => {
          const isOpen = openIndex === idx;
          const col = idx % 3;
          const row = Math.floor(idx / 3);
          const delayMs = col * 120 + row * 80;

          return (
            <div
              key={card.num}
              tabIndex={0}
              role="button"
              aria-label={card.title}
              aria-expanded={isOpen}
              onClick={() => handleToggle(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`fcr-card ${isOpen ? 'open' : ''} ${
                isVisible ? 'fcr-card-visible' : 'fcr-card-enter'
              }`}
              style={{
                '--c': card.color,
                transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
              }}
            >
              {/* Decorative Corner Circles (scaled) */}
              <div className="fcr-circle-1" aria-hidden="true" />
              <div className="fcr-circle-2" aria-hidden="true" />

              {/* Faint Dotted Pattern */}
              <div className="fcr-dots" aria-hidden="true" />

              {/* Front Face (Shown at rest, fades up and out on hover) */}
              <div className="fcr-front">
                <div className="fcr-top-row">
                  <span className="fcr-tag-pill">{card.tag}</span>
                  <span className="fcr-num">{card.num}</span>
                </div>

                <div className="fcr-center">
                  <div className="fcr-icon-tile">
                    <span className="fcr-icon-ring" aria-hidden="true" />
                    <div className="fcr-icon-svg">
                      <card.Icon size={24} strokeWidth={1.8} />
                    </div>
                  </div>
                  <h3 className="fcr-title">{card.title}</h3>
                </div>

                <div className="fcr-bottom-hint">
                  <span>Hover to explore</span>
                  <span className="fcr-arrow" aria-hidden="true">
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>

              {/* Revealed Face (Fades in at bottom after circles grow) */}
              <div className="fcr-revealed">
                <span className="fcr-revealed-tag">{card.tag}</span>
                <h3 className="fcr-revealed-title">{card.title}</h3>
                <p className="fcr-revealed-desc">{card.desc}</p>
                <div className="fcr-divider" />
                <div className="fcr-stat-row">
                  <span className="fcr-stat-val">{card.stat}</span>
                  <span className="fcr-stat-label">{card.statLabel}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
