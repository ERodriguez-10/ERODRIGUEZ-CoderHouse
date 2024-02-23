import httpServer from "#configs/server/http.config.js";
import { configEnv } from "#configs/env.config.js";

import { cartServices } from "#services/factory.js";

import {
  getCartByUserId,
  postNewCart,
  postProductToCart,
} from "#utils/fetch.js";

import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import sendInvoceToEmail from "../../utils/mail.js";

const URL = configEnv.URL;

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
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

        socketServer.emit("productCreatedServer", data.productCreated);
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
    try {
      const jwtToken = socket.request.headers.cookie.split("=")[1];

      const tokenData = jwt.verify(jwtToken, configEnv.JWT_SECRET);

      const isUser = tokenData.user.role;

      if (isUser === "Admin") {
        socket.emit("adminError");
      } else {
        const userId = tokenData.user.userId;

        const cartId = await getCartByUserId(userId);

        if (!cartId) {
          const newCart = await postNewCart(userId, productId);
          if (newCart) {
            socket.emit("productSuccessfullyAdded");
          }
        } else {
          const addProductToCart = await postProductToCart(
            cartId._id,
            productId
          );

          if (addProductToCart) {
            socket.emit("productSuccessfullyAdded");
          }
        }
      }
    } catch (error) {
      console.error("Error adding product to cart: ", error);
    }
  });

  socket.on("checkout", async (cartId) => {
    try {
      fetch(`${URL}/api/carts/${cartId}/purchase`, {
        method: "POST",
        headers: {
          "Contet-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          socketServer.emit("checkoutSuccessfully", data.products._id);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error purchasing: ", error);
    }
  });

  socket.on("sendInvoce", async (cartId) => {
    try {
      const jwtToken = socket.request.headers.cookie.split("=")[1];

      const tokenData = jwt.verify(jwtToken, configEnv.JWT_SECRET);

      const userEmail = tokenData.user.email;

      const purchasedData = await cartServices.getCartByCartId(cartId);

      await sendInvoceToEmail(userEmail, purchasedData.products);

      socket.emit("emailSuccess");
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("[ServerSocket]: A client has disconnected.");
  });
});

export default socketServer;
