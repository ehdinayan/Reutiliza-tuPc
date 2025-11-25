// js/menu.js
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!toggle || !mobileMenu) return;

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    mobileMenu.classList.toggle("open");
  });

  // Cerrar menú al pulsar un enlace
  mobileMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      toggle.classList.remove("active");
      mobileMenu.classList.remove("open");
    }
  });
});
