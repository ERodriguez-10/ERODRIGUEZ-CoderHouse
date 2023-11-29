// Packages
import express from "express";
import handlebars from "express-handlebars";
import { createServer } from "node:http";
import { Server } from "socket.io";

// Routers
import viewRouter from "./routes/view-routes.js";
import productRouter from "./routes/products-routes.js";
import cartRouter from "./routes/carts-routes.js";

// Other imports
import __dirname from "./utils.js";

// Server
const app = express();
const PORT = 8080;
const server = createServer(app);
const serverSocket = new Server(server);

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
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

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

app.use(express.static(`${__dirname}/public`));

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

        socket.emit("productCreatedServer", data.product);
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
        socket.emit("productDeletedServer", id);
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
