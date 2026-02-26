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

  // Formulario WhatsApp con validaciones
  const form = document.getElementById("contactForm");
  const btnEnviar = document.getElementById("btnEnviar");

  // Función para mostrar error
  const showError = (input, message) => {
    const field = input.closest('.field');
    const existingError = field.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    input.classList.add('input-error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = 'color: #e74c3c; font-size: 12px; margin-top: 4px;';
    field.appendChild(errorDiv);
  };

  // Función para limpiar error
  const clearError = (input) => {
    const field = input.closest('.field');
    const existingError = field.querySelector('.error-message');
    if (existingError) existingError.remove();
    input.classList.remove('input-error');
  };

  // Validar campo
  const validateField = (input, fieldName) => {
    const value = input.value.trim();
    if (!value) {
      showError(input, `Por favor ingresá tu ${fieldName}`);
      return false;
    }
    clearError(input);
    return true;
  };

  if (btnEnviar && form) {
    // Limpiar errores al escribir
    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => clearError(input));
    });

    btnEnviar.addEventListener("click", (e) => {
      e.preventDefault();

      const nombreInput = document.getElementById("nombre");
      const tipoInput = document.getElementById("tipo");
      const mensajeInput = document.getElementById("mensaje");

      // Validaciones
      let isValid = true;
      
      if (!validateField(nombreInput, 'nombre')) isValid = false;
      if (!validateField(tipoInput, 'tipo de web')) isValid = false;
      if (!validateField(mensajeInput, 'idea o mensaje')) isValid = false;

      if (!isValid) {
        return; // No enviar si hay errores
      }

      const nombre = nombreInput.value.trim();
      const tipo = tipoInput.value.trim();
      const mensaje = mensajeInput.value.trim();

      const whatsappMessage = encodeURIComponent(
        `Hola! Soy ${nombre}.\n\nTipo de web: ${tipo}\n\nMi idea:\n${mensaje}`
      );

      window.open(
        `https://wa.me/5493786417162?text=${whatsappMessage}`,
        "_blank"
      );
    });
  }
});