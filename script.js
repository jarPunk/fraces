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
  // Variaciones para reducir repetición
  "te adoro con todo mi ser 💕",
  "mi amor por ti no tiene fin ♾️",
  "me enamoras cada día más 🌹",
  "eres mi razón para sonreír 😄",
  "no imagino mi vida sin ti 🫶",
  "tu abrazo es mi refugio 🏡",
  "tu mirada me derrite 🔥",
  "eres mi paz y mi alegría ☀️",
  "contigo todo es mejor ✨",
  "mi alma late por ti 💓",
  "eres mi sueño hecho realidad 💭",
  "te quiero con locura 🥰",
  "juntos somos invencibles 💪",
  "eres mi compañero(a) perfecto(a) 🤝",
  "me haces ser mejor persona 🌱",
  "cada día contigo es una aventura 🌈",
  "tu voz me calma el alma 🎶",
  "mi lugar favorito es a tu lado 🏠",
  "tu risa es mi melodía favorita 🎵",
  "gracias por tu amor y ternura 💝",
  "eres mi sol en días nublados ☀️",
  "te prometo cuidarte siempre 🤍"
];

// Lista de iconos decorativos
const floatingIcons = ["💖", "💞", "✨", "⭐", "💗", "💘", "💝", "💓", "💙", "💜", "💛", "🤍", "🩷", "😽"];

// Lista de estrellas para el efecto de lluvia
const fallingStars = ["⭐", "✨", "🌟", "💫", "⚡", "✦", "✧", "🔯", "💥"];

let lastBubbleSide = false; // false = izquierda, true = derecha

// Función para crear estrellas cayendo
function createFallingStar() {
  const star = document.createElement("div");
  star.className = "falling-star";
  star.innerText = fallingStars[Math.floor(Math.random() * fallingStars.length)];
  
  // Posición horizontal aleatoria
  star.style.left = Math.random() * 100 + "vw";
  star.style.top = "-20px";
  star.style.fontSize = (Math.random() * 1.5 + 1) + "rem";
  star.style.position = "absolute";
  star.style.pointerEvents = "none";
  star.style.userSelect = "none";
  star.style.zIndex = "1";
  star.style.opacity = Math.random() * 0.5 + 0.5;
  
  // Velocidad y duración aleatoria
  const duration = Math.random() * 3 + 2; // Entre 2 y 5 segundos
  star.style.animation = `fallDown ${duration}s linear forwards`;
  
  document.getElementById("bubbles-text").appendChild(star);
  
  setTimeout(() => {
    if (star.parentNode) {
      star.remove();
    }
  }, duration * 1000);
}

// Función mejorada para adaptarse a móvil
function createTextBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("text-bubble");
  let msg = messages[Math.floor(Math.random() * messages.length)];
  
  // Detectar si es móvil
  const isMobile = window.innerWidth <= 768;
  
  // Si el mensaje es muy largo, inserta un salto de línea en el espacio más cercano al medio
  const maxLength = isMobile ? 25 : 32; // Más corto en móvil
  if (msg.length > maxLength) {
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

  // Configuración adaptativa para móvil
  let centerBlockVW, sideVW;
  if (isMobile) {
    centerBlockVW = 20; // Zona central más pequeña en móvil
    sideVW = (100 - centerBlockVW) / 2; // 40vw para cada lado
  } else {
    centerBlockVW = 30; // ancho del centro bloqueado en vw
    sideVW = (100 - centerBlockVW) / 2; // margen lateral en vw
  }

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
  const margin = isMobile ? 1 : 2; // Margen más pequeño en móvil
  
  if (!lastBubbleSide) {
    // Lado izquierdo: entre margen y (sideVW - ancho burbuja en vw)
    const maxLeft = Math.max(margin, sideVW - bubbleWidthVW);
    leftVW = Math.random() * (maxLeft - margin) + margin;
  } else {
    // Lado derecho: entre (sideVW + centerBlockVW) y (100 - ancho burbuja en vw - margen)
    const minRight = sideVW + centerBlockVW;
    const maxRight = Math.min(100 - bubbleWidthVW - margin, minRight + sideVW - margin);
    leftVW = Math.random() * (maxRight - minRight) + minRight;
  }
  // Convierte a px
  const leftPx = (window.innerWidth * leftVW) / 100;

  // Posición vertical aleatoria adaptativa
  const topRange = isMobile ? 60 : 70; // Menos rango vertical en móvil
  const topStart = isMobile ? 15 : 10;
  const top = Math.random() * topRange + topStart;
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
      if (bubble.parentNode) {
        bubble.remove();
      }
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
  setTimeout(() => {
    if (icon.parentNode) {
      icon.remove();
    }
  }, 7000);
}

// Genera un icono decorativo cada 1.2 segundos
setInterval(createFloatingIcon, 1200);

// Genera estrellas cayendo - frecuencia adaptativa según dispositivo
const isMobileDevice = window.innerWidth <= 768;
const starInterval = isMobileDevice ? 1200 : 800; // Menos frecuente en móvil
setInterval(createFallingStar, starInterval);

// Reajustar intervalos si cambia el tamaño de pantalla
window.addEventListener('resize', () => {
  const newIsMobile = window.innerWidth <= 768;
  if (newIsMobile !== isMobileDevice) {
    // Reiniciar la página para aplicar los cambios
    location.reload();
  }
});
