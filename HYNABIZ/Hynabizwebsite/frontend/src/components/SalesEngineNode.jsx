import React, { useRef, useEffect, useState } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   SALES ENGINE – Animated PCB Circuit Diagram
   Canvas: 1240 × 444 on black background (#000000).
   Group offset: <g transform="translate(197.5, 0)"> for all chip and line coords.
   Plain SVG + CSS + minimal JS (ResizeObserver).
───────────────────────────────────────────────────────────────────────────── */

// Canvas dimensions
const CW = 1240;
const CH = 444;

// Group translation
const TX = 197.5;

// Line and Node specs (in order 1 to 8)
const NODES = [
  // Left, flowing INTO the chip
  {
    id: 'lead',
    index: 0,
    side: 'L',
    color: '#a855f7', // purple
    pathD: 'M91 75 H198 V199 H320',
    barX1: 91,
    barX2: 135,
    barY: 75,
    pinX: 335,
    pinY: 199,
    title: 'Lead Capture',
    subtitle: 'Forms, ads and inbound',
    icon: 'funnel',
  },
  {
    id: 'prospect',
    index: 1,
    side: 'L',
    color: '#22d3ee', // cyan
    pathD: 'M69 165 H176 V221 H320',
    barX1: 69,
    barX2: 113,
    barY: 165,
    pinX: 335,
    pinY: 221,
    title: 'Prospecting',
    subtitle: 'Find and enrich accounts',
    icon: 'magnifier',
  },
  {
    id: 'outreach',
    index: 2,
    side: 'L',
    color: '#facc15', // yellow
    pathD: 'M46 255 H142 V243 H320',
    barX1: 46,
    barX2: 90,
    barY: 255,
    pinX: 335,
    pinY: 243,
    title: 'Outreach',
    subtitle: 'Sequences on every channel',
    icon: 'plane',
  },
  {
    id: 'meetings',
    index: 3,
    side: 'L',
    color: '#4ade80', // green
    pathD: 'M91 356 H198 V266 H320',
    barX1: 91,
    barX2: 135,
    barY: 356,
    pinX: 335,
    pinY: 266,
    title: 'Meetings',
    subtitle: 'Demos booked for you',
    icon: 'calendar',
  },
  // Right, flowing OUT of the chip
  {
    id: 'pipeline',
    index: 4,
    side: 'R',
    color: '#22d3ee', // cyan
    pathD: 'M525 199 H603 V64 H755',
    barX1: 711,
    barX2: 755,
    barY: 64,
    pinX: 502,
    pinY: 199,
    title: 'Pipeline',
    subtitle: 'Stages and deal health',
    icon: 'bars',
  },
  {
    id: 'proposals',
    index: 5,
    side: 'R',
    color: '#4ade80', // green
    pathD: 'M525 221 H626 V143 H800',
    barX1: 756,
    barX2: 800,
    barY: 143,
    pinX: 502,
    pinY: 221,
    title: 'Proposals',
    subtitle: 'Quotes with live margin',
    icon: 'document',
  },
  {
    id: 'closing',
    index: 6,
    side: 'R',
    color: '#fb5a3c', // red
    pathD: 'M525 244 H777',
    barX1: 733,
    barX2: 777,
    barY: 244,
    pinX: 502,
    pinY: 244,
    title: 'Closing',
    subtitle: 'Approvals and signatures',
    icon: 'pen',
  },
  {
    id: 'revenue',
    index: 7,
    side: 'R',
    color: '#facc15', // yellow
    pathD: 'M525 267 H614 V345 H732',
    barX1: 688,
    barX2: 732,
    barY: 345,
    pinX: 502,
    pinY: 267,
    title: 'Revenue',
    subtitle: 'Invoices and forecasts',
    icon: 'trend',
  },
];

// Card & Pin constants
const CARD_W = 200;
const CARD_H = 64;
const PIN_W = 9;
const PIN_H = 12;
const PIN_RX = 3;

// Animation timing
const CYCLE_TIME = 3.8; // seconds
const STAGGER = 0.45;   // seconds per index

/* ── ICONS ──────────────────────────────────────────────────────────────────── */
function NodeIcon({ type, color }) {
  const strokeProps = {
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (type) {
    case 'funnel':
      return (
        <svg viewBox="0 0 20 20" fill="none" width="20" height="20" aria-hidden="true">
          <path d="M3 4h14l-5.5 6.5v5l-3-1.5V10.5L3 4z" {...strokeProps} fill={color + '18'} />
        </svg>
      );
    case 'magnifier':
      return (
        <svg viewBox="0 0 20 20" fill="none" width="20" height="20" aria-hidden="true">
          <circle cx="8" cy="8" r="5" {...strokeProps} fill={color + '18'} />
          <line x1="12" y1="12" x2="17" y2="17" {...strokeProps} />
        </svg>
      );
    case 'plane':
      return (
        <svg viewBox="0 0 20 20" fill="none" width="20" height="20" aria-hidden="true">
          <path d="M2 10L18 4 14 10 18 16 2 10z" {...strokeProps} fill={color + '18'} />
          <line x1="14" y1="10" x2="8" y2="10" {...strokeProps} />
        </svg>
      );
    case 'calendar':
      return (
        <svg viewBox="0 0 20 20" fill="none" width="20" height="20" aria-hidden="true">
          <rect x="3" y="4" width="14" height="13" rx="2" {...strokeProps} fill={color + '18'} />
          <line x1="7" y1="2" x2="7" y2="6" {...strokeProps} />
          <line x1="13" y1="2" x2="13" y2="6" {...strokeProps} />
          <polyline points="6.5,11 9,13.5 14,8.5" {...strokeProps} />
        </svg>
      );
    case 'bars':
      return (
        <svg viewBox="0 0 20 20" fill="none" width="20" height="20" aria-hidden="true">
          <rect x="3" y="10" width="3" height="7" rx="1" fill={color} opacity="0.8" />
          <rect x="8.5" y="6" width="3" height="11" rx="1" fill={color} opacity="0.8" />
          <rect x="14" y="12" width="3" height="5" rx="1" fill={color} opacity="0.8" />
        </svg>
      );
    case 'document':
      return (
        <svg viewBox="0 0 20 20" fill="none" width="20" height="20" aria-hidden="true">
          <path d="M5 3h7l3 3v11a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z" {...strokeProps} fill={color + '18'} />
          <path d="M12 3v3h3" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="7" y1="9" x2="13" y2="9" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
          <line x1="7" y1="12" x2="13" y2="12" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
          <line x1="7" y1="15" x2="11" y2="15" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case 'pen':
      return (
        <svg viewBox="0 0 20 20" fill="none" width="20" height="20" aria-hidden="true">
          <path d="M14 2l4 4-9 9H5v-4L14 2z" {...strokeProps} fill={color + '18'} />
          <line x1="3" y1="18" x2="17" y2="18" {...strokeProps} />
        </svg>
      );
    case 'trend':
      return (
        <svg viewBox="0 0 20 20" fill="none" width="20" height="20" aria-hidden="true">
          <polyline points="2,15 6,10 10,12 14,6 18,3" {...strokeProps} />
          <polyline points="13.5,3 18,3 18,7.5" {...strokeProps} />
        </svg>
      );
    default:
      return null;
  }
}

/* ── NODE CARD ───────────────────────────────────────────────────────────────── */
function NodeCard({ node, isHovered, onHover }) {
  const isLeft = node.side === 'L';

  // Left cards: right edge sits 8px before bar left end (bar x1 + 197.5 - 8)
  // Right cards: left edge sits 8px after bar right end (bar x2 + 197.5 + 8)
  const left = isLeft
    ? node.barX1 + TX - 8 - CARD_W
    : node.barX2 + TX + 8;

  // Vertical centre = bar's y
  const top = node.barY - CARD_H / 2;

  const slideAnim = isLeft ? 'se-slide-in-left' : 'se-slide-in-right';
  const delayMs = 200 + node.index * 90;

  return (
    <div
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        width: `${CARD_W}px`,
        height: `${CARD_H}px`,
        borderRadius: '16px',
        background: 'linear-gradient(160deg, #141414 0%, #0a0a0a 100%)',
        border: `1px solid ${isHovered ? node.color + '66' : '#262626'}`,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '0 14px',
        boxSizing: 'border-box',
        cursor: 'default',
        boxShadow: isHovered
          ? `0 0 0 1px ${node.color}33, 0 10px 24px -6px ${node.color}44`
          : '0 4px 14px rgba(0,0,0,0.4)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
        animation: `${slideAnim} 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) ${delayMs}ms both`,
        willChange: 'transform, opacity',
        zIndex: 2,
        userSelect: 'none',
      }}
    >
      {/* 38px icon tile, radius 11 */}
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '11px',
          flexShrink: 0,
          background: `color-mix(in srgb, ${node.color} 12%, #0a0a0a)`,
          border: `1px solid color-mix(in srgb, ${node.color} 26%, transparent)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <NodeIcon type={node.icon} color={node.color} />
      </div>

      {/* Title & Subtitle */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#f2f2f2',
            lineHeight: 1.25,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {node.title}
        </div>
        <div
          style={{
            fontSize: '11px',
            color: '#8a8a8a',
            marginTop: '4px',
            lineHeight: 1.25,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {node.subtitle}
        </div>
      </div>
    </div>
  );
}

/* ── SALES ENGINE COMPONENT ─────────────────────────────────────────────────── */
export default function SalesEngineNode() {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [hoveredId, setHoveredId] = useState(null);

  /* Responsive scale logic:
     Scale canvas with transform: scale(s), origin top left, where
     s = min(1, containerWidth / 1240). Update s with ResizeObserver.
     Wrapper height = 444 * s. */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleResize = () => {
      const containerWidth = el.clientWidth;
      if (containerWidth > 0) {
        setScale(Math.min(1, containerWidth / CW));
      }
    };

    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  return (
    <section
      style={{
        background: '#000000',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Sales Engine diagram"
    >
      {/* ── Section Title ── */}
      <div style={{ textAlign: 'center', marginBottom: '48px', padding: '0 24px' }}>
        <h2
          style={{
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.025em',
            marginBottom: '12px',
            lineHeight: 1.2,
          }}
        >
          How the Sales Engine works
        </h2>
        <p
          style={{
            fontSize: '17px',
            color: '#9ca3af',
            maxWidth: '520px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Every prospect, touchpoint, and deal converted automatically through one intelligent system.
        </p>
      </div>

      {/* ── Scoped Keyframe Styles ── */}
      <style>{`
        /* Card entry animations */
        @keyframes se-slide-in-left {
          from { opacity: 0; transform: translateX(-18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes se-slide-in-right {
          from { opacity: 0; transform: translateX(18px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Pulse traveller: 6 to -100 dashoffset */
        @keyframes se-pulse-travel {
          from { stroke-dashoffset: 6; }
          to   { stroke-dashoffset: -100; }
        }

        /* End-bar flash: left at 0%, right at ~90% */
        @keyframes se-bar-flash-left {
          0%   { opacity: 1; stroke-width: 4.5px; }
          9%   { opacity: 0.55; stroke-width: 3px; }
          100% { opacity: 0.55; stroke-width: 3px; }
        }
        @keyframes se-bar-flash-right {
          0%   { opacity: 0.55; stroke-width: 3px; }
          86%  { opacity: 0.55; stroke-width: 3px; }
          92%  { opacity: 1; stroke-width: 4.5px; }
          100% { opacity: 0.55; stroke-width: 3px; }
        }

        /* Pin glow: left at ~90% (arrival), right at ~0% (departure) */
        @keyframes se-pin-glow-left {
          0%   { filter: drop-shadow(0 0 0 transparent); opacity: 0.7; }
          85%  { filter: drop-shadow(0 0 0 transparent); opacity: 0.7; }
          92%  { filter: drop-shadow(0 0 5px currentColor); opacity: 1; }
          100% { filter: drop-shadow(0 0 0 transparent); opacity: 0.7; }
        }
        @keyframes se-pin-glow-right {
          0%   { filter: drop-shadow(0 0 5px currentColor); opacity: 1; }
          10%  { filter: drop-shadow(0 0 0 transparent); opacity: 0.7; }
          100% { filter: drop-shadow(0 0 0 transparent); opacity: 0.7; }
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .se-pulse-path { display: none !important; }
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* ── Container with width: 100% and overflow: hidden ── */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* Height-controlled wrapper: 444 * s */}
        <div
          style={{
            position: 'relative',
            width: `${CW * scale}px`,
            height: `${CH * scale}px`,
            flexShrink: 0,
            margin: '0 auto',
          }}
        >
          {/* Fixed 1240 x 444 Canvas with transform: scale(s), origin top left */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${CW}px`,
              height: `${CH}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              background: '#000000',
              overflow: 'hidden',
            }}
          >
            {/* SVG Layer: chip, lines, bars, pins */}
            <svg
              viewBox={`0 0 ${CW} ${CH}`}
              width={CW}
              height={CH}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${CW}px`,
                height: `${CH}px`,
                display: 'block',
              }}
              aria-hidden="true"
            >
              <defs>
                {/* Chip Gradient: #2e2e2e to #121212 */}
                <linearGradient id="seChipGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2e2e2e" />
                  <stop offset="100%" stopColor="#121212" />
                </linearGradient>

                {/* Silver Text Gradient: #e8e8e8 to #9a9a9a */}
                <linearGradient id="seSilverGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e8e8e8" />
                  <stop offset="100%" stopColor="#9a9a9a" />
                </linearGradient>
              </defs>

              {/* All chip and line coordinates sit in a group translated by x=197.5 */}
              <g transform={`translate(${TX}, 0)`}>

                {/* 1. Base Circuit Lines (1.5px, #3a3a3a, no fill, square corners) */}
                {NODES.map((node) => {
                  const isHovered = hoveredId === node.id;
                  return (
                    <path
                      key={`base-line-${node.id}`}
                      d={node.pathD}
                      fill="none"
                      stroke={isHovered ? node.color : '#3a3a3a'}
                      strokeWidth={isHovered ? 2 : 1.5}
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                      style={{
                        transition: 'stroke 0.25s ease, stroke-width 0.25s ease',
                      }}
                    />
                  );
                })}

                {/* 2. Pulse Travellers (pathLength=100, stroke 2.5px, stroke-dasharray "6 94") */}
                {NODES.map((node) => {
                  const delay = `${node.index * STAGGER}s`;
                  return (
                    <path
                      key={`pulse-${node.id}`}
                      className="se-pulse-path"
                      d={node.pathD}
                      fill="none"
                      stroke={node.color}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength="100"
                      strokeDasharray="6 94"
                      style={{
                        animation: `se-pulse-travel ${CYCLE_TIME}s linear infinite`,
                        animationDelay: delay,
                        filter: `drop-shadow(0 0 3px ${node.color})`,
                      }}
                    />
                  );
                })}

                {/* 3. Coloured End Bars (44px, 3px, round caps, node colour, opacity .55) */}
                {NODES.map((node) => {
                  const isLeft = node.side === 'L';
                  const isHovered = hoveredId === node.id;
                  const delay = `${node.index * STAGGER}s`;
                  const flashAnim = isLeft ? 'se-bar-flash-left' : 'se-bar-flash-right';

                  return (
                    <line
                      key={`bar-${node.id}`}
                      x1={node.barX1}
                      y1={node.barY}
                      x2={node.barX2}
                      y2={node.barY}
                      stroke={node.color}
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.55"
                      style={{
                        animation: `${flashAnim} ${CYCLE_TIME}s linear infinite`,
                        animationDelay: delay,
                        filter: isHovered ? `drop-shadow(0 0 6px ${node.color})` : 'none',
                        transition: 'filter 0.25s ease',
                      }}
                    />
                  );
                })}

                {/* 4. CHIP: Rounded rect x=320 y=170 w=205 h=126 rx=30 */}
                <rect
                  x="320"
                  y="170"
                  width="205"
                  height="126"
                  rx="30"
                  ry="30"
                  fill="url(#seChipGradient)"
                  stroke="#2c2c2c"
                  strokeWidth="3"
                />

                {/* Faint inner outline */}
                <rect
                  x="322"
                  y="172"
                  width="201"
                  height="122"
                  rx="28"
                  ry="28"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.06)"
                  strokeWidth="1"
                />

                {/* Text "Sales Engine" only, centred at x=422.5 y=239, Arial bold 22px */}
                <text
                  x="422.5"
                  y="239"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="Arial, sans-serif"
                  fontSize="22"
                  fontWeight="bold"
                  fill="url(#seSilverGradient)"
                >
                  Sales Engine
                </text>

                {/* 5. 8 Small Pins (9 x 12, rx 3): left at x=335, right at x=502 */}
                {NODES.map((node) => {
                  const isLeft = node.side === 'L';
                  const isHovered = hoveredId === node.id;
                  const delay = `${node.index * STAGGER}s`;
                  const pinGlowAnim = isLeft ? 'se-pin-glow-left' : 'se-pin-glow-right';

                  // Vertically centred on the line it connects to: y = pinY - 6
                  const pinRectY = node.pinY - PIN_H / 2;

                  return (
                    <rect
                      key={`pin-${node.id}`}
                      x={node.pinX}
                      y={pinRectY}
                      width={PIN_W}
                      height={PIN_H}
                      rx={PIN_RX}
                      ry={PIN_RX}
                      fill={node.color}
                      color={node.color}
                      opacity={isHovered ? 1 : 0.7}
                      style={{
                        animation: `${pinGlowAnim} ${CYCLE_TIME}s linear infinite`,
                        animationDelay: delay,
                        filter: isHovered ? `drop-shadow(0 0 6px ${node.color})` : undefined,
                        transition: 'opacity 0.25s ease, filter 0.25s ease',
                      }}
                    />
                  );
                })}

              </g>
            </svg>

            {/* HTML Node Cards (absolutely positioned over the canvas, 200 x 64) */}
            {NODES.map((node) => (
              <NodeCard
                key={`card-${node.id}`}
                node={node}
                isHovered={hoveredId === node.id}
                onHover={setHoveredId}
              />
            ))}

          </div>
        </div>
      </div>

      {/* ── Centred Grey 12px Caption ── */}
      <p
        style={{
          textAlign: 'center',
          color: '#8a8a8a',
          fontSize: '12px',
          marginTop: '20px',
          marginBottom: 0,
          fontFamily: 'inherit',
          letterSpacing: '0.01em',
        }}
      >
        Hover a node to follow its line into the engine
      </p>
    </section>
  );
}
