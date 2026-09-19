/**
 * HYNA BIZ — Core Platform Controller
 * Manages platform navigation, modals, BizAI queries, workflow states, and toasts.
 */

const App = (() => {
  // BizAI Pre-computed Intelligence Datasets
  const bizAIInsights = {
    leads: {
      title: 'High-Priority Deal Follow-up Analysis',
      score: '94% Confidence',
      badge: 'Immediate Action Recommended',
      summary: 'BizAI identified 3 enterprise opportunities where procurement velocity indicates closing probability exceeds 80% if executive engagement occurs within 48 hours.',
      items: [
        {
          heading: 'Apex Industrial GmbH (Germany 🇩🇪)',
          detail: 'Contract markup was reviewed by Dr. Markus Weber 2 hours ago. Recommendation: Send countersigned Appendix B on CIF Hamburg delivery clauses.',
          metric: '€340,000 • 85% Win Probability'
        },
        {
          heading: 'Al-Mansoor Trading LLC (UAE 🇦🇪)',
          detail: 'Letter of Credit 60 Days confirmed at sight. Ready for commercial invoice dispatch and customs clearance initiation.',
          metric: '$185,000 • Closed / Execution Stage'
        },
        {
          heading: 'Nordic CleanEnergy ASA (Norway 🇳🇴)',
          detail: 'Non-disclosure agreement executed. Strategic procurement team is evaluating tender specifications this week.',
          metric: '€520,000 • High Strategic Value'
        }
      ]
    },
    distributors: {
      title: 'Distributor Matching: Global Furniture & Precision Hardware',
      score: '91% Relevance Match',
      badge: '4 Vetted Distributors Found',
      summary: 'Cross-referenced export certifications, bonded warehouse capacity, and import customs history to identify prime distribution partners.',
      items: [
        {
          heading: 'Gulf Axis General Trading LLC (Dubai, UAE 🇦🇪)',
          detail: 'Operates 45,000 sq.ft bonded distribution facility in JAFZA. Currently holds active buyer demand across 12 GCC retail and commercial networks.',
          metric: 'Trade Rating: AAA • Lead Time: 4 Days'
        },
        {
          heading: 'Rotterdam Commercial Logistics B.V. (Netherlands 🇳🇱)',
          detail: 'Specializes in European inland transit and bonded customs handling for high-value architectural fixtures and contract furniture.',
          metric: 'EU CE Certified • Net 60 Terms'
        },
        {
          heading: 'Pacific Rim Commercial Supply Pte (Singapore 🇸🇬)',
          detail: 'Direct supply contracts with 3 major hospitality developers across Southeast Asia. Active RFQs open for Q4 fulfillment.',
          metric: 'APAC Distribution • Multi-Currency Ledger'
        }
      ]
    },
    margins: {
      title: 'Dynamic Cross-Border Margin Sensitivity Model',
      score: 'Simulation Complete',
      badge: 'Hedging Strategy Active',
      summary: 'Evaluated impact of projected 4.2% maritime freight rate adjustments against CIF vs FOB quotation terms for active pipeline deals.',
      items: [
        {
          heading: 'Incoterms CIF Dubai Protection',
          detail: 'Current locked marine cargo insurance covers tariff variance up to 6.5%. Gross margin remains stable at 28.4%.',
          metric: 'Net Margin: +28.4% (Protected)'
        },
        {
          heading: 'Currency Exposure (EUR / USD)',
          detail: 'European receivable hedge recommends fixing forward settlement rate at 1.095 to safeguard €340K Apex contract against FX slippage.',
          metric: 'Recommended Action: Forward Contract'
        },
        {
          heading: 'Raw Material Index (Steel & Inconel)',
          detail: 'Sub-tier supplier contract pricing valid until Nov 30. Suggest locking Q1 2027 purchase orders before quarterly index adjustment.',
          metric: 'Cost Variance: +1.8% Projected'
        }
      ]
    }
  };

  // Connected Business Workflow Stages
  const workflowData = [
    {
      id: 'step-business',
      title: 'Business Management',
      badge: '01',
      desc: 'Set up your corporate identity, tax registrations, verified entity details, and internal team workspaces.',
      preview: 'Corporate Profile (98% verification) • Multi-entity structure • Role-based access control'
    },
    {
      id: 'step-product',
      title: 'Products Master',
      badge: '02',
      desc: 'Publish comprehensive product catalogs with HS codes, technical tolerances, inventory, and tier pricing.',
      preview: 'Automated HS-Code classification • Export readiness audit • Live stock by warehouse'
    },
    {
      id: 'step-lead',
      title: 'Lead Generation',
      badge: '03',
      desc: 'Capture inbound commercial inquiries and buyer RFQs from the global business network directly into your desk.',
      preview: 'Automated enrichment • Buyer credit score verification • Inbound RFQ intake'
    },
    {
      id: 'step-connection',
      title: 'Business Connection',
      badge: '04',
      desc: 'Establish bilateral relationships with verified manufacturers, distributors, and buyers worldwide.',
      preview: 'Mutual NDA verification • Direct executive messaging • Capability compliance review'
    },
    {
      id: 'step-crm',
      title: 'CRM Pipeline',
      badge: '05',
      desc: 'Move discovered opportunities into your structured commercial pipeline with deal velocity tracking.',
      preview: '6-stage commercial pipeline • Multi-currency values • Scheduled legal milestones'
    },
    {
      id: 'step-deal',
      title: 'Deal Negotiation',
      badge: '06',
      desc: 'Collaborate on terms, specs, delivery milestones, and payment securities in one centralized deal room.',
      preview: 'Shared audit trail • Contract markup log • Irrevocable LC terms alignment'
    },
    {
      id: 'step-quotation',
      title: 'Formal Quotation',
      badge: '07',
      desc: 'Generate professional commercial quotations with Incoterms 2020, tax breakdowns, and official seals.',
      preview: 'Instant PDF export • Incoterms CIF/FOB pricing • Serialized quotation stamps'
    },
    {
      id: 'step-order',
      title: 'Purchase Order',
      badge: '08',
      desc: 'Convert approved quotations directly into binding Purchase Orders with automatic inventory reservation.',
      preview: '1-click quotation conversion • Production queue dispatch • Milestone billing'
    },
    {
      id: 'step-trade',
      title: 'Global Trade',
      badge: '09',
      desc: 'Fulfill cross-border shipments with automated Bill of Lading, Certificate of Origin, and customs documents.',
      preview: 'Real-time port tracking • Dual-party escrow release • End-to-end trade clearance'
    }
  ];

  function init() {
    initHeaderScroll();
    initBizAIEngine();
    initWorkflowTrack();
    initKeyboardShortcuts();
    initConsoleTabs();

    // Initialize sub-modules
    CRMModule.init();
    DiscoveryModule.init();
    QuotationModule.init();
    MapModule.init();
  }

  /* --------------------------------------------------------------------------
     Navigation & Header Scroll
     -------------------------------------------------------------------------- */
  function initHeaderScroll() {
    const header = document.querySelector('.enterprise-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 4px 20px rgba(11, 18, 32, 0.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

  function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;
    if (nav.style.display === 'flex') {
      nav.style.display = 'none';
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '72px';
      nav.style.left = '0';
      nav.style.width = '100%';
      nav.style.backgroundColor = '#FFFFFF';
      nav.style.padding = '20px';
      nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      nav.style.borderBottom = '1px solid #E2E8F0';
    }
  }

  /* --------------------------------------------------------------------------
     BizAI Business Intelligence Suite
     -------------------------------------------------------------------------- */
  function initBizAIEngine() {
    loadBizAIQuery('leads');
  }

  function loadBizAIQuery(queryKey) {
    const data = bizAIInsights[queryKey];
    if (!data) return;

    // Update buttons active state
    document.querySelectorAll('.bizai-query-btn').forEach(btn => {
      if (btn.dataset.query === queryKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const viewport = document.getElementById('bizai-results-viewport');
    if (!viewport) return;

    viewport.innerHTML = `
      <div class="bizai-intelligence-card">
        <div class="bizai-intel-header">
          <div>
            <h4 style="font-size:1.05rem;color:#FFFFFF;">${data.title}</h4>
            <div style="font-size:0.75rem;color:#94A3B8;margin-top:2px;">Targeted Data Mesh • Multi-source synthesis</div>
          </div>
          <span class="bizai-score-pill">${data.score}</span>
        </div>

        <p style="font-size:0.88rem;color:#CBD5E1;line-height:1.55;">
          ${data.summary}
        </p>

        <div style="display:flex;flex-direction:column;gap:12px;margin-top:6px;">
          ${data.items.map(item => `
            <div style="background:rgba(255, 255, 255, 0.04);border:1px solid rgba(255, 255, 255, 0.08);border-radius:6px;padding:12px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                <span style="font-weight:700;color:#FFFFFF;font-size:0.88rem;">${item.heading}</span>
                <span class="mono-num" style="font-size:0.75rem;color:#00C2FF;font-weight:600;">${item.metric}</span>
              </div>
              <div style="font-size:0.8rem;color:#94A3B8;line-height:1.4;">${item.detail}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Analytical Visualization Widget -->
      <div class="bizai-intelligence-card">
        <div class="bizai-intel-header">
          <h4 style="font-size:0.95rem;color:#FFFFFF;">Predictive Decision Radar</h4>
          <span class="badge badge-blue">Real-Time</span>
        </div>

        <div style="display:flex;flex-direction:column;gap:14px;padding-top:8px;">
          <div>
            <div style="display:flex;justify-content:space-between;font-size:0.78rem;margin-bottom:4px;">
              <span style="color:#94A3B8;">CRM Follow-up Velocity</span>
              <span class="mono-num" style="color:#10B981;font-weight:700;">96.2% Optimal</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.1);border-radius:3px;overflow:hidden;">
              <div style="width:96%;height:100%;background:#10B981;"></div>
            </div>
          </div>

          <div>
            <div style="display:flex;justify-content:space-between;font-size:0.78rem;margin-bottom:4px;">
              <span style="color:#94A3B8;">Counterparty Verification Index</span>
              <span class="mono-num" style="color:#00C2FF;font-weight:700;">99.4% Verified</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.1);border-radius:3px;overflow:hidden;">
              <div style="width:99%;height:100%;background:#00C2FF;"></div>
            </div>
          </div>

          <div>
            <div style="display:flex;justify-content:space-between;font-size:0.78rem;margin-bottom:4px;">
              <span style="color:#94A3B8;">Trade Route Compliance & Customs</span>
              <span class="mono-num" style="color:#F59E0B;font-weight:700;">88.5% Clear</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.1);border-radius:3px;overflow:hidden;">
              <div style="width:88%;height:100%;background:#F59E0B;"></div>
            </div>
          </div>

          <div style="margin-top:10px;padding:12px;background:rgba(0,194,255,0.06);border:1px solid rgba(0,194,255,0.2);border-radius:6px;">
            <div style="font-family:'JetBrains Mono',monospace;font-size:0.7rem;color:#00C2FF;text-transform:uppercase;margin-bottom:4px;">Executive Summary</div>
            <div style="font-size:0.78rem;color:#CBD5E1;line-height:1.45;">
              All commercial parameters correlate with low trade friction. Proceed with proposed contract terms.
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* --------------------------------------------------------------------------
     Connected Business Workflow
     -------------------------------------------------------------------------- */
  function initWorkflowTrack() {
    const track = document.getElementById('workflow-track-container');
    if (!track) return;

    track.innerHTML = workflowData.map((step, idx) => `
      <div class="workflow-stage-node ${idx === 4 ? 'active' : ''}" 
           id="node-${step.id}"
           onclick="App.selectWorkflowStep('${step.id}')">
        <div class="stage-num-badge">${step.badge}</div>
        <div class="stage-name">${step.title}</div>
        <div class="stage-snippet-preview">${step.preview.split('•')[0]}</div>
      </div>
    `).join('');

    selectWorkflowStep('step-crm');
  }

  function selectWorkflowStep(stepId) {
    const step = workflowData.find(s => s.id === stepId);
    if (!step) return;

    document.querySelectorAll('.workflow-stage-node').forEach(node => {
      node.classList.remove('active');
    });

    const activeNode = document.getElementById(`node-${stepId}`);
    if (activeNode) activeNode.classList.add('active');

    const detailBox = document.getElementById('workflow-detail-content');
    if (!detailBox) return;

    detailBox.innerHTML = `
      <div style="flex:1;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
          <span class="badge badge-blue">Stage ${step.badge}</span>
          <h4 style="font-size:1.25rem;color:#0B1220;">${step.title}</h4>
        </div>
        <p style="font-size:0.95rem;color:#475569;line-height:1.6;margin-bottom:12px;">${step.desc}</p>
        <div style="font-family:'JetBrains Mono',monospace;font-size:0.8rem;color:#0369A1;background:#F0F9FF;padding:8px 14px;border-radius:4px;border:1px solid #BAE6FD;">
          Data Mesh Handshake: ${step.preview}
        </div>
      </div>
      <div style="text-align:right;">
        <button class="btn btn-primary btn-sm" onclick="App.jumpToPlatformPillar('${step.id}')">
          Open in Platform →
        </button>
      </div>
    `;
  }

  function jumpToPlatformPillar(stepId) {
    if (stepId.includes('crm')) {
      document.getElementById('crm-section').scrollIntoView({ behavior: 'smooth' });
    } else if (stepId.includes('quotation')) {
      document.getElementById('quotations-section').scrollIntoView({ behavior: 'smooth' });
    } else if (stepId.includes('connection')) {
      document.getElementById('connections-section').scrollIntoView({ behavior: 'smooth' });
    } else if (stepId.includes('trade')) {
      document.getElementById('trade-section').scrollIntoView({ behavior: 'smooth' });
    } else if (stepId.includes('business') || stepId.includes('product')) {
      document.getElementById('biz-mgmt-section').scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('ecosystem-section').scrollIntoView({ behavior: 'smooth' });
    }
  }

  /* --------------------------------------------------------------------------
     Console Data Tabs (Business Management)
     -------------------------------------------------------------------------- */
  function initConsoleTabs() {
    const tabs = document.querySelectorAll('.console-tab-btn');
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        loadConsoleTabContent(btn.dataset.tab);
      });
    });
  }

  function loadConsoleTabContent(tabKey) {
    const pane = document.getElementById('console-tab-pane');
    if (!pane) return;

    if (tabKey === 'products') {
      pane.innerHTML = `
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Item Description</th>
                <th>HS Code</th>
                <th>Category</th>
                <th>Warehouse Stock</th>
                <th>Unit Cost</th>
                <th>Export Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="mono-num" style="font-weight:700;">HB-ENG-8820</td>
                <td>CNC Precision Turbine Shaft Assemblies</td>
                <td class="mono-num">8406.81</td>
                <td>Industrial Machinery</td>
                <td class="mono-num">240 Units (Pune Hub)</td>
                <td class="mono-num">$1,250.00</td>
                <td><span class="badge badge-green">Export Ready</span></td>
              </tr>
              <tr>
                <td class="mono-num" style="font-weight:700;">HB-VAL-4102</td>
                <td>Cryogenic Flow Control Valves (DN 80)</td>
                <td class="mono-num">8481.80</td>
                <td>Fluid Systems</td>
                <td class="mono-num">580 Units (Mumbai Hub)</td>
                <td class="mono-num">$175.00</td>
                <td><span class="badge badge-green">Export Ready</span></td>
              </tr>
              <tr>
                <td class="mono-num" style="font-weight:700;">HB-SEAL-901</td>
                <td>Double Flange O-Rings (Viton B)</td>
                <td class="mono-num">4016.93</td>
                <td>Polymer & Seals</td>
                <td class="mono-num">1,850 Sets (JAFZA Dubai)</td>
                <td class="mono-num">$18.00</td>
                <td><span class="badge badge-green">Export Ready</span></td>
              </tr>
              <tr>
                <td class="mono-num" style="font-weight:700;">HB-HYD-330</td>
                <td>High-Pressure Rotary Pumps (Class 300)</td>
                <td class="mono-num">8413.60</td>
                <td>Hydraulics</td>
                <td class="mono-num">95 Units (Stuttgart)</td>
                <td class="mono-num">$840.00</td>
                <td><span class="badge badge-blue">Inspection Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    } else if (tabKey === 'suppliers') {
      pane.innerHTML = `
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Supplier Entity</th>
                <th>Country</th>
                <th>Material Category</th>
                <th>Lead Time</th>
                <th>Contract Status</th>
                <th>Audit Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight:600;">Jindal Stainless Ltd.</td>
                <td>India 🇮🇳</td>
                <td>316L Marine Stainless Billets</td>
                <td class="mono-num">12 Days</td>
                <td><span class="badge badge-green">Master Agreement</span></td>
                <td class="mono-num" style="font-weight:700;color:#10B981;">99.2%</td>
              </tr>
              <tr>
                <td style="font-weight:600;">Thyssenkrupp Materials Services</td>
                <td>Germany 🇩🇪</td>
                <td>Special Inconel Aerospace Alloys</td>
                <td class="mono-num">18 Days</td>
                <td><span class="badge badge-green">Active SLA</span></td>
                <td class="mono-num" style="font-weight:700;color:#10B981;">98.7%</td>
              </tr>
              <tr>
                <td style="font-weight:600;">SABIC Polymers Bulk</td>
                <td>Saudi Arabia 🇸🇦</td>
                <td>High-Density Resins</td>
                <td class="mono-num">8 Days</td>
                <td><span class="badge badge-blue">Renewing Q4</span></td>
                <td class="mono-num" style="font-weight:700;color:#10B981;">97.9%</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    } else if (tabKey === 'documents') {
      pane.innerHTML = `
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Classification</th>
                <th>Issued For</th>
                <th>Security Level</th>
                <th>Valid Through</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight:600;">Certificate of Origin (Form A)</td>
                <td><span class="badge badge-blue">Trade Document</span></td>
                <td>Gulf Axis General Trading LLC</td>
                <td>Encrypted SHA-256</td>
                <td class="mono-num">Oct 2026</td>
                <td><button class="btn btn-outline btn-sm" onclick="App.showToast('Downloaded Certificate of Origin', 'info')">Download</button></td>
              </tr>
              <tr>
                <td style="font-weight:600;">Commercial Invoice #CI-2026-881</td>
                <td><span class="badge badge-blue">Financial Audit</span></td>
                <td>Apex Industrial GmbH</td>
                <td>Legally Signed</td>
                <td class="mono-num">Dec 2026</td>
                <td><button class="btn btn-outline btn-sm" onclick="App.showToast('Downloaded Commercial Invoice', 'info')">Download</button></td>
              </tr>
              <tr>
                <td style="font-weight:600;">ISO 9001:2015 Bureau Veritas Seal</td>
                <td><span class="badge badge-green">Compliance</span></td>
                <td>Global Registry</td>
                <td>Public Certified</td>
                <td class="mono-num">Aug 2027</td>
                <td><button class="btn btn-outline btn-sm" onclick="App.showToast('Downloaded ISO Certificate', 'info')">Download</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    } else {
      // Default: Overview Profile
      pane.innerHTML = `
        <div class="business-profile-header">
          <div class="biz-avatar-row">
            <div class="biz-logo-box">HB</div>
            <div class="biz-name-col">
              <h3>Hyna Precision Technologies Ltd. <span class="badge badge-green">Verified Enterprise</span></h3>
              <p>Industrial Manufacturing & Global Export • Headquartered in Pune, India 🇮🇳</p>
            </div>
          </div>
          <div class="verification-score-badge">
            <div class="score-num">98.4%</div>
            <div class="score-label">Global Trade<br>Compliance Score</div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:16px;margin-bottom:24px;">
          <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:6px;padding:14px;">
            <div style="font-size:0.72rem;font-family:'JetBrains Mono',monospace;color:#64748B;text-transform:uppercase;">Registration</div>
            <div style="font-weight:700;color:#0B1220;font-size:0.95rem;margin-top:4px;">U29100MH2021PTC</div>
            <div style="font-size:0.75rem;color:#10B981;margin-top:2px;">Active & Good Standing</div>
          </div>
          <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:6px;padding:14px;">
            <div style="font-size:0.72rem;font-family:'JetBrains Mono',monospace;color:#64748B;text-transform:uppercase;">Authorized Capital</div>
            <div style="font-weight:700;color:#0B1220;font-size:0.95rem;margin-top:4px;">$15,000,000 USD</div>
            <div style="font-size:0.75rem;color:#64748B;margin-top:2px;">Fully Paid Up</div>
          </div>
          <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:6px;padding:14px;">
            <div style="font-size:0.72rem;font-family:'JetBrains Mono',monospace;color:#64748B;text-transform:uppercase;">Export Licensure</div>
            <div style="font-weight:700;color:#0B1220;font-size:0.95rem;margin-top:4px;">IEC: 0310088921</div>
            <div style="font-size:0.75rem;color:#10B981;margin-top:2px;">DGFT Validated</div>
          </div>
          <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:6px;padding:14px;">
            <div style="font-size:0.72rem;font-family:'JetBrains Mono',monospace;color:#64748B;text-transform:uppercase;">Banking Line</div>
            <div style="font-weight:700;color:#0B1220;font-size:0.95rem;margin-top:4px;">Standard Chartered LC</div>
            <div style="font-size:0.75rem;color:#64748B;margin-top:2px;">SWIFT Verified</div>
          </div>
        </div>
      `;
    }
  }

  /* --------------------------------------------------------------------------
     Modals & Global Search
     -------------------------------------------------------------------------- */
  function openCreateBusinessModal() {
    const modal = document.getElementById('create-business-modal');
    if (modal) modal.classList.add('open');
  }

  function openSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) {
      modal.classList.add('open');
      const input = document.getElementById('global-search-input');
      if (input) setTimeout(() => input.focus(), 50);
    }
  }

  function closeModals() {
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.classList.remove('open');
    });
  }

  function handleCreateBusinessSubmit(e) {
    e.preventDefault();
    const nameInput = document.getElementById('new-biz-name');
    const name = nameInput ? nameInput.value : 'Your Enterprise';

    closeModals();
    showToast(`Enterprise profile "${name}" successfully provisioned on HynaBiz Global Network!`, 'success');
  }

  function initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearchModal();
      }
      if (e.key === 'Escape') {
        closeModals();
      }
    });
  }

  /* --------------------------------------------------------------------------
     Toast Notification Dispatcher
     -------------------------------------------------------------------------- */
  function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : type === 'orange' ? 'toast-orange' : ''}`;
    toast.innerHTML = `
      <div style="flex:1;">${message}</div>
      <span style="cursor:pointer;opacity:0.7;line-height:1;" onclick="this.parentElement.remove()">✕</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 4500);
  }

  return {
    init,
    toggleMobileMenu,
    loadBizAIQuery,
    selectWorkflowStep,
    jumpToPlatformPillar,
    openCreateBusinessModal,
    openSearchModal,
    closeModals,
    handleCreateBusinessSubmit,
    showToast
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
