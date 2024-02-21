const socket = io({ withCredentials: true });

document.querySelector("#checkout").addEventListener("click", (event) => {
  const cartId = event.target.getAttribute("data-cart-id");

  socket.emit("checkout", cartId);
});

socket.on("checkoutSuccessfully", () => {
  Toastify({
    text: "Your purchase was successfully",
    duration: 3000,
    style: {
      background: "rgb(0,255,0)",
      background:
        "linear-gradient(90deg, rgba(0,255,0,1) 0%, rgba(9,121,9,1) 100%, rgba(0,212,255,1) 100%)",
    },
  }).showToast();
});
