// Packages
import express from "express";
import handlebars from "express-handlebars";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";

// Routers
import cartRouter from "./routes/carts-routes.js";
import messageRouter from "./routes/messages-routes.js";
import productRouter from "./routes/products-routes.js";
import viewRouter from "./routes/view-routes.js";

// Other imports
import __dirname from "./utils.js";

// Server
const app = express();
const server = createServer(app);
const serverSocket = new Server(server);

// Environment variables
const PORT = process.env.PORT || 8080;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

// Mongoose configuration
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster49875.2v7q1js.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas.");
  });

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  next();
});

// Router configuration
app.use("/", viewRouter);
app.use("/api/carts", cartRouter);
app.use("/api/messages", messageRouter);
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
  console.log("A new client has connected.");

  socket.on("newProductClient", (product) => {
    fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return socket.emit("errorServer", data.error);

        console.log(data);

        serverSocket.emit("productCreatedServer", data.productCreated);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on("newMessageClient", (message) => {
    fetch("http://localhost:8080/api/messages", {
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
    fetch(`http://localhost:8080/api/products/${id}`, {
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

  socket.on("disconnect", () => {
    console.log("A client has disconnected.");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
