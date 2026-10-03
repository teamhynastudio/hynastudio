import React from 'react';
import PageHero from '../components/PageHero';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  FileText,
  Calculator,
  Percent,
  Plus,
  Trash2,
  TrendingUp,
  Shield,
  Zap,
  MoreHorizontal
} from 'lucide-react';

const Sales = () => {
  const connections = [
    { id: 1, name: 'Acme Corp', type: 'Vendor', status: 'Active', match: '98%' },
    { id: 2, name: 'Global Tech', type: 'Buyer', status: 'Pending', match: '85%' },
    { id: 3, name: 'Stark Industries', type: 'Partner', status: 'Active', match: '92%' }
  ];

  const quoteItems = [
    { id: 1, name: 'Enterprise License', qty: 50, price: 120, discount: 10 },
    { id: 2, name: 'Implementation Services', qty: 1, price: 5000, discount: 0 }
  ];

  const calculateTotal = () => {
    return quoteItems.reduce((acc, item) => {
      const subtotal = item.qty * item.price;
      const discountAmount = subtotal * (item.discount / 100);
      return acc + (subtotal - discountAmount);
    }, 0);
  };

  return (
    <div className="page-container bg-[#0B0F17] text-slate-200 min-h-screen font-sans">
      <PageHero accentColor="#00D09C" subtitle="Accelerate your sales pipeline with AI-driven insights and automated workflows." title="Sales Management"/>
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Sales & B2B Hub
              </h2>
              <p className="text-slate-400 mt-2">Manage partners, pipelines, and complex quotes in real-time.</p>
            </div>
            <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2">
              <Plus size={18} /> New Deal
            </button>
          </div>

          {/* 1. Value Proposition / Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-slate-800 rounded-lg text-yellow-400">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200">Automated Workflows</h3>
                  <p className="text-2xl font-bold text-white mt-1">Reduce time by 60%</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm">Streamline approvals and routing</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-slate-800 rounded-lg text-cyan-400">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200">Margin Analysis</h3>
                  <p className="text-2xl font-bold text-white mt-1">+15% Profitability</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm">Dynamic CPQ pricing models</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-slate-800 rounded-lg text-purple-400">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200">Secure Deal Rooms</h3>
                  <p className="text-2xl font-bold text-white mt-1">100% Audit-ready</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm">Encrypted partner collaborations</p>
            </div>
          </div>

          {/* 2. B2B Connection Hub */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <Users className="text-cyan-400" size={20} />
                B2B Connection Hub
              </h3>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="text" 
                    placeholder="Find vendors, buyers..." 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-200"
                  />
                </div>
                <button className="p-2 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 text-slate-400">
                  <Filter size={18} />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/80 text-slate-400 text-sm border-b border-slate-800">
                    <th className="px-6 py-4 font-medium">Partner Name</th>
                    <th className="px-6 py-4 font-medium">Type</th>
                    <th className="px-6 py-4 font-medium">Match Score</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {connections.map((conn) => (
                    <tr key={conn.id} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-4 font-medium text-white">{conn.name}</td>
                      <td className="px-6 py-4 text-slate-400">{conn.type}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-500 rounded-full" style={{ width: conn.match }} />
                          </div>
                          <span className="text-xs text-cyan-400 font-medium">{conn.match}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          conn.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                          'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {conn.status === 'Active' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                          {conn.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Connect <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Interactive Quoting CRM (CPQ) Feature Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-slate-900/50 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
              <h3 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                <FileText className="text-cyan-400" size={20} />
                Smart Quote Builder
              </h3>
              <div className="space-y-5 relative z-10">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Client Name</label>
                  <div className="text-slate-200 font-medium bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                    Global Tech Industries
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">RFP / Opportunity ID</label>
                  <div className="text-slate-400 text-sm bg-slate-950/50 p-3 rounded-lg border border-slate-800 font-mono">
                    #RFP-2026-8992
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-slate-500 mb-1">Status</label>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Drafting
                    </span>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-slate-500 mb-1">Validity</label>
                    <div className="text-slate-300 text-sm">30 Days</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-medium text-slate-200">Line Items & Pricing</h4>
                <button className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                  <Plus size={16} /> Add Product
                </button>
              </div>

              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs text-slate-500 uppercase tracking-wider border-b border-slate-800">
                      <th className="pb-3 font-medium">Product / Service</th>
                      <th className="pb-3 font-medium text-right">Qty</th>
                      <th className="pb-3 font-medium text-right">Unit Price</th>
                      <th className="pb-3 font-medium text-right">Discount</th>
                      <th className="pb-3 font-medium text-right">Total</th>
                      <th className="pb-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {quoteItems.map((item) => (
                      <tr key={item.id} className="text-sm">
                        <td className="py-4 text-slate-300">{item.name}</td>
                        <td className="py-4 text-right text-slate-300">{item.qty}</td>
                        <td className="py-4 text-right text-slate-400">${item.price.toLocaleString()}</td>
                        <td className="py-4 text-right">
                          <span className="inline-flex items-center gap-1 text-slate-400">
                            {item.discount}<Percent size={12} />
                          </span>
                        </td>
                        <td className="py-4 text-right font-medium text-white">
                          ${((item.qty * item.price) * (1 - item.discount / 100)).toLocaleString()}
                        </td>
                        <td className="py-4 text-right">
                          <button className="text-slate-600 hover:text-red-400 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-4 bg-slate-950/50 border border-slate-800 p-3 rounded-lg">
                  <Calculator className="text-cyan-400" size={20} />
                  <div>
                    <div className="text-xs text-slate-500">Estimated Margin</div>
                    <div className="text-lg font-bold text-emerald-400">42.5%</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm text-slate-500">Total Quote Value</div>
                    <div className="text-2xl font-bold text-white">${calculateTotal().toLocaleString()}</div>
                  </div>
                  <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Generate Proposal
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Sales;

