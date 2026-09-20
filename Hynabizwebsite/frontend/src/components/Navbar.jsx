import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const navbarRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50 && !isScrolled) {
        setIsScrolled(true);
        gsap.to(navbarRef.current, {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          borderBottom: '1px solid rgba(11, 18, 32, 0.05)',
          padding: '15px 0',
          duration: 0.3,
          ease: 'power2.out'
        });
      } else if (scrollY <= 50 && isScrolled) {
        setIsScrolled(false);
        gsap.to(navbarRef.current, {
          backgroundColor: 'transparent',
          backdropFilter: 'none',
          boxShadow: 'none',
          borderBottom: '1px solid transparent',
          padding: '25px 0',
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  return (
    <nav ref={navbarRef} className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo">
          <span className="logo-hyna">HYNA</span>
          <span className="logo-biz">Biz</span>
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
          <button className="btn btn-primary">Get Started</button>
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
