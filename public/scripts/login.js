console.log("🟢 Inicia login");

const login = async () => {
  try {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
      role: document.querySelector("#role").value || "user"
    };

    console.log("📡 Datos enviados al servidor:", data);

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const url = "/api/auth/login";
    let response = await fetch(url, opts);

    console.log("🔍 Respuesta cruda del servidor:", response);

    if (!response.ok) {
      console.error(`❌ Error HTTP: ${response.status}`);
      return alert(`Error al iniciar sesión: ${response.status}`);
    }

    const jsonResponse = await response.json();
    console.log("✅ Respuesta procesada:", jsonResponse);

    if (jsonResponse.error) {
      alert(jsonResponse.error);
    } else {
      console.log("✅ Login exitoso, redirigiendo...");
      location.replace("/profile"); // Redirigir a la vista de perfil después del login
    }
  } catch (error) {
    console.error("⚠️ Error en login:", error);
    alert("Ocurrió un error al intentar iniciar sesión.");
  }
};

// Event listener para el botón de login
document.querySelector("#login").addEventListener("click", login);