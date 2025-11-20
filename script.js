// ======================
// FOOTER YEAR
// ======================
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ======================
// SMOOTH SCROLL FOR ANCHORS
// ======================

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || href.length <= 1) return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ======================
// TALLY EMBED (POPIN CONTENT)
// ======================

const d = document;
const tallyScriptUrl = "https://tally.so/widgets/embed.js";

// Only load Tally if there's at least one relevant iframe
if (d.querySelector("iframe[data-tally-src]")) {
  const loadTally = function () {
    if (typeof Tally !== "undefined") {
      Tally.loadEmbeds();
    } else {
      d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach(
        (iframe) => {
          iframe.src = iframe.dataset.tallySrc;
        }
      );
    }
  };

  if (typeof Tally !== "undefined") {
    loadTally();
  } else if (!d.querySelector('script[src="' + tallyScriptUrl + '"]')) {
    const s = d.createElement("script");
    s.src = tallyScriptUrl;
    s.onload = loadTally;
    s.onerror = loadTally;
    d.body.appendChild(s);
  }
}

// ======================
// HEADER SCROLLING ANIMATION
// ======================

const topbar = document.querySelector(".topbar");
const body = document.body;

let lastScrollY = window.scrollY;
const HIDE_THRESHOLD = 80; // px avant d'activer le hide

window.addEventListener("scroll", () => {
  if (!topbar) return;

  // Ne jamais cacher la topbar si le menu mobile est ouvert
  if (body.classList.contains("menu-open")) {
    topbar.classList.remove("hide");
    lastScrollY = window.scrollY;
    return;
  }

  const currentScrollY = window.scrollY;

  if (currentScrollY < HIDE_THRESHOLD) {
    topbar.classList.remove("hide");
    lastScrollY = currentScrollY;
    return;
  }

  if (currentScrollY > lastScrollY) {
    // scroll vers le bas → cacher
    topbar.classList.add("hide");
  } else {
    // scroll vers le haut → montrer
    topbar.classList.remove("hide");
  }

  lastScrollY = currentScrollY;
});

// ======================
// MOBILE BURGER MENU
// ======================

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.getElementById("main-nav");
const navOverlay = document.getElementById("nav-overlay");

function openMenu() {
  body.classList.add("menu-open");
  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "true");
  }
}

function closeMenu() {
  body.classList.remove("menu-open");
  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
  }
}

if (menuToggle && mainNav && navOverlay) {
  // Toggle by clicking the burger
  menuToggle.addEventListener("click", () => {
    if (body.classList.contains("menu-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Click on overlay closes menu
  navOverlay.addEventListener("click", () => {
    closeMenu();
  });

  // Click on any nav <a> or <button> closes the menu (mobile UX)
  mainNav.addEventListener("click", (e) => {
    const target = e.target.closest("a, button");
    if (target) {
      closeMenu();
    }
  });

  // ESC key closes menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && body.classList.contains("menu-open")) {
      closeMenu();
    }
  });
}

// ======================
// POPIN OPEN/CLOSE (DEMANDE DE DEVIS)
// ======================

// Récupération des éléments
const openModalBtn = document.getElementById("open-modal-btn"); // facultatif
const modalOverlay = document.getElementById("modal-overlay");
const closeModalBtn = document.getElementById("close-modal-btn");
const demandeDevisButtons = document.querySelectorAll(".demande-devis");

// Ouvrir la popin
function openModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.add("is-visible");
  modalOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("body-no-scroll");
}

// Fermer la popin
function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove("is-visible");
  modalOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("body-no-scroll");
}

// Boutons "Demande de devis"
demandeDevisButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });
});

// Bouton dédié si tu en as un dans le HTML
if (openModalBtn) {
  openModalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });
}

// Fermer via le bouton X (si trouvé)
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeModal();
  });
}

// Fermer en cliquant sur l’overlay OU sur le bouton X (délégation)
if (modalOverlay) {
  modalOverlay.addEventListener("click", (e) => {
    const target = e.target;

    // clic dans le fond sombre
    if (target === modalOverlay) {
      closeModal();
      return;
    }

    // clic sur le bouton de fermeture (au cas où l'ID ou la structure change)
    if (target.closest && target.closest("#close-modal-btn")) {
      closeModal();
    }
  });
}

// Fermer avec la touche Échap
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    modalOverlay &&
    modalOverlay.classList.contains("is-visible")
  ) {
    closeModal();
  }
});

// ======================
// BEFORE / AFTER SLIDER
// ======================

function initBeforeAfter(slider) {
  const range = slider.querySelector(".ba-range");
  const after = slider.querySelector(".ba-after");
  const handle = slider.querySelector(".ba-handle");

  if (!range || !after || !handle) return;

  function update(val) {
    const value = Number(val);
    const clamped = Math.min(100, Math.max(0, value));
    after.style.width = clamped + "%";
    handle.style.left = clamped + "%";
  }

  update(range.value);

  range.addEventListener("input", (e) => {
    update(e.target.value);
  });

  range.addEventListener("change", (e) => {
    update(e.target.value);
  });
}

document.querySelectorAll(".ba-slider").forEach(initBeforeAfter);
