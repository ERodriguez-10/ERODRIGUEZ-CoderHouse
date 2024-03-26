const newPasswordForm = document.querySelector("#newPassword-form");

const iPassword = document.querySelector("#user_password");

const submitButton = document.querySelector("#submit-btn");
const tokenId = submitButton.getAttribute("data-token-id");

newPasswordForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  alertMessage.style.display = "none";
  invalidTokenMessage.style.display = "none";

  const data = {
    password: iPassword.value,
    token: tokenId,
  };

  await fetch(`http://localhost:8080/api/v1/auth/updatePassword/${tokenId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.success) {
        if (data.error === "Token is invalid") {
          return (invalidTokenMessage.style.display = "block");
        }

        return (alertMessage.style.display = "block");
      } else {
        iPassword.value = "";
        emailSent.style.display = "block";
      }
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
