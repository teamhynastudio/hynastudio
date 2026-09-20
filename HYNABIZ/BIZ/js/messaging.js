/**
 * HYNA BIZ — Enterprise Messaging Module
 * Split-pane communication referencing live business context (Lead, Deal, Quotation, Trade Opportunity).
 */

const Messaging = (() => {
  let activeConvId = 'conv-1';

  function init() {
    renderConversationsList();
    renderChatPane();
  }

  function renderConversationsList() {
    const listEl = document.getElementById('messages-conv-list');
    if (!listEl) return;

    const convs = Store.getConversations();

    listEl.innerHTML = convs.map(c => `
      <div class="conv-item ${c.id === activeConvId ? 'active' : ''}" onclick="Messaging.selectConversation('${c.id}')">
        <div class="conv-item-top">
          <span class="conv-company-name">${escapeHtml(c.company)}</span>
          <span class="mono-num" style="font-size:0.7rem;color:var(--text-muted);">${c.time}</span>
        </div>
        <div class="conv-last-msg">${escapeHtml(c.lastMsg)}</div>
        <div style="margin-top:4px;">
          <span class="badge badge-info" style="font-size:0.65rem;">Ref: ${c.contextRef}</span>
        </div>
      </div>
    `).join('');
  }

  function renderChatPane() {
    const chatPane = document.getElementById('messages-chat-pane');
    if (!chatPane) return;

    const conv = Store.getConversations().find(c => c.id === activeConvId);
    if (!conv) return;

    chatPane.innerHTML = `
      <div class="chat-header-bar">
        <div>
          <h3 style="font-size:0.95rem;font-weight:700;color:var(--text-main);">${escapeHtml(conv.company)}</h3>
          <p style="font-size:0.75rem;color:var(--text-muted);">Attn: ${escapeHtml(conv.contact)} • Enterprise Verified Channel</p>
        </div>
        <div style="display:flex;gap:6px;">
          <button class="btn btn-secondary btn-xs" onclick="Sales.openNewQuotation('${escapeHtml(conv.company)}')">
            Generate Quotation
          </button>
        </div>
      </div>

      <div class="chat-context-banner">
        <span>Linked Context: <strong>${conv.contextType} #${conv.contextRef}</strong></span>
        <a href="javascript:void(0)" onclick="Messaging.openContextTarget('${conv.contextType}')" style="text-decoration:underline;color:inherit;font-weight:600;">
          Inspect Record →
        </a>
      </div>

      <div class="chat-messages-scroll" id="chat-messages-container">
        ${conv.messages.map(m => `
          <div class="chat-msg-row ${m.sender}">
            <div class="chat-bubble">
              ${escapeHtml(m.text)}
            </div>
            <div class="chat-msg-time mono-num">${m.time}</div>
          </div>
        `).join('')}
      </div>

      <div class="chat-input-bar">
        <input type="text" 
               id="chat-reply-input" 
               class="chat-input-field" 
               placeholder="Type enterprise message... (Press Enter to send)"
               onkeydown="if(event.key==='Enter') Messaging.sendMessage()">
        <button class="btn btn-primary btn-sm" onclick="Messaging.sendMessage()">
          Send Message
        </button>
      </div>
    `;

    // Scroll to bottom
    const scrollEl = document.getElementById('chat-messages-container');
    if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
  }

  function selectConversation(convId) {
    activeConvId = convId;
    renderConversationsList();
    renderChatPane();
  }

  function sendMessage() {
    const input = document.getElementById('chat-reply-input');
    if (!input || !input.value.trim()) return;

    const text = input.value.trim();
    const conv = Store.getConversations().find(c => c.id === activeConvId);
    if (!conv) return;

    const newMsg = {
      sender: 'outbound',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    conv.messages.push(newMsg);
    conv.lastMsg = text;
    conv.time = newMsg.time;

    input.value = '';
    renderConversationsList();
    renderChatPane();
  }

  function openContextTarget(contextType) {
    if (contextType === 'Order') {
      App.switchView('orders');
    } else if (contextType === 'Quotation') {
      App.switchView('sales');
    } else {
      App.switchView('crm');
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  return {
    init,
    renderConversationsList,
    renderChatPane,
    selectConversation,
    sendMessage,
    openContextTarget
  };
})();
