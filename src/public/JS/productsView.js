const socket = io();

socket.emit("newCartToUser");

let cartId;

socket.on("cartCreated", (id) => {
  console.log("This is the new cart ID " + id);

  cartId = id;

  Toastify({
    text: "This is your cart ID " + id,
    duration: 10000,
    style: {
      background: "rgb(0,255,0)",
      background:
        "linear-gradient(90deg, rgba(0,255,0,1) 0%, rgba(9,121,9,1) 100%, rgba(0,212,255,1) 100%)",
    },
  }).showToast();
});

document.querySelectorAll("#addProduct").forEach((button) => {
  button.addEventListener("click", (event) => {
    const productId = event.target.getAttribute("data-product-id");

    const data = {
      cartId,
      productId,
    };

    console.log(data);

    socket.emit("addProductToCart", data);
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
