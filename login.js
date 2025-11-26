// Tab switching
const tabs = document.querySelectorAll(".form-tab");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabName = tab.getAttribute("data-tab");

    // Remove active from all
    tabs.forEach((t) => t.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active to clicked
    tab.classList.add("active");
    document.getElementById(tabName).classList.add("active");
  });
});

// Contas de teste (temporário - será substituído por banco de dados)
const testUsers = [
  {
    email: "admin@rehabfit.com",
    password: "admin123",
    nome: "Administrador",
  },
  {
    email: "joao@email.com",
    password: "123456",
    nome: "João Silva",
  },
  {
    email: "maria@email.com",
    password: "123456",
    nome: "Maria Costa",
  },
  {
    email: "teste@teste.com",
    password: "teste",
    nome: "Usuário Teste",
  },
];

// Email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Password validation
function validatePassword(password) {
  return password.length >= 8;
}

// Login Form
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginEmailError = document.getElementById("loginEmailError");

loginEmail.addEventListener("blur", () => {
  if (loginEmail.value && !validateEmail(loginEmail.value)) {
    loginEmail.classList.add("error");
    loginEmailError.classList.add("show");
  } else {
    loginEmail.classList.remove("error");
    loginEmailError.classList.remove("show");
  }
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginEmail.value;
  const password = document.getElementById("loginPassword").value;

  if (!validateEmail(email)) {
    loginEmail.classList.add("error");
    loginEmailError.classList.add("show");
    return;
  }

  // Verificar credenciais
  const user = testUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    alert(
      "E-mail ou senha incorretos!\n\nContas de teste disponíveis:\n• admin@rehabfit.com / admin123\n• joao@email.com / 123456\n• maria@email.com / 123456\n• teste@teste.com / teste"
    );
    return;
  }

  // Show loading state
  const submitBtn = loginForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = "Entrando...";
  submitBtn.disabled = true;

  // Salvar usuário no localStorage (temporário)
  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      email: user.email,
      nome: user.nome,
    })
  );

  // Simulate API call
  setTimeout(() => {
    alert(`Bem-vindo, ${user.nome}!`);
    window.location.href = "dashboard.html";
  }, 800);
});

// Cadastro Form
const cadastroForm = document.getElementById("cadastroForm");
const cadastroEmail = document.getElementById("cadastroEmail");
const cadastroEmailError = document.getElementById("cadastroEmailError");
const cadastroPassword = document.getElementById("cadastroPassword");
const cadastroPasswordError = document.getElementById("cadastroPasswordError");
const cadastroPasswordConfirm = document.getElementById(
  "cadastroPasswordConfirm"
);
const cadastroPasswordConfirmError = document.getElementById(
  "cadastroPasswordConfirmError"
);

cadastroEmail.addEventListener("blur", () => {
  if (cadastroEmail.value && !validateEmail(cadastroEmail.value)) {
    cadastroEmail.classList.add("error");
    cadastroEmailError.classList.add("show");
  } else {
    cadastroEmail.classList.remove("error");
    cadastroEmailError.classList.remove("show");
  }
});

cadastroPassword.addEventListener("blur", () => {
  if (cadastroPassword.value && !validatePassword(cadastroPassword.value)) {
    cadastroPassword.classList.add("error");
    cadastroPasswordError.classList.add("show");
  } else {
    cadastroPassword.classList.remove("error");
    cadastroPasswordError.classList.remove("show");
  }
});

cadastroPasswordConfirm.addEventListener("blur", () => {
  if (
    cadastroPasswordConfirm.value &&
    cadastroPasswordConfirm.value !== cadastroPassword.value
  ) {
    cadastroPasswordConfirm.classList.add("error");
    cadastroPasswordConfirmError.classList.add("show");
  } else {
    cadastroPasswordConfirm.classList.remove("error");
    cadastroPasswordConfirmError.classList.remove("show");
  }
});

cadastroForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("cadastroNome").value;
  const email = cadastroEmail.value;
  const password = cadastroPassword.value;
  const passwordConfirm = cadastroPasswordConfirm.value;

  // Validate
  let hasError = false;

  if (!validateEmail(email)) {
    cadastroEmail.classList.add("error");
    cadastroEmailError.classList.add("show");
    hasError = true;
  }

  if (!validatePassword(password)) {
    cadastroPassword.classList.add("error");
    cadastroPasswordError.classList.add("show");
    hasError = true;
  }

  if (password !== passwordConfirm) {
    cadastroPasswordConfirm.classList.add("error");
    cadastroPasswordConfirmError.classList.add("show");
    hasError = true;
  }

  if (hasError) return;

  // Verificar se e-mail já existe
  const emailExists = testUsers.some((u) => u.email === email);

  if (emailExists) {
    alert("Este e-mail já está cadastrado! Use o login ou outro e-mail.");
    return;
  }

  // Simulate signup
  console.log("Cadastro:", { nome, email, password });

  // Show loading state
  const submitBtn = cadastroForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = "Criando conta...";
  submitBtn.disabled = true;

  // Adicionar novo usuário (temporário - em produção será no banco)
  testUsers.push({ email, password, nome });

  // Salvar no localStorage
  localStorage.setItem("currentUser", JSON.stringify({ email, nome }));

  // Simulate API call
  setTimeout(() => {
    alert(`Conta criada com sucesso, ${nome}!`);
    window.location.href = "dashboard.html";
  }, 800);
});

// Forgot password
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
forgotPasswordLink.addEventListener("click", (e) => {
  e.preventDefault();
  const email = prompt("Digite seu e-mail para recuperar a senha:");
  if (email && validateEmail(email)) {
    alert(`Um link de recuperação foi enviado para ${email}`);
  } else if (email) {
    alert("E-mail inválido. Tente novamente.");
  }
});

// Social login/signup
const socialButtons = [
  "googleLogin",
  "appleLogin",
  "googleSignup",
  "appleSignup",
];

socialButtons.forEach((btnId) => {
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.addEventListener("click", () => {
      const provider = btnId.includes("google") ? "Google" : "Apple";
      alert(
        `Login com ${provider} será implementado em breve. Aguarde as próximas atualizações!`
      );
      // TODO: Implement OAuth flow
    });
  }
});
