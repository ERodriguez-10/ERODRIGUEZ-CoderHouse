import { Router } from "express";

import ProductDAO from "../dao/mongo/product.dao.js";
import MessageDAO from "../dao/mongo/message.dao.js";

const ProductsInstance = new ProductDAO();
const MessageInstance = new MessageDAO();

const viewRouter = Router();

viewRouter.get("/", async (req, res) => {
  res.render("home", {
    tabTitle: "Bookify Store",
    pageTitle: "All products",
    products: await ProductsInstance.getProducts(),
    fileCss: "css/style.css",
  });
});

viewRouter.get("/chat", async (req, res) => {
  const randomUser = `Anonymous${Math.floor(Math.random() * 1000000)}`;

  res.render("chat", {
    tabTitle: "Bookify Store",
    pageTitle: "Chat Room",
    messages: await MessageInstance.getMessages(),
    username: randomUser,
    fileCss: "css/style.css",
  });
});

viewRouter.get("/product/:id", async (req, res) => {
  const product = await ProductsInstance.getProductById(req.params.id);

  res.render("detail", {
    tabTitle: "Bookify Store",
    pageTitle: product.name,
    product,
    fileCss: "css/style.css",
  });
});

viewRouter.get("/cart", async (req, res) => {
  res.render("mycart", {
    tabTitle: "Bookify Store",
    pageTitle: "Cart",
    fileCss: "css/style.css",
  });
});

viewRouter.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {
    tabTitle: "Bookify Store",
    pageTitle: "Real Time Products",
    products: await ProductsInstance.getProducts(),
    fileCss: "css/style.css",
  });
});

export default viewRouter;
