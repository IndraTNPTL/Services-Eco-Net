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

//! HEADER SCROLLING ANIMATION
let lastScrollTop = 0;
const topbar = document.querySelector(".topbar");

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    topbar.classList.add("hide");
  } else {
    // Scrolling up
    topbar.classList.remove("hide");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scroll
});
