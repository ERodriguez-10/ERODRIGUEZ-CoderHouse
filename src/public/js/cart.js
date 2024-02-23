const socket = io({ withCredentials: true });

document.querySelector("#checkout").addEventListener("click", (event) => {
  const cartId = event.target.getAttribute("data-cart-id");

  socket.emit("checkout", cartId);
});

socket.on("checkoutSuccessfully", (id) => {
  window.location.href = "/cart/success/" + id;
});
