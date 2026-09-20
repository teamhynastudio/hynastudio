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

const BusinessMockup = () => (
  <div className="business-mockup" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px', textAlign: 'left', fontSize: '14px', color: '#fff' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '48px', height: '48px', backgroundColor: '#333', borderRadius: '8px' }}></div>
        <div>
          <div style={{ fontWeight: '600', fontSize: '16px' }}>Acme Corporation</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Manufacturing &middot; San Francisco, CA</div>
        </div>
      </div>
      <button style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer' }}>Edit Profile</button>
    </div>
    <div style={{ display: 'flex', gap: '20px', flex: 1 }}>
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontWeight: '500', marginBottom: '12px', color: 'rgba(255,255,255,0.7)' }}>Recent Activity</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--hyna-blue)' }}></div>
              <div style={{ color: 'rgba(255,255,255,0.8)' }}>New product line "Titanium Valves" added to catalog</div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></div>
              <div style={{ color: 'rgba(255,255,255,0.8)' }}>Team role "Sales Manager" assigned to Sarah Chen</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontWeight: '500', marginBottom: '12px', color: 'rgba(255,255,255,0.7)' }}>Team Members</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#444' }}></div><span>Alex Rivera</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#555' }}></div><span>Sarah Chen</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#666' }}></div><span>Jordan Lee</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ConnectionsMockup = () => (
  <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px', textAlign: 'left', fontSize: '14px', color: '#fff' }}>
    <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', overflowX: 'auto' }}>
      <button style={{ padding: '6px 12px', background: 'var(--hyna-blue)', color: '#000', border: 'none', borderRadius: '16px', fontWeight: '600', cursor: 'pointer' }}>All Industries</button>
      <button style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', cursor: 'pointer' }}>Manufacturing</button>
      <button style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', cursor: 'pointer' }}>Technology</button>
      <button style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', cursor: 'pointer' }}>Retail</button>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', flex: 1 }}>
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#444', borderRadius: '4px' }}></div>
          <div>
            <div style={{ fontWeight: '600' }}>Global Suppliers Ltd.</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Wholesale &middot; New York</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>Electronics</span>
          <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>Logistics</span>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, padding: '6px', background: 'var(--hyna-blue)', color: '#000', border: 'none', borderRadius: '4px', fontWeight: '600', cursor: 'pointer' }}>Connect</button>
          <button style={{ flex: 1, padding: '6px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Profile</button>
        </div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#555', borderRadius: '4px' }}></div>
          <div>
            <div style={{ fontWeight: '600' }}>BuildRite Construction</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Construction &middot; Chicago</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>Materials</span>
          <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>Contractor</span>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, padding: '6px', background: 'var(--hyna-blue)', color: '#000', border: 'none', borderRadius: '4px', fontWeight: '600', cursor: 'pointer' }}>Connect</button>
          <button style={{ flex: 1, padding: '6px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Profile</button>
        </div>
      </div>
    </div>
  </div>
);

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
    setActiveTab(tab);
  };

  const activeIndex = platformData.findIndex(t => t.id === activeTab.id);
  const prevIndex = (activeIndex - 1 + platformData.length) % platformData.length;
  const nextIndex = (activeIndex + 1) % platformData.length;
  const farPrevIndex = (activeIndex - 2 + platformData.length) % platformData.length;
  const farNextIndex = (activeIndex + 2) % platformData.length;

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
          <div ref={contentRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="platform-content-header">
              <h3 className="platform-content-title">{activeTab.title}</h3>
              <p className="platform-content-desc">{activeTab.desc}</p>
            </div>
            
            <div className="platform-carousel">
              {platformData.map((tab, index) => {
                let positionClass = 'mockup-hidden';
                if (index === activeIndex) positionClass = 'mockup-active';
                else if (index === prevIndex) positionClass = 'mockup-prev';
                else if (index === nextIndex) positionClass = 'mockup-next';
                else if (index === farPrevIndex) positionClass = 'mockup-far-prev';
                else if (index === farNextIndex) positionClass = 'mockup-far-next';

                return (
                  <div 
                    key={tab.id}
                    className={`platform-ui-mockup ${positionClass}`}
                    onClick={() => {
                      if (positionClass !== 'mockup-active' && positionClass !== 'mockup-hidden') {
                        handleTabClick(tab);
                      }
                    }}
                  >
                    <div className="platform-ui-mockup-inner" style={(tab.id === 'business' || tab.id === 'connections') ? { padding: 0, alignItems: 'flex-start' } : { display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {tab.id === 'business' ? <BusinessMockup /> : tab.id === 'connections' ? <ConnectionsMockup /> : tab.mockupText}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlatformSection;
