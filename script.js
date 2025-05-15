const messages = [
  "te amo muchisimo mi amor ♥️",
  "te amo mi vida ♥️",
  "eres lo mejor que me ha pasado 😽",
  "eres mi persona favorita",
  "tu y yo para siempre 💞",
  "iluminas mi vida ⭐",
  "tu sonrisa me ilusiona ✨",
  "siempre pienso en ti 💭",
  "mi corazon es tuyo 🤎",
];

function createTextBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("text-bubble");
  bubble.innerText = messages[Math.floor(Math.random() * messages.length)];

  const left = Math.random() * 80 + 10;
  const top = Math.random() * 80 + 10;
  bubble.style.position = "absolute";
  bubble.style.left = left + "vw";
  bubble.style.top = top + "vh";

  const container = document.getElementById("bubbles-text");
  container.appendChild(bubble);

  setTimeout(() => {
    const rect = bubble.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
      const newLeft = window.innerWidth - rect.width - 10;
      bubble.style.left = `${newLeft}px`;
    }
    if (rect.bottom > window.innerHeight) {
      const newTop = window.innerHeight - rect.height - 10;
      bubble.style.top = `${newTop}px`;
    }
    if (rect.left < 0) {
      bubble.style.left = "10px";
    }
    if (rect.top < 0) {
      bubble.style.top = "10px";
    }
    setTimeout(() => {
      bubble.remove();
    }, 8000);
  }, 10);
}

// Genera una burbuja cada 500ms
setInterval(createTextBubble, 500);