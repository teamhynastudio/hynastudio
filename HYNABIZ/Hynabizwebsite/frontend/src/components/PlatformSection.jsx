import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Compass, 
  Users, 
  MessageSquare, 
  ArrowLeftRight, 
  CreditCard, 
  TrendingUp, 
  Check, 
  ArrowRight 
} from 'lucide-react';
import './PlatformSection.css';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    id: 'discover',
    category: 'DISCOVER',
    title: 'Find the right opportunities',
    description: 'Discover businesses, products, suppliers, buyers, industries, and new markets.',
    icon: Compass,
    details: [
      'Businesses & Suppliers',
      'Products & Services',
      'Buyers & Opportunities',
      'Industry Discovery',
      'Global Markets'
    ]
  },
  {
    id: 'connect',
    category: 'CONNECT',
    title: 'Build business relationships',
    description: 'Connect with the right people and turn introductions into meaningful business relationships.',
    icon: Users,
    details: [
      'Business Network',
      'Direct Communication',
      'Partnerships',
      'Business Requests',
      'Relationship Management'
    ]
  },
  {
    id: 'engage',
    category: 'ENGAGE',
    title: 'Turn conversations into opportunities',
    description: 'Keep every enquiry, conversation, requirement, and follow-up connected.',
    icon: MessageSquare,
    details: [
      'Business Enquiries',
      'CRM',
      'Conversations',
      'Follow-ups',
      'Sales Pipeline'
    ]
  },
  {
    id: 'trade',
    category: 'TRADE',
    title: 'Move from opportunity to trade',
    description: 'Manage quotations, negotiations, trade opportunities, and commercial workflows in one place.',
    icon: ArrowLeftRight,
    details: [
      'Buy Requests',
      'Sell Offers',
      'Quotations',
      'Negotiations',
      'Import & Export',
      'Trade Documents'
    ]
  },
  {
    id: 'transact',
    category: 'TRANSACT',
    title: 'Complete the business transaction',
    description: 'Keep orders, payments, deliveries, and transaction information connected to the relationship.',
    icon: CreditCard,
    details: [
      'Orders',
      'Payments',
      'Transaction Records',
      'Delivery Tracking',
      'Business Documents'
    ]
  },
  {
    id: 'grow',
    category: 'GROW',
    title: 'Turn every transaction into growth',
    description: 'Use business intelligence and relationship history to identify what comes next.',
    icon: TrendingUp,
    details: [
      'Business Intelligence',
      'Relationship Memory',
      'Performance Insights',
      'Customer Retention',
      'New Opportunities'
    ]
  }
];

const PlatformSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.fromTo('.platform-header > *',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.platform-header',
            start: 'top 85%'
          }
        }
      );

      // Cards staggered reveal
      gsap.fromTo('.platform-card',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.platform-grid',
            start: 'top 80%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="platform-section" id="platform" ref={sectionRef}>
      <div className="container platform-container">
        
        {/* Header */}
        <div className="platform-header">
          <h2 className="platform-main-heading">
            Everything your business needs, connected in one system.
          </h2>
          <p className="platform-subheading">
            From discovering opportunities to building relationships, trading, and growing — HynaBiz brings the complete business journey together.
          </p>
        </div>

        {/* 3 x 2 Feature Cards Grid */}
        <div className="platform-grid">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.id} className="platform-card">
                <div className="platform-card-top">
                  <div className="platform-icon-box">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <span className="platform-category-label">
                    {feature.category}
                  </span>
                </div>

                <div className="platform-card-body">
                  <h3 className="platform-card-title">{feature.title}</h3>
                  <p className="platform-card-desc">{feature.description}</p>

                  <div className="platform-divider"></div>

                  <ul className="platform-details-list">
                    {feature.details.map((item, idx) => (
                      <li key={idx} className="platform-detail-item">
                        <span className="platform-check-wrap">
                          <Check size={13} strokeWidth={2.5} />
                        </span>
                        <span className="platform-detail-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="platform-card-footer">
                  <a href={`#${feature.id}`} className="platform-explore-btn">
                    <span>Explore</span>
                    <ArrowRight size={14} className="platform-explore-arrow" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PlatformSection;
