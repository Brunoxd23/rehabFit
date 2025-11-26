// Mobile sidebar toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");

// Check if user is logged in
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  // Redirect to login if not authenticated
  window.location.href = "login.html";
}

// Update user name in dashboard
document.addEventListener("DOMContentLoaded", () => {
  if (currentUser) {
    // Update welcome message
    const welcomeH1 = document.querySelector(".welcome-text h1");
    if (welcomeH1) {
      const firstName = currentUser.nome.split(" ")[0];
      welcomeH1.textContent = `Bem-vindo de volta, ${firstName}! 👋`;
    }

    // Update user avatar and name
    const userName = document.querySelector(".user-name");
    const userAvatar = document.querySelector(".user-avatar");
    if (userName) userName.textContent = currentUser.nome;
    if (userAvatar) {
      const initials = currentUser.nome
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
      userAvatar.textContent = initials;
    }
  }
});

mobileMenuBtn?.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

sidebarToggle?.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

// Close sidebar when clicking on nav item (mobile)
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    // Check for logout link
    if (item.textContent.includes("Sair")) {
      e.preventDefault();
      const confirmLogout = confirm("Deseja realmente sair?");
      if (confirmLogout) {
        localStorage.removeItem("currentUser");
        toast.success("Até logo!", "Logout");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 800);
      }
      return;
    }

    // Remove active from all
    navItems.forEach((nav) => nav.classList.remove("active"));
    // Add active to clicked
    item.classList.add("active");

    // Close sidebar on mobile
    if (window.innerWidth <= 968) {
      sidebar.classList.remove("active");
    }
  });
});

// Close sidebar when clicking outside (mobile)
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 968) {
    if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      sidebar.classList.remove("active");
    }
  }
});

// Initialize Lucide icons after any dynamic content
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
});

// Simulate real-time updates for notifications
function updateNotifications() {
  const badge = document.querySelector(".nav-item .badge");
  if (badge) {
    // Simulate notification count updates
    const currentCount = parseInt(badge.textContent);
    // This would be replaced with actual notification logic
  }
}

// Update every 30 seconds
setInterval(updateNotifications, 30000);

// Simulate exercise completion
function completeExercise(exerciseElement) {
  exerciseElement.style.opacity = "0.5";
  exerciseElement.style.pointerEvents = "none";

  toast.success("Exercício completado! 🎉", "Parabéns!");
}

// Add click handlers to exercise play buttons
document.querySelectorAll(".exercise-item .btn-icon").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const exerciseItem = btn.closest(".exercise-item");
    const exerciseName = exerciseItem.querySelector("h3").textContent;

    // In real app, this would open video player
    toast.info(
      `Em breve você será redirecionado para o player de vídeo.`,
      `Iniciando: ${exerciseName}`
    );

    // Simulate completion after "watching"
    // completeExercise(exerciseItem);
  });
});

// Add click handlers to article items
document.querySelectorAll(".article-item").forEach((article) => {
  article.addEventListener("click", () => {
    const title = article.querySelector("h3").textContent;
    toast.info(
      "Em breve você será redirecionado para a página do artigo.",
      `Abrindo: ${title}`
    );
  });
});

// Add click handlers to community posts
document.querySelectorAll(".post-action").forEach((action) => {
  action.addEventListener("click", (e) => {
    e.stopPropagation();
    const icon = action.querySelector("i");
    const count = action.querySelector("span") || action.childNodes[1];

    if (icon.getAttribute("data-lucide") === "heart") {
      // Toggle like
      const currentCount = parseInt(count.textContent);
      count.textContent = currentCount + 1;
      action.style.color = "#ef4444";
      toast.success("Post curtido!", "", 2000);
    } else {
      // Open comments
      toast.info(
        "Sistema de comentários estará disponível em breve!",
        "Em desenvolvimento"
      );
    }
  });
});

// Quick action buttons
document.querySelectorAll(".quick-actions .btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const text = btn.textContent.trim();
    if (text.includes("Treino")) {
      toast.info("Redirecionando para página de exercícios...", "Aguarde");
      setTimeout(() => {
        window.location.hash = "#exercicios";
      }, 800);
    } else if (text.includes("Agenda")) {
      toast.info("Redirecionando para sua agenda...", "Aguarde");
      setTimeout(() => {
        window.location.hash = "#agenda";
      }, 800);
    }
  });
});

// User menu dropdown (placeholder)
const userBtn = document.getElementById("userBtn");
userBtn?.addEventListener("click", () => {
  const options = ["Meu Perfil", "Configurações", "Ajuda", "Sair"];

  const choice = confirm("Deseja sair da sua conta?");
  if (choice) {
    // Logout
    localStorage.removeItem("currentUser");
    toast.success("Até breve!", "Logout realizado");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 800);
  }
});

// Notification button
const notificationBtn = document.getElementById("notificationBtn");
notificationBtn?.addEventListener("click", () => {
  toast.info(
    "✓ Nova conquista desbloqueada!<br>✓ Lembrete: Exercício às 14:00<br>✓ Maria Costa curtiu seu post",
    "Notificações (3)",
    4000
  );
});

// Add CSS animation
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);
