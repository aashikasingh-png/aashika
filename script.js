const levels = [...document.querySelectorAll(".level")];
const playing = document.querySelector(".now-playing");

function placeOnPath() {
  if (!levels.length || !playing) return;
  const marker = window.scrollY + 140;
  let active = levels[0];
  levels.forEach((level) => {
    const top = level.getBoundingClientRect().top + window.scrollY;
    if (top <= marker) active = level;
  });
  const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
  if (atEnd) active = levels[levels.length - 1];
  playing.textContent = active.dataset.title || "";
}

if (playing) {
  placeOnPath();
  window.addEventListener("scroll", placeOnPath, { passive: true });
  window.addEventListener("resize", placeOnPath);
}
