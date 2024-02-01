const registerForm = document.querySelector("#register-form");

const iFirstname = document.querySelector("#user_name");
const iLastname = document.querySelector("#user_lastname");
const iEmail = document.querySelector("#user_email");
const iPassword = document.querySelector("#user_password");

const failedRegister = document.querySelector("#failedRegister");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  failedRegister.style.display = "none";

  const data = {
    first_name: iFirstname.value,
    last_name: iLastname.value,
    email: iEmail.value,
    avatar: null,
    password: iPassword.value,
    registerWith: "App",
    role: "User",
  };

  await fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.success) {
        iFirstname.value = "";
        iLastname.value = "";
        iEmail.value = "";
        iPassword.value = "";

        return (failedRegister.style.display = "block");
      }

      window.location.href = "/";
    })
    .catch((error) => {
      iFirstname.value = "";
      iLastname.value = "";
      iEmail.value = "";
      iPassword.value = "";
      failedRegister.style.display = "block";
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
