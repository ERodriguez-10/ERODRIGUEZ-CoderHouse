const socket = io();

// Forms selectors
const form = document.getElementById("form");

const iCategory = document.getElementById("category");
const iTitle = document.getElementById("title");
const iDescription = document.getElementById("description");
const iStock = document.getElementById("stock");
const iPrice = document.getElementById("price");
const iCode = document.getElementById("code");
const iThumbnail = document.getElementById("thumbnail");
const iStatus = document.getElementsByName("status");
const iOwner = document.getElementById("owner");

const userId = iOwner.getAttribute("user-data-id");

// Form submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const iDescriptionTrim = iDescription.value.trim();
  let iStatusValue;

  for (var i = 0, length = iStatus.length; i < length; i++) {
    if (iStatus[i].checked) {
      iStatusValue = iStatus[i].value;
      break;
    }
  }

  const newProductFromSocket = {
    category: iCategory.value,
    title: iTitle.value,
    description: iDescriptionTrim,
    stock: iStock.value,
    price: iPrice.value,
    code: iCode.value,
    thumbnail: iThumbnail.value,
    status: iStatusValue,
  };

  if (iOwner.checked) {
    newProductFromSocket.seller = userId;
  }

  if (newProductFromSocket) {
    socket.emit("newProductClient", newProductFromSocket);
    form.reset();
  }
});

document.querySelectorAll("#buttonDelete").forEach((button) => {
  button.addEventListener("click", (event) => {
    const productId = event.target.getAttribute("data-product-id");

    console.log("This is the productId: " + productId + ", userId: " + userId);

    socket.emit("deleteProductClient", productId, userId);
  });
});

// Socket.io events
socket.on("productCreatedServer", (product) => {
  const cardProduct = document.createElement("div");
  cardProduct.className = "product";
  cardProduct.id = `product-${product._id}`;
  cardProduct.innerHTML = `
  <div class="h-full flex flex-col items-center text-center">
    <img
      alt="team"
      class="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
      src="${product.thumbnail}"
    />
    <div class="w-full">
      <h2 class="title-font font-medium text-lg">${product.title}</h2>
      <h3 class="text-gray-500 mb-3">${product.category}</h3>
      <p class="mb-4">U$D ${product.price}</p>

      <div class="flex">

        <button
          class="flex flex-grow items-center w-full text-white bg-red-600 py-2 px-4 me-2 focus:outline-none justify-center rounded-sm text-base"
          id="buttonDelete"
          data-product-id="${product._id}"
        >
          <i class="fa-solid fa-trash mr-3"></i>
          Delete product</button>

        <a href="/product/${product._id}">
          <button
            class="flex h-full items-center border-2 border-black py-2 px-4 focus:outline-none rounded text-base"
            id="view-product"
            data-product-id="${product._id}"
          >
            <i class="fa-solid fa-eye"></i>
          </button>
        </a>
      </div>
    </div>
  </div>
  `;

  cardProduct.querySelector("#buttonDelete").addEventListener("click", (e) => {
    const productId = e.target.getAttribute("data-product-id");

    socket.emit("deleteProductClient", productId);
  });

  document.querySelector("#grid-product").appendChild(cardProduct);

  Toastify({
    text: "Product created successfully",
    duration: 3000,
    style: {
      background: "rgb(0,255,0)",
      background:
        "linear-gradient(90deg, rgba(0,255,0,1) 0%, rgba(9,121,9,1) 100%, rgba(0,212,255,1) 100%)",
    },
  }).showToast();
});

socket.on("productDeletedServer", (id) => {
  const productEl = document.getElementById(`product-${id}`);
  if (productEl) {
    productEl.remove();
  }

  Toastify({
    text: "Product deleted successfully",
    duration: 3000,
    style: {
      background: "rgb(0,255,0)",
      background:
        "linear-gradient(90deg, rgba(0,255,0,1) 0%, rgba(9,121,9,1) 100%, rgba(0,212,255,1) 100%)",
    },
  }).showToast();
});

socket.on("errorServer", (error) => {
  Toastify({
    text: error,
    duration: 3000,
    style: {
      background: "rgb(255,0,0)",
      background:
        "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(121,9,9,1) 100%, rgba(0,212,255,1) 100%)",
    },
  }).showToast();
});
