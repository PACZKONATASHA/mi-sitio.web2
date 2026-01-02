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
