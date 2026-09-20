/**
 * HYNA BIZ — Business Connections & Public Profile Module
 * Network discovery, company inspection, and seamless Connect -> Add to CRM workflow.
 */

const Network = (() => {
  let activeFilter = {
    keyword: '',
    industry: 'all',
    country: 'all',
    type: 'all'
  };

  function init() {
    renderConnectionsGrid();
  }

  function renderConnectionsGrid() {
    const container = document.getElementById('connections-grid-container');
    if (!container) return;

    let items = Store.getConnections();

    if (activeFilter.keyword) {
      const q = activeFilter.keyword.toLowerCase();
      items = items.filter(c => 
        c.name.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.products.some(p => p.toLowerCase().includes(q)) ||
        c.capabilities.some(cap => cap.toLowerCase().includes(q))
      );
    }

    if (activeFilter.industry !== 'all') {
      items = items.filter(c => c.industry.toLowerCase().includes(activeFilter.industry.toLowerCase()));
    }

    if (activeFilter.country !== 'all') {
      items = items.filter(c => c.country.toLowerCase() === activeFilter.country.toLowerCase());
    }

    if (activeFilter.type !== 'all') {
      items = items.filter(c => c.type.toLowerCase() === activeFilter.type.toLowerCase());
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 48px; text-align: center; background: var(--bg-surface); border: 1px dashed var(--border-medium); border-radius: var(--radius-sm); color: var(--text-muted);">
          No verified businesses match the selected network filters.
        </div>
      `;
      return;
    }

    container.innerHTML = items.map(c => `
      <div class="card" style="padding:16px;display:flex;flex-direction:column;gap:12px;background:var(--bg-surface);border:1px solid var(--border-light);border-radius:var(--radius-sm);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            <h3 style="font-size:0.95rem;font-weight:700;color:var(--text-main);display:flex;align-items:center;gap:6px;">
              ${escapeHtml(c.name)} <span style="font-size:1.1rem;">${c.flag}</span>
            </h3>
            <p style="font-size:0.78rem;color:var(--text-muted);">${c.city}, ${c.country} • ${c.industry}</p>
          </div>
          <span class="badge badge-info">${c.type}</span>
        </div>

        <p style="font-size:0.8rem;color:var(--text-body);line-height:1.45;">
          ${escapeHtml(c.description)}
        </p>

        <div>
          <div style="font-size:0.68rem;font-family:var(--font-mono);color:var(--text-muted);text-transform:uppercase;margin-bottom:4px;">Products</div>
          <div style="display:flex;flex-wrap:wrap;gap:4px;">
            ${c.products.map(p => `<span class="badge badge-neutral">${escapeHtml(p)}</span>`).join('')}
          </div>
        </div>

        <div>
          <div style="font-size:0.68rem;font-family:var(--font-mono);color:var(--text-muted);text-transform:uppercase;margin-bottom:4px;">Markets Served</div>
          <div style="font-size:0.78rem;color:var(--text-body);">${c.markets.join(', ')}</div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid var(--border-light);margin-top:auto;">
          <button class="btn btn-secondary btn-xs" onclick="Network.viewPublicProfile('${c.id}')">
            View Business
          </button>
          
          <div style="display:flex;gap:6px;">
            <button class="btn btn-xs ${c.status === 'Connected' ? 'btn-secondary' : 'btn-primary'}" 
                    id="btn-conn-${c.id}"
                    onclick="Network.handleConnect('${c.id}')">
              ${c.status === 'Connected' ? 'Connected ✓' : 'Connect'}
            </button>
            <button class="btn btn-brand btn-xs" 
                    id="btn-crm-sync-${c.id}"
                    onclick="Network.handleAddToCRM('${c.id}')"
                    ${c.isInCRM ? 'disabled' : ''}>
              ${c.isInCRM ? 'In CRM ✓' : '+ Add to CRM'}
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function handleConnect(companyId) {
    Store.connectCompany(companyId);
    const btn = document.getElementById(`btn-conn-${companyId}`);
    if (btn) {
      btn.textContent = 'Connected ✓';
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-secondary');
    }
    const comp = Store.getConnections().find(c => c.id === companyId);
    App.showToast(`Bilateral connection established with ${comp ? comp.name : 'company'}!`, 'success');
  }

  function handleAddToCRM(companyId) {
    const newLead = Store.addConnectionToCRM(companyId);
    if (!newLead) return;

    const btn = document.getElementById(`btn-crm-sync-${companyId}`);
    if (btn) {
      btn.textContent = 'In CRM ✓';
      btn.disabled = true;
    }

    CRM.renderLeadsTable();
    App.showToast(`Imported ${newLead.company} straight into CRM Leads pipeline!`, 'success');
  }

  function viewPublicProfile(companyId) {
    const comp = Store.getConnections().find(c => c.id === companyId);
    if (!comp) return;

    const container = document.getElementById('public-profile-content');
    if (!container) return;

    container.innerHTML = `
      <div class="public-profile-header">
        <div style="display:flex;gap:16px;align-items:center;">
          <div class="profile-avatar-box">${comp.name.substring(0, 2).toUpperCase()}</div>
          <div class="profile-info-col">
            <h2>${escapeHtml(comp.name)} <span class="badge badge-success">Verified Enterprise</span></h2>
            <p>${comp.city}, ${comp.country} ${comp.flag} • ${comp.industry} • ${comp.type}</p>
          </div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-secondary btn-sm" onclick="App.openChatWith('${escapeHtml(comp.name)}')">Message</button>
          <button class="btn btn-primary btn-sm" onclick="Network.handleAddToCRM('${comp.id}')" ${comp.isInCRM ? 'disabled' : ''}>
            ${comp.isInCRM ? 'In CRM ✓' : 'Add to CRM'}
          </button>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:2fr 1fr;gap:24px;">
        <div>
          <h4 style="font-size:0.9rem;font-weight:700;margin-bottom:8px;">About Entity</h4>
          <p style="font-size:0.85rem;color:var(--text-body);line-height:1.6;margin-bottom:20px;">
            ${escapeHtml(comp.description)}
          </p>

          <h4 style="font-size:0.9rem;font-weight:700;margin-bottom:8px;">Products & Offerings</h4>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:20px;">
            ${comp.products.map(p => `
              <div style="background:var(--bg-subtle);border:1px solid var(--border-light);padding:8px 12px;border-radius:4px;font-size:0.8rem;font-weight:500;">
                ${escapeHtml(p)}
              </div>
            `).join('')}
          </div>

          <h4 style="font-size:0.9rem;font-weight:700;margin-bottom:8px;">Commercial Capabilities</h4>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px;">
            ${comp.capabilities.map(cap => `<span class="badge badge-neutral" style="padding:4px 8px;font-size:0.75rem;">${escapeHtml(cap)}</span>`).join('')}
          </div>
        </div>

        <div style="background:var(--bg-subtle);padding:16px;border-radius:4px;border:1px solid var(--border-light);display:flex;flex-direction:column;gap:14px;">
          <div>
            <div style="font-size:0.7rem;font-family:var(--font-mono);color:var(--text-muted);text-transform:uppercase;">Primary Markets</div>
            <div style="font-size:0.84rem;font-weight:600;margin-top:2px;">${comp.markets.join(', ')}</div>
          </div>
          <div>
            <div style="font-size:0.7rem;font-family:var(--font-mono);color:var(--text-muted);text-transform:uppercase;">Network Standing</div>
            <div style="font-size:0.84rem;font-weight:600;color:var(--status-success-text);margin-top:2px;">Good Standing (AAA)</div>
          </div>
          <div>
            <div style="font-size:0.7rem;font-family:var(--font-mono);color:var(--text-muted);text-transform:uppercase;">Direct Inquiries</div>
            <button class="btn btn-secondary btn-sm" style="width:100%;margin-top:6px;" onclick="Sales.openNewQuotation('${escapeHtml(comp.name)}')">
              Draft Quotation for Firm
            </button>
          </div>
        </div>
      </div>
    `;

    App.switchView('public-profile');
  }

  function setFilter(key, val) {
    activeFilter[key] = val;
    renderConnectionsGrid();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  return {
    init,
    renderConnectionsGrid,
    handleConnect,
    handleAddToCRM,
    viewPublicProfile,
    setFilter
  };
})();
