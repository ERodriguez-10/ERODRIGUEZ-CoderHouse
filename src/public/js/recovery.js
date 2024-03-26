const recoveryForm = document.querySelector("#recovery-form");

const iEmail = document.querySelector("#user_email");

const alertMessage = document.querySelector("#alertMessage");
const emailSent = document.querySelector("#emailSent");

recoveryForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  alertMessage.style.display = "none";

  const data = {
    email: iEmail.value,
  };

  await fetch("http://localhost:8080/api/v1/auth/recoverPassword", {
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
        emailSent.style.display = "block";
      }
    })
    .catch((error) => {
      iEmail.value = "";
      alertMessage.style.display = "block";
    });
});
