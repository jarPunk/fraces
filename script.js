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

// Lista de iconos decorativos
const floatingIcons = ["💖", "💞", "✨", "⭐", "💗", "💘", "💝", "💓", "💙", "💜", "💛", "🤍", "🩷", "😽"];

let lastBubbleSide = false; // false = izquierda, true = derecha

function createTextBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("text-bubble");
  let msg = messages[Math.floor(Math.random() * messages.length)];
  // Si el mensaje es muy largo, inserta un salto de línea en el espacio más cercano al medio
  if (msg.length > 32) {
    const mid = Math.floor(msg.length / 2);
    const spaceIdx = msg.indexOf(" ", mid);
    if (spaceIdx > 0 && spaceIdx < msg.length - 1) {
      msg = msg.slice(0, spaceIdx) + "\n" + msg.slice(spaceIdx + 1);
    }
  }
  bubble.innerText = msg;

  // Animación de entrada aleatoria
  const animType = Math.random();
  if (animType < 0.33) bubble.classList.add("from-left");
  else if (animType > 0.66) bubble.classList.add("from-right");
  // Si no, usa la animación por defecto (floatUp)

  // Limitar zona central (por ejemplo, 30vw) para no tapar el mensaje central
  const centerBlockVW = 30; // ancho del centro bloqueado en vw
  const sideVW = (100 - centerBlockVW) / 2; // margen lateral en vw

  // Medir ancho real de la burbuja en px y convertir a vw
  bubble.style.position = "absolute";
  bubble.style.visibility = "hidden";
  document.body.appendChild(bubble);
  const bubbleWidthPx = bubble.offsetWidth;
  document.body.removeChild(bubble);
  bubble.style.visibility = "";

  const bubbleWidthVW = (bubbleWidthPx / window.innerWidth) * 100;

  // Alternar entre izquierda y derecha, asegurando que la burbuja no se salga
  lastBubbleSide = !lastBubbleSide;
  let leftVW;
  if (!lastBubbleSide) {
    // Lado izquierdo: entre 2vw y (sideVW - ancho burbuja en vw)
    const maxLeft = Math.max(2, sideVW - bubbleWidthVW);
    leftVW = Math.random() * (maxLeft - 2) + 2;
  } else {
    // Lado derecho: entre (sideVW + centerBlockVW) y (100 - ancho burbuja en vw - 2)
    const minRight = sideVW + centerBlockVW;
    const maxRight = Math.min(100 - bubbleWidthVW - 2, minRight + sideVW - 2);
    leftVW = Math.random() * (maxRight - minRight) + minRight;
  }
  // Convierte a px
  const leftPx = (window.innerWidth * leftVW) / 100;

  // Posición vertical aleatoria (10vh a 80vh)
  const top = Math.random() * 70 + 10;
  bubble.style.left = `${leftPx}px`;
  bubble.style.top = `${top}vh`;

  const container = document.getElementById("bubbles-text");
  container.appendChild(bubble);

  setTimeout(() => {
    const rect = bubble.getBoundingClientRect();
    // Ajuste vertical si se sale por abajo o arriba
    if (rect.bottom > window.innerHeight) {
      const newTop = window.innerHeight - rect.height - 10;
      bubble.style.top = `${newTop}px`;
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

// Genera iconos decorativos flotantes aleatorios
function createFloatingIcon() {
  const icon = document.createElement("div");
  icon.classList.add("floating-icon");
  icon.innerText = floatingIcons[Math.floor(Math.random() * floatingIcons.length)];
  // Posición horizontal aleatoria
  icon.style.left = (Math.random() * 90 + 3) + "vw";
  // Posición vertical inicial cerca de la parte inferior
  icon.style.top = (Math.random() * 20 + 70) + "vh";
  // Tamaño aleatorio
  icon.style.fontSize = (Math.random() * 1.2 + 1.5) + "rem";
  // Rotación inicial aleatoria
  icon.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;

  document.getElementById("bubbles-text").appendChild(icon);
  setTimeout(() => icon.remove(), 7000);
}

// Genera un icono decorativo cada 1.2 segundos
setInterval(createFloatingIcon, 1200);