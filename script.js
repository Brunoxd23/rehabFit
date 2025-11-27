// Mobile Menu Toggle with overlay & accessibility
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
let navOverlay = document.querySelector(".nav-overlay");
if (!navOverlay) {
  navOverlay = document.createElement("div");
  navOverlay.className = "nav-overlay";
  document.body.appendChild(navOverlay);
}

function closeNavMenu() {
  navMenu.classList.remove("active");
  navToggle.classList.remove("active");
  navOverlay.classList.remove("active");
  navToggle.setAttribute("aria-expanded", "false");
}

function openNavMenu() {
  navMenu.classList.add("active");
  navToggle.classList.add("active");
  navOverlay.classList.add("active");
  navToggle.setAttribute("aria-expanded", "true");
}

navToggle.setAttribute("aria-controls", "navMenu");
navToggle.setAttribute("aria-expanded", "false");

navToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  if (navMenu.classList.contains("active")) {
    closeNavMenu();
  } else {
    openNavMenu();
  }
});

// Click outside (overlay) closes
navOverlay.addEventListener("click", () => closeNavMenu());

// Esc key closes
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    closeNavMenu();
  }
});

// Any click outside nav when open closes
document.addEventListener("click", (e) => {
  if (!navMenu.classList.contains("active")) return;
  const withinMenu = navMenu.contains(e.target) || navToggle.contains(e.target);
  if (!withinMenu) closeNavMenu();
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Form submission
const contatoForm = document.getElementById("contatoForm");

contatoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
    mensagem: document.getElementById("mensagem").value,
  };

  // Simulate form submission
  console.log("Form submitted:", formData);

  // Show success message
  alert("Obrigado pelo seu interesse! Entraremos em contato em breve.");

  // Reset form
  contatoForm.reset();

  // In a real application, you would send this data to a server
  // Example:
  // fetch('/api/contact', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData)
  // })
  // .then(response => response.json())
  // .then(data => {
  //     alert('Mensagem enviada com sucesso!');
  //     contatoForm.reset();
  // })
  // .catch(error => {
  //     alert('Erro ao enviar mensagem. Tente novamente.');
  // });
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
  }

  lastScroll = currentScroll;
});

// Scroll reveal animations (left / right / up)
document.addEventListener("DOMContentLoaded", () => {
  const revealEls = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right"
  );

  // Group-based stagger for better readability
  const groups = [
    document.querySelectorAll(".sobre-grid .sobre-card"),
    document.querySelectorAll(".beneficios-grid .beneficio-item"),
    document.querySelectorAll(".depoimentos-grid .depoimento-card"),
    document.querySelectorAll(".timeline .timeline-card"),
    document.querySelectorAll(".contato-content > *"),
  ];

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
  );

  // Apply custom stagger per group
  groups.forEach((nodeList) => {
    nodeList.forEach((el, idx) => {
      // Longer stagger for clarity on reading
      const baseDelay = 140; // ms
      el.style.transitionDelay = `${idx * baseDelay}ms`;
      revealObserver.observe(el);
    });
  });

  // Fallback for any element with reveal class not covered above
  revealEls.forEach((el) => {
    if (!el.style.transitionDelay) {
      el.style.transitionDelay = "0ms";
    }
    revealObserver.observe(el);
  });
});

// Form validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

const emailInput = document.getElementById("email");
emailInput.addEventListener("blur", () => {
  if (emailInput.value && !validateEmail(emailInput.value)) {
    emailInput.style.borderColor = "#EF4444";
  } else {
    emailInput.style.borderColor = "";
  }
});

// Accordion (mobile) behavior
document.addEventListener("DOMContentLoaded", () => {
  const accordion = document.getElementById("timelineAccordion");
  if (!accordion) return;

  const items = Array.from(accordion.querySelectorAll(".acc-item"));
  const headers = accordion.querySelectorAll(".acc-header");

  headers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".acc-item");
      const isOpen = item.classList.contains("open");

      // close all
      items.forEach((it) => {
        it.classList.remove("open");
        const h = it.querySelector(".acc-header");
        if (h) h.setAttribute("aria-expanded", "false");
      });

      // toggle current
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
});
