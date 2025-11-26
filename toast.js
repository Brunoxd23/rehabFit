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

  // Confirmation dialog with toast style
  confirm(message, title = "Confirmação", onConfirm, onCancel) {
    const confirmToast = document.createElement("div");
    confirmToast.className = "toast toast-confirm";

    confirmToast.innerHTML = `
      <div class="toast-icon">
        <i data-lucide="help-circle"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
        <div class="toast-actions">
          <button class="toast-btn toast-btn-cancel">Cancelar</button>
          <button class="toast-btn toast-btn-confirm">Confirmar</button>
        </div>
      </div>
    `;

    this.container.appendChild(confirmToast);

    // Initialize Lucide icons
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }

    const btnCancel = confirmToast.querySelector(".toast-btn-cancel");
    const btnConfirm = confirmToast.querySelector(".toast-btn-confirm");

    btnCancel.addEventListener("click", () => {
      confirmToast.remove();
      if (onCancel) onCancel();
    });

    btnConfirm.addEventListener("click", () => {
      confirmToast.remove();
      if (onConfirm) onConfirm();
    });

    return confirmToast;
  }

  // Prompt dialog with toast style
  prompt(message, title = "Digite", onConfirm, placeholder = "") {
    const promptToast = document.createElement("div");
    promptToast.className = "toast toast-prompt";

    promptToast.innerHTML = `
      <div class="toast-icon">
        <i data-lucide="message-square"></i>
      </div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
        <input type="text" class="toast-input" placeholder="${placeholder}" />
        <div class="toast-actions">
          <button class="toast-btn toast-btn-cancel">Cancelar</button>
          <button class="toast-btn toast-btn-confirm">Enviar</button>
        </div>
      </div>
    `;

    this.container.appendChild(promptToast);

    // Initialize Lucide icons
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }

    const input = promptToast.querySelector(".toast-input");
    const btnCancel = promptToast.querySelector(".toast-btn-cancel");
    const btnConfirm = promptToast.querySelector(".toast-btn-confirm");

    // Focus input
    setTimeout(() => input.focus(), 100);

    // Handle enter key
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        btnConfirm.click();
      }
    });

    btnCancel.addEventListener("click", () => {
      promptToast.remove();
    });

    btnConfirm.addEventListener("click", () => {
      const value = input.value.trim();
      promptToast.remove();
      if (onConfirm && value) {
        onConfirm(value);
      }
    });

    return promptToast;
  }
}

// Create global toast instance
const toast = new Toast();
