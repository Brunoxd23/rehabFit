// Toast Notification System
class Toast {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    // Create container if it doesn't exist
    if (!document.querySelector(".toast-container")) {
      this.container = document.createElement("div");
      this.container.className = "toast-container";
      document.body.appendChild(this.container);
    } else {
      this.container = document.querySelector(".toast-container");
    }
  }

  show(message, type = "info", title = "", duration = 3000) {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const icons = {
      success: "check-circle",
      error: "x-circle",
      warning: "alert-circle",
      info: "info",
    };

    const titles = {
      success: title || "Sucesso!",
      error: title || "Erro!",
      warning: title || "Atenção!",
      info: title || "Informação",
    };

    toast.innerHTML = `
      <div class="toast-icon">
        <i data-lucide="${icons[type]}"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title">${titles[type]}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">
        <i data-lucide="x"></i>
      </button>
    `;

    this.container.appendChild(toast);

    // Initialize Lucide icons for the new toast
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }

    // Auto remove after duration
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, duration);

    return toast;
  }

  success(message, title = "", duration = 3000) {
    return this.show(message, "success", title, duration);
  }

  error(message, title = "", duration = 4000) {
    return this.show(message, "error", title, duration);
  }

  warning(message, title = "", duration = 3500) {
    return this.show(message, "warning", title, duration);
  }

  info(message, title = "", duration = 3000) {
    return this.show(message, "info", title, duration);
  }
}

// Create global toast instance
const toast = new Toast();
