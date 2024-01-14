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

      window.location.href = "/products";
    })
    .catch((error) => {
      alert("Invalid credentials");
    });
});

const showPasswordIcon = document.querySelector("#showPasswordIcon");
const hidePasswordIcon = document.querySelector("#hidePasswordIcon");

showPasswordIcon.addEventListener("click", () => {
  iPassword.setAttribute("type", "text");
  showPasswordIcon.style.display = "none";
  hidePasswordIcon.style.display = "block";
});

hidePasswordIcon.addEventListener("click", () => {
  iPassword.setAttribute("type", "password");
  showPasswordIcon.style.display = "block";
  hidePasswordIcon.style.display = "none";
});