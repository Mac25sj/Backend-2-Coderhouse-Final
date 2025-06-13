document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#btnRegister").addEventListener("click", register);
});
const register = async () => {
  try {
    const firstNameElement = document.querySelector("#first_name");
    const lastNameElement = document.querySelector("#last_name");
    const emailElement = document.querySelector("#email");
    const ageElement = document.querySelector("#age");
    const passwordElement = document.querySelector("#password");
    const roleElement = document.querySelector("#role");

    if (!firstNameElement || !lastNameElement || !emailElement || !passwordElement) {
      alert("Error: Algunos elementos del formulario no fueron encontrados.");
      return;
    }


    const data = {
      first_name: firstNameElement.value,
      last_name: lastNameElement.value,
      email: emailElement.value,
      age: ageElement ? parseInt(ageElement.value, 10) : undefined,
      password: passwordElement.value,
      role: roleElement ? roleElement.value : "user"
    };

    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch("/api/auth/register", opts);
    const result = await response.json();
console.log("Respuesta del servidor:", result);
    console.log(result);

    if (response.ok) {
      alert(result.message);
      location.replace("/login");
    } else {
      alert(result.error);
    }
  } catch (error) {
    alert("Error al registrar el usuario.");
    console.error(error);
  }
};