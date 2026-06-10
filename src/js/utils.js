export const messages = [
  "te amo muchisimo mi amor ♥️",
  "te amo mi vida ♥️",
  "eres lo mejor que me ha pasado 😽",
  "eres mi persona favorita",
  "tu y yo para siempre 💞",
  "iluminas mi vida ⭐",
  "tu sonrisa me ilusiona ✨",
  "siempre pienso en ti 💭",
  "mi corazon es tuyo 🤎",
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

export const floatingIcons = ["💖", "💞", "✨", "⭐", "💗", "💘", "💝", "💓", "💙", "💜", "💛", "🤍", "🩷", "😽"];

export function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function createBubble(text, className) {
  const bubble = document.createElement("div");
  // Dividimos la clase en caso de que contenga espacios y añadimos cada parte
  className.split(' ').forEach(cls => bubble.classList.add(cls));
  bubble.innerText = text;
  return bubble;
}

export function createParticle(x, y, char) {
  const p = document.createElement("div");
  p.className = "particle";
  p.innerText = char;
  p.style.left = x + "px";
  p.style.top = y + "px";
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 2000);
}
