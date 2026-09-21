import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  UserSquare2, 
  MessageSquare, 
  FileText, 
  ShoppingCart, 
  Workflow, 
  Search, 
  Bell, 
  Settings,
  Zap,
  Building2
} from 'lucide-react';
import './ProductPreview.css';

const Sidebar = ({ activeItem }) => (
  <div className="dash-sidebar">
    <div className="dash-brand-block">
      <div className="dash-logo-box">
        <Building2 size={16} />
        <span className="dash-logo-text">Your Logo</span>
      </div>
      <div className="dash-company-info">
        <span className="dash-company-name">Your Company Name</span>
        <span className="dash-company-sub">Business Workspace</span>
      </div>
    </div>
    
    <div className="dash-nav">
      <div className={`dash-nav-item ${activeItem === 'overview' ? 'active' : ''}`}>
        <LayoutDashboard size={15} /> Overview
      </div>
      <div className={`dash-nav-item ${activeItem === 'business' ? 'active' : ''}`}>
        <Briefcase size={15} /> Business
      </div>
      <div className={`dash-nav-item ${activeItem === 'connections' ? 'active' : ''}`}>
        <Users size={15} /> Connections
      </div>
      <div className={`dash-nav-item ${activeItem === 'crm' ? 'active' : ''}`}>
        <UserSquare2 size={15} /> CRM
      </div>
      <div className={`dash-nav-item ${activeItem === 'enquiries' ? 'active' : ''}`}>
        <MessageSquare size={15} /> Enquiries
      </div>
      <div className={`dash-nav-item ${activeItem === 'quotations' ? 'active' : ''}`}>
        <FileText size={15} /> Quotations
      </div>
      <div className={`dash-nav-item ${activeItem === 'orders' ? 'active' : ''}`}>
        <ShoppingCart size={15} /> Orders
      </div>
      <div className={`dash-nav-item ${activeItem === 'automation' ? 'active' : ''}`}>
        <Workflow size={15} /> Automation
      </div>
    </div>
  </div>
);

