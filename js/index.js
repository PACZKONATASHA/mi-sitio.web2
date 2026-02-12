document.addEventListener("DOMContentLoaded", () => {
  // Console greeting
  console.log("👋 ¡Hola! Bienvenido a mi sitio web.");
  console.log("Si estás viendo esto, ¡eres de los míos! 💻");
  console.log("¿Necesitás una web? Escribime: https://wa.me/5493786417162");
  
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

  // Formulario WhatsApp
  const form = document.getElementById("contactForm");
  const btnEnviar = document.getElementById("btnEnviar");

  if (btnEnviar && form) {
    btnEnviar.addEventListener("click", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value || "Sin nombre";
      const tipo = document.getElementById("tipo").value || "No especificado";
      const presupuesto = document.getElementById("presupuesto").value || "No especificado";
      const mensaje = document.getElementById("mensaje").value || "Sin mensaje";

      const whatsappMessage = encodeURIComponent(
        `Hola! Soy ${nombre}.\n\nTipo de web: ${tipo}\nPresupuesto: ${presupuesto}\n\nMensaje:\n${mensaje}`
      );

      window.open(
        `https://wa.me/5493786417162?text=${whatsappMessage}`,
        "_blank"
      );
    });
  }
});