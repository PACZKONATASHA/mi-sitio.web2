document.addEventListener("DOMContentLoaded", () => {
  // Año footer
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  // Menú hamburguesa
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("menuMobile");

  if (!btn || !menu) {
    console.error("Falta #menuBtn o #menuMobile", { btn, menu });
    return;
  }

  const closeMenu = () => {
    menu.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  };

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Cerrar al tocar un link
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  // Cerrar si clickeás afuera
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("open")) return;
    if (!menu.contains(e.target) && !btn.contains(e.target)) closeMenu();
  });

  // Cerrar con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
});
