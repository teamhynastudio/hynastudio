/**
 * HYNA BIZ — Global Trade & 2D Vector Map Module
 * Trade opportunities feed, cross-border workflow linking, and professional 2D cartography.
 */

const Trade = (() => {
  const tradeNodes = [
    { id: 'mumbai', name: 'Mumbai / JNPT', country: 'India 🇮🇳', x: 670, y: 280, volume: '142 Vessels', status: 'Origin Port' },
    { id: 'dubai', name: 'Jebel Ali / Dubai', country: 'UAE 🇦🇪', x: 580, y: 260, volume: '289 Vessels', status: 'Regional Re-Export Hub' },
    { id: 'hamburg', name: 'Hamburg Port', country: 'Germany 🇩🇪', x: 490, y: 160, volume: '215 Vessels', status: 'European Terminal' },
    { id: 'singapore', name: 'Singapore PSA', country: 'Singapore 🇸🇬', x: 770, y: 340, volume: '380 Vessels', status: 'APAC Clearance Hub' },
    { id: 'rotterdam', name: 'Rotterdam Terminal', country: 'Netherlands 🇳🇱', x: 480, y: 165, volume: '310 Vessels', status: 'Deepwater Container Gateway' },
    { id: 'houston', name: 'Houston Channel', country: 'USA 🇺🇸', x: 230, y: 240, volume: '190 Vessels', status: 'Gulf Petrochemical Port' }
  ];

  const tradeLanes = [
    { from: 'mumbai', to: 'dubai', days: '3 Days Sea', label: 'JNPT ➔ Jebel Ali' },
    { from: 'dubai', to: 'hamburg', days: '14 Days Sea', label: 'Jebel Ali ➔ Hamburg' },
    { from: 'mumbai', to: 'rotterdam', days: '18 Days Sea', label: 'JNPT ➔ Rotterdam' },
    { from: 'singapore', to: 'dubai', days: '7 Days Sea', label: 'Singapore ➔ Jebel Ali' },
    { from: 'houston', to: 'rotterdam', days: '12 Days Sea', label: 'Houston ➔ Rotterdam' }
  ];

  function init() {
    renderTradeOpportunities();
    render2DMap();
  }

  function renderTradeOpportunities() {
    const list = document.getElementById('trade-opportunities-list');
    if (!list) return;

    const ops = Store.getTradeOpportunities();

    list.innerHTML = ops.map(op => `
      <div class="card" style="padding:16px;background:var(--bg-surface);border:1px solid var(--border-light);border-radius:var(--radius-sm);margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
          <div>
            <span class="badge badge-info" style="margin-bottom:4px;">${op.tradeType}</span>
            <h4 style="font-size:0.95rem;font-weight:700;color:var(--text-main);">${escapeHtml(op.title)}</h4>
          </div>
          <span class="mono-num" style="font-weight:700;font-size:1rem;color:var(--color-primary);">${op.estVal}</span>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;background:var(--bg-subtle);padding:10px;border-radius:4px;margin-bottom:10px;font-size:0.8rem;">
          <div>
            <div style="font-size:0.68rem;font-family:var(--font-mono);color:var(--text-muted);text-transform:uppercase;">Buyer</div>
            <div style="font-weight:600;">${escapeHtml(op.buyer)}</div>
            <div style="color:var(--text-muted);">${op.buyerCountry}</div>
          </div>
          <div>
            <div style="font-size:0.68rem;font-family:var(--font-mono);color:var(--text-muted);text-transform:uppercase;">Supplier</div>
            <div style="font-weight:600;">${escapeHtml(op.supplier)}</div>
            <div style="color:var(--text-muted);">${op.supplierCountry}</div>
          </div>
          <div>
            <div style="font-size:0.68rem;font-family:var(--font-mono);color:var(--text-muted);text-transform:uppercase;">Terms & Volume</div>
            <div style="font-weight:600;">${op.quantity}</div>
            <div style="color:var(--text-muted);">${op.incoterms}</div>
          </div>
        </div>

        <p style="font-size:0.8rem;color:var(--text-body);margin-bottom:12px;">
          ${escapeHtml(op.description)}
        </p>

        <div style="display:flex;gap:8px;justify-content:flex-end;border-top:1px solid var(--border-light);padding-top:10px;">
          <button class="btn btn-secondary btn-xs" onclick="Trade.viewOpportunityDetails('${op.id}')">View Dossier</button>
          <button class="btn btn-primary btn-xs" onclick="Trade.connectOpportunity('${op.id}')">Initiate Connection</button>
          <button class="btn btn-brand btn-xs" onclick="Trade.addOpportunityToCRM('${op.id}')">+ Add to CRM Deal</button>
        </div>
      </div>
    `).join('');
  }

  function viewOpportunityDetails(opId) {
    const op = Store.getTradeOpportunities().find(o => o.id === opId);
    if (!op) return;

    const drawer = document.getElementById('app-drawer');
    const title = document.getElementById('drawer-title');
    const body = document.getElementById('drawer-body');
    if (!drawer || !body) return;

    title.textContent = `Trade RFQ: ${op.title}`;
    body.innerHTML = `
      <div style="margin-bottom:16px;">
        <span class="badge badge-info">${op.tradeType} OPPORTUNITY</span>
        <h3 style="font-size:1.1rem;margin-top:6px;">${escapeHtml(op.title)}</h3>
        <p style="color:var(--text-muted);font-size:0.82rem;">Reference: TRD-2026-${op.id.toUpperCase()}</p>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
        <div style="background:var(--bg-subtle);padding:10px;border-radius:4px;">
          <div style="font-size:0.68rem;font-family:var(--font-mono);color:var(--text-muted);">CONTRACT VALUATION</div>
          <div style="font-weight:700;font-size:1.1rem;color:var(--color-primary);">${op.estVal}</div>
        </div>
        <div style="background:var(--bg-subtle);padding:10px;border-radius:4px;">
          <div style="font-size:0.68rem;font-family:var(--font-mono);color:var(--text-muted);">INCOTERMS 2020</div>
          <div style="font-weight:600;font-size:0.95rem;">${op.incoterms}</div>
        </div>
      </div>

      <div style="background:var(--bg-surface);border:1px solid var(--border-light);padding:12px;border-radius:4px;margin-bottom:16px;">
        <h4 style="font-size:0.85rem;font-weight:700;margin-bottom:6px;">Required Specifications</h4>
        <p style="font-size:0.82rem;color:var(--text-body);line-height:1.5;">${escapeHtml(op.description)}</p>
      </div>

      <div style="border-top:1px solid var(--border-light);padding-top:14px;display:flex;flex-direction:column;gap:8px;">
        <div style="font-size:0.75rem;font-family:var(--font-mono);color:var(--text-muted);text-transform:uppercase;">Workflow Actions</div>
        <button class="btn btn-primary" onclick="Trade.addOpportunityToCRM('${op.id}'); App.closeDrawer();">
          1. Import to CRM Pipeline & Lead Desk
        </button>
        <button class="btn btn-secondary" onclick="Sales.openNewQuotation('${escapeHtml(op.buyer)}'); App.closeDrawer();">
          2. Draft Proforma Quotation for Buyer
        </button>
      </div>
    `;

    drawer.classList.add('open');
  }

  function connectOpportunity(opId) {
    const op = Store.getTradeOpportunities().find(o => o.id === opId);
    if (!op) return;
    App.showToast(`Bilateral inquiry dispatched to ${op.buyer} (${op.buyerCountry})`, 'success');
  }

  function addOpportunityToCRM(opId) {
    const op = Store.getTradeOpportunities().find(o => o.id === opId);
    if (!op) return;

    Store.addDeal({
      id: `deal-${Date.now()}`,
      title: op.title,
      company: op.buyer,
      value: op.estVal,
      numericValue: 200000,
      stage: 'Proposal',
      owner: 'Vignesh',
      nextAction: `Draft Incoterms ${op.incoterms} proposal`,
      expectedClose: 'Nov 15, 2026'
    });

    CRM.renderDealsKanban();
    App.showToast(`Added ${op.title} directly into CRM Deals!`, 'success');
  }

  /* --------------------------------------------------------------------------
     2D Vector Trade Map (No 3D globe, no neon glowing particles)
     -------------------------------------------------------------------------- */
  function render2DMap() {
    const container = document.getElementById('trade-map-canvas-container');
    if (!container) return;

    const corridorPaths = tradeLanes.map(c => {
      const start = tradeNodes.find(n => n.id === c.from);
      const end = tradeNodes.find(n => n.id === c.to);
      if (!start || !end) return '';

      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const cx = (start.x + end.x) / 2;
      const cy = (start.y + end.y) / 2 - Math.min(Math.abs(dx) * 0.22, 50);

      return `
        <path d="M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}" 
              fill="none" 
              stroke="#00C2FF" 
              stroke-width="1.5" 
              stroke-dasharray="3, 3"
              opacity="0.6" />
      `;
    }).join('');

    const nodeMarkers = tradeNodes.map(node => `
      <g style="cursor:pointer;" onclick="App.showToast('${node.name}: ${node.status} • Handling ${node.volume}', 'info')">
        <circle cx="${node.x}" cy="${node.y}" r="4" fill="#00C2FF" />
        <circle cx="${node.x}" cy="${node.y}" r="8" fill="#00C2FF" opacity="0.2" />
        <text x="${node.x}" y="${node.y + 14}" fill="#94A3B8" font-family="'Inter', sans-serif" font-size="10" font-weight="500" text-anchor="middle">
          ${node.name}
        </text>
      </g>
    `).join('');

    // Continents
    const landmasses = `
      <path d="M 120 90 L 260 80 L 320 130 L 290 190 L 230 250 L 190 280 L 160 210 L 110 160 Z" fill="#13233E" opacity="0.6"/>
      <path d="M 280 290 L 370 320 L 360 430 L 310 470 L 270 370 Z" fill="#13233E" opacity="0.6"/>
      <path d="M 440 110 L 530 110 L 540 180 L 480 200 L 430 170 Z" fill="#13233E" opacity="0.6"/>
      <path d="M 460 210 L 560 210 L 570 340 L 510 420 L 460 330 Z" fill="#13233E" opacity="0.6"/>
      <path d="M 550 100 L 850 110 L 890 220 L 800 320 L 680 320 L 580 240 Z" fill="#13233E" opacity="0.6"/>
      <path d="M 780 360 L 880 370 L 870 450 L 790 440 Z" fill="#13233E" opacity="0.6"/>
    `;

    container.innerHTML = `
      <svg viewBox="0 0 1000 480" class="trade-map-svg">
        <defs>
          <pattern id="tradeGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="1000" height="480" fill="url(#tradeGrid)" />
        ${landmasses}
        ${corridorPaths}
        ${nodeMarkers}
      </svg>
      <div class="trade-map-overlay-stats">
        <div class="trade-map-stat-chip">Active Freight Corridors: 5</div>
        <div class="trade-map-stat-chip">Avg Clearing Time: 2.4 Days</div>
        <div class="trade-map-stat-chip">LC Settlement Ratio: 100%</div>
      </div>
    `;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  return {
    init,
    renderTradeOpportunities,
    render2DMap,
    viewOpportunityDetails,
    connectOpportunity,
    addOpportunityToCRM
  };
})();
