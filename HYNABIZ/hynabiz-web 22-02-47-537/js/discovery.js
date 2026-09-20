/**
 * HYNA BIZ — Business Discovery & Network Module
 * Connects the external business ecosystem directly with the internal CRM.
 */

const DiscoveryModule = (() => {
  const verifiedCompanies = [
    {
      id: 'comp-101',
      name: 'Apex Precision Engineering GmbH',
      country: 'Germany',
      flag: '🇩🇪',
      city: 'Stuttgart',
      industry: 'Precision Engineering',
      type: 'Manufacturer',
      turnover: '€42.5M',
      employees: '380',
      exportRating: 'AAA',
      capabilities: ['CNC 5-Axis', 'Aerospace Alloys', 'ISO 9001:2015', 'CE Certified'],
      contact: 'Dr. Markus Weber',
      role: 'VP Procurement',
      estValue: '€340,000',
      numericValue: 375000,
      description: 'Tier-1 manufacturer of precision powertrain assemblies and specialized aerospace tooling for European and Asian markets.'
    },
    {
      id: 'comp-102',
      name: 'Gulf Axis General Trading LLC',
      country: 'UAE',
      flag: '🇦🇪',
      city: 'Dubai (JAFZA)',
      industry: 'Wholesale Distribution',
      type: 'Distributor',
      turnover: '$88.0M',
      employees: '210',
      exportRating: 'AAA',
      capabilities: ['Bonded Warehousing', 'Re-Export GCC', 'FOB & CIF Logistics', 'Port Clearance'],
      contact: 'Rashid Al-Zayani',
      role: 'Chief Commercial Officer',
      estValue: '$280,000',
      numericValue: 280000,
      description: 'Major regional logistics and trade distributor serving UAE, Saudi Arabia, Oman, and East African industrial sectors.'
    },
    {
      id: 'comp-103',
      name: 'Bharat Forge & Foundry Works',
      country: 'India',
      flag: '🇮🇳',
      city: 'Pune',
      industry: 'Heavy Machinery',
      type: 'Manufacturer',
      turnover: '$115M',
      employees: '1,450',
      exportRating: 'AA+',
      capabilities: ['Heavy Forging', 'Automotive Castings', 'Custom Die Making', 'Export to 42 Countries'],
      contact: 'Sunil Nair',
      role: 'VP International Sales',
      estValue: '$450,000',
      numericValue: 450000,
      description: 'Premier heavy metallurgical and industrial foundry exporting custom forged steel components across global transport networks.'
    },
    {
      id: 'comp-104',
      name: 'Kyocera Micro-Optics Corp',
      country: 'Japan',
      flag: '🇯🇵',
      city: 'Kyoto',
      industry: 'Electronics',
      type: 'OEM/ODM',
      turnover: '¥62.0B',
      employees: '890',
      exportRating: 'AAA',
      capabilities: ['Sapphire Glass', 'Optical Sensors', 'Cleanroom Fab Class 100', 'ITAR Registered'],
      contact: 'Kenji Sato',
      role: 'Head of Global Sourcing',
      estValue: '¥48,000,000',
      numericValue: 320000,
      description: 'Specialized producer of micro-optical elements, semiconductor packaging substrates, and high-frequency communication lenses.'
    },
    {
      id: 'comp-105',
      name: 'Nordic CleanEnergy Solutions ASA',
      country: 'Norway',
      flag: '🇳🇴',
      city: 'Oslo',
      industry: 'Energy & Utilities',
      type: 'EPC Contractor',
      turnover: '€68.0M',
      employees: '320',
      exportRating: 'AAA',
      capabilities: ['Offshore Wind Grid', 'DC Converter Stations', 'DNV GL Verified', 'ESG Compliant'],
      contact: 'Astrid Lindqvist',
      role: 'Supply Chain Director',
      estValue: '€520,000',
      numericValue: 570000,
      description: 'Engineering prime and procurement firm designing high-voltage submarine interconnects and harsh-environment marine hardware.'
    },
    {
      id: 'comp-106',
      name: 'Trans-Atlantic Polymer House',
      country: 'USA',
      flag: '🇺🇸',
      city: 'Houston, TX',
      industry: 'Chemicals',
      type: 'Trading House',
      turnover: '$140M',
      employees: '175',
      exportRating: 'AA+',
      capabilities: ['HDPE Bulk Granules', 'Iso-Tank Bulk Freight', 'Hedging Desks', 'Customs Brokerage'],
      contact: 'Sarah Jenkins',
      role: 'Managing Partner',
      estValue: '$310,000',
      numericValue: 310000,
      description: 'Global polymer resin distributor and international commodity brokerage connecting Gulf Coast producers to European converters.'
    }
  ];

  let currentFilter = {
    keyword: '',
    industry: 'all',
    country: 'all',
    type: 'all'
  };

  function renderDiscoveryGrid() {
    const grid = document.getElementById('discovery-results-grid');
    if (!grid) return;

    const filtered = verifiedCompanies.filter(c => {
      const matchKeyword = !currentFilter.keyword ||
        c.name.toLowerCase().includes(currentFilter.keyword.toLowerCase()) ||
        c.industry.toLowerCase().includes(currentFilter.keyword.toLowerCase()) ||
        c.city.toLowerCase().includes(currentFilter.keyword.toLowerCase()) ||
        c.capabilities.some(cap => cap.toLowerCase().includes(currentFilter.keyword.toLowerCase()));

      const matchIndustry = currentFilter.industry === 'all' || c.industry.toLowerCase() === currentFilter.industry.toLowerCase();
      const matchCountry = currentFilter.country === 'all' || c.country.toLowerCase() === currentFilter.country.toLowerCase();
      const matchType = currentFilter.type === 'all' || c.type.toLowerCase() === currentFilter.type.toLowerCase();

      return matchKeyword && matchIndustry && matchCountry && matchType;
    });

    const activeCRMCompanies = CRMModule.getDeals().map(d => d.company.toLowerCase());

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 8px;">
          <p style="color: #64748B; font-weight: 500;">No verified business profiles found matching your enterprise filter criteria.</p>
          <button class="btn btn-outline btn-sm" style="margin-top: 12px;" onclick="DiscoveryModule.resetFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(c => {
      const isInCRM = activeCRMCompanies.includes(c.name.toLowerCase());
      return `
        <div class="company-profile-card">
          <div class="company-card-top">
            <div class="company-brand-info">
              <div class="company-card-avatar">${c.name.substring(0, 2).toUpperCase()}</div>
              <div class="company-card-titles">
                <h4>${escapeHtml(c.name)} <span style="font-size:1.05rem;" title="${c.country}">${c.flag}</span></h4>
                <p>${c.city}, ${c.country} • ${c.industry}</p>
              </div>
            </div>
            <span class="badge badge-blue">${c.type}</span>
          </div>

          <p style="font-size:0.84rem;color:#475569;line-height:1.45;">${escapeHtml(c.description)}</p>

          <div class="company-metrics-strip">
            <div>
              <div class="c-metric-val">${c.turnover}</div>
              <div class="c-metric-lbl">Annual Vol</div>
            </div>
            <div>
              <div class="c-metric-val">${c.employees}</div>
              <div class="c-metric-lbl">Workforce</div>
            </div>
            <div>
              <div class="c-metric-val" style="color:#10B981;">${c.exportRating}</div>
              <div class="c-metric-lbl">Credit Tier</div>
            </div>
          </div>

          <div class="company-capabilities-tags">
            ${c.capabilities.map(cap => `<span class="capability-tag">${escapeHtml(cap)}</span>`).join('')}
          </div>

          <div class="company-actions-row">
            <button class="btn btn-outline btn-sm" onclick="DiscoveryModule.viewCompany('${c.id}')">View Profile</button>
            <button class="btn btn-sm ${isInCRM ? 'btn-outline' : 'btn-primary'}" 
                    id="btn-crm-${c.id}"
                    onclick="DiscoveryModule.handleAddToCRM('${c.id}')"
                    ${isInCRM ? 'disabled' : ''}>
              ${isInCRM ? 'In CRM ✓' : '+ Add to CRM'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function handleAddToCRM(companyId) {
    const comp = verifiedCompanies.find(c => c.id === companyId);
    if (!comp) return;

    CRMModule.addCompanyToCRM(comp);
    const btn = document.getElementById(`btn-crm-${companyId}`);
    if (btn) {
      btn.textContent = 'In CRM ✓';
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-outline');
      btn.disabled = true;
    }
  }

  function viewCompany(companyId) {
    const comp = verifiedCompanies.find(c => c.id === companyId);
    if (!comp) return;

    const modal = document.getElementById('deal-detail-modal');
    const body = document.getElementById('deal-detail-body');
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #E2E8F0;">
        <div>
          <h3 style="font-size:1.3rem;color:#0B1220;display:flex;align-items:center;gap:8px;">
            ${escapeHtml(comp.name)} <span style="font-size:1.2rem;">${comp.flag}</span>
          </h3>
          <p style="color:#64748B;font-size:0.85rem;margin-top:2px;">${comp.city}, ${comp.country} • Verified ${comp.type}</p>
        </div>
        <span class="badge badge-green">Enterprise Verified</span>
      </div>

      <p style="font-size:0.9rem;color:#334155;line-height:1.6;margin-bottom:20px;">
        ${escapeHtml(comp.description)}
      </p>

      <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:12px;margin-bottom:20px;">
        <div style="background:#F8FAFC;padding:12px;border-radius:6px;border:1px solid #E2E8F0;text-align:center;">
          <div style="font-size:0.75rem;font-family:'JetBrains Mono',monospace;color:#64748B;">TURNOVER</div>
          <div style="font-weight:700;color:#0B1220;font-size:1.1rem;margin-top:4px;">${comp.turnover}</div>
        </div>
        <div style="background:#F8FAFC;padding:12px;border-radius:6px;border:1px solid #E2E8F0;text-align:center;">
          <div style="font-size:0.75rem;font-family:'JetBrains Mono',monospace;color:#64748B;">WORKFORCE</div>
          <div style="font-weight:700;color:#0B1220;font-size:1.1rem;margin-top:4px;">${comp.employees}</div>
        </div>
        <div style="background:#F8FAFC;padding:12px;border-radius:6px;border:1px solid #E2E8F0;text-align:center;">
          <div style="font-size:0.75rem;font-family:'JetBrains Mono',monospace;color:#64748B;">TRADE SCORE</div>
          <div style="font-weight:700;color:#10B981;font-size:1.1rem;margin-top:4px;">${comp.exportRating}</div>
        </div>
      </div>

      <div style="margin-bottom:24px;">
        <div style="font-size:0.75rem;font-family:'JetBrains Mono',monospace;color:#64748B;text-transform:uppercase;margin-bottom:8px;">Certified Capabilities</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${comp.capabilities.map(c => `<span class="capability-tag" style="background:#E2E8F0;padding:4px 10px;font-size:0.75rem;">${c}</span>`).join('')}
        </div>
      </div>

      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button class="btn btn-outline btn-sm" onclick="App.closeModals()">Close</button>
        <button class="btn btn-primary btn-sm" onclick="DiscoveryModule.handleAddToCRM('${comp.id}'); App.closeModals();">+ Add to CRM Pipeline</button>
      </div>
    `;

    modal.classList.add('open');
  }

  function setFilter(key, val) {
    currentFilter[key] = val;
    renderDiscoveryGrid();
  }

  function resetFilters() {
    currentFilter = { keyword: '', industry: 'all', country: 'all', type: 'all' };
    const searchInput = document.getElementById('discovery-search-input');
    if (searchInput) searchInput.value = '';
    renderDiscoveryGrid();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  return {
    init: renderDiscoveryGrid,
    setFilter,
    resetFilters,
    handleAddToCRM,
    viewCompany
  };
})();
