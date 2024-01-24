/* ========= START IMPORTS SECTION ========= */

import httpServer from "#configs/http.config.js";

import {
  getCartByUserId,
  postNewCart,
  postProductToCart,
} from "#utils/fetch.js";

import { Server } from "socket.io";

/* ========= END IMPORTS SECTION ========= */

const URL = process.env.URL;

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("[ServerSocket]: A new client has connected.");

  socket.on("newProductClient", (product) => {
    fetch(`${URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return socket.emit("errorServer", data.error);

        socketServer.emit("productCreatedServer", data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on("newMessageClient", (message) => {
    fetch(`${URL}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return socket.emit("errorServer", data.error);

        socketServer.emit("messageCreatedServer", data.messageCreated);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on("deleteProductClient", (id) => {
    fetch(`${URL}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Contet-Type": "application/json",
      },
      body: JSON.stringify(id),
    })
      .then((res) => res.json())
      .then((data) => {
        socketServer.emit("productDeletedServer", id);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on("addProductToCart", async (productId) => {
    const id = socket.request.session.userId;

    const cartId = await getCartByUserId(id);

    if (!cartId) {
      const newCart = await postNewCart(id, productId);
      if (newCart) {
        socket.emit("productSuccessfullyAdded");
      }
    } else {
      const addProductToCart = await postProductToCart(cartId._id, productId);

      if (addProductToCart) {
        socket.emit("productSuccessfullyAdded");
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("[ServerSocket]: A client has disconnected.");
  });
});

export default socketServer;
