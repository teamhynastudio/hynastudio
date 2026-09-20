/**
 * HYNA BIZ — BizAI Command Utility
 * Simple search/command bar operating on real business data (NOT a giant chatbot).
 */

const BizAI = (() => {
  const queryKnowledge = {
    distributors: {
      query: 'Find distributors for my furniture products in Germany.',
      title: 'Distributor Match Results: Germany (EU)',
      cards: [
        {
          category: 'Relevant Businesses in Network',
          detail: 'ABC Manufacturing (Stuttgart) & Berlin Contract Desks GmbH. Both hold active bonded storage and retail contracts across DACH region.',
          action: 'View Business Profiles',
          actionFn: () => App.switchView('connections')
        },
        {
          category: 'Existing Connections',
          detail: 'Metro Furniture AG is currently connected to your network with good trade rating AAA.',
          action: 'Open Message Thread',
          actionFn: () => App.openChatWith('Metro Furniture AG')
        },
        {
          category: 'Open Trade Opportunities',
          detail: 'XYZ Distribution GmbH has an active RFQ for 500 units of modular ergonomic furniture.',
          action: 'Inspect Trade Opportunity',
          actionFn: () => App.switchView('trade')
        },
        {
          category: 'Market Intelligence',
          detail: 'German import tariff on HS 9403.30 is 0% under standard bilateral provisions. Standard freight transit: 14 days.',
          action: 'Simulate CIF Hamburg Margins',
          actionFn: () => App.showToast('Calculated CIF Hamburg margin: +28.4% under current rate matrix', 'info')
        }
      ]
    },
    followup: {
      query: 'Which leads need follow-up?',
      title: 'High-Priority Lead Follow-up Radar',
      cards: [
        {
          category: 'Dr. Markus Weber • Apex Industrial GmbH',
          detail: 'Contract markup sent 2 hours ago. Win probability: 85%. Value: €340,000.',
          action: 'Schedule Review Call (Sep 22)',
          actionFn: () => CRM.openDealDrawer('deal-101')
        },
        {
          category: 'Kenji Sato • Kyocera Micro-Optics',
          detail: 'Technical specs audited. Awaiting cleanroom Class 100 verification dispatch. Value: ¥48M.',
          action: 'Send Audit Credentials',
          actionFn: () => CRM.openDealDrawer('deal-103')
        },
        {
          category: 'Astrid Lindqvist • Nordic CleanEnergy ASA',
          detail: 'Executive NDA countersigned. Tender dossier review scheduled for this week. Value: €520,000.',
          action: 'Review Preliminary Dossier',
          actionFn: () => CRM.openDealDrawer('deal-104')
        },
        {
          category: 'Tariq Al-Mansoor • Gulf Axis General Trading',
          detail: 'Quotation #QT-2026-8842 accepted. Dispatch Purchase Order #PO-2026-9921 notice.',
          action: 'Open Order Details',
          actionFn: () => App.switchView('orders')
        }
      ]
    }
  };

  function init() {
    runQuery('distributors');
  }

  function runQuery(presetKey) {
    const input = document.getElementById('bizai-input');
    const container = document.getElementById('bizai-results-container');
    if (!container) return;

    let data = queryKnowledge[presetKey];
    if (!data) {
      // General fallback based on input
      const text = input ? input.value : '';
      if (text.toLowerCase().includes('lead') || text.toLowerCase().includes('follow')) {
        data = queryKnowledge.followup;
      } else {
        data = queryKnowledge.distributors;
      }
    }

    if (input && data.query) {
      input.value = data.query;
    }

    container.innerHTML = `
      <div style="grid-column:1 / -1;margin-bottom:8px;">
        <h3 style="font-size:1.05rem;font-weight:700;color:var(--text-main);">${data.title}</h3>
        <p style="font-size:0.8rem;color:var(--text-muted);">Synthesized from active CRM, Product Catalog, and Global Trade Feeds.</p>
      </div>
      ${data.cards.map(card => `
        <div class="bizai-card">
          <div style="font-size:0.75rem;font-family:var(--font-mono);color:var(--color-primary);font-weight:700;text-transform:uppercase;">
            ${escapeHtml(card.category)}
          </div>
          <p style="font-size:0.84rem;color:var(--text-body);line-height:1.5;">
            ${escapeHtml(card.detail)}
          </p>
          <div style="margin-top:auto;padding-top:8px;">
            <button class="btn btn-secondary btn-xs" onclick="BizAI.triggerCardAction('${escapeHtml(card.category)}')">
              ${card.action} →
            </button>
          </div>
        </div>
      `).join('')}
    `;
  }

  function triggerCardAction(category) {
    if (category.includes('Apex')) {
      CRM.openDealDrawer('deal-101');
    } else if (category.includes('Kyocera')) {
      CRM.openDealDrawer('deal-103');
    } else if (category.includes('Nordic')) {
      CRM.openDealDrawer('deal-104');
    } else if (category.includes('Gulf')) {
      App.switchView('orders');
    } else if (category.includes('Relevant Businesses')) {
      App.switchView('connections');
    } else if (category.includes('Metro Furniture')) {
      App.openChatWith('Metro Furniture AG');
    } else if (category.includes('Trade Opportunities')) {
      App.switchView('trade');
    } else {
      App.showToast('Calculated CIF Hamburg margin: +28.4% under current rate matrix', 'info');
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  return {
    init,
    runQuery,
    triggerCardAction
  };
})();
