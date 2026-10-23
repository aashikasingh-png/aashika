const root = document.documentElement;
root.classList.add("js");

const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    });
  });
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
}

const levels = [...document.querySelectorAll("[data-level]")];
const nodes = [...document.querySelectorAll(".map-node")];
const fill = document.getElementById("map-fill");
const playing = document.getElementById("now-playing");

function placeOnPath() {
  if (!levels.length) return;
  const marker = window.scrollY + 150;
  let active = 0;
  levels.forEach((level, index) => {
    const top = level.getBoundingClientRect().top + window.scrollY;
    if (top <= marker) active = index;
  });

  const atEnd =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
  if (atEnd) active = levels.length - 1;

  nodes.forEach((node, index) => {
    node.classList.toggle("is-on", index <= active);
    node.classList.toggle("is-here", index === active);
    if (index === active) node.setAttribute("aria-current", "true");
    else node.removeAttribute("aria-current");
  });

  if (playing) playing.textContent = levels[active].dataset.title || "";

  if (fill && nodes.length > 1) {
    const first = nodes[0].querySelector("b");
    const last = nodes[nodes.length - 1].querySelector("b");
    const current = nodes[active].querySelector("b");
    if (first && last && current) {
      const start = first.getBoundingClientRect().left;
      const end = last.getBoundingClientRect().left;
      const here = current.getBoundingClientRect().left;
      const span = end - start;
      const ratio = span > 0 ? (here - start) / span : 0;
      fill.style.width = `${Math.min(1, Math.max(0, ratio)) * 100}%`;
    }
  }
}

placeOnPath();
window.addEventListener("scroll", placeOnPath, { passive: true });
window.addEventListener("resize", placeOnPath);
