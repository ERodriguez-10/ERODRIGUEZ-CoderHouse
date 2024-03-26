const logoutBtn = document.querySelector("#logout-btn");

logoutBtn.addEventListener("click", async () => {
  await fetch("http://localhost:8080/api/v1/auth/logout", {
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
      window.location.href = "/";
    })
    .catch((error) => {
      alert("Logout failed");
    });
});
