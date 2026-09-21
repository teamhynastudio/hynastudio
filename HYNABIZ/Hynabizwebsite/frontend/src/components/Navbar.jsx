import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const navbarRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav ref={navbarRef} className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="navbar-logo">
          <img src="/hynabiz-logo.png" alt="HynaBiz Logo" className="logo-img" />
          <span className="logo-hyna">HYNA</span><span className="logo-biz">Biz</span>
        </div>

        <div className="navbar-links desktop-only">
          <div className="nav-item">
            Platform <ChevronDown size={14} className="nav-icon" />
          </div>
          <div className="nav-item">
            Connections <ChevronDown size={14} className="nav-icon" />
          </div>
          <div className="nav-item">CRM</div>
          <div className="nav-item">
            Trade <ChevronDown size={14} className="nav-icon" />
          </div>
          <div className="nav-item">Automation</div>
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
    </nav>
  );
};

export default Navbar;
