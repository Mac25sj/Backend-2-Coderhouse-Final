document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#registerForm");
  const button = document.querySelector("#btnRegister");

  const register = async () => {
    const data = {
      first_name: document.querySelector("#first_name").value.trim(),
      last_name: document.querySelector("#last_name").value.trim(),
      email: document.querySelector("#email").value.trim().toLowerCase(),
      age: parseInt(document.querySelector("#age").value, 10) || undefined,
      password: document.querySelector("#password").value,
      role: document.querySelector("#role")?.value || "user"
    };

    if (!data.first_name || !data.last_name || !data.email || !data.password) {
      alert("Por favor, completá todos los campos requeridos.");
      return;
    }

    button.disabled = true;
    button.textContent = "Registrando...";

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 👈 importante por si el backend responde con cookies
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("📝 Respuesta del registro:", result);

      if (res.ok) {
        alert(result.message || "Registro exitoso");
        location.replace("/login?registered=true");
      } else {
        alert("❌ " + (result?.error || "Registro fallido"));
      }
    } catch (err) {
      console.error("❌ Error en registro:", err);
      alert("Ocurrió un error al registrar el usuario.");
    } finally {
      button.disabled = false;
      button.textContent = "Registrarse";
    }
  };

  button.addEventListener("click", register);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    register();
  });
});