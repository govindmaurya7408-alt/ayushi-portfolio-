const loader = document.querySelector(".page-loader");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const projectModal = document.querySelector("#project-modal");
const contactForm = document.querySelector("#contact-form");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

window.addEventListener("load", () => {
  window.setTimeout(() => loader?.classList.add("is-hidden"), 450);
});

menuToggle?.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  primaryNav?.classList.toggle("is-open", !isExpanded);
});

primaryNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("is-open");
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    projectCards.forEach((card) => {
      card.hidden = filter !== "All" && card.dataset.category !== filter;
    });
  });
});

const modalImage = document.querySelector("#modal-image");
const modalCategory = document.querySelector("#modal-category");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const closeModalButton = document.querySelector(".modal-close");

function closeProjectModal() {
  projectModal?.close();
  document.body.classList.remove("modal-open");
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (!projectModal || !modalImage || !modalCategory || !modalTitle || !modalDescription) return;
    modalImage.src = card.dataset.image || "";
    modalImage.alt = card.dataset.alt || "";
    modalCategory.textContent = card.dataset.category || "";
    modalTitle.textContent = card.dataset.title || "";
    modalDescription.textContent = card.dataset.description || "";
    projectModal.showModal();
    document.body.classList.add("modal-open");
    closeModalButton?.focus();
  });
});

closeModalButton?.addEventListener("click", closeProjectModal);
projectModal?.addEventListener("click", (event) => {
  if (event.target === projectModal) closeProjectModal();
});
projectModal?.addEventListener("close", () => document.body.classList.remove("modal-open"));
projectModal?.querySelector(".modal-contact-link")?.addEventListener("click", closeProjectModal);

function setFieldError(fieldName, message) {
  const error = document.querySelector(`#${fieldName}-error`);
  const field = contactForm?.elements.namedItem(fieldName);
  if (error) error.textContent = message;
  if (field instanceof HTMLElement) {
    if (message) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
  }
}

contactForm?.addEventListener("input", (event) => {
  const field = event.target;
  if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
    setFieldError(field.name, "");
  }
  const status = document.querySelector("#form-status");
  if (status) status.textContent = "";
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  setFieldError("name", name.length >= 2 ? "" : "Please enter your name (at least 2 characters).");
  setFieldError("email", emailIsValid ? "" : "Please enter a valid email address.");
  setFieldError("message", message.length >= 10 ? "" : "Please write a little more (at least 10 characters).");
  const status = document.querySelector("#form-status");

  if (name.length < 2 || !emailIsValid || message.length < 10) {
    status.textContent = "Please check the highlighted fields and try again.";
    const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
    firstInvalid?.focus();
    return;
  }

  const recipient = "your.email@gmail.com";
  const subject = encodeURIComponent(`A little note from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
  status.textContent = "Opening your email app with a draft. Your message has not been sent by this website.";
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const heroArtwork = document.querySelector(".hero-object");

heroArtwork?.addEventListener("pointermove", (event) => {
  if (reducedMotion) return;
  const bounds = heroArtwork.getBoundingClientRect();
  const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
  const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
  heroArtwork.style.setProperty("--tilt-x", `${vertical * -9}deg`);
  heroArtwork.style.setProperty("--tilt-y", `${horizontal * 9}deg`);
  heroArtwork.style.setProperty("--pointer-x", `${horizontal * 10}px`);
  heroArtwork.style.setProperty("--pointer-y", `${vertical * 10}px`);
});

heroArtwork?.addEventListener("pointerleave", () => {
  heroArtwork.style.removeProperty("--tilt-x");
  heroArtwork.style.removeProperty("--tilt-y");
  heroArtwork.style.removeProperty("--pointer-x");
  heroArtwork.style.removeProperty("--pointer-y");
});

heroArtwork?.addEventListener("click", () => {
  const isPicked = heroArtwork.classList.toggle("is-picked");
  heroArtwork.setAttribute("aria-pressed", String(isPicked));
});
