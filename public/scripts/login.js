const form = document.querySelector("#loginForm");
const button = document.querySelector("#login");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

const login = async () => {
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  if (!email || !password) {
    alert("Por favor, completá todos los campos.");
    return;
  }

  button.disabled = true;
  button.textContent = "Iniciando...";

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // 👈 clave para aceptar cookie del token
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      alert("❌ " + (error?.error || "Login fallido"));
      return;
    }

    const json = await res.json();
    alert(`¡Bienvenido ${json.user.email}!`);
    location.replace("/profile");
  } catch (err) {
    console.error("❌ Error en login:", err);
    alert("No se pudo iniciar sesión.");
  } finally {
    button.disabled = false;
    button.textContent = "Iniciar sesión";
  }
};

button.addEventListener("click", login);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});