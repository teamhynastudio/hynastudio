/**
 * HYNA BIZ — Enterprise CRM Module
 * Realistic Commercial Pipeline:
 * NEW LEAD -> QUALIFIED -> CONTACTED -> OPPORTUNITY -> NEGOTIATION -> DEAL
 */

const CRMModule = (() => {
  // Initial enterprise deals data
  let deals = [
    {
      id: 'deal-001',
      company: 'Apex Industrial GmbH',
      contact: 'Dr. Markus Weber',
      role: 'VP Procurement',
      industry: 'Precision Engineering',
      country: 'Germany',
      flag: '🇩🇪',
      dealValue: '€340,000',
      numericValue: 375000,
      stage: 'NEGOTIATION',
      lastActivity: 'Contract markup sent 2h ago',
      nextFollowUp: 'Legal review call • Sep 22',
      probability: '85%',
      status: 'High Probability'
    },
    {
      id: 'deal-002',
      company: 'Al-Mansoor Trading LLC',
      contact: 'Tariq Al-Mansoor',
      role: 'Managing Director',
      industry: 'Wholesale Distribution',
      country: 'UAE',
      flag: '🇦🇪',
      dealValue: '$185,000',
      numericValue: 185000,
      stage: 'DEAL',
      lastActivity: 'LC 60 Days confirmed',
      nextFollowUp: 'Customs dispatch notice • Sep 24',
      probability: '100%',
      status: 'Won / Executing'
    },
    {
      id: 'deal-003',
      company: 'Kyocera Micro-Optics Corp',
      contact: 'Kenji Sato',
      role: 'Head of Global Sourcing',
      industry: 'Optoelectronics',
      country: 'Japan',
      flag: '🇯🇵',
      dealValue: '¥48,000,000',
      numericValue: 320000,
      stage: 'OPPORTUNITY',
      lastActivity: 'Specs audit completed',
      nextFollowUp: 'Pilot sample shipment • Sep 25',
      probability: '65%',
      status: 'Evaluating'
    },
    {
      id: 'deal-004',
      company: 'Nordic CleanEnergy ASA',
      contact: 'Astrid Lindqvist',
      role: 'Supply Chain Director',
      industry: 'Renewable Infrastructure',
      country: 'Norway',
      flag: '🇳🇴',
      dealValue: '€520,000',
      numericValue: 570000,
      stage: 'CONTACTED',
      lastActivity: 'Executive NDA countersigned',
      nextFollowUp: 'RFQ briefing presentation • Sep 23',
      probability: '40%',
      status: 'Qualified Prospect'
    },
    {
      id: 'deal-005',
      company: 'Great Lakes Machining Corp',
      contact: 'David Miller',
      role: 'VP Operations',
      industry: 'Heavy Machinery',
      country: 'USA',
      flag: '🇺🇸',
      dealValue: '$260,000',
      numericValue: 260000,
      stage: 'QUALIFIED',
      lastActivity: 'Inbound match via BizAI',
      nextFollowUp: 'Introductory procurement call • Sep 21',
      probability: '30%',
      status: 'Needs Assessment'
    },
    {
      id: 'deal-006',
      company: 'Bharat Heavy Engineering',
      contact: 'Rajesh Sharma',
      role: 'Director of Exports',
      industry: 'Casting & Metallurgy',
      country: 'India',
      flag: '🇮🇳',
      dealValue: '$410,000',
      numericValue: 410000,
      stage: 'NEW LEAD',
      lastActivity: 'Profile verified on Network',
      nextFollowUp: 'Catalog dispatch • Today',
      probability: '15%',
      status: 'Discovery'
    }
  ];

  const stages = [
    { key: 'NEW LEAD', label: 'New Lead' },
    { key: 'QUALIFIED', label: 'Qualified' },
    { key: 'CONTACTED', label: 'Contacted' },
    { key: 'OPPORTUNITY', label: 'Opportunity' },
    { key: 'NEGOTIATION', label: 'Negotiation' },
    { key: 'DEAL', label: 'Deal Closed' }
  ];

  function renderPipeline() {
    stages.forEach(st => {
      const colEl = document.getElementById(`col-${st.key.replace(/\s+/g, '-').toLowerCase()}`);
      const countEl = document.getElementById(`count-${st.key.replace(/\s+/g, '-').toLowerCase()}`);
      if (!colEl) return;

      const stageDeals = deals.filter(d => d.stage === st.key);
      if (countEl) countEl.textContent = stageDeals.length;

      colEl.innerHTML = stageDeals.map(deal => `
        <div class="deal-card" onclick="CRMModule.openDealDetail('${deal.id}')">
          <div class="deal-company-row">
            <span class="deal-company-name">${escapeHtml(deal.company)}</span>
            <span class="country-flag" title="${deal.country}">${deal.flag}</span>
          </div>
          <div class="deal-contact">${escapeHtml(deal.contact)} • ${escapeHtml(deal.role)}</div>
          <div class="deal-value-row">
            <span class="deal-value">${deal.dealValue}</span>
            <span class="badge ${getBadgeClass(deal.stage)}">${deal.probability}</span>
          </div>
          <div class="deal-activity-time">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle;margin-right:2px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${escapeHtml(deal.nextFollowUp)}
          </div>
        </div>
      `).join('');
    });

    updateCRMStats();
  }

  function getBadgeClass(stage) {
    switch (stage) {
      case 'DEAL': return 'badge-green';
      case 'NEGOTIATION': return 'badge-orange';
      case 'OPPORTUNITY': return 'badge-blue';
      default: return 'badge-dark';
    }
  }

  function updateCRMStats() {
    const totalPipelineVal = deals.reduce((acc, d) => acc + (d.numericValue || 0), 0);
    const activeLeadCount = deals.length;
    const closedCount = deals.filter(d => d.stage === 'DEAL').length;

    const totalEl = document.getElementById('crm-total-pipeline');
    const leadsEl = document.getElementById('crm-active-leads');
    const closedEl = document.getElementById('crm-closed-deals');

    if (totalEl) totalEl.textContent = `$${(totalPipelineVal / 1000000).toFixed(2)}M`;
    if (leadsEl) leadsEl.textContent = activeLeadCount;
    if (closedEl) closedEl.textContent = closedCount;
  }

  function openDealDetail(dealId) {
    const deal = deals.find(d => d.id === dealId);
    if (!deal) return;

    const modal = document.getElementById('deal-detail-modal');
    const body = document.getElementById('deal-detail-body');
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #E2E8F0;">
        <div>
          <h3 style="font-size:1.3rem;color:#0B1220;display:flex;align-items:center;gap:8px;">
            ${escapeHtml(deal.company)} <span style="font-size:1.2rem;">${deal.flag}</span>
          </h3>
          <p style="color:#64748B;font-size:0.85rem;margin-top:2px;">${deal.industry} • Registered Entity</p>
        </div>
        <div style="text-align:right;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:1.25rem;font-weight:700;color:#0B1220;">${deal.dealValue}</div>
          <span class="badge ${getBadgeClass(deal.stage)}" style="margin-top:4px;">${deal.stage}</span>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
        <div style="background:#F8FAFC;padding:12px;border-radius:6px;border:1px solid #E2E8F0;">
          <div style="font-size:0.75rem;font-family:'JetBrains Mono',monospace;color:#64748B;text-transform:uppercase;">Primary Executive</div>
          <div style="font-weight:600;color:#0B1220;margin-top:4px;">${escapeHtml(deal.contact)}</div>
          <div style="font-size:0.8rem;color:#64748B;">${escapeHtml(deal.role)}</div>
        </div>
        <div style="background:#F8FAFC;padding:12px;border-radius:6px;border:1px solid #E2E8F0;">
          <div style="font-size:0.75rem;font-family:'JetBrains Mono',monospace;color:#64748B;text-transform:uppercase;">Win Probability</div>
          <div style="font-weight:700;color:#10B981;font-size:1.1rem;margin-top:4px;">${deal.probability}</div>
          <div style="font-size:0.8rem;color:#64748B;">Algorithmically verified</div>
        </div>
      </div>

      <div style="margin-bottom:16px;">
        <div style="font-size:0.75rem;font-family:'JetBrains Mono',monospace;color:#64748B;text-transform:uppercase;margin-bottom:6px;">Latest Operational Activity</div>
        <div style="background:#FFFFFF;border:1px solid #E2E8F0;padding:12px;border-radius:6px;font-size:0.85rem;color:#111827;">
          ${escapeHtml(deal.lastActivity)}
        </div>
      </div>

      <div style="margin-bottom:20px;">
        <div style="font-size:0.75rem;font-family:'JetBrains Mono',monospace;color:#64748B;text-transform:uppercase;margin-bottom:6px;">Scheduled Commercial Milestone</div>
        <div style="background:#F5FAFF;border:1px solid #BAE6FD;padding:12px;border-radius:6px;font-size:0.85rem;color:#0369A1;font-weight:600;">
          ${escapeHtml(deal.nextFollowUp)}
        </div>
      </div>

      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="btn btn-outline btn-sm" onclick="CRMModule.advanceStage('${deal.id}')">Advance Stage →</button>
        <button class="btn btn-primary btn-sm" onclick="App.createQuotationForDeal('${deal.company}')">Generate Quotation</button>
      </div>
    `;

    modal.classList.add('open');
  }

  function advanceStage(dealId) {
    const deal = deals.find(d => d.id === dealId);
    if (!deal) return;

    const currentIndex = stages.findIndex(s => s.key === deal.stage);
    if (currentIndex < stages.length - 1) {
      deal.stage = stages[currentIndex + 1].key;
      deal.lastActivity = `Advanced to ${deal.stage} on ${new Date().toLocaleDateString()}`;
      renderPipeline();
      openDealDetail(dealId);
      App.showToast(`Updated stage for ${deal.company} to ${deal.stage}`, 'success');
    } else {
      App.showToast(`${deal.company} is already in the final Deal Closed stage!`, 'info');
    }
  }

  function addCompanyToCRM(companyObj) {
    // Check if already in deals
    const existing = deals.find(d => d.company.toLowerCase() === companyObj.name.toLowerCase());
    if (existing) {
      App.showToast(`${companyObj.name} is already active in your CRM pipeline!`, 'info');
      return;
    }

    const newDeal = {
      id: `deal-${Date.now()}`,
      company: companyObj.name,
      contact: companyObj.contact || 'Commercial Desk',
      role: companyObj.role || 'Procurement Officer',
      industry: companyObj.industry || 'Global Trade',
      country: companyObj.country || 'International',
      flag: companyObj.flag || '🌐',
      dealValue: companyObj.estValue || '$150,000',
      numericValue: companyObj.numericValue || 150000,
      stage: 'NEW LEAD',
      lastActivity: 'Imported from Business Discovery Network',
      nextFollowUp: 'Initial introductory consultation',
      probability: '25%',
      status: 'New Opportunity'
    };

    deals.unshift(newDeal);
    renderPipeline();
    App.showToast(`Added ${companyObj.name} directly into CRM as NEW LEAD!`, 'success');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  return {
    init: renderPipeline,
    openDealDetail,
    advanceStage,
    addCompanyToCRM,
    getDeals: () => deals
  };
})();
