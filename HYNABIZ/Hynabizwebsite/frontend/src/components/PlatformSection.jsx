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
      // Timeline for smooth entrance animation on scroll (stays fully visible once revealed)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.platform-header',
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      });

      tl.fromTo('.platform-main-heading',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          ease: 'power2.out',
          clearProps: 'all'
        }
      )
      .fromTo('.platform-subheading',
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          ease: 'power2.out',
          clearProps: 'all'
        },
        '-=0.45'
      )
      .fromTo('.platform-marquee-wrapper',
        { opacity: 0, y: 35 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power2.out' 
        },
        '-=0.4'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Duplicate the 6 features to create an unbroken seamless right-to-left marquee
  const marqueeFeatures = [...FEATURES, ...FEATURES];

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

      </div>

      {/* Full-width Single-line Right-to-Left Marquee */}
      <div className="platform-marquee-wrapper">
        <div className="platform-marquee-track">
          {marqueeFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={`${feature.id}-${idx}`} className="platform-card">
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
                    {feature.details.map((item, dIdx) => (
                      <li key={dIdx} className="platform-detail-item">
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
