const registerForm = document.querySelector("#register-form");

const iFirstname = document.querySelector("#user_name");
const iLastname = document.querySelector("#user_lastname");
const iEmail = document.querySelector("#user_email");
const iAge = document.querySelector("#user_age");
const iPassword = document.querySelector("#user_password");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = {
    first_name: iFirstname.value,
    last_name: iLastname.value,
    email: iEmail.value,
    age: iAge.value,
    password: iPassword.value,
  };

  await fetch("http://localhost:8080/api/sessions/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.success) {
        return alert("Error al crear el usuario");
      }

      window.location.href = "/";
    })
    .catch((error) => {
      console.log(error);
      alert("Error al crear el usuario");
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
