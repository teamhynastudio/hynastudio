/**
 * HYNA BIZ — Sales & Quotation Builder Module
 * Quotations table, dynamic quotation builder with live math, authentic doc preview, and Orders management.
 */

const Sales = (() => {
  let builderItems = [
    { product: 'CNC 5-Axis Precision Turbine Shaft Assemblies', sku: 'HB-ENG-8820', qty: 40, unitPrice: 1250.00, discount: 0, tax: 2500.00, total: 52500.00 },
    { product: 'Cryogenic Flow Control Valves (DN 80)', sku: 'HB-VAL-4102', qty: 120, unitPrice: 175.00, discount: 0, tax: 1050.00, total: 22050.00 }
  ];

  function init() {
    renderQuotationsTable();
    renderOrdersTable();
    renderBuilderItems();
    updateDocPreview();
  }

  /* --------------------------------------------------------------------------
     Quotations Table
     -------------------------------------------------------------------------- */
  function renderQuotationsTable() {
    const tbody = document.getElementById('quotations-table-tbody');
    if (!tbody) return;

    const quotes = Store.getQuotations();

    tbody.innerHTML = quotes.map(q => `
      <tr>
        <td class="mono-num" style="font-weight:700;">
          <a href="javascript:void(0)" onclick="Sales.previewQuote('${q.id}')" style="color:var(--color-primary);text-decoration:underline;">
            ${q.number}
          </a>
        </td>
        <td><strong>${escapeHtml(q.customer)}</strong></td>
        <td class="cell-muted">${q.date}</td>
        <td class="mono-num" style="font-weight:700;">${q.amount}</td>
        <td>
          <span class="badge ${getQuoteBadgeClass(q.status)}">${q.status}</span>
        </td>
        <td class="cell-muted">${q.validUntil}</td>
        <td>
          <button class="btn btn-secondary btn-xs" onclick="Sales.previewQuote('${q.id}')">View Document</button>
        </td>
      </tr>
    `).join('');
  }

  function getQuoteBadgeClass(status) {
    switch (status.toLowerCase()) {
      case 'accepted': return 'badge-success';
      case 'sent': case 'viewed': return 'badge-info';
      case 'rejected': case 'expired': return 'badge-danger';
      default: return 'badge-neutral';
    }
  }

  /* --------------------------------------------------------------------------
     Quotation Builder & Live Math
     -------------------------------------------------------------------------- */
  function renderBuilderItems() {
    const tbody = document.getElementById('builder-items-tbody');
    if (!tbody) return;

    tbody.innerHTML = builderItems.map((item, idx) => `
      <tr>
        <td>
          <input type="text" class="search-input" value="${escapeHtml(item.product)}" onchange="Sales.updateItemField(${idx}, 'product', this.value)" style="padding:4px 8px;">
        </td>
        <td style="width:70px;">
          <input type="number" class="search-input mono-num" value="${item.qty}" min="1" onchange="Sales.updateItemField(${idx}, 'qty', parseFloat(this.value)||1)" style="padding:4px 8px;text-align:center;">
        </td>
        <td style="width:110px;">
          <input type="number" class="search-input mono-num" value="${item.unitPrice}" step="10" onchange="Sales.updateItemField(${idx}, 'unitPrice', parseFloat(this.value)||0)" style="padding:4px 8px;text-align:right;">
        </td>
        <td style="width:90px;">
          <input type="number" class="search-input mono-num" value="${item.discount}" min="0" max="100" onchange="Sales.updateItemField(${idx}, 'discount', parseFloat(this.value)||0)" style="padding:4px 8px;text-align:center;">
        </td>
        <td class="mono-num" style="width:110px;text-align:right;font-weight:700;">
          $${item.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </td>
        <td style="width:40px;text-align:center;">
          <button class="btn btn-subtle btn-xs" onclick="Sales.removeBuilderItem(${idx})" title="Remove">✕</button>
        </td>
      </tr>
    `).join('');

    calculateTotals();
  }

  function updateItemField(index, field, value) {
    if (!builderItems[index]) return;
    builderItems[index][field] = value;

    // Recalculate line total: qty * unitPrice * (1 - discount/100)
    const base = builderItems[index].qty * builderItems[index].unitPrice;
    const discounted = base * (1 - (builderItems[index].discount / 100));
    const tax = discounted * 0.05; // 5% standard export tax/fee
    builderItems[index].tax = tax;
    builderItems[index].total = discounted + tax;

    renderBuilderItems();
    updateDocPreview();
  }

  function addBuilderItem() {
    builderItems.push({
      product: 'Standard Industrial Machinery Assembly',
      sku: 'HB-GEN-001',
      qty: 10,
      unitPrice: 250.00,
      discount: 0,
      tax: 125.00,
      total: 2625.00
    });
    renderBuilderItems();
    updateDocPreview();
  }

  function removeBuilderItem(index) {
    if (builderItems.length <= 1) {
      App.showToast('Quotation must contain at least one line item', 'warning');
      return;
    }
    builderItems.splice(index, 1);
    renderBuilderItems();
    updateDocPreview();
  }

  function calculateTotals() {
    let subtotal = 0;
    let taxTotal = 0;

    builderItems.forEach(i => {
      const base = i.qty * i.unitPrice * (1 - (i.discount / 100));
      subtotal += base;
      taxTotal += i.tax;
    });

    const grandTotal = subtotal + taxTotal;

    const subtotalEl = document.getElementById('builder-subtotal');
    const taxEl = document.getElementById('builder-tax');
    const grandEl = document.getElementById('builder-grand-total');

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (taxEl) taxEl.textContent = `$${taxTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (grandEl) grandEl.textContent = `$${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

    return { subtotal, taxTotal, grandTotal };
  }

  /* --------------------------------------------------------------------------
     Authentic Document Preview
     -------------------------------------------------------------------------- */
  function updateDocPreview() {
    const previewContainer = document.getElementById('quotation-preview-target');
    if (!previewContainer) return;

    const customerInput = document.getElementById('quote-customer-input');
    const customer = customerInput ? customerInput.value : 'Gulf Axis General Trading LLC';
    const quoteNoInput = document.getElementById('quote-number-input');
    const quoteNo = quoteNoInput ? quoteNoInput.value : 'QT-2026-8850';
    const incotermsInput = document.getElementById('quote-incoterms-input');
    const incoterms = incotermsInput ? incotermsInput.value : 'CIF Dubai Port (Incoterms 2020)';
    const paymentInput = document.getElementById('quote-payment-input');
    const payment = paymentInput ? paymentInput.value : 'Irrevocable LC 60 Days at sight';

    const { subtotal, taxTotal, grandTotal } = calculateTotals();

    previewContainer.innerHTML = `
      <div class="doc-preview-watermark">OFFICIAL QUOTATION</div>
      
      <div class="doc-preview-header">
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            <img src="assets/images/hb-logo.png" alt="HB" style="width:24px;height:24px;object-fit:contain;">
            <span style="font-family:var(--font-heading);font-weight:700;font-size:1.1rem;color:var(--color-primary);">Hyna Precision Technologies Ltd.</span>
          </div>
          <div style="font-size:0.75rem;color:var(--text-muted);">Industrial Exports Division • Pune, MH, India</div>
          <div class="mono-num" style="font-size:0.7rem;color:var(--text-muted);">GSTIN: 27AAACH8842P1Z4 | IEC: 0310088921</div>
        </div>
        <div style="text-align:right;">
          <div class="mono-num" style="font-weight:700;font-size:1.05rem;color:var(--color-primary);">${quoteNo}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">Issue Date: ${new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">Valid Until: 30 Days from issue</div>
        </div>
      </div>

      <div class="doc-preview-parties">
        <div>
          <div style="font-size:0.68rem;font-family:var(--font-mono);color:var(--text-muted);text-transform:uppercase;">Origin (Issuer)</div>
          <div style="font-weight:600;font-size:0.85rem;">Hyna Precision Technologies Ltd.</div>
          <div style="font-size:0.76rem;color:var(--text-body);">JNPT Nhava Sheva Terminal, India 🇮🇳</div>
        </div>
        <div>
          <div style="font-size:0.68rem;font-family:var(--font-mono);color:var(--text-muted);text-transform:uppercase;">Consignee / Client</div>
          <div style="font-weight:600;font-size:0.85rem;">${escapeHtml(customer)}</div>
          <div style="font-size:0.76rem;color:var(--text-body);">Destination Port: Jebel Ali Port, UAE 🇦🇪</div>
        </div>
      </div>

      <table class="doc-preview-table">
        <thead>
          <tr>
            <th>Item & Description</th>
            <th style="text-align:center;">Qty</th>
            <th style="text-align:right;">Unit Price</th>
            <th style="text-align:center;">Disc</th>
            <th style="text-align:right;">Amount (USD)</th>
          </tr>
        </thead>
        <tbody>
          ${builderItems.map(i => `
            <tr>
              <td>
                <div style="font-weight:600;font-size:0.82rem;">${escapeHtml(i.product)}</div>
                <div class="mono-num" style="font-size:0.7rem;color:var(--text-muted);">${i.sku}</div>
              </td>
              <td class="mono-num" style="text-align:center;">${i.qty}</td>
              <td class="mono-num" style="text-align:right;">$${i.unitPrice.toFixed(2)}</td>
              <td class="mono-num" style="text-align:center;">${i.discount}%</td>
              <td class="mono-num" style="text-align:right;font-weight:600;">$${i.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="doc-preview-totals">
        <div class="doc-totals-list">
          <div class="doc-total-row">
            <span>Subtotal:</span>
            <span class="mono-num">$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
          <div class="doc-total-row">
            <span>Export Duty & Handling:</span>
            <span class="mono-num">$${taxTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
          <div class="doc-total-row grand">
            <span>Total Valuation:</span>
            <span class="mono-num">$${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
          </div>
        </div>
      </div>

      <div style="border-top:1px solid var(--border-light);padding-top:14px;font-size:0.76rem;color:var(--text-muted);line-height:1.5;">
        <div><strong>Delivery Terms:</strong> ${escapeHtml(incoterms)}</div>
        <div><strong>Payment Terms:</strong> ${escapeHtml(payment)}</div>
      </div>
    `;
  }

  function openNewQuotation(prefilledCustomer = '') {
    App.switchView('sales');
    // Switch to Quotations tab
    const quoteTab = document.querySelector('.subnav-tab-item[data-subnav="builder"]');
    if (quoteTab) quoteTab.click();

    if (prefilledCustomer) {
      const input = document.getElementById('quote-customer-input');
      if (input) {
        input.value = prefilledCustomer;
        updateDocPreview();
      }
    }
  }

  function previewQuote(quoteId) {
    const q = Store.getQuotations().find(item => item.id === quoteId);
    if (!q) return;

    builderItems = JSON.parse(JSON.stringify(q.items || []));
    const input = document.getElementById('quote-customer-input');
    const quoteNoInput = document.getElementById('quote-number-input');
    if (input) input.value = q.customer;
    if (quoteNoInput) quoteNoInput.value = q.number;

    renderBuilderItems();
    updateDocPreview();

    // Switch to builder tab
    const quoteTab = document.querySelector('.subnav-tab-item[data-subnav="builder"]');
    if (quoteTab) quoteTab.click();
  }

  function saveDraft() {
    const { grandTotal } = calculateTotals();
    const customer = document.getElementById('quote-customer-input').value;
    const quoteNo = document.getElementById('quote-number-input').value;

    Store.addQuotation({
      id: `quote-${Date.now()}`,
      number: quoteNo,
      customer: customer,
      date: new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }),
      amount: `$${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      numericAmount: grandTotal,
      status: 'Draft',
      validUntil: '30 Days from issue',
      items: JSON.parse(JSON.stringify(builderItems))
    });

    renderQuotationsTable();
    App.showToast(`Saved draft for quotation ${quoteNo}`, 'info');
  }

  function sendQuotation() {
    const quoteNo = document.getElementById('quote-number-input').value;
    const customer = document.getElementById('quote-customer-input').value;

    App.showToast(`Quotation ${quoteNo} transmitted to ${customer}`, 'success');
  }

  function convertQuotationToOrder() {
    const quoteNo = document.getElementById('quote-number-input').value;
    const customer = document.getElementById('quote-customer-input').value;
    const { grandTotal } = calculateTotals();

    const newOrderNo = `PO-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    Store.addOrder({
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNo,
      customer: customer,
      products: builderItems.map(i => i.product).join(', '),
      amount: `$${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      status: 'Confirmed',
      payment: 'LC at sight confirmed',
      delivery: 'Jebel Ali Marine Terminal'
    });

    renderOrdersTable();
    App.showToast(`Converted ${quoteNo} into Purchase Order ${newOrderNo}! Added to Orders queue.`, 'success');
  }

  /* --------------------------------------------------------------------------
     Orders Table
     -------------------------------------------------------------------------- */
  function renderOrdersTable() {
    const tbody = document.getElementById('orders-table-tbody');
    if (!tbody) return;

    const orders = Store.getOrders();

    tbody.innerHTML = orders.map(o => `
      <tr>
        <td class="mono-num" style="font-weight:700;">${o.orderNumber}</td>
        <td><strong>${escapeHtml(o.customer)}</strong></td>
        <td>${escapeHtml(o.products)}</td>
        <td class="mono-num" style="font-weight:700;">${o.amount}</td>
        <td>
          <span class="badge ${getOrderBadgeClass(o.status)}">${o.status}</span>
        </td>
        <td class="cell-muted" style="font-size:0.78rem;">${escapeHtml(o.payment)}</td>
        <td class="cell-muted" style="font-size:0.78rem;">${escapeHtml(o.delivery)}</td>
      </tr>
    `).join('');
  }

  function getOrderBadgeClass(status) {
    switch (status.toLowerCase()) {
      case 'completed': return 'badge-success';
      case 'confirmed': case 'processing': return 'badge-info';
      case 'cancelled': return 'badge-danger';
      default: return 'badge-warning';
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  return {
    init,
    renderQuotationsTable,
    renderOrdersTable,
    renderBuilderItems,
    updateItemField,
    addBuilderItem,
    removeBuilderItem,
    updateDocPreview,
    openNewQuotation,
    previewQuote,
    saveDraft,
    sendQuotation,
    convertQuotationToOrder
  };
})();
