import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
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
  Settings
} from 'lucide-react';
import './ProductPreview.css';

const ProductPreview = () => {
  const dashboardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create subtle floating/parallax effect on mousemove
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;
        
        gsap.to('.dashboard-wrapper', {
          rotationY: xPos,
          rotationX: -yPos,
          ease: 'power2.out',
          transformPerspective: 1500,
          transformOrigin: 'center center'
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      // Initial animation for panels
      gsap.from('.dash-sidebar', { x: -20, opacity: 0, duration: 0.8, delay: 1.2, ease: 'power3.out' });
      gsap.from('.dash-header', { y: -20, opacity: 0, duration: 0.8, delay: 1.4, ease: 'power3.out' });
      gsap.from('.metric-card', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, delay: 1.6, ease: 'power3.out' });
      gsap.from('.dash-timeline', { opacity: 0, duration: 1, delay: 2, ease: 'power2.out' });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    }, dashboardRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="product-preview" ref={dashboardRef}>
      <div className="dashboard-wrapper">
        
        <div className="dash-sidebar">
          <div className="dash-logo">
            <span className="logo-hyna">HYNA</span><span className="logo-biz text-blue">Biz</span>
          </div>
          
          <div className="dash-nav">
            <div className="dash-nav-item active"><LayoutDashboard size={16} /> Overview</div>
            <div className="dash-nav-item"><Briefcase size={16} /> Business</div>
            <div className="dash-nav-item"><Users size={16} /> Connections</div>
            <div className="dash-nav-item"><UserSquare2 size={16} /> CRM</div>
            <div className="dash-nav-item"><MessageSquare size={16} /> Enquiries</div>
            <div className="dash-nav-item"><FileText size={16} /> Quotations</div>
            <div className="dash-nav-item"><ShoppingCart size={16} /> Orders</div>
            <div className="dash-nav-item"><Workflow size={16} /> Automation</div>
          </div>
        </div>
        
        <div className="dash-main">
          <div className="dash-header">
            <div className="dash-greeting">
              <h3>Good morning, Alex</h3>
              <p className="text-muted" style={{ fontSize: '13px' }}>Here's your business overview.</p>
            </div>
            
            <div className="dash-header-actions">
              <div className="dash-search">
                <Search size={14} className="text-muted" />
                <span>Search businesses...</span>
              </div>
              <Bell size={18} className="text-muted" />
              <Settings size={18} className="text-muted" />
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
        
      </div>
    </div>
  );
};

export default ProductPreview;
