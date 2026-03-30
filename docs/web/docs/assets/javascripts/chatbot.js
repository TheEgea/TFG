/**
 * TFG Lab Assistant — chat widget
 * Update BACKEND_URL after deploying the backend to Render.
 */

const BACKEND_URL = "https://tfg-sra5.onrender.com";

// ---------------------------------------------------------------------------
// DOM creation
// ---------------------------------------------------------------------------

function initWidget() {
  // Floating toggle button
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "cb-toggle";
  toggleBtn.title = "Open Lab Assistant";
  toggleBtn.setAttribute("aria-label", "Open Lab Assistant");
  toggleBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
      <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-2 10H6V10h12v2zm0-3H6V7h12v2z"/>
    </svg>`;

  // Chat panel
  const panel = document.createElement("div");
  panel.id = "cb-panel";
  panel.setAttribute("aria-label", "Lab Assistant chat panel");
  panel.innerHTML = `
    <div id="cb-header">
      <span>Lab Assistant</span>
      <button id="cb-close" title="Close" aria-label="Close chat">&times;</button>
    </div>
    <div id="cb-messages" role="log" aria-live="polite"></div>
    <div id="cb-footer">
      <input id="cb-input" type="text" placeholder="Ask about the docs..." autocomplete="off" />
      <button id="cb-send" title="Send" aria-label="Send message">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M2 21l21-9L2 3v7l15 2-15 2z"/>
        </svg>
      </button>
    </div>`;

  document.body.appendChild(toggleBtn);
  document.body.appendChild(panel);

  // Events
  toggleBtn.addEventListener("click", openChat);
  document.getElementById("cb-close").addEventListener("click", closeChat);
  document.getElementById("cb-send").addEventListener("click", sendMessage);
  document.getElementById("cb-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Show welcome message
  addBotMessage(
    "Hola! Soy el asistente del TFG. Puedo responder preguntas sobre la documentación de los labs. ¿En qué te ayudo?"
  );
}

// ---------------------------------------------------------------------------
// UI state
// ---------------------------------------------------------------------------

function openChat() {
  document.getElementById("cb-panel").classList.add("cb-open");
  document.getElementById("cb-toggle").style.display = "none";
  document.getElementById("cb-input").focus();
}

function closeChat() {
  document.getElementById("cb-panel").classList.remove("cb-open");
  document.getElementById("cb-toggle").style.display = "flex";
}

// ---------------------------------------------------------------------------
// Messaging
// ---------------------------------------------------------------------------

function addUserMessage(text) {
  appendMessage("cb-msg-user", text);
}

function addBotMessage(text, sources) {
  const container = document.createElement("div");
  container.className = "cb-msg cb-msg-bot";

  const textEl = document.createElement("p");
  textEl.textContent = text;
  container.appendChild(textEl);

  if (sources && sources.length > 0) {
    const srcEl = document.createElement("div");
    srcEl.className = "cb-sources";
    srcEl.innerHTML =
      "<strong>Fuentes:</strong> " +
      sources.map((s) => `<span class="cb-source-tag">${s.title}</span>`).join(" ");
    container.appendChild(srcEl);
  }

  document.getElementById("cb-messages").appendChild(container);
  scrollToBottom();
}

function addLoadingIndicator() {
  const el = document.createElement("div");
  el.className = "cb-msg cb-msg-bot";
  el.id = "cb-loading";
  el.innerHTML = `<span class="cb-dots"><span></span><span></span><span></span></span>`;
  document.getElementById("cb-messages").appendChild(el);
  scrollToBottom();
}

function removeLoadingIndicator() {
  const el = document.getElementById("cb-loading");
  if (el) el.remove();
}

function appendMessage(className, text) {
  const el = document.createElement("div");
  el.className = `cb-msg ${className}`;
  el.textContent = text;
  document.getElementById("cb-messages").appendChild(el);
  scrollToBottom();
}

function scrollToBottom() {
  const msgs = document.getElementById("cb-messages");
  msgs.scrollTop = msgs.scrollHeight;
}

function setInputDisabled(disabled) {
  document.getElementById("cb-input").disabled = disabled;
  document.getElementById("cb-send").disabled = disabled;
}

// ---------------------------------------------------------------------------
// API call
// ---------------------------------------------------------------------------

async function sendMessage() {
  const input = document.getElementById("cb-input");
  const question = input.value.trim();
  if (!question) return;

  input.value = "";
  addUserMessage(question);
  setInputDisabled(true);
  addLoadingIndicator();

  try {
    const res = await fetch(`${BACKEND_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    removeLoadingIndicator();

    if (res.ok) {
      const data = await res.json();
      addBotMessage(data.answer, data.sources);
    } else {
      const err = await res.json().catch(() => ({}));
      addBotMessage(`Error ${res.status}: ${err.detail || "Algo salió mal."}`);
    }
  } catch {
    removeLoadingIndicator();
    addBotMessage(
      "No pude conectar con el backend. Si acaba de iniciarse puede tardar ~30 segundos (Render free tier). Inténtalo de nuevo."
    );
  } finally {
    setInputDisabled(false);
    document.getElementById("cb-input").focus();
  }
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWidget);
} else {
  initWidget();
}
