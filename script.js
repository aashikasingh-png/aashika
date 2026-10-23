const screens = [...document.querySelectorAll("[data-screen]")];

const order = ["title", "map", "level-1", "level-2", "level-3", "level-4", "level-5", "level-6", "savana", "level-7"];

function show(id) {
  const name = order.includes(id) ? id : "title";
  screens.forEach((screen) => {
    const on = screen.dataset.screen === name;
    screen.hidden = !on;
  });
  window.scrollTo(0, 0);
  const heading = document.querySelector(`[data-screen="${name}"] h1`);
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}

function route() {
  const id = (location.hash || "#title").slice(1);
  show(id);
}

window.addEventListener("hashchange", route);
route();

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  const current = (location.hash || "#title").slice(1);
  if (current === "title" || current === "map") return;
  if (current === "savana") location.hash = "#level-6";
  else location.hash = "#map";
});
