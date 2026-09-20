/**
 * HYNA BIZ — Central Reactive Data Store
 * Realistic business records, workflows, and cross-module synchronization.
 */

const Store = (() => {
  // Core Metrics
  const metrics = {
    activeLeads: 128,
    openDeals: 24,
    customers: 86,
    pendingQuotations: 17
  };

  // Recent Business Activity
  let activities = [
    { id: 'act-1', company: 'ABC Industries', activity: 'New lead qualified from Munich event', type: 'CRM', status: 'Open', date: 'Today' },
    { id: 'act-2', company: 'Global Trade Co.', activity: 'Commercial quotation #QT-2026-8842 sent', type: 'Sales', status: 'Pending', date: 'Today' },
    { id: 'act-3', company: 'Metro Furniture AG', activity: 'Connection request accepted', type: 'Network', status: 'Active', date: 'Yesterday' },
    { id: 'act-4', company: 'Gulf Axis General Trading', activity: 'Purchase Order #PO-2026-9921 confirmed', type: 'Orders', status: 'Completed', date: 'Sep 18' },
    { id: 'act-5', company: 'Apex Precision Engineering', activity: 'CIF Hamburg customs review logged', type: 'Trade', status: 'Active', date: 'Sep 17' }
  ];

  // Products Master Catalog
  let products = [
    {
      id: 'prod-001',
      name: 'CNC 5-Axis Precision Turbine Shaft Assemblies',
      category: 'Industrial Machinery',
      sku: 'HB-ENG-8820',
      price: 1250.00,
      availability: '240 Units in Stock',
      stockQty: 240,
      markets: 'EU, GCC, North America',
      status: 'In Stock',
      hsCode: '8406.81',
      description: 'Aerospace-grade Inconel 718 machined rotor shafts engineered for high-temperature compression turbines.'
    },
    {
      id: 'prod-002',
      name: 'Cryogenic Flow Control Valves (DN 80 / Class 600)',
      category: 'Fluid Systems',
      sku: 'HB-VAL-4102',
      price: 175.00,
      availability: '580 Units in Stock',
      stockQty: 580,
      markets: 'GCC, APAC, India',
      status: 'In Stock',
      hsCode: '8481.80',
      description: 'Stainless 316L body with stellite hard-faced trim for LNG terminal flow control.'
    },
    {
      id: 'prod-003',
      name: 'Reinforced Double Flange O-Rings (Viton B)',
      category: 'Polymers & Seals',
      sku: 'HB-SEAL-901',
      price: 18.00,
      availability: '1,850 Sets in Stock',
      stockQty: 1850,
      markets: 'Global',
      status: 'In Stock',
      hsCode: '4016.93',
      description: 'Fluorocarbon elastomer sealing elements resistant to aggressive petrochemical hydrocarbons.'
    },
    {
      id: 'prod-004',
      name: 'High-Pressure Rotary Gear Pumps (Class 300)',
      category: 'Hydraulics',
      sku: 'HB-HYD-330',
      price: 840.00,
      availability: '45 Units Backordered',
      stockQty: 45,
      markets: 'EU, APAC',
      status: 'Low Stock',
      hsCode: '8413.60',
      description: 'Positive displacement gear pump rated for continuous 280 bar operating pressures.'
    }
  ];

  // CRM Leads
  let leads = [
    {
      id: 'lead-1',
      name: 'Dr. Markus Weber',
      company: 'Apex Industrial GmbH',
      source: 'Global Network Discovery',
      owner: 'Vignesh',
      value: '€340,000',
      numericValue: 375000,
      stage: 'Proposal',
      lastActivity: 'Contract markup sent 2h ago',
      nextFollowUp: 'Legal call • Sep 22',
      country: 'Germany 🇩🇪'
    },
    {
      id: 'lead-2',
      name: 'Tariq Al-Mansoor',
      company: 'Gulf Axis General Trading',
      source: 'Inbound Trade Inquiry',
      owner: 'Vignesh',
      value: '$185,000',
      numericValue: 185000,
      stage: 'Won',
      lastActivity: 'Order confirmed today',
      nextFollowUp: 'Shipping dispatch notice',
      country: 'UAE 🇦🇪'
    },
    {
      id: 'lead-3',
      name: 'Kenji Sato',
      company: 'Kyocera Micro-Optics',
      source: 'Direct Business Connection',
      owner: 'Sarah Jenkins',
      value: '¥48,000,000',
      numericValue: 320000,
      stage: 'Negotiation',
      lastActivity: 'Technical specs audited',
      nextFollowUp: 'Pilot batch dispatch',
      country: 'Japan 🇯🇵'
    },
    {
      id: 'lead-4',
      name: 'Astrid Lindqvist',
      company: 'Nordic CleanEnergy ASA',
      source: 'BizAI Match',
      owner: 'Vignesh',
      value: '€520,000',
      numericValue: 570000,
      stage: 'Qualified',
      lastActivity: 'Executive NDA signed',
      nextFollowUp: 'RFQ review meeting',
      country: 'Norway 🇳🇴'
    },
    {
      id: 'lead-5',
      name: 'David Miller',
      company: 'Great Lakes Machining Corp',
      source: 'Commercial Referral',
      owner: 'Sunil Nair',
      value: '$260,000',
      numericValue: 260000,
      stage: 'New',
      lastActivity: 'Inbound match verified',
      nextFollowUp: 'Initial intro call',
      country: 'USA 🇺🇸'
    }
  ];

  // CRM Deals (Kanban Stages: New, Qualified, Proposal, Negotiation, Won, Lost)
  let deals = [
    {
      id: 'deal-101',
      title: 'Heavy Turbomachinery Rotor Blades',
      company: 'Apex Industrial GmbH',
      value: '€340,000',
      numericValue: 375000,
      stage: 'Negotiation',
      owner: 'Vignesh',
      nextAction: 'Finalize Appendix B on CIF Hamburg terms',
      expectedClose: 'Oct 15, 2026'
    },
    {
      id: 'deal-102',
      title: 'Cryogenic Valves Regional Distribution',
      company: 'Gulf Axis General Trading',
      value: '$185,000',
      numericValue: 185000,
      stage: 'Won',
      owner: 'Vignesh',
      nextAction: 'Customs dispatch notice • Sep 24',
      expectedClose: 'Sep 19, 2026'
    },
    {
      id: 'deal-103',
      title: 'Sapphire Substrate Micro-Lenses',
      company: 'Kyocera Micro-Optics',
      value: '¥48,000,000',
      numericValue: 320000,
      stage: 'Proposal',
      owner: 'Sarah Jenkins',
      nextAction: 'Provide cleanroom Class 100 audit report',
      expectedClose: 'Nov 02, 2026'
    },
    {
      id: 'deal-104',
      title: 'Offshore Subsea Flange Couplings',
      company: 'Nordic CleanEnergy ASA',
      value: '€520,000',
      numericValue: 570000,
      stage: 'Qualified',
      owner: 'Vignesh',
      nextAction: 'Submit preliminary tender dossier',
      expectedClose: 'Dec 10, 2026'
    },
    {
      id: 'deal-105',
      title: 'Hydraulic Pumps Batch Re-Order',
      company: 'Trans-Atlantic Polymer House',
      value: '$94,000',
      numericValue: 94000,
      stage: 'New',
      owner: 'Sunil Nair',
      nextAction: 'Qualify annual volume capacity',
      expectedClose: 'Nov 20, 2026'
    }
  ];

  // Business Connections (External Network)
  let connections = [
    {
      id: 'conn-1',
      name: 'ABC Manufacturing',
      industry: 'Office & Custom Furniture',
      type: 'Manufacturer',
      country: 'Germany',
      flag: '🇩🇪',
      city: 'Stuttgart',
      products: ['Office Desks', 'Ergonomic Seating', 'Acoustic Partitions'],
      capabilities: ['CNC Woodworking', 'FSC Certified', 'ISO 14001', 'Bulk Flatpack'],
      markets: ['Europe', 'Middle East'],
      status: 'Connected',
      isInCRM: true,
      description: 'Medium-sized industrial furniture manufacturer supplying corporate headquarters and university campus networks across the EU.'
    },
    {
      id: 'conn-2',
      name: 'Gulf Axis General Trading LLC',
      industry: 'Wholesale Distribution',
      type: 'Distributor',
      country: 'UAE',
      flag: '🇦🇪',
      city: 'Dubai (JAFZA)',
      products: ['Industrial Tooling', 'Fluid Components', 'Heavy Bearings'],
      capabilities: ['Bonded Warehouse 45,000 sq ft', 'Re-Export GCC', 'FOB/CIF Logistics'],
      markets: ['GCC', 'North Africa', 'South Asia'],
      status: 'Connected',
      isInCRM: true,
      description: 'Major regional logistics and trade distributor serving UAE, Saudi Arabia, Oman, and East African industrial sectors.'
    },
    {
      id: 'conn-3',
      name: 'Kyocera Micro-Optics Corp',
      industry: 'Optoelectronics',
      type: 'OEM/ODM',
      country: 'Japan',
      flag: '🇯🇵',
      city: 'Kyoto',
      products: ['Optical Elements', 'Sensor Substrates', 'Precision Glass'],
      capabilities: ['Cleanroom Class 100', 'Sub-micron Polishing', 'ITAR Compliant'],
      markets: ['Japan', 'North America', 'Europe'],
      status: 'Discoverable',
      isInCRM: false,
      description: 'Precision manufacturer of high-frequency communication optics, semiconductor packaging substrates, and specialized lenses.'
    },
    {
      id: 'conn-4',
      name: 'Bharat Heavy Engineering',
      industry: 'Heavy Metallurgy',
      type: 'Manufacturer',
      country: 'India',
      flag: '🇮🇳',
      city: 'Pune',
      products: ['Forged Billets', 'Turbine Shafts', 'Marine Flanges'],
      capabilities: ['10,000-Ton Hydraulic Press', 'Lloyds Register Certified', 'Export to 40+ Countries'],
      markets: ['Middle East', 'Europe', 'Southeast Asia'],
      status: 'Discoverable',
      isInCRM: false,
      description: 'Premier heavy metallurgical and industrial foundry exporting custom forged steel components across global transport networks.'
    },
    {
      id: 'conn-5',
      name: 'Rotterdam Commercial Logistics B.V.',
      industry: 'Freight & Bonded Storage',
      type: 'Trading House',
      country: 'Netherlands',
      flag: '🇳🇱',
      city: 'Rotterdam',
      products: ['Cold Chain Freight', 'Bonded Customs Brokerage'],
      capabilities: ['Deepwater Berth Access', 'EU CE Clearance', 'AEO Certified'],
      markets: ['Western Europe', 'Scandinavia'],
      status: 'Discoverable',
      isInCRM: false,
      description: 'European hub logistics facility handling customs transit, bonded warehousing, and multi-modal inland container delivery.'
    }
  ];

  // Sales Quotations
  let quotations = [
    {
      id: 'quote-1',
      number: 'QT-2026-8842',
      customer: 'Gulf Axis General Trading LLC',
      date: '19 Sep 2026',
      amount: '$78,120.00',
      numericAmount: 78120,
      status: 'Accepted',
      validUntil: '19 Oct 2026',
      incoterms: 'CIF Dubai Port',
      paymentTerms: 'Irrevocable LC 60 Days',
      items: [
        { product: 'CNC Precision Turbine Shaft Assemblies', sku: 'HB-ENG-8820', qty: 40, unitPrice: 1250.00, discount: 0, tax: 2500.00, total: 52500.00 },
        { product: 'Cryogenic Flow Control Valves (DN 80)', sku: 'HB-VAL-4102', qty: 120, unitPrice: 175.00, discount: 0, tax: 1050.00, total: 22050.00 },
        { product: 'Port Freight Handling & Marine Insurance', sku: 'HB-LOG-0091', qty: 1, unitPrice: 3400.00, discount: 0, tax: 170.00, total: 3570.00 }
      ]
    },
    {
      id: 'quote-2',
      number: 'QT-2026-8839',
      customer: 'Apex Industrial GmbH',
      date: '17 Sep 2026',
      amount: '€340,000.00',
      numericAmount: 375000,
      status: 'Sent',
      validUntil: '17 Oct 2026',
      incoterms: 'CIF Hamburg Port',
      paymentTerms: '30% Advance, 70% against BL',
      items: [
        { product: 'High-Temperature Rotor Blade Sets', sku: 'HB-ENG-8820', qty: 250, unitPrice: 1360.00, discount: 0, tax: 0, total: 340000.00 }
      ]
    },
    {
      id: 'quote-3',
      number: 'QT-2026-8810',
      customer: 'Nordic CleanEnergy ASA',
      date: '12 Sep 2026',
      amount: '€520,000.00',
      numericAmount: 570000,
      status: 'Draft',
      validUntil: '12 Nov 2026',
      incoterms: 'FOB Nhava Sheva Port',
      paymentTerms: 'Letter of Credit 90 Days',
      items: [
        { product: 'Reinforced Metal-to-Metal Flanges', sku: 'HB-SEAL-901', qty: 800, unitPrice: 650.00, discount: 0, tax: 0, total: 520000.00 }
      ]
    }
  ];

  // Sales Orders
  let orders = [
    {
      id: 'ord-1',
      orderNumber: 'PO-2026-9921',
      customer: 'Gulf Axis General Trading LLC',
      products: 'Turbine Shafts & Flow Control Valves',
      amount: '$78,120.00',
      status: 'Confirmed',
      payment: 'LC 60 Days (Confirmed)',
      delivery: 'CIF Dubai Port • ETA Oct 06'
    },
    {
      id: 'ord-2',
      orderNumber: 'PO-2026-9884',
      customer: 'Metro Furniture AG',
      products: 'Office Desks & Acoustic Partitions',
      amount: '€42,800.00',
      status: 'Completed',
      payment: 'Wire Transfer Paid',
      delivery: 'Delivered Frankfurt Warehouse'
    },
    {
      id: 'ord-3',
      orderNumber: 'PO-2026-9760',
      customer: 'Trans-Atlantic Polymer House',
      products: 'High-Pressure Rotary Gear Pumps',
      amount: '$94,000.00',
      status: 'Processing',
      payment: 'Escrow Funded',
      delivery: 'Houston Marine Terminal'
    }
  ];

  // Trade Opportunities
  let tradeOpportunities = [
    {
      id: 'trd-1',
      title: 'Industrial Office & Contract Furniture Export',
      buyer: 'XYZ Distribution GmbH',
      buyerCountry: 'Germany 🇩🇪',
      supplier: 'ABC Furniture Manufacturing',
      supplierCountry: 'India 🇮🇳',
      quantity: '500 Units',
      tradeType: 'Export',
      status: 'Open',
      estVal: '€185,000',
      incoterms: 'CIF Hamburg',
      description: 'Major regional distributor seeking batch fulfillment of modular ergonomic desking systems for European corporate fitouts.'
    },
    {
      id: 'trd-2',
      title: 'Cold-Finished Seamless Carbon Tubing (ASTM A106)',
      buyer: 'Al-Noor Petrochemical Services',
      buyerCountry: 'UAE 🇦🇪',
      supplier: 'Bharat Heavy Engineering',
      supplierCountry: 'India 🇮🇳',
      quantity: '120 Metric Tons',
      tradeType: 'Export',
      status: 'Open',
      estVal: '$210,000',
      incoterms: 'CIF Jebel Ali',
      description: 'Refinery maintenance turnaround requirement for high-temperature service seamless pipe assemblies.'
    },
    {
      id: 'trd-3',
      title: 'Marine Grade 316L Stainless Steel Billets',
      buyer: 'Rotterdam Commercial Logistics B.V.',
      buyerCountry: 'Netherlands 🇳🇱',
      supplier: 'Jindal Steel & Alloys',
      supplierCountry: 'India 🇮🇳',
      quantity: '340 Metric Tons',
      tradeType: 'Export',
      status: 'Negotiation',
      estVal: '$340,000',
      incoterms: 'CIF Rotterdam',
      description: 'Allocation of verified marine-grade forging billets with complete mill test certificates.'
    }
  ];

  // Customers
  let customers = [
    {
      id: 'cust-1',
      name: 'Gulf Axis General Trading LLC',
      country: 'UAE 🇦🇪',
      contact: 'Tariq Al-Mansoor • MD',
      totalOrders: '$263,120',
      lastActivity: 'Order #PO-2026-9921 placed',
      openDeals: 1,
      status: 'Active'
    },
    {
      id: 'cust-2',
      name: 'Apex Industrial GmbH',
      country: 'Germany 🇩🇪',
      contact: 'Dr. Markus Weber • Procurement VP',
      totalOrders: '€740,000',
      lastActivity: 'Quotation #QT-2026-8839 under review',
      openDeals: 1,
      status: 'Active'
    },
    {
      id: 'cust-3',
      name: 'Metro Furniture AG',
      country: 'Switzerland 🇨🇭',
      contact: 'Hans Zimmerman • Logistics Lead',
      totalOrders: '€112,000',
      lastActivity: 'Annual rebate settlement',
      openDeals: 0,
      status: 'Active'
    }
  ];

  // Suppliers
  let suppliers = [
    {
      id: 'sup-1',
      supplier: 'Jindal Stainless Ltd.',
      company: 'Jindal Group',
      country: 'India 🇮🇳',
      products: '316L Marine Stainless Billets',
      category: 'Raw Metallurgy',
      lastOrder: 'Sep 04, 2026',
      status: 'Preferred SLA'
    },
    {
      id: 'sup-2',
      supplier: 'Thyssenkrupp Materials Services',
      company: 'Thyssenkrupp AG',
      country: 'Germany 🇩🇪',
      products: 'Inconel 718 High-Temp Billets',
      category: 'Special Alloys',
      lastOrder: 'Aug 21, 2026',
      status: 'Preferred SLA'
    },
    {
      id: 'sup-3',
      supplier: 'SABIC Polymers Bulk',
      company: 'Saudi Basic Industries',
      country: 'Saudi Arabia 🇸🇦',
      products: 'Viton & High-Density Polymers',
      category: 'Petrochemicals',
      lastOrder: 'Sep 11, 2026',
      status: 'Active Contract'
    }
  ];

  // Team
  let team = [
    { id: 'tm-1', name: 'Vignesh', department: 'Executive & Commercial Desk', role: 'Managing Partner / Admin', email: 'vignesh@hynabiz.com', tasks: 12, status: 'Active' },
    { id: 'tm-2', name: 'Sarah Jenkins', department: 'Global Sales & CRM', role: 'VP Commercial Relationships', email: 'sarah.j@hynabiz.com', tasks: 8, status: 'Active' },
    { id: 'tm-3', name: 'Sunil Nair', department: 'Export Operations', role: 'Director of Logistics & Trade', email: 'sunil.n@hynabiz.com', tasks: 15, status: 'Active' },
    { id: 'tm-4', name: 'Elena Rostova', department: 'Legal & Compliance', role: 'Head of International Trade Law', email: 'elena.r@hynabiz.com', tasks: 6, status: 'Active' }
  ];

  // Notifications
  let notifications = [
    { id: 'notif-1', title: 'New connection accepted', detail: 'Metro Furniture AG accepted your connection request', time: '10m ago', unread: true },
    { id: 'notif-2', title: 'Quotation viewed', detail: 'Dr. Markus Weber (Apex Industrial) viewed quotation #QT-2026-8839', time: '1h ago', unread: true },
    { id: 'notif-3', title: 'Quotation accepted', detail: 'Gulf Axis General Trading accepted quotation #QT-2026-8842', time: '3h ago', unread: false },
    { id: 'notif-4', title: 'Lead follow-up reminder', detail: 'Scheduled procurement follow-up call with Nordic CleanEnergy', time: '5h ago', unread: false },
    { id: 'notif-5', title: 'New trade opportunity', detail: 'XYZ Distribution posted RFQ for 500 units Industrial Furniture', time: 'Yesterday', unread: false }
  ];

  // Messages
  let conversations = [
    {
      id: 'conv-1',
      company: 'Gulf Axis General Trading LLC',
      contact: 'Tariq Al-Mansoor',
      avatar: 'TA',
      contextType: 'Order',
      contextRef: 'PO-2026-9921 ($78,120)',
      lastMsg: 'The irrevocable LC has been confirmed at sight. We look forward to customs dispatch.',
      time: '11:42 AM',
      messages: [
        { sender: 'inbound', text: 'Hello Vignesh, we reviewed the revised quotation #QT-2026-8842 with CIF Dubai terms.', time: '10:15 AM' },
        { sender: 'outbound', text: 'Great hearing from you Tariq. We have locked standard freight rates via JNPT and reserved batch stock.', time: '10:30 AM' },
        { sender: 'inbound', text: 'The irrevocable LC has been confirmed at sight. We look forward to customs dispatch.', time: '11:42 AM' }
      ]
    },
    {
      id: 'conv-2',
      company: 'Apex Precision Engineering GmbH',
      contact: 'Dr. Markus Weber',
      avatar: 'MW',
      contextType: 'Quotation',
      contextRef: 'QT-2026-8839 (€340,000)',
      lastMsg: 'Our legal department approved Appendix B. Please send final countersigned copies.',
      time: 'Yesterday',
      messages: [
        { sender: 'inbound', text: 'Vignesh, we are reviewing the Inconel 718 rotor blade specifications.', time: 'Sep 17, 2:10 PM' },
        { sender: 'outbound', text: 'Understood Markus. The Lloyd’s Register metallurgical cert is attached.', time: 'Sep 17, 3:00 PM' },
        { sender: 'inbound', text: 'Our legal department approved Appendix B. Please send final countersigned copies.', time: 'Yesterday, 4:25 PM' }
      ]
    }
  ];

  return {
    getMetrics: () => metrics,
    getActivities: () => activities,
    getProducts: () => products,
    getLeads: () => leads,
    getDeals: () => deals,
    getConnections: () => connections,
    getQuotations: () => quotations,
    getOrders: () => orders,
    getTradeOpportunities: () => tradeOpportunities,
    getCustomers: () => customers,
    getSuppliers: () => suppliers,
    getTeam: () => team,
    getNotifications: () => notifications,
    getConversations: () => conversations,

    // Mutation helpers
    addLead: (lead) => {
      leads.unshift(lead);
      metrics.activeLeads++;
    },
    addDeal: (deal) => {
      deals.unshift(deal);
      metrics.openDeals++;
    },
    addQuotation: (quote) => {
      quotations.unshift(quote);
      metrics.pendingQuotations++;
    },
    addOrder: (order) => {
      orders.unshift(order);
    },
    connectCompany: (companyId) => {
      const comp = connections.find(c => c.id === companyId);
      if (comp) comp.status = 'Connected';
    },
    addConnectionToCRM: (companyId) => {
      const comp = connections.find(c => c.id === companyId);
      if (!comp) return null;
      comp.isInCRM = true;
      const newLead = {
        id: `lead-${Date.now()}`,
        name: comp.contact || 'Commercial Desk',
        company: comp.name,
        source: 'Business Network Discovery',
        owner: 'Vignesh',
        value: '$150,000',
        numericValue: 150000,
        stage: 'Qualified',
        lastActivity: 'Imported from Business Network',
        nextFollowUp: 'Send company credentials & catalog',
        country: `${comp.country} ${comp.flag}`
      };
      leads.unshift(newLead);
      metrics.activeLeads++;
      return newLead;
    }
  };
})();
