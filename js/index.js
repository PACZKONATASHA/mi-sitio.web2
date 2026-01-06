(function () {
  const WHATSAPP_NUMBER = "5493786417162";
  const btn = document.getElementById("btnEnviar");

  function safeValue(id) {
    const el = document.getElementById(id);
    return (el?.value || "").trim();
  }

  function capitalize(text) {
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
  }

  function formatDate(date) {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  }

  // Validaciones en vivo
  document.getElementById("nombre").addEventListener("input", e => {
    e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
  });

  document.getElementById("tipo").addEventListener("input", e => {
    e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s\/]/g, "");
  });

  document.getElementById("presupuesto").addEventListener("input", e => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  });

  btn.addEventListener("click", () => {
    const nombre = capitalize(safeValue("nombre"));
    const tipo = capitalize(safeValue("tipo"));
    const presupuesto = safeValue("presupuesto");
    const mensaje = safeValue("mensaje");

    if (!nombre || !tipo || !mensaje) {
      alert("Completá Nombre, Tipo de sitio y Mensaje.");
      return;
    }

    const fecha = formatDate(new Date());

    let text =
      "Hola, quiero consultar por una web.\n\n" +
      `Nombre: ${nombre}\n` +
      `Tipo: ${tipo}\n`;

    if (presupuesto) text += `Presupuesto: $${presupuesto}\n`;

    text +=
      `Mensaje: ${mensaje}\n` +
      `Fuente: Web\n` +
      `Fecha: ${fecha}`;

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener");
  });
})();
(function initDevicesScroll() {
  const map = [
    { screenSel: ".devicesSection .laptopScreen", shotSel: ".devicesSection .laptopShot", name: "laptop", duration: 40 },
    { screenSel: ".devicesSection .tabletScreen", shotSel: ".devicesSection .tabletShot", name: "tablet", duration: 48 },
    { screenSel: ".devicesSection .phoneScreen",  shotSel: ".devicesSection .phoneShot",  name: "phone",  duration: 55 },
  ];

  function setup(device) {
    const screen = document.querySelector(device.screenSel);
    const shot = document.querySelector(device.shotSel);
    if (!screen || !shot) return;

    const imgs = Array.from(shot.querySelectorAll("img"));
    if (!imgs.length) return;

    let loaded = 0;
    const onReady = () => {
      // recalcular tamaños ya con imágenes cargadas
      const screenH = screen.clientHeight;
      const totalH = shot.scrollHeight;
      const dist = totalH - screenH;

      if (dist <= 0) return;

      const keyName = `devScroll_${device.name}`;
      const style = document.createElement("style");
      style.textContent = `
        @keyframes ${keyName} {
          0%, 10% { transform: translateY(0); }
          45%, 55% { transform: translateY(-${dist}px); }
          90%, 100% { transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);

      shot.style.animation = `${keyName} ${device.duration}s ease-in-out infinite`;
    };

    imgs.forEach(img => {
      if (img.complete) {
        loaded++;
        if (loaded === imgs.length) onReady();
      } else {
        img.addEventListener("load", () => {
          loaded++;
          if (loaded === imgs.length) onReady();
        }, { once: true });
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    map.forEach(setup);
  });
})();
(function initDevicesScrollAll() {
  const devices = [
    { name: "laptop", screenSel: ".devicesSection .laptopScreen", shotSel: ".devicesSection .laptopShot", duration: 40 },
    { name: "tablet", screenSel: ".devicesSection .tabletScreen", shotSel: ".devicesSection .tabletShot", duration: 46 },
    { name: "phone",  screenSel: ".devicesSection .phoneScreen",  shotSel: ".devicesSection .phoneShot",  duration: 52 },
  ];

  function waitImages(shot, cb) {
    const imgs = Array.from(shot.querySelectorAll("img"));
    if (!imgs.length) return;
    let loaded = 0;

    const done = () => {
      loaded++;
      if (loaded === imgs.length) cb();
    };

    imgs.forEach(img => {
      if (img.complete) done();
      else img.addEventListener("load", done, { once: true });
    });
  }

  function applyAnimation(device) {
    const screen = document.querySelector(device.screenSel);
    const shot = document.querySelector(device.shotSel);
    if (!screen || !shot) return;

    // reset para recalcular bien
    shot.style.animation = "none";
    shot.style.transform = "translateY(0)";

    // OJO: el scrollHeight ya con imgs cargadas
    const screenH = screen.clientHeight;
    const totalH = shot.scrollHeight;
    const dist = totalH - screenH;
    if (dist <= 0) return;

    const keyName = `devScroll_${device.name}_${Math.floor(Math.random()*1e9)}`;
    const style = document.createElement("style");
    style.textContent = `
      @keyframes ${keyName} {
        0%, 10% { transform: translateY(0); }
        45%, 55% { transform: translateY(-${dist}px); }
        90%, 100% { transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);

    // reflow para que tome el reset
    void shot.offsetHeight;

    shot.style.animation = `${keyName} ${device.duration}s ease-in-out infinite`;
  }

  function init() {
    devices.forEach(device => {
      const shot = document.querySelector(device.shotSel);
      if (!shot) return;

      waitImages(shot, () => applyAnimation(device));
    });
  }

  // Inicia cuando el DOM está listo
  document.addEventListener("DOMContentLoaded", init);

  // Recalcula en resize (si cambia el alto, cambia el scrollDistance)
const btn = document.getElementById("menuBtn");
const menu = document.getElementById("menuMobile");

btn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  btn.setAttribute("aria-expanded", open ? "true" : "false");
});
