import { Router } from "express";

import ProductController from "../controllers/mongo/product.controller.js";
import MessageController from "../controllers/mongo/message.controller.js";
import CartController from "../controllers/mongo/cart.controller.js";

const ProductsInstance = new ProductController();
const MessageInstance = new MessageController();
const CartInstance = new CartController();

const viewRouter = Router();

viewRouter.get("/", async (req, res) => {
  res.render("login", {
    tabTitle: "Bookify Store - Login",
    fileCss: "css/styles.css",
  });
});

viewRouter.get("/register", async (req, res) => {
  res.render("register", {
    tabTitle: "Bookify Store - Register",
    fileCss: "css/styles.css",
  });
});

viewRouter.get("/chat", async (req, res) => {
  const randomUser = `Anonymous${Math.floor(Math.random() * 1000000)}`;

  res.render("chat", {
    tabTitle: "Bookify Store",
    pageTitle: "Chat Room",
    messages: await MessageInstance.getMessages(),
    username: randomUser,
    fileCss: "css/styles.css",
  });
});

viewRouter.get("/products", async (req, res) => {
  const { limit, page, sort, query } = req.query;

  const productData = await ProductsInstance.getProducts(
    limit,
    page,
    sort,
    query
  );

  const payloadProducts = productData.payload;

  let productsView = payloadProducts.map((product) => {
    return Object.assign({}, product);
  });

  let limitProps = limit ?? 10;

  res.render("products", {
    tabTitle: "Bookify Store",
    pageTitle: "All products",
    products: productsView,
    controllers: productData,
    limit: limitProps,
    fileCss: "css/styles.css",
    name: req.session.user,
  });
});

viewRouter.get("/product/:pid", async (req, res) => {
  const { pid } = req.params;

  const productInfo = await ProductsInstance.getProductById(pid);

  res.render("productDetail", {
    tabTitle: "Bookify Store",
    pageTitle: "All products",
    product: productInfo,
    fileCss: "css/styles.css",
  });
});

viewRouter.get("/realtimeproducts", async (req, res) => {
  const payloadProducts = (await ProductsInstance.getProducts()).payload;

  let productsView = payloadProducts.map((product) => {
    return Object.assign({}, product);
  });

  res.render("realTimeProducts", {
    tabTitle: "Bookify Store",
    pageTitle: "Real Time Products",
    products: productsView,
    fileCss: "css/styles.css",
  });
});

viewRouter.get("/cart/:cid", async (req, res) => {
  const { cid } = req.params;

  const payloadCarts = await CartInstance.getCartById(cid);

  res.render("cart", {
    tabTitle: "Bookify Store",
    pageTitle: "Real Time Products",
    products: payloadCarts,
    fileCss: "css/styles.css",
  });
});

export default viewRouter;
