/**
 * HYNA BIZ — Enterprise Application Controller
 * SPA Routing, Sidebar Navigation, Global Search (Cmd+K), Notifications, Drawers, Toasts
 */

const App = (() => {
  let currentView = 'overview';

  function init() {
    initNavigation();
    initSalesChart();
    initGlobalSearch();
    initNotifications();

    // Initialize Submodules
    CRM.init();
    Sales.init();
    Network.init();
    Trade.init();
    BizAI.init();
    Messaging.init();

    // Render Static Tables (Overview activities & deals, Products, Customers, Suppliers, Team)
    renderOverviewTables();
    renderProductsTable();
    renderCustomersTable();
    renderSuppliersTable();
    renderTeamTable();
  }

  /* --------------------------------------------------------------------------
     Navigation & View Switching
     -------------------------------------------------------------------------- */
  function initNavigation() {
    // Sidebar items
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const view = item.dataset.view;
        if (view) switchView(view);
      });
    });

    // Sub-nav tab items inside views
    document.querySelectorAll('.subnav-tab-item').forEach(tab => {
      tab.addEventListener('click', () => {
        const parent = tab.closest('.view-pane');
        if (!parent) return;
        parent.querySelectorAll('.subnav-tab-item').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const subnav = tab.dataset.subnav;
        parent.querySelectorAll('.subnav-content').forEach(c => {
          if (c.dataset.subnavTarget === subnav) {
            c.style.display = 'block';
          } else {
            c.style.display = 'none';
          }
        });
      });
    });
  }

  function switchView(viewName) {
    currentView = viewName;

    // Update sidebar active classes
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
      if (item.dataset.view === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Hide all view panes
    document.querySelectorAll('.view-pane').forEach(pane => {
      pane.classList.remove('active');
    });

    // Show target pane
    const targetPane = document.getElementById(`view-${viewName}`);
    if (targetPane) {
      targetPane.classList.add('active');
    }

    // Update Topbar Breadcrumb
    const crumbEl = document.getElementById('topbar-active-crumb');
    if (crumbEl) {
      crumbEl.textContent = formatViewTitle(viewName);
    }

    // Close mobile sidebar if open
    const sidebar = document.querySelector('.app-sidebar');
    if (sidebar) sidebar.classList.remove('open');
  }

  function formatViewTitle(view) {
    const map = {
      'overview': 'Overview',
      'business': 'Business Management',
      'products': 'Products',
      'crm': 'CRM',
      'connections': 'Connections Network',
      'public-profile': 'Company Profile',
      'sales': 'Sales & Quotations',
      'orders': 'Orders',
      'trade': 'Global Trade',
      'bizai': 'BizAI Utility',
      'customers': 'Customers',
      'suppliers': 'Suppliers',
      'team': 'Team',
      'messages': 'Messages',
      'settings': 'Settings'
    };
    return map[view] || view;
  }

  /* --------------------------------------------------------------------------
     Overview Dashboard Tables & Simple Professional Sales Chart
     -------------------------------------------------------------------------- */
  function renderOverviewTables() {
    // Recent Activity Table
    const actBody = document.getElementById('overview-activity-tbody');
    if (actBody) {
      const acts = Store.getActivities();
      actBody.innerHTML = acts.map(a => `
        <tr>
          <td class="cell-primary">${escapeHtml(a.company)}</td>
          <td>${escapeHtml(a.activity)}</td>
          <td><span class="badge badge-neutral">${a.type}</span></td>
          <td><span class="badge badge-success">${a.status}</span></td>
          <td class="cell-muted mono-num">${a.date}</td>
        </tr>
      `).join('');
    }

    // Open Deals Table
    const dealsBody = document.getElementById('overview-deals-tbody');
    if (dealsBody) {
      const deals = Store.getDeals();
      dealsBody.innerHTML = deals.map(d => `
        <tr>
          <td class="cell-primary">${escapeHtml(d.company)}</td>
          <td>${escapeHtml(d.title)}</td>
          <td class="mono-num" style="font-weight:700;">${d.value}</td>
          <td><span class="badge badge-info">${d.stage}</span></td>
          <td class="cell-muted" style="font-size:0.78rem;">${escapeHtml(d.nextAction)}</td>
        </tr>
      `).join('');
    }

    // Trade Opportunities compact list on Overview
    const tradeBody = document.getElementById('overview-trade-tbody');
    if (tradeBody) {
      const ops = Store.getTradeOpportunities();
      tradeBody.innerHTML = ops.map(o => `
        <tr>
          <td class="cell-primary">${escapeHtml(o.title)}</td>
          <td>${escapeHtml(o.buyer)} (${o.buyerCountry})</td>
          <td>${escapeHtml(o.supplier)} (${o.supplierCountry})</td>
          <td class="mono-num" style="font-weight:700;">${o.estVal}</td>
          <td><span class="badge badge-info">${o.tradeType}</span></td>
        </tr>
      `).join('');
    }
  }

  function initSalesChart() {
    const canvas = document.getElementById('sales-performance-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.clientWidth || 800;
    const height = canvas.height = 200;

    // Data points: Jan - Sep 2026 ($ in thousands)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    const revenue = [160, 185, 210, 240, 290, 310, 340, 380, 420];

    const maxVal = 500;
    const paddingLeft = 45;
    const paddingBottom = 30;
    const paddingTop = 20;
    const chartWidth = width - paddingLeft - 20;
    const chartHeight = height - paddingTop - paddingBottom;

    ctx.clearRect(0, 0, width, height);

    // Draw horizontal grid lines
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#64748B';
    ctx.font = '11px -apple-system, Inter, sans-serif';

    for (let i = 0; i <= 4; i++) {
      const val = (maxVal / 4) * i;
      const y = paddingTop + chartHeight - (val / maxVal) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(paddingLeft, y);
      ctx.lineTo(width - 20, y);
      ctx.stroke();
      ctx.fillText(`$${val}k`, 6, y + 4);
    }

    // Draw bar / line chart
    const stepX = chartWidth / (months.length - 1);

    // Fill subtle area
    ctx.beginPath();
    ctx.moveTo(paddingLeft, paddingTop + chartHeight);
    revenue.forEach((v, idx) => {
      const x = paddingLeft + (idx * stepX);
      const y = paddingTop + chartHeight - (v / maxVal) * chartHeight;
      if (idx === 0) ctx.lineTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(paddingLeft + ((months.length - 1) * stepX), paddingTop + chartHeight);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 194, 255, 0.08)';
    ctx.fill();

    // Stroke line
    ctx.beginPath();
    ctx.strokeStyle = '#0B1220';
    ctx.lineWidth = 2.2;
    revenue.forEach((v, idx) => {
      const x = paddingLeft + (idx * stepX);
      const y = paddingTop + chartHeight - (v / maxVal) * chartHeight;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Data points & X Labels
    revenue.forEach((v, idx) => {
      const x = paddingLeft + (idx * stepX);
      const y = paddingTop + chartHeight - (v / maxVal) * chartHeight;

      // Circle
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#00C2FF';
      ctx.fill();
      ctx.strokeStyle = '#0B1220';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      ctx.fillStyle = '#64748B';
      ctx.textAlign = 'center';
      ctx.fillText(months[idx], x, height - 8);
    });
  }

  /* --------------------------------------------------------------------------
     Products Table
     -------------------------------------------------------------------------- */
  function renderProductsTable(searchTerm = '', categoryFilter = 'all') {
    const tbody = document.getElementById('products-table-tbody');
    if (!tbody) return;

    let items = Store.getProducts();

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      items = items.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    }

    if (categoryFilter !== 'all') {
      items = items.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase());
    }

    tbody.innerHTML = items.map(p => `
      <tr>
        <td class="cell-primary">
          <a href="javascript:void(0)" onclick="App.openProductDetail('${p.id}')" style="text-decoration:underline;">
            ${escapeHtml(p.name)}
          </a>
        </td>
        <td>${escapeHtml(p.category)}</td>
        <td class="mono-num" style="font-weight:600;">${p.sku}</td>
        <td class="mono-num" style="font-weight:700;">$${p.price.toFixed(2)}</td>
        <td>${p.availability}</td>
        <td class="cell-muted">${p.markets}</td>
        <td><span class="badge ${p.status === 'In Stock' ? 'badge-success' : 'badge-warning'}">${p.status}</span></td>
      </tr>
    `).join('');
  }

  function openProductDetail(prodId) {
    const p = Store.getProducts().find(item => item.id === prodId);
    if (!p) return;

    const drawer = document.getElementById('app-drawer');
    const title = document.getElementById('drawer-title');
    const body = document.getElementById('drawer-body');
    if (!drawer || !body) return;

    title.textContent = `Product Master: ${p.sku}`;
    body.innerHTML = `
      <div style="margin-bottom:16px;">
        <span class="badge badge-neutral">${p.category}</span>
        <h3 style="font-size:1.15rem;margin-top:6px;color:var(--text-main);">${escapeHtml(p.name)}</h3>
        <p style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">HS Code: ${p.hsCode}</p>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
        <div style="background:var(--bg-subtle);padding:10px;border-radius:4px;">
          <div style="font-size:0.68rem;font-family:var(--font-mono);color:var(--text-muted);">UNIT PRICE (FOB)</div>
          <div class="mono-num" style="font-weight:700;font-size:1.1rem;color:var(--color-primary);">$${p.price.toFixed(2)}</div>
        </div>
        <div style="background:var(--bg-subtle);padding:10px;border-radius:4px;">
          <div style="font-size:0.68rem;font-family:var(--font-mono);color:var(--text-muted);">WAREHOUSE INVENTORY</div>
          <div style="font-weight:600;font-size:0.95rem;">${p.availability}</div>
        </div>
      </div>

      <div style="margin-bottom:16px;">
        <h4 style="font-size:0.82rem;font-weight:700;margin-bottom:4px;">Technical Description</h4>
        <p style="font-size:0.82rem;color:var(--text-body);line-height:1.5;">${escapeHtml(p.description)}</p>
      </div>

      <div style="margin-bottom:20px;">
        <h4 style="font-size:0.82rem;font-weight:700;margin-bottom:4px;">Authorized Export Markets</h4>
        <div style="font-size:0.84rem;color:var(--text-body);">${p.markets}</div>
      </div>

      <div style="display:flex;gap:8px;border-top:1px solid var(--border-light);padding-top:16px;">
        <button class="btn btn-primary" onclick="Sales.openNewQuotation(''); App.closeDrawer();">
          Add to New Quotation
        </button>
        <button class="btn btn-secondary" onclick="App.closeDrawer()">Close</button>
      </div>
    `;

    drawer.classList.add('open');
  }

  /* --------------------------------------------------------------------------
     Customers Table
     -------------------------------------------------------------------------- */
  function renderCustomersTable() {
    const tbody = document.getElementById('customers-table-tbody');
    if (!tbody) return;

    const customers = Store.getCustomers();
    tbody.innerHTML = customers.map(c => `
      <tr>
        <td class="cell-primary">${escapeHtml(c.name)}</td>
        <td>${c.country}</td>
        <td>${escapeHtml(c.contact)}</td>
        <td class="mono-num" style="font-weight:700;">${c.totalOrders}</td>
        <td class="cell-muted" style="font-size:0.78rem;">${escapeHtml(c.lastActivity)}</td>
        <td class="mono-num" style="text-align:center;">${c.openDeals}</td>
        <td><span class="badge badge-success">${c.status}</span></td>
      </tr>
    `).join('');
  }

  /* --------------------------------------------------------------------------
     Suppliers Table
     -------------------------------------------------------------------------- */
  function renderSuppliersTable() {
    const tbody = document.getElementById('suppliers-table-tbody');
    if (!tbody) return;

    const suppliers = Store.getSuppliers();
    tbody.innerHTML = suppliers.map(s => `
      <tr>
        <td class="cell-primary">${escapeHtml(s.supplier)}</td>
        <td>${escapeHtml(s.company)}</td>
        <td>${s.country}</td>
        <td>${escapeHtml(s.products)}</td>
        <td>${escapeHtml(s.category)}</td>
        <td class="mono-num cell-muted">${s.lastOrder}</td>
        <td><span class="badge badge-info">${s.status}</span></td>
      </tr>
    `).join('');
  }

  /* --------------------------------------------------------------------------
     Team Table
     -------------------------------------------------------------------------- */
  function renderTeamTable() {
    const tbody = document.getElementById('team-table-tbody');
    if (!tbody) return;

    const team = Store.getTeam();
    tbody.innerHTML = team.map(t => `
      <tr>
        <td class="cell-primary">${escapeHtml(t.name)}</td>
        <td>${escapeHtml(t.department)}</td>
        <td>${escapeHtml(t.role)}</td>
        <td class="mono-num cell-muted">${escapeHtml(t.email)}</td>
        <td class="mono-num" style="text-align:center;">${t.tasks} Tasks</td>
        <td><span class="badge badge-success">${t.status}</span></td>
      </tr>
    `).join('');
  }

  /* --------------------------------------------------------------------------
     Global Search Modal (Cmd+K)
     -------------------------------------------------------------------------- */
  function initGlobalSearch() {
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openGlobalSearchModal();
      }
      if (e.key === 'Escape') {
        closeModals();
        closeDrawer();
      }
    });
  }

  function openGlobalSearchModal() {
    const modal = document.getElementById('global-search-modal');
    if (modal) {
      modal.classList.add('open');
      const input = document.getElementById('search-modal-input');
      if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 50);
        handleSearchQuery('');
      }
    }
  }

  function handleSearchQuery(query) {
    const resultsContainer = document.getElementById('search-modal-results');
    if (!resultsContainer) return;

    const q = query.toLowerCase();

    const deals = Store.getDeals().filter(d => d.title.toLowerCase().includes(q) || d.company.toLowerCase().includes(q));
    const products = Store.getProducts().filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    const conns = Store.getConnections().filter(c => c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q));
    const quotes = Store.getQuotations().filter(quo => quo.number.toLowerCase().includes(q) || quo.customer.toLowerCase().includes(q));

    resultsContainer.innerHTML = `
      <div style="margin-bottom:12px;">
        <div style="font-size:0.7rem;font-family:var(--font-mono);color:var(--text-muted);text-transform:uppercase;margin-bottom:4px;">Deals & Opportunities</div>
        ${deals.slice(0, 2).map(d => `
          <div style="padding:6px 10px;background:var(--bg-subtle);border-radius:4px;cursor:pointer;margin-bottom:4px;display:flex;justify-content:space-between;"
               onclick="App.closeModals(); CRM.openDealDrawer('${d.id}');">
            <span><strong>${escapeHtml(d.title)}</strong> (${d.company})</span>
            <span class="mono-num" style="font-weight:700;">${d.value}</span>
          </div>
        `).join('')}
      </div>

      <div style="margin-bottom:12px;">
        <div style="font-size:0.7rem;font-family:var(--font-mono);color:var(--text-muted);text-transform:uppercase;margin-bottom:4px;">Products (SKUs)</div>
        ${products.slice(0, 2).map(p => `
          <div style="padding:6px 10px;background:var(--bg-subtle);border-radius:4px;cursor:pointer;margin-bottom:4px;display:flex;justify-content:space-between;"
               onclick="App.closeModals(); App.openProductDetail('${p.id}');">
            <span><strong>${escapeHtml(p.name)}</strong> (${p.sku})</span>
            <span class="mono-num" style="font-weight:700;">$${p.price.toFixed(2)}</span>
          </div>
        `).join('')}
      </div>

      <div>
        <div style="font-size:0.7rem;font-family:var(--font-mono);color:var(--text-muted);text-transform:uppercase;margin-bottom:4px;">Connections & Trade</div>
        ${conns.slice(0, 2).map(c => `
          <div style="padding:6px 10px;background:var(--bg-subtle);border-radius:4px;cursor:pointer;margin-bottom:4px;display:flex;justify-content:space-between;"
               onclick="App.closeModals(); Network.viewPublicProfile('${c.id}');">
            <span><strong>${escapeHtml(c.name)}</strong> (${c.city}, ${c.country} ${c.flag})</span>
            <span class="badge badge-info">${c.type}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* --------------------------------------------------------------------------
     Notifications Center
     -------------------------------------------------------------------------- */
  function initNotifications() {
    const listEl = document.getElementById('notifications-dropdown-list');
    if (!listEl) return;

    const notifs = Store.getNotifications();
    listEl.innerHTML = notifs.map(n => `
      <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="App.handleNotifClick('${n.id}')">
        <div class="notif-item-icon">🔔</div>
        <div>
          <div class="notif-item-text">
            <strong>${escapeHtml(n.title)}:</strong> ${escapeHtml(n.detail)}
          </div>
          <div class="notif-item-time mono-num">${n.time}</div>
        </div>
      </div>
    `).join('');
  }

  function toggleNotifications() {
    const dd = document.getElementById('notifications-dropdown');
    if (dd) dd.classList.toggle('open');
  }

  function handleNotifClick(notifId) {
    const dd = document.getElementById('notifications-dropdown');
    if (dd) dd.classList.remove('open');

    if (notifId === 'notif-1') {
      switchView('connections');
    } else if (notifId === 'notif-2' || notifId === 'notif-3') {
      switchView('sales');
    } else if (notifId === 'notif-4') {
      switchView('crm');
    } else {
      switchView('trade');
    }
  }

  /* --------------------------------------------------------------------------
     Drawers & Modals Control
     -------------------------------------------------------------------------- */
  function closeDrawer() {
    const drawer = document.getElementById('app-drawer');
    if (drawer) drawer.classList.remove('open');
  }

  function closeModals() {
    document.querySelectorAll('.app-modal-overlay').forEach(m => m.classList.remove('open'));
  }

  function toggleSidebar() {
    const sidebar = document.querySelector('.app-sidebar');
    if (sidebar) sidebar.classList.toggle('open');
  }

  function openChatWith(companyName) {
    switchView('messages');
    showToast(`Opened active communication channel with ${companyName}`, 'info');
  }

  function showToast(text, type = 'info') {
    let stack = document.querySelector('.toast-stack');
    if (!stack) {
      stack = document.createElement('div');
      stack.className = 'toast-stack';
      document.body.appendChild(stack);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `
      <span>${text}</span>
      <span style="cursor:pointer;opacity:0.7;" onclick="this.parentElement.remove()">✕</span>
    `;

    stack.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 4000);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  return {
    init,
    switchView,
    renderProductsTable,
    openProductDetail,
    openGlobalSearchModal,
    handleSearchQuery,
    toggleNotifications,
    handleNotifClick,
    toggleSidebar,
    closeDrawer,
    closeModals,
    openChatWith,
    showToast
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
