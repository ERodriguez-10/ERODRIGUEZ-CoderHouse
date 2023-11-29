import { Router } from "express";
import path from "node:path";

import { ProductManager } from "../pre-entrega-1.js";

import __dirname from "../utils.js";

// Build a flexible path compatible with all platforms
const jsonFilePath = path.join(__dirname, "data", "productList.json");
const CarritoManagerOnline = new ProductManager(jsonFilePath);

const viewRouter = Router();

viewRouter.get("/", (req, res) => {
  res.render("home", {
    tabTitle: "Bookify Store",
    pageTitle: "All products",
    products: CarritoManagerOnline.getProducts(),
    fileCss: "css/style.css",
  });
});

viewRouter.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {
    tabTitle: "Bookify Store",
    pageTitle: "Real Time Products",
    products: CarritoManagerOnline.getProducts(),
    fileCss: "css/style.css",
  });
});

export default viewRouter;
