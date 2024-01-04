const registerForm = document.querySelector("#login-form");

const iEmail = document.querySelector("#user_email");
const iPassword = document.querySelector("#user_password");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = {
    email: iEmail.value,
    password: iPassword.value,
  };

  await fetch("http://localhost:8080/api/sessions/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.success) {
        return alert("Invalid credentials");
      }

      alert("Login successfull");
      window.location.href = "/products";
    })
    .catch((error) => {
      alert("Invalid credentials");
    });
});
