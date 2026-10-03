import os
import re

targets = [
  "BusinessEnquiries.jsx",
  "BusinessInsights.jsx",
  "BusinessOperations.jsx",
  "BusinessPartners.jsx",
  "Customers.jsx",
  "DiscoverBusinesses.jsx",
  "Distributors.jsx",
  "Finance.jsx",
  "HynaBizAI.jsx",
  "Inventory.jsx",
  "Manufacturers.jsx",
  "OrdersAndDeals.jsx",
  "ProductDiscovery.jsx",
  "Quotations.jsx",
  "ReportsAndAnalytics.jsx",
  "SmartWorkflows.jsx",
  "Suppliers.jsx",
  "TradeOpportunities.jsx"
]

blueprint_imports = """import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import InternalPageCurve from '../components/InternalPageCurve';
"""

blueprint_hooks = """
  // Animation Refs
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const actionsRef = useRef(null);

  useEffect(() => {
    const navbarEl = document.querySelector('.navbar');
    if (navbarEl) {
      gsap.set(navbarEl, { opacity: 0, y: -20 });
    }

    const ctx = gsap.context(() => {
      // Delay 1.4s waits for the InternalPageCurve to finish its 1.4s drop
      const tl = gsap.timeline({ delay: 1.4, defaults: { ease: 'power3.out' } });

      if (navbarEl) {
        tl.to(navbarEl, { 
          opacity: 1, 
          y: 0, 
          duration: 0.65, 
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(navbarEl, { clearProps: 'y,transform' });
          }
        });
      }

      tl.fromTo(headlineRef.current, 
        { 
          opacity: 0, 
          y: 25, 
          filter: 'blur(16px)',
          color: 'rgba(255,255,255,0)',
          textShadow: '0 10px 20px rgba(0,0,0,0.8)'
        }, 
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          color: '#ffffff',
          textShadow: 'none',
          duration: 0.9, 
          ease: 'power2.out' 
        },
        navbarEl ? '+=0.05' : 0
      )
      .fromTo(subheadlineRef.current, 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 
        '-=0.4'
      )
      .fromTo(actionsRef.current, 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 
        '-=0.3'
      );
    });

    return () => {
      ctx.revert();
      if (navbarEl) {
        gsap.set(navbarEl, { clearProps: 'all' });
      }
    };
  }, []);
"""

blueprint_hero_style = """      <style>{`
        /* Uiverse.io Get Started Button by Javierrocadev - Compact & Proportional */
        .uiverse-btn {
          position: relative;
          background-color: #262626;
          height: 48px;
          width: 170px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 12px;
          padding: 0 16px;
          color: #f9fafb;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.01em;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          overflow: hidden;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: all 0.4s ease;
          box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.5);
        }

        .uiverse-btn-text {
          position: relative;
          z-index: 20;
          transition: color 0.4s ease;
        }

        .uiverse-btn-icon {
          position: relative;
          z-index: 20;
          transition: transform 0.4s ease, color 0.4s ease;
        }

        /* Violet Glowing Orb (Before) */
        .uiverse-btn::before {
          content: '';
          position: absolute;
          width: 28px;
          height: 28px;
          right: 2px;
          top: 2px;
          z-index: 10;
          background-color: #8b5cf6;
          border-radius: 50%;
          filter: blur(10px);
          transition: all 0.4s ease;
          pointer-events: none;
        }

        /* Rose Glowing Orb (After) */
        .uiverse-btn::after {
          content: '';
          position: absolute;
          width: 44px;
          height: 44px;
          right: 14px;
          top: 6px;
          z-index: 10;
          background-color: #fda4af;
          border-radius: 50%;
          filter: blur(12px);
          transition: all 0.4s ease;
          pointer-events: none;
        }

        /* Hover States */
        .uiverse-btn:hover {
          border-color: #fda4af;
          color: #fda4af;
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-thickness: 2px;
          box-shadow: 0 8px 25px -4px rgba(162, 28, 175, 0.45);
        }

        .uiverse-btn:hover .uiverse-btn-icon {
          transform: translateX(3px);
          color: #fda4af;
        }

        .uiverse-btn:hover::before {
          right: 22px;
          top: auto;
          bottom: -16px;
          box-shadow: 12px 12px 16px 18px #a21caf;
          filter: blur(14px);
        }

        .uiverse-btn:hover::after {
          right: -16px;
        }
      `}</style>"""

def build_hero_section(title, subtitle):
    return f"""      {blueprint_hero_style}
      <section className="relative pt-[calc(var(--navbar-height,80px)+40px)] pb-64 px-6 overflow-hidden min-h-screen flex flex-col justify-start items-center text-center">
        <InternalPageCurve />
        <div className="max-w-[1100px] w-full mx-auto flex flex-col items-center relative z-10 font-sans">
          <h1 ref={{headlineRef}} className="text-[clamp(32px,4.3vw,54px)] leading-[1.15] font-[800] tracking-[-0.025em] text-white mb-[20px] whitespace-normal lg:whitespace-nowrap">
            {title}
          </h1>
          <p ref={{subheadlineRef}} className="text-[19px] font-normal max-w-[640px] leading-[1.6] text-[#94a3b8] tracking-[-0.01em] mx-auto mt-0 mb-0">
            {subtitle}
          </p>
          <div ref={{actionsRef}} className="flex justify-center w-full mt-[28px]">
            <button className="uiverse-btn">
              <span className="uiverse-btn-text">Get Started</span>
              <ArrowRight size={{18}} className="uiverse-btn-icon" />
            </button>
          </div>
        </div>
      </section>"""

def process_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Find the title and subtitle
    title_match = re.search(r'title\s*=\s*["\'](.*?)["\']', content)
    subtitle_match = re.search(r'subtitle\s*=\s*["\'](.*?)["\']', content)

    if not title_match or not subtitle_match:
        print(f"Skipping {file_path} - couldn't find PageHero props")
        return

    title = title_match.group(1)
    subtitle = subtitle_match.group(1)

    # 1. Fix imports
    # Replace the existing react import and PageHero import
    content = re.sub(r"import React[^;]*;\n", "", content)
    content = re.sub(r"import PageHero[^;]*;\n", "", content)
    content = blueprint_imports + "\n" + content

    # 2. Find the component start to inject hooks
    comp_name_match = re.search(r'const (\w+)\s*=\s*\([^)]*\)\s*=>\s*{', content)
    if not comp_name_match:
        print(f"Skipping {file_path} - couldn't find component definition")
        return

    comp_name = comp_name_match.group(1)
    # Inject hooks right after component definition
    content = content.replace(f"const {comp_name} = () => {{", f"const {comp_name} = () => {{{blueprint_hooks}")

    # 3. Replace the PageHero and wrapping div
    content = re.sub(r'<PageHero[^>]*/>', build_hero_section(title, subtitle), content, flags=re.DOTALL)
    
    # 4. Also, change "page-container" to have "bg-black text-gray-300 min-h-screen font-sans selection:bg-cyan-500/30" to match Sales.jsx
    content = content.replace('className="page-container"', 'className="bg-black text-gray-300 min-h-screen font-sans selection:bg-cyan-500/30"')

    with open(file_path, 'w') as f:
        f.write(content)

    print(f"Processed {file_path}")

for target in targets:
    process_file('/home/jashwin/HynaBiz/HynaBiz_Web/hynastudio/HYNABIZ/Hynabizwebsite/frontend/src/pages/' + target)