const OverviewScreen = () => (
  <div className="dash-main">
    <div className="dash-header">
      <div className="dash-greeting">
        <h3>Good morning, Alex</h3>
        <p style={{ fontSize: '13px' }}>Here's your business overview.</p>
      </div>
      
      <div className="dash-header-actions">
        <div className="dash-search">
          <Search size={14} />
          <span>Search businesses...</span>
        </div>
        <Bell size={18} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
        <Settings size={18} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
        <div className="dash-avatar"></div>
      </div>
    </div>
    
    <div className="dash-content">
      <div className="dash-metrics">
        <div className="metric-card">
          <div className="metric-title">Open Enquiries</div>
          <div className="metric-value">12</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Active Connections</div>
          <div className="metric-value">348</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Pending Quotes</div>
          <div className="metric-value">8</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Orders</div>
          <div className="metric-value">45</div>
        </div>
      </div>
      
      <div className="dash-timeline">
        <div className="dash-panel-title">Recent Activity</div>
        <div className="timeline-item">
          <div className="timeline-dot bg-blue"></div>
          <div className="timeline-content">
            <p><strong>TechCorp Inc.</strong> accepted your quotation #Q-2041</p>
            <span className="timeline-time">10 mins ago</span>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot" style={{ backgroundColor: '#10B981' }}></div>
          <div className="timeline-content">
            <p>New connection request from <strong>Global Suppliers Ltd.</strong></p>
            <span className="timeline-time">1 hour ago</span>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot" style={{ backgroundColor: '#F59E0B' }}></div>
          <div className="timeline-content">
            <p>Automated follow-up sent to <strong>BuildRite Construction</strong></p>
            <span className="timeline-time">3 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ConnectionsScreen = () => (
  <div className="dash-main">
    <div className="dash-header">
      <div className="dash-greeting">
        <h3>Network & Connections</h3>
        <p style={{ fontSize: '13px' }}>Verified suppliers, manufacturers & buyers.</p>
      </div>
      
      <div className="dash-header-actions">
        <div className="dash-search">
          <Search size={14} />
          <span>Filter network...</span>
        </div>
        <Bell size={18} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
        <Settings size={18} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
        <div className="dash-avatar"></div>
      </div>
    </div>
    
    <div className="dash-content">
      <div className="dash-metrics">
        <div className="metric-card">
          <div className="metric-title">Verified Partners</div>
          <div className="metric-value">284</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Direct Suppliers</div>
          <div className="metric-value">142</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Active Inquiries</div>
          <div className="metric-value">19</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Network Reliability</div>
          <div className="metric-value">99.4%</div>
        </div>
      </div>
      
      <div className="dash-timeline">
        <div className="dash-panel-title">Verified Industry Partners</div>
        <div className="connections-grid">
          <div className="connection-card">
            <div className="conn-avatar" style={{ background: '#3b82f6' }}>TL</div>
            <div className="conn-info">
              <div className="conn-name-row">
                <span className="conn-name">TechLogix Precision Mfg</span>
                <span className="conn-badge verified">Verified</span>
              </div>
              <p className="conn-desc">CNC Milling, Tooling & Die-casting · Berlin</p>
              <div className="conn-meta">
                <span className="conn-rating">★ 4.9</span>
                <span className="conn-status">120+ Completed Orders</span>
              </div>
            </div>
            <button className="conn-action-btn">Connected</button>
          </div>

          <div className="connection-card">
            <div className="conn-avatar" style={{ background: '#10b981' }}>GS</div>
            <div className="conn-info">
              <div className="conn-name-row">
                <span className="conn-name">Global Spectra Distributing</span>
                <span className="conn-badge verified">Manufacturer</span>
              </div>
              <p className="conn-desc">Semiconductors, Micro-sensors & PCBs · Singapore</p>
              <div className="conn-meta">
                <span className="conn-rating">★ 4.8</span>
                <span className="conn-status">Tier 1 Direct Source</span>
              </div>
            </div>
            <button className="conn-action-btn">Message</button>
          </div>

          <div className="connection-card">
            <div className="conn-avatar" style={{ background: '#8b5cf6' }}>BM</div>
            <div className="conn-info">
              <div className="conn-name-row">
                <span className="conn-name">BioMatrix Logistics Freight</span>
                <span className="conn-badge verified">Certified</span>
              </div>
              <p className="conn-desc">Cold-chain, Air Cargo & Global Customs · Chicago</p>
              <div className="conn-meta">
                <span className="conn-rating">★ 5.0</span>
                <span className="conn-status">310+ Deliveries</span>
              </div>
            </div>
            <button className="conn-action-btn">Connected</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TradeScreen = () => (
  <div className="dash-main">
    <div className="dash-header">
      <div className="dash-greeting">
        <h3>Quotations & Trade Orders</h3>
        <p style={{ fontSize: '13px' }}>Live proposals, contracts, and order execution.</p>
      </div>
      
      <div className="dash-header-actions">
        <div className="dash-search">
          <Search size={14} />
          <span>Search orders, RFQs...</span>
        </div>
        <Bell size={18} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
        <Settings size={18} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
        <div className="dash-avatar"></div>
      </div>
    </div>
    
    <div className="dash-content">
      <div className="dash-metrics">
        <div className="metric-card">
          <div className="metric-title">Pipeline Value</div>
          <div className="metric-value">$428.5k</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Active Orders</div>
          <div className="metric-value">32</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Pending Quotes</div>
          <div className="metric-value">14</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Fulfillment Rate</div>
          <div className="metric-value">98.8%</div>
        </div>
      </div>
      
      <div className="dash-timeline">
        <div className="dash-panel-title">Active Commercial Pipeline</div>
        <div className="trade-table">
          <div className="trade-row">
            <div className="trade-col-main">
              <span className="trade-id">#ORD-9821</span>
              <div>
                <strong>Vertex Robotics Systems</strong>
                <p className="trade-sub">14x Industrial Servo Motors & Drives</p>
              </div>
            </div>
            <div className="trade-amount">$32,400.00</div>
            <span className="trade-badge bg-green">Production</span>
          </div>

          <div className="trade-row">
            <div className="trade-col-main">
              <span className="trade-id">#QUO-4412</span>
              <div>
                <strong>Pacific Coast Hardware Supply</strong>
                <p className="trade-sub">Bulk Stainless Alloy Fasteners (10k units)</p>
              </div>
            </div>
            <div className="trade-amount">$18,900.00</div>
            <span className="trade-badge bg-blue">Accepted</span>
          </div>

          <div className="trade-row">
            <div className="trade-col-main">
              <span className="trade-id">#ORD-9818</span>
              <div>
                <strong>Prime Logistics Global UK</strong>
                <p className="trade-sub">Warehouse Telematics & Gateway Hubs</p>
              </div>
            </div>
            <div className="trade-amount">$44,800.00</div>
            <span className="trade-badge bg-amber">In Review</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AutomationsScreen = () => (
  <div className="dash-main">
    <div className="dash-header">
      <div className="dash-greeting">
        <h3>Workflows &amp; Automations</h3>
        <p style={{ fontSize: '13px' }}>Smart triggers, automated pipelines &amp; instant execution.</p>
      </div>
      
      <div className="dash-header-actions">
        <div className="dash-search">
          <Search size={14} />
          <span>Search automations...</span>
        </div>
        <Bell size={18} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
        <Settings size={18} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
        <div className="dash-avatar"></div>
      </div>
    </div>
    
    <div className="dash-content">
      <div className="dash-metrics">
        <div className="metric-card">
          <div className="metric-title">Active Rules</div>
          <div className="metric-value">18</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Automated Tasks</div>
          <div className="metric-value">2,840</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Time Saved / Mo</div>
          <div className="metric-value">142 hrs</div>
        </div>
        <div className="metric-card">
          <div className="metric-title">Execution Rate</div>
          <div className="metric-value">99.9%</div>
        </div>
      </div>
      
      <div className="dash-timeline">
        <div className="dash-panel-title">Active Business Automations</div>
        <div className="automation-list">
          <div className="automation-row">
            <div className="automation-icon bg-blue-glow">
              <Zap size={16} />
            </div>
            <div className="automation-col-main">
              <div className="automation-title-row">
                <strong>Instant Quotation Auto-Follow-Up</strong>
                <span className="automation-badge bg-green">Active</span>
              </div>
              <p className="automation-sub">When quotation unopened &gt; 48 hrs &rarr; Send automated WhatsApp &amp; Email reminder</p>
            </div>
            <div className="automation-meta">
              <span className="automation-runs">428 runs</span>
              <div className="automation-toggle active">
                <span className="toggle-thumb"></span>
              </div>
            </div>
          </div>

          <div className="automation-row">
            <div className="automation-icon bg-green-glow">
              <Workflow size={16} />
            </div>
            <div className="automation-col-main">
              <div className="automation-title-row">
                <strong>High-Value RFQ Routing &amp; CRM Sync</strong>
                <span className="automation-badge bg-green">Active</span>
              </div>
              <p className="automation-sub">When inbound inquiry &gt; $10k &rarr; Auto-assign senior rep, notify Slack &amp; tag VIP</p>
            </div>
            <div className="automation-meta">
              <span className="automation-runs">892 runs</span>
              <div className="automation-toggle active">
                <span className="toggle-thumb"></span>
              </div>
            </div>
          </div>

          <div className="automation-row">
            <div className="automation-icon bg-purple-glow">
              <FileText size={16} />
            </div>
            <div className="automation-col-main">
              <div className="automation-title-row">
                <strong>Low Inventory Restock Trigger</strong>
                <span className="automation-badge bg-green">Active</span>
              </div>
              <p className="automation-sub">When stock level &lt; 15% &rarr; Generate Purchase Order draft to Tier-1 supplier</p>
            </div>
            <div className="automation-meta">
              <span className="automation-runs">215 runs</span>
              <div className="automation-toggle active">
                <span className="toggle-thumb"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TABS = [
  { id: 'connections', label: 'Connections & Network', icon: Users, component: ConnectionsScreen, activeNav: 'connections' },
  { id: 'overview', label: 'Business Overview', icon: LayoutDashboard, component: OverviewScreen, activeNav: 'overview' },
  { id: 'trade', label: 'Trade & Quotations', icon: ShoppingCart, component: TradeScreen, activeNav: 'quotations' },
  { id: 'automation', label: 'Automations', icon: Workflow, component: AutomationsScreen, activeNav: 'automation' },
];

const ProductPreview = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Automatically cycle through tabs one by one every 4 seconds
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = TABS.findIndex((t) => t.id === current);
        const nextIndex = (currentIndex + 1) % TABS.length;
        return TABS[nextIndex].id;
      });
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, activeTab]);

  const getPositionClass = (tabId) => {
    if (tabId === activeTab) return 'device-center';
    const currentIndex = TABS.findIndex(t => t.id === activeTab);
    const tabIndex = TABS.findIndex(t => t.id === tabId);
    const diff = (tabIndex - currentIndex + TABS.length) % TABS.length;
    if (diff === 1) return 'device-right';
    if (diff === TABS.length - 1) return 'device-left';
    return 'device-hidden';
  };

  return (
    <div 
      className="product-preview"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3-Tab (3-Tablet) Stage */}
      <div className="preview-stage">
        {TABS.map((tab) => {
          const ScreenComponent = tab.component;
          const posClass = getPositionClass(tab.id);
          const isCenter = posClass === 'device-center';
          return (
            <div
              key={tab.id}
              className={`preview-device ${posClass}`}
              style={{ zIndex: isCenter ? 30 : 10 }}
              onClick={() => {
                if (!isCenter) setActiveTab(tab.id);
              }}
              title={!isCenter ? `Switch to ${tab.label}` : undefined}
            >
              <div className="dashboard-wrapper">
                <div className="dash-inner-screen">
                  <Sidebar activeItem={tab.activeNav} />
                  <ScreenComponent />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tab Switcher Pills */}
      <div className="preview-nav-pills">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`preview-pill-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductPreview;
