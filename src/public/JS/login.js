const registerForm = document.querySelector("#login-form");

const iEmail = document.querySelector("#user_email");
const iPassword = document.querySelector("#user_password");

const alertMessage = document.querySelector("#alertMessage");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  alertMessage.style.display = "none";

  const data = {
    email: iEmail.value,
    password: iPassword.value,
  };

  await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.success) {
        iEmail.value = "";
        iPassword.value = "";
        return (alertMessage.style.display = "block");
      }

      window.location.href = "/products";
    })
    .catch((error) => {
      iEmail.value = "";
      iPassword.value = "";
      alertMessage.style.display = "block";
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
