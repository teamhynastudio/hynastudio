/**
 * HYNA BIZ — CRM Module
 * Leads Table (search, filter, sort) + Deals Kanban Pipeline (New, Qualified, Proposal, Negotiation, Won, Lost)
 */

const CRM = (() => {
  const kanbanStages = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];

  function init() {
    renderLeadsTable();
    renderDealsKanban();
  }

  /* --------------------------------------------------------------------------
     Leads Table
     -------------------------------------------------------------------------- */
  function renderLeadsTable(searchTerm = '', stageFilter = 'all') {
    const tbody = document.getElementById('leads-table-tbody');
    if (!tbody) return;

    let leads = Store.getLeads();

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      leads = leads.filter(l => 
        l.name.toLowerCase().includes(q) || 
        l.company.toLowerCase().includes(q) || 
        l.country.toLowerCase().includes(q)
      );
    }

    if (stageFilter !== 'all') {
      leads = leads.filter(l => l.stage.toLowerCase() === stageFilter.toLowerCase());
    }

    if (leads.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center;padding:32px;color:var(--text-muted);">
            No leads found matching your criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = leads.map(l => `
      <tr>
        <td class="cell-primary">${escapeHtml(l.name)}</td>
        <td><strong>${escapeHtml(l.company)}</strong></td>
        <td>${escapeHtml(l.country)}</td>
        <td class="cell-muted">${escapeHtml(l.source)}</td>
        <td>${escapeHtml(l.owner)}</td>
        <td class="mono-num" style="font-weight:700;">${l.value}</td>
        <td>
          <span class="badge ${getStageBadgeClass(l.stage)}">${l.stage}</span>
        </td>
        <td class="cell-muted" style="font-size:0.78rem;">${escapeHtml(l.nextFollowUp)}</td>
      </tr>
    `).join('');
  }

  function getStageBadgeClass(stage) {
    switch (stage.toLowerCase()) {
      case 'won': return 'badge-success';
      case 'negotiation': return 'badge-warning';
      case 'proposal': return 'badge-info';
      case 'lost': return 'badge-danger';
      default: return 'badge-neutral';
    }
  }

  /* --------------------------------------------------------------------------
     Deals Pipeline Kanban
     -------------------------------------------------------------------------- */
  function renderDealsKanban() {
    const board = document.getElementById('deals-kanban-board');
    if (!board) return;

    const deals = Store.getDeals();

    board.innerHTML = kanbanStages.map(stage => {
      const stageDeals = deals.filter(d => d.stage.toLowerCase() === stage.toLowerCase());
      return `
        <div class="kanban-column" ondragover="event.preventDefault()" ondrop="CRM.handleDrop(event, '${stage}')">
          <div class="kanban-col-header">
            <span>${stage}</span>
            <span class="kanban-col-count">${stageDeals.length}</span>
          </div>
          <div class="kanban-cards-area">
            ${stageDeals.map(deal => `
              <div class="kanban-card" 
                   draggable="true" 
                   ondragstart="CRM.handleDragStart(event, '${deal.id}')"
                   onclick="CRM.openDealDrawer('${deal.id}')">
                <div class="kanban-card-title">${escapeHtml(deal.title)}</div>
                <div class="kanban-card-company">${escapeHtml(deal.company)}</div>
                <div class="kanban-card-footer">
                  <span class="kanban-card-value">${deal.value}</span>
                  <span style="color:var(--text-muted);font-size:0.72rem;">${deal.owner}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  let draggedDealId = null;

  function handleDragStart(e, dealId) {
    draggedDealId = dealId;
    e.dataTransfer.setData('text/plain', dealId);
  }

  function handleDrop(e, targetStage) {
    e.preventDefault();
    if (!draggedDealId) return;

    const deal = Store.getDeals().find(d => d.id === draggedDealId);
    if (deal && deal.stage !== targetStage) {
      deal.stage = targetStage;
      renderDealsKanban();
      App.showToast(`Updated deal "${deal.title}" stage to ${targetStage}`, 'success');
    }
    draggedDealId = null;
  }

  function openDealDrawer(dealId) {
    const deal = Store.getDeals().find(d => d.id === dealId);
    if (!deal) return;

    const drawer = document.getElementById('app-drawer');
    const title = document.getElementById('drawer-title');
    const body = document.getElementById('drawer-body');
    if (!drawer || !body) return;

    title.textContent = `Deal File: ${deal.title}`;
    body.innerHTML = `
      <div style="margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid var(--border-light);">
        <h3 style="font-size:1.15rem;margin-bottom:4px;">${escapeHtml(deal.company)}</h3>
        <p style="color:var(--text-muted);font-size:0.82rem;">Assigned Commercial Lead: ${deal.owner}</p>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
        <div style="background:var(--bg-subtle);padding:10px 12px;border-radius:4px;">
          <div style="font-size:0.7rem;font-family:var(--font-mono);color:var(--text-muted);text-transform:uppercase;">Valuation</div>
          <div style="font-weight:700;font-size:1.1rem;margin-top:2px;">${deal.value}</div>
        </div>
        <div style="background:var(--bg-subtle);padding:10px 12px;border-radius:4px;">
          <div style="font-size:0.7rem;font-family:var(--font-mono);color:var(--text-muted);text-transform:uppercase;">Pipeline Stage</div>
          <div style="font-weight:600;font-size:0.9rem;margin-top:4px;">
            <span class="badge ${getStageBadgeClass(deal.stage)}">${deal.stage}</span>
          </div>
        </div>
      </div>

      <div style="margin-bottom:16px;">
        <label style="font-size:0.78rem;font-weight:600;color:var(--text-main);display:block;margin-bottom:4px;">Scheduled Action</label>
        <div style="background:var(--bg-surface);border:1px solid var(--border-light);padding:10px;border-radius:4px;font-size:0.85rem;">
          ${escapeHtml(deal.nextAction)}
        </div>
      </div>

      <div style="margin-bottom:20px;">
        <label style="font-size:0.78rem;font-weight:600;color:var(--text-main);display:block;margin-bottom:4px;">Expected Close Date</label>
        <div class="mono-num" style="font-size:0.85rem;">${deal.expectedClose}</div>
      </div>

      <div style="display:flex;gap:8px;margin-top:32px;">
        <button class="btn btn-primary" onclick="Sales.openNewQuotation('${escapeHtml(deal.company)}'); App.closeDrawer();">
          Create Quotation for Deal →
        </button>
        <button class="btn btn-secondary" onclick="App.closeDrawer()">Close</button>
      </div>
    `;

    drawer.classList.add('open');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  return {
    init,
    renderLeadsTable,
    renderDealsKanban,
    handleDragStart,
    handleDrop,
    openDealDrawer
  };
})();
