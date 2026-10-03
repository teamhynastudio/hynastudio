import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CRM from './pages/CRM';
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

function App() {
  return (
    <BrowserRouter basename="/hynabiz">
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crm" element={<CRM />} />
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
      </div>
    </BrowserRouter>
  );
}

export default App;
