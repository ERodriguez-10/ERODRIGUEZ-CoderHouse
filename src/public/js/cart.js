const socket = io({ withCredentials: true });

document.querySelector("#checkout").addEventListener("click", (event) => {
  const cartId = event.target.getAttribute("data-cart-id");

  socket.emit("checkout", cartId);
});

socket.on("checkoutSuccessfully", (id) => {
  window.location.href = "/cart/success/" + id;
});

socket.on("checkoutFailed", () => {
  Toastify({
    text: "Checkout failed. Not enough products available",
    duration: 3000,
    style: {
      background: "rgb(255,0,0)",
    },
  }).showToast();
});
