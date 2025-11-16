document.getElementById("year").textContent = new Date().getFullYear();
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (href.length > 1) {
      e.preventDefault();
      document
        .querySelector(href)
        .scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ! POPIN CONTENT
const d = document,
  w = "https://tally.so/widgets/embed.js",
  v = function () {
    "undefined" != typeof Tally
      ? Tally.loadEmbeds()
      : d
          .querySelectorAll("iframe[data-tally-src]:not([src])")
          .forEach(function (e) {
            e.src = e.dataset.tallySrc;
          });
  };
if ("undefined" != typeof Tally) v();
else if (d.querySelector('script[src="' + w + '"]') == null) {
  const s = d.createElement("script");
  (s.src = w), (s.onload = v), (s.onerror = v), d.body.appendChild(s);
}

//! HEADER SCROLLING ANIMATION
const topbar = document.querySelector(".topbar");

let lastScrollY = window.scrollY;
const HIDE_THRESHOLD = 80; // px avant d'activer le hide

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // Si on n'a pas encore assez scrollé, on ne cache jamais la topbar
  if (currentScrollY < HIDE_THRESHOLD) {
    topbar.classList.remove("hide");
    lastScrollY = currentScrollY;
    return;
  }

  // Si on scrolle vers le bas → cacher la topbar
  if (currentScrollY > lastScrollY) {
    topbar.classList.add("hide");
  } else {
    // Si on scrolle vers le haut → réafficher la topbar
    topbar.classList.remove("hide");
  }

  lastScrollY = currentScrollY;
});

// ! POPIN OPEN/CLOSE
// Récupération des éléments
const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const modalOverlay = document.getElementById("modal-overlay");
const demandeDevisButtons = document.querySelectorAll(".demande-devis");

// Ouvrir la popin
function openModal() {
  modalOverlay?.classList.add("is-visible");
  modalOverlay?.setAttribute("aria-hidden", "false");
  document.body.classList.add("body-no-scroll");
}

// Fermer la popin
function closeModal() {
  modalOverlay?.classList.remove("is-visible");
  modalOverlay?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("body-no-scroll");
}

demandeDevisButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openModal();
  });
});

closeModalBtn?.addEventListener("click", () => {
  closeModal();
});

modalOverlay?.addEventListener("click", () => {
  closeModal();
});
