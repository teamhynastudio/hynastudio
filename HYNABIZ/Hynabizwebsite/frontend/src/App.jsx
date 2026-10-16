import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CRM from './pages/CRM';
import CrmPage from './pages/CrmPage';
import CRMUnified from './pages/CRMUnified';
import Sales from './pages/Sales';
import Quotations from './pages/Quotations';
import Inventory from './pages/Inventory';
import Finance from './pages/Finance';
import BusinessOperations from './pages/BusinessOperations';
import DiscoverBusinesses from './pages/DiscoverBusinesses';
import Suppliers from './pages/Suppliers';
import Manufacturers from './pages/Manufacturers';
import Distributors from './pages/Distributors';
import Customers from './pages/Customers';
import BusinessPartners from './pages/BusinessPartners';
import ProductDiscovery from './pages/ProductDiscovery';
import TradeOpportunities from './pages/TradeOpportunities';
import BusinessEnquiries from './pages/BusinessEnquiries';
import OrdersAndDeals from './pages/OrdersAndDeals';
import HynaBizAI from './pages/HynaBizAI';
import BusinessInsights from './pages/BusinessInsights';
import SmartWorkflows from './pages/SmartWorkflows';
import ReportsAndAnalytics from './pages/ReportsAndAnalytics';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const mainContentRef = useRef(null);
  const footerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (!mainContentRef.current || !footerRef.current) return;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    let ctx;
    const timer = setTimeout(() => {
      const mainEl = mainContentRef.current;
      const footerEl = footerRef.current;

      if (mainEl && footerEl) {
        ctx = gsap.context(() => {
          gsap.timeline({
            scrollTrigger: {
              trigger: mainEl,
              start: 'bottom bottom',
              end: () => `+=${footerEl.offsetHeight}`,
              pin: true,
              pinSpacing: false,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }).fromTo(
            mainEl,
            { scale: 1, opacity: 1 },
            { scale: 0.88, opacity: 0.5, ease: 'none' }
          );
        });

        ScrollTrigger.refresh();

        mainEl.querySelectorAll('img').forEach((img) => {
          if (!img.complete) {
            img.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
          }
        });
      }
    }, 250);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (ctx) ctx.revert();
    };
  }, [location.pathname]);

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content-flow" ref={mainContentRef}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crm" element={<CrmPage />} />
          <Route path="/crm-page" element={<CrmPage />} />
          <Route path="/hynabiz/crm" element={<CrmPage />} />
          <Route path="/hynabiz/crm-page" element={<CrmPage />} />
          <Route path="/crm-workspace" element={<CRM />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/quotations" element={<Quotations />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/business-operations" element={<BusinessOperations />} />
          <Route path="/discover-businesses" element={<DiscoverBusinesses />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/manufacturers" element={<Manufacturers />} />
          <Route path="/distributors" element={<Distributors />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/business-partners" element={<BusinessPartners />} />
          <Route path="/product-discovery" element={<ProductDiscovery />} />
          <Route path="/trade-opportunities" element={<TradeOpportunities />} />
          <Route path="/business-enquiries" element={<BusinessEnquiries />} />
          <Route path="/orders-deals" element={<OrdersAndDeals />} />
          <Route path="/hynabiz-ai" element={<HynaBizAI />} />
          <Route path="/business-insights" element={<BusinessInsights />} />
          <Route path="/smart-workflows" element={<SmartWorkflows />} />
          <Route path="/reports-analytics" element={<ReportsAndAnalytics />} />
        </Routes>
      </main>
      <div className="footer-stack-panel" ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/hynabiz">
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
