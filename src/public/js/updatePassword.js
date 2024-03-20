const newPasswordForm = document.querySelector("#newPassword-form");

const iEmail = document.querySelector("#user_email");
const iPassword = document.querySelector("#user_password");

const submitButton = document.querySelector("#submit-btn");
const tokenId = submitButton.getAttribute("data-token-id");

newPasswordForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log(tokenId);

  alertMessage.style.display = "none";

  const data = {
    email: iEmail.value,
    password: iPassword.value,
    token: tokenId,
  };

  await fetch(`http://localhost:8080/api/auth/new-password/${tokenId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (!data.success) {
        return (alertMessage.style.display = "block");
      } else {
        iEmail.value = "";
        iPassword.value = "";
        emailSent.style.display = "block";
      }
    });
});
