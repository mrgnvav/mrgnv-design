/* ═══════════════════════════════════════════════
   MRGNV Design — интерактив
   ═══════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── 1. Мобильное меню-бургер ────────────────── */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");

  if (burger && nav) {
    function closeMenu() {
      burger.classList.remove("is-open");
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }

    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Закрываем меню по клику на ссылку
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Закрываем по Esc
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ── 2. Подсветка активного раздела скроллом ── */
  var sections = Array.prototype.slice.call(document.querySelectorAll("section[id]"));
  var navLinks = nav
    ? Array.prototype.slice.call(nav.querySelectorAll("a"))
    : [];

  function highlight() {
    var current = sections.length ? sections[0].id : null;

    sections.forEach(function (sec) {
      if (sec.getBoundingClientRect().top <= 120) current = sec.id;
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === "#" + current) link.classList.add("is-active");
      else link.classList.remove("is-active");
    });
  }

  /* ── 3. Плавное появление при скролле ─────────── */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  function reveal() {
    var trigger = window.innerHeight * 0.92;
    revealEls.forEach(function (el) {
      if (el.getBoundingClientRect().top < trigger) {
        el.classList.add("is-visible");
      }
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      highlight();
      reveal();
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  /* ── 5. Эффекты главного экрана ────────────── */
  var hero = document.getElementById("hero");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (hero && finePointer) {
    var spotlight = hero.querySelector(".hero__spotlight");
    var shapes = Array.prototype.slice.call(hero.querySelectorAll(".shape"));
    var logomark = hero.querySelector(".hero__logomark");
    var particles = hero.querySelector(".hero__particles");
    var heroBtns = Array.prototype.slice.call(hero.querySelectorAll(".hero__actions .btn"));

    // Ореол за курсором + параллакс сфер
    hero.addEventListener("mousemove", function (e) {
      var r = hero.getBoundingClientRect();
      var pctX = ((e.clientX - r.left) / r.width) * 100;
      var pctY = ((e.clientY - r.top) / r.height) * 100;
      var nx = (e.clientX - r.left) / r.width - 0.5;  // -0.5..0.5
      var ny = (e.clientY - r.top) / r.height - 0.5;

      if (spotlight) {
        hero.classList.add("is-on");
        spotlight.style.background =
          "radial-gradient(600px circle at " + pctX + "% " + pctY +
          "%, rgba(45, 212, 191, 0.13), transparent 65%)";
      }

      shapes.forEach(function (span) {
        var depth = parseInt(span.getAttribute("data-depth") || "20", 10);
        span.querySelector(".shape__core").style.transform =
          "translate(" + nx * depth + "px," + ny * depth + "px)";
      });

      if (logomark) {
        logomark.style.transform = "translate(" + nx * 22 + "px," + ny * 16 + "px)";
      }
      if (particles) {
        particles.style.transform = "translate(" + nx * 12 + "px," + ny * 9 + "px)";
      }
    });

    hero.addEventListener("mouseleave", function () {
      if (spotlight) hero.classList.remove("is-on");
      shapes.forEach(function (s) {
        s.querySelector(".shape__core").style.transform = "";
      });
      if (logomark) logomark.style.transform = "";
      if (particles) particles.style.transform = "";
    });

    // Магнитные кнопки
    heroBtns.forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * 0.3;
        var dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
        btn.style.transform = "translate(" + dx + "px," + dy + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "";
      });
    });
  }

  /* ── 6. Форма (демо) ─────────────────────────── */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.querySelector("#name").value.trim();
      var email = form.querySelector("#email").value.trim();
      var message = form.querySelector("#message").value.trim();
      var status = form.querySelector(".form__status");

      if (!name || !email || !message) {
        status.textContent = "Пожалуйста, заполните все поля.";
        status.style.color = "#ff7b6b";
        return;
      }

      status.textContent = "Спасибо! Заявка отправлена (демо). Скоро свяжусь. ✦";
      status.style.color = "#2dd4bf";
      form.reset();
      setTimeout(function () {
        status.textContent = "";
      }, 6000);
    });
  }

  /* ── 5. Год в подвале ────────────────────────── */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();