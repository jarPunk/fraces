import { messages, floatingIcons, getRandomElement, createBubble, createParticle } from './utils.js';

function startApp() {
  const welcomeModal = document.getElementById('welcome-modal');
  const mainInterface = document.getElementById('main-interface');
  const modalOkBtn = document.getElementById('modal-ok-btn');
  const container = document.getElementById("chat-container");
  
  const input = document.getElementById('message-input');
  const sendBtn = document.getElementById('send-btn');
  const typingIndicator = document.getElementById('typing-indicator');

  const keywords = ["te amo", "corazon", "amor", "vida", "siempre", "mejor", "eres", "tierno", "lindo", "guapo", "besos", "cariño"];

  modalOkBtn.addEventListener('click', () => {
    welcomeModal.style.display = 'none';
    mainInterface.style.display = 'flex';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    startChat();
  });

  function sendMessage() {
    if (!input || !input.value.trim()) return;
    
    const text = input.value.trim();
    const bubble = createBubble(text, "bubble sent");
    
    // DETECTOR DE PALABRAS CLAVE
    if (keywords.some(word => text.toLowerCase().includes(word))) {
        bubble.classList.add("special");
        triggerSpecialAnimation();
    }
    
    const timeStr = `${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')}`;
    bubble.innerHTML = `${bubble.innerText} <span class="time">${timeStr}</span>`;
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
    
    input.value = '';
  }

  function triggerSpecialAnimation() {
      const overlay = document.createElement("div");
      overlay.className = "overlay-animation";
      overlay.innerText = "💖";
      document.body.appendChild(overlay);
      setTimeout(() => overlay.remove(), 2000);
  }

  if (sendBtn) sendBtn.addEventListener('click', sendMessage);
  if (input) input.addEventListener('keypress', (e) => { if(e.key === 'Enter') sendMessage(); });

  function startChat() {
    function addMessage() {
      if (typingIndicator) typingIndicator.classList.add('active');
      
      setTimeout(() => {
        if (typingIndicator) typingIndicator.classList.remove('active');
        
        const bubble = createBubble(getRandomElement(messages), "bubble received");
        const timeStr = `${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')}`;
        
        bubble.innerHTML = `${bubble.innerText} <span class="time">${timeStr}</span>`;
        container.appendChild(bubble);
        container.scrollTop = container.scrollHeight;

        for(let i=0; i<5; i++) {
            createParticle(Math.random() * window.innerWidth, -50, getRandomElement(floatingIcons));
        }
      }, 1500);
    }
    addMessage(); 
    setInterval(addMessage, 5000);
  }
}

document.addEventListener("DOMContentLoaded", startApp);
