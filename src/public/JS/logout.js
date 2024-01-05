const logoutBtn = document.querySelector("#logout-btn");

logoutBtn.addEventListener("click", async () => {
  await fetch("http://localhost:8080/api/sessions/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.success) {
        return alert("Logout failed");
      }
      alert("Logout successfull");
      window.location.href = "/";
    })
    .catch((error) => {
      alert("Logout failed");
    });
});
