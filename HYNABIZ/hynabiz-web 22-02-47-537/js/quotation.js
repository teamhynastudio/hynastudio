/**
 * HYNA BIZ — Sales & Quotation Document Module
 * Renders an authentic commercial document and handles the "Convert to Order" transition.
 */

const QuotationModule = (() => {
  let isConvertedToOrder = false;

  const quoteData = {
    quoteNumber: 'QT-2026-8842',
    orderNumber: 'PO-2026-9921',
    issueDate: '19 September 2026',
    validUntil: '19 October 2026',
    seller: {
      name: 'Hyna Precision Technologies Ltd.',
      division: 'Heavy Industrial Components Division',
      address: 'Plot 48, Tech Park Sector 5, Pune 411057, MH, India',
      taxId: 'GSTIN: 27AAACH8842P1Z4',
      contact: 'Rajesh Sharma • Exports Director'
    },
    buyer: {
      name: 'Gulf Axis General Trading LLC',
      division: 'Procurement & Regional Distribution Desk',
      address: 'Building 4B, Jebel Ali Free Zone (JAFZA), Dubai, UAE',
      taxId: 'TRN: 100284719200003',
      contact: 'Tariq Al-Mansoor • Managing Director'
    },
    items: [
      {
        sku: 'HB-ENG-8820',
        desc: 'CNC 5-Axis Precision Turbine Shaft Assemblies (Inconel 718, Aerospace Grade)',
        hsCode: '8406.81',
        qty: 40,
        unit: 'units',
        price: 1250.00,
        taxRate: 0.05
      },
      {
        sku: 'HB-VAL-4102',
        desc: 'High-Pressure Cryogenic Flow Control Valves (DN 80 / Class 600)',
        hsCode: '8481.80',
        qty: 120,
        unit: 'units',
        price: 175.00,
        taxRate: 0.05
      },
      {
        sku: 'HB-SEAL-901',
        desc: 'Reinforced Metal-to-Metal Double Flange O-Rings (Viton B High Temp)',
        hsCode: '4016.93',
        qty: 250,
        unit: 'sets',
        price: 18.00,
        taxRate: 0.05
      },
      {
        sku: 'HB-LOG-0091',
        desc: 'Export Moisture-Proof Vacuum Crating, Port Handling & Maritime Freight Insurance (CIF Dubai)',
        hsCode: '9968.12',
        qty: 1,
        unit: 'lot',
        price: 3450.00,
        taxRate: 0.00
      }
    ],
    terms: {
      incoterms: 'CIF Dubai Port (Incoterms 2020)',
      payment: 'Irrevocable Letter of Credit (LC) 60 Days at sight from Bill of Lading date',
      shipment: 'Estimated 18 calendar days via JNPT Nhava Sheva to Jebel Ali Port',
      warranty: '24 Months standard manufacturer guarantee with metallurgical mill certificate'
    }
  };

  function calculateTotals() {
    let subtotal = 0;
    let taxTotal = 0;

    quoteData.items.forEach(item => {
      const lineTotal = item.qty * item.price;
      subtotal += lineTotal;
      taxTotal += lineTotal * item.taxRate;
    });

    const grandTotal = subtotal + taxTotal;
    return { subtotal, taxTotal, grandTotal };
  }

  function renderQuotation() {
    const frame = document.getElementById('quotation-preview-frame');
    if (!frame) return;

    const { subtotal, taxTotal, grandTotal } = calculateTotals();

    frame.innerHTML = `
      <div class="document-watermark">${isConvertedToOrder ? 'PURCHASE ORDER' : 'OFFICIAL QUOTATION'}</div>

      <!-- Document Header -->
      <div class="doc-header-row">
        <div class="doc-issuer">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
            <img src="assets/images/hb-logo.png" alt="HynaBiz Emblem" style="width:32px;height:32px;object-fit:contain;">
            <h2>${quoteData.seller.name}</h2>
          </div>
          <p>${quoteData.seller.division}</p>
          <p>${quoteData.seller.address}</p>
          <p class="mono-num" style="font-size:0.75rem;color:#64748B;">${quoteData.seller.taxId} | Trade License: INT-IND-88419</p>
        </div>

        <div class="doc-meta-box">
          <div style="margin-bottom:6px;">
            <span class="badge ${isConvertedToOrder ? 'badge-green' : 'badge-dark'}">
              ${isConvertedToOrder ? 'CONFIRMED PURCHASE ORDER' : 'COMMERCIAL QUOTATION'}
            </span>
          </div>
          <div class="doc-number">${isConvertedToOrder ? quoteData.orderNumber : quoteData.quoteNumber}</div>
          <div class="doc-date">Issue Date: ${quoteData.issueDate}</div>
          <div class="doc-date" style="color:${isConvertedToOrder ? '#10B981' : '#FF6B4A'};font-weight:600;">
            ${isConvertedToOrder ? 'Status: Approved & Processing' : `Validity: ${quoteData.validUntil}`}
          </div>
        </div>
      </div>

      <!-- Bilateral Counterparties -->
      <div class="doc-parties-grid">
        <div class="doc-party-col">
          <h4>Issued From (Supplier)</h4>
          <div class="party-name">${quoteData.seller.name}</div>
          <div class="party-details">
            Attn: ${quoteData.seller.contact}<br>
            Origin Port: Jawaharlal Nehru Port Trust (JNPT), Mumbai, India 🇮🇳<br>
            Export IEC: 0310088921
          </div>
        </div>

        <div class="doc-party-col">
          <h4>Consignee / Buyer</h4>
          <div class="party-name">${quoteData.buyer.name}</div>
          <div class="party-details">
            Attn: ${quoteData.buyer.contact}<br>
            ${quoteData.buyer.address}<br>
            Destination Port: Jebel Ali Port, Dubai, UAE 🇦🇪<br>
            Tax ID: ${quoteData.buyer.taxId}
          </div>
        </div>
      </div>

      <!-- Line Items Table -->
      <table class="quotation-items-table">
        <thead>
          <tr>
            <th style="width:12%;">Item Code</th>
            <th style="width:42%;">Description & HS Code</th>
            <th style="width:10%;text-align:center;">Qty</th>
            <th style="width:16%;text-align:right;">Unit Price</th>
            <th style="width:20%;text-align:right;">Amount (USD)</th>
          </tr>
        </thead>
        <tbody>
          ${quoteData.items.map(item => `
            <tr>
              <td class="mono-num" style="font-weight:600;font-size:0.8rem;color:#0B1220;">${item.sku}</td>
              <td>
                <div style="font-weight:600;color:#0B1220;">${item.desc}</div>
                <div style="font-size:0.75rem;color:#64748B;font-family:'JetBrains Mono',monospace;">HS Code: ${item.hsCode}</div>
              </td>
              <td class="mono-num" style="text-align:center;">${item.qty} ${item.unit}</td>
              <td class="mono-num" style="text-align:right;">$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
              <td class="mono-num" style="text-align:right;font-weight:700;">$${(item.qty * item.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Document Terms & Totals -->
      <div class="doc-footer-grid">
        <div class="doc-terms-box">
          <h5>Standard Commercial Terms</h5>
          <p><strong>Delivery Terms:</strong> ${quoteData.terms.incoterms}</p>
          <p><strong>Payment Terms:</strong> ${quoteData.terms.payment}</p>
          <p><strong>Transit Route:</strong> ${quoteData.terms.shipment}</p>
          <p><strong>Quality & Warranty:</strong> ${quoteData.terms.warranty}</p>

          <div style="display:flex;align-items:center;gap:18px;margin-top:24px;">
            <div style="border-top:1px dashed #94A3B8;padding-top:6px;width:160px;text-align:center;">
              <span style="font-size:0.72rem;font-family:'JetBrains Mono',monospace;color:#64748B;">AUTHORIZED SIGNATURE</span>
              <div style="font-family:'Newsreader',serif;font-style:italic;font-size:1.1rem;color:#0B1220;margin-top:4px;">Rajesh Sharma</div>
            </div>
            <div style="border:2px solid ${isConvertedToOrder ? '#10B981' : '#0B1220'};padding:6px 12px;border-radius:4px;text-align:center;transform:rotate(-4deg);">
              <div style="font-family:'JetBrains Mono',monospace;font-size:0.65rem;font-weight:700;color:${isConvertedToOrder ? '#10B981' : '#0B1220'};text-transform:uppercase;">
                ${isConvertedToOrder ? '✓ ORDER CONFIRMED' : 'HYNA BIZ VERIFIED'}
              </div>
              <div style="font-size:0.6rem;color:#64748B;">DOCUMENT CERTIFIED</div>
            </div>
          </div>
        </div>

        <div class="doc-totals-box">
          <div class="total-row">
            <span>Subtotal (FOB Baseline)</span>
            <span class="mono-num">$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
          <div class="total-row">
            <span>Port Freight & Marine Insurance</span>
            <span class="mono-num">$3,450.00</span>
          </div>
          <div class="total-row">
            <span>Estimated Customs Clearance / Duty</span>
            <span class="mono-num">$${taxTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
          <div class="total-row grand-total">
            <span>Total Valuation</span>
            <span class="mono-num">$${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
          </div>
        </div>
      </div>
    `;

    updateActionButtons();
  }

  function updateActionButtons() {
    const convertBtn = document.getElementById('btn-convert-order');
    if (!convertBtn) return;

    if (isConvertedToOrder) {
      convertBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        Order Confirmed (#PO-2026-9921)
      `;
      convertBtn.classList.remove('btn-orange');
      convertBtn.classList.add('btn-primary');
    } else {
      convertBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        Convert to Order
      `;
      convertBtn.classList.remove('btn-primary');
      convertBtn.classList.add('btn-orange');
    }
  }

  function convertToOrder() {
    if (isConvertedToOrder) {
      App.showToast('This quotation has already been converted into Purchase Order #PO-2026-9921.', 'info');
      return;
    }

    isConvertedToOrder = true;
    renderQuotation();
    App.showToast('Success! Quotation converted to Purchase Order #PO-2026-9921. Dispatched to logistics queue.', 'success');
  }

  function sendQuotation() {
    App.showToast(`Quotation ${quoteData.quoteNumber} dispatched electronically to Gulf Axis General Trading LLC.`, 'success');
  }

  function saveDraft() {
    App.showToast(`Quotation ${quoteData.quoteNumber} saved securely to Enterprise Document Repository.`, 'info');
  }

  function downloadDoc() {
    window.print();
  }

  return {
    init: renderQuotation,
    convertToOrder,
    sendQuotation,
    saveDraft,
    downloadDoc
  };
})();
