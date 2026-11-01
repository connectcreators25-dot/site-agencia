document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursorFollower");
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  if (window.matchMedia("(min-width: 901px)").matches) {
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    });
    function animateFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.left = followerX + "px";
      follower.style.top = followerY + "px";
      requestAnimationFrame(animateFollower);
    }
    animateFollower();
    document.querySelectorAll("a, button, [data-magnetic], .service-card, .work-card").forEach((el) => {
      el.addEventListener("mouseenter", () => { cursor.classList.add("is-hover"); follower.classList.add("is-hover"); });
      el.addEventListener("mouseleave", () => { cursor.classList.remove("is-hover"); follower.classList.remove("is-hover"); });
    });
  }

  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      if (window.innerWidth < 901) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = "translate(0, 0)"; });
  });

  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  });

  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("is-open");
    document.body.style.overflow = mobileMenu.classList.contains("is-open") ? "hidden" : "";
  });
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      document.body.style.overflow = "";
    });
  });

  const revealEls = document.querySelectorAll(".manifesto__grid, .service-card, .step, .work-card, .diff-item, .contact__inner, .section-header");
  revealEls.forEach((el) => el.classList.add("reveal"));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach((el) => observer.observe(el));
  document.querySelectorAll(".service-card").forEach((card, i) => { card.style.transitionDelay = `${i * 0.1}s`; });
  document.querySelectorAll(".step").forEach((step, i) => { step.style.transitionDelay = `${i * 0.08}s`; });
  document.querySelectorAll(".diff-item").forEach((item, i) => { item.style.transitionDelay = `${i * 0.08}s`; });

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = "<span>Mensagem enviada ✓</span>";
      btn.style.background = "#ff6b35";
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = "";
        btn.disabled = false;
        form.reset();
      }, 2800);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
});
