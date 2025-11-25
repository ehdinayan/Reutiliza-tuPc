// js/lang.js

const DEFAULT_LANG = "es";
let currentLang = localStorage.getItem("lang") || DEFAULT_LANG;

async function loadTranslations(lang) {
  try {
    const res = await fetch(`lang/${lang}.json`);
    if (!res.ok) {
      throw new Error(`No se pudo cargar lang/${lang}.json`);
    }
    const messages = await res.json();
    applyTranslations(messages, lang);
  } catch (error) {
    console.error("Error cargando idioma:", error);
  }
}

function applyTranslations(messages, lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const value = messages[key];
    if (value !== undefined) {
      el.textContent = value;
    }
  });

  // Marcar bandera activa
  const flagImages = document.querySelectorAll("#flags [data-language]");
  flagImages.forEach(img => {
    const imgLang = img.getAttribute("data-language");
    img.classList.toggle("active", imgLang === lang);
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  loadTranslations(lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const flagsContainer = document.getElementById("flags");
  if (flagsContainer) {
    flagsContainer.addEventListener("click", e => {
      const target = e.target;
      if (target && target.matches("[data-language]")) {
        const lang = target.getAttribute("data-language");
        if (lang && lang !== currentLang) {
          setLanguage(lang);
        }
      }
    });
  }

  setLanguage(currentLang);
});
