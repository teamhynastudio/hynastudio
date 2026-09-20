import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Users, UserSquare2, ShoppingCart, Workflow } from 'lucide-react';
import './PlatformSection.css';

gsap.registerPlugin(ScrollTrigger);

const platformData = [
  {
    id: 'business',
    title: 'Your business, organized.',
    desc: 'Create one workspace for the people, information and activity that keep your business moving.',
    icon: <Briefcase size={16} />,
    mockupText: 'Business Profile & Team Activity UI'
  },
  {
    id: 'connections',
    title: 'Find businesses. Build relationships.',
    desc: 'Discover suppliers, manufacturers, distributors, retailers, partners and customers.',
    icon: <Users size={16} />,
    mockupText: 'Business Discovery & Filtering UI'
  },
  {
    id: 'crm',
    title: 'Know every customer and connection.',
    desc: 'Organize contacts, customers, conversations and follow-ups. Keep the relationship history connected.',
    icon: <UserSquare2 size={16} />,
    mockupText: 'Relationship CRM & Timeline UI'
  },
  {
    id: 'trade',
    title: 'From enquiry to order.',
    desc: 'Handle enquiries, quotations, orders and business workflows without leaving the workspace.',
    icon: <ShoppingCart size={16} />,
    mockupText: 'Quotation Builder & Order UI'
  },
  {
    id: 'automation',
    title: 'Let routine work move automatically.',
    desc: 'Reduce repetitive work and keep business processes moving. Trigger actions when events happen.',
    icon: <Workflow size={16} />,
    mockupText: 'Workflow Builder UI'
  }
];

function PlatformSection() {
  const [activeTab, setActiveTab] = useState(platformData[0]);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.platform-headline', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8
      });

      gsap.from('.platform-tab', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6
      });

      gsap.from('.platform-content-area', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        opacity: 0,
        y: 40,
        scale: 0.98,
        duration: 0.8
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleTabClick = (tab) => {
    if (tab.id === activeTab.id) return;
    
    // Animate out
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      onComplete: () => {
        setActiveTab(tab);
        // Animate in
        gsap.fromTo(contentRef.current, 
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    });
  };

  return (
    <section className="platform-section" ref={sectionRef}>
      <h2 className="platform-headline">One platform. Everything around your business.</h2>
      
      <div className="platform-container">
        <div className="platform-tabs">
          {platformData.map((tab) => (
            <button
              key={tab.id}
              className={`platform-tab ${activeTab.id === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.icon} {tab.id.charAt(0).toUpperCase() + tab.id.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="platform-content-area">
          <div ref={contentRef} style={{ width: '100%' }}>
            <div className="platform-content-header">
              <h3 className="platform-content-title">{activeTab.title}</h3>
              <p className="platform-content-desc">{activeTab.desc}</p>
            </div>
            
            <div className="platform-ui-mockup">
              {activeTab.mockupText}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlatformSection;
