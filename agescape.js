

/* =========================
   AGESCAPE MAIN JS
   - UI SYSTEM + ANIMATIONS
   - GSAP + LENIS INTEGRATION
   - CLEAN & SAFE
========================= */


/* =========================
   GSAP SCROLLTRIGGER SETUP
========================= */

gsap.registerPlugin(ScrollTrigger);


/* =========================
   LENIS SMOOTH SCROLL
========================= */

const lenis = new Lenis({
  lerp: 0.05
});


/* =========================
   LENIS + GSAP SYNC
========================= */

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


/* =========================
   SCROLLTRIGGER REFRESH
========================= */

ScrollTrigger.refresh();


/* =========================
   MASTER TIMELINE
========================= */

const tl = gsap.timeline();


/* =========================
   ELEMENT SAFETY HELPERS
========================= */

const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector("#search-input");


/* =========================
   SIDEBAR SYSTEM
========================= */

// Open / Close toggle
if (hamburger && sidebar && overlay) {

  hamburger.addEventListener("click", () => {

    hamburger.classList.toggle("active");
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");

  });

  overlay.addEventListener("click", () => {

    hamburger.classList.remove("active");
    sidebar.classList.remove("active");
    overlay.classList.remove("active");

  });

}





/* =========================
   GSAP HEADER ANIMATIONS
========================= */

gsap.from("header .top-bar .hamburger", {
  x: -100,
  duration: 0.6
});

gsap.from(" header .audio-btn ", {
  x: 100,
  duration: 0.6
});


