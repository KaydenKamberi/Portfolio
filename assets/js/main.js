/* main.js — site-wide behaviour. Owned by Agent A.
   1. Scroll reveal: fade-and-rise once per [data-reveal] element.
   2. Header border once the page is scrolled.
   Each page adds the "js" class to <html> in an inline <head> script,
   so content stays visible if this file never loads. */

(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- 1. Scroll reveal ---------- */

  function revealAll(items) {
    items.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  function initReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (!items.length) return;

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      revealAll(items);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });

    // If the user switches reduced motion on mid-visit, show everything.
    if (reduceMotion.addEventListener) {
      reduceMotion.addEventListener("change", function (e) {
        if (e.matches) {
          observer.disconnect();
          revealAll(items);
        }
      });
    }
  }

  /* ---------- 2. Header state ---------- */

  function initHeader() {
    var header = document.querySelector("[data-site-header]");
    if (!header) return;

    var ticking = false;

    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );

    update();
  }

  function init() {
    root.classList.add("js");
    initReveal();
    initHeader();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
