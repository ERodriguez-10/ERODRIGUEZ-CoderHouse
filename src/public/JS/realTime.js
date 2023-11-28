const socket = io();

// Forms selectors
const form = document.getElementById("form");

const iCategory = document.getElementById("category");
const iTitle = document.getElementById("title");
const iDescription = document.getElementById("description");
const iStock = document.getElementById("stock");
const iPrice = document.getElementById("price");
const iCode = document.getElementById("code");
const iThumbnails = document.getElementById("thumbnails");
const iStatus = document.getElementsByName("status");

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
    thumbnails: iThumbnails.value,
    status: iStatusValue,
  };

  if (newProductFromSocket) {
    socket.emit("newProductClient", newProductFromSocket);
    form.reset();
  }
});

document.querySelectorAll("#buttonDelete").forEach((button) => {
  button.addEventListener("click", (event) => {
    const productId = event.target.getAttribute("data-product-id");

    socket.emit("deleteProductClient", productId);
  });
});

// Socket.io events
socket.on("productCreatedServer", (product) => {
  console.log(product);
  const cardProduct = document.createElement("article");
  cardProduct.className = "product";
  cardProduct.id = `product-${product.id}`;
  cardProduct.innerHTML = `
      <header class="card-header">${product.category} - ${product.title}</header>
      <div class="card-body">
        <i
          class="fa-solid fa-circle-info"
          style="margin-right: 5px; color: lightskyblue"
        ></i>
        ${product.description}
      </div>
      <footer class="flex">
        <div>
          <i class="fa-solid fa-book" style="color: #43a047"></i>
          ${product.stock}
        </div>
        <div>
          <i class="fa-solid fa-dollar-sign" style="color: #43a047"></i>
          ${product.price}
        </div>
        <div style="margin-top: 1rem;">
          <button
            class="outline contrast"
            style="color: red;"
            id="buttonDelete"
            data-product-id="${product.id}"
          >
            <i class="fa-solid fa-trash"></i>
            Delete product</button>
        </div>
      </footer>
  `;

  cardProduct.querySelector("#buttonDelete").addEventListener("click", (e) => {
    const productId = e.target.getAttribute("data-product-id");

    socket.emit("deleteProductClient", productId);
  });

  document.querySelector(".parent").appendChild(cardProduct);

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
