// Mobile Menu Toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
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

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all cards and sections for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".sobre-card, .beneficio-item, .step, .depoimento-card"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
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
