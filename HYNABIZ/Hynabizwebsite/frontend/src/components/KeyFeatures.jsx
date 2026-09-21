import React from 'react';
import './KeyFeatures.css';

const KeyFeatures = () => {
  return (
    <section className="kf-section" id="features">
      <div className="kf-container">
        
        {/* Top Header */}
        <div className="kf-header">
          <div className="kf-badge">
            <svg className="kf-star-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>Business Relationship & Trade Network</span>
          </div>

          <h2 className="kf-headline">
            Built for connection, trade, and growth.
          </h2>

          <p className="kf-subtext">
            HynaBiz brings businesses, relationships, opportunities, and transactions together in one connected business infrastructure.
          </p>
        </div>

        {/* 6-Card 3x2 Grid */}
        <div className="kf-grid-6">
          
          {/* Card 1: Discover Businesses */}
          <div className="kf-card">
            <div className="kf-card-graphic">
              <svg viewBox="0 0 340 170" className="kf-svg-graphic" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dotPatternMap" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#71717A" opacity="0.65" />
                  </pattern>
                </defs>

                {/* World Landmass Silhouettes */}
                <g fill="url(#dotPatternMap)">
                  <path d="M25,22 Q45,18 70,28 Q90,42 80,70 Q70,85 55,90 Q40,85 35,65 Q25,48 25,22 Z" />
                  <path d="M40,28 Q65,20 85,35 Q95,55 85,78 Q65,90 50,84 Q30,68 40,28 Z" />
                  <path d="M75,18 Q105,14 115,32 Q105,48 90,45 Q75,38 75,18 Z" />
                  <path d="M75,95 Q100,100 105,120 Q100,150 85,165 Q75,150 70,128 Q68,110 75,95 Z" />
                  <path d="M150,22 Q180,18 185,42 Q175,60 160,60 Q145,50 150,22 Z" />
                  <path d="M145,68 Q185,65 190,95 Q185,138 165,155 Q150,132 142,100 Q140,80 145,68 Z" />
                  <path d="M190,18 Q240,14 285,28 Q305,50 295,80 Q265,90 240,75 Q215,80 200,55 Q185,38 190,18 Z" />
                  <path d="M260,118 Q295,114 300,138 Q285,155 260,150 Q250,138 260,118 Z" />
                  <circle cx="280" cy="95" r="3" fill="#A1A1AA" />
                  <circle cx="295" cy="100" r="2.5" fill="#A1A1AA" />
                  <circle cx="235" cy="122" r="2" fill="#A1A1AA" />
                </g>

                {/* Radar Scan & Markers */}
                <circle cx="170" cy="85" r="45" stroke="#00C2FF" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
                <circle cx="170" cy="85" r="2" fill="#00C2FF" />
                <circle cx="170" cy="85" r="75" stroke="#3F3F46" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.4" />
                <circle cx="85" cy="55" r="3" fill="#00C2FF" />
                <circle cx="85" cy="55" r="7" stroke="#00C2FF" strokeWidth="0.8" opacity="0.5" />
                <circle cx="225" cy="45" r="3" fill="#FACC15" />
                <circle cx="225" cy="45" r="7" stroke="#FACC15" strokeWidth="0.8" opacity="0.5" />
              </svg>
            </div>
            
            <div className="kf-card-content">
              <div className="kf-card-title-row">
                <span className="kf-card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </span>
                <h3 className="kf-card-title">Discover Businesses</h3>
              </div>
              <p className="kf-card-desc">
                Find the right businesses, buyers, suppliers, products, and markets faster.
              </p>
            </div>
          </div>

          {/* Card 2: Build Connections */}
          <div className="kf-card">
            <div className="kf-card-graphic">
              <svg viewBox="0 0 340 170" className="kf-svg-graphic" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Connected Nodes Matrix */}
                <g transform="translate(170, 85)">
                  <circle cx="0" cy="0" r="38" stroke="#52525B" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.7" />
                  <ellipse cx="0" cy="0" rx="38" ry="16" stroke="#3F3F46" strokeWidth="1" opacity="0.6" />
                  <ellipse cx="0" cy="0" rx="16" ry="38" stroke="#3F3F46" strokeWidth="1" opacity="0.6" />

                  {/* Radiating Links to Nodes */}
                  <line x1="-28" y1="-26" x2="-62" y2="-45" stroke="#52525B" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="28" y1="-26" x2="65" y2="-42" stroke="#52525B" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="38" y1="0" x2="75" y2="8" stroke="#52525B" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="26" y1="28" x2="58" y2="50" stroke="#52525B" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="-26" y1="28" x2="-58" y2="50" stroke="#52525B" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="-38" y1="0" x2="-72" y2="5" stroke="#52525B" strokeWidth="1" strokeDasharray="2 2" />

                  {/* Node Badges */}
                  <g transform="translate(-68, -48)">
                    <circle cx="0" cy="0" r="12" fill="#18181B" stroke="#00C2FF" strokeWidth="1" />
                    <circle cx="0" cy="-2" r="3" stroke="#D4D4D8" strokeWidth="1" fill="none" />
                    <path d="M-4 6 C-4 2 4 2 4 6" stroke="#D4D4D8" strokeWidth="1" fill="none" />
                  </g>
                  <g transform="translate(70, -44)">
                    <circle cx="0" cy="0" r="12" fill="#18181B" stroke="#52525B" strokeWidth="1" />
                    <circle cx="0" cy="-2" r="3" stroke="#D4D4D8" strokeWidth="1" fill="none" />
                    <path d="M-4 6 C-4 2 4 2 4 6" stroke="#D4D4D8" strokeWidth="1" fill="none" />
                  </g>
                  <g transform="translate(80, 10)">
                    <circle cx="0" cy="0" r="12" fill="#18181B" stroke="#00C2FF" strokeWidth="1" />
                    <rect x="-4" y="-4" width="8" height="8" rx="2" stroke="#D4D4D8" strokeWidth="1" fill="none" />
                  </g>
                  <g transform="translate(62, 54)">
                    <circle cx="0" cy="0" r="12" fill="#18181B" stroke="#52525B" strokeWidth="1" />
                    <circle cx="0" cy="0" r="3" fill="#FACC15" />
                  </g>
                  <g transform="translate(-62, 54)">
                    <circle cx="0" cy="0" r="12" fill="#18181B" stroke="#52525B" strokeWidth="1" />
                    <path d="M-3 0 L0 3 L4 -2" stroke="#D4D4D8" strokeWidth="1" fill="none" />
                  </g>
                  <g transform="translate(-76, 5)">
                    <circle cx="0" cy="0" r="12" fill="#18181B" stroke="#00C2FF" strokeWidth="1" />
                    <rect x="-4" y="-5" width="8" height="10" rx="1.5" stroke="#D4D4D8" strokeWidth="1" fill="none" />
                  </g>
                </g>
              </svg>
            </div>

            <div className="kf-card-content">
              <div className="kf-card-title-row">
                <span className="kf-card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </span>
                <h3 className="kf-card-title">Build Connections</h3>
              </div>
              <p className="kf-card-desc">
                Turn business discovery into meaningful relationships and long-term partnerships.
              </p>
            </div>
          </div>

          {/* Card 3: Capture Opportunities */}
          <div className="kf-card">
            <div className="kf-card-graphic">
              <svg viewBox="0 0 340 170" className="kf-svg-graphic" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(170, 85)">
                  {/* Central Pulse Hub */}
                  <circle cx="0" cy="0" r="28" fill="#18181B" stroke="#EAB308" strokeWidth="1.2" />
                  <circle cx="0" cy="0" r="48" stroke="#EAB308" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.5" />
                  <circle cx="0" cy="0" r="68" stroke="#3F3F46" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.4" />
                  
                  {/* Center Lightning Icon */}
                  <path d="M2 -10 L-6 0 L0 0 L-2 10 L6 0 L0 0 Z" fill="#FACC15" />

                  {/* Satellite Opportunity Events */}
                  <g transform="translate(-72, -35)">
                    <rect x="-14" y="-10" width="28" height="20" rx="5" fill="#18181B" stroke="#52525B" strokeWidth="1" />
                    <path d="M-6 -2 H6 M-6 2 H2" stroke="#A1A1AA" strokeWidth="1.2" />
                  </g>
                  <line x1="-28" y1="-12" x2="-58" y2="-28" stroke="#52525B" strokeWidth="1" strokeDasharray="2 2" />

                  <g transform="translate(74, -35)">
                    <rect x="-14" y="-10" width="28" height="20" rx="5" fill="#18181B" stroke="#00C2FF" strokeWidth="1" />
                    <text x="0" y="4" textAnchor="middle" fill="#00C2FF" fontSize="9" fontWeight="bold">RFQ</text>
                  </g>
                  <line x1="28" y1="-12" x2="60" y2="-28" stroke="#52525B" strokeWidth="1" strokeDasharray="2 2" />

                  <g transform="translate(72, 38)">
                    <rect x="-14" y="-10" width="28" height="20" rx="5" fill="#18181B" stroke="#52525B" strokeWidth="1" />
                    <circle cx="0" cy="0" r="3" fill="#22C55E" />
                  </g>
                  <line x1="24" y1="18" x2="58" y2="30" stroke="#52525B" strokeWidth="1" strokeDasharray="2 2" />

                  <g transform="translate(-72, 38)">
                    <rect x="-14" y="-10" width="28" height="20" rx="5" fill="#18181B" stroke="#52525B" strokeWidth="1" />
                    <path d="M-4 0 L-1 3 L4 -3" stroke="#FACC15" strokeWidth="1.2" fill="none" />
                  </g>
                  <line x1="-24" y1="18" x2="-58" y2="30" stroke="#52525B" strokeWidth="1" strokeDasharray="2 2" />
                </g>
              </svg>
            </div>

            <div className="kf-card-content">
              <div className="kf-card-title-row">
                <span className="kf-card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#EAB308" stroke="#CA8A04" strokeWidth="1">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </span>
                <h3 className="kf-card-title">Capture Opportunities</h3>
              </div>
              <p className="kf-card-desc">
                Stay connected to enquiries, requests, opportunities, and important business activity.
              </p>
            </div>
          </div>

          {/* Card 4: Manage Trade */}
          <div className="kf-card">
            <div className="kf-card-graphic">
              <svg viewBox="0 0 340 170" className="kf-svg-graphic" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Trade Workflow: Enquiry -> Quote -> Deal -> Transact */}
                <g transform="translate(170, 85)">
                  {/* Bilateral Trade Flow Loop */}
                  <rect x="-120" y="-22" width="60" height="44" rx="8" fill="#18181B" stroke="#52525B" strokeWidth="1" />
                  <text x="-90" y="-3" textAnchor="middle" fill="#A1A1AA" fontSize="8" fontWeight="600">ENQUIRY</text>
                  <text x="-90" y="11" textAnchor="middle" fill="#00C2FF" fontSize="9" fontWeight="bold">RFQ</text>

                  {/* Flow Arrow Right */}
                  <path d="M-55 -8 H-15 M-20 -13 L-15 -8 L-20 -3" stroke="#00C2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                  <rect x="-12" y="-22" width="60" height="44" rx="8" fill="#18181B" stroke="#00C2FF" strokeWidth="1.2" />
                  <text x="18" y="-3" textAnchor="middle" fill="#A1A1AA" fontSize="8" fontWeight="600">ORDER</text>
                  <text x="18" y="11" textAnchor="middle" fill="#FACC15" fontSize="9" fontWeight="bold">TRADE</text>

                  {/* Flow Arrow Right */}
                  <path d="M52 -8 H90 M85 -13 L90 -8 L85 -3" stroke="#00C2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                  <rect x="94" y="-22" width="60" height="44" rx="8" fill="#18181B" stroke="#52525B" strokeWidth="1" />
                  <text x="124" y="-3" textAnchor="middle" fill="#A1A1AA" fontSize="8" fontWeight="600">SETTLE</text>
                  <text x="124" y="11" textAnchor="middle" fill="#22C55E" fontSize="9" fontWeight="bold">DONE</text>

                  {/* Return cycle flow */}
                  <path d="M124 28 C124 52 -90 52 -90 28" stroke="#3F3F46" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                  <circle cx="17" cy="46" r="3" fill="#00C2FF" />
                </g>
              </svg>
            </div>

            <div className="kf-card-content">
              <div className="kf-card-title-row">
                <span className="kf-card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m16 3 4 4-4 4"/>
                    <path d="M20 7H4"/>
                    <path d="m8 21-4-4 4-4"/>
                    <path d="M4 17h16"/>
                  </svg>
                </span>
                <h3 className="kf-card-title">Manage Trade</h3>
              </div>
              <p className="kf-card-desc">
                Move from enquiry to quotation, negotiation, transaction, and delivery in one workflow.
              </p>
            </div>
          </div>

          {/* Card 5: Grow with Intelligence */}
          <div className="kf-card">
            <div className="kf-card-graphic">
              <svg viewBox="0 0 340 170" className="kf-svg-graphic" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Analytics Growth Chart */}
                <g transform="translate(170, 85)">
                  {/* Grid Lines */}
                  <line x1="-120" y1="45" x2="120" y2="45" stroke="#27272A" strokeWidth="1" />
                  <line x1="-120" y1="15" x2="120" y2="15" stroke="#27272A" strokeWidth="1" strokeDasharray="2 3" />
                  <line x1="-120" y1="-15" x2="120" y2="-15" stroke="#27272A" strokeWidth="1" strokeDasharray="2 3" />
                  <line x1="-120" y1="-45" x2="120" y2="-45" stroke="#27272A" strokeWidth="1" strokeDasharray="2 3" />

                  {/* Growth Area Gradient */}
                  <defs>
                    <linearGradient id="growthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#00C2FF" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <path d="M-110 40 Q-70 30 -30 10 T50 -20 T115 -48 L115 45 L-110 45 Z" fill="url(#growthGradient)" />
                  <path d="M-110 40 Q-70 30 -30 10 T50 -20 T115 -48" stroke="#00C2FF" strokeWidth="2.5" fill="none" />

                  {/* Highlight Data Points */}
                  <circle cx="-30" cy="10" r="3.5" fill="#18181B" stroke="#00C2FF" strokeWidth="2" />
                  <circle cx="50" cy="-20" r="3.5" fill="#18181B" stroke="#FACC15" strokeWidth="2" />
                  <circle cx="115" cy="-48" r="4.5" fill="#00C2FF" stroke="#FFFFFF" strokeWidth="1.5" />

                  {/* Badge floating */}
                  <g transform="translate(65, -52)">
                    <rect x="-18" y="-10" width="36" height="18" rx="4" fill="#00C2FF" />
                    <text x="0" y="3" textAnchor="middle" fill="#000000" fontSize="9" fontWeight="800">+148%</text>
                  </g>
                </g>
              </svg>
            </div>

            <div className="kf-card-content">
              <div className="kf-card-title-row">
                <span className="kf-card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                </span>
                <h3 className="kf-card-title">Grow with Intelligence</h3>
              </div>
              <p className="kf-card-desc">
                Use connected business data and relationship insights to discover what comes next.
              </p>
            </div>
          </div>

          {/* Card 6: Build Trust + Verified Network Badge */}
          <div className="kf-card kf-card-trust-feature">
            <div className="kf-card-graphic">
              <svg viewBox="0 0 340 170" className="kf-svg-graphic" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Security Shield & Verified Seal */}
                <g transform="translate(170, 85)">
                  {/* Outer Trust Shield */}
                  <path d="M0 -55 L45 -35 V0 C45 35 0 55 0 55 C0 55 -45 35 -45 0 V-35 Z" fill="#18181B" stroke="#52525B" strokeWidth="1.2" />
                  
                  {/* Inner Glowing Shield Ring */}
                  <path d="M0 -45 L35 -30 V0 C35 28 0 44 0 44 C0 44 -35 28 -35 0 V-30 Z" stroke="#EAB308" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />

                  {/* Golden Checkmark Emblem */}
                  <circle cx="0" cy="2" r="18" fill="radial-gradient(circle, #27272A, #09090B)" stroke="#FACC15" strokeWidth="1.8" />
                  <path d="M-6 2 L-1 7 L7 -3" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

                  {/* Radiating trust rays */}
                  <line x1="-55" y1="-20" x2="-80" y2="-28" stroke="#3F3F46" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="55" y1="-20" x2="80" y2="-28" stroke="#3F3F46" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="-55" y1="15" x2="-75" y2="25" stroke="#3F3F46" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="55" y1="15" x2="75" y2="25" stroke="#3F3F46" strokeWidth="1" strokeDasharray="2 2" />
                </g>
              </svg>
            </div>

            <div className="kf-card-content">
              <div className="kf-card-title-row">
                <span className="kf-card-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <h3 className="kf-card-title">Build Trust</h3>
              </div>
              <p className="kf-card-desc">
                Create transparent business relationships with structured profiles and clear information.
              </p>

              {/* Verified Network Badge Pill */}
              <div className="kf-trust-badge-pill">
                <div className="kf-badge-circle-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#EAB308" strokeWidth="2" />
                    <path d="M8 12.5L10.5 15L16 9.5" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="kf-trust-badge-label">Verified Business Network</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default KeyFeatures;
