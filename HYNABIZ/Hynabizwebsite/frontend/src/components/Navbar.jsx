import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronDown, Briefcase, Users, ShoppingCart, Workflow, ArrowRight } from 'lucide-react';
import './Navbar.css';

const PLATFORM_SECTIONS = [
  {
    title: 'Business Management',
    icon: Briefcase,
    items: [
      { name: 'CRM' },
      { name: 'Sales' },
      { name: 'Quotations' },
      { name: 'Inventory' },
      { name: 'Finance' },
      { name: 'Business Operations' },
    ]
  },
  {
    title: 'Business Network',
    icon: Users,
    items: [
      { name: 'Discover Businesses' },
      { name: 'Suppliers' },
      { name: 'Manufacturers' },
      { name: 'Distributors' },
      { name: 'Customers' },
      { name: 'Business Partners' },
    ]
  },
  {
    title: 'Trade & Commerce',
    icon: ShoppingCart,
    items: [
      { name: 'Product Discovery' },
      { name: 'Trade Opportunities' },
      { name: 'Business Enquiries' },
      { name: 'Orders & Deals' },
    ]
  },
  {
    title: 'AI Intelligence & Automation',
    icon: Workflow,
    items: [
      { name: 'HynaBiz AI', badge: 'AI' },
      { name: 'Business Insights' },
      { name: 'Smart Workflows' },
      { name: 'Reports & Analytics' },
    ]
  }
];

const Navbar = () => {
  const navbarRef = useRef(null);
  const platformButtonRef = useRef(null);
  const platformMenuRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);

  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsPlatformOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsPlatformOpen(false);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        platformMenuRef.current &&
        !platformMenuRef.current.contains(e.target) &&
        platformButtonRef.current &&
        !platformButtonRef.current.contains(e.target)
      ) {
        setIsPlatformOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsPlatformOpen(false);
      }
    };

    if (isPlatformOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlatformOpen]);

  return (
    <nav ref={navbarRef} className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="navbar-logo">
          <img src="/hynabiz-logo.png" alt="HynaBiz Logo" className="logo-img" />
          <span className="logo-hyna">HYNA</span><span className="logo-biz">Biz</span>
        </div>

        <div className="navbar-links desktop-only">
          <div 
            ref={platformButtonRef}
            className={`nav-item ${isPlatformOpen ? 'active' : ''}`}
            onClick={() => setIsPlatformOpen(!isPlatformOpen)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="button"
            tabIndex={0}
            aria-expanded={isPlatformOpen}
          >
            Platform <ChevronDown size={14} className={`nav-icon ${isPlatformOpen ? 'rotated' : ''}`} />
          </div>
          <div className="nav-item">
            Connections <ChevronDown size={14} className="nav-icon" />
          </div>
          <div className="nav-item">Automation</div>
          <a href="#pricing" className="nav-item">Pricing</a>
        </div>

        <div className="navbar-actions desktop-only">
          <button className="btn-text">Sign in</button>
          <button className="btn btn-primary">Sign up</button>
        </div>

        <button 
          className="mobile-menu-btn mobile-only"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Platform Mega Menu Dropdown */}
      <div 
        ref={platformMenuRef} 
        className={`platform-dropdown-menu ${isPlatformOpen ? 'open' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="platform-dropdown-grid">
            {PLATFORM_SECTIONS.map((section, idx) => {
              const SectionIcon = section.icon;
              return (
                <div key={idx} className="platform-dropdown-col">
                  <div className="platform-col-header">
                    <div className="platform-col-icon">
                      <SectionIcon size={15} />
                    </div>
                    <span className="platform-col-title">{section.title}</span>
                  </div>

                  <ul className="platform-col-list">
                    {section.items.map((item, itemIdx) => (
                      <li 
                        key={itemIdx} 
                        className="platform-col-item"
                        onClick={() => setIsPlatformOpen(false)}
                      >
                        <span className="platform-item-name">{item.name}</span>
                        {item.badge && <span className="platform-item-badge">{item.badge}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="platform-dropdown-footer">
            <div className="platform-footer-brand">
              <span className="platform-footer-dot"></span>
              <span>One platform. Every part of your business connected.</span>
            </div>
            <a href="#explore" className="platform-footer-action" onClick={() => setIsPlatformOpen(false)}>
              Explore Platform <ArrowRight size={14} />
            </a>
          </div>
        </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="navbar-mobile-drawer">
          <div 
            className="mobile-nav-item"
            onClick={() => setIsPlatformOpen(!isPlatformOpen)}
          >
            <span>Platform</span>
            <ChevronDown size={16} className={`nav-icon ${isPlatformOpen ? 'rotated' : ''}`} />
          </div>
          {isPlatformOpen && (
            <div className="mobile-platform-accordion">
              <div className="mobile-platform-tagline">One platform. Every part of your business connected.</div>
              {PLATFORM_SECTIONS.map((sec, i) => (
                <div key={i} className="mobile-sec">
                  <div className="mobile-sec-title">{sec.title}</div>
                  <div className="mobile-sec-items">
                    {sec.items.map((it, j) => (
                      <span key={j} className="mobile-sec-item">{it.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mobile-nav-item">Connections</div>
          <div className="mobile-nav-item">Automation</div>
          <a href="#pricing" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
          <div className="mobile-nav-actions">
            <button className="btn-text" style={{ width: '100%', textAlign: 'center', padding: '10px' }}>Sign in</button>
            <button className="btn btn-primary" style={{ width: '100%' }}>Sign up</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
