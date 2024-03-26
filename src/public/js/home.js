const socket = io({ withCredentials: true });

document.querySelectorAll("#addProduct").forEach((button) => {
  button.addEventListener("click", (event) => {
    const productId = event.target.getAttribute("data-product-id");

    socket.emit("addProductToCart", productId);
  });
});

socket.on("productSuccessfullyAdded", () => {
  Toastify({
    text: "Your product has been added",
    duration: 3000,
    style: {
      background: "rgb(0,255,0)",
      background:
        "linear-gradient(90deg, rgba(0,255,0,1) 0%, rgba(9,121,9,1) 100%, rgba(0,212,255,1) 100%)",
    },
  }).showToast();
});

socket.on("adminError", () => {
  Toastify({
    text: "Admin cannot add products to cart",
    duration: 3000,
    style: {
      background: "rgb(255,0,0)",
    },
  }).showToast();
});

socket.on("ownerError", () => {
  Toastify({
    text: "You cannot add your own products to cart",
    duration: 3000,
    style: {
      background: "rgb(255,0,0)",
    },
  }).showToast();
});
