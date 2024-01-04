// Packages
import { createServer } from "node:http";
import { Server } from "socket.io";
import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";

// Routers
import cartRouter from "./routes/carts.routes.js";
import messageRouter from "./routes/messages.routes.js";
import productRouter from "./routes/products.routes.js";
import viewRouter from "./routes/view.routes.js";

// Other imports
import __dirname from "./utils.js";
import mongoose from "mongoose";
import sessionRouter from "./routes/sessions.routes.js";

// Server
const app = express();
const server = createServer(app);
const serverSocket = new Server(server);

// Environment variables
const PORT = process.env.PORT || 8080;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const CLUSTER_URL = process.env.CLUSTER_URL;
const URL = process.env.URL;

// Cors middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  next();
});

// Mongoose configuration
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER_URL}/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("[server]: Database connected.");
  });

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER_URL}/${DB_NAME}?retryWrites=true&w=majority`,
      ttl: 600,
    }),
    secret: "I47iXcIY216SSWgS",
    resave: false,
    saveUninitialized: false,
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router configuration
app.use("/", viewRouter);
app.use("/api/carts", cartRouter);
app.use("/api/messages", messageRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/products", productRouter);

// Handlebars configuration
app.engine(
  "handlebars",
  handlebars.engine({
    extname: "handlebars",
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use(express.static(__dirname + "/public"));

// Socket.io configuration
serverSocket.on("connection", (socket) => {
  console.log("[server-socket]: A new client has connected.");

  socket.on("newProductClient", (product) => {
    fetch("${URL}/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return socket.emit("errorServer", data.error);

        serverSocket.emit("productCreatedServer", data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on("newMessageClient", (message) => {
    fetch("${URL}/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return socket.emit("errorServer", data.error);

        serverSocket.emit("messageCreatedServer", data.messageCreated);
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
        serverSocket.emit("productDeletedServer", id);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on("newCartToUser", () => {
    fetch(`${URL}/api/carts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: [],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        serverSocket.emit("cartCreated", data.cartCreated._id);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on("addProductToCart", (data) => {
    const { cartId, productId } = data;

    fetch(`${URL}/api/carts/${cartId}/product/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        serverSocket.emit("productSuccessfullyAdded");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on("disconnect", () => {
    console.log("[server-socket]:A client has disconnected.");
  });
});

server.listen(PORT, () => {
  console.log(`[server]: Server is running on port ${PORT}`);
});
